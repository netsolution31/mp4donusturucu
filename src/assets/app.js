// mp4donusturucu.com - client-side converter (ffmpeg.wasm, loaded on demand)
const $ = (s, r = document) => r.querySelector(s);
const BASE = document.documentElement.dataset.base || "/";
const abs = (p) => new URL(BASE + p, location.href).href;

const tool = $("#tool");
if (tool) initTool(tool);
const calc = $("#calc");
if (calc) initCalc(calc);

function initTool(root) {
  const L = JSON.parse($("#i18n").textContent);
  const cfg = root.dataset;
  const el = {
    input: $("#file", root), drop: $(".drop", root), box: $(".file", root), name: $(".file .name", root),
    meta: $(".file .meta", root), flow: $(".fmtflow", root), out: $("#out", root), q: $("#quality", root),
    res: $("#res", root), codec: $("#codec", root), ss: $("#ss", root), to: $("#to", root), rot: $("#rot", root),
    fps: $("#fps", root), mute: $("#mute", root), target: $("#target", root), aspect: $("#aspect", root),
    est: $(".est", root), go: $("#go", root), cancel: $("#cancel", root), prog: $(".progress", root),
    bar: $(".bar i", root), pl: $(".ptext .l", root), pr: $(".ptext .r", root), result: $(".result", root),
    err: $(".err", root), actions: $(".actions", root),
  };
  let file = null, info = {}, ffmpeg = null, loading = null, lastUrl = null, busy = false, written = "";

  // presets from the landing page
  if (cfg.out) el.out.value = cfg.out;
  if (cfg.quality) el.q.value = cfg.quality;
  if (cfg.target) el.target.value = cfg.target;
  if (cfg.aspect) el.aspect.value = cfg.aspect;
  if (cfg.res) el.res.value = cfg.res;
  if (cfg.mute) el.mute.checked = true;
  if (cfg.rot) el.rot.value = cfg.rot;
  if (cfg.fps) el.fps.value = cfg.fps;
  if (cfg.adv) $("details.adv", root).open = true;

  const show = (node, on = true) => node.classList.toggle("on", on);
  const fmtMB = (b) => (b / 1048576).toFixed(b < 10485760 ? 2 : 1) + " MB";
  const ext = (n) => (n.split(".").pop() || "").toLowerCase();
  const isAudio = (f) => ["mp3", "m4a", "wav", "ogg"].includes(f);

  ["dragenter", "dragover"].forEach((t) => el.drop.addEventListener(t, (e) => { e.preventDefault(); el.drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach((t) => el.drop.addEventListener(t, () => el.drop.classList.remove("over")));
  el.drop.addEventListener("drop", (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) pick(e.dataTransfer.files[0]); });
  el.input.addEventListener("change", () => el.input.files[0] && pick(el.input.files[0]));
  [el.out, el.q, el.res, el.codec, el.ss, el.to, el.target, el.fps, el.mute].forEach((n) => n.addEventListener("input", estimate));
  el.out.addEventListener("change", syncCodec);
  el.go.addEventListener("click", convert);
  el.cancel.addEventListener("click", cancel);
  syncCodec();

  function syncCodec() {
    const o = el.out.value;
    const opts = o === "webm" ? ["vp9"] : ["mp4", "mov", "mkv"].includes(o) ? ["h264", "h265"] : o === "avi" ? ["mpeg4"] : ["auto"];
    if (o === "mkv") opts.push("vp9");
    const cur = el.codec.value;
    el.codec.innerHTML = opts.map((c) => `<option value="${c}">${L.codecs[c]}</option>`).join("");
    if (opts.includes(cur)) el.codec.value = cur;
    el.codec.disabled = opts.length < 2;
    estimate();
  }

  function pick(f) {
    error(null);
    show(el.result, false);
    if (f.size > 2 * 1024 ** 3) return error(L.errBig);
    file = f;
    info = { size: f.size };
    el.name.textContent = f.name;
    el.flow.innerHTML = `${ext(f.name).toUpperCase()} &rarr; <span>${el.out.value.toUpperCase()}</span>`;
    renderMeta();
    show(el.box);
    el.go.disabled = false;
    el.actions.classList.add("sticky");
    if (f.size > 500 * 1048576) error(L.warnBig);
    // quick metadata from the browser itself
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = URL.createObjectURL(f);
    v.onloadedmetadata = () => {
      if (isFinite(v.duration)) info.duration = v.duration;
      if (v.videoWidth) { info.w = v.videoWidth; info.h = v.videoHeight; }
      URL.revokeObjectURL(v.src);
      if (info.duration && !el.to.value) el.to.placeholder = info.duration.toFixed(1);
      renderMeta(); estimate();
    };
    v.onerror = () => URL.revokeObjectURL(v.src);
    // start loading the engine in the background
    getFFmpeg().then(probe).catch(() => {});
    estimate();
  }

  function renderMeta() {
    const b = [`<span class="badge">${fmtMB(info.size)}</span>`];
    if (info.w) b.push(`<span class="badge">${info.w}&times;${info.h}</span>`);
    if (info.duration) b.push(`<span class="badge">${fmtTime(info.duration)}</span>`);
    if (info.vcodec) b.push(`<span class="badge v">${info.vcodec}</span>`);
    if (info.fps) b.push(`<span class="badge v">${info.fps} fps</span>`);
    if (info.acodec) b.push(`<span class="badge v">${info.acodec}</span>`);
    el.meta.innerHTML = b.join("");
    if (file) el.flow.innerHTML = `${ext(file.name).toUpperCase()} &rarr; <span>${el.out.value.toUpperCase()}</span>`;
  }

  function getFFmpeg() {
    if (ffmpeg?.loaded) return Promise.resolve(ffmpeg);
    if (loading) return loading;
    loading = (async () => {
      const { FFmpeg } = await import(abs("assets/vendor/ffmpeg/index.js"));
      const ff = new FFmpeg();
      await ff.load({ coreURL: abs("assets/vendor/core/ffmpeg-core.js"), wasmURL: abs("assets/vendor/core/ffmpeg-core.wasm") });
      ffmpeg = ff;
      return ff;
    })();
    loading.catch(() => { loading = null; });
    return loading;
  }

  function probe(ff) {
    if (!file) return Promise.resolve();
    if (!info.probing) info.probing = doProbe(ff, file, info).catch((e) => { info.probing = null; throw e; });
    return info.probing;
  }

  async function doProbe(ff, f, info) {
    if (written && written !== "") await ff.deleteFile(written).catch(() => {});
    written = "";
    const name = "in." + (ext(f.name) || "bin");
    const log = [];
    const onLog = ({ message }) => log.push(message);
    ff.on("log", onLog);
    try {
      await ff.writeFile(name, new Uint8Array(await f.arrayBuffer()));
      written = name;
      info.inName = name;
      await ff.exec(["-hide_banner", "-i", name]);
    } finally { ff.off("log", onLog); }
    const txt = log.join("\n");
    const d = txt.match(/Duration: (\d+):(\d+):([\d.]+)/);
    if (d && !info.duration) info.duration = +d[1] * 3600 + +d[2] * 60 + +d[3];
    const vs = txt.match(/Video: (\w+)[^\n]*?(\d{2,5})x(\d{2,5})/);
    if (vs) { info.vcodec = vs[1]; if (!info.w) { info.w = +vs[2]; info.h = +vs[3]; } }
    const fr = txt.match(/([\d.]+) fps/);
    if (fr) info.fps = +fr[1];
    const as = txt.match(/Audio: (\w+)/);
    if (as) info.acodec = as[1];
    info.hasAudio = !!as;
    info.probed = true;
    renderMeta(); estimate();
  }

  function estimate() {
    if (!file) return;
    renderMeta();
    const o = el.out.value;
    const dur = clipDuration();
    if (!dur) { el.est.textContent = ""; return; }
    let kbps;
    if (isAudio(o)) kbps = o === "wav" ? 1411 : o === "ogg" ? 160 : 192;
    else if (o === "gif") { el.est.textContent = L.estGif; return; }
    else if (+el.target.value > 0) { el.est.textContent = `${L.est}: ~${(+el.target.value).toFixed(1)} MB (${L.target})`; return; }
    else {
      const h = Math.min(+el.res.value || info.h || 1080, info.h ? Math.min(info.w, info.h) : 1080);
      const table = [[2160, 16000], [1440, 9000], [1080, 5000], [720, 2800], [480, 1400], [360, 800]];
      const base = (table.find(([r]) => h >= r) || table[5])[1];
      const qf = { high: 1.4, balanced: 1, small: 0.55 }[el.q.value];
      const cf = el.codec.value === "h265" || el.codec.value === "vp9" ? 0.7 : el.codec.value === "mpeg4" ? 1.6 : 1;
      kbps = base * qf * cf + (el.mute.checked ? 0 : 128);
    }
    const mb = (kbps * dur) / 8 / 1024;
    el.est.textContent = `${L.est}: ~${mb.toFixed(1)} MB`;
  }

  function clipDuration() {
    const d = info.duration;
    if (!d) return 0;
    const s = Math.max(0, +el.ss.value || 0);
    const e = Math.min(d, +el.to.value || d);
    return Math.max(0.1, e - s);
  }

  function buildArgs(inName, outName) {
    const o = el.out.value, q = el.q.value, codec = el.codec.value;
    const args = [];
    const ss = +el.ss.value || 0, to = +el.to.value || 0;
    if (ss > 0) args.push("-ss", String(ss));
    args.push("-i", inName);
    if (to > 0 && to > ss) args.push("-t", String(to - ss));

    if (isAudio(o)) {
      args.push("-vn");
      if (o === "mp3") args.push("-c:a", "libmp3lame", "-b:a", q === "small" ? "128k" : q === "high" ? "256k" : "192k");
      if (o === "m4a") args.push("-c:a", "aac", "-b:a", q === "small" ? "128k" : "192k");
      if (o === "wav") args.push("-c:a", "pcm_s16le");
      if (o === "ogg") args.push("-c:a", "libvorbis", "-q:a", q === "small" ? "3" : q === "high" ? "7" : "5");
      return args.concat(outName);
    }

    const vf = [];
    const portrait = info.w && info.h && info.h > info.w;
    const asp = el.aspect.value;
    if (asp) {
      const [a, b] = asp.split(":");
      vf.push(`crop=w='min(iw,ih*${a}/${b})':h='min(ih,iw*${b}/${a})'`);
    }
    const rot = el.rot.value;
    if (rot === "90") vf.push("transpose=1");
    if (rot === "270") vf.push("transpose=2");
    if (rot === "180") vf.push("hflip", "vflip");
    const fps = +el.fps.value;

    if (o === "gif") {
      const w = Math.min(+el.res.value || 480, 720);
      vf.push(`fps=${fps || 12}`, `scale=${w}:-1:flags=lanczos`);
      args.push("-vf", vf.join(",") + ",split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer", "-loop", "0");
      return args.concat(outName);
    }

    const r = +el.res.value;
    if (r) vf.push(portrait ? `scale='min(${r},iw)':-2` : `scale=-2:'min(${r},ih)'`);
    if (fps) vf.push(`fps=${fps}`);
    vf.push("scale=trunc(iw/2)*2:trunc(ih/2)*2");
    args.push("-vf", vf.join(","));

    const tgt = +el.target.value;
    const audioK = 128;
    let vk = 0;
    if (tgt > 0 && clipDuration()) vk = Math.max(80, Math.floor((tgt * 8192 * 0.94) / clipDuration() - (el.mute.checked ? 0 : audioK)));

    if (codec === "vp9") {
      const crf = { high: 30, balanced: 34, small: 40 }[q];
      args.push("-c:v", "libvpx-vp9", "-deadline", "realtime", "-cpu-used", "8", "-row-mt", "1");
      vk ? args.push("-b:v", vk + "k") : args.push("-crf", String(crf), "-b:v", "0");
    } else if (codec === "mpeg4") {
      args.push("-c:v", "mpeg4", "-vtag", "xvid");
      vk ? args.push("-b:v", vk + "k") : args.push("-q:v", { high: "3", balanced: "5", small: "8" }[q]);
    } else {
      const x265 = codec === "h265";
      const crf = { high: 20, balanced: 24, small: 29 }[q] + (x265 ? 4 : 0);
      args.push("-c:v", x265 ? "libx265" : "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p");
      if (x265) args.push("-tag:v", "hvc1");
      vk ? args.push("-b:v", vk + "k", "-maxrate", Math.round(vk * 1.3) + "k", "-bufsize", vk * 2 + "k") : args.push("-crf", String(crf));
    }

    if (el.mute.checked) args.push("-an");
    else if (o === "webm") args.push("-c:a", "libopus", "-b:a", "128k");
    else if (o === "avi") args.push("-c:a", "libmp3lame", "-b:a", "192k");
    else args.push("-c:a", "aac", "-b:a", audioK + "k");
    if (o === "mp4" || o === "mov") args.push("-movflags", "+faststart");
    return args.concat(outName);
  }

  async function convert() {
    if (!file || busy) return;
    busy = true;
    error(null);
    show(el.result, false);
    show(el.prog);
    el.go.disabled = true;
    el.cancel.hidden = false;
    setProg(0, L.loading);
    const o = el.out.value;
    const outName = "out." + o;
    const total = clipDuration();
    const onLog = ({ message }) => {
      const m = message.match(/time=(\d+):(\d+):([\d.]+)/);
      if (m && total) setProg(Math.min(99, ((+m[1] * 3600 + +m[2] * 60 + +m[3]) / total) * 100), L.converting);
    };
    try {
      const ff = await getFFmpeg();
      await probe(ff);
      setProg(1, L.converting);
      ff.on("log", onLog);
      const t0 = performance.now();
      const ret = await ff.exec(buildArgs(info.inName, outName));
      ff.off("log", onLog);
      if (ret !== 0) throw new Error("exit " + ret);
      const data = await ff.readFile(outName);
      await ff.deleteFile(outName).catch(() => {});
      if (!data?.length) throw new Error("empty");
      const mime = { mp4: "video/mp4", mov: "video/quicktime", mkv: "video/x-matroska", webm: "video/webm", avi: "video/x-msvideo", gif: "image/gif", mp3: "audio/mpeg", m4a: "audio/mp4", wav: "audio/wav", ogg: "audio/ogg" }[o];
      const blob = new Blob([data.buffer], { type: mime });
      if (lastUrl) URL.revokeObjectURL(lastUrl);
      lastUrl = URL.createObjectURL(blob);
      const base = file.name.replace(/\.[^.]+$/, "") || "video";
      const secs = ((performance.now() - t0) / 1000).toFixed(1);
      const diff = Math.round((1 - blob.size / file.size) * 100);
      const media = o === "gif" ? `<img src="${lastUrl}" alt="">` : isAudio(o) ? `<audio controls src="${lastUrl}"></audio>` : ["mp4", "webm", "mov"].includes(o) ? `<video controls playsinline src="${lastUrl}"></video>` : "";
      el.result.innerHTML = `${media}<p><strong>${L.done}</strong> <span class="badge">${fmtMB(blob.size)}</span> <span class="badge v">${diff >= 0 ? "-" + diff : "+" + -diff}%</span> <span class="badge v">${secs} s</span></p>
        <div class="actions"><a class="btn" href="${lastUrl}" download="${escapeHtml(base)}.${o}">${L.download} .${o.toUpperCase()}</a><button class="btn ghost" type="button" data-again>${L.again}</button></div>`;
      $("[data-again]", el.result).onclick = () => { show(el.result, false); el.go.disabled = false; };
      setProg(100, L.done);
      show(el.result);
    } catch (e) {
      ff_off(onLog);
      if (e?.message !== "cancel") error(L.errConv + (e?.message ? ` (${String(e.message).slice(0, 80)})` : ""));
      show(el.prog, false);
    } finally {
      busy = false;
      el.cancel.hidden = true;
      el.go.disabled = false;
    }
  }

  function ff_off(fn) { try { ffmpeg?.off("log", fn); } catch {} }

  function cancel() {
    if (!ffmpeg) return;
    ffmpeg.terminate();
    ffmpeg = null; loading = null;
    info.probing = null; info.inName = null; written = "";
    busy = false;
    show(el.prog, false);
    el.cancel.hidden = true;
    el.go.disabled = false;
    error(L.cancelled);
  }

  function setProg(p, label) {
    el.bar.style.width = p.toFixed(1) + "%";
    el.pl.textContent = label;
    el.pr.textContent = Math.round(p) + "%";
  }
  function error(msg) { el.err.textContent = msg || ""; show(el.err, !!msg); }
}

function fmtTime(s) {
  const m = Math.floor(s / 60), r = Math.round(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}
function escapeHtml(s) { return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`); }

function initCalc(root) {
  const f = (id) => $("#" + id, root);
  const out = $("output", root);
  const L = JSON.parse(root.dataset.l);
  const run = () => {
    const dur = (+f("c-min").value || 0) * 60 + (+f("c-sec").value || 0);
    const mode = f("c-mode").value;
    const a = +f("c-abr").value || 0;
    if (!dur) { out.textContent = "-"; return; }
    if (mode === "size") {
      const v = +f("c-vbr").value || 0;
      const mb = ((v + a) * dur) / 8 / 1024;
      out.textContent = `${L.size}: ~${mb.toFixed(1)} MB`;
    } else {
      const t = +f("c-target").value || 0;
      const v = Math.floor((t * 8192 * 0.94) / dur - a);
      out.textContent = v > 0 ? `${L.vbr}: ~${v} kbps` : L.tooSmall;
    }
    root.querySelectorAll("[data-show]").forEach((n) => (n.hidden = n.dataset.show !== mode));
  };
  root.addEventListener("input", run);
  run();
}
