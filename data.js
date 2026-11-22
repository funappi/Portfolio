/* Contenu du portfolio : modifie ce fichier pour changer les textes, liens ou couleurs. */
window.SITE = {
  name: "funappi",
  github: "https://github.com/orgs/funappi/repositories",
  email: "", // ajoute ton adresse ici pour l'afficher dans le contact
  linkedin: "" // idem
};

window.UI = {
  fr: {
    intro: "Onze applis que j'ai conçues et codées. Choisis-en une pour entrer dans son univers.",
    skip: "Passer l'intro",
    all: "Toutes les applis",
    prev: "Appli précédente",
    next: "Appli suivante",
    open: "Ouvrir l'appli",
    code: "Voir le code",
    demo: "Voir la démo",
    gallery: "Captures d'écran",
    challenge: "Le défi",
    stack: "Construit avec",
    soonVideo: "Vidéo en préparation",
    preview: "Aperçu en images, la vidéo arrive bientôt",
    soonText: "Ce projet arrive bientôt sur GitHub.",
    contact: "Contact",
    contactLine: "Une idée, une question, une appli à faire ? Écris-moi.",
    made: "Made by Funappi",
    effects: "Effets",
    max: "Max",
    lite: "Léger",
    close: "Fermer",
    playDemo: "Lire la démo",
    enter: "Entrer",
    status: { live: "En ligne", wip: "En cours" },
    lang: "English",
    sortBy: "Trier les applis",
    sorts: { pick: ["Sélection", "Sélection"], effort: ["Plus chronophage", "Plus simple"], start: ["Plus récent", "Plus ancien"], useful: ["Plus utile", "Plus niche"] },
    flip: "Cliquer à nouveau pour inverser",
    metric: { effort: "Effort", useful: "Utilité" }
  },
  en: {
    intro: "Eleven apps I designed and built. Pick one to step into its world.",
    skip: "Skip intro",
    all: "All apps",
    prev: "Previous app",
    next: "Next app",
    open: "Open the app",
    code: "View the code",
    demo: "Watch the demo",
    gallery: "Screenshots",
    challenge: "The challenge",
    stack: "Built with",
    soonVideo: "Video in the works",
    preview: "Image preview, the video is coming soon",
    soonText: "This project is coming to GitHub soon.",
    contact: "Contact",
    contactLine: "An idea, a question, an app to build? Get in touch.",
    made: "Made by Funappi",
    effects: "Effects",
    max: "Max",
    lite: "Light",
    close: "Close",
    playDemo: "Play the demo",
    enter: "Open",
    status: { live: "Live", wip: "In progress" },
    lang: "Français",
    sortBy: "Sort the apps",
    sorts: { pick: ["Featured", "Featured"], effort: ["Most time-consuming", "Simplest"], start: ["Newest", "Oldest"], useful: ["Most useful", "Most niche"] },
    flip: "Click again to reverse",
    metric: { effort: "Effort", useful: "Usefulness" }
  }
};

/* Spécificités affichées en pastilles */
window.PILLS = {
  offline: { fr: "Fonctionne hors ligne", en: "Works offline" },
  install: { fr: "Installable", en: "Installable" },
  ai: { fr: "IA intégrée, avec ta clé", en: "Built-in AI, your own key" },
  noaccount: { fr: "Sans compte", en: "No account" },
  local: { fr: "Données sur l'appareil", en: "Data stays on device" },
  multi: { fr: "Multijoueur", en: "Multiplayer" },
  motion: { fr: "Se joue au gyroscope", en: "Motion controls" },
  extension: { fr: "Extension Chrome", en: "Chrome extension" },
  voice: { fr: "Alertes vocales", en: "Voice alerts" },
  auto: { fr: "Mise à jour chaque nuit", en: "Updates every night" },
  free: { fr: "Gratuit", en: "Free" },
  export: { fr: "Export Excel", en: "Excel export" },
  sync: { fr: "Synchro entre appareils", en: "Syncs across devices" }
};

window.PLATFORMS = {
  tablet: { fr: "Tablette", en: "Tablet" },
  phone: { fr: "Téléphone", en: "Phone" },
  desktop: { fr: "Ordinateur", en: "Desktop" },
  browser: { fr: "Navigateur", en: "Browser" }
};

/* effort : temps passé, de 1 (rapide) à 10 (très chronophage)
   start : date de début du projet (premier commit, ou estimation pour les projets hors GitHub)
   useful : utilité pour le grand public, de 1 (niche) à 10 (utile à tout le monde)
   size : taille de la case dans la grille d'accueil (big = 2x2, wide = 2x1, tall = 1x2, sm = 1x1)
   colors : [fond profond, couleur principale, couleur 2, couleur 3] pour le bokeh et l'univers
   floats : captures qui flottent autour de la carte vidéo (numéros dans media/<id>/shots) */
window.APPS = [
  {
    id: "fourtimer", effort: 6, start: "2026-11-20", useful: 5, name: "FourTimer", size: "big", repo: "FourTime",
    live: "https://funappi.github.io/FourTime/", status: "live", media: "real",
    colors: ["#1a0d05", "#ff7a1a", "#ff3b3b", "#38e0a4"],
    platforms: ["tablet", "phone"], pills: ["offline", "install", "voice"],
    tech: ["HTML", "CSS", "JavaScript", "PWA", "Service Worker"], license: "PolyForm NC",
    floats: [2, 3, 6, 7],
    tagline: { fr: "Le multi-minuteur des fours de restaurant", en: "A multi-timer for restaurant ovens" },
    desc: {
      fr: "Les fours de la cuisine s'affichent niveau par niveau. On glisse un plat sur une place libre et son minuteur démarre : temps restant, carte rouge, bip et voix quand c'est prêt. Pensé pour une tablette posée en cuisine, même avec des gants.",
      en: "The kitchen's ovens appear shelf by shelf. Drag a dish onto a free spot and its timer starts: time left, a red card, a beep and a voice when it's done. Built for a tablet in the kitchen, even with gloves on."
    },
    challenge: {
      fr: "Des minuteurs calés sur l'heure réelle, qui restent justes même si la tablette ferme l'appli en plein service.",
      en: "Timers tied to the real clock, so they stay right even if the tablet closes the app mid-service."
    }
  },
  {
    id: "volt", effort: 10, start: "2026-10-29", useful: 7, name: "VOLT Athlete", size: "tall", repo: "Liftrack",
    live: "https://funappi.github.io/Liftrack/", status: "live", media: "preview",
    colors: ["#14051c", "#e040fb", "#ff4fa3", "#ff9d42"],
    platforms: ["phone"], pills: ["offline", "install", "noaccount"],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "PWA"], license: "PolyForm NC",
    floats: [1, 3, 4],
    tagline: { fr: "Ton suivi de musculation dans la poche", en: "Your strength training log, in your pocket" },
    desc: {
      fr: "Crée tes séances, lance-les en direct et suis ta progression : records, charges maximales, régularité et composition corporelle. Des badges et des défis aident à tenir le rythme.",
      en: "Build your workouts, run them live and track your progress: records, max loads, streaks and body composition. Badges and challenges help you keep going."
    },
    challenge: {
      fr: "Tout reste sur le téléphone, sans compte, avec une sauvegarde en un fichier pour ne jamais rien perdre.",
      en: "Everything stays on the phone with no account, plus a one-file backup so nothing is ever lost."
    }
  },
  {
    id: "releve", effort: 4, start: "2026-10-25", useful: 9, name: "Relevé d'heures", size: "sm", repo: "releve-dheure",
    live: "https://funappi.github.io/releve-dheure/", status: "live", media: "real",
    colors: ["#06122b", "#2f6bff", "#3cc7ff", "#c7d2fe"],
    platforms: ["desktop", "phone"], pills: ["noaccount", "local", "export"],
    tech: ["HTML", "CSS", "JavaScript"], license: "PolyForm NC",
    floats: [2, 3, 4],
    tagline: { fr: "Tes heures de travail, calculées pendant que tu tapes", en: "Your work hours, calculated as you type" },
    desc: {
      fr: "Tu notes tes horaires comme dans un bloc-notes, et le relevé du mois se calcule tout seul : durée par jour, total par semaine, heures sup, nuits, dimanches et salaire estimé en net et en brut.",
      en: "Jot down your hours like in a notepad and the month's timesheet works itself out: hours per day, weekly totals, overtime, night and Sunday rates, and estimated net and gross pay."
    },
    challenge: {
      fr: "Comprendre une saisie libre comme « lundi 19 9h30-12h10 » et compter juste les nuits qui passent minuit.",
      en: "Reading free-form input like \"Monday 19 9:30-12:10\" and counting night shifts past midnight correctly."
    }
  },
  {
    id: "fire", effort: 5, start: "2026-05-10", useful: 7, name: "FIRE Tracker", size: "sm", repo: "Fire-tracker",
    live: "https://funappi.github.io/Fire-tracker/", status: "live", media: "preview",
    colors: ["#141003", "#ffd21f", "#ff9f1a", "#3ddc84"],
    platforms: ["desktop", "phone"], pills: ["noaccount", "local"],
    tech: ["JavaScript", "Tailwind CSS", "Chart.js", "Google Charts"], license: "PolyForm NC",
    floats: [2, 3],
    tagline: { fr: "À quel âge seras-tu libre financièrement ?", en: "When could you be financially free?" },
    desc: {
      fr: "Trois outils en un : un simulateur d'indépendance financière avec scénarios pessimiste, neutre et optimiste, un suivi de budget avec diagramme de flux, et un calculateur d'intérêts composés.",
      en: "Three tools in one: a financial independence simulator with pessimistic, neutral and optimistic scenarios, a budget tracker with a flow diagram, and a compound interest calculator."
    },
    challenge: {
      fr: "Une horloge macro-économique qui ajuste inflation et croissance à partir des données de la Banque mondiale.",
      en: "A macro-economic clock that tunes inflation and growth using World Bank data."
    }
  },
  {
    id: "legourmet", effort: 9, start: "2026-06-19", useful: 9, name: "Le Gourmet", size: "big", repo: "Legourmet",
    live: "https://funappi.github.io/Legourmet/", status: "live", media: "real",
    colors: ["#1c0710", "#ff4d6d", "#ffb347", "#ff8fab"],
    platforms: ["desktop", "phone"], pills: ["ai", "install"],
    tech: ["Python", "Flask", "Groq · Llama 3.1", "SQLite", "JavaScript"], license: "PolyForm NC",
    floats: [2, 4, 5],
    tagline: { fr: "Le chef IA qui cuisine avec ce que tu as", en: "The AI chef that cooks with what you've got" },
    desc: {
      fr: "Donne tes ingrédients, ton matériel et tes envies : l'IA propose trois idées, puis décline la recette choisie en quatre versions, originale, healthy, protéinée et gourmande. Planning de la semaine et liste de courses inclus.",
      en: "Give it your ingredients, your kitchen gear and your cravings: the AI suggests three ideas, then turns the one you pick into four versions, original, healthy, high-protein and indulgent. Weekly planner and shopping list included."
    },
    challenge: {
      fr: "Une IA qui respecte la vraie cuisine : pas de four si tu n'as qu'un airfryer, jamais de lardons dans un tiramisu.",
      en: "An AI that respects a real kitchen: no oven if all you have is an air fryer, and never bacon in a tiramisu."
    }
  },
  {
    id: "codediff", effort: 5, start: "2026-11-07", useful: 6, name: "Code-diff", size: "wide", repo: "Code-diff",
    live: "https://funappi.github.io/Code-diff/", status: "live", media: "real",
    colors: ["#0a0b1c", "#8b7cf6", "#3fb950", "#f85149"],
    platforms: ["desktop"], pills: ["ai", "noaccount", "free"],
    tech: ["HTML", "JavaScript"], license: "MIT",
    floats: [2, 3],
    tagline: { fr: "Compare, corrige et fusionne ton code", en: "Compare, fix and merge your code" },
    desc: {
      fr: "Colle deux versions d'un texte ou d'un code : les différences s'affichent côte à côte, au mot ou au caractère près. Tu corriges directement dans la comparaison, tu fusionnes d'un clic, et une IA peut expliquer chaque changement.",
      en: "Paste two versions of a text or some code: differences show side by side, down to the word or character. Edit right inside the comparison, merge in one click, and let an AI explain each change."
    },
    challenge: {
      fr: "Modifier le texte directement dans la comparaison, avec ré-indentation automatique du code fusionné.",
      en: "Editing right inside the diff, with merged code re-indented automatically."
    }
  },
  {
    id: "devinedevine", effort: 5, start: "2026-11-11", useful: 6, name: "devinedevine", size: "wide", repo: "devinedevine",
    live: "https://funappi.github.io/devinedevine/", status: "live", media: "real",
    colors: ["#0d0b2e", "#ffd60a", "#22c55e", "#ff7a1a"],
    platforms: ["phone"], pills: ["offline", "motion", "multi", "free"],
    tech: ["HTML", "JavaScript"], license: "MIT",
    floats: [1, 4, 5],
    tagline: { fr: "Le jeu de soirée, téléphone sur le front", en: "The party game played with your phone on your forehead" },
    desc: {
      fr: "Pose le téléphone sur ton front : les autres te font deviner le mot. Penche vers le bas pour valider, vers le haut pour passer. Plus de 2 000 mots, mode équipes, mode adulte et QR code pour que tout le monde rejoigne.",
      en: "Put the phone on your forehead and let the others make you guess the word. Tilt down to score, up to pass. Over 2,000 words, team mode, an adult mode and a QR code so everyone can join."
    },
    challenge: {
      fr: "Lire le gyroscope sur iPhone comme sur Android pour valider d'un simple mouvement de tête.",
      en: "Reading the gyroscope on both iPhone and Android so a nod is all it takes."
    }
  },
  {
    id: "findstream", effort: 7, start: "2026-03-09", useful: 4, name: "FindStream", size: "sm", repo: "Find-Stream",
    live: "https://find-stream.netlify.app/", status: "live", media: "preview",
    colors: ["#0b0518", "#8b5cf6", "#e040fb", "#22d3ee"],
    platforms: ["desktop", "phone"], pills: ["auto", "noaccount"],
    tech: ["Python", "GitHub Actions", "Apps Script", "JavaScript"], license: "PolyForm NC",
    floats: [2],
    tagline: { fr: "L'annuaire qui vérifie chaque nuit quels sites répondent", en: "A directory that checks every night which sites are up" },
    desc: {
      fr: "Un tableau de bord qui teste chaque nuit les sites de sa liste, suit leurs changements d'adresse et remplace automatiquement ceux qui ne répondent plus. Vue grille ou liste, favoris et thème jour ou nuit.",
      en: "A dashboard that tests every site on its list each night, follows address changes and automatically replaces the ones that stop responding. Grid or list view, favourites, and a day or night theme."
    },
    challenge: {
      fr: "Un robot Python lancé chaque nuit par GitHub Actions, qui écarte les faux liens avant qu'ils n'arrivent dans la liste.",
      en: "A Python bot run nightly by GitHub Actions that weeds out junk links before they reach the list."
    }
  },
  {
    id: "autoplay", effort: 3, start: "2026-11-05", useful: 5, name: "Autoplay", size: "sm", repo: "",
    live: "", status: "wip", media: "none",
    colors: ["#120a26", "#ff3d6e", "#7c5cff", "#ffd1dc"],
    platforms: ["browser"], pills: ["extension"],
    tech: ["JavaScript", "Chrome Extensions"], license: "",
    floats: [],
    tagline: { fr: "Les épisodes s'enchaînent sans toucher à rien", en: "Episodes play back to back, hands-free" },
    desc: {
      fr: "Une extension pour Chrome, Edge et Brave qui lance la lecture et passe automatiquement à l'épisode suivant, avec une petite page d'options toute simple.",
      en: "An extension for Chrome, Edge and Brave that starts playback and moves on to the next episode automatically, with a small, simple options page."
    },
    challenge: null
  },
  {
    id: "walkman", effort: 5, start: "2026-10-18", useful: 5, name: "Walkman", size: "sm", repo: "",
    live: "", status: "wip", media: "none",
    colors: ["#0c1f1e", "#ff9a3d", "#2dd4bf", "#ffe3c4"],
    platforms: [], pills: [],
    tech: [], license: "",
    floats: [],
    tagline: { fr: "Projet en cours", en: "Work in progress" },
    desc: { fr: "", en: "" },
    challenge: null
  },
  {
    id: "boussole", effort: 8, start: "2026-10-27", useful: 8, name: "Boussole", size: "sm", repo: "",
    live: "", status: "wip", media: "none",
    colors: ["#04161c", "#2dd4bf", "#fbbf24", "#38bdf8"],
    platforms: ["phone", "desktop"], pills: ["install", "sync"],
    tech: ["PWA"], license: "",
    floats: [],
    tagline: { fr: "Ton tableau de bord, au quotidien comme en voyage", en: "Your dashboard for everyday life and travel" },
    desc: {
      fr: "Au quotidien : quand partir pour attraper ton bus selon ta position, les horaires de tes restos préférés, les sorties de tes séries et tes objectifs de l'année. En voyage : infos sur le lieu, billets et prix des trajets depuis l'aéroport.",
      en: "Day to day: when to leave to catch your bus based on where you are, your favourite restaurants' hours, new episodes of your shows and your goals for the year. On a trip: local info, your tickets and fares from the airport."
    },
    challenge: null
  }
];
