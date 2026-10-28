// Turkish pages (primary language, served at /)
import { h, SRC } from "./ui.mjs";

// ---------- format reference data ----------
const FMT = {
  mov: {
    n: "MOV", ext: ".mov", dev: "Apple (QuickTime)", codecs: "H.264, HEVC (H.265), ProRes / AAC", web: "Safari evet; Chrome ve Edge codec'e bağlı (HEVC çoğu zaman oynamaz)", use: "iPhone, iPad ve Mac kayıtları, Final Cut Pro",
    what: "MOV, Apple'ın QuickTime kapsayıcı formatıdır. iPhone, iPad ve Mac kameralarının varsayılan çıktısıdır ve çoğunlukla H.264 veya HEVC (H.265) video ile AAC ses içerir. Profesyonel kameralar ve kurgu programları MOV içinde ProRes gibi çok yüksek bit hızlı codec'ler de kullanır.",
    why: "Windows bilgisayarlar, birçok Android cihaz, bazı akıllı TV'ler, LMS platformları ve web siteleri özellikle HEVC kodlu MOV dosyalarını açamayabilir. H.264 kodlu MP4 ise neredeyse her cihazda ve tarayıcıda sorunsuz oynatılır.",
    trouble: ["<strong>Görüntü siyah, ses var:</strong> Kaynak muhtemelen HEVC. Çıktıda codec olarak H.264 seçili kalsın; ayrıntılar için <a href=\"../h265-h264-donusturucu/\">HEVC'yi H.264'e dönüştürme</a> sayfasına bakın.", "<strong>ProRes dosyası çok büyük:</strong> ProRes kayıtları dakikada gigabaytlara ulaşabilir; tarayıcı belleği yetmezse önce kısa bir bölümle deneyin veya çözünürlüğü düşürün.", "<strong>Video yan dönmüş:</strong> Gelişmiş ayarlardan 90° veya 270° döndürme uygulayın ya da <a href=\"../video-dondurme/\">video döndürme aracını</a> kullanın."],
    faq: ["iPhone videosu neden Windows'ta açılmıyor?", "iPhone varsayılan olarak HEVC (Yüksek Verimlilik) formatında kaydeder. Windows'ta HEVC desteği ek codec paketi gerektirebilir. Videoyu H.264 kodlu MP4'e dönüştürmek bu sorunu ortadan kaldırır. iPhone'a özel ayarlar için <a href=\"../iphone-video-mp4/\">iPhone videosunu MP4'e dönüştürme</a> rehberine bakın."],
  },
  mkv: {
    n: "MKV", ext: ".mkv", dev: "Matroska (açık standart)", codecs: "H.264, HEVC, VP9, AV1 / AAC, AC-3, DTS, FLAC, Opus", web: "Resmî destek yok; bazı tarayıcılar codec'e göre oynatabilir", use: "Arşiv, çok dilli ses ve altyazılı videolar, OBS kayıtları",
    what: "MKV (Matroska Video), açık ve ücretsiz bir kapsayıcı formattır. Tek dosyada birden fazla ses parçası, altyazı ve bölüm bilgisi taşıyabilir. Bu esneklik arşivleme için idealdir ancak telefonlar, akıllı TV'ler, iPhone ve birçok kurgu programı MKV'yi doğrudan desteklemez. Ayrıntılar: <a href=\"../mkv-nedir/\">MKV nedir?</a>",
    why: "MKV'yi MP4'e dönüştürmek; iPhone'da oynatmak, video düzenleme programlarına aktarmak, web sitesine yüklemek veya sosyal medyada paylaşmak için en pratik yoldur. OBS ile MKV olarak kaydettiğiniz yayınları da bu şekilde paylaşılabilir hale getirebilirsiniz.",
    trouble: ["<strong>Altyazılar kayboldu:</strong> Araç video ve ana ses parçasını dönüştürür; altyazı parçaları MP4 çıktısına eklenmez.", "<strong>Yanlış dilde ses:</strong> FFmpeg varsayılan olarak en çok kanallı ses parçasını seçer. Farklı bir dil gerekiyorsa masaüstü FFmpeg ile <code>-map</code> parametresi kullanılmalıdır.", "<strong>DTS veya AC-3 ses:</strong> Bu sesler MP4 uyumluluğu için otomatik olarak AAC'ye dönüştürülür."],
    faq: ["MKV MP4'e dönüştürülünce altyazılar korunur mu?", "Hayır. Bu araç video ve ana ses parçasını MP4'e aktarır; MKV içindeki altyazı parçaları çıktıya eklenmez. Altyazı gerekiyorsa ayrı bir SRT dosyası olarak saklamanızı öneririz."],
  },
  avi: {
    n: "AVI", ext: ".avi", dev: "Microsoft (1992)", codecs: "MPEG-4 Part 2 (Xvid/DivX), MJPEG / MP3, PCM", web: "Tarayıcılarda oynatılmaz", use: "Eski dijital kameralar, eski arşivler, eski yazılımlar",
    what: "AVI (Audio Video Interleave), Microsoft'un 1992'de tanıttığı eski bir kapsayıcı formattır. Genellikle Xvid/DivX (MPEG-4 Part 2) veya MJPEG video ile MP3 ya da sıkıştırılmamış PCM ses içerir. Modern codec özelliklerini sınırlı desteklediği için dosyalar genellikle büyüktür.",
    why: "AVI dosyaları tarayıcılarda, iPhone'da ve birçok akıllı telefonda oynatılmaz. H.264 kodlu MP4'e dönüştürmek, aynı görsel kalitede dosya boyutunu çoğu zaman belirgin şekilde küçültür ve videoyu her yerde oynatılabilir hale getirir.",
    trouble: ["<strong>MJPEG kaynaklı çok büyük dosya:</strong> Eski fotoğraf makinelerinin AVI kayıtları MJPEG kullanır; MP4 çıktısı genellikle çok daha küçük olur.", "<strong>Görüntü ve ses kayıyor:</strong> Bozuk indeksli eski AVI dosyalarında yeniden kodlama çoğu zaman senkronu düzeltir; düzelmezse kaynağın sağlam bir kopyasıyla deneyin."],
    faq: ["AVI'yi MP4'e dönüştürmek dosyayı küçültür mü?", "Çoğu durumda evet. AVI içindeki Xvid veya MJPEG gibi eski codec'ler, H.264'e göre aynı kalite için daha yüksek bit hızına ihtiyaç duyar. Sonuç kaynağa bağlıdır; araç tahmini çıktı boyutunu dönüştürmeden önce gösterir."],
  },
  webm: {
    n: "WebM", ext: ".webm", dev: "Google (2010)", codecs: "VP8, VP9, AV1 / Vorbis, Opus", web: "Chrome, Firefox, Edge evet; Safari sürüme bağlı", use: "Web sayfaları, tarayıcı ekran kayıtları, açık kaynak projeler",
    what: "WebM, Google'ın 2010'da duyurduğu, web için tasarlanmış açık ve telifsiz bir formattır. Matroska tabanlıdır ve VP8, VP9 veya AV1 video ile Vorbis veya Opus ses içerir. Tarayıcı ekran kaydı araçları çoğu zaman WebM üretir.",
    why: "WebM tarayıcılarda iyi çalışır ancak WhatsApp, PowerPoint, birçok video düzenleyici, eski iPhone'lar ve akıllı TV'ler WebM'i desteklemeyebilir. MP4 (H.264 + AAC) bu ortamların neredeyse hepsinde çalışır. İki formatın karşılaştırması: <a href=\"../webm-mi-mp4-mu/\">WebM mi MP4 mü?</a>",
    trouble: ["<strong>AV1 kodlu WebM açılmıyor:</strong> Tarayıcı içi motorumuz şu anda AV1 kod çözmeyi desteklemiyor. VP8 ve VP9 kodlu WebM dosyaları sorunsuz dönüştürülür.", "<strong>Ekran kaydında süre bilgisi yok:</strong> Tarayıcıda kaydedilen bazı WebM dosyalarında süre bilgisi eksiktir; bu durumda ilerleme yüzdesi tahmini gösterilebilir, sonuç etkilenmez."],
    faq: ["WebM'i MP4'e dönüştürmek kaliteyi düşürür mü?", "Her yeniden kodlama teorik olarak küçük bir kayıp içerir. \"Yüksek\" kalite ayarıyla (H.264, CRF 20) fark çıplak gözle genellikle görülmez. Dosya boyutu kaynağa göre biraz artabilir veya azalabilir."],
  },
  "3gp": {
    n: "3GP", ext: ".3gp", dev: "3GPP", codecs: "H.263, MPEG-4 Part 2, H.264 / AMR, AAC", web: "Sınırlı", use: "2000'li yılların cep telefonu videoları",
    what: "3GP, 3GPP konsorsiyumunun mobil telefonlar için tanımladığı bir kapsayıcıdır. Eski telefonlar düşük çözünürlüklü (çoğu zaman 176×144 veya 320×240) videoları H.263 veya MPEG-4 ile, sesi ise AMR ile kaydederdi.",
    why: "Eski telefon videolarınızı bugün bilgisayarda, telefonda veya sosyal medyada izlemek ve arşivlemek için MP4 en güvenli formattır. AMR ses, MP4 içinde AAC'ye dönüştürülür.",
    trouble: ["<strong>Görüntü çok bulanık:</strong> 3GP kayıtları düşük çözünürlüklüdür; yükseltme (upscale) ayrıntı eklemez. Çözünürlüğü \"Orijinal\" bırakmanızı öneririz.", "<strong>Ses yok:</strong> Bazı eski cihazlar sesi farklı bir AMR varyantıyla kaydeder. Sorun sürerse kaynağın başka bir kopyasıyla deneyin."],
    faq: ["Eski telefon videolarımın kalitesi MP4'te artar mı?", "Hayır. Dönüştürme, var olmayan ayrıntıyı geri getiremez. Ancak MP4, videonun modern cihazlarda sorunsuz oynatılmasını ve güvenle arşivlenmesini sağlar."],
  },
  m4v: {
    n: "M4V", ext: ".m4v", dev: "Apple", codecs: "H.264, HEVC / AAC, AC-3", web: "Safari evet; diğerleri codec'e bağlı", use: "iTunes ve Apple TV içerikleri, HandBrake çıktıları",
    what: "M4V, Apple'ın MP4'e çok benzeyen video formatıdır. Teknik olarak MP4 ile aynı yapıyı kullanır; fark çoğu zaman uzantıdan ve bazı Apple'a özgü özelliklerden ibarettir. iTunes Store'dan satın alınan M4V dosyaları FairPlay DRM ile korunabilir.",
    why: "Birçok Android cihaz, oynatıcı ve web platformu .m4v uzantısını tanımaz. MP4'e dönüştürmek dosyayı evrensel hale getirir. <strong>Önemli:</strong> DRM ile korunan dosyalar dönüştürülemez; bu tür korumaları aşmıyoruz.",
    trouble: ["<strong>Dosya açılmıyor:</strong> Dosya FairPlay DRM korumalıysa dönüştürme başarısız olur. Bu araç yalnızca korumasız dosyalarla çalışır.", "<strong>AC-3 surround ses:</strong> MP4 uyumluluğu için stereo AAC'ye dönüştürülür."],
    faq: ["M4V ile MP4 arasındaki fark nedir?", "Yapısal olarak neredeyse aynıdır. M4V, Apple'ın kullandığı bir uzantıdır ve DRM ile korunabilir. Korumasız bir M4V dosyası genellikle sorunsuz şekilde MP4'e dönüştürülebilir."],
  },
  mpeg: {
    n: "MPEG", ext: ".mpg / .mpeg", dev: "MPEG (ISO/IEC)", codecs: "MPEG-1, MPEG-2 / MP2, AC-3", web: "Tarayıcılarda oynatılmaz", use: "VCD ve DVD arşivleri, eski kameralar",
    what: "MPEG uzantılı dosyalar genellikle MPEG-1 (VCD) veya MPEG-2 (DVD, yayın) video ve MP2 ses içeren program akışlarıdır. Bu codec'ler eskidir ve aynı kalite için H.264'ten çok daha yüksek bit hızı gerektirir.",
    why: "DVD veya VCD arşivlerinizi modern cihazlarda izlemek, buluta yüklemek veya paylaşmak için MP4'e dönüştürmek hem uyumluluğu artırır hem de dosya boyutunu genellikle önemli ölçüde azaltır.",
    trouble: ["<strong>Görüntüde yatay çizgiler:</strong> DVD kaynakları geçmeli (interlaced) olabilir. Tarayıcı aracı bu sürümde deinterlace uygulamaz; masaüstü FFmpeg ile <code>yadif</code> filtresi kullanılabilir.", "<strong>VOB dosyaları:</strong> DVD'deki .vob dosyaları da MPEG-2 içerir; uzantıyı değiştirmeden doğrudan seçebilirsiniz."],
    faq: ["DVD videolarımı MP4'e nasıl çeviririm?", "DVD'deki VIDEO_TS klasöründen .vob dosyalarını bilgisayarınıza kopyalayın ve tek tek dönüştürün. Ticari, kopya korumalı DVD'ler için bu araç kullanılamaz."],
  },
  ts: {
    n: "TS", ext: ".ts / .mts / .m2ts", dev: "MPEG (Transport Stream)", codecs: "H.264, MPEG-2, HEVC / AAC, AC-3, MP2", web: "Doğrudan oynatılmaz (HLS hariç)", use: "TV yayın kayıtları, IPTV, AVCHD kameralar (.mts)",
    what: "TS (MPEG Transport Stream), yayıncılık için tasarlanmış bir akış formatıdır. Dijital TV kayıtları, IPTV ve HLS video parçaları TS kullanır. Sony ve Panasonic AVCHD kameraların .mts ve .m2ts dosyaları da aynı yapıdadır.",
    why: "TS dosyaları kurgu programlarında, telefonlarda ve sosyal medya platformlarında sorun çıkarabilir. MP4'e dönüştürmek dosyayı düzenlemeye, arşivlemeye ve paylaşmaya hazır hale getirir.",
    trouble: ["<strong>Başta birkaç saniye bozuk görüntü:</strong> Kayıt bir akışın ortasından başlamışsa ilk kareler eksik olabilir; Başlangıç alanına 1-2 saniye yazarak bu kısmı atlayın.", "<strong>Geçmeli (interlaced) yayın kaydı:</strong> Bazı TV kayıtlarında hareketli sahnelerde tarak deseni görülebilir."],
    faq: ["MTS (AVCHD) dosyaları da dönüştürülebilir mi?", "Evet. MTS ve M2TS dosyaları TS yapısını kullanır. Dosyayı doğrudan seçebilir ve MP4'e dönüştürebilirsiniz."],
  },
  flv: {
    n: "FLV", ext: ".flv", dev: "Adobe (Flash Video)", codecs: "Sorenson Spark, VP6, H.264 / MP3, AAC", web: "Oynatılmaz (Flash Player desteği 2020 sonunda bitti)", use: "Eski web videoları, eski yayın kayıtları",
    what: "FLV, Adobe Flash Player için geliştirilmiş video formatıdır. Adobe, Flash Player desteğini 31 Aralık 2020'de sonlandırdı; bu nedenle FLV dosyaları modern tarayıcılarda ve cihazlarda doğrudan oynatılamaz.",
    why: "Eski FLV arşivlerinizi bugün izlenebilir ve paylaşılabilir hale getirmenin en kolay yolu H.264 kodlu MP4'e dönüştürmektir.",
    trouble: ["<strong>VP6 kodlu eski dosyalar:</strong> FFmpeg bu codec'i çözebilir; dönüştürme biraz daha uzun sürebilir.", "<strong>Süre yanlış görünüyor:</strong> Bazı FLV dosyalarında meta veriler eksiktir; dönüştürme sonrası MP4 doğru süreyi gösterir."],
    faq: ["FLV dosyalarını neden açamıyorum?", "FLV, artık desteklenmeyen Flash Player için tasarlanmıştı. VLC gibi oynatıcılar hâlâ açabilir; ancak geniş uyumluluk için MP4'e dönüştürmek en iyi çözümdür."],
  },
  ogv: {
    n: "OGV", ext: ".ogv", dev: "Xiph.Org Vakfı", codecs: "Theora / Vorbis", web: "Firefox ve Chrome evet; Safari genellikle hayır", use: "Açık kaynak projeler, eğitim içerikleri, Wikimedia arşivleri",
    what: "OGV, Ogg kapsayıcısı içinde Theora video ve Vorbis ses taşıyan açık ve telifsiz bir formattır. Wikimedia Commons gibi özgür içerik arşivlerinde yaygındır ancak günümüzde Theora'nın yerini büyük ölçüde VP9 ve AV1 almıştır.",
    why: "OGV dosyaları iPhone, Safari, PowerPoint ve birçok kurgu programında açılmaz. MP4'e dönüştürmek videoyu bu ortamlarda kullanılabilir yapar. Özgür lisanslı bir içerik kullanıyorsanız lisansın atıf koşullarını korumayı unutmayın.",
    trouble: ["<strong>Lisans bilgisi:</strong> Dönüştürme lisansı değiştirmez. CC BY veya CC BY-SA içeriklerde yazar ve lisans atfını yayınladığınız yerde belirtin."],
    faq: ["Wikimedia Commons'tan indirdiğim OGV'yi kullanabilir miyim?", "Dosyanın lisansına bağlıdır. Commons'taki dosya sayfasında lisans ve atıf koşulları yazar. MP4'e dönüştürmek bu koşulları değiştirmez; atfı korumanız gerekir."],
  },
};

const OUTF = {
  webm: { n: "WebM", codec: "VP9 + Opus", use: "Web sayfalarına gömme, açık kaynak projeler", dev: "Google (2010)", web: "Chrome, Firefox, Edge evet; Safari sürüme bağlı",
    why: "WebM, web için tasarlanmış telifsiz bir formattır. VP9 codec'i aynı görsel kalitede H.264'e göre genellikle daha küçük dosya üretir; bu da web sitenizde bant genişliği tasarrufu sağlar. Tarayıcı içinde VP9 kodlama H.264'e göre belirgin şekilde daha yavaştır; kısa klipler için idealdir. Emin değilseniz <a href=\"../webm-mi-mp4-mu/\">WebM mi MP4 mü?</a> karşılaştırmasını okuyun.",
    settings: [["Web sitesi arka plan videosu", "720p, Küçük dosya, sesi kaldır"], ["Genel web videosu", "1080p, Dengeli"], ["Yüksek kalite arşiv", "Orijinal, Yüksek"]],
    faq: ["MP4 yerine WebM kullanmalı mıyım?", "Web sitesi için ikisini birlikte sunmak en iyisidir: önce WebM, yedek olarak MP4. Tek format seçecekseniz uyumluluk için MP4 daha güvenlidir."] },
  mov: { n: "MOV", codec: "H.264 + AAC", use: "Apple iş akışları, QuickTime", dev: "Apple (QuickTime)", web: "Safari evet; diğerleri codec'e bağlı",
    why: "MP4 ve MOV aynı ISO temel medya dosya yapısından türemiştir. iMovie, Final Cut Pro ve QuickTime MP4'ü de açabildiği için MOV'a dönüştürme yalnızca bir yazılım veya iş akışı özellikle .mov istediğinde gereklidir.",
    settings: [["QuickTime / Keynote", "Orijinal, Yüksek, H.264"], ["Daha küçük Apple dosyası", "H.265 / HEVC, Dengeli"]],
    faq: ["MP4'ü MOV'a çevirmek kaliteyi artırır mı?", "Hayır. Kapsayıcıyı değiştirmek kaliteyi artırmaz. Yüksek kalite ayarı kaybı en aza indirir."] },
  avi: { n: "AVI", codec: "MPEG-4 Part 2 (Xvid) + MP3", use: "Eski DVD oynatıcılar, eski yazılımlar", dev: "Microsoft (1992)", web: "Tarayıcılarda oynatılmaz",
    why: "Bazı eski DVD oynatıcılar, araç multimedya sistemleri ve eski yazılımlar yalnızca Xvid/DivX kodlu AVI dosyalarını okuyabilir. Bu araç maksimum uyumluluk için Xvid etiketli MPEG-4 Part 2 video ve MP3 ses üretir.",
    settings: [["Eski DVD oynatıcı", "480p, Dengeli"], ["Araç multimedya sistemi", "720p, Dengeli"]],
    faq: ["AVI dosyası neden MP4'ten büyük?", "MPEG-4 Part 2, H.264'ten daha eski ve daha az verimli bir codec'tir. Aynı kalite için daha yüksek bit hızı gerekir."] },
  gif: { n: "GIF", codec: "GIF (256 renk paleti)", use: "Sessiz döngüler, tepki animasyonları, dokümantasyon", dev: "CompuServe (1987)", web: "Her yerde",
    why: "GIF her platformda otomatik oynayan sessiz bir döngü sunar. Ancak GIF bir video formatı değildir: en fazla 256 renk kullanır ve aynı klip MP4'e göre çok daha büyük olabilir. Bu araç her video için ayrı renk paleti üreterek kaliteyi artırır. MP4 dışındaki kaynaklar ve boyut ipuçları için <a href=\"../video-gif-donusturucu/\">video GIF dönüştürücü</a> sayfasına bakın.",
    settings: [["Sohbet / tepki GIF'i", "480 px, 12 FPS, 2-5 sn"], ["Dokümantasyon ekran kaydı", "720 px, 15 FPS"], ["En küçük boyut", "360 px, 10-12 FPS"]],
    faq: ["GIF neden bu kadar büyük?", "GIF kareleri video codec'leri gibi verimli sıkıştırmaz. Süreyi kısaltmak, genişliği 480 piksele düşürmek ve FPS'i 10-12'ye indirmek boyutu en çok azaltan ayarlardır."] },
  mp3: { n: "MP3", codec: "MP3 (LAME)", use: "Müzik çalarlar, podcast, ses notları", dev: "Fraunhofer / MPEG", web: "Her yerde",
    why: "Videonuzun yalnızca sesine ihtiyacınız varsa MP3 en evrensel ses formatıdır. Varsayılan 192 kbps, konuşma ve müzik için iyi bir denge sağlar. Yüksek ayar 256 kbps, küçük ayar 128 kbps kullanır. Kaynağınız MOV, MKV veya AVI ise <a href=\"../video-mp3-donusturucu/\">video MP3 dönüştürücü</a> aynı işi yapar.",
    settings: [["Konuşma / podcast", "Küçük dosya (128 kbps)"], ["Müzik", "Dengeli (192 kbps) veya Yüksek (256 kbps)"]],
    faq: ["Videodan çıkarılan sesin kalitesi orijinalden iyi olur mu?", "Hayır. MP3 kayıplı bir formattır; kaynak sesin kalitesini aşamaz. 192 kbps ve üzeri çoğu dinleyici için orijinalden ayırt edilemez."] },
  wav: { n: "WAV", codec: "PCM 16 bit (sıkıştırılmamış)", use: "Ses kurgusu, transkripsiyon, stüdyo", dev: "Microsoft ve IBM", web: "Her yerde",
    why: "WAV sıkıştırılmamış PCM sestir; ek bir kayıp eklemez ve ses düzenleme programlarında en sorunsuz formattır. Bedeli boyuttur: 44,1 kHz stereo 16 bit WAV dakikada yaklaşık 10 MB yer kaplar.",
    settings: [["Ses kurgusu (Audacity, DAW)", "WAV, varsayılan"], ["Daha küçük dosya", "Bunun yerine MP3 veya M4A seçin"]],
    faq: ["WAV mı MP3 mü?", "Düzenleme yapacaksanız WAV, dinleme ve paylaşma için MP3. WAV ek kayıp eklemez ama MP3'ten yaklaşık 7 kat büyüktür."] },
};

const CMP_MP4 = { dev: "MPEG (ISO/IEC 14496-14)", codecs: "H.264, HEVC, AV1 / AAC, MP3", web: "Tüm modern tarayıcılar (H.264)", use: "Web, mobil, sosyal medya, TV, kurgu" };

const S = (...keys) => keys.map((k) => SRC[k]);
const P = (title) => `${title} | mp4donusturucu`;

// ---------- page builders ----------
const steps3 = (src, dst) => h.steps([
  `<strong>Dosyayı seçin.</strong> ${src} videonuzu sürükleyip bırakın veya alana dokunarak seçin. Format, çözünürlük ve süre otomatik algılanır.`,
  `<strong>Ayarları kontrol edin.</strong> Çıktı ${dst} olarak seçili gelir. Kalite, çözünürlük ve gelişmiş ayarları ihtiyacınıza göre değiştirin.`,
  `<strong>Dönüştürün ve indirin.</strong> "Dönüştür"e basın. İşlem bittiğinde önizlemeyi kontrol edip dosyayı indirin.`,
]);

const qualityBlock = `<h2>Kalite ve dosya boyutu</h2>
<p>Çıktı boyutunu belirleyen üç ana etken vardır: <strong><a href="../video-bitrate-nedir/">bit hızı</a></strong> (saniyedeki veri miktarı), <strong>çözünürlük</strong> ve <strong>süre</strong>. Basit formül: <code>boyut (MB) ≈ (video kbps + ses kbps) × süre (sn) ÷ 8 ÷ 1024</code>. Araç, dosyayı seçtiğiniz anda tahmini çıktı boyutunu gösterir.</p>
<p>"Dengeli" ayarı H.264 için <a href="../crf-nedir/">CRF</a> 24 kullanır; çoğu video için gözle görülür kayıp olmadan iyi bir boyut sağlar. "Yüksek" (CRF 20) arşiv ve kurgu için, "Küçük dosya" (CRF 29) paylaşım için uygundur. Kesin bir boyut gerekiyorsa gelişmiş ayarlardaki <a href="../video-boyutu-hesaplayici/">hedef boyut</a> alanını kullanın.</p>`;

function xToMp4(k, extra = {}) {
  const F = FMT[k];
  const path = `${k}-mp4-donusturucu/`;
  const rev = OUTF[k] ? `mp4-${k}-donusturucu/` : null;
  return {
    lang: "tr", path, key: extra.key, type: "tool",
    title: P(`${F.n} MP4 Dönüştürücü: Ücretsiz, Dosya Yüklemeden`),
    desc: `${F.n} videolarını tarayıcınızda MP4'e dönüştürün. Dosya sunucuya yüklenmez, kayıt veya filigran yok. H.264, kalite, çözünürlük ve hedef boyut ayarları.`,
    h1: `${F.n} → MP4 Dönüştürücü`, short: `${F.n} → MP4`, cardText: `${F.n} dosyalarını evrensel MP4'e çevirin`,
    lead: `${F.n} videonuzu MP4 formatına tarayıcınızda dönüştürün. Desteklenen cihazlarda dosya sunucuya yüklenmeden yerel olarak işlenir.`,
    crumbs: [["Video araçları", "araclar/"]],
    tool: { out: "mp4" },
    body: `<p class="answer">${F.n} dosyasını MP4'e dönüştürmek için videoyu yukarıdaki alana bırakın ve "Dönüştür"e basın. Video H.264, ses AAC ile yeniden kodlanır; bu kombinasyon telefonlarda, bilgisayarlarda, akıllı TV'lerde ve tarayıcılarda en geniş desteğe sahiptir. İşlem cihazınızda yapılır, dosyanız yüklenmez.</p>
<h2>${F.n} nedir?</h2><p>${F.what}</p>
<h2>Nasıl kullanılır?</h2>${steps3(F.n, "MP4")}
<h2>Ne zaman MP4'e dönüştürmelisiniz?</h2><p>${F.why}</p>
<h2>Önerilen ayarlar</h2>${h.table(["Amaç", "Ayar"], [["Genel kullanım, paylaşım", "MP4, Dengeli, Orijinal çözünürlük"], ["Arşiv veya kurgu", "MP4, Yüksek, Orijinal çözünürlük"], ["WhatsApp / e-posta", "MP4, Küçük dosya, 720p veya hedef boyut"], ["En küçük dosya (yeni cihazlar)", "MP4, Codec: H.265, Dengeli (<a href=\"../h264-h265-farki/\">H.264 ve H.265 farkı</a>)"]])}
${qualityBlock}
<h2>${F.n} ve MP4 karşılaştırması</h2>${h.table(["Özellik", F.n, "MP4"], [["Geliştiren", F.dev, CMP_MP4.dev], ["Yaygın codec'ler (video / ses)", F.codecs, CMP_MP4.codecs], ["Tarayıcıda oynatma", F.web, CMP_MP4.web], ["Tipik kullanım", F.use, CMP_MP4.use]])}
<h2>Sorun giderme</h2>${h.ul([...F.trouble, "<strong>İşlem çok yavaş:</strong> Tarayıcı içi dönüştürme tek iş parçacığında çalışır. <a href=\"../video-boyutlandirma/\">Çözünürlüğü 720p'ye düşürmek</a> süreyi belirgin şekilde kısaltır.", "<strong>Sekme çöktü:</strong> Cihaz belleği yetmemiş olabilir. Diğer sekmeleri kapatın veya videoyu <a href=\"../video-kesme/\">Başlangıç/Bitiş alanlarıyla parçalara ayırın</a>."])}`,
    faq: [
      [`${F.n} MP4'e dönüştürülünce kalite düşer mi?`, `Yeniden kodlama teorik olarak küçük bir kayıp içerir. "Dengeli" veya "Yüksek" ayarlarda bu fark çoğu videoda gözle fark edilmez. Kaliteyi korumak için çözünürlüğü "Orijinal" bırakın ve kaynak zaten düşük kaliteliyse yükseltme yapmayın.`],
      ["Dosyam sunucuya yükleniyor mu?", "Hayır. Dönüştürme, FFmpeg'in WebAssembly sürümüyle tamamen tarayıcınızda yapılır. Video cihazınızdan çıkmaz; sayfayı kapattığınızda bellekten silinir."],
      F.faq,
      ["Dönüştürme ne kadar sürer?", "Videonun süresine, çözünürlüğüne ve cihazınızın işlemcisine bağlıdır. Tarayıcı içi kodlama masaüstü programlardan yavaştır: kendi testimizde 5 saniyelik 960×540 bir videonun H.264 MP4'e dönüştürülmesi yaklaşık 47 saniye sürdü (Chrome, Windows, 28 Ekim 2026). 720p veya daha düşük çözünürlük seçmek işlemi hızlandırır."],
    ],
    related: [rev, "video-sikistirma/", "formatlar/", "codec/", "h264-h265-farki/", "video-boyutu-hesaplayici/", ...(extra.related || [])].filter(Boolean),
    sources: S("ffFormats", "x264", "mdnFormats"),
  };
}

function mp4ToX(k, extra = {}) {
  const O = OUTF[k];
  const audio = ["mp3", "wav"].includes(k);
  const path = `mp4-${k}-donusturucu/`;
  const rev = FMT[k] ? `${k}-mp4-donusturucu/` : k === "gif" ? "gif-mp4-donusturucu/" : null;
  return {
    lang: "tr", path, key: extra.key, type: "tool",
    title: P(`MP4 ${O.n} Dönüştürücü: Ücretsiz ve Yüklemesiz`),
    desc: `MP4 videolarını tarayıcınızda ${O.n} formatına dönüştürün. Dosya yüklenmez. ${audio ? "Ses kalitesi seçimi ve kesme." : "Kalite, çözünürlük, FPS ve kesme ayarları."}`,
    h1: `MP4 → ${O.n} Dönüştürücü`, short: `MP4 → ${O.n}`, cardText: O.use,
    lead: `MP4 videonuzu ${O.n} formatına tarayıcınızda dönüştürün. Desteklenen cihazlarda dosya sunucuya yüklenmeden yerel olarak işlenir.`,
    crumbs: [["Video araçları", "araclar/"]],
    tool: { out: k, ...(k === "gif" ? { res: "480", adv: "1" } : {}) },
    body: `<p class="answer">MP4'ü ${O.n} formatına dönüştürmek için dosyanızı yukarıya bırakın; çıktı ${O.n} olarak hazır gelir. Araç ${O.codec} kullanır. ${audio ? "Yalnızca ses parçası alınır, görüntü atılır." : ""} Tüm işlem tarayıcınızda gerçekleşir, dosyanız yüklenmez.</p>
<h2>Nasıl kullanılır?</h2>${steps3("MP4", O.n)}
<h2>Ne zaman ${O.n} seçmelisiniz?</h2><p>${O.why}</p>
<h2>Önerilen ayarlar</h2>${h.table(["Amaç", "Ayar"], O.settings)}
${audio ? `<h2>Ses kalitesi ve boyut</h2><p>Ses dosyası boyutu yalnızca bit hızına ve süreye bağlıdır. Örneğin 192 kbps MP3 dakikada yaklaşık 1,4 MB, 44,1 kHz stereo WAV ise dakikada yaklaşık 10 MB tutar. Videonun yalnızca bir bölümü gerekiyorsa gelişmiş ayarlardan başlangıç ve bitiş saniyesini girin.</p>` : qualityBlock}
<h2>MP4 ve ${O.n} karşılaştırması</h2>${h.table(["Özellik", "MP4", O.n], [["Geliştiren", CMP_MP4.dev, O.dev], ["Codec", "H.264 + AAC (tipik)", O.codec], ["Tarayıcı desteği", CMP_MP4.web, O.web], ["Tipik kullanım", CMP_MP4.use, O.use]])}
<h2>Sorun giderme</h2>${h.ul([audio ? "<strong>Çıktı sessiz veya boş:</strong> Kaynak MP4'te ses parçası olmayabilir. Dosya bilgisinde ses codec'i görünmüyorsa video sessizdir." : "<strong>İşlem yavaş:</strong> Çözünürlüğü düşürmek ve süreyi kısaltmak en etkili çözümdür.", "<strong>Sekme çöktü:</strong> Büyük dosyalarda cihaz belleği yetmeyebilir; diğer sekmeleri kapatın veya videoyu parçalara bölün."])}`,
    faq: [O.faq, ["Dosyam bir sunucuya gönderiliyor mu?", "Hayır. Dönüştürme FFmpeg'in WebAssembly sürümüyle tarayıcınızda yapılır; video cihazınızdan çıkmaz."], ["Bir kısmını dönüştürebilir miyim?", "Evet. Gelişmiş ayarlarda Başlangıç ve Bitiş alanlarına saniye cinsinden değer girin; yalnızca o aralık dönüştürülür."]],
    related: [rev, "video-sikistirma/", audio ? "video-ses-cikarma/" : "video-kesme/", "formatlar/", "webm-mi-mp4-mu/", "video-boyutu-hesaplayici/"].filter(Boolean),
    sources: S("ffFormats", k === "webm" ? "vp9" : "ffCodecs", "mdnFormats"),
  };
}

function special(o) {
  return { lang: "tr", type: "tool", crumbs: [["Video araçları", "araclar/"]], sources: S("ffCodecs", "x264", "wasm"), ...o, title: P(o.title) };
}

function guide(o) {
  return { lang: "tr", type: "guide", crumbs: [["Rehberler", "rehberler/"]], ...o, title: P(o.title) };
}
function page(o) {
  return { lang: "tr", type: "page", ...o, title: P(o.title) };
}

// ---------- pages ----------
const pages = [];

pages.push({
  lang: "tr", path: "", key: "home", home: true, type: "tool",
  title: "MP4 Dönüştürücü: Videoyu Tarayıcıda Ücretsiz Dönüştürün | mp4donusturucu",
  desc: "Ücretsiz MP4 dönüştürücü. MOV, MKV, AVI, WebM ve daha fazlasını MP4, GIF veya MP3'e tarayıcınızda çevirin. Dosya yüklenmez, filigran yok, kayıt gerekmez.",
  h1: "MP4 Dönüştürücü", short: "MP4 dönüştürücü",
  lead: "Videonuzu tarayıcınızda dönüştürün. Dosyanız cihazınızdan çıkmaz. MOV, MKV, AVI, WebM, 3GP ve daha fazlasını MP4, WebM, GIF veya MP3'e saniyeler içinde çevirin.",
  tool: { out: "mp4" },
  body: `<p class="answer">MP4 dönüştürücü, video dosyalarını MP4 kapsayıcısına dönüştüren bir araçtır. mp4donusturucu.com işlemi desteklenen tarayıcılarda cihazınızda gerçekleştirir; dosyanız sunucuya yüklenmeden H.264, H.265 veya VP9 gibi uygun codec seçenekleriyle yeniden kodlanabilir.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Herhangi bir", "MP4")}
<p>Tüm giriş ve çıkış formatlarını, codec ve gelişmiş ayarları tek sayfada görmek isterseniz <a href="video-donusturucu/">video dönüştürücü</a> sayfasını kullanın.</p>
<h2>Popüler dönüştürmeler</h2>
<div class="chips" style="justify-content:flex-start">${["mov", "mkv", "avi", "webm", "3gp", "m4v", "mpeg", "ts", "flv", "ogv"].map((k) => `<a class="chip" href="${k}-mp4-donusturucu/">${FMT[k].n} → MP4</a>`).join("")}${["webm", "mov", "avi", "gif", "mp3", "wav"].map((k) => `<a class="chip" href="mp4-${k}-donusturucu/">MP4 → ${OUTF[k].n}</a>`).join("")}</div>
<h2>Neden mp4donusturucu.com?</h2>
${h.table(["Özellik", "Açıklama"], [["Yükleme yok", "Dönüştürme WebAssembly ile tarayıcınızda çalışır. Video hiçbir sunucuya gönderilmez."], ["Gerçek FFmpeg", "Sektör standardı FFmpeg motoru: H.264, H.265, VP9, AAC, Opus, MP3."], ["Tam kontrol", "Kalite, çözünürlük, codec, FPS, kesme, kırpma, döndürme, ses kaldırma ve hedef boyut."], ["Filigran ve kayıt yok", "Ücretsiz, hesap açmadan, çıktıya logo eklemeden."], ["Mobil uyumlu", "Telefon ve tabletlerde de çalışır; büyük dosyalar için bilgisayar önerilir."]])}
<h2>Desteklenen formatlar</h2>
<p><strong>Giriş:</strong> <span class="mono">MP4, MOV, MKV, AVI, WebM, MPEG, MPG, M4V, 3GP, FLV, TS, MTS, M2TS, OGV, GIF</span><br><strong>Çıkış:</strong> <span class="mono">MP4, WebM, MOV, MKV, AVI, GIF, MP3, M4A, WAV, OGG</span></p>
<p>Formatlar ve codec'ler arasındaki farkları <a href="formatlar/">video formatları rehberinde</a> ve <a href="codec/">codec rehberinde</a> ayrıntılı olarak açıklıyoruz.</p>
<h2>MP4 nedir?</h2>
<p>MP4 (MPEG-4 Part 14), video, ses ve altyazıyı tek dosyada taşıyan bir kapsayıcı formattır. Genellikle H.264 video ve AAC ses içerir ve bugün telefonlardan akıllı TV'lere kadar en geniş desteğe sahip video formatıdır. Daha fazlası için <a href="mp4-nedir/">MP4 nedir?</a> rehberine bakın.</p>
<h2>Düzenleme, ses ve platform araçları</h2>
<div class="chips" style="justify-content:flex-start">${[["video-kesme/", "Video kesme"], ["video-kirpma/", "Video kırpma (9:16, 1:1)"], ["video-boyutlandirma/", "Video boyutlandırma"], ["video-dondurme/", "Video döndürme"], ["video-ses-kaldirma/", "Videodan ses kaldırma"], ["video-ses-cikarma/", "Videodan ses çıkarma"], ["video-mp3-donusturucu/", "Video → MP3"], ["video-gif-donusturucu/", "Video → GIF"], ["gif-mp4-donusturucu/", "GIF → MP4"], ["h265-h264-donusturucu/", "HEVC → H.264"], ["iphone-video-mp4/", "iPhone video → MP4"], ["whatsapp-video-kucultme/", "WhatsApp için küçült"], ["25-mb-video-kucultme/", "25 MB altına küçült"], ["instagram-video-boyutu/", "Instagram video boyutu"], ["tiktok-video-boyutu/", "TikTok video boyutu"], ["video-boyutu-hesaplayici/", "Boyut hesaplayıcı"]].map(([x, n]) => `<a class="chip" href="${x}">${n}</a>`).join("")}</div>
<p>Tüm araçlar kullanım amacına göre <a href="araclar/">araçlar sayfasında</a>, format ve codec rehberleri ise <a href="rehberler/">rehberler sayfasında</a> listelenir.</p>`,
  faq: [
    ["MP4 dönüştürücü ücretsiz mi?", "Evet. Tüm dönüştürme araçları ücretsizdir, hesap gerektirmez ve çıktıya filigran eklemez."],
    ["Videom sunucuya yükleniyor mu?", "Hayır. Dönüştürme tarayıcınızda, WebAssembly ile derlenmiş FFmpeg tarafından yapılır. Video cihazınızdan çıkmaz ve hiçbir yerde saklanmaz."],
    ["Dosya boyutu sınırı var mı?", "Teknik sınır cihazınızın belleğidir. 500 MB'a kadar dosyalar çoğu bilgisayarda sorunsuz işlenir; 2 GB üzeri dosyalar tarayıcı belleği nedeniyle desteklenmez."],
    ["Telefonda çalışır mı?", "Evet, güncel Chrome, Safari, Edge ve Firefox ile çalışır. Telefonlarda bellek daha sınırlı olduğu için kısa veya 720p'ye düşürülmüş videolar daha hızlı işlenir."],
    ["YouTube veya Instagram'dan video indirebilir miyim?", "Hayır. mp4donusturucu.com bir indirme aracı değildir; yalnızca cihazınızdaki, size ait veya kullanma izniniz olan dosyaları dönüştürür."],
  ],
  related: ["video-sikistirma/", "mov-mp4-donusturucu/", "mkv-mp4-donusturucu/", "mp4-mp3-donusturucu/", "video-gif-donusturucu/", "video-boyutu-hesaplayici/", "mp4-nedir/", "h264-h265-farki/"],
  sources: S("ffFormats", "wasm", "mdnFormats"),
});

pages.push(special({
  path: "video-donusturucu/", title: "Video Dönüştürücü: Tüm Formatlar, Ücretsiz ve Yüklemesiz",
  desc: "Online video dönüştürücü: MP4, WebM, MOV, MKV, AVI, GIF, MP3 ve daha fazlası. Tarayıcıda çalışır, dosya yüklenmez. Codec, kalite ve çözünürlük seçimi.",
  h1: "Video Dönüştürücü", short: "Video dönüştürücü",
  lead: "Herhangi bir videoyu MP4, WebM, MOV, MKV, AVI, GIF veya ses formatlarına dönüştürün. Tüm işlem tarayıcınızda yapılır.",
  tool: { out: "mp4", adv: "1" },
  body: `<p class="answer">Video dönüştürücü, bir videonun kapsayıcı formatını (ör. MOV → MP4) ve gerekirse codec'ini (ör. HEVC → H.264) değiştirir. Bu araç 15'ten fazla giriş formatını okuyabilir ve 10 çıkış formatı üretir; dönüştürme cihazınızda FFmpeg ile yapılır.</p>
<h2>Hangi çıktı formatını seçmeliyim?</h2>
${h.table(["Hedef", "Önerilen format", "Neden"], [["Her yerde oynasın", "MP4 (H.264)", "En geniş cihaz ve tarayıcı desteği"], ["Web sitesi", "WebM (VP9) + MP4", "WebM daha küçük, MP4 yedek"], ["Apple iş akışı", "MOV veya MP4", "iMovie ve Final Cut ikisini de açar"], ["Eski DVD oynatıcı", "AVI (Xvid)", "Eski cihaz uyumluluğu"], ["Sessiz döngü", "GIF", "Otomatik oynar, ses yok"], ["Yalnızca ses", "MP3 / M4A / WAV", "Müzik, podcast, düzenleme"]])}
<h2>Nasıl kullanılır?</h2>${steps3("Video", "MP4")}
<h2>Gelişmiş ayarlar ne işe yarar?</h2>
${h.ul(["<strong>Codec:</strong> H.264 en uyumlusudur; H.265 aynı kalitede daha küçük dosya üretir ama eski cihazlarda oynamayabilir; VP9 WebM içindir.", "<strong>Başlangıç / Bitiş:</strong> Videonun yalnızca bir bölümünü dönüştürür.", "<strong>Hedef boyut:</strong> Çıktıyı yaklaşık belirli bir MB değerine sığdırmak için bit hızını otomatik hesaplar.", "<strong>En-boy kırpma:</strong> Videoyu 9:16, 1:1, 4:5 veya 16:9 oranına ortadan kırpar.", "<strong>Döndür, FPS, sesi kaldır:</strong> Yan çekilmiş videoları düzeltin, kare hızını düşürün veya sesi tamamen çıkarın."])}
${qualityBlock}`,
  faq: [["Kapsayıcı ile codec arasındaki fark nedir?", "Kapsayıcı (MP4, MKV, MOV) video, ses ve altyazı parçalarını bir arada tutan dosya yapısıdır. Codec (H.264, HEVC, VP9) ise görüntünün nasıl sıkıştırıldığını belirler. Uyumluluk sorunlarının çoğu codec kaynaklıdır."], ["Birden fazla dosyayı aynı anda dönüştürebilir miyim?", "Şu anda dosyalar tek tek dönüştürülür. Bu, tarayıcı belleğini korur ve telefonlarda çökmeyi önler."]],
  related: ["", "video-sikistirma/", "formatlar/", "codec/", "mov-mp4-donusturucu/", "mp4-webm-donusturucu/"],
}));

for (const k of Object.keys(FMT)) pages.push(xToMp4(k, { key: k === "mov" ? "mov" : k === "mkv" ? "mkv" : undefined, related: k === "mov" ? ["iphone-video-mp4/"] : [] }));
for (const k of Object.keys(OUTF)) pages.push(mp4ToX(k, { key: k === "mp3" ? "mp4mp3" : undefined }));

pages.push(special({
  path: "gif-mp4-donusturucu/", title: "GIF MP4 Dönüştürücü: GIF'i Videoya Çevirin",
  desc: "GIF animasyonlarını tarayıcınızda MP4 videoya dönüştürün. Dosya boyutu genellikle büyük ölçüde küçülür. Yükleme yok, ücretsiz.",
  h1: "GIF → MP4 Dönüştürücü", short: "GIF → MP4", lead: "GIF animasyonunuzu MP4 videoya çevirin; çoğu zaman çok daha küçük ve her platformda paylaşılabilir bir dosya elde edersiniz.",
  tool: { out: "mp4" },
  body: `<p class="answer">GIF'i MP4'e dönüştürmek, aynı animasyonu çok daha verimli bir video codec'iyle (H.264) saklar. Sonuç genellikle orijinal GIF'ten belirgin şekilde küçüktür ve WhatsApp, Instagram, X gibi platformlar GIF'leri zaten arka planda videoya çevirir.</p>
<h2>Nasıl kullanılır?</h2>${steps3("GIF", "MP4")}
<h2>Neden MP4?</h2><p>GIF 1987'den kalma bir görüntü formatıdır ve en fazla 256 renk kullanır. Hareketli GIF'ler her kareyi neredeyse ayrı bir resim gibi saklar. H.264 ise kareler arasındaki benzerliği kullanarak sıkıştırır; bu yüzden aynı animasyon MP4 olarak genellikle çok daha az yer kaplar ve daha fazla renk gösterir.</p>
<h2>Bilmeniz gerekenler</h2>${h.ul(["MP4 çıktısında ses parçası bulunmaz, çünkü GIF ses içermez.", "Saydam (transparent) GIF arka planları MP4'te desteklenmez; saydam alanlar düz renge dönüşür.", "MP4 kendiliğinden döngüye girmez; döngü, oynatıcı veya platform tarafından sağlanır."])}`,
  faq: [["GIF'i MP4'e çevirince kalite düşer mi?", "Genellikle hayır; GIF zaten 256 renkle sınırlıdır. Dengeli veya Yüksek kalite ayarı görünür bir fark oluşturmaz."]],
  related: ["mp4-gif-donusturucu/", "video-gif-donusturucu/", "video-sikistirma/", "formatlar/"],
}));

pages.push(special({
  path: "video-gif-donusturucu/", key: "gif", title: "Video GIF Dönüştürücü: Yüksek Kaliteli GIF Yapın",
  desc: "Videodan GIF yapın: başlangıç ve bitiş seçin, genişlik ve FPS ayarlayın. Özel renk paleti ile yüksek kaliteli GIF. Tarayıcıda, yüklemesiz.",
  h1: "Video → GIF Dönüştürücü", short: "Video → GIF", lead: "Videonuzun en iyi anını kısa bir GIF'e dönüştürün. Her video için ayrı renk paleti üretilir; sonuç daha net ve daha küçüktür.",
  tool: { out: "gif", res: "480", adv: "1", fps: "12" },
  body: `<p class="answer">Videodan GIF yapmak için dosyanızı seçin, gelişmiş ayarlarda başlangıç ve bitiş saniyesini girin ve "Dönüştür"e basın. En iyi sonuç için 2-6 saniyelik klipler, 480 piksel genişlik ve 12 FPS önerilir. Araç, renk paleti oluşturan iki aşamalı FFmpeg yöntemini kullanır.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "GIF")}
<h2>GIF boyutunu küçültmenin yolları</h2>${h.table(["Ayar", "Etkisi", "Öneri"], [["Süre", "Boyut süreyle doğrusal artar", "2-6 saniye"], ["Genişlik (Çözünürlük alanı)", "Piksel sayısı karesel etkiler", "360-480 px"], ["FPS", "Kare sayısını belirler", "10-15"], ["İçerik", "Sabit arka plan daha iyi sıkışır", "Az hareketli sahneler"]])}
<p>Not: GIF çıktısında çözünürlük alanı <strong>genişlik</strong> olarak uygulanır ve en fazla 720 pikseldir.</p>
<h2>GIF mi, MP4 mü?</h2><p>Sohbet uygulamaları ve sosyal ağlar çoğu zaman GIF'leri arka planda videoya çevirir. Web sitenizde otomatik oynayan sessiz bir döngü istiyorsanız <code>&lt;video autoplay muted loop playsinline&gt;</code> ile MP4 kullanmak, aynı görüntüyü çok daha küçük boyutla sunar. Elinizde zaten bir GIF varsa <a href="../gif-mp4-donusturucu/">GIF'i MP4'e dönüştürerek</a> küçültebilirsiniz.</p>`,
  faq: [["Videodan GIF yaparken ses ne olur?", "GIF formatı ses desteklemez; ses parçası otomatik olarak atılır."], ["En fazla kaç saniyelik GIF yapabilirim?", "Teknik bir sınır yoktur, ancak 10 saniyeyi aşan GIF'ler çok büyük olur. Uzun klipler için MP4 tercih edin."]],
  related: ["mp4-gif-donusturucu/", "gif-mp4-donusturucu/", "video-kesme/", "video-sikistirma/"],
}));

pages.push(special({
  path: "video-mp3-donusturucu/", title: "Video MP3 Dönüştürücü: Videodan Sesi MP3 Olarak Alın",
  desc: "Herhangi bir videoyu MP3'e dönüştürün: MP4, MOV, MKV, AVI, WebM. 128, 192 veya 256 kbps. Tarayıcıda çalışır, dosya yüklenmez.",
  h1: "Video → MP3 Dönüştürücü", short: "Video → MP3", lead: "Videonuzdaki sesi MP3 dosyası olarak kaydedin. Konuşmalar, dersler ve kendi müzik kayıtlarınız için idealdir.",
  tool: { out: "mp3" },
  body: `<p class="answer">Videoyu MP3'e dönüştürmek, görüntüyü atıp yalnızca ses parçasını MP3 olarak kodlar. Varsayılan 192 kbps konuşma ve müzik için iyi bir dengedir. Dosyanız tarayıcınızda işlenir ve hiçbir sunucuya gönderilmez.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "MP3")}
<h2>Bit hızı seçimi</h2>${h.table(["Kalite ayarı", "MP3 bit hızı", "Dakika başına boyut", "Kullanım"], [["Küçük dosya", "128 kbps", "~0,94 MB", "Konuşma, ders, podcast"], ["Dengeli", "192 kbps", "~1,4 MB", "Genel kullanım, müzik"], ["Yüksek", "256 kbps", "~1,9 MB", "Müzik arşivi"]])}
<p>Daha az kayıplı bir alternatif gerekiyorsa M4A (AAC), düzenleme için sıkıştırılmamış WAV seçin.</p>
<h2>Telif hakkı hatırlatması</h2><p>Bu araç yalnızca size ait veya kullanma izniniz olan videolar içindir. Telif hakkıyla korunan müzikleri izinsiz çoğaltmak yasal sorumluluk doğurabilir. Ayrıntılar için <a href="../telif-hakki/">telif hakkı politikamıza</a> bakın.</p>`,
  faq: [["MP3 mü M4A mı?", "MP3 en evrensel ses formatıdır. M4A (AAC) aynı bit hızında genellikle biraz daha iyi ses kalitesi sunar ve Apple cihazlarda yaygındır."]],
  related: ["mp4-mp3-donusturucu/", "video-ses-cikarma/", "mp4-wav-donusturucu/", "video-ses-kaldirma/"],
}));

pages.push(special({
  path: "video-sikistirma/", key: "compress", title: "Video Sıkıştırma: Kaliteyi Koruyarak Video Küçültme",
  desc: "Videoyu online sıkıştırın: hedef boyut (MB), kalite, çözünürlük ve H.265 seçenekleri. Dosya yüklenmez, tarayıcınızda işlenir. Ücretsiz, filigransız.",
  h1: "Video Sıkıştırma", short: "Video sıkıştırma", cardText: "Kaliteyi koruyarak video boyutunu küçültün",
  lead: "Video dosyanızı kaliteyi mümkün olduğunca koruyarak küçültün. Belirli bir boyuta sığdırmanız gerekiyorsa hedef MB değerini girin.",
  tool: { out: "mp4", quality: "small", adv: "1" },
  body: `<p class="answer">Bir videoyu sıkıştırmanın en etkili üç yolu: bit hızını düşürmek (CRF veya hedef boyut), çözünürlüğü düşürmek (ör. 1080p → 720p) ve daha verimli bir codec kullanmaktır (H.264 → H.265). Bu araç üçünü de tarayıcınızda, dosyayı yüklemeden uygular.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "sıkıştırılmış MP4")}
<h2>Hangi yöntem ne kadar küçültür?</h2>
${h.table(["Yöntem", "Tipik etki", "Görsel etki"], [["Kalite: Dengeli → Küçük dosya", "Bit hızı yaklaşık yarıya iner (<a href=\"../crf-nedir/\">CRF</a> +5)", "Hareketli sahnelerde hafif yumuşama"], ["<a href=\"../video-boyutlandirma/\">1080p → 720p</a>", "Piksel sayısı %56 azalır", "Telefon ekranında çoğu zaman fark edilmez"], ["H.264 → H.265", "Aynı kalitede belirgin şekilde daha küçük", "Eski cihazlarda oynamayabilir (<a href=\"../h264-h265-farki/\">H.264 ve H.265 farkı</a>)"], ["60 FPS → 30 FPS", "Hareketli içerikte bit hızı düşer", "Hareket daha az akıcı"], ["<a href=\"../video-ses-kaldirma/\">Sesi kaldırma</a>", "128 kbps tasarruf", "Ses yok"]])}
<h2>Hedef boyuta sıkıştırma</h2>
<p>Gelişmiş ayarlarda <strong>Hedef boyut (MB)</strong> alanına bir değer girdiğinizde araç gerekli video bit hızını hesaplar: <code>video kbps = hedef MB × 8192 × 0,94 ÷ süre − ses kbps</code>. %6'lık pay, kapsayıcı ek yükü ve bit hızı dalgalanması içindir. Çok kısa bir hedef çok uzun bir video için gerçekçi değilse kalite belirgin şekilde düşer; bu durumda çözünürlüğü de düşürün. Hesabı önceden yapmak için <a href="../video-boyutu-hesaplayici/">video boyutu hesaplayıcıyı</a> kullanın.</p>
<h2>Platformlara göre öneriler</h2>
${h.table(["Kullanım", "Öneri"], [["WhatsApp", "720p, Küçük dosya veya <a href=\"../whatsapp-video-kucultme/\">WhatsApp aracı</a>"], ["E-posta eki", "<a href=\"../25-mb-video-kucultme/\">25 MB altı</a> hedef boyut"], ["Instagram / TikTok", "1080×1920, Dengeli, H.264 (<a href=\"../instagram-video-boyutu/\">Instagram ölçüleri</a>, <a href=\"../tiktok-video-boyutu/\">TikTok ölçüleri</a>)"], ["Web sitesi", "720p veya 1080p, Küçük dosya, sesi kaldır (arka plan videosu)"]])}
<p>Kaynağınız zaten MP4 ise <a href="../mp4-sikistirma/">MP4 sıkıştırma</a> sayfasındaki codec önerilerine de göz atın. Daha fazla teknik ayrıntı için <a href="../video-sikistirma-rehberi/">video sıkıştırma rehberine</a> bakın.</p>`,
  faq: [["Kalite kaybı olmadan video sıkıştırılabilir mi?", "Matematiksel olarak kayıpsız sıkıştırma, boyutu anlamlı ölçüde küçültmez. Ancak doğru CRF değeriyle kayıp gözle fark edilmeyecek düzeyde tutulabilir. Kaynak zaten verimli kodlanmışsa (ör. telefon HEVC kaydı) kazanç sınırlı olabilir."], ["Sıkıştırılmış video neden orijinalden büyük çıktı?", "Kaynak zaten düşük bit hızlıysa veya H.265 ile kodlanmışsa, H.264 ile yeniden kodlamak dosyayı büyütebilir. Kalite ayarını Küçük dosya yapın, H.265 seçin veya hedef boyut girin."], ["Dosyam yükleniyor mu?", "Hayır. Sıkıştırma tamamen tarayıcınızda yapılır."]],
  related: ["mp4-sikistirma/", "25-mb-video-kucultme/", "whatsapp-video-kucultme/", "video-boyutu-hesaplayici/", "kalite-kaybetmeden-video-kucultme/", "crf-nedir/"],
  sources: S("x264", "x265", "wasm"),
}));

pages.push(special({
  path: "mp4-sikistirma/", title: "MP4 Sıkıştırma: MP4 Dosya Boyutunu Küçültün",
  desc: "MP4 dosyalarını tarayıcıda sıkıştırın. CRF kalite, çözünürlük, H.265 ve hedef MB ayarları. Yükleme yok, filigran yok.",
  h1: "MP4 Sıkıştırma", short: "MP4 sıkıştırma", lead: "MP4 videonuzun boyutunu küçültün. Tahmini çıktı boyutu, dönüştürmeden önce gösterilir.",
  tool: { out: "mp4", quality: "small" },
  body: `<p class="answer">MP4 sıkıştırma, videoyu daha düşük bit hızıyla veya daha verimli bir codec'le yeniden kodlayarak boyutu küçültür. Çoğu telefon ve kamera kaydı gereğinden yüksek bit hızıyla kaydedilir; "Küçük dosya" ayarı bu kayıtları genellikle belirgin oranda küçültür.</p>
<h2>Nasıl kullanılır?</h2>${steps3("MP4", "sıkıştırılmış MP4")}
<h2>Neden MP4 dosyaları bu kadar büyük?</h2><p>Telefonlar ve kameralar gerçek zamanlı kodlama yapar; donanım kodlayıcılar hız için verimlilikten ödün verir. Bir yazılım kodlayıcısı (x264) aynı görüntüyü çoğu zaman daha düşük bit hızıyla kodlayabilir. Ayrıca 4K veya 60 FPS kayıt, paylaşım için genellikle gereğinden fazladır.</p>
<h2>Önerilen ayarlar</h2>${h.table(["Hedef", "Kalite", "Çözünürlük", "Codec"], [["Maksimum küçültme", "Küçük dosya", "720p", "H.265"], ["Dengeli paylaşım", "Dengeli", "1080p", "H.264"], ["Arşiv", "Yüksek", "Orijinal", "H.265"]])}
${qualityBlock}`,
  faq: [["MP4 sıkıştırınca ses kalitesi değişir mi?", "Ses AAC 128 kbps ile yeniden kodlanır; bu, konuşma ve çoğu müzik için yeterlidir."]],
  related: ["video-sikistirma/", "25-mb-video-kucultme/", "h264-h265-farki/", "crf-nedir/", "video-bitrate-nedir/"],
  sources: S("x264", "x265"),
}));

pages.push(special({
  path: "video-kesme/", title: "Video Kesme: Videonun İstediğiniz Bölümünü Alın",
  desc: "Online video kesme aracı: başlangıç ve bitiş saniyesini girin, yalnızca o bölümü MP4 olarak indirin. Tarayıcıda çalışır, dosya yüklenmez.",
  h1: "Video Kesme", short: "Video kesme", lead: "Videonuzun yalnızca ihtiyacınız olan bölümünü kesip alın. Başlangıç ve bitiş saniyesini girin, gerisini araç halleder.",
  tool: { out: "mp4", adv: "1" },
  body: `<p class="answer">Video kesmek için dosyanızı seçin, gelişmiş ayarlarda <strong>Başlangıç</strong> ve <strong>Bitiş</strong> alanlarına saniye cinsinden değer girin (ör. 12.5 ve 47) ve "Dönüştür"e basın. Yalnızca bu aralık yeniden kodlanır; çıktı kare hassasiyetinde başlar.</p>
<h2>Nasıl kullanılır?</h2>${h.steps(["<strong>Dosyayı seçin.</strong> Video süresi otomatik algılanır ve Bitiş alanında gösterilir.", "<strong>Aralığı girin.</strong> Dakika:saniye yerine toplam saniye kullanın. Örnek: 1:30 = 90.", "<strong>Dönüştürün.</strong> Kesilen bölüm MP4 olarak indirilmeye hazır olur."])}
${h.table(["Zaman", "Saniye"], [["0:30", "30"], ["1:00", "60"], ["1:30", "90"], ["2:15", "135"], ["5:00", "300"]])}
<h2>İpuçları</h2>${h.ul(["Kesmeyi sıkıştırmayla birleştirin: hedef boyut alanı kesilen süreye göre hesaplanır.", "GIF yapmak için çıktı formatını GIF olarak değiştirin veya <a href=\"../video-gif-donusturucu/\">video GIF dönüştürücüyü</a> kullanın.", "Videonun sesini atmak istiyorsanız \"Sesi kaldır\" seçeneğini işaretleyin (<a href=\"../video-ses-kaldirma/\">videodan ses kaldırma</a>)."])}`,
  faq: [["Video kesmek kaliteyi düşürür mü?", "Araç kesilen bölümü yeniden kodlar; Yüksek kalite ayarında fark gözle görülmez. Bu yöntem, anahtar kare sınırına bağlı kalmadan tam istediğiniz saniyeden başlamayı sağlar."]],
  related: ["video-kirpma/", "video-gif-donusturucu/", "video-sikistirma/", "video-dondurme/"],
}));

pages.push(special({
  path: "video-kirpma/", title: "Video Kırpma: En-Boy Oranını 9:16, 1:1 veya 4:5 Yapın",
  desc: "Videoyu kırpın: 9:16 (Reels, TikTok, Shorts), 1:1, 4:5 veya 16:9 oranına ortadan kırpma. Tarayıcıda, dosya yüklenmeden, ücretsiz.",
  h1: "Video Kırpma", short: "Video kırpma (en-boy)", lead: "Yatay videoyu dikey sosyal medya formatına veya kare formata çevirin. Görüntü ortadan kırpılır.",
  tool: { out: "mp4", aspect: "9:16", adv: "1" },
  body: `<p class="answer">Video kırpma, görüntünün kenarlarını keserek en-boy oranını değiştirir. Örneğin 16:9 yatay bir videoyu 9:16 oranına kırpmak, Reels, TikTok ve Shorts için dikey bir video üretir. Araç merkezden kırpar; görüntünün ortasındaki konu korunur.</p>
<h2>Oranlar ve kullanım alanları</h2>${h.table(["Oran", "Örnek boyut", "Kullanım"], [["9:16", "1080×1920", "Reels, TikTok, YouTube Shorts, hikâyeler"], ["4:5", "1080×1350", "Instagram akış gönderisi"], ["1:1", "1080×1080", "Kare gönderiler, reklamlar"], ["16:9", "1920×1080", "YouTube, TV, sunum"]])}
<h2>Nasıl kullanılır?</h2>${steps3("Video", "kırpılmış MP4")}
<p>Not: "Kırpma" bazen bir videonun süresini kısaltmak anlamında da kullanılır. Süreyi kısaltmak için <a href="../video-kesme/">video kesme aracını</a>, oranı koruyarak yalnızca çözünürlüğü değiştirmek için <a href="../video-boyutlandirma/">video boyutlandırma aracını</a> kullanın.</p>`,
  faq: [["Kırpma yerine siyah bant eklenebilir mi?", "Bu sürümde araç yalnızca merkezden kırpar. Siyah bantlı (letterbox) çıktı ileride eklenecek."]],
  related: ["video-kesme/", "instagram-video-boyutu/", "tiktok-video-boyutu/", "video-boyutlandirma/"],
}));

pages.push(special({
  path: "video-boyutlandirma/", title: "Video Boyutlandırma: Çözünürlüğü 1080p, 720p, 480p Yapın",
  desc: "Video çözünürlüğünü değiştirin: 4K, 1440p, 1080p, 720p, 480p, 360p. En-boy oranı korunur. Tarayıcıda çalışır, yükleme yok.",
  h1: "Video Boyutlandırma", short: "Video boyutlandırma", lead: "Videonuzun çözünürlüğünü düşürerek dosyayı küçültün veya bir platformun gereksinimine uyun. En-boy oranı otomatik korunur.",
  tool: { out: "mp4", res: "720" },
  body: `<p class="answer">Video boyutlandırma, videonun piksel çözünürlüğünü değiştirir. Çözünürlük alanı kısa kenarı belirler: yatay videoda yükseklik, dikey videoda genişlik. Araç yükseltme (upscale) yapmaz; seçilen değer kaynaktan büyükse orijinal çözünürlük korunur.</p>
${h.table(["Etiket", "Yatay (16:9)", "Dikey (9:16)"], [["2160p (4K)", "3840×2160", "2160×3840"], ["1440p", "2560×1440", "1440×2560"], ["1080p (Full HD)", "1920×1080", "1080×1920"], ["720p (HD)", "1280×720", "720×1280"], ["480p", "854×480", "480×854"], ["360p", "640×360", "360×640"]])}
<h2>Nasıl kullanılır?</h2>${steps3("Video", "boyutlandırılmış MP4")}`,
  faq: [["Çözünürlüğü artırmak kaliteyi artırır mı?", "Hayır. Yükseltme yeni ayrıntı eklemez, yalnızca dosyayı büyütür. Bu nedenle araç kaynaktan büyük çözünürlüğe ölçekleme yapmaz."]],
  related: ["video-kirpma/", "video-sikistirma/", "video-boyutu-hesaplayici/", "instagram-video-boyutu/"],
}));

pages.push(special({
  path: "video-ses-kaldirma/", title: "Videodan Ses Kaldırma: Sessiz Video Yapın",
  desc: "Videonun sesini tamamen kaldırın ve sessiz MP4 indirin. Web sitesi arka plan videoları için ideal. Tarayıcıda çalışır, yükleme yok.",
  h1: "Videodan Ses Kaldırma", short: "Ses kaldırma", lead: "Videonuzdaki ses parçasını tamamen kaldırın. Arka plan videoları, sunumlar ve sessiz paylaşımlar için.",
  tool: { out: "mp4", mute: "1", adv: "1" },
  body: `<p class="answer">Videodan sesi kaldırmak için dosyanızı seçin; "Sesi kaldır" seçeneği bu sayfada işaretli gelir. Çıktı MP4'te hiçbir ses parçası bulunmaz. Bu, sesi yalnızca kısmaktan farklıdır: dosya daha küçük olur ve tarayıcılar sessiz videoyu otomatik oynatmaya izin verir.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "sessiz MP4")}
<h2>Kullanım alanları</h2>${h.ul(["Web sitesi hero ve arka plan videoları (<code>autoplay muted loop</code>)", "Ürün tanıtım döngüleri", "Ortam sesi veya konuşma içeren klipleri gizlilik için temizlemek", "Sonradan müzik eklenecek kurgu taslakları"])}`,
  faq: [["Sadece belirli bir bölümün sesini kaldırabilir miyim?", "Bu sürümde ses tüm videodan kaldırılır. Kısmi sessizleştirme için bir video düzenleyici kullanmanızı öneririz."]],
  related: ["video-ses-cikarma/", "video-sikistirma/", "mp4-webm-donusturucu/", "video-mp3-donusturucu/"],
}));

pages.push(special({
  path: "video-ses-cikarma/", title: "Videodan Ses Çıkarma: M4A, MP3, WAV, OGG",
  desc: "Videodan sesi ayırın ve M4A, MP3, WAV veya OGG olarak kaydedin. Tarayıcıda çalışır, dosya yüklenmez, ücretsiz.",
  h1: "Videodan Ses Çıkarma", short: "Ses çıkarma", lead: "Videonuzdaki ses parçasını ayrı bir ses dosyası olarak kaydedin. Format seçimi sizde.",
  tool: { out: "m4a" },
  body: `<p class="answer">Videodan ses çıkarmak, görüntüyü atıp ses parçasını seçtiğiniz formatta kaydeder. M4A (AAC) iyi kalite/boyut dengesi sunar, MP3 en evrensel formattır, WAV düzenleme için sıkıştırılmamış ses, OGG (Vorbis) ise açık bir alternatiftir.</p>
${h.table(["Format", "Tür", "Boyut (dakika)", "En iyi kullanım"], [["M4A (AAC 192k)", "Kayıplı", "~1,4 MB", "Apple cihazlar, genel"], ["<a href=\"../video-mp3-donusturucu/\">MP3 (192k)</a>", "Kayıplı", "~1,4 MB", "Her cihaz"], ["<a href=\"../mp4-wav-donusturucu/\">WAV (PCM)</a>", "Sıkıştırılmamış", "~10 MB", "Düzenleme, transkripsiyon"], ["OGG (Vorbis)", "Kayıplı", "~1,2 MB", "Oyunlar, açık kaynak"]])}
<h2>Nasıl kullanılır?</h2>${steps3("Video", "ses dosyası")}`,
  faq: [["Hangi ses formatı en iyi kaliteyi verir?", "Ek kayıp istemiyorsanız WAV seçin. Paylaşım için M4A veya MP3 192 kbps çoğu kulak için orijinalden ayırt edilemez."]],
  related: ["video-mp3-donusturucu/", "mp4-wav-donusturucu/", "video-ses-kaldirma/", "mp4-mp3-donusturucu/"],
}));

pages.push(special({
  path: "video-dondurme/", title: "Video Döndürme: Yan veya Ters Videoyu Düzeltin",
  desc: "Videoyu 90°, 180° veya 270° döndürün ve MP4 olarak kaydedin. Yan çekilmiş telefon videolarını düzeltin. Tarayıcıda, yüklemesiz.",
  h1: "Video Döndürme", short: "Video döndürme", lead: "Yanlış yönde kaydedilmiş videoları kalıcı olarak düzeltin. Döndürme açısını seçin ve dönüştürün.",
  tool: { out: "mp4", rot: "90", adv: "1" },
  body: `<p class="answer">Videoyu döndürmek için dosyanızı seçin ve gelişmiş ayarlarda açıyı belirleyin: 90° saat yönünde, 270° saat yönünün tersine, 180° ters çevirir. Döndürme görüntüye kalıcı olarak uygulanır; böylece video her oynatıcıda doğru yönde görünür.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "döndürülmüş MP4")}
<h2>Video neden yan görünüyor?</h2><p>Telefonlar genellikle görüntüyü sensör yönünde kaydedip yönü bir meta veri etiketiyle belirtir. Bazı oynatıcılar ve platformlar bu etiketi okumaz. Araç, FFmpeg'in otomatik döndürme davranışıyla bu etiketi zaten uygular; görüntü hâlâ yanlışsa ek döndürme seçin.</p>`,
  faq: [["90° mi 270° mi seçmeliyim?", "Video sola yatmışsa 90° (saat yönü), sağa yatmışsa 270° seçin. Ters ise 180° kullanın."]],
  related: ["video-kesme/", "video-kirpma/", "iphone-video-mp4/", "video-donusturucu/"],
}));

pages.push(special({
  path: "h265-h264-donusturucu/", title: "H.265 (HEVC) H.264 Dönüştürücü: Uyumluluk Sorununu Çözün",
  desc: "HEVC / H.265 videoları H.264 MP4'e dönüştürün; Windows, eski TV'ler ve tarayıcılarda oynatma sorunlarını çözün. Tarayıcıda, yüklemesiz.",
  h1: "H.265 (HEVC) → H.264 Dönüştürücü", short: "HEVC → H.264", lead: "HEVC kodlu videoları her yerde oynayan H.264 formatına dönüştürün.",
  tool: { out: "mp4" },
  body: `<p class="answer">H.265 (HEVC) videoyu H.264'e dönüştürmek, görüntüyü daha eski ama çok daha yaygın desteklenen codec'le yeniden kodlar. Dosya genellikle büyür, ancak Windows bilgisayarlar, eski akıllı TV'ler, Chrome ve Firefox'un bazı sürümleri ve LMS platformları videoyu sorunsuz oynatır.</p>
<h2>Nasıl kullanılır?</h2>${steps3("HEVC", "H.264 MP4")}
<h2>Neden HEVC oynamıyor?</h2><p>HEVC, lisans ücretleri nedeniyle her platformda varsayılan olarak desteklenmez. Bazı Windows sürümlerinde ek codec paketi gerekebilir; tarayıcı desteği ise işletim sistemine ve donanıma bağlıdır. H.264 ise neredeyse tüm cihazlarda donanım desteğine sahiptir. Ayrıntılar için <a href="../h264-h265-farki/">H.264 ve H.265 farkı</a> rehberine bakın.</p>
<p>Not: AV1 kodlu videolar bu sürümde tarayıcı motorumuz tarafından çözülemez.</p>`,
  faq: [["HEVC'yi H.264'e çevirince dosya neden büyüyor?", "H.264, aynı kaliteyi korumak için HEVC'den daha yüksek bit hızı gerektirir. Boyutu sınırlamak için Dengeli veya Küçük dosya kalite ayarını ya da hedef boyutu kullanın."]],
  related: ["h264-h265-farki/", "iphone-video-mp4/", "mov-mp4-donusturucu/", "codec/"],
  sources: S("x264", "x265", "mdnCodecs"),
}));

pages.push(special({
  path: "iphone-video-mp4/", title: "iPhone Videosunu MP4'e Dönüştürme (HEVC MOV → MP4)",
  desc: "iPhone ve iPad videolarını (HEVC MOV) Windows, Android ve web uyumlu H.264 MP4'e çevirin. Tarayıcıda çalışır, dosya yüklenmez.",
  h1: "iPhone Videosunu MP4'e Dönüştürme", short: "iPhone video → MP4", lead: "iPhone'da çekilen HEVC kodlu MOV videoları her cihazda oynayan MP4'e dönüştürün.",
  tool: { out: "mp4" },
  body: `<p class="answer">iPhone, "Yüksek Verimlilik" ayarında videoları HEVC (H.265) codec'iyle MOV dosyası olarak kaydeder. Bu dosyalar Windows, bazı Android cihazlar ve web platformlarında sorun çıkarabilir. H.264 kodlu MP4'e dönüştürmek bu sorunu çözer.</p>
<h2>Nasıl kullanılır?</h2>${steps3("iPhone MOV", "MP4")}
<h2>iPhone'da doğrudan H.264 kaydetmek</h2><p>Ayarlar → Kamera → Formatlar bölümünde "En Uyumlu" seçeneği, yeni kayıtların H.264 olarak yapılmasını sağlar. Bu, dosya boyutunu artırır ancak dönüştürme ihtiyacını ortadan kaldırır.</p>
<h2>Önerilen ayarlar</h2>${h.table(["Amaç", "Ayar"], [["Windows / PowerPoint", "MP4, H.264, Dengeli"], ["<a href=\"../whatsapp-video-kucultme/\">WhatsApp</a>", "MP4, 720p, Küçük dosya"], ["Arşiv (küçük)", "MP4, H.265, Yüksek"]])}
<p>4K 60 FPS iPhone kayıtları büyük dosyalardır; tarayıcıda işlerken 1080p ve 30 FPS seçmek süreyi önemli ölçüde kısaltır.</p>`,
  faq: [["iPhone HDR videoları ne olur?", "HDR (Dolby Vision / HLG) videolar standart dinamik aralıklı H.264'e dönüştürülürken renkler biraz soluk görünebilir. Bu sürümde ton eşleme uygulanmaz."]],
  related: ["mov-mp4-donusturucu/", "h265-h264-donusturucu/", "whatsapp-video-kucultme/", "h264-h265-farki/"],
}));

pages.push(special({
  path: "25-mb-video-kucultme/", title: "25 MB Altına Video Küçültme: E-posta ve Sohbet İçin",
  desc: "Videoyu 25 MB altına küçültün. Hedef boyut otomatik hesaplanır. E-posta ekleri ve dosya sınırlı platformlar için. Tarayıcıda, yükleme yok.",
  h1: "Videoyu 25 MB Altına Küçültme", short: "25 MB altına küçült", lead: "Hedef boyut bu sayfada 24 MB olarak hazır gelir. Videonuzu seçin, araç gereken bit hızını otomatik hesaplasın.",
  tool: { out: "mp4", target: "24", adv: "1", res: "720" },
  body: `<p class="answer">Bir videoyu 25 MB altına küçültmek için toplam bit hızının süreye göre ayarlanması gerekir. Örneğin 2 dakikalık bir video için yaklaşık 1.500 kbps video + 128 kbps ses yeterlidir. Araç, hedef 24 MB (güvenlik payıyla) olarak ayarlıdır ve bit hızını otomatik hesaplar.</p>
<h2>Süreye göre ulaşılabilir kalite</h2>${h.table(["Video süresi", "Yaklaşık video bit hızı (24 MB)", "Önerilen çözünürlük"], [["30 sn", "~5.900 kbps", "1080p"], ["1 dk", "~2.900 kbps", "1080p veya 720p"], ["2 dk", "~1.400 kbps", "720p"], ["5 dk", "~460 kbps", "480p"], ["10 dk", "~170 kbps", "360p (düşük kalite)"]])}
<p>Değerler <code>24 × 8192 × 0,94 ÷ süre − 128</code> formülüyle hesaplanmıştır. 5 dakikayı aşan videolar için 25 MB çok dardır; bulut bağlantısı paylaşmayı düşünün.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "25 MB altı MP4")}
<p>Gmail gibi birçok e-posta hizmeti eklerde yaklaşık 25 MB sınırı uygular. Güncel sınırları kullandığınız hizmetin yardım sayfasından kontrol edin.</p>`,
  faq: [["Çıktı neden tam 24 MB değil?", "Bit hızı kodlama sırasında sahneye göre dalgalanır. Araç %6 güvenlik payı bırakır; çıktı genellikle hedefin biraz altında kalır."], ["Farklı bir boyut hedefleyebilir miyim?", "Evet. Hedef boyut alanına istediğiniz MB değerini yazın, örneğin 8, 50 veya 100."]],
  related: ["video-sikistirma/", "whatsapp-video-kucultme/", "video-boyutu-hesaplayici/", "video-bitrate-nedir/"],
}));

pages.push(special({
  path: "whatsapp-video-kucultme/", title: "WhatsApp Video Küçültme: Gönderilemeyen Videoyu Küçültün",
  desc: "WhatsApp için videoyu küçültün: 720p, H.264 MP4 ve hedef boyut. Tarayıcıda çalışır, dosya yüklenmez. Ücretsiz ve filigransız.",
  h1: "WhatsApp İçin Video Küçültme", short: "WhatsApp video küçültme", lead: "Video WhatsApp'ta gönderilemiyor veya çok kötü sıkıştırılıyorsa önce burada küçültün. Hedef 16 MB ve 720p olarak hazır gelir.",
  tool: { out: "mp4", target: "16", res: "720", adv: "1" },
  body: `<p class="answer">WhatsApp videolarının sorunsuz gönderilmesi için en güvenli format H.264 video ve AAC ses içeren MP4'tür. Bu sayfada çözünürlük 720p ve hedef boyut 16 MB olarak hazır gelir; böylece uygulama videoyu tekrar sıkıştırırken kalite daha az bozulur.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "WhatsApp uyumlu MP4")}
<h2>Sınırlar hakkında</h2><p>WhatsApp'ın video gönderim sınırları uygulama sürümüne ve gönderim yöntemine (video olarak veya belge olarak) göre değişebilir. Güncel değerler için WhatsApp Yardım Merkezi'ni kontrol edin. Hedef boyut alanını ihtiyacınıza göre değiştirebilirsiniz.</p>
<h2>İpuçları</h2>${h.ul(["Uzun videoları <a href=\"../video-kesme/\">kesme aracıyla</a> bölümlere ayırın.", "Konuşma videolarında 480p genellikle yeterlidir.", "Kaliteyi korumak için videoyu \"belge\" olarak gönderebilirsiniz; bu durumda WhatsApp yeniden sıkıştırmaz."])}`,
  faq: [["WhatsApp videoları neden bulanık görünüyor?", "WhatsApp, video olarak gönderilen dosyaları kendi ayarlarıyla yeniden sıkıştırır. Önceden 720p'ye küçültmek bu ikinci sıkıştırmanın etkisini azaltır."]],
  related: ["25-mb-video-kucultme/", "video-sikistirma/", "iphone-video-mp4/", "video-kesme/"],
}));

const socialSpec = h.table(["Format", "En-boy", "Önerilen boyut", "Codec"], [["Reels / TikTok / Shorts", "9:16", "1080×1920", "H.264 + AAC, MP4"], ["Akış gönderisi (dikey)", "4:5", "1080×1350", "H.264 + AAC, MP4"], ["Kare gönderi", "1:1", "1080×1080", "H.264 + AAC, MP4"], ["Yatay video", "16:9", "1920×1080", "H.264 + AAC, MP4"]]);
pages.push(special({
  path: "instagram-video-boyutu/", title: "Instagram Video Boyutu: Reels ve Gönderi Ölçüleri",
  desc: "Instagram Reels, hikâye ve gönderi video boyutları: 9:16, 4:5, 1:1. Videonuzu tarayıcıda doğru orana kırpın ve MP4 olarak hazırlayın.",
  h1: "Instagram Video Boyutu ve Hazırlama", short: "Instagram video boyutu", lead: "Videonuzu Instagram için doğru en-boy oranına ve çözünürlüğe getirin. Bu sayfada 9:16 kırpma ve 1080p hazır gelir.",
  tool: { out: "mp4", aspect: "9:16", res: "1080", adv: "1" },
  body: `<p class="answer">Instagram Reels ve hikâyeler için önerilen video boyutu 1080×1920 piksel (9:16), akış gönderileri için 1080×1350 (4:5) veya 1080×1080 (1:1) kullanılır. En sorunsuz yükleme için H.264 video ve AAC ses içeren MP4 tercih edin.</p>
${socialSpec}
<p>Platformların süre ve dosya boyutu sınırları sık değişir; paylaşmadan önce Instagram Yardım Merkezi'ndeki güncel değerleri kontrol edin. Oranı değiştirmek için <a href="../video-kirpma/">video kırpma aracını</a>, yalnızca çözünürlüğü değiştirmek için <a href="../video-boyutlandirma/">video boyutlandırma aracını</a> kullanabilirsiniz.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "Instagram'a hazır MP4")}`,
  faq: [["Instagram yüklediğim videoyu neden bulanıklaştırıyor?", "Platform her videoyu yeniden sıkıştırır. Kaynağı tam 1080 piksel genişlikte, H.264 ve yeterli bit hızıyla (Dengeli veya Yüksek) hazırlamak sonucu iyileştirir."]],
  related: ["tiktok-video-boyutu/", "video-kirpma/", "video-boyutlandirma/", "video-sikistirma/"],
}));
pages.push(special({
  path: "tiktok-video-boyutu/", title: "TikTok Video Boyutu: 9:16 ve 1080×1920 Hazırlama",
  desc: "TikTok için ideal video boyutu 1080×1920 (9:16). Yatay videoyu tarayıcıda dikeye kırpın ve H.264 MP4 olarak indirin. Yükleme yok.",
  h1: "TikTok Video Boyutu ve Hazırlama", short: "TikTok video boyutu", lead: "Yatay videolarınızı TikTok için dikey 9:16 formatına getirin. Kırpma ve çözünürlük bu sayfada hazır gelir.",
  tool: { out: "mp4", aspect: "9:16", res: "1080", adv: "1" },
  body: `<p class="answer">TikTok için önerilen video boyutu 1080×1920 piksel ve 9:16 en-boy oranıdır. Yatay bir videoyu bu araçla ortadan kırparak dikey hale getirebilirsiniz. H.264 ve AAC içeren MP4 en uyumlu yükleme formatıdır.</p>
${socialSpec}
<p>Süre ve dosya boyutu sınırları için TikTok'un güncel yardım sayfalarını kontrol edin. Uzun bir kaydın yalnızca bir bölümünü paylaşacaksanız önce <a href="../video-kesme/">video kesme aracıyla</a> kısaltın.</p>
<h2>Nasıl kullanılır?</h2>${steps3("Video", "TikTok'a hazır MP4")}`,
  faq: [["Yatay videoyu kırpmadan TikTok'a koyabilir miyim?", "Evet, ancak ekranın üst ve alt kısmı boş kalır ve video küçük görünür. Konu merkezdeyse 9:16 kırpma daha iyi sonuç verir."]],
  related: ["instagram-video-boyutu/", "video-kirpma/", "video-kesme/", "video-sikistirma/"],
}));

pages.push({
  lang: "tr", path: "video-boyutu-hesaplayici/", type: "page", calc: true, crumbs: [["Video araçları", "araclar/"]],
  title: P("Video Boyutu Hesaplayıcı: Bit Hızı ve MB Hesaplama"),
  desc: "Video dosya boyutunu bit hızı ve süreden hesaplayın veya hedef MB için gereken bit hızını bulun. Ücretsiz video bitrate hesaplayıcı.",
  h1: "Video Boyutu ve Bit Hızı Hesaplayıcı", short: "Boyut hesaplayıcı", lead: "Bit hızı ve süreden dosya boyutunu tahmin edin ya da hedef boyut için gereken video bit hızını hesaplayın.",
  body: `<div class="calc" id="calc" data-l='${JSON.stringify({ size: "Tahmini boyut", vbr: "Gereken video bit hızı", tooSmall: "Hedef bu süre için çok küçük" })}'>
<div class="grid">
<label>Hesaplama<select id="c-mode"><option value="size">Bit hızından boyut</option><option value="br">Hedef boyuttan bit hızı</option></select></label>
<label>Süre (dk)<input type="number" id="c-min" value="2" min="0"></label>
<label>Süre (sn)<input type="number" id="c-sec" value="0" min="0" max="59"></label>
<label>Ses (kbps)<input type="number" id="c-abr" value="128" min="0"></label>
<label data-show="size">Video (kbps)<input type="number" id="c-vbr" value="5000" min="0"></label>
<label data-show="br" hidden>Hedef (MB)<input type="number" id="c-target" value="25" min="1"></label>
</div><output aria-live="polite"></output></div>
<p class="answer">Video dosya boyutu yaklaşık olarak <code>(video bit hızı + ses bit hızı) × süre ÷ 8</code> formülüyle hesaplanır. Örneğin 5.000 kbps video ve 128 kbps ses içeren 2 dakikalık bir video yaklaşık 75 MB tutar. Sonuç bir tahmindir; kapsayıcı ek yükü ve değişken bit hızı küçük farklar yaratır.</p>
<h2>Tipik bit hızları (H.264)</h2>${h.table(["Çözünürlük", "Düşük", "Dengeli", "Yüksek"], [["2160p", "10.000", "16.000", "25.000+"], ["1080p", "2.500", "5.000", "8.000"], ["720p", "1.200", "2.800", "4.000"], ["480p", "600", "1.400", "2.000"]])}
<p>Değerler kbps cinsindendir ve 30 FPS içindir; hareketli içerik veya 60 FPS daha yüksek bit hızı ister. H.265 ve VP9 benzer kaliteyi genellikle daha düşük bit hızıyla sağlar.</p>
<h2>Birimler</h2><p>1 bayt = 8 bit. Bu sitede 1 MB = 1.024 KB = 1.048.576 bayt olarak hesaplanır. Bazı işletim sistemleri ve servisler 1 MB = 1.000.000 bayt kullanır; bu yüzden aynı dosya farklı yerlerde biraz farklı görünebilir.</p>`,
  faq: [["Hedef boyuta göre video nasıl sıkıştırılır?", "Hesaplayıcıyla gereken bit hızını bulun veya doğrudan video sıkıştırma aracında Hedef boyut (MB) alanını doldurun; araç hesabı otomatik yapar."]],
  related: ["video-sikistirma/", "25-mb-video-kucultme/", "video-bitrate-nedir/", "crf-nedir/"],
  sources: S("x264"),
});

// ---------- hubs ----------
const cardGrid = (items) => `<div class="cards">${items.map(([x, n, t]) => `<a class="card" href="../${x}"><b>${n}</b><span>${t}</span></a>`).join("")}</div>`;
pages.push(page({
  path: "araclar/", title: "Tüm Video Araçları: Dönüştür, Sıkıştır, Düzenle", h1: "Tüm Video Araçları", short: "Tüm araçlar",
  desc: "Tarayıcıda çalışan tüm video araçları: format dönüştürme, sıkıştırma, kesme, kırpma, döndürme, ses çıkarma ve sosyal medya boyutları. Dosya yüklenmez.",
  lead: "Ne yapmak istediğinizi seçin. Her araç aynı tarayıcı içi motoru kullanır ve dosyanızı yüklemez; sayfalar yalnızca o iş için uygun ayarlarla açılır.",
  body: `<p class="answer">mp4donusturucu.com'daki tüm araçlar FFmpeg'in WebAssembly sürümüyle tarayıcınızda çalışır. Format dönüştürme için kaynak veya hedef formatın sayfasını, boyut sorunları için sıkıştırma araçlarını, görüntüyü değiştirmek için düzenleme araçlarını kullanın.</p>
<h2>Videoyu MP4'e dönüştür</h2>${cardGrid(Object.entries(FMT).map(([k, F]) => [`${k}-mp4-donusturucu/`, `${F.n} → MP4`, F.use]))}
<h2>MP4'ü başka formata dönüştür</h2>${cardGrid([...Object.entries(OUTF).map(([k, O]) => [`mp4-${k}-donusturucu/`, `MP4 → ${O.n}`, O.use]), ["gif-mp4-donusturucu/", "GIF → MP4", "Animasyonları küçük videoya çevirin"], ["video-donusturucu/", "Video dönüştürücü", "Tüm giriş ve çıkış formatları tek sayfada"]])}
<h2>Sıkıştır ve küçült</h2>${cardGrid([["video-sikistirma/", "Video sıkıştırma", "Kalite, çözünürlük ve hedef MB ile küçültün"], ["mp4-sikistirma/", "MP4 sıkıştırma", "Telefon ve kamera MP4 kayıtlarını küçültün"], ["25-mb-video-kucultme/", "25 MB altına küçült", "E-posta ekleri için hedef boyut"], ["whatsapp-video-kucultme/", "WhatsApp için küçült", "720p, H.264 ve hedef boyut"], ["video-boyutu-hesaplayici/", "Boyut hesaplayıcı", "Bit hızı ve MB hesabı"]])}
<h2>Düzenle</h2>${cardGrid([["video-kesme/", "Video kesme", "Belirli bir saniye aralığını alın"], ["video-kirpma/", "Video kırpma", "9:16, 1:1, 4:5 veya 16:9 oranına kırpın"], ["video-boyutlandirma/", "Video boyutlandırma", "Çözünürlüğü 1080p, 720p, 480p yapın"], ["video-dondurme/", "Video döndürme", "Yan veya ters videoları düzeltin"], ["h265-h264-donusturucu/", "HEVC → H.264", "Codec uyumluluk sorunlarını çözün"], ["iphone-video-mp4/", "iPhone video → MP4", "HEVC MOV kayıtlarını her yerde oynatın"]])}
<h2>Ses</h2>${cardGrid([["video-mp3-donusturucu/", "Video → MP3", "Herhangi bir videonun sesini MP3 yapın"], ["video-ses-cikarma/", "Videodan ses çıkarma", "M4A, MP3, WAV veya OGG"], ["video-ses-kaldirma/", "Videodan ses kaldırma", "Sessiz video, arka plan döngüleri"]])}
<h2>Sosyal medya ve GIF</h2>${cardGrid([["instagram-video-boyutu/", "Instagram video boyutu", "Reels ve gönderi ölçüleri"], ["tiktok-video-boyutu/", "TikTok video boyutu", "1080×1920, 9:16"], ["video-gif-donusturucu/", "Video → GIF", "Yüksek kaliteli GIF yapın"]])}`,
  related: ["rehberler/", "nasil-calisir/"],
}));
pages.push(page({
  path: "rehberler/", title: "Video Rehberleri: Formatlar, Codec'ler ve Sıkıştırma", h1: "Video Rehberleri", short: "Rehberler",
  desc: "Video formatları, codec'ler, bit hızı, CRF ve sıkıştırma hakkında kısa ve kaynaklı rehberler. MP4, MKV, WebM, H.264 ve H.265 karşılaştırmaları.",
  lead: "Doğru formatı ve ayarı seçmek için ihtiyaç duyduğunuz temel bilgiler. Her rehber kısa bir cevapla başlar ve teknik kaynaklarını belirtir.",
  body: `<p class="answer">Bu rehberler, video dönüştürürken en sık sorulan soruları yanıtlar: hangi format, hangi codec, hangi kalite ayarı ve dosya boyutu nasıl hesaplanır. Bilgiler FFmpeg belgelerine ve MDN Web Docs'a dayanır.</p>
<h2>Formatlar</h2>${cardGrid([["formatlar/", "Video formatları rehberi", "MP4, MOV, MKV, AVI, WebM ve diğerlerinin karşılaştırması"], ["mp4-nedir/", "MP4 nedir?", "Yapısı, codec'leri ve kullanım alanları"], ["mkv-nedir/", "MKV nedir?", "Matroska'nın avantajları ve açılışı"], ["webm-mi-mp4-mu/", "WebM mi MP4 mü?", "Profilinize göre net öneri"]])}
<h2>Codec'ler</h2>${cardGrid([["codec/", "Video codec rehberi", "H.264, H.265, VP9 ve AV1"], ["h264-h265-farki/", "H.264 ve H.265 farkı", "Verimlilik ve uyumluluk"], ["en-iyi-mp4-codec/", "En iyi MP4 codec", "Senaryolara göre seçim"]])}
<h2>Kalite ve boyut</h2>${cardGrid([["video-bitrate-nedir/", "Bit hızı nedir?", "CBR, VBR ve CRF farkı"], ["crf-nedir/", "CRF nedir?", "x264 ve x265 için doğru değer"], ["kalite-kaybetmeden-video-kucultme/", "Kaliteyi koruyarak küçültme", "Gözle görülmeyen kayıpla küçültme yolları"], ["video-sikistirma-rehberi/", "Video sıkıştırma rehberi", "Teknikler ve gerçekçi beklentiler"]])}
<h2>Site hakkında</h2>${cardGrid([["nasil-calisir/", "Nasıl çalışır?", "Tarayıcıda dönüştürmenin teknik açıklaması"], ["metodoloji/", "Metodoloji", "Ayarların dayanağı ve yapılan testler"]])}`,
  related: ["araclar/", "video-boyutu-hesaplayici/"],
}));

// ---------- guides ----------
pages.push(guide({
  path: "formatlar/", title: "Video Formatları Rehberi: MP4, MOV, MKV, AVI, WebM",
  desc: "Video formatları karşılaştırması: MP4, MOV, MKV, AVI, WebM, 3GP, TS, FLV, OGV. Hangi format nerede oynar, hangi codec'leri taşır?",
  h1: "Video Formatları Rehberi", short: "Video formatları",
  body: `<p class="answer">Video formatı (kapsayıcı), video, ses ve altyazı parçalarını tek dosyada bir arada tutan yapıdır. En yaygın formatlar MP4, MOV, MKV, AVI ve WebM'dir. Uyumluluk için en güvenli seçim H.264 video ve AAC ses içeren MP4'tür.</p>
<h2>Kapsayıcı ve codec farkı</h2><p>Dosya uzantısı (.mp4, .mkv) kapsayıcıyı gösterir; içindeki görüntünün nasıl sıkıştırıldığını ise codec belirler. Aynı MP4 dosyası H.264 veya HEVC içerebilir ve bir cihaz MP4'ü desteklese bile HEVC'yi çözemeyebilir. Codec'ler için <a href="../codec/">codec rehberine</a> bakın.</p>
<h2>Format karşılaştırma tablosu</h2>
${h.table(["Format", "Geliştiren", "Yaygın codec'ler", "Tarayıcı", "Dönüştür"], [...Object.entries(FMT).map(([k, F]) => [`<strong>${F.n}</strong> <code>${F.ext}</code>`, F.dev, F.codecs, F.web, `<a href="../${k}-mp4-donusturucu/">${F.n} → MP4</a>`]), ["<strong>MP4</strong> <code>.mp4</code>", CMP_MP4.dev, CMP_MP4.codecs, CMP_MP4.web, '<a href="../mp4-webm-donusturucu/">MP4 → WebM</a>']])}
<h2>Hangi formatı seçmeliyim?</h2>${h.ul(["<strong>Paylaşım, telefon, TV, sosyal medya:</strong> MP4 (H.264 + AAC).", "<strong>Web sitesi:</strong> WebM (VP9) + yedek MP4.", "<strong>Arşiv, çok dilli ses, altyazı:</strong> MKV.", "<strong>Apple kurgu iş akışı:</strong> MOV veya MP4.", "<strong>Eski cihazlar:</strong> AVI (Xvid)."])}<p>Seçtiğiniz formata dönüştürmek için <a href="../video-donusturucu/">video dönüştürücüyü</a> kullanabilirsiniz; tüm çıkış formatları tek sayfadadır.</p>
<h2>Metodoloji</h2><p>Bu tablodaki bilgiler FFmpeg ve MDN belgelerine dayanır. Tarayıcı desteği sürümlere göre değişebilir; "codec'e bağlı" ifadesi, kapsayıcının değil içindeki codec'in belirleyici olduğu durumları gösterir.</p>`,
  related: ["codec/", "mp4-nedir/", "mkv-nedir/", "webm-mi-mp4-mu/", "video-donusturucu/"],
  sources: S("ffFormats", "mdnFormats", "ffGeneral"),
}));

pages.push(guide({
  path: "codec/", title: "Video Codec Rehberi: H.264, H.265, VP9 ve AV1",
  desc: "Video codec nedir? H.264, H.265 (HEVC), VP9 ve AV1 karşılaştırması: verimlilik, uyumluluk, lisans ve kullanım alanları.",
  h1: "Video Codec Rehberi", short: "Codec rehberi",
  body: `<p class="answer">Video codec, görüntüyü sıkıştıran ve açan algoritmadır. Bugün en yaygın dört codec H.264 (AVC), H.265 (HEVC), VP9 ve AV1'dir. H.264 en uyumlusudur; HEVC, VP9 ve AV1 aynı kalitede daha küçük dosya üretir ancak destekleri daha sınırlıdır.</p>
<h2>Karşılaştırma</h2>
${h.table(["Codec", "Yayın", "Verimlilik (H.264'e göre)", "Uyumluluk", "Lisans"], [["H.264 / AVC", "2003", "Referans", "Neredeyse evrensel", "Patentli (MPEG LA havuzu)"], ["H.265 / HEVC", "2013", "Aynı kalitede belirgin şekilde daha küçük", "Yeni cihazlar; tarayıcı desteği değişken", "Patentli, birden fazla havuz"], ["VP9", "2013", "HEVC'ye yakın", "Chrome, Firefox, Edge, Android; YouTube", "Telifsiz (Google)"], ["AV1", "2018", "En verimli", "Yeni tarayıcılar ve cihazlar; donanım desteği artıyor", "Telifsiz (AOMedia)"]])}
<p>Verimlilik farkları içeriğe ve kodlayıcı ayarlarına göre değişir; kesin yüzdeler yerine göreli sıralama verilmiştir.</p>
<h2>Ses codec'leri</h2>${h.table(["Codec", "Kullanım"], [["AAC", "MP4 ve MOV içinde standart; neredeyse evrensel"], ["MP3", "En eski ve en yaygın kayıplı ses"], ["Opus", "WebM, düşük gecikmeli iletişim; çok verimli"], ["Vorbis", "Ogg / WebM, eski açık codec"], ["PCM", "Sıkıştırılmamış; WAV ve profesyonel MOV"]])}
<h2>Bu sitede hangi codec'ler var?</h2><p>Tarayıcı motorumuz (ffmpeg.wasm) H.264 (x264), H.265 (x265), VP9 (libvpx), MPEG-4 Part 2, AAC, MP3 (LAME), Opus ve Vorbis kodlayabilir. AV1 kodlama ve AV1 çözme bu sürümde mevcut değildir.</p>
<h2>Hangi codec'i seçmeliyim?</h2><p>Kısa cevap: uyumluluk için H.264, depolama için H.265, web için VP9 veya AV1. Senaryolara göre öneriler <a href="../en-iyi-mp4-codec/">en iyi MP4 codec</a> rehberinde, iki yaygın codec'in ayrıntılı karşılaştırması <a href="../h264-h265-farki/">H.264 ve H.265 farkı</a> sayfasındadır.</p>`,
  related: ["h264-h265-farki/", "en-iyi-mp4-codec/", "formatlar/", "crf-nedir/"],
  sources: S("ffCodecs", "mdnCodecs", "x264", "x265", "vp9"),
}));

pages.push(guide({
  path: "mp4-nedir/", title: "MP4 Nedir? Özellikleri, Codec'leri ve Kullanımı",
  desc: "MP4 nedir, ne işe yarar? MPEG-4 Part 14 kapsayıcısı, H.264 ve AAC codec'leri, MP4 ile MOV ve MKV farkları. Kısa ve net rehber.",
  h1: "MP4 Nedir?", short: "MP4 nedir?",
  body: `<p class="answer">MP4 (MPEG-4 Part 14), video, ses, altyazı ve meta verileri tek dosyada taşıyan bir kapsayıcı formattır. ISO/IEC 14496-14 standardıyla tanımlanır ve genellikle H.264 video ile AAC ses içerir. Telefonlardan akıllı TV'lere ve tarayıcılara kadar en geniş desteğe sahip video formatıdır.</p>
<h2>MP4 nasıl çalışır?</h2><p>MP4, Apple'ın QuickTime dosya yapısını temel alan ISO temel medya dosya formatından türemiştir. Dosya "box" (atom) adı verilen bölümlerden oluşur: <code>ftyp</code> dosya türünü, <code>moov</code> zaman çizelgesi ve parça bilgilerini, <code>mdat</code> ise asıl ses ve görüntü verisini içerir. <code>moov</code> bölümü dosyanın başına taşındığında (faststart) video, tamamı indirilmeden oynamaya başlar; bu sitedeki MP4 çıktıları bu şekilde hazırlanır.</p>
<h2>MP4 içinde hangi codec'ler olabilir?</h2>${h.table(["Tür", "Yaygın", "Diğer"], [["Video", "H.264 (AVC)", "H.265 (HEVC), AV1, MPEG-4 Part 2"], ["Ses", "AAC", "MP3, AC-3, Opus"], ["Altyazı", "mov_text", "-"]])}
<h2>MP4, MOV ve MKV farkı</h2>${h.table(["", "MP4", "MOV", "MKV"], [["Standart", "ISO", "Apple", "Açık (Matroska)"], ["Uyumluluk", "En geniş", "Apple odaklı", "Masaüstü oynatıcılar"], ["Çoklu ses / altyazı", "Sınırlı", "Sınırlı", "Güçlü"], ["Tarayıcı", "Evet", "Codec'e bağlı", "Resmî değil"]])}
<h2>MP4 ne zaman kullanılmalı?</h2><p>Bir videonun "her yerde oynaması" gerekiyorsa MP4 (H.264 + AAC) doğru seçimdir: sosyal medya, mesajlaşma, web siteleri, sunumlar, akıllı TV'ler. Çok dilli ses veya altyazı arşivlemek için <a href="../mkv-nedir/">MKV</a> daha esnektir. MP4 içinde hangi codec'in kullanılacağı için <a href="../en-iyi-mp4-codec/">en iyi MP4 codec</a> rehberine bakın.</p>`,
  related: ["", "formatlar/", "en-iyi-mp4-codec/", "webm-mi-mp4-mu/"],
  sources: S("ffFormats", "mdnFormats"),
}));

pages.push(guide({
  path: "h264-h265-farki/", title: "H.264 ve H.265 (HEVC) Farkı Nedir? Hangisi Daha İyi?",
  desc: "H.264 ve H.265 karşılaştırması: sıkıştırma verimliliği, kalite, uyumluluk, kodlama süresi. Hangi durumda hangisini seçmelisiniz?",
  h1: "H.264 ve H.265 Farkı", short: "H.264 vs H.265",
  body: `<p class="answer">H.265 (HEVC), H.264'ün halefidir ve aynı görsel kaliteyi genellikle belirgin şekilde daha düşük bit hızıyla sağlar. Ancak H.264 neredeyse her cihazda ve tarayıcıda oynarken HEVC desteği platforma ve donanıma bağlıdır. Uyumluluk önemliyse H.264, depolama önemliyse H.265 seçin.</p>
<h2>Karşılaştırma</h2>${h.table(["Özellik", "H.264 / AVC", "H.265 / HEVC"], [["Standart yılı", "2003", "2013"], ["Sıkıştırma verimliliği", "Referans", "Aynı kalitede daha küçük dosya"], ["Kodlama hızı", "Hızlı", "Daha yavaş (özellikle tarayıcıda)"], ["Donanım çözme", "Neredeyse her cihaz", "Yeni cihazlar"], ["Tarayıcı desteği", "Evrensel", "İşletim sistemi ve donanıma bağlı"], ["Maksimum çözünürlük", "4K'ya kadar yaygın", "8K'ya kadar"], ["Bu sitedeki CRF (Dengeli)", "24", "28"]])}
<h2>Ne zaman H.264?</h2>${h.ul(["Videoyu bilinmeyen cihazlarda paylaşacaksanız", "Web sitesi, LMS, PowerPoint, eski TV", "Hızlı kodlama gerekiyorsa"])}<p>Elinizdeki HEVC videoyu <a href="../h265-h264-donusturucu/">H.265'ten H.264'e dönüştürebilirsiniz</a>.</p>
<h2>Ne zaman H.265?</h2>${h.ul(["Arşiv ve yedekleme (depolama tasarrufu)", "Yeni iPhone, Mac ve Android cihazlar arasında paylaşım", "4K içerik"])}
<h2>CRF değerleri neden farklı?</h2><p>x264 ve x265 kodlayıcılarının CRF ölçekleri birebir aynı değildir. FFmpeg belgeleri, x265 için varsayılan CRF'nin 28 olduğunu ve x264 CRF 23 ile yaklaşık benzer kaliteye denk geldiğini belirtir. Bu yüzden araç H.265 seçildiğinde CRF'yi 4 puan artırır.</p>`,
  related: ["h265-h264-donusturucu/", "codec/", "crf-nedir/", "en-iyi-mp4-codec/"],
  sources: S("x264", "x265", "mdnCodecs"),
}));

pages.push(guide({
  path: "webm-mi-mp4-mu/", title: "WebM mi MP4 mü? Hangisini Seçmelisiniz?",
  desc: "WebM ve MP4 karşılaştırması: kalite, boyut, tarayıcı uyumluluğu, codec'ler ve kullanım alanları. Profilinize göre net öneri.",
  h1: "WebM mi MP4 mü?", short: "WebM vs MP4",
  body: `<p class="answer">Uyumluluk için MP4, web sitesinde bant genişliği tasarrufu için WebM daha iyidir. MP4 (H.264) neredeyse her cihazda oynar; WebM (VP9) aynı kalitede genellikle daha küçüktür ancak bazı uygulamalar ve eski Apple cihazları desteklemez. Web siteleri için en iyi yaklaşım ikisini birlikte sunmaktır.</p>
<h2>Karşılaştırma</h2>${h.table(["", "MP4", "WebM"], [["Video codec", "H.264, HEVC, AV1", "VP8, VP9, AV1"], ["Ses codec", "AAC, MP3", "Opus, Vorbis"], ["Lisans", "Patentli codec'ler", "Telifsiz"], ["Tarayıcı", "Evrensel", "Chrome, Firefox, Edge; Safari sürüme bağlı"], ["Mesajlaşma, sosyal medya", "Evet", "Çoğu zaman hayır"], ["Kurgu programları", "Evet", "Sınırlı"], ["Tarayıcıda kodlama hızı (bu site)", "Hızlı", "Yavaş"]])}
<h2>Profile göre öneri</h2>${h.table(["Profil", "Öneri"], [["Web geliştirici", "WebM + MP4 (<code>&lt;source&gt;</code> ile ikisi birden)"], ["Sosyal medya, WhatsApp", "MP4"], ["Kurgu, sunum", "MP4"], ["Açık kaynak proje", "WebM"]])}
<h2>Web sitesinde ikisini birlikte kullanmak</h2><p><code>&lt;video&gt;&lt;source src="video.webm" type="video/webm"&gt;&lt;source src="video.mp4" type="video/mp4"&gt;&lt;/video&gt;</code> yapısında tarayıcı desteklediği ilk kaynağı seçer.</p>`,
  related: ["mp4-webm-donusturucu/", "webm-mp4-donusturucu/", "formatlar/", "codec/"],
  sources: S("mdnFormats", "vp9"),
}));

pages.push(guide({
  path: "kalite-kaybetmeden-video-kucultme/", title: "Video Kalitesi Bozulmadan Nasıl Küçültülür?",
  desc: "Videoyu kalite kaybı olmadan (veya gözle görülmeyen kayıpla) küçültmenin yolları: CRF, çözünürlük, codec, FPS ve ses ayarları.",
  h1: "Video Kalitesi Bozulmadan Nasıl Küçültülür?", short: "Kalite kaybetmeden küçültme",
  body: `<p class="answer">Videoyu gözle görülür kalite kaybı olmadan küçültmenin en etkili yolu, sabit kalite modunda (CRF) yazılım kodlayıcısıyla yeniden kodlamaktır. H.264 için CRF 20-23, H.265 için 24-27 aralığı çoğu videoda orijinalden ayırt edilemeyen sonuç verir. Ardından gereksiz çözünürlüğü ve FPS'i düşürün.</p>
<h2>Adım adım</h2>${h.steps(["<strong>CRF ile yeniden kodlayın.</strong> Telefon kayıtları genellikle gereğinden yüksek bit hızlıdır. Araçta \"Dengeli\" veya \"Yüksek\" seçin.", "<strong>Çözünürlüğü ekrana göre seçin.</strong> Telefonda izlenecek bir video için 4K gereksizdir; 1080p yeterlidir.", "<strong>Codec'i yükseltin.</strong> Hedef cihazlar destekliyorsa H.265 aynı kalitede daha küçük dosya üretir."])}
<h2>Gözle fark edilmeyen ayarlar</h2>${h.table(["Değişiklik", "Kazanç", "Risk"], [["4K → 1080p (telefon izleme)", "Yüksek", "Büyük ekranda yumuşama"], ["60 → 30 FPS (konuşma videoları)", "Orta", "Hızlı hareketlerde akıcılık kaybı"], ["Ses 320 → 128 kbps AAC", "Düşük", "Müzik videolarında hafif kayıp"], ["H.264 → H.265", "Yüksek", "Eski cihaz uyumluluğu"]])}
<h2>Kaçınılması gerekenler</h2>${h.ul(["Aynı videoyu defalarca sıkıştırmak: her yeniden kodlama kaybı biriktirir. Her zaman orijinalden başlayın.", "Çok düşük hedef boyut: süreye göre gerçekçi olmayan bir hedef, bloklu görüntüye yol açar. <a href=\"../video-boyutu-hesaplayici/\">Hesaplayıcıyla</a> kontrol edin.", "Yükseltme (upscale): dosyayı büyütür, kaliteyi artırmaz."])}`,
  related: ["video-sikistirma/", "crf-nedir/", "video-bitrate-nedir/", "video-sikistirma-rehberi/"],
  sources: S("x264", "x265"),
}));

pages.push(guide({
  path: "en-iyi-mp4-codec/", title: "En İyi MP4 Codec Hangisi? H.264, H.265 veya AV1",
  desc: "MP4 için en iyi codec hangisi? Uyumluluk, dosya boyutu ve kalite açısından H.264, H.265 ve AV1'in karşılaştırması ve kullanım önerileri.",
  h1: "En İyi MP4 Codec Hangisi?", short: "En iyi MP4 codec",
  body: `<p class="answer">Çoğu kullanıcı için en iyi MP4 codec'i H.264'tür, çünkü neredeyse her cihazda ve tarayıcıda oynar. Daha küçük dosya ve yeni cihazlar için H.265 (HEVC), web'de en yüksek verimlilik için AV1 öne çıkar. Ses için standart seçim AAC'dir.</p>
${h.table(["Senaryo", "Video codec", "Ses codec"], [["Genel paylaşım", "H.264", "AAC 128-192 kbps"], ["Arşiv / depolama", "H.265", "AAC 192 kbps"], ["Web, büyük ölçek", "AV1 + H.264 yedek", "Opus / AAC"], ["Eski TV ve oynatıcılar", "H.264 (High profil, 1080p)", "AAC"]])}
<h2>Profil ve seviye</h2><p>H.264'ün profilleri (Baseline, Main, High) hangi sıkıştırma özelliklerinin kullanılacağını belirler. Günümüzdeki telefon, bilgisayar ve TV'lerin büyük çoğunluğu High profili destekler. Bu sitedeki çıktılar, geniş uyumluluk için <code>yuv420p</code> piksel formatıyla üretilir; 10 bit veya 4:2:2 kaynaklar 8 bit 4:2:0'a dönüştürülür.</p>`,
  related: ["codec/", "h264-h265-farki/", "mp4-nedir/", ""],
  sources: S("x264", "mdnCodecs"),
}));

pages.push(guide({
  path: "video-bitrate-nedir/", title: "Video Bitrate (Bit Hızı) Nedir? Doğru Değer Seçimi",
  desc: "Bit hızı nedir, kaliteyi ve dosya boyutunu nasıl etkiler? CBR, VBR ve CRF farkı, çözünürlüğe göre önerilen bit hızları.",
  h1: "Video Bit Hızı (Bitrate) Nedir?", short: "Bitrate nedir?",
  body: `<p class="answer">Bit hızı (bitrate), videonun bir saniyesi için kullanılan veri miktarıdır ve genellikle kbps veya Mbps ile ölçülür. Yüksek bit hızı daha fazla ayrıntı ve daha büyük dosya demektir. Dosya boyutu yaklaşık olarak bit hızı × süre ÷ 8 ile hesaplanır.</p>
<h2>CBR, VBR ve CRF</h2>${h.table(["Mod", "Nasıl çalışır", "Ne zaman"], [["CBR (sabit)", "Her saniye aynı veri", "Canlı yayın"], ["VBR (değişken)", "Karmaşık sahnelere daha fazla veri", "Hedef boyut gereken durumlar"], ["CRF (sabit kalite)", "Hedef kaliteye göre bit hızı değişir", "Dosya dönüştürme ve arşiv"]])}
<p>Bu sitedeki kalite ayarları CRF kullanır; hedef boyut girdiğinizde ortalama bit hızı moduna geçilir.</p>
<h2>Örnek hesap</h2><p>1080p, 5.000 kbps video ve 128 kbps ses, 3 dakika: (5.000 + 128) × 180 ÷ 8 = 115.380 KB ≈ 112,7 MB. Kendi değerleriniz için <a href="../video-boyutu-hesaplayici/">hesaplayıcıyı</a> kullanın.</p>`,
  related: ["video-boyutu-hesaplayici/", "crf-nedir/", "video-sikistirma/", "25-mb-video-kucultme/"],
  sources: S("x264"),
}));

pages.push(guide({
  path: "crf-nedir/", title: "CRF Nedir? x264 ve x265 İçin Doğru CRF Değeri",
  desc: "CRF (Constant Rate Factor) nedir, nasıl çalışır? H.264 ve H.265 için önerilen CRF değerleri ve kalite-boyut dengesi.",
  h1: "CRF (Constant Rate Factor) Nedir?", short: "CRF nedir?",
  body: `<p class="answer">CRF (Constant Rate Factor), x264 ve x265 kodlayıcılarında hedef bit hızı yerine hedef kalite belirleyen moddur. Düşük CRF daha yüksek kalite ve daha büyük dosya, yüksek CRF daha küçük dosya demektir. x264'te ölçek 0-51 arasıdır ve varsayılan 23'tür; FFmpeg belgeleri 17-28 aralığını makul kabul eder.</p>
<h2>Bu sitedeki değerler</h2>${h.table(["Kalite ayarı", "H.264 CRF", "H.265 CRF", "VP9 CRF"], [["Yüksek", "20", "24", "30"], ["Dengeli", "24", "28", "34"], ["Küçük dosya", "29", "33", "40"]])}
<h2>Kurallar</h2>${h.ul(["CRF'yi 6 artırmak x264'te bit hızını kabaca yarıya indirir (FFmpeg H.264 rehberi).", "CRF dosya boyutunu garanti etmez; belirli bir MB gerekiyorsa hedef boyut kullanın.", "Preset (veryfast, medium, slow) aynı CRF'de boyutu etkiler; bu site tarayıcıda hız için veryfast kullanır."])}
<h2>CRF mi, hedef boyut mu?</h2>${h.table(["Durum", "Önerilen mod", "Neden"], [["Arşiv, kalite öncelikli", "CRF", "Her sahneye gereken kadar veri harcanır"], ["E-posta veya platform boyut sınırı", "Hedef boyut (ortalama bit hızı)", "Sonuç belirli bir MB değerine yaklaşır"], ["Çok farklı uzunlukta birçok video", "CRF", "Tüm videolarda tutarlı kalite"]])}
<p>Örnek: Aynı 2 dakikalık 1080p video CRF 24 ile basit bir konuşma sahnesinde birkaç MB, hızlı hareketli bir spor sahnesinde onlarca MB tutabilir. Boyut önemliyse <a href="../video-boyutu-hesaplayici/">video boyutu hesaplayıcı</a> ile hedef bit hızını hesaplayın.</p>`,
  related: ["video-bitrate-nedir/", "h264-h265-farki/", "video-sikistirma/", "kalite-kaybetmeden-video-kucultme/"],
  sources: S("x264", "x265", "vp9"),
}));

pages.push(guide({
  path: "mkv-nedir/", title: "MKV Nedir? MKV Dosyası Nasıl Açılır ve Dönüştürülür?",
  desc: "MKV (Matroska) nedir, neden kullanılır, hangi programlar açar? MKV'yi MP4'e dönüştürmek ne zaman gerekir?",
  h1: "MKV Nedir?", short: "MKV nedir?",
  body: `<p class="answer">MKV (Matroska Video), birden fazla video, ses ve altyazı parçasını tek dosyada taşıyabilen açık ve ücretsiz bir kapsayıcı formattır. Arşivleme ve çok dilli içerik için idealdir; VLC ve mpv gibi oynatıcılar açar, ancak telefonlar, iPhone ve birçok TV doğrudan desteklemeyebilir.</p>
<h2>MKV'nin avantajları</h2>${h.ul(["Tek dosyada birden fazla ses ve altyazı parçası", "Bölüm (chapter) desteği", "Neredeyse her codec'i taşıyabilme", "Açık standart, lisans ücreti yok", "Kayıt beklenmedik şekilde kesilse bile o ana kadar kaydedilen kısım genellikle oynatılabilir; OBS bu yüzden MKV ile kaydetmeyi önerir"])}
<h2>MKV dosyası nasıl açılır?</h2><p>VLC ve mpv gibi ücretsiz oynatıcılar MKV dosyalarını doğrudan açar. Dosyayı telefonda, akıllı TV'de, sunumda veya kurgu programında kullanmanız gerekiyorsa MP4'e dönüştürmek en güvenli yoldur.</p>
<h2>OBS kayıtları için not</h2><p>OBS Studio, MKV kayıtlarını yeniden kodlamadan MP4'e aktaran Dosya menüsünde "Remux Recordings" (kayıtları yeniden paketleme) özelliğine sahiptir; bu yöntem kalite kaybı olmadan ve çok hızlı çalışır. Kaydı küçültmek veya çözünürlüğünü değiştirmek istiyorsanız tarayıcıdaki dönüştürücü yeniden kodlama yapar.</p>
<h2>MKV'yi MP4'e ne zaman dönüştürmeli?</h2><p>Videoyu iPhone'da oynatmak, kurgu programına aktarmak, sosyal medyada paylaşmak veya web'e yüklemek istiyorsanız. <a href="../mkv-mp4-donusturucu/">MKV → MP4 dönüştürücü</a> bunu tarayıcınızda yapar.</p>`,
  related: ["mkv-mp4-donusturucu/", "formatlar/", "mp4-nedir/", "codec/"],
  sources: S("ffFormats", "mdnFormats"),
}));

pages.push(guide({
  path: "video-sikistirma-rehberi/", title: "Video Sıkıştırma Rehberi: Teknikler, Ayarlar ve Örnekler",
  desc: "Kapsamlı video sıkıştırma rehberi: codec, CRF, bit hızı, çözünürlük, FPS, ses ve hedef boyut stratejileri. Platformlara göre öneriler.",
  h1: "Video Sıkıştırma Rehberi", short: "Sıkıştırma rehberi",
  body: `<p class="answer">Video sıkıştırma, görüntüyü daha az veriyle temsil etmektir. Dosya boyutunu belirleyen dört kaldıraç vardır: codec (verimlilik), bit hızı veya CRF (kalite hedefi), çözünürlük (piksel sayısı) ve kare hızı. Doğru sıra: önce codec ve CRF, sonra çözünürlük, en son FPS.</p>
<h2>1. Codec seçimi</h2><p>H.264 uyumluluk, H.265 verimlilik sağlar. Ayrıntılar: <a href="../h264-h265-farki/">H.264 ve H.265 farkı</a>.</p>
<h2>2. Kalite hedefi (CRF) veya boyut hedefi</h2><p>Belirli bir MB sınırı yoksa CRF kullanın: video basit sahnelerde daha az, karmaşık sahnelerde daha fazla veri harcar. Sınır varsa hedef boyut modunu kullanın. Bkz. <a href="../crf-nedir/">CRF nedir?</a></p>
<h2>3. Çözünürlük</h2><p>Piksel sayısı çözünürlüğün karesiyle artar: 1080p, 720p'nin 2,25 katı piksel içerir. İzleme ekranından büyük çözünürlük boyuta katkı yapar ama görülmez.</p>
<h2>4. Kare hızı</h2><p>60 FPS oyun ve spor için anlamlıdır; konuşma, sunum ve ekran kayıtlarında 30 veya 24 FPS yeterlidir.</p>
<h2>5. Ses</h2><p>AAC 128 kbps konuşma ve çoğu müzik için yeterlidir. Arka plan videolarında sesi tamamen kaldırın.</p>
<h2>Gerçekçi beklentiler</h2>${h.table(["Kaynak", "Tipik sonuç"], [["Telefon kaydı, H.264, yüksek bit hızı", "Belirgin küçülme"], ["Ekran kaydı (az hareket)", "Çok yüksek küçülme"], ["Zaten sıkıştırılmış sosyal medya videosu", "Sınırlı küçülme; büyüyebilir"], ["HEVC telefon kaydı", "H.265 ile orta, H.264 ile büyüyebilir"]])}`,
  related: ["video-sikistirma/", "kalite-kaybetmeden-video-kucultme/", "video-bitrate-nedir/", "video-boyutu-hesaplayici/"],
  sources: S("x264", "x265", "vp9"),
}));

// ---------- trust & legal ----------
pages.push(page({
  path: "hakkimizda/", key: "about", title: "Hakkımızda", h1: "Hakkımızda", short: "Hakkımızda",
  desc: "mp4donusturucu.com, videoları tarayıcıda, dosya yüklemeden dönüştüren gizlilik öncelikli bir araçtır. Amacımız ve ilkelerimiz.",
  body: `<p class="answer">mp4donusturucu.com, video dosyalarını doğrudan tarayıcıda dönüştüren ve sıkıştıran ücretsiz bir araçtır. Temel ilkemiz basittir: dosyanız cihazınızdan çıkmamalıdır.</p>
<h2>Neden bu siteyi yaptık?</h2><p>Çevrim içi dönüştürücülerin çoğu dosyanızı bir sunucuya yükler, kuyrukta bekletir ve çoğu zaman ne kadar süre sakladığını açıkça belirtmez. WebAssembly teknolojisi sayesinde FFmpeg artık tarayıcıda çalışabiliyor; bu da yüklemeyi gereksiz kılıyor.</p>
<h2>İlkelerimiz</h2>${h.ul(["<strong>Gizlilik:</strong> Standart modda medya dosyaları sunucuya gönderilmez.", "<strong>Şeffaflık:</strong> Hangi teknolojiyi kullandığımızı ve nasıl test ettiğimizi <a href=\"../metodoloji/\">metodoloji</a> sayfasında açıklıyoruz.", "<strong>Doğruluk:</strong> Teknik bilgileri FFmpeg ve MDN gibi birincil kaynaklara dayandırıyoruz.", "<strong>Sorumluluk:</strong> Araç yalnızca kullanıcıya ait veya kullanım izni olan dosyalar içindir; platformlardan içerik indirme özelliği sunmuyoruz."])}
<h2>Kullandığımız açık kaynak yazılımlar</h2><p>Dönüştürme motoru <a href="https://ffmpeg.org/" rel="noopener">FFmpeg</a> ve onun WebAssembly sürümü <a href="https://github.com/ffmpegwasm/ffmpeg.wasm" rel="noopener">ffmpeg.wasm</a> üzerine kuruludur. Bu projelerin geliştiricilerine teşekkür ederiz.</p>`,
}));
pages.push(page({
  path: "nasil-calisir/", title: "Nasıl Çalışır? Tarayıcıda Video Dönüştürme", h1: "Nasıl Çalışır?", short: "Nasıl çalışır",
  desc: "mp4donusturucu.com videoları nasıl dönüştürür? WebAssembly, FFmpeg, Web Worker ve yerel işlemenin adım adım açıklaması.",
  body: `<p class="answer">mp4donusturucu.com, FFmpeg'in WebAssembly'ye derlenmiş sürümünü (ffmpeg.wasm) tarayıcınızda bir Web Worker içinde çalıştırır. Seçtiğiniz dosya tarayıcı belleğine okunur, burada dönüştürülür ve sonuç doğrudan cihazınıza indirilir. Hiçbir aşamada video bir sunucuya gönderilmez.</p>
<h2>Adım adım</h2>${h.steps(["<strong>Motor yükleme:</strong> Dosya seçtiğinizde yaklaşık 31 MB'lık FFmpeg motoru sitemizden indirilir ve tarayıcı önbelleğine alınır. Bu, yalnızca programın kendisidir; sizin verinizi içermez.", "<strong>Yerel işleme:</strong> Dosya tarayıcının bellekteki sanal dosya sistemine yazılır. FFmpeg, seçtiğiniz ayarlara göre bir komut oluşturur ve ayrı bir iş parçacığında (Web Worker) çalıştırır; sayfa donmaz.", "<strong>Sonuç:</strong> Çıktı, tarayıcıda geçici bir bağlantı (blob URL) olarak sunulur. İndirdiğinizde dosya doğrudan cihazınıza kaydedilir."])}
<h2>Kendiniz doğrulayın</h2><p>Tarayıcınızın geliştirici araçlarında Ağ (Network) sekmesini açın ve bir dönüştürme yapın. Motor dosyaları dışında hiçbir yükleme isteği görmeyeceksiniz. Hatta motor yüklendikten sonra internet bağlantınızı kesip dönüştürme yapabilirsiniz.</p>
<h2>Sınırlamalar</h2>${h.ul(["Tarayıcı içi işlem tek iş parçacığında çalışır; masaüstü FFmpeg'den daha yavaştır.", "Bellek sınırı nedeniyle 2 GB üzeri dosyalar desteklenmez; 500 MB üzeri dosyalar cihaza göre sorun çıkarabilir.", "AV1 kod çözme ve kodlama bu sürümde mevcut değildir.", "DRM korumalı dosyalar dönüştürülemez."])}`,
  related: ["metodoloji/", "guvenlik/", "gizlilik/", ""],
  sources: S("wasm", "ffGeneral"),
}));
pages.push(page({
  path: "metodoloji/", title: "Metodoloji ve Test Yöntemimiz", h1: "Metodoloji: Nasıl Test Ediyoruz?", short: "Metodoloji",
  desc: "Dönüştürme ayarlarımızı ve rehberlerdeki teknik bilgileri nasıl belirlediğimiz, hangi kaynakları kullandığımız ve nasıl test ettiğimiz.",
  body: `<p class="answer">Araçlardaki varsayılan ayarlar ve rehberlerdeki teknik bilgiler FFmpeg'in resmî belgelerine, FFmpeg wiki kodlama rehberlerine ve MDN Web Docs'a dayanır. Kesin olmayan veya platforma göre değişen bilgileri (ör. sosyal medya sınırları) açıkça belirtir ve resmî kaynağa yönlendiririz.</p>
<h2>Ayarların kaynağı</h2>${h.table(["Ayar", "Değer", "Dayanak"], [["H.264 Dengeli", "CRF 24, preset veryfast", "FFmpeg H.264 rehberi: CRF 17-28 makul aralık, varsayılan 23"], ["H.265 Dengeli", "CRF 28", "FFmpeg H.265 rehberi: varsayılan 28"], ["VP9 Dengeli", "CRF 34, b:v 0", "FFmpeg VP9 rehberi: sabit kalite modu"], ["Piksel formatı", "yuv420p", "Geniş oynatıcı uyumluluğu"], ["MP4 faststart", "Açık", "Web'de anında oynatma"], ["Hedef boyut payı", "%6", "Kapsayıcı ek yükü ve bit hızı dalgalanması"]])}
<h2>Yapılan testler</h2><p>Aşağıdaki testler yayındaki sitede, Windows üzerinde güncel Chrome ile 28 Ekim 2026'da yapılmıştır. Kaynak dosya, MDN'nin CC0 lisanslı örnek videosudur (5 saniye, 960×540, VP8 video + Vorbis ses, WebM, 0,53 MB).</p>
${h.table(["Çıktı", "Ayar", "Sonuç boyutu", "Süre"], [["MP4 (H.264 + AAC)", "Dengeli, orijinal çözünürlük", "0,27 MB (-%49)", "47,0 sn"], ["MP3", "Dengeli (192 kbps)", "0,12 MB", "0,8 sn"], ["GIF", "360 px, 12 FPS", "1,22 MB (+%130)", "9,4 sn"]])}
<p>Süreler motor yüklendikten sonraki kodlama süresidir ve cihaza göre değişir. Diğer çıktı formatları (WebM, MOV, MKV, AVI, M4A, WAV, OGG) ile Edge, Firefox ve Safari tarayıcıları henüz bu şekilde belgelenmiş bir testten geçmemiştir; testler tamamlandıkça bu tablo güncellenecektir. Tahmini çıktı boyutu yaklaşık bir değerdir ve gerçek boyuttan farklı olabilir.</p>
<h2>Düzeltme politikası</h2><p>Bir hata fark ederseniz <a href="../iletisim/">iletişim</a> sayfasından bildirin. Doğrulanan düzeltmeleri ilgili sayfada güncelleme tarihiyle yayımlarız.</p>`,
  sources: S("x264", "x265", "vp9", "mdnFormats"),
}));
pages.push(page({
  path: "guvenlik/", title: "Güvenlik", h1: "Güvenlik", short: "Güvenlik",
  desc: "mp4donusturucu.com güvenlik yaklaşımı: yerel işleme, HTTPS, veri minimizasyonu, üçüncü taraf betikler ve güvenlik bildirimi.",
  body: `<p class="answer">En güvenli veri, hiç toplanmayan veridir. Videolarınız tarayıcınızda işlendiği için sunucularımızda saklanacak, sızdırılabilecek veya yanlışlıkla paylaşılabilecek bir medya dosyası bulunmaz.</p>
<h2>Önlemler</h2>${h.ul(["Tüm sayfalar HTTPS ile sunulur.", "Dönüştürme motoru sitemizden (aynı kaynaktan) yüklenir; üçüncü taraf CDN'ye bağımlı değildir.", "Bu sürümde analiz, reklam veya izleme betiği bulunmaz.", "Dosya adları ve medya içeriği hiçbir sunucuya gönderilmez.", "Kullanılan açık kaynak bileşenler sürüm sabitlenerek dağıtılır."])}
<h2>Güvenlik açığı bildirimi</h2><p>Bir güvenlik sorunu fark ederseniz lütfen <a href="../iletisim/">iletişim</a> sayfasındaki adrese "Güvenlik" konusuyla yazın. Bildirimleri öncelikli olarak inceleriz.</p>`,
}));
pages.push(page({
  path: "gizlilik/", key: "privacy", title: "Gizlilik Politikası", h1: "Gizlilik Politikası", short: "Gizlilik",
  desc: "mp4donusturucu.com gizlilik politikası: videolarınız yüklenmez, saklanmaz. Hangi verilerin işlendiği ve haklarınız.",
  body: `<p class="updated">Son güncelleme: 28 Ekim 2026</p>
<p class="answer">Video ve ses dosyalarınız tarayıcınızda işlenir; sunucularımıza gönderilmez, saklanmaz ve üçüncü taraflarla paylaşılmaz. Bu sürümde analiz, reklam veya izleme çerezi kullanılmamaktadır.</p>
<h2>1. İşlenen veriler</h2>${h.ul(["<strong>Medya dosyaları:</strong> Yalnızca cihazınızda, tarayıcı belleğinde işlenir. Biz erişemeyiz.", "<strong>Teknik sunucu kayıtları:</strong> Siteyi barındıran altyapı sağlayıcısı, hizmetin güvenli sunulması için IP adresi, tarayıcı bilgisi ve istenen sayfa gibi standart erişim kayıtlarını kısa süreli tutabilir.", "<strong>İletişim:</strong> Bize e-posta gönderirseniz, yalnızca yanıt vermek için e-posta adresiniz ve mesajınız işlenir."])}
<h2>2. Çerezler ve yerel depolama</h2><p>Bu sürümde çerez kullanılmaz. Tarayıcınız, dönüştürme motorunu standart HTTP önbelleğinde saklayabilir; bu, kişisel veri içermez. Ayrıntılar: <a href="../cerezler/">Çerez Politikası</a>.</p>
<h2>3. Gelecekteki değişiklikler</h2><p>Reklam veya analiz araçları eklenirse, zorunlu olmayan çerezler yalnızca açık rızanızla etkinleştirilir ve bu politika güncellenir.</p>
<h2>4. Haklarınız</h2><p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki haklarınız için <a href="../kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a>'ne bakın.</p>`,
}));
pages.push(page({
  path: "cerezler/", title: "Çerez Politikası", h1: "Çerez Politikası", short: "Çerezler",
  desc: "mp4donusturucu.com çerez politikası: bu sürümde çerez kullanılmamaktadır. Gelecekteki değişikliklerde açık rıza alınır.",
  body: `<p class="updated">Son güncelleme: 28 Ekim 2026</p>
<p class="answer">mp4donusturucu.com bu sürümde hiçbir çerez yerleştirmez: zorunlu, analiz, reklam veya pazarlama çerezi yoktur.</p>
<h2>Önbellek ve çerez farkı</h2><p>Tarayıcınız sayfaları ve dönüştürme motorunu hızlı yüklemek için önbelleğe alabilir. Önbellek kişisel veri içermez ve tarayıcı ayarlarınızdan temizlenebilir.</p>
<h2>Gelecekteki kullanım</h2><p>Analiz veya reklam hizmetleri eklenirse, KVKK Kurulu'nun çerez uygulamalarına ilişkin kararları ve rehberleri doğrultusunda zorunlu olmayan çerezler için önceden açık rıza alınacak; "Kabul et" ve "Reddet" seçenekleri eşit görünürlükte sunulacaktır.</p>`,
  sources: [SRC.kvkk],
}));
pages.push(page({
  path: "kvkk-aydinlatma-metni/", title: "KVKK Aydınlatma Metni", h1: "KVKK Aydınlatma Metni", short: "KVKK Aydınlatma Metni",
  desc: "6698 sayılı KVKK kapsamında mp4donusturucu.com aydınlatma metni: işlenen veriler, amaçlar, hukuki sebepler ve haklarınız.",
  body: `<p class="updated">Son güncelleme: 28 Ekim 2026</p>
<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, mp4donusturucu.com internet sitesini işleten veri sorumlusu tarafından hazırlanmıştır.</p>
<h2>1. Medya dosyaları</h2><p>Dönüştürmek için seçtiğiniz video ve ses dosyaları cihazınızdaki tarayıcıda işlenir ve veri sorumlusuna aktarılmaz. Bu nedenle bu dosyalar bakımından veri sorumlusu tarafından bir kişisel veri işleme faaliyeti yürütülmez.</p>
<h2>2. İşlenen kişisel veriler, amaç ve hukuki sebep</h2>${h.table(["Veri", "Amaç", "Hukuki sebep (KVKK m.5)"], [["IP adresi, tarayıcı ve erişim kayıtları (barındırma altyapısında)", "Bilgi güvenliği, hizmetin sunulması", "Meşru menfaat (m.5/2-f), hukuki yükümlülük (m.5/2-ç)"], ["E-posta adresi ve mesaj içeriği (iletişime geçerseniz)", "Taleplerin yanıtlanması", "Bir hakkın tesisi (m.5/2-e), meşru menfaat (m.5/2-f)"]])}
<h2>3. Aktarım</h2><p>Erişim kayıtları, sitenin barındırıldığı altyapı sağlayıcısı tarafından işlenebilir; bu sağlayıcı yurt dışında bulunabilir. Aktarım KVKK'nın 9. maddesine uygun şekilde yapılır.</p>
<h2>4. Haklarınız (KVKK m.11)</h2>${h.ul(["Kişisel verilerinizin işlenip işlenmediğini öğrenme", "İşlenmişse buna ilişkin bilgi talep etme", "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme", "Aktarıldığı üçüncü kişileri bilme", "Eksik veya yanlış işlenmişse düzeltilmesini isteme", "Silinmesini veya yok edilmesini isteme", "İşlemenin otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme", "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme"])}
<p>Başvurularınızı <a href="../iletisim/">iletişim</a> sayfasındaki e-posta adresine iletebilirsiniz.</p>`,
  sources: [SRC.kvkk],
}));
pages.push(page({
  path: "kullanim-sartlari/", key: "terms", title: "Kullanım Şartları", h1: "Kullanım Şartları", short: "Kullanım şartları",
  desc: "mp4donusturucu.com kullanım şartları: hizmetin kapsamı, kullanıcı sorumlulukları, telif hakları ve sorumluluk sınırlaması.",
  body: `<p class="updated">Son güncelleme: 28 Ekim 2026</p>
<h2>1. Hizmet</h2><p>mp4donusturucu.com, video ve ses dosyalarını kullanıcının tarayıcısında dönüştüren ücretsiz bir araçtır. Hizmet "olduğu gibi" sunulur; kesintisiz veya hatasız çalışacağı garanti edilmez.</p>
<h2>2. Kullanıcının sorumlulukları</h2>${h.ul(["Yalnızca sahibi olduğunuz veya kullanım izniniz bulunan dosyaları dönüştürmelisiniz.", "DRM veya diğer teknik koruma önlemlerini aşmak için hizmeti kullanamazsınız.", "Dönüştürdüğünüz içeriklerin hukuka uygunluğundan siz sorumlusunuz."])}
<h2>3. Sorumluluğun sınırlandırılması</h2><p>Dönüştürme işlemi cihazınızda gerçekleştiği için orijinal dosyanız değiştirilmez. Yine de önemli dosyalarınızın yedeğini almanızı öneririz. Yürürlükteki mevzuatın izin verdiği ölçüde, hizmetin kullanımından doğan dolaylı zararlardan sorumlu tutulamayız.</p>
<h2>4. Açık kaynak lisansları</h2><p>Dönüştürme motoru FFmpeg (GPL) ve ffmpeg.wasm (MIT) bileşenlerini içerir. İlgili lisanslar bu bileşenlerin kaynak depolarında yer alır.</p>
<h2>5. Değişiklikler</h2><p>Bu şartlar güncellenebilir; güncel sürüm her zaman bu sayfada yayımlanır.</p>`,
}));
pages.push(page({
  path: "telif-hakki/", title: "Telif Hakkı Politikası ve İhlal Bildirimi", h1: "Telif Hakkı Politikası", short: "Telif hakkı",
  desc: "mp4donusturucu.com telif hakkı politikası: yalnızca yetkili dosyaların dönüştürülmesi, indirme aracı olmadığımız ve ihlal bildirimi.",
  body: `<p class="answer">mp4donusturucu.com bir içerik indirme aracı değildir. YouTube, Instagram, TikTok veya başka bir platformdan video indirme özelliği sunmaz ve bunu teşvik etmez. Araç yalnızca kullanıcının kendi cihazındaki, sahibi olduğu veya kullanma izni bulunan dosyalar içindir.</p>
<h2>Teknik koruma önlemleri</h2><p>DRM ile korunan dosyalar dönüştürülemez. Bu tür korumaları aşmaya yönelik bir özellik sunmayız ve sunmayacağız.</p>
<h2>İhlal bildirimi</h2><p>Sitemizdeki bir içeriğin (metin, görsel) hakkınızı ihlal ettiğini düşünüyorsanız <a href="../iletisim/">iletişim</a> adresine şu bilgilerle yazın: hak sahibinin adı, ihlal edildiği düşünülen eser, sitemizdeki ilgili sayfanın adresi ve iletişim bilgileriniz. Kullanıcıların kendi cihazlarında dönüştürdüğü dosyalar sunucularımızda bulunmadığından bu dosyalara erişimimiz yoktur.</p>
<h2>Özgür lisanslı içerikler</h2><p>Rehberlerde Wikimedia Commons gibi kaynaklardan görsel kullanılması durumunda yazar, lisans ve kaynak bağlantısı görselle birlikte belirtilir.</p>`,
}));
pages.push(page({
  path: "iletisim/", key: "contact", title: "İletişim", h1: "İletişim", short: "İletişim",
  desc: "mp4donusturucu.com ile iletişime geçin: hata bildirimi, öneri, KVKK başvurusu, güvenlik ve telif hakkı bildirimleri.",
  body: `<p>Sorularınız, hata bildirimleriniz ve önerileriniz için bize e-posta ile ulaşabilirsiniz:</p>
<p class="answer"><a href="mailto:iletisim@mp4donusturucu.com">iletisim@mp4donusturucu.com</a></p>
<h2>Konu başlıkları</h2>${h.table(["Konu", "E-posta konu satırı"], [["Hata bildirimi", "Hata: [sayfa veya format]"], ["KVKK başvurusu", "KVKK Başvurusu"], ["Güvenlik açığı", "Güvenlik"], ["Telif hakkı bildirimi", "Telif"], ["İş birliği / API", "İş birliği"]])}
<p>Lütfen e-postanıza video dosyası eklemeyin. Bir dönüştürme sorununu bildirirken dosyanın formatını, codec'ini (araçta görünen bilgiler), boyutunu ve kullandığınız tarayıcıyı yazmanız yeterlidir.</p>`,
}));
pages.push({
  lang: "tr", path: "404.html", type: "page", noindex: true, title: "Sayfa bulunamadı | mp4donusturucu", h1: "Sayfa bulunamadı",
  desc: "Aradığınız sayfa bulunamadı.", short: "404",
  body: `<p class="answer">Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Aşağıdaki araçlardan birini deneyin.</p>`,
  related: ["", "video-sikistirma/", "mov-mp4-donusturucu/", "mp4-mp3-donusturucu/", "formatlar/", "en/", "fr/"],
});

export default pages;
