// mp4donusturucu.com - Dönüşüm Makinesi: client-side converter (ffmpeg.wasm, loaded on demand)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const BASE = document.documentElement.dataset.base || "/";
const abs = (p) => new URL(BASE + p, location.href).href;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const tool = $("#tool");
if (tool) initTool(tool);
const calc = $("#calc");
if (calc) initCalc(calc);
initEbru();

function initTool(root) {
  const L = JSON.parse($("#i18n").textContent);
  const cfg = root.dataset;
  const el = {
    input: $("#file", root), drop: $(".slot", root), src: $(".filecard-src", root), outCard: $(".filecard-out", root),
    targets: $(".targets", root), q: $("#quality", root), res: $("#res", root), codec: $("#codec", root),
    ss: $("#ss", root), to: $("#to", root), rot: $("#rot", root), fps: $("#fps", root), mute: $("#mute", root),
    target: $("#target", root), aspect: $("#aspect", root), go: $("#go", root), cancel: $("#cancel", root),
    frames: $$(".frames i", root), tlL: $(".tl-text .l", root), tlBar: $(".tl-text .bar", root), tlR: $(".tl-text .r", root),
    result: $(".result", root), err: $(".err", root), sig: $(".sig canvas", root),
  };
  // the target format is a radio group; expose it like a select
  el.out = {
    get value() { return $("input[name=out]:checked", root)?.value || "mp4"; },
    set value(v) { const r = $(`input[name=out][value="${v}"]`, root); if (r) r.checked = true; },
  };
  let file = null, info = {}, ffmpeg = null, loading = null, urls = [], busy = false, written = "";

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
  const flip = (node, text) => {
    if (node.textContent === text) return;
    node.textContent = text;
    node.classList.remove("flip"); void node.offsetWidth; node.classList.add("flip");
  };

  ["dragenter", "dragover"].forEach((t) => el.drop.addEventListener(t, (e) => { e.preventDefault(); el.drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach((t) => el.drop.addEventListener(t, () => el.drop.classList.remove("over")));
  el.drop.addEventListener("drop", (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) pick(e.dataTransfer.files[0]); });
  el.input.addEventListener("change", () => el.input.files[0] && pick(el.input.files[0]));
  [el.q, el.res, el.codec, el.ss, el.to, el.target, el.fps, el.mute, el.aspect, el.rot].forEach((n) => n.addEventListener("input", estimate));
  el.targets.addEventListener("change", syncCodec);
  el.go.addEventListener("click", convert);
  el.cancel.addEventListener("click", cancel);
  syncCodec();
  setTimeline(0, L.ready, false);

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
    resetResult();
    if (f.size > 2 * 1024 ** 3) return error(L.errBig);
    file = f;
    info = { size: f.size };
    el.go.disabled = false;
    document.body.classList.add("has-file");
    el.src.dataset.state = "file";
    if (!reduced) { el.src.classList.remove("drop-in"); void el.src.offsetWidth; el.src.classList.add("drop-in"); }
    if (f.size > 500 * 1048576) error(L.warnBig);
    render();
    setTimeline(0, L.loaded, false);
    // quick metadata from the browser itself
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = URL.createObjectURL(f);
    v.onloadedmetadata = () => {
      if (isFinite(v.duration)) info.duration = v.duration;
      if (v.videoWidth) { info.w = v.videoWidth; info.h = v.videoHeight; }
      info.playable = !!v.videoWidth;
      URL.revokeObjectURL(v.src);
      if (info.duration && !el.to.value) el.to.placeholder = info.duration.toFixed(1);
      render();
    };
    v.onerror = () => { info.playable = false; URL.revokeObjectURL(v.src); };
    // start loading the engine in the background
    getFFmpeg().then(probe).catch(() => {});
  }

  // ---------- rendering of cards and readout ----------
  function render() {
    if (!file) return;
    const e = ext(file.name);
    $(".fc-name", el.src).textContent = file.name;
    $(".fc-size", el.src).textContent = fmtMB(info.size);
    $(".fc-spec", el.src).textContent = [info.w && `${info.w}×${info.h}`, info.vcodec, info.fps && `${info.fps} fps`, info.duration && fmtTime(info.duration)].filter(Boolean).join(" / ");
    ro("container", L.containers[e] || e.toUpperCase());
    ro("vcodec", info.vcodec ? info.vcodec.toUpperCase() : info.probed ? L.none : "...");
    ro("audio", info.acodec ? info.acodec.toUpperCase() + (info.ahz ? ` ${Math.round(info.ahz / 1000)} kHz` : "") : info.probed ? L.none : "...");
    ro("res", info.w ? `${info.w}×${info.h}${info.fps ? ` / ${info.fps} fps` : ""}` : "...");
    estimate();
    drawSignature();
  }
  function ro(key, val) { const n = $(`[data-ro="${key}"]`, root); if (n) flip(n, val); }

  function outSpec() {
    const o = el.out.value;
    if (isAudio(o)) return `${o.toUpperCase()} / ${o === "wav" ? "PCM" : o === "ogg" ? "VORBIS" : o === "m4a" ? "AAC" : "MP3"}`;
    if (o === "gif") return `GIF / ${Math.min(+el.res.value || 480, 720)} px`;
    const h = targetHeight();
    return [h ? `${h}p` : null, (L.codecs[el.codec.value] || "").split(" ")[0]].filter(Boolean).join(" / ");
  }
  function targetHeight() {
    const short = info.w ? Math.min(info.w, info.h) : 0;
    const r = +el.res.value;
    if (!short) return r || 0;
    return r ? Math.min(r, short) : short;
  }

  function estimate() {
    const o = el.out.value;
    const base = file ? file.name.replace(/\.[^.]+$/, "") || "video" : "";
    flip($(".fc-name", el.outCard), file ? `${base}.${o}` : $(".fc-name", el.outCard).textContent);
    if (!file) return;
    el.outCard.dataset.state = "file";
    flip($(".fc-spec", el.outCard), outSpec());
    ro("target", `${o.toUpperCase()} / ${outSpec()}`);
    const mb = estimateMB();
    flip($(".fc-size", el.outCard), mb ? `~${mb.toFixed(mb < 10 ? 1 : 0)} MB` : o === "gif" ? "GIF" : "...");
    ro("gain", mb ? `${mb < info.size / 1048576 ? "-" : "+"}${Math.abs(Math.round((1 - mb / (info.size / 1048576)) * 1000) / 10)}%` : "...");
  }

  function estimateMB() {
    const o = el.out.value;
    const dur = clipDuration();
    if (!dur) return 0;
    let kbps;
    if (isAudio(o)) kbps = o === "wav" ? 1411 : o === "ogg" ? 160 : el.q.value === "small" ? 128 : el.q.value === "high" ? 256 : 192;
    else if (o === "gif") return 0;
    else if (+el.target.value > 0) return +el.target.value;
    else {
      const h = targetHeight() || 1080;
      const table = [[2160, 16000], [1440, 9000], [1080, 5000], [720, 2800], [480, 1400], [360, 800]];
      const b = (table.find(([r]) => h >= r) || table[5])[1];
      const qf = { high: 1.4, balanced: 1, small: 0.55 }[el.q.value];
      const cf = el.codec.value === "h265" || el.codec.value === "vp9" ? 0.7 : el.codec.value === "mpeg4" ? 1.6 : 1;
      kbps = b * qf * cf;
      // a re-encode rarely needs more than the source bitrate scaled to the new pixel count
      if (info.duration && info.w) {
        const srcK = (info.size * 8) / 1024 / info.duration;
        const px = (targetHeight() / Math.min(info.w, info.h)) ** 2;
        kbps = Math.min(kbps, srcK * px * { high: 1, balanced: 0.7, small: 0.45 }[el.q.value]);
      }
      kbps += el.mute.checked ? 0 : 128;
    }
    return (kbps * dur) / 8 / 1024;
  }

  function clipDuration() {
    const d = info.duration;
    if (!d) return 0;
    const s = Math.max(0, +el.ss.value || 0);
    const e = Math.min(d, +el.to.value || d);
    return Math.max(0.1, e - s);
  }

  // file signature: ebru seeded by the file's own numbers
  function drawSignature() {
    if (!el.sig || !info.duration) return;
    const kbps = info.duration ? (info.size * 8) / 1024 / info.duration : 0;
    el.sig.dataset.seed = `${file.name}|${info.size}`;
    el.sig.dataset.params = JSON.stringify({ kbps, dur: info.duration, fps: info.fps || 30, ratio: info.w ? info.w / info.h : 16 / 9, codec: info.vcodec || "" });
    paintEbru(el.sig);
  }

  // ---------- engine ----------
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
    if (written) await ff.deleteFile(written).catch(() => {});
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
    const as = txt.match(/Audio: (\w+)(?:[^\n]*?(\d{4,6}) Hz)?/);
    if (as) { info.acodec = as[1]; if (as[2]) info.ahz = +as[2]; }
    info.hasAudio = !!as;
    info.probed = true;
    if (file === f) render();
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

  // ---------- timeline: frames get crushed as the encode advances ----------
  function setTimeline(p, label, active) {
    const n = el.frames.length;
    const ratio = Math.max(0.35, Math.min(1, (estimateMB() || info.size / 1048576) / (info.size / 1048576 || 1)));
    el.frames.forEach((f, i) => {
      const pos = (i + 1) / n * 100;
      const done = pos <= p;
      f.classList.toggle("done", done && (!active || p >= 100));
      f.classList.toggle("on", active && done && p < 100);
      f.style.transform = done && active ? `scaleX(${ratio.toFixed(2)})` : p >= 100 ? `scaleX(${ratio.toFixed(2)})` : "";
    });
    const cells = 18, full = Math.round((p / 100) * cells);
    el.tlL.textContent = label;
    el.tlBar.textContent = active || p >= 100 ? "█".repeat(full) + "░".repeat(cells - full) : "";
    el.tlR.textContent = active || p >= 100 ? Math.round(p) + "%" : "";
  }

  async function convert() {
    if (!file || busy) return;
    busy = true;
    error(null);
    resetResult();
    root.classList.add("is-busy");
    el.go.disabled = true;
    el.cancel.hidden = false;
    setTimeline(0, L.loading, true);
    const o = el.out.value;
    const outName = "out." + o;
    const total = clipDuration();
    const onLog = ({ message }) => {
      const m = message.match(/time=(\d+):(\d+):([\d.]+)/);
      if (m && total) setTimeline(Math.min(99, ((+m[1] * 3600 + +m[2] * 60 + +m[3]) / total) * 100), L.converting, true);
    };
    try {
      const ff = await getFFmpeg();
      await probe(ff);
      setTimeline(1, L.converting, true);
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
      showResult(blob, o, (performance.now() - t0) / 1000);
    } catch (e) {
      try { ffmpeg?.off("log", onLog); } catch {}
      if (e?.message !== "cancel") error(L.errConv + (e?.message ? ` (${String(e.message).slice(0, 80)})` : ""));
      setTimeline(0, L.loaded, false);
    } finally {
      busy = false;
      root.classList.remove("is-busy");
      el.cancel.hidden = true;
      el.go.disabled = false;
    }
  }

  function showResult(blob, o, secs) {
    const out = URL.createObjectURL(blob);
    urls.push(out);
    const base = file.name.replace(/\.[^.]+$/, "") || "video";
    const gain = Math.round((1 - blob.size / file.size) * 1000) / 10;
    const playableOut = ["mp4", "webm", "mov"].includes(o);
    let media = "";
    if (playableOut && info.playable) {
      const src = URL.createObjectURL(file);
      urls.push(src);
      media = `<div class="cmp" role="group" aria-label="${L.compare}"><video class="after" src="${out}" muted playsinline preload="metadata"></video><video class="before" src="${src}" muted playsinline preload="metadata"></video><span class="divider"></span><span class="tag tag-b">${L.before} ${fmtMB(file.size)}</span><span class="tag tag-a">${L.after} ${fmtMB(blob.size)}</span><input type="range" min="0" max="100" value="50" aria-label="${L.compare}"><button class="cmp-play" type="button">▶ / ❚❚</button></div>`;
    } else if (playableOut) media = `<video class="solo" controls playsinline src="${out}"></video>`;
    else if (o === "gif") media = `<img class="solo" src="${out}" alt="">`;
    else if (isAudio(o)) media = `<audio controls src="${out}"></audio>`;
    el.result.innerHTML = `${media}<div class="sum"><span class="crush"><s>${fmtMB(file.size)}</s> → ${fmtMB(blob.size)}</span><span class="gain">${gain >= 0 ? "-" + gain : "+" + -gain}%</span><span class="meta">${o.toUpperCase()} / ${outSpec()}<br>${secs.toFixed(1)} s</span><a class="dl" href="${out}" download="${escapeHtml(base)}.${o}">${L.download} .${o.toUpperCase()} <span aria-hidden="true">↓</span></a><button class="again" type="button">${L.again}</button></div>`;
    flip($(".fc-size", el.outCard), fmtMB(blob.size));
    ro("gain", `${gain >= 0 ? "-" : "+"}${Math.abs(gain)}%`);
    $(".again", el.result).onclick = () => { resetResult(); el.go.focus(); };
    const cmp = $(".cmp", el.result);
    if (cmp) wireCompare(cmp);
    setTimeline(100, L.done, false);
    show(el.result);
    root.classList.remove("is-done"); void root.offsetWidth; root.classList.add("is-done");
    if (!reduced && navigator.vibrate) navigator.vibrate(25);
  }

  function wireCompare(cmp) {
    const [after, before] = $$("video", cmp);
    const range = $("input", cmp);
    range.addEventListener("input", () => cmp.style.setProperty("--x", range.value + "%"));
    const sync = () => { if (Math.abs(before.currentTime - after.currentTime) > 0.12) before.currentTime = after.currentTime; };
    after.addEventListener("timeupdate", sync);
    after.addEventListener("seeked", sync);
    before.addEventListener("error", () => { before.remove(); $(".divider", cmp).remove(); $(".tag-b", cmp).remove(); range.remove(); });
    $(".cmp-play", cmp).onclick = () => {
      if (after.paused) { before.currentTime = after.currentTime; after.play(); before.play().catch(() => {}); }
      else { after.pause(); before.pause(); }
    };
    after.addEventListener("ended", () => before.pause());
  }

  function resetResult() {
    show(el.result, false);
    el.result.innerHTML = "";
    root.classList.remove("is-done");
    urls.forEach((u) => URL.revokeObjectURL(u));
    urls = [];
  }

  function cancel() {
    if (!ffmpeg) return;
    ffmpeg.terminate();
    ffmpeg = null; loading = null;
    info.probing = null; info.inName = null; written = "";
    busy = false;
    root.classList.remove("is-busy");
    el.cancel.hidden = true;
    el.go.disabled = false;
    setTimeline(0, L.loaded, false);
    error(L.cancelled);
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
    root.querySelectorAll("[data-show]").forEach((n) => (n.hidden = n.dataset.show !== mode));
    if (!dur) { out.textContent = "-"; return; }
    if (mode === "size") {
      const v = +f("c-vbr").value || 0;
      out.textContent = `${L.size}: ~${(((v + a) * dur) / 8 / 1024).toFixed(1)} MB`;
    } else {
      const t = +f("c-target").value || 0;
      const v = Math.floor((t * 8192 * 0.94) / dur - a);
      out.textContent = v > 0 ? `${L.vbr}: ~${v} kbps` : L.tooSmall;
    }
  };
  root.addEventListener("input", run);
  run();
}

// ---------- Digital Ebru: mathematical marbling seeded by data ----------
// Drops push existing paint outward (p' = c + (p-c)·sqrt(1 + r²/|p-c|²)), then tines comb the surface.
function initEbru() {
  const canvases = $$("canvas.ebru");
  canvases.forEach(paintEbru);
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => canvases.forEach(paintEbru), 200); });
}

function paintEbru(cv) {
  const rect = cv.getBoundingClientRect();
  if (!rect.width) return;
  const dpr = Math.min(2, devicePixelRatio || 1);
  const W = Math.round(rect.width), H = Math.round(rect.height || rect.width * 9 / 16);
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const p = cv.dataset.params ? JSON.parse(cv.dataset.params) : null;
  const rnd = mulberry(hash(cv.dataset.seed || "x"));
  const pal = ["#1347FF", "#E63B2E", "#C9FF32", "#171717", "#F4EFE6", "#1347FF", "#E63B2E"];
  const drops = p ? 7 + Math.round(Math.min(10, (p.fps || 30) / 6)) : 10 + Math.floor(rnd() * 5);
  const tines = p ? 2 + Math.round(Math.min(6, Math.log2(1 + (p.kbps || 4000) / 1500))) : 3 + Math.floor(rnd() * 3);
  const sharp = p ? 6 + Math.min(30, p.dur || 10) : 10 + rnd() * 20;
  const shapes = [];
  const N = 140;
  for (let d = 0; d < drops; d++) {
    const cx = W * (0.12 + rnd() * 0.76), cy = H * (0.15 + rnd() * 0.7);
    const r = Math.min(W, H) * (0.08 + rnd() * 0.2);
    for (const s of shapes) for (const pt of s.pts) {
      const dx = pt[0] - cx, dy = pt[1] - cy, m2 = dx * dx + dy * dy || 1e-6;
      const k = Math.sqrt(1 + (r * r) / m2);
      pt[0] = cx + dx * k; pt[1] = cy + dy * k;
    }
    const pts = [];
    for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    shapes.push({ pts, color: pal[(d + (p ? (p.codec || "").length : 0)) % pal.length] });
  }
  const u = 1 / Math.pow(2, 1 / sharp);
  for (let t = 0; t < tines; t++) {
    const vertical = t % 2 === 0;
    const pos = (vertical ? W : H) * (0.1 + rnd() * 0.8);
    const z = (vertical ? H : W) * (0.15 + rnd() * 0.25) * (rnd() < 0.5 ? -1 : 1);
    for (const s of shapes) for (const pt of s.pts) {
      if (vertical) pt[1] += z * Math.pow(u, Math.abs(pt[0] - pos));
      else pt[0] += z * Math.pow(u, Math.abs(pt[1] - pos));
    }
  }
  ctx.fillStyle = "#F4EFE6";
  ctx.fillRect(0, 0, W, H);
  for (const s of shapes) {
    ctx.beginPath();
    s.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
  }
}
function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
