// English pages (/en/)
import { h, SRC } from "./ui.mjs";

const P = (t) => `${t} | mp4donusturucu`;
const S = (...k) => k.map((x) => SRC[x]);
const steps = (src, dst) => h.steps([
  `<strong>Choose your file.</strong> Drop your ${src ? src + " " : ""}video or tap the area to pick it. Format, resolution and duration are detected automatically.`,
  `<strong>Check the settings.</strong> The output is preset to ${dst}. Adjust quality, resolution and advanced options if needed.`,
  `<strong>Convert and download.</strong> Press "Convert", preview the result and save it to your device.`,
]);
const privacyFaq = ["Is my video uploaded to a server?", "No. Conversion runs entirely in your browser with FFmpeg compiled to WebAssembly. The file never leaves your device and is cleared from memory when you close the tab."];
const tool = (o) => ({ lang: "en", type: "tool", crumbs: [["Video converter", "en/"]], sources: S("ffFormats", "x264", "wasm"), ...o, title: P(o.title) });
const page = (o) => ({ lang: "en", type: "page", ...o, title: P(o.title) });

export default [
  tool({
    path: "en/", key: "home", crumbs: undefined, home: true, title: "MP4 Converter: Free In-Browser Video Converter, No Upload",
    desc: "Free MP4 converter that runs in your browser. Convert MOV, MKV, AVI, WebM and more to MP4, GIF or MP3. No upload, no watermark, no sign-up.",
    h1: "MP4 Converter", short: "MP4 converter", tagline: "Drop your video in. <em>We transform it.</em>",
    lead: "Convert video in your browser. Your file stays on your device. Turn MOV, MKV, AVI, WebM, 3GP and more into MP4, WebM, GIF or MP3.",
    tool: { out: "mp4" },
    body: `<p class="answer">An MP4 converter re-packages and, when needed, re-encodes a video into the MP4 container. mp4donusturucu.com does this on your device in supported browsers: the file is never uploaded and can be encoded with H.264, H.265 or VP9 depending on your target.</p>
<h2>How to use it</h2>${steps("", "MP4")}
<h2>Why use this converter?</h2>${h.table(["Feature", "Details"], [["No upload", "FFmpeg runs in your browser via WebAssembly. Your video is never sent to a server."], ["Real FFmpeg", "Industry-standard engine: H.264, H.265, VP9, AAC, Opus, MP3."], ["Full control", "Quality, resolution, codec, FPS, trim, crop, rotate, mute and target file size."], ["Free, no watermark", "No account, no logo added to your video."]])}
<h2>Supported formats</h2><p><strong>Input:</strong> <span class="mono">MP4, MOV, MKV, AVI, WebM, MPEG, MPG, M4V, 3GP, FLV, TS, MTS, M2TS, OGV, GIF</span><br><strong>Output:</strong> <span class="mono">MP4, WebM, MOV, MKV, AVI, GIF, MP3, M4A, WAV, OGG</span></p>
<h2>What is MP4?</h2><p>MP4 (MPEG-4 Part 14, ISO/IEC 14496-14) is a container that holds video, audio and subtitles in one file. It usually carries H.264 video and AAC audio, the combination with the widest support across phones, computers, smart TVs and browsers.</p>`,
    faq: [privacyFaq, ["Is it free?", "Yes. All tools are free, require no account and add no watermark."], ["Is there a file size limit?", "The practical limit is your device memory. Files up to about 500 MB work on most computers; files over 2 GB are not supported in the browser."], ["Can I download videos from YouTube or Instagram?", "No. This is not a downloader. It only converts files on your device that you own or are allowed to use."]],
    related: ["en/video-compressor/", "en/mov-to-mp4/", "en/mkv-to-mp4/", "en/mp4-to-mp3/", "en/video-to-gif/"],
  }),
  tool({
    path: "en/mov-to-mp4/", key: "mov", title: "MOV to MP4 Converter: Free, No Upload",
    desc: "Convert MOV (iPhone, QuickTime) to MP4 in your browser. HEVC to H.264 for Windows, Android and the web. No upload, no watermark.",
    h1: "MOV → MP4 Converter", short: "MOV → MP4", cardText: "Make iPhone and QuickTime videos play everywhere",
    lead: "Convert your MOV video to MP4 in your browser. On supported devices the file is processed locally and never uploaded.",
    tool: { out: "mp4" },
    body: `<p class="answer">To convert MOV to MP4, drop the file above and press "Convert". Video is encoded with H.264 and audio with AAC, the most widely supported combination. This fixes the common problem of iPhone HEVC videos not playing on Windows, Android or web platforms.</p>
<h2>What is MOV?</h2><p>MOV is Apple's QuickTime container. It is the default output of iPhone, iPad and Mac cameras and usually contains H.264 or HEVC (H.265) video with AAC audio. Professional workflows also store ProRes in MOV.</p>
<h2>How to use it</h2>${steps("MOV", "MP4")}
<h2>Recommended settings</h2>${h.table(["Goal", "Settings"], [["General sharing", "MP4, Balanced, Original resolution"], ["Archive or editing", "MP4, High"], ["Messaging / email", "MP4, Small file, 720p or a target size (see the <a href=\"../video-compressor/\">video compressor</a>)"]])}
<h2>Troubleshooting</h2>${h.ul(["<strong>Black picture, audio plays:</strong> the source is probably HEVC. Keep H.264 as the codec.", "<strong>ProRes file is huge:</strong> try a short section first or lower the resolution.", "<strong>Video is sideways:</strong> apply a 90° or 270° rotation in advanced settings."])}`,
    faq: [privacyFaq, ["Will quality drop?", "Re-encoding has a theoretical loss, but at Balanced or High quality the difference is usually invisible."]],
    related: ["en/video-compressor/", "en/mkv-to-mp4/", "en/"],
  }),
  tool({
    path: "en/mkv-to-mp4/", key: "mkv", title: "MKV to MP4 Converter: Free, In Your Browser",
    desc: "Convert MKV to MP4 locally in your browser. Play MKV on iPhone, TVs and editors. No upload, no watermark, free.",
    h1: "MKV → MP4 Converter", short: "MKV → MP4", cardText: "Make Matroska files play on phones and TVs",
    lead: "Convert MKV files to MP4 directly in your browser. Nothing is uploaded.",
    tool: { out: "mp4" },
    body: `<p class="answer">To convert MKV to MP4, drop the file above and press "Convert". The main video and audio tracks are encoded as H.264 and AAC in an MP4 file that plays on iPhone, smart TVs, editors and social platforms.</p>
<h2>What is MKV?</h2><p>MKV (Matroska) is an open container that can hold many audio tracks, subtitles and chapters. It is great for archiving, and OBS recommends it for recording, but many phones, TVs and editors do not open it directly.</p>
<h2>How to use it</h2>${steps("MKV", "MP4")}
<h2>Good to know</h2>${h.ul(["Subtitle tracks are not included in the MP4 output.", "FFmpeg picks the audio track with the most channels by default.", "DTS or AC-3 audio is converted to AAC for compatibility."])}`,
    faq: [privacyFaq, ["Are subtitles kept?", "No. Only the main video and audio tracks are converted. Keep subtitles as a separate SRT file if you need them."]],
    related: ["en/mov-to-mp4/", "en/video-compressor/", "en/"],
  }),
  tool({
    path: "en/mp4-to-mp3/", key: "mp4mp3", title: "MP4 to MP3 Converter: Extract Audio, No Upload",
    desc: "Convert MP4 to MP3 in your browser at 128, 192 or 256 kbps. Trim a section first if you like. No upload, free.",
    h1: "MP4 → MP3 Converter", short: "MP4 → MP3", cardText: "Save the audio track as MP3",
    lead: "Extract the audio of your MP4 video as an MP3 file, right in your browser.",
    tool: { out: "mp3" },
    body: `<p class="answer">To convert MP4 to MP3, drop your video above; the output is preset to MP3 at 192 kbps. Only the audio track is kept. Choose Small file (128 kbps) for speech or High (256 kbps) for music.</p>
<h2>How to use it</h2>${steps("MP4", "MP3")}
${h.table(["Quality", "Bitrate", "Size per minute"], [["Small file", "128 kbps", "~0.94 MB"], ["Balanced", "192 kbps", "~1.4 MB"], ["High", "256 kbps", "~1.9 MB"]])}
<p>Only convert recordings you own or have permission to use.</p>`,
    faq: [privacyFaq, ["Can I convert only part of the video?", "Yes. Enter start and end seconds in advanced settings."]],
    related: ["en/video-to-gif/", "en/", "en/video-compressor/"],
  }),
  tool({
    path: "en/video-compressor/", key: "compress", crumbs: [], title: "Video Compressor: Reduce Video Size Online, No Upload",
    desc: "Compress video in your browser: target size in MB, quality, resolution and H.265. Nothing is uploaded. Free, no watermark.",
    h1: "Video Compressor", short: "Video compressor", cardText: "Shrink videos while keeping quality",
    lead: "Make your video smaller while keeping quality. Need a specific size? Enter a target in MB.",
    tool: { out: "mp4", quality: "small", adv: "1" },
    body: `<p class="answer">The three most effective ways to compress a video are lowering the bitrate (CRF or target size), lowering the resolution (for example 1080p to 720p) and using a more efficient codec (H.264 to H.265). This tool applies all three in your browser without uploading the file.</p>
<h2>How to use it</h2>${steps("", "compressed MP4")}
${h.table(["Method", "Typical effect", "Visual impact"], [["Balanced → Small file", "Roughly halves the bitrate", "Slight softening in motion"], ["1080p → 720p", "56% fewer pixels", "Often invisible on phones"], ["H.264 → H.265", "Clearly smaller at same quality", "May not play on old devices"], ["Remove audio", "Saves 128 kbps", "No sound"]])}
<h2>Compress to a target size</h2><p>Enter a value in <strong>Target size (MB)</strong>. The tool computes <code>video kbps = MB × 8192 × 0.94 ÷ duration − audio kbps</code>. The 6% margin covers container overhead and bitrate variation. iPhone recordings in HEVC are often already efficient; if they will not play elsewhere, use the <a href="../mov-to-mp4/">MOV to MP4 converter</a> instead.</p>`,
    faq: [privacyFaq, ["Why is my compressed file bigger?", "If the source already has a low bitrate or uses H.265, re-encoding with H.264 can increase size. Choose Small file, H.265 or a target size."]],
    related: ["en/", "en/mov-to-mp4/", "en/video-to-gif/"],
    sources: S("x264", "x265"),
  }),
  tool({
    path: "en/video-to-gif/", key: "gif", title: "Video to GIF Converter: High-Quality GIFs, No Upload",
    desc: "Make a GIF from a video in your browser. Choose start, end, width and FPS. Custom palette for sharper GIFs. Free, no upload.",
    h1: "Video → GIF Converter", short: "Video → GIF", cardText: "Turn a clip into a looping GIF",
    lead: "Turn the best moment of your video into a short GIF. A custom palette is generated for each clip.",
    tool: { out: "gif", res: "480", fps: "12", adv: "1" },
    body: `<p class="answer">To make a GIF, choose your video, enter start and end seconds in advanced settings and press "Convert". For best results use 2-6 second clips, 480 px width and 12 FPS. The tool uses FFmpeg's two-pass palette method for cleaner colors.</p>
<h2>How to use it</h2>${steps("", "GIF")}
${h.table(["Setting", "Effect", "Tip"], [["Duration", "Size grows linearly", "2-6 s"], ["Width", "Pixel count grows quadratically", "360-480 px"], ["FPS", "Number of frames", "10-15"]])}`,
    faq: [privacyFaq, ["What happens to the sound?", "GIF has no audio, so the sound track is dropped."]],
    related: ["en/", "en/video-compressor/", "en/mp4-to-mp3/"],
  }),
  page({
    path: "en/about/", key: "about", title: "About", h1: "About mp4donusturucu.com", short: "About",
    desc: "mp4donusturucu.com is a privacy-first video converter that runs in your browser. Our principles and the open-source software we use.",
    body: `<p class="answer">mp4donusturucu.com is a free tool that converts and compresses video directly in your browser. Our core principle: your file should never leave your device.</p>
<h2>Principles</h2>${h.ul(["<strong>Privacy:</strong> media files are not sent to any server in standard mode.", "<strong>Accuracy:</strong> technical content is based on primary sources such as FFmpeg and MDN documentation.", "<strong>Responsibility:</strong> the tool is for files you own or may use. We do not offer downloading from third-party platforms."])}
<h2>How it works and how to verify it</h2><p>When you pick a file, the FFmpeg engine (about 31 MB, compiled to WebAssembly) is downloaded from this site and cached. Your file is read into browser memory, converted in a Web Worker and offered back as a local download link. To check it yourself, open your browser developer tools, go to the Network tab and run a conversion: apart from the engine files, no upload request appears.</p>
<h2>Open source</h2><p>Built on <a href="https://ffmpeg.org/" rel="noopener">FFmpeg</a> and <a href="https://github.com/ffmpegwasm/ffmpeg.wasm" rel="noopener">ffmpeg.wasm</a>. The site's primary language is Turkish; see the <a href="../../nasil-calisir/">Turkish "how it works" page</a> for technical details.</p>`,
  }),
  page({
    path: "en/privacy/", key: "privacy", title: "Privacy Policy", h1: "Privacy Policy", short: "Privacy",
    desc: "Privacy policy of mp4donusturucu.com: your videos are processed locally and never uploaded or stored. No cookies in this version.",
    body: `<p class="updated">Last updated: October 28, 2026</p>
<p class="answer">Your video and audio files are processed in your browser. They are not sent to our servers, not stored and not shared. This version uses no analytics, advertising or tracking cookies.</p>
<h2>Data we may process</h2>${h.ul(["<strong>Media files:</strong> processed only on your device; we cannot access them.", "<strong>Server logs:</strong> the hosting provider may keep standard access logs (IP address, browser, requested page) for a short period for security.", "<strong>Email:</strong> if you contact us, we use your address and message only to reply."])}
<h2>Future changes</h2><p>If analytics or advertising is added, non-essential cookies will only be enabled with your explicit consent and this policy will be updated.</p>`,
  }),
  page({
    path: "en/terms/", key: "terms", title: "Terms of Use", h1: "Terms of Use", short: "Terms",
    desc: "Terms of use of mp4donusturucu.com: service scope, user responsibilities, copyright and limitation of liability.",
    body: `<p class="updated">Last updated: October 28, 2026</p>
${h.ul(["The service is provided \"as is\" without guarantee of uninterrupted or error-free operation.", "Only convert files you own or have permission to use.", "Do not use the service to circumvent DRM or other technical protection measures.", "Your original file is never modified, but keep backups of important files.", "The engine includes FFmpeg (GPL) and ffmpeg.wasm (MIT) components under their respective licenses."])}`,
  }),
  page({
    path: "en/contact/", key: "contact", title: "Contact", h1: "Contact", short: "Contact",
    desc: "Contact mp4donusturucu.com for bug reports, suggestions, privacy requests, security and copyright notices.",
    body: `<p class="answer"><a href="mailto:iletisim@mp4donusturucu.com">iletisim@mp4donusturucu.com</a></p>
<p>Please do not attach video files. When reporting a problem, include the format, codec (shown by the tool), file size and your browser.</p>`,
  }),
];
