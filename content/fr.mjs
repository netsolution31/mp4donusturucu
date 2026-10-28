// French pages (/fr/)
import { h, SRC } from "./ui.mjs";

const P = (t) => `${t} | mp4donusturucu`;
const S = (...k) => k.map((x) => SRC[x]);
const steps = (src, dst) => h.steps([
  `<strong>Choisissez le fichier.</strong> Déposez votre vidéo${src ? " " + src : ""} ou touchez la zone pour la sélectionner. Format, résolution et durée sont détectés automatiquement.`,
  `<strong>Vérifiez les réglages.</strong> La sortie est préréglée en ${dst}. Ajustez la qualité, la résolution et les options avancées si besoin.`,
  `<strong>Convertissez et téléchargez.</strong> Appuyez sur « Convertir », vérifiez l'aperçu puis enregistrez le fichier.`,
]);
const privacyFaq = ["Ma vidéo est-elle envoyée sur un serveur ?", "Non. La conversion s'exécute entièrement dans votre navigateur grâce à FFmpeg compilé en WebAssembly. Le fichier ne quitte jamais votre appareil et la mémoire est libérée à la fermeture de l'onglet."];
const tool = (o) => ({ lang: "fr", type: "tool", crumbs: [["Convertisseur vidéo", "fr/"]], sources: S("ffFormats", "x264", "wasm"), ...o, title: P(o.title) });
const page = (o) => ({ lang: "fr", type: "page", ...o, title: P(o.title) });

export default [
  tool({
    path: "fr/", key: "home", crumbs: undefined, home: true, title: "Convertisseur MP4 gratuit dans le navigateur, sans envoi",
    desc: "Convertisseur MP4 gratuit qui fonctionne dans votre navigateur. Convertissez MOV, MKV, AVI, WebM en MP4, GIF ou MP3. Sans envoi, sans filigrane, sans inscription.",
    h1: "Convertisseur MP4", short: "Convertisseur MP4",
    lead: "Convertissez vos vidéos dans votre navigateur. Vos fichiers restent sur votre appareil. MOV, MKV, AVI, WebM, 3GP et plus vers MP4, WebM, GIF ou MP3.",
    tool: { out: "mp4" },
    body: `<p class="answer">Un convertisseur MP4 transforme une vidéo vers le conteneur MP4, en la réencodant si nécessaire. mp4donusturucu.com réalise cette opération sur votre appareil dans les navigateurs compatibles : le fichier n'est jamais envoyé et peut être encodé en H.264, H.265 ou VP9 selon l'usage.</p>
<h2>Mode d'emploi</h2>${steps("", "MP4")}
<h2>Pourquoi ce convertisseur ?</h2>${h.table(["Point fort", "Détail"], [["Aucun envoi", "FFmpeg s'exécute dans le navigateur via WebAssembly. Votre vidéo n'est jamais transmise à un serveur."], ["Vrai FFmpeg", "Moteur de référence : H.264, H.265, VP9, AAC, Opus, MP3."], ["Contrôle complet", "Qualité, résolution, codec, IPS, découpe, recadrage, rotation, son et taille cible."], ["Gratuit, sans filigrane", "Sans compte, sans logo ajouté."]])}
<h2>Formats pris en charge</h2><p><strong>Entrée :</strong> <span class="mono">MP4, MOV, MKV, AVI, WebM, MPEG, MPG, M4V, 3GP, FLV, TS, MTS, M2TS, OGV, GIF</span><br><strong>Sortie :</strong> <span class="mono">MP4, WebM, MOV, MKV, AVI, GIF, MP3, M4A, WAV, OGG</span></p>
<h2>Qu'est-ce que le MP4 ?</h2><p>Le MP4 (MPEG-4 Part 14, ISO/IEC 14496-14) est un conteneur qui regroupe vidéo, audio et sous-titres dans un seul fichier. Il contient généralement de la vidéo H.264 et de l'audio AAC, la combinaison la mieux prise en charge par les téléphones, ordinateurs, téléviseurs connectés et navigateurs.</p>`,
    faq: [privacyFaq, ["Est-ce gratuit ?", "Oui. Tous les outils sont gratuits, sans compte et sans filigrane."], ["Y a-t-il une limite de taille ?", "La limite réelle est la mémoire de votre appareil. Jusqu'à environ 500 Mo, la plupart des ordinateurs s'en sortent ; au-delà de 2 Go, le navigateur ne peut pas traiter le fichier."], ["Puis-je télécharger des vidéos YouTube ou Instagram ?", "Non. Ce n'est pas un outil de téléchargement. Il convertit uniquement des fichiers présents sur votre appareil, qui vous appartiennent ou que vous êtes autorisé à utiliser."]],
    related: ["fr/compresser-video/", "fr/mov-en-mp4/", "fr/mkv-en-mp4/", "fr/mp4-en-mp3/", "fr/video-en-gif/"],
  }),
  tool({
    path: "fr/mov-en-mp4/", key: "mov", title: "Convertir MOV en MP4 gratuitement, sans envoi",
    desc: "Convertissez MOV (iPhone, QuickTime) en MP4 dans votre navigateur. HEVC vers H.264 pour Windows, Android et le web. Sans envoi ni filigrane.",
    h1: "Convertisseur MOV → MP4", short: "MOV → MP4", cardText: "Lire les vidéos iPhone partout",
    lead: "Convertissez votre vidéo MOV en MP4 dans votre navigateur. Sur les appareils compatibles, le fichier est traité localement, sans envoi.",
    tool: { out: "mp4" },
    body: `<p class="answer">Pour convertir un MOV en MP4, déposez le fichier ci-dessus puis appuyez sur « Convertir ». La vidéo est encodée en H.264 et l'audio en AAC, la combinaison la plus compatible. Cela règle le problème courant des vidéos iPhone en HEVC illisibles sous Windows, Android ou sur le web.</p>
<h2>Qu'est-ce que le MOV ?</h2><p>Le MOV est le conteneur QuickTime d'Apple. C'est le format par défaut des iPhone, iPad et Mac ; il contient en général de la vidéo H.264 ou HEVC (H.265) et de l'audio AAC. Les flux professionnels y stockent aussi du ProRes.</p>
<h2>Mode d'emploi</h2>${steps("MOV", "MP4")}
<h2>Réglages conseillés</h2>${h.table(["Objectif", "Réglages"], [["Partage courant", "MP4, Équilibrée, résolution originale"], ["Archivage ou montage", "MP4, Haute"], ["Messagerie / e-mail", "MP4, Fichier léger, 720p ou taille cible (voir <a href=\"../compresser-video/\">compresser une vidéo</a>)"]])}
<h2>Dépannage</h2>${h.ul(["<strong>Image noire, son présent :</strong> la source est probablement en HEVC. Gardez le codec H.264.", "<strong>Fichier ProRes énorme :</strong> testez d'abord un court extrait ou baissez la résolution.", "<strong>Vidéo couchée :</strong> appliquez une rotation de 90° ou 270° dans les réglages avancés."])}`,
    faq: [privacyFaq, ["La qualité baisse-t-elle ?", "Tout réencodage implique une perte théorique, mais en qualité Équilibrée ou Haute la différence est généralement invisible."]],
    related: ["fr/compresser-video/", "fr/mkv-en-mp4/", "fr/"],
  }),
  tool({
    path: "fr/mkv-en-mp4/", key: "mkv", title: "Convertir MKV en MP4 dans le navigateur, gratuit",
    desc: "Convertissez MKV en MP4 localement dans votre navigateur. Lisez vos MKV sur iPhone, TV et logiciels de montage. Sans envoi, gratuit.",
    h1: "Convertisseur MKV → MP4", short: "MKV → MP4", cardText: "Lire les fichiers Matroska sur mobile et TV",
    lead: "Convertissez vos fichiers MKV en MP4 directement dans le navigateur. Rien n'est envoyé.",
    tool: { out: "mp4" },
    body: `<p class="answer">Pour convertir un MKV en MP4, déposez le fichier ci-dessus puis appuyez sur « Convertir ». Les pistes vidéo et audio principales sont encodées en H.264 et AAC dans un MP4 lisible sur iPhone, téléviseurs, logiciels de montage et réseaux sociaux.</p>
<h2>Qu'est-ce que le MKV ?</h2><p>Le MKV (Matroska) est un conteneur ouvert capable de contenir plusieurs pistes audio, sous-titres et chapitres. Idéal pour l'archivage, il est recommandé par OBS pour l'enregistrement, mais beaucoup de téléphones, TV et logiciels ne l'ouvrent pas directement.</p>
<h2>Mode d'emploi</h2>${steps("MKV", "MP4")}
<h2>À savoir</h2>${h.ul(["Les pistes de sous-titres ne sont pas incluses dans le MP4.", "FFmpeg choisit par défaut la piste audio ayant le plus de canaux.", "L'audio DTS ou AC-3 est converti en AAC pour la compatibilité."])}`,
    faq: [privacyFaq, ["Les sous-titres sont-ils conservés ?", "Non. Seules les pistes vidéo et audio principales sont converties. Conservez les sous-titres dans un fichier SRT séparé si nécessaire."]],
    related: ["fr/mov-en-mp4/", "fr/compresser-video/", "fr/"],
  }),
  tool({
    path: "fr/mp4-en-mp3/", key: "mp4mp3", title: "Convertir MP4 en MP3 : extraire l'audio sans envoi",
    desc: "Convertissez MP4 en MP3 dans votre navigateur en 128, 192 ou 256 kbit/s. Découpez un extrait si besoin. Sans envoi, gratuit.",
    h1: "Convertisseur MP4 → MP3", short: "MP4 → MP3", cardText: "Enregistrer la piste audio en MP3",
    lead: "Extrayez l'audio de votre vidéo MP4 en fichier MP3, directement dans votre navigateur.",
    tool: { out: "mp3" },
    body: `<p class="answer">Pour convertir un MP4 en MP3, déposez votre vidéo ci-dessus : la sortie est préréglée en MP3 à 192 kbit/s. Seule la piste audio est conservée. Choisissez Fichier léger (128 kbit/s) pour la voix ou Haute (256 kbit/s) pour la musique.</p>
<h2>Mode d'emploi</h2>${steps("MP4", "MP3")}
${h.table(["Qualité", "Débit", "Taille par minute"], [["Fichier léger", "128 kbit/s", "~0,94 Mo"], ["Équilibrée", "192 kbit/s", "~1,4 Mo"], ["Haute", "256 kbit/s", "~1,9 Mo"]])}
<p>Ne convertissez que des enregistrements qui vous appartiennent ou que vous êtes autorisé à utiliser.</p>`,
    faq: [privacyFaq, ["Puis-je convertir seulement une partie ?", "Oui. Saisissez le début et la fin en secondes dans les réglages avancés."]],
    related: ["fr/video-en-gif/", "fr/", "fr/compresser-video/"],
  }),
  tool({
    path: "fr/compresser-video/", key: "compress", crumbs: [], title: "Compresser une vidéo en ligne sans l'envoyer",
    desc: "Compressez une vidéo dans votre navigateur : taille cible en Mo, qualité, résolution et H.265. Aucun envoi. Gratuit, sans filigrane.",
    h1: "Compresser une vidéo", short: "Compresser une vidéo", cardText: "Réduire le poids en gardant la qualité",
    lead: "Allégez votre vidéo en préservant la qualité. Besoin d'une taille précise ? Indiquez une cible en Mo.",
    tool: { out: "mp4", quality: "small", adv: "1" },
    body: `<p class="answer">Les trois leviers les plus efficaces pour compresser une vidéo sont : baisser le débit (CRF ou taille cible), baisser la résolution (par exemple 1080p vers 720p) et utiliser un codec plus efficace (H.264 vers H.265). Cet outil applique les trois dans votre navigateur, sans envoyer le fichier.</p>
<h2>Mode d'emploi</h2>${steps("", "MP4 compressé")}
${h.table(["Méthode", "Effet typique", "Impact visuel"], [["Équilibrée → Fichier léger", "Débit environ divisé par deux", "Léger adoucissement en mouvement"], ["1080p → 720p", "56 % de pixels en moins", "Souvent invisible sur mobile"], ["H.264 → H.265", "Nettement plus léger à qualité égale", "Lecture parfois impossible sur appareils anciens"], ["Supprimer le son", "128 kbit/s économisés", "Plus de son"]])}
<h2>Compresser vers une taille cible</h2><p>Saisissez une valeur dans <strong>Taille cible (Mo)</strong>. L'outil calcule <code>débit vidéo = Mo × 8192 × 0,94 ÷ durée − débit audio</code>. La marge de 6 % couvre la surcharge du conteneur et les variations de débit. Les vidéos iPhone en HEVC sont souvent déjà efficaces ; si elles ne se lisent pas ailleurs, utilisez plutôt le <a href="../mov-en-mp4/">convertisseur MOV en MP4</a>.</p>`,
    faq: [privacyFaq, ["Pourquoi mon fichier compressé est-il plus gros ?", "Si la source a déjà un débit faible ou utilise H.265, la réencoder en H.264 peut l'alourdir. Choisissez Fichier léger, H.265 ou une taille cible."]],
    related: ["fr/", "fr/mov-en-mp4/", "fr/video-en-gif/"],
    sources: S("x264", "x265"),
  }),
  tool({
    path: "fr/video-en-gif/", key: "gif", title: "Convertir une vidéo en GIF de qualité, sans envoi",
    desc: "Créez un GIF à partir d'une vidéo dans votre navigateur. Début, fin, largeur et IPS au choix. Palette dédiée pour des GIF plus nets.",
    h1: "Convertisseur vidéo → GIF", short: "Vidéo → GIF", cardText: "Transformer un extrait en GIF animé",
    lead: "Transformez le meilleur moment de votre vidéo en GIF court. Une palette de couleurs est générée pour chaque extrait.",
    tool: { out: "gif", res: "480", fps: "12", adv: "1" },
    body: `<p class="answer">Pour créer un GIF, choisissez votre vidéo, indiquez le début et la fin en secondes dans les réglages avancés puis appuyez sur « Convertir ». Pour un bon résultat : extraits de 2 à 6 secondes, 480 px de large et 12 IPS. L'outil utilise la méthode de palette en deux passes de FFmpeg.</p>
<h2>Mode d'emploi</h2>${steps("", "GIF")}
${h.table(["Réglage", "Effet", "Conseil"], [["Durée", "Taille proportionnelle", "2 à 6 s"], ["Largeur", "Nombre de pixels au carré", "360 à 480 px"], ["IPS", "Nombre d'images", "10 à 15"]])}`,
    faq: [privacyFaq, ["Que devient le son ?", "Le GIF ne gère pas l'audio : la piste son est supprimée."]],
    related: ["fr/", "fr/compresser-video/", "fr/mp4-en-mp3/"],
  }),
  page({
    path: "fr/a-propos/", key: "about", title: "À propos", h1: "À propos de mp4donusturucu.com", short: "À propos",
    desc: "mp4donusturucu.com est un convertisseur vidéo qui fonctionne dans le navigateur, pensé pour la confidentialité. Nos principes et logiciels libres utilisés.",
    body: `<p class="answer">mp4donusturucu.com est un outil gratuit qui convertit et compresse les vidéos directement dans votre navigateur. Principe fondateur : votre fichier ne doit jamais quitter votre appareil.</p>
<h2>Principes</h2>${h.ul(["<strong>Confidentialité :</strong> en mode standard, aucun fichier média n'est envoyé à un serveur.", "<strong>Exactitude :</strong> les contenus techniques s'appuient sur des sources primaires (documentation FFmpeg, MDN).", "<strong>Responsabilité :</strong> l'outil est réservé aux fichiers qui vous appartiennent ou que vous pouvez utiliser. Aucun téléchargement depuis des plateformes tierces."])}
<h2>Fonctionnement et vérification</h2><p>Lorsque vous choisissez un fichier, le moteur FFmpeg (environ 31 Mo, compilé en WebAssembly) est téléchargé depuis ce site puis mis en cache. Votre fichier est lu dans la mémoire du navigateur, converti dans un Web Worker et proposé en téléchargement local. Pour le vérifier, ouvrez les outils de développement du navigateur, onglet Réseau, et lancez une conversion : en dehors des fichiers du moteur, aucune requête d'envoi n'apparaît.</p>
<h2>Logiciels libres</h2><p>Basé sur <a href="https://ffmpeg.org/" rel="noopener">FFmpeg</a> et <a href="https://github.com/ffmpegwasm/ffmpeg.wasm" rel="noopener">ffmpeg.wasm</a>.</p>`,
  }),
  page({
    path: "fr/confidentialite/", key: "privacy", title: "Politique de confidentialité", h1: "Politique de confidentialité", short: "Confidentialité",
    desc: "Politique de confidentialité de mp4donusturucu.com : vos vidéos sont traitées localement, jamais envoyées ni stockées. Aucun cookie dans cette version.",
    body: `<p class="updated">Dernière mise à jour : 28 octobre 2026</p>
<p class="answer">Vos fichiers vidéo et audio sont traités dans votre navigateur. Ils ne sont ni envoyés à nos serveurs, ni stockés, ni partagés. Cette version n'utilise aucun cookie de mesure d'audience, de publicité ou de suivi.</p>
<h2>Données susceptibles d'être traitées</h2>${h.ul(["<strong>Fichiers média :</strong> traités uniquement sur votre appareil ; nous n'y avons pas accès.", "<strong>Journaux serveur :</strong> l'hébergeur peut conserver brièvement des journaux d'accès standard (adresse IP, navigateur, page demandée) pour la sécurité.", "<strong>E-mail :</strong> si vous nous écrivez, votre adresse et votre message servent uniquement à vous répondre."])}
<h2>Évolutions</h2><p>Si une mesure d'audience ou de la publicité est ajoutée, les cookies non essentiels ne seront activés qu'avec votre consentement explicite et cette politique sera mise à jour.</p>`,
  }),
  page({
    path: "fr/conditions/", key: "terms", title: "Conditions d'utilisation", h1: "Conditions d'utilisation", short: "Conditions",
    desc: "Conditions d'utilisation de mp4donusturucu.com : périmètre du service, responsabilités de l'utilisateur, droit d'auteur, limitation de responsabilité.",
    body: `<p class="updated">Dernière mise à jour : 28 octobre 2026</p>
${h.ul(["Le service est fourni « en l'état », sans garantie de fonctionnement ininterrompu ou exempt d'erreurs.", "Convertissez uniquement des fichiers qui vous appartiennent ou que vous êtes autorisé à utiliser.", "N'utilisez pas le service pour contourner des DRM ou d'autres mesures techniques de protection.", "Votre fichier original n'est jamais modifié, mais conservez des sauvegardes de vos fichiers importants.", "Le moteur inclut des composants FFmpeg (GPL) et ffmpeg.wasm (MIT) soumis à leurs licences respectives."])}`,
  }),
  page({
    path: "fr/contact/", key: "contact", title: "Nous contacter", h1: "Contact", short: "Contact",
    desc: "Contactez mp4donusturucu.com : signalement de bug, suggestion, demande liée aux données personnelles, sécurité, droit d'auteur.",
    body: `<p class="answer"><a href="mailto:iletisim@mp4donusturucu.com">iletisim@mp4donusturucu.com</a></p>
<p>Merci de ne pas joindre de fichiers vidéo. Pour signaler un problème, indiquez le format, le codec (affiché par l'outil), la taille du fichier et votre navigateur.</p>`,
  }),
];
