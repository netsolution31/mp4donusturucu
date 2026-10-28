# mp4donusturucu.com

Static site: browser-based video converter (ffmpeg.wasm), Turkish first, EN/FR.

```
npm install
SITE_URL=https://mp4donusturucu.com BASE=/ CNAME=mp4donusturucu.com node build.mjs   # custom domain
SITE_URL=https://netsolution31.github.io/mp4donusturucu BASE=/mp4donusturucu/ node build.mjs   # GitHub Pages project URL
```

Output in `dist/`, deployed to the `gh-pages` branch.
