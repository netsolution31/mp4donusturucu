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

const LOGO = `<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#37D6FF"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs><rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="url(#lg)" stroke-width="2"/><path d="M12 9.5v13l11-6.5z" fill="url(#lg)"/></svg>`;
const RING = `<svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#37D6FF"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>${Array.from({ length: 24 }, (_, i) => `<rect x="57" y="4" width="6" height="12" rx="2" fill="url(#rg)" opacity="${(0.25 + (i % 6) / 8).toFixed(2)}" transform="rotate(${i * 15} 60 60)"/>`).join("")}</svg>`;
const SHIELD = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#31E981" stroke-width="1.6" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>`;


function toolBlock(p, u) {
  const t = p.tool;
  const data = Object.entries(t).map(([k, v]) => `data-${k}="${esc(v)}"`).join(" ");
  const outs = ["mp4", "webm", "mov", "mkv", "avi", "gif", "mp3", "m4a", "wav", "ogg"];
  const res = ["", "2160", "1440", "1080", "720", "480", "360"];
  return `<div class="tool" id="tool" ${data}>
  <div class="drop" id="drop">
    <input type="file" id="file" accept="video/*,audio/*,.mkv,.flv,.ts,.mts,.m2ts,.3gp,.ogv,.mpg,.mpeg,.m4v,.avi,.mov,.gif" aria-label="${esc(u.tool.pick)}">
    <div><div class="ring">${RING}<div class="core"><svg width="26" height="26" viewBox="0 0 24 24" fill="#061018" aria-hidden="true"><path d="M12 4l-5 5h3v6h4V9h3z"/><path d="M5 18h14v2H5z"/></svg></div></div>
    <strong>${u.tool.drop}</strong><small>${u.tool.dropSub}</small>
    <div class="chips">${["MP4", "MOV", "MKV", "AVI", "WEBM", "3GP", "TS", "FLV"].map((f) => `<span class="chip">${f}</span>`).join("")}</div></div>
  </div>
  <div class="file"><div style="flex:1;min-width:0"><div class="name"></div><div class="meta"></div></div><div class="fmtflow"></div></div>
  <div class="opts">
    <label>${u.tool.out}<select id="out">${outs.map((o) => `<option value="${o}">${o.toUpperCase()}</option>`).join("")}</select></label>
    <label>${u.tool.quality}<select id="quality"><option value="high">${u.tool.qHigh}</option><option value="balanced" selected>${u.tool.qBal}</option><option value="small">${u.tool.qSmall}</option></select></label>
    <label>${u.tool.res}<select id="res">${res.map((r) => `<option value="${r}">${r ? r + "p" : u.tool.orig}</option>`).join("")}</select></label>
  </div>
  <details class="adv"><summary>${u.tool.adv}</summary><div class="grid">
    <label>${u.tool.codec}<select id="codec"></select></label>
    <label>${u.tool.ss}<input type="number" id="ss" min="0" step="0.1" placeholder="0" inputmode="decimal"></label>
    <label>${u.tool.to}<input type="number" id="to" min="0" step="0.1" inputmode="decimal"></label>
    <label>${u.tool.target}<input type="number" id="target" min="0" step="1" placeholder="-" inputmode="numeric"></label>
    <label>${u.tool.aspect}<select id="aspect"><option value="">${u.tool.none}</option><option>16:9</option><option>9:16</option><option>1:1</option><option>4:5</option></select></label>
    <label>${u.tool.rot}<select id="rot"><option value="0">0&deg;</option><option value="90">90&deg;</option><option value="180">180&deg;</option><option value="270">270&deg;</option></select></label>
    <label>${u.tool.fps}<select id="fps"><option value="">${u.tool.orig}</option><option>60</option><option>30</option><option>24</option><option>15</option><option>12</option></select></label>
    <label class="check"><input type="checkbox" id="mute"> ${u.tool.mute}</label>
  </div></details>
  <div class="est" aria-live="polite"></div>
  <div class="actions"><button class="btn" id="go" type="button" disabled>${u.tool.go}</button><button class="btn ghost" id="cancel" type="button" hidden>${u.tool.cancel}</button></div>
  <div class="progress" role="status"><div class="bar"><i></i></div><div class="ptext"><span class="l"></span><span class="r"></span></div></div>
  <div class="result" aria-live="polite"></div>
  <div class="err" role="alert"></div>
  <p class="note">${u.tool.note}</p>
</div>
<script type="application/json" id="i18n">${JSON.stringify(u.js)}</script>`;
}

function related(p, u) {
  const list = (p.related || []).map((x) => byPath.get(x)).filter(Boolean);
  if (!list.length) return "";
  return `<section><h2>${u.related}</h2><div class="cards">${list.map((r) => `<a class="card" href="${href(r.path)}"><b>${r.short || r.h1}</b><span>${r.cardText || strip(r.desc).slice(0, 90)}</span></a>`).join("")}</div></section>`;
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
  const crumbs = p.crumbs?.length || !p.home
    ? `<nav class="crumbs" aria-label="breadcrumb"><a href="${href(u.homePath)}">${u.home}</a>${(p.crumbs || []).map(([n, x]) => ` / <a href="${href(x)}">${n}</a>`).join("")} / <span>${p.short || strip(p.h1)}</span></nav>` : "";
  const head = p.tool
    ? `<section class="hero"><div>${crumbs}<h1>${p.h1}</h1><p class="lead">${p.lead}</p><ul class="shield">${u.shield.map((s) => `<li>${s}</li>`).join("")}</ul></div>${toolBlock(p, u)}</section>`
    : `<div style="padding-top:28px">${crumbs}<h1>${p.h1}</h1>${p.lead ? `<p class="lead">${p.lead}</p>` : ""}${p.type === "guide" ? `<p class="updated">${u.updated}: <time datetime="${UPDATED}">${u.date}</time> · ${u.byline}</p>` : ""}</div>`;
  const privacy = p.tool ? `<aside class="privacy">${SHIELD}<div><h3 style="margin-top:0">${u.privTitle}</h3><p>${u.privText} <a href="${href(u.howPath)}">${u.howLabel}</a></p></div></aside>` : "";
  const sources = p.sources ? `<p class="sources">${u.sourcesLabel}: ${p.sources.map(([n, x]) => `<a href="${x}" rel="noopener">${n}</a>`).join(" · ")}</p>` : "";
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
<meta property="og:type" content="website">
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
<meta name="theme-color" content="#080A0F">
<link rel="icon" href="${href("assets/icon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap">
<link rel="stylesheet" href="${href("assets/style.css")}">
${schema(p, u)}
</head>
<body>
<a class="skip" href="#main">${u.skip}</a>
<header class="top"><div class="wrap">
<a class="logo" href="${href(u.homePath)}">${LOGO}<span>mp4<b>donusturucu</b></span></a>
<nav class="nav" aria-label="${u.navLabel}">${u.nav.map(([n, x], i) => `<a href="${href(x)}"${i > 0 ? ' class="hide-m"' : ""}>${n}</a>`).join("")}${langSwitch(p)}</nav>
</div></header>
<main id="main" class="wrap">
${head}
<div class="content">
${p.body || ""}
${privacy}
${faqBlock(p, u)}
${sources}
</div>
${related(p, u)}
</main>
<footer><div class="wrap"><div class="cols">
<div><a class="logo" href="${href(u.homePath)}">${LOGO}<span>mp4<b>donusturucu</b></span></a><p>${u.footerText}</p></div>
${u.footer.map(([t, links]) => `<div><h4>${t}</h4><ul>${links.filter((x) => byPath.has(x)).map((x) => `<li><a href="${href(x)}">${byPath.get(x).short || strip(byPath.get(x).h1)}</a></li>`).join("")}</ul></div>`).join("")}
</div><p style="margin-top:28px">&copy; 2026 mp4donusturucu.com · ${u.footerLegal}</p></div></footer>
${p.tool || p.calc ? `<script type="module" src="${href("assets/app.js")}"></script>` : ""}
</body>
</html>`;
}

// ---------- build ----------
fs.rmSync(OUT, { recursive: true, force: true });
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
