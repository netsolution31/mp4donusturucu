# DESIGN.md - Dönüşüm Makinesi

Source: `newdesign.pdf` (direction A, "Dönüşüm Makinesi"), implemented in `src/assets/style.css`, `src/assets/app.js`, `build.mjs`.

## Thesis
The site is a conversion machine, not a SaaS landing page. The file enters as a physical card, the codec labels change, the frames get crushed, the output is stamped. Every element must talk about video, conversion or format.

## Palette (printed workshop, light theme locked)
| Token | Hex | Role |
|---|---|---|
| `--paper` | #F4EFE6 | page background |
| `--ink` | #171717 | text, 2px borders, hard offset shadows, source bay |
| `--blue` | #1347FF | links, live readout panel, focus ring |
| `--red` | #E63B2E | source file card, arrows, accents (large text only on paper) |
| `--lime` | #C9FF32 | output card, READY states, hovers, on-ink labels |
| `--lime-paper` | #F0F8D6 | output bay |

## Type
- Display and body: Archivo (variable width). Headings 72-80% width, weight 800-850, tight leading.
- Telemetry / UI labels: IBM Plex Mono, uppercase, 0.06-0.08em tracking.

## Shape
- Radius 0 everywhere. Borders 2px ink. Elevation is a hard offset shadow (no blur), used on the machine, cards on hover, ebru band.

## Signature components
- File cards: red source (rotate -3deg), lime output (rotate 2deg).
- Rotor: circular text "DÖNÜŞTÜR ↻ CONVERT ↻ TRANSFORME", spins only while converting.
- Live readout (blue): container, codecs, resolution, target, estimated gain.
- Timeline: 32 frames, red while encoding, lime when done, scaled to the expected compression ratio.
- READY stamp, before/after compare slider (clip-path + range input).
- Digital Ebru: mathematical marbling (drop + tine transforms) seeded by page path, or by the file's bitrate, duration and FPS.

## Motion
- UI 150-250ms ease-out; brand moments: card drop 550ms, stamp 340ms, codec flip 320ms.
- All motion disabled under `prefers-reduced-motion` (stamp shown statically). No haptics under reduced motion.

## Rules
- No gradients, glass, glows, pills-everywhere or generic icon sets.
- No ad placement between file selection and download.
- Mobile: stacked machine, convert bar fixed at bottom once a file is selected.
