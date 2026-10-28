// Static site generator for mp4donusturucu.com
// Usage: SITE_URL=https://mp4donusturucu.com BASE=/ node build.mjs
import fs from "node:fs";
import path from "node:path";
import { UI, h } from "./content/ui.mjs";
import trPages from "./content/tr.mjs";
import enPages from "./content/en.mjs";
import frPages from "./content/fr.mjs";

const SITE = (process.env.SITE_URL || "https://mp4donusturucu.com").replace(/\/$/, "");
const BASE = process.env.BASE || "/";
const OUT = path.resolve("dist");
const UPDATED = "2026-10-28";
const ORG = { name: "mp4donusturucu.com", url: SITE + "/" };

const pages = [...trPages, ...enPages, ...frPages];
const byPath = new Map(pages.map((p) => [p.path, p]));
const byKey = new Map();
for (const p of pages) if (p.key) (byKey.get(p.key) || byKey.set(p.key, []).get(p.key)).push(p);

const href = (p) => BASE + p;
const abs = (p) => SITE + "/" + p;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s).replace(/<[^>]+>/g, "");

const LOGO = `<svg class="mark" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect x="1.5" y="1.5" width="31" height="31" fill="#F4EFE6" stroke="#171717" stroke-width="3"/><rect x="6" y="9" width="11" height="15" fill="#E63B2E" transform="rotate(-6 11.5 16.5)"/><rect x="17" y="10" width="11" height="15" fill="#C9FF32" stroke="#171717" stroke-width="1.5" transform="rotate(5 22.5 17.5)"/></svg>`;
const ROTOR = (txt) => `<svg class="rotor-ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="rp" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="2"/><text><textPath href="#rp" textLength="488">${txt}</textPath></text></svg>`;
const OUTS = ["mp4", "webm", "mov", "mkv", "avi", "gif", "mp3", "m4a", "wav", "ogg"];

function toolBlock(p, u) {
  const t = p.tool, T = u.tool;
  const data = Object.entries(t).map(([k, v]) => `data-${k}="${esc(v)}"`).join(" ");
  const res = ["", "2160", "1440", "1080", "720", "480", "360"];
  const sel = (id, label, opts) => `<label class="field"><span>${label}</span><select id="${id}">${opts}</select></label>`;
  return `<div class="machine" id="tool" ${data}>
  <section class="bay bay-src" aria-label="${T.source}">
    <header class="bay-h"><span>${T.source}</span><span class="bay-idx">IN</span></header>
    <div class="slot" id="drop">
      <input type="file" id="file" accept="video/*,audio/*,.mkv,.flv,.ts,.mts,.m2ts,.3gp,.ogv,.mpg,.mpeg,.m4v,.avi,.mov,.gif" aria-label="${esc(T.pick)}">
      <div class="filecard filecard-src" data-state="idle">
        <div class="fc-idle"><strong>${T.drop}</strong><span class="fc-cta">${T.pickCta}</span><small>${T.dropSub}</small></div>
        <div class="fc-file"><b class="fc-name"></b><span class="fc-size"></span><span class="fc-spec"></span></div>
      </div>
    </div>
    <ul class="accepts" aria-label="${T.accepts}">${["MOV", "MKV", "AVI", "WEBM", "3GP", "TS", "FLV", "MPEG", "OGV", "MP4"].map((f) => `<li>${f}</li>`).join("")}</ul>
  </section>
  <div class="rotor" aria-hidden="true">${ROTOR(T.rotor)}<span class="rotor-core">&#8635;</span></div>
  <section class="bay bay-out" aria-label="${T.output}">
    <header class="bay-h"><span>${T.output}</span><span class="bay-idx">OUT</span></header>
    <div class="filecard filecard-out" data-state="idle">
      <b class="fc-name">${T.waiting}</b><span class="fc-size">&nbsp;</span><span class="fc-spec">&nbsp;</span>
      <span class="stamp" aria-hidden="true">${T.stamp}</span>
    </div>
    <fieldset class="targets"><legend>${T.out}</legend>${OUTS.map((o) => `<label class="tgt"><input type="radio" name="out" value="${o}"${o === (t.out || "mp4") ? " checked" : ""}><span>${o.toUpperCase()}</span></label>`).join("")}</fieldset>
    <div class="row2">
      ${sel("quality", T.quality, `<option value="high">${T.qHigh}</option><option value="balanced" selected>${T.qBal}</option><option value="small">${T.qSmall}</option>`)}
      ${sel("res", T.res, res.map((r) => `<option value="${r}">${r ? r + "p" : T.orig}</option>`).join(""))}
    </div>
    <details class="adv"><summary>${T.adv}</summary><div class="adv-grid">
      ${sel("codec", T.codec, "")}
      <label class="field"><span>${T.ss}</span><input type="number" id="ss" min="0" step="0.1" placeholder="0" inputmode="decimal"></label>
      <label class="field"><span>${T.to}</span><input type="number" id="to" min="0" step="0.1" inputmode="decimal"></label>
      <label class="field"><span>${T.target}</span><input type="number" id="target" min="0" step="1" placeholder="-" inputmode="numeric"></label>
      ${sel("aspect", T.aspect, `<option value="">${T.none}</option><option>16:9</option><option>9:16</option><option>1:1</option><option>4:5</option>`)}
      ${sel("rot", T.rot, `<option value="0">0&deg;</option><option value="90">90&deg;</option><option value="180">180&deg;</option><option value="270">270&deg;</option>`)}
      ${sel("fps", T.fps, `<option value="">${T.orig}</option><option>60</option><option>30</option><option>24</option><option>15</option><option>12</option>`)}
      <label class="check"><input type="checkbox" id="mute"><span>${T.mute}</span></label>
    </div></details>
    <div class="actions"><button class="go" id="go" type="button" disabled><span>${T.go}</span><span aria-hidden="true">&rarr;</span></button><button class="stop" id="cancel" type="button" hidden>${T.cancel}</button></div>
  </section>
  <aside class="readout" aria-label="${T.readout}">
    <header class="bay-h"><span>${T.readout}</span></header>
    <p class="ro-title">${T.anatomy}</p>
    <dl class="ro">
      <div><dt>${T.container}</dt><dd data-ro="container">...</dd></div>
      <div><dt>${T.vcodec}</dt><dd data-ro="vcodec">...</dd></div>
      <div><dt>${T.audio}</dt><dd data-ro="audio">...</dd></div>
      <div><dt>${T.resolution}</dt><dd data-ro="res">...</dd></div>
      <div><dt>${T.targetL}</dt><dd data-ro="target">...</dd></div>
      <div class="ro-big"><dt>${T.estimated}</dt><dd data-ro="gain">...</dd></div>
    </dl>
    <figure class="sig"><canvas class="ebru" data-seed="${esc(p.path || "home")}" aria-hidden="true"></canvas><figcaption>${T.signature}</figcaption></figure>
  </aside>
  <div class="timeline" role="status" aria-live="polite">
    <div class="frames" aria-hidden="true">${"<i></i>".repeat(32)}</div>
    <div class="tl-text"><span class="l">${T.ready}</span><span class="bar mono" aria-hidden="true"></span><span class="r"></span></div>
  </div>
  <div class="result" aria-live="polite"></div>
  <div class="err" role="alert"></div>
  <p class="note">${T.note}</p>
</div>
<script type="application/json" id="i18n">${JSON.stringify(u.js)}</script>`;
}

function related(p, u) {
  const list = (p.related || []).map((x) => byPath.get(x)).filter(Boolean);
  if (!list.length) return "";
  return `<section class="rel"><h2>${u.related}</h2><div class="cards">${list.map((r) => `<a class="card" href="${href(r.path)}"><b>${r.short || r.h1}</b><span>${r.cardText || strip(r.desc).slice(0, 90)}</span></a>`).join("")}</div></section>`;
}

function faqBlock(p, u) {
  if (!p.faq?.length) return "";
  return `<section class="faq"><h2>${u.faqTitle}</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</section>`;
}

function schema(p, u) {
  const g = [];
  if (p.home) {
    g.push({ "@type": "Organization", "@id": abs("#org"), name: ORG.name, url: ORG.url, logo: abs("assets/og.png"), alternateName: "MP4 Dönüştürücü", description: "Tarayıcı tabanlı, gizlilik öncelikli video dönüştürme ve sıkıştırma araçları." });
    g.push({ "@type": "WebSite", "@id": abs("#site"), url: ORG.url, name: "MP4 Dönüştürücü", alternateName: "mp4donusturucu.com", inLanguage: ["tr", "en", "fr"], publisher: { "@id": abs("#org") } });
  }
  if (p.tool || p.calc) {
    g.push({
      "@type": "WebApplication", name: strip(p.h1), url: abs(p.path), applicationCategory: p.calc ? "UtilitiesApplication" : "MultimediaApplication", isAccessibleForFree: true, operatingSystem: "Web", inLanguage: p.lang,
      description: p.desc, browserRequirements: "Requires JavaScript and WebAssembly",
      featureList: p.calc ? undefined : u.features, offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" }, publisher: { "@id": abs("#org") },
    });
  }
  if (p.type === "guide") {
    g.push({ "@type": "Article", headline: strip(p.h1), description: p.desc, inLanguage: p.lang, dateModified: UPDATED, datePublished: UPDATED, mainEntityOfPage: abs(p.path), author: { "@type": "Organization", name: ORG.name, url: ORG.url }, publisher: { "@id": abs("#org") } });
  }
  if (!p.home && !p.noindex) {
    g.push({ "@type": "BreadcrumbList", itemListElement: [[u.home, u.homePath], ...(p.crumbs || []), [strip(p.short || p.h1), p.path]].map(([n, x], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: abs(x) })) });
  }
  if (p.faq?.length) {
    g.push({ "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })) });
  }
  if (!p.home && !g.some((x) => x["@type"] === "Organization")) g.unshift({ "@type": "Organization", "@id": abs("#org"), name: ORG.name, url: ORG.url });
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": g }).replace(/</g, "\\u003c")}</script>`;
}

function alternates(p) {
  const group = p.key ? byKey.get(p.key) : [p];
  const tags = group.map((x) => `<link rel="alternate" hreflang="${x.lang}" href="${abs(x.path)}">`);
  const def = group.find((x) => x.lang === "tr");
  if (def && group.length > 1) tags.push(`<link rel="alternate" hreflang="x-default" href="${abs(def.path)}">`);
  return group.length > 1 ? tags.join("\n") : "";
}

function langSwitch(p) {
  const group = p.key ? byKey.get(p.key) : [];
  return `<nav class="lang" aria-label="Language">${["tr", "en", "fr"].map((l) => {
    const t = group.find((x) => x.lang === l) || byPath.get(UI[l].homePath);
    return `<a href="${href(t.path)}" hreflang="${l}" lang="${l}"${l === p.lang ? ' aria-current="true"' : ""}>${l.toUpperCase()}</a>`;
  }).join("")}</nav>`;
}

function layout(p) {
  const u = UI[p.lang];
  const crumbs = !p.home
    ? `<nav class="crumbs" aria-label="breadcrumb"><a href="${href(u.homePath)}">${u.home}</a>${(p.crumbs || []).map(([n, x]) => `<span aria-hidden="true">/</span><a href="${href(x)}">${n}</a>`).join("")}<span aria-hidden="true">/</span><span aria-current="page">${p.short || strip(p.h1)}</span></nav>` : "";
  const h1 = p.h1.replace("→", '<span class="arr">→</span>');
  const tele = `<dl class="tele">${u.tele.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  const head = p.tool
    ? `<section class="hero"><div class="hero-head"><div class="hh-main">${crumbs}<h1>${h1}</h1>${p.tagline ? `<p class="tagline">${p.tagline}</p>` : ""}<p class="lead">${p.lead}</p></div>${tele}</div>${toolBlock(p, u)}</section>`
    : `<section class="page-head"><div class="ph-main">${crumbs}<h1>${h1}</h1>${p.lead ? `<p class="lead">${p.lead}</p>` : ""}${p.type === "guide" ? `<p class="updated">${u.updated}: <time datetime="${UPDATED}">${u.date}</time><br>${u.byline}</p>` : ""}</div><canvas class="ebru ebru-band" data-seed="${esc(p.path || "404")}" aria-hidden="true"></canvas></section>`;
  const privacy = p.tool ? `<aside class="privacy"><p class="pv-tag">${u.privTag}</p><h2>${u.privTitle}</h2><p>${u.privText} <a href="${href(u.howPath)}">${u.howLabel}</a></p></aside>` : "";
  const sources = p.sources ? `<p class="sources"><span>${u.sourcesLabel}</span> ${p.sources.map(([n, x]) => `<a href="${x}" rel="noopener">${n}</a>`).join(" ")}</p>` : "";
  const body = (p.body || "").replaceAll('class="answer"', `class="answer" data-l="${u.answerL}"`);
  const title = p.title;
  return `<!doctype html>
<html lang="${p.lang}" data-base="${BASE}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${abs(p.path)}">`}
${p.noindex ? "" : alternates(p)}
<meta property="og:type" content="${p.type === "guide" ? "article" : "website"}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${abs(p.path)}">
<meta property="og:site_name" content="mp4donusturucu.com">
<meta property="og:locale" content="${u.locale}">
<meta property="og:image" content="${abs("assets/og.png")}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="mp4donusturucu.com">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F4EFE6">
<link rel="icon" href="${href("assets/icon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${href("assets/style.css")}">
${schema(p, u)}
</head>
<body class="${p.tool ? "is-tool" : "is-page"}">
<a class="skip" href="#main">${u.skip}</a>
<header class="top"><div class="wrap">
<a class="logo" href="${href(u.homePath)}">${LOGO}<span class="wm">mp4<b>donusturucu</b></span></a>
<nav class="nav" aria-label="${u.navLabel}">${u.nav.map(([n, x], i) => `<a href="${href(x)}"${i > 0 ? ' class="hide-m"' : ""}>${n}</a>`).join("")}</nav>
${langSwitch(p)}
</div></header>
<main id="main" class="wrap">
${head}
<div class="content">
${body}
${privacy}
${faqBlock(p, u)}
${sources}
</div>
${related(p, u)}
</main>
<footer class="foot"><div class="wrap">
<p class="foot-big" aria-hidden="true">${u.footBig}</p>
<div class="cols">
<div><a class="logo" href="${href(u.homePath)}">${LOGO}<span class="wm">mp4<b>donusturucu</b></span></a><p>${u.footerText}</p></div>
${u.footer.map(([t, links]) => `<div><h2>${t}</h2><ul>${links.filter((x) => byPath.has(x)).map((x) => `<li><a href="${href(x)}">${byPath.get(x).short || strip(byPath.get(x).h1)}</a></li>`).join("")}</ul></div>`).join("")}
</div><p class="legal">&copy; 2026 mp4donusturucu.com. ${u.footerLegal}</p></div></footer>
<script type="module" src="${href("assets/app.js")}"></script>
</body>
</html>`;
}

// ---------- build ----------
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, f), { recursive: true, force: true });
const write = (rel, content) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
const titles = new Set();
for (const p of pages) {
  if (titles.has(p.title)) console.warn("duplicate title:", p.title);
  titles.add(p.title);
  write(p.path === "404.html" ? "404.html" : path.join(p.path, "index.html"), layout(p));
}

// assets
const cp = (from, to) => { fs.mkdirSync(path.dirname(path.join(OUT, to)), { recursive: true }); fs.cpSync(from, path.join(OUT, to), { recursive: true }); };
cp("src/assets", "assets");
cp("node_modules/@ffmpeg/ffmpeg/dist/esm", "assets/vendor/ffmpeg");
cp("node_modules/@ffmpeg/core/dist/esm", "assets/vendor/core");
for (const f of fs.readdirSync(path.join(OUT, "assets/vendor/ffmpeg"))) if (f.endsWith(".d.ts") || f.endsWith(".d.mts")) fs.rmSync(path.join(OUT, "assets/vendor/ffmpeg", f));
write("assets/vendor/LICENSES.txt", "ffmpeg.wasm (@ffmpeg/ffmpeg, @ffmpeg/core) - MIT License for wrapper code; FFmpeg core built with --enable-gpl (GPL v2+).\nSource: https://github.com/ffmpegwasm/ffmpeg.wasm and https://ffmpeg.org/\n");

// sitemaps per language
const indexable = pages.filter((p) => !p.noindex);
for (const lang of ["tr", "en", "fr"]) {
  const urls = indexable.filter((p) => p.lang === lang).map((p) => {
    const group = p.key ? byKey.get(p.key) : [];
    const alts = group.length > 1 ? group.map((x) => `<xhtml:link rel="alternate" hreflang="${x.lang}" href="${abs(x.path)}"/>`).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(group.find((x) => x.lang === "tr").path)}"/>` : "";
    return `<url><loc>${abs(p.path)}</loc><lastmod>${UPDATED}</lastmod>${alts}</url>`;
  });
  write(`sitemap-${lang}.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
}
write("sitemap-index.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["tr", "en", "fr"].map((l) => `<sitemap><loc>${abs(`sitemap-${l}.xml`)}</loc><lastmod>${UPDATED}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${abs("sitemap-index.xml")}\n`);

const ll = (lang, filter) => indexable.filter((p) => p.lang === lang && filter(p)).map((p) => `- [${strip(p.short || p.h1)}](${abs(p.path)}): ${p.desc}`).join("\n");
write("llms.txt", `# mp4donusturucu.com

> Turkish-first, browser-based video conversion and compression tools (English and French versions available). Files are processed locally in the user's browser with ffmpeg.wasm (WebAssembly); in standard mode no media is uploaded to a server.

## Core tools (Turkish)
${ll("tr", (p) => p.tool)}

## Reference guides (Turkish)
${ll("tr", (p) => p.type === "guide")}

## Trust and policies
${ll("tr", (p) => p.type === "page" && !p.home)}

## English
${ll("en", () => true)}

## French
${ll("fr", () => true)}
`);
if (process.env.CNAME) write("CNAME", process.env.CNAME + "\n");
write(".nojekyll", "");
console.log(`built ${pages.length} pages -> ${OUT} (SITE=${SITE}, BASE=${BASE})`);
