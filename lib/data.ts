/**
 * Single source of truth for all site content.
 * Components import from here; no copy is hardcoded in JSX.
 *
 * Values wrapped in [SQUARE BRACKETS] are placeholders carried over from the
 * design. Replace them with real figures and links before publishing; the
 * chatbot prompt skips them automatically (see isPlaceholder).
 */

export const isPlaceholder = (value: string) => value.trim().startsWith("[")

/** Drops a leading [PLACEHOLDER] (and a following "to") so it never shows on the site. */
export const withoutPlaceholder = (value: string) =>
  value.replace(/\[[^\]]*\]\s*(to\s+)?/g, "").trim()

export interface Profile {
  name: string
  /** Mono logo in the header, split around the accent dot. */
  handle: [string, string]
  role: string
  /** Short line under the name in the header. */
  title: string
  headline: string
  intro: string
  location: string
  email: string
  phone: { display: string; href: string }
  portrait: { src: string; alt: string }
  socials: {
    linkedin: string
    /** Leave empty until the GitHub profile URL is known. */
    github: string
    x: string
    instagram: string
    tiktok: string
    facebook: string
  }
  contact: { heading: string; note: string }
}

export const profile: Profile = {
  name: "Nadeem Mukhtar",
  handle: ["nadeem", "mukhtar"],
  role: "AI Developer · Full Stack · Pakistan",
  title: "AI Developer · Full Stack",
  headline: "AI developer building voice agents and LLM systems.",
  intro:
    "I've built the Laravel APIs behind ERP, CRM and POS products. Now I build AI call agents that answer a business's phone.",
  location: "Pakistan",
  email: "nadeemmukhtar1260@gmail.com",
  phone: { display: "+92 329 1773760", href: "tel:+923291773760" },
  portrait: {
    src: "/nadeem-mukhtar.jpg",
    alt: "Portrait of Nadeem Mukhtar in a navy suit and glasses",
  },
  socials: {
    linkedin: "https://linkedin.com/in/nadeemmukhtar",
    github: "",
    x: "https://x.com/NadeemM48721590",
    instagram: "https://www.instagram.com/nadeem_mukhtar_",
    tiktok: "https://www.tiktok.com/@ch_nadeem_6012",
    facebook: "https://www.facebook.com/share/1GUcZEXtH3/",
  },
  contact: {
    heading: "Need a voice or LLM agent built? Let's talk.",
    note: "I reply to every message, usually within a day.",
  },
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#projects" },
  { label: "Services", href: "/services" },
  { label: "Milestones", href: "/#experience" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
] as const

export interface ProjectLink {
  label: string
  /** Empty href = link not available yet. */
  href: string
}

export interface Project {
  slug: string
  category: string
  status: "Live" | "In progress"
  title: string
  problem: string
  built: string
  tech: string[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: "ai-call-agent-platform",
    category: "Voice AI",
    status: "In progress",
    title: "AI Call Agent Platform",
    problem:
      "Businesses in Pakistan need phone support, but staffed call desks and hosted voice-AI services cost too much.",
    built:
      "A call agent platform designed to serve multiple businesses, built from self-run components instead of costly paid services.",
    tech: ["LLM agents", "Speech-to-text", "Text-to-speech", "[STACK]"],
    links: [],
  },
  {
    slug: "b2b-sales-platform",
    category: "B2B sales · XDimension Solutions",
    status: "Live",
    title: "B2B sales platform",
    problem:
      "A B2B sales business needed procurement, inventory, sales, customer accounts and orders in one system, on web and mobile.",
    built:
      "REST APIs for the web and mobile apps, a multi-database architecture, the main ledger and financial reporting, and WhatsApp, SMS and push notifications.",
    tech: ["Laravel", "MySQL", "REST API", "WhatsApp", "OneSignal"],
    // Client name and link withheld under the company's policy.
    links: [],
  },
  {
    slug: "dindin-pos",
    category: "Point of sale · Innovation M Services",
    status: "Live",
    title: "DinDinPOS and DinDin web app",
    problem:
      "Restaurants needed sales, stock, billing and customer orders to run from one point-of-sale system, with online ordering on top.",
    built:
      "Backend modules for sales, inventory, billing and reporting, plus a React web app for menus, cart, delivery and pickup, and real-time order tracking.",
    tech: ["Laravel", "MySQL", "React", "REST API"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.dindin.pos",
      },
    ],
  },
  {
    slug: "myomnitechhub-crm",
    category: "CRM · Innovation M Services",
    status: "Live",
    title: "MyOmniTechHub CRM",
    problem:
      "Sales teams needed customers, leads and follow-up work tracked in one place instead of by hand.",
    built:
      "Customer management, lead tracking and workflow automation modules, plus API and database performance tuning.",
    tech: ["Laravel", "MySQL", "REST API", "Automation"],
    links: [{ label: "myomnihub.com", href: "https://myomnihub.com/" }],
  },
  {
    slug: "imflow360",
    category: "Point of sale · Innovation M Services",
    status: "Live",
    title: "IMFLOW360",
    problem: "[PROBLEM: who uses IMFLOW360 and what it replaced]",
    built: "The complete POS web app, front end and back end.",
    tech: ["POS", "Web app", "[STACK]"],
    links: [{ label: "imflow360.com", href: "https://www.imflow360.com/" }],
  },
  {
    slug: "imbeautyglow",
    category: "Innovation M Services",
    status: "Live",
    title: "iMBeautyGlow",
    problem: "[PROBLEM: what iMBeautyGlow is and who it is for]",
    built: "Both sides of the product: the front end and the back end.",
    tech: ["Front end", "Back end", "[STACK]"],
    links: [{ label: "imbeautyglow.com", href: "https://imbeautyglow.com/" }],
  },
  {
    slug: "mi-boletazo",
    category: "Event ticketing · Innovation M Services",
    status: "Live",
    title: "Mi Boletazo",
    problem:
      "A ticketing site for Latin music events, where fans browse concerts by city and buy tickets online.",
    built:
      "The backend and APIs, the admin panel for managing events and orders, and the website fans buy from.",
    tech: ["Laravel", "REST API", "Admin panel", "Web front end"],
    links: [{ label: "miboletazo.com", href: "https://www.miboletazo.com/" }],
  },
  {
    slug: "tv-jam-app",
    category: "News app · Innovation M Services",
    status: "Live",
    title: "TV Jam App",
    problem:
      "A news app where readers pick their own categories and get daily articles with video, on iPhone and Android.",
    built: "The APIs the mobile apps run on.",
    tech: ["REST API", "iOS", "Android"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/tv-jam-app/id6615075445" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.tvjam.app" },
    ],
  },
  {
    slug: "la-rola",
    category: "Radio app · Innovation M Services",
    status: "Live",
    title: "La Rola",
    problem:
      "Bustos Media's La Rola app streams its regional Mexican radio stations to listeners' phones.",
    built: "The APIs the mobile apps run on.",
    tech: ["REST API", "Audio streaming", "iOS", "Android"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/la-rola/id1471839751" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=info.bustos.larola.app.free",
      },
    ],
  },
]

export interface SkillCategory {
  category: string
  items: string[]
  /** The primary skill group gets the accent rule. */
  primary?: boolean
}

export const skills: SkillCategory[] = [
  {
    category: "AI / ML",
    primary: true,
    items: ["LLM agents", "Voice AI", "Speech-to-text", "Text-to-speech"],
  },
  {
    category: "Backend",
    items: ["PHP", "Laravel", "REST APIs", "Sanctum", "Passport", "Queues and jobs", "Cron"],
  },
  {
    category: "Data and cloud",
    items: ["MySQL", "SQL Server", "Firebase Realtime DB", "AWS"],
  },
  {
    category: "Frontend and tools",
    items: ["React", "Vue.js", "JavaScript", "Git", "Postman", "Composer"],
  },
]

export interface Experience {
  period: string
  role: string
  company: string
  summary: string
}

export const experience: Experience[] = [
  {
    period: "[YEAR] to present",
    role: "Builder, AI Call Agent Platform",
    company: "Independent",
    summary:
      "Designing and building a voice agent platform that gives businesses AI phone support.",
  },
  {
    period: "Jan 2024 to present",
    role: "Senior Software Engineer",
    company: "Innovation M Services",
    summary:
      "Built the backend for DinDinPOS and the MyOmniTechHub CRM, the complete IMFLOW360 POS web app, both sides of iMBeautyGlow, the Mi Boletazo ticketing site, and the APIs for TV Jam App and La Rola. Also built the DinDin React ordering app with real-time order tracking.",
  },
  {
    period: "Jun 2025 to present",
    role: "Full Stack Developer",
    company: "XDimension Solutions",
    summary:
      "Built a B2B sales platform's REST APIs, multi-database architecture, main ledger and financial reporting, and its WhatsApp, SMS and push messaging.",
  },
  {
    period: "Jan 2023 to Jan 2024",
    role: "PHP Developer",
    company: "Bixi Soft",
    summary:
      "Built backend APIs for emergency alerts, including a feature that sends a user's details and live location during an emergency.",
  },
]

export interface Education {
  period: string
  title: string
  school: string
  /** Short status shown as a tag, e.g. for a degree still in progress. */
  note?: string
}

export const education: Education[] = [
  {
    period: "2026 to 2028",
    title: "MSc Computer Science",
    school: "University of Engineering and Technology (UET), Lahore",
    note: "In progress · weekend programme",
  },
  { period: "2018 to 2022", title: "BS Computer Science", school: "University of Sahiwal" },
  {
    period: "2013 to 2015",
    title: "Intermediate in Computer Science (ICS)",
    school: "Superior College",
  },
]

export const languages = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
]

/** Bar heights (px, out of 72) for the hero call-trace waveform. */
export const callTrace = [
  10, 18, 30, 44, 26, 14, 36, 52, 40, 22, 12, 28, 46, 64, 34, 18, 24, 42, 30, 16, 10, 20, 38, 50,
  32, 14, 22, 36, 26, 12, 18, 10,
]

/**
 * Text inside the decorative field animations (components/field-fx.tsx).
 * The CSS timing in app/globals.css assumes five trace steps and a
 * 15-character request; change those there if these change.
 */
export const fieldFx = {
  traceSteps: ["listen", "transcribe", "reason", "act", "speak"],
  request: "GET /api/orders",
  response: "200 OK",
}

export interface Service {
  slug: string
  category: string
  title: string
  summary: string
  includes: string[]
  tech: string[]
  /** Project that shows this work, by title; omit if there is none yet. */
  proof?: string
  primary?: boolean
  /** Opening paragraph on the service's own page (/services/<slug>). */
  overview: string
  /** "What you get" blocks on the service's own page. */
  details: { title: string; body: string }[]
  /** "Good fit when" lines on the service's own page. */
  fit: string[]
  /** Slugs of the projects shown as related work on the service's own page. */
  projects: string[]
}

/** Headings and button labels on each service's own page. */
export const serviceDetailPage = {
  primaryTag: "Main focus",
  startCta: "Start a project",
  backCta: "All services",
  details: { label: "What you get", title: "What you get" },
  fit: { label: "Fit", title: "A good fit when" },
  work: { label: "Work", title: "Where I have done this" },
  proofLabel: "Seen in",
  other: { label: "More", title: "Other services" },
}

export const servicesPage = {
  label: "Services · Voice AI · LLM agents · Backend",
  heading: "What I can build for you",
  headline: "AI call agents and the backend systems that run a business.",
  /** Search-result description for the Services page (keep under 160 characters). */
  description:
    "AI call agents and the backend systems that run a business: LLM assistants, Laravel REST APIs, ERP, CRM and POS systems, web apps and integrations.",
  intro:
    "I take one problem, scope it with you, and ship working software: an agent that answers your phone, an API behind your app, or the system your team runs sales and stock on.",
}

export const services: Service[] = [
  {
    slug: "ai-call-agents",
    category: "Voice AI",
    primary: true,
    title: "AI call agents",
    summary:
      "An agent that answers your business's phone, handles the common questions and passes the rest to your staff.",
    includes: [
      "Call flows written around your real customer questions",
      "Speech-to-text, LLM and text-to-speech wired into one pipeline",
      "Self-run components where they cut the per-call cost",
    ],
    tech: ["LLM agents", "Speech-to-text", "Text-to-speech"],
    proof: "AI Call Agent Platform",
    overview:
      "A call agent picks up when your business's phone rings, answers the questions callers ask most, and passes the call to your staff when it needs a person. I build the whole pipeline: speech-to-text to hear the caller, an LLM to decide what to say, and text-to-speech to say it.",
    details: [
      {
        title: "Call flows from your real calls",
        body: "We start from the questions your customers actually ask and what your staff say back. The agent is written around those, not a generic script.",
      },
      {
        title: "One pipeline, three parts",
        body: "Speech-to-text, the LLM and text-to-speech are wired together so the caller hears one continuous conversation.",
      },
      {
        title: "Self-run where it saves money",
        body: "Hosted voice-AI services charge for every call. Where a self-run component does the job, I use it to bring the per-call cost down.",
      },
      {
        title: "Handoff to your staff",
        body: "When a caller needs something the agent should not handle, the call goes to a person.",
      },
    ],
    fit: [
      "Calls go unanswered outside working hours or when staff are busy",
      "Most callers ask the same handful of questions",
      "A staffed call desk or a hosted voice-AI service costs too much for your call volume",
    ],
    projects: ["ai-call-agent-platform"],
  },
  {
    slug: "llm-assistants",
    category: "LLM systems",
    title: "LLM agents and chat assistants",
    summary:
      "An assistant that answers from your own content, on your website or inside your product.",
    includes: [
      "Answers limited to the information you give it",
      "Rate limits so usage and cost stay under control",
      "A clear handoff to email or a person when it doesn't know",
    ],
    tech: ["LLM agents", "Prompt design", "React"],
    proof: "The chat assistant on this site",
    overview:
      "A chat assistant that answers from your content and nothing else: your services, products, policies or documentation. It sits on your website or inside your product. The assistant on this site is built this way; open it in the corner of the page and try it.",
    details: [
      {
        title: "Answers only from what you give it",
        body: "The assistant gets your content as its knowledge and is told to stay inside it. When a question falls outside, it says so instead of guessing.",
      },
      {
        title: "Usage and cost under control",
        body: "Message length, conversation length and messages per visitor are capped, so one visitor cannot run up your bill.",
      },
      {
        title: "A clear way to reach a person",
        body: "When it does not know, it points the visitor to your email or contact page.",
      },
      {
        title: "Built into your front end",
        body: "A React chat widget that loads only when a visitor opens it, so it does not slow the page down.",
      },
    ],
    fit: [
      "Visitors keep asking questions your pages already answer",
      "You want an assistant that will not make things up about your business",
      "You need the running cost to be predictable",
    ],
    projects: [],
  },
  {
    slug: "backend-apis",
    category: "Backend",
    title: "Backend and API development",
    summary:
      "REST APIs for web and mobile apps, with authentication, background jobs and scheduled tasks.",
    includes: [
      "Laravel APIs with Sanctum or Passport authentication",
      "Queues, jobs and cron for the work that runs in the background",
      "Query and database tuning so it holds up as data grows",
    ],
    tech: ["PHP", "Laravel", "REST APIs", "MySQL"],
    proof: "B2B sales platform",
    overview:
      "The API your web and mobile apps talk to. I build these in Laravel with MySQL: authentication, the endpoints themselves, and the background work that should not make a user wait.",
    details: [
      {
        title: "Authentication",
        body: "Token-based sign-in with Laravel Sanctum or Passport, for web and mobile clients.",
      },
      {
        title: "Background work",
        body: "Queues and jobs for slow tasks such as sending messages or building reports, and cron for work that runs on a schedule.",
      },
      {
        title: "Web and mobile from one API",
        body: "The same REST API serves the website and the iOS and Android apps.",
      },
      {
        title: "Database design and tuning",
        body: "Schemas and queries tuned so the API holds up as data grows, including multi-database setups.",
      },
    ],
    fit: [
      "You have a front end or a mobile app and need the API behind it",
      "Your current API is slow or hard to extend",
      "An existing Laravel app needs background jobs, scheduled tasks or notifications",
    ],
    projects: ["b2b-sales-platform", "tv-jam-app", "la-rola"],
  },
  {
    slug: "business-systems",
    category: "ERP · CRM · POS",
    title: "Business systems",
    summary:
      "The modules a business runs on: sales, inventory, billing, customer accounts, ledger and reporting.",
    includes: [
      "Sales, stock and billing in one system",
      "Lead tracking and follow-up automation",
      "Ledger and financial reports",
    ],
    tech: ["Laravel", "MySQL", "SQL Server"],
    proof: "DinDinPOS and DinDin web app",
    overview:
      "The system a business runs its day on: what was sold, what is in stock, who owes what, and what the numbers say. I have built these modules for point-of-sale, CRM and B2B sales products.",
    details: [
      {
        title: "Sales, stock and billing",
        body: "One system for sales, inventory and billing, so the numbers agree with each other.",
      },
      {
        title: "Customers and leads",
        body: "Customer accounts, lead tracking and automated follow-up, so nothing depends on someone remembering.",
      },
      {
        title: "Ledger and financial reports",
        body: "A main ledger and the financial reports built on it.",
      },
      {
        title: "Procurement and orders",
        body: "Procurement, orders and customer accounts in the same system, on web and mobile.",
      },
    ],
    fit: [
      "Sales, stock and accounts live in separate tools or spreadsheets",
      "Your team tracks leads and follow-ups by hand",
      "You need one place to see what was sold, what is in stock and what is owed",
    ],
    projects: ["dindin-pos", "myomnitechhub-crm", "b2b-sales-platform"],
  },
  {
    slug: "web-apps",
    category: "Frontend",
    title: "Web apps",
    summary:
      "Customer-facing web apps on top of your API: menus, cart, ordering and live order status.",
    includes: [
      "React or Vue.js front ends",
      "Real-time updates with Firebase Realtime DB",
      "Layouts that work on phones first",
    ],
    tech: ["React", "Vue.js", "JavaScript", "Firebase Realtime DB"],
    proof: "DinDinPOS and DinDin web app",
    overview:
      "The part your customers see and use. I build web apps in React or Vue.js on top of your API: browsing, cart, ordering, and live status once the order is placed.",
    details: [
      {
        title: "Ordering flows",
        body: "Menus or catalogues, cart, delivery and pickup options, with the order handed to your API.",
      },
      {
        title: "Live updates",
        body: "Order status that changes on screen as it happens, using Firebase Realtime DB.",
      },
      {
        title: "Phones first",
        body: "Layouts designed for a phone screen first, then widened for desktop.",
      },
      {
        title: "Public site and admin panel",
        body: "The site customers buy from and the admin panel your team manages it with.",
      },
    ],
    fit: [
      "You have an API or back office and need the customer-facing app",
      "Customers should order or buy online and follow the status",
      "Most of your customers are on phones",
    ],
    projects: ["dindin-pos", "mi-boletazo"],
  },
  {
    slug: "integrations",
    category: "Messaging",
    title: "Integrations and notifications",
    summary:
      "Your system sends the message itself: order updates, alerts and reminders on the channels customers already use.",
    includes: [
      "WhatsApp and SMS messages triggered by events in your system",
      "Push notifications for web and mobile apps",
      "Connections to third-party services over their APIs",
    ],
    tech: ["WhatsApp", "SMS", "OneSignal", "REST API"],
    proof: "B2B sales platform",
    overview:
      "Your system should tell people what happened without someone typing a message. I connect it to WhatsApp, SMS and push notifications, and to other services over their APIs.",
    details: [
      {
        title: "Messages triggered by events",
        body: "An order is placed or its status changes, and the system sends the WhatsApp or SMS message itself.",
      },
      {
        title: "Push notifications",
        body: "Push notifications for web and mobile apps through OneSignal.",
      },
      {
        title: "Third-party APIs",
        body: "Connections to the outside services your business depends on, over their APIs.",
      },
      {
        title: "Sent in the background",
        body: "Messages go out through queues, so a slow provider does not hold up the person using your app.",
      },
    ],
    fit: [
      "Staff send order updates or reminders by hand",
      "Customers ask for updates you could send automatically",
      "Two systems you use should share data and do not",
    ],
    projects: ["b2b-sales-platform"],
  },
]

export const process = [
  {
    title: "Talk",
    body: "You describe the problem and what it costs you today. I ask questions until the goal is clear.",
  },
  {
    title: "Scope",
    body: "I write down what will be built, what won't, and how long it takes. You agree before any code is written.",
  },
  {
    title: "Build",
    body: "I ship working pieces as I go, so you can try them and correct course early.",
  },
  {
    title: "Launch",
    body: "I deploy it, hand over the code and access, and fix what real use turns up.",
  },
]

/** Questions and answers shown on the Services page (03 / FAQ). */
export const faqSection = { label: "FAQ", title: "Common questions" }

export const faq = [
  {
    question: "How do you charge?",
    answer:
      "A fixed price per project. We agree the scope first, and the price is set before any code is written.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope. The timeline is written into the scope and agreed before work starts.",
  },
  {
    question: "Do you work with clients outside Pakistan?",
    answer: "Yes. I work remotely with clients anywhere, on Pakistan time (UTC+5).",
  },
  {
    question: "Who owns the code after delivery?",
    answer: "You do. At launch I hand over all the code, access and accounts.",
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes, by agreement. We decide what support you need when we scope the project.",
  },
  {
    question: "How many projects do you take at once?",
    answer: "One client project at a time, so yours gets my full attention.",
  },
]

export interface Insight {
  slug: string
  date: string
  topic: string
  title: string
  summary: string
  /** Link to the full article; leave empty until it is published. */
  href: string
}

export const insightsPage = {
  label: "Insights · Voice AI · LLM agents · Backend",
  heading: "Notes from building AI call agents",
  intro:
    "Short write-ups on what I learn while building voice agents, LLM systems and the backends behind them.",
  empty: {
    title: "No articles yet",
    body: "The first write-ups are in progress. Until they are published, the Work section shows what I have built.",
  },
}

/** Add articles here; the Insights page lists them newest first as written. */
export const insights: Insight[] = []

export interface Client {
  /** File name stem for an optional logo in /public/logos, e.g. "la-rola" -> la-rola.svg or .png */
  slug: string
  name: string
  /** Company the work was done for; omit when the entry is the company itself. */
  company?: string
}

/** Names shown in the scrolling strip under the header, in this order. */
export const clients: Client[] = [
  { slug: "innovation-m-services", name: "Innovation M Services" },
  { slug: "dindinpos", name: "DinDinPOS", company: "Innovation M Services" },
  { slug: "myomnitechhub", name: "MyOmniTechHub CRM", company: "Innovation M Services" },
  { slug: "imflow360", name: "IMFLOW360", company: "Innovation M Services" },
  { slug: "imbeautyglow", name: "iMBeautyGlow", company: "Innovation M Services" },
  { slug: "mi-boletazo", name: "Mi Boletazo", company: "Innovation M Services" },
  { slug: "tv-jam-app", name: "TV Jam App", company: "Innovation M Services" },
  { slug: "la-rola", name: "La Rola", company: "Innovation M Services" },
  { slug: "xdimension-solutions", name: "XDimension Solutions" },
  { slug: "b2b-sales-platform", name: "B2B sales platform", company: "XDimension Solutions" },
  { slug: "bixi-soft", name: "Bixi Soft" },
]

/** Footer copy. Navigation comes from navLinks, contact details from profile. */
export const footer = {
  expertise:
    "AI call agents, LLM systems, Laravel REST APIs, and the ERP, CRM and POS backends a business runs on.",
}

/** Chat assistant copy (components/chat-widget.tsx and chat-panel.tsx). */
export const chat = {
  openLabel: "Ask about me",
  closeLabel: "Close chat",
  title: `Ask about ${profile.name}`,
  subtitle: "Answers come from the content on this site",
  greeting: `Hi! I answer questions about ${profile.name}\u2019s projects, services, skills and experience.`,
  suggestions: [
    "What has he built recently?",
    "What's his strongest skill set?",
    "What is he building right now?",
  ],
  inputLabel: "Your question",
  inputPlaceholder: "Ask about his work...",
  sendLabel: "Send",
  error: `Something went wrong. Please try again, or reach out directly at ${profile.email}.`,
}

/** Search and social-share metadata. Page descriptions reuse the copy above. */
export const seo = {
  homeTitle: `${profile.name} \u00b7 AI Developer`,
  homeDescription: `${profile.headline} ${profile.intro}`,
  ogImageAlt: `${profile.name}: ${profile.headline}`,
  skipLink: "Skip to content",
}
