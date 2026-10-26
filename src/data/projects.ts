import type { Project } from "@/lib/types";

/**
 * Centralised project data.
 *
 * Every claim here is traceable to `.source/profile.txt` (§6) or
 * `.source/resume.txt`. Deliberately absent:
 *   · metrics, user counts, revenue, percentages, testimonials, awards
 *   · `liveUrl` / `repoUrl` — no verified public URLs exist for this work
 *   · technologies the source does not attribute to that specific project
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "sirah-voice-ai",
    rank: 1,
    featured: true,
    title: "Sirah Voice AI",
    kicker: "Real-estate voice-agent SaaS",
    summary:
      "A voice-agent platform that lets real-estate teams answer the phone with an AI agent instead of a script. Exotel telephony streams call audio into Sarvam AI speech services and an LLM-driven dialogue engine that answers project questions, qualifies the lead, updates records and books a site visit through application tools. Built as multi-tenant SaaS, with the dashboard, API, telephony adapter and speech/LLM integrations separated behind explicit interfaces.",
    tags: [
      "Conversational Voice AI",
      "Real-Time Speech",
      "Lead Qualification",
      "Multi-Tenant SaaS",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Drizzle ORM",
      "Exotel",
      "WebSockets",
      "Sarvam AI",
      "Docker",
      "Automated testing",
    ],
    status: "Production",
    year: "2025–2026",
    mockup: "voice",
    caseStudy: {
      problem:
        "Real-estate enquiries arrive by phone and die in the gap before somebody is free to pick up. The questions repeat — which project, which configuration, what budget, when can I visit — but the answers still have to be accurate to the project, the lead still has to land in the CRM with the right requirements attached, and a site visit still has to be booked into a slot that genuinely exists. Automating that means holding a real conversation and then doing real work inside the application at the end of it.",
      sections: [
        {
          heading: "Approach",
          body: "The product is built as one continuous conversation loop rather than an IVR tree. A telephony provider hands over live call audio, speech recognition turns it into text, an LLM drives the dialogue with access to project knowledge, and the same turn can call application tools before the agent speaks again. I contributed to the architecture and to full-stack implementation across the dashboard, API, call and conversation flow, AI tools, knowledge retrieval, lead and site-visit workflows, security foundations and testing.",
          points: [
            "Exotel for inbound and outbound telephony and call audio streaming",
            "Sarvam AI speech services for recognition and synthesis",
            "Real-time speech and conversation processing over WebSockets",
            "LLM-driven dialogue with tool execution inside the turn",
            "Project knowledge retrieval so answers stay tied to the right project",
          ],
        },
        {
          heading: "Architecture",
          body: "The system separates the web dashboard, the API, the database, the telephony adapter, the speech and LLM integrations, and tool execution behind explicit interfaces where implemented — so a provider can be swapped without rewriting the conversation engine. The domain model carries organizations and projects, agents, calls, conversations, leads and site visits, and some flows intentionally support leadless or test calls so the voice path can be exercised without polluting real pipeline data.",
          points: [
            "Next.js and React dashboard, Fastify API, PostgreSQL with Drizzle ORM",
            "Telephony adapter and speech/LLM integrations behind explicit interfaces",
            "Entities: organizations, projects, agents, calls, conversations, leads, site visits",
            "Leadless and test-call flows for safely exercising the audio path",
            "Containerised with Docker",
          ],
        },
        {
          heading: "Conversation and tools",
          body: "The agent does more than talk. Within a call it collects the caller's requirements, answers questions about a project from retrieved knowledge, writes updated lead details back, checks which site-visit slots are open and books one — each of those as a tool the model can call. Calls and conversations are recorded with summaries, so a salesperson picks up a qualified lead rather than a raw recording.",
          points: [
            "Collecting and updating lead requirements mid-conversation",
            "Answering project questions from project knowledge retrieval",
            "Site-visit slot checks and booking through application tools",
            "Call records and conversation summaries for follow-up",
          ],
        },
        {
          heading: "Dashboard and platform foundations",
          body: "Around the call engine sits the SaaS surface: agent management, calls, testing and playground flows, usage, team and settings, plus sales-oriented views for leads, projects and site visits. Platform work has included tenant isolation, role enforcement, session handling, request throttling, and audit as well as billing/metering foundations — the parts that decide whether a voice demo can become a product several organizations share.",
          points: [
            "Agent management, call history, testing/playground, usage, team and settings",
            "Sales views for leads, projects and site visits",
            "Tenant isolation and role enforcement",
            "Sessions, throttling and audit foundations",
            "Billing and metering foundations",
          ],
        },
        {
          heading: "Testing and production validation",
          body: "Voice systems fail in ways unit tests never see, so validation runs at two levels. Simulator-based end-to-end flows and API regression tests cover the conversation and data paths — one demo conversation updated a lead's requirements and booked a site visit, the test summary describing a 2 BHK requirement at a ₹70 lakh budget. Alongside that, real provider-driven calls and audio-path testing have been used to refine production voice-turn behaviour, with audio-format handling, latency, provider behaviour, public webhook configuration and webhook security as the standing areas of refinement.",
          points: [
            "Simulator-based end-to-end conversation flows",
            "API regression tests across the call and lead data paths",
            "Real provider-driven calls and audio-path testing",
            "Ongoing refinement of audio formats, latency and webhook security",
          ],
        },
      ],
      note: "Real provider-driven calls have been tested and the system has been described as in production. The exact production deployment scope — and which provider and model features are currently live — should be confirmed per feature rather than inferred from this page. No usage, latency or business metrics are published here.",
    },
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "evokz-ace",
    rank: 2,
    title: "Evokz ACE",
    kicker: "Generative AI creative automation",
    summary:
      "Evokz ACE turns a design template and a structured Excel sheet of brand inputs into finished, on-brand marketing creatives, then delivers them on a schedule over WhatsApp. Copy is generated with OpenAI Structured Outputs, imagery with fal.ai Flux.1 where configured, and the layout itself is rendered programmatically through Satori and Resvg instead of being asked of a model. Multi-tenant throughout, with usage tracking, per-client budgets, payment webhooks and retry/recovery around delivery.",
    tags: [
      "Generative AI",
      "Multi-Tenant SaaS",
      "Branded Creative Generation",
      "Scheduled Delivery",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "OpenAI Structured Outputs",
      "GPT-4o-mini",
      "fal.ai Flux.1",
      "Satori",
      "Resvg",
      "Evolution API",
      "Google Drive API",
      "Razorpay",
      "Cron jobs",
      "Docker",
      "Caddy",
    ],
    status: "Delivered",
    year: "2025–2026",
    mockup: "creative",
    caseStudy: {
      problem:
        "Branded creatives are the most repetitive output an agency produces: the same template, re-skinned per client, re-written per week, re-sent per channel. Handing the whole job to a generative model solves the writing and ruins the design — layout drifts, logos move, contact details come back subtly wrong. The requirement was volume and schedule automation without losing template fidelity.",
      sections: [
        {
          heading: "Approach",
          body: "The pipeline splits the problem in two. Everything linguistic — headlines, feature lines, the brand-specific content for a given client — is generated as structured data with OpenAI Structured Outputs on GPT-4o-mini, driven by Excel inputs that administrators maintain: prompts, logos, contact details, footers, features and website URLs. Everything visual is rendered deterministically from a template. I developed the AI workflow, the template replication approach, the brand customisation pipeline, scheduled automation, payment webhook integration and the delivery/retry logic.",
          points: [
            "Structured content generation with OpenAI Structured Outputs (GPT-4o-mini)",
            "Brand-specific customisation driven by structured Excel inputs",
            "Design variables resolved per client before anything renders",
            "fal.ai Flux.1 imagery for backgrounds and creative visuals where configured",
          ],
        },
        {
          heading: "Deterministic rendering",
          body: "The creative is composed as HTML/CSS and rendered programmatically — Satori turns the template-based layout into SVG, Resvg rasterises it into the final image. This is the deliberate design decision of the project: the layout is rendered by code rather than having a language model recreate the visual design, so the hundredth creative lines up exactly like the first and the brand's template survives contact with automation.",
          points: [
            "Template-based HTML/CSS composition, not model-drawn layout",
            "Satori for layout-to-SVG rendering, Resvg for rasterisation",
            "Layout consistency preserved across every client and every run",
          ],
        },
        {
          heading: "Scheduling and delivery",
          body: "Finished creatives are not left in a folder. Cron-driven jobs schedule WhatsApp delivery through an Evolution API integration, Google Drive handles input and asset storage, and failed attempts fall into retry and recovery behaviour rather than silently disappearing — the difference between an automation you can leave running and one somebody has to babysit.",
          points: [
            "Scheduled WhatsApp delivery via Evolution API",
            "Google Drive integration for inputs and generated assets",
            "Retry and recovery behaviour for failed delivery attempts",
          ],
        },
        {
          heading: "Multi-tenancy, billing and operations",
          body: "As a product shared by several clients, ACE needed the unglamorous half: tenant-aware data, usage tracking, per-client budgets so generation cannot run away, concurrency-safe updates where several jobs touch the same records, and Razorpay webhooks wired into the payment flow. It is deployed on a VPS behind Caddy using Docker.",
          points: [
            "Multi-tenant product considerations throughout the data model",
            "Usage tracking and per-client generation budgets",
            "Concurrency-safe updates across scheduled jobs",
            "Razorpay payment webhook integration",
            "Docker, Caddy and VPS deployment",
          ],
        },
      ],
      note: "Each provider and library is listed only where it was personally used in the delivered implementation. No volume, cost or engagement figures are published for this project.",
    },
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "ai-telegram-voice-agent",
    rank: 3,
    title: "AI Telegram Voice Agent",
    kicker: "Voice-in, voice-out conversational agent",
    summary:
      "A personal project that makes Telegram itself the interface for a voice assistant. A voice note arrives on a webhook, Whisper transcribes it, an LLM answers with the thread's history as context, and the reply is synthesised back into a voice message. The interesting part is orchestration: four separate services behaving like one conversation.",
    tags: [
      "Conversational AI",
      "Speech-to-Text",
      "LLM Processing",
      "Text-to-Speech",
    ],
    stack: [
      "Telegram Bot API",
      "Webhooks",
      "OpenAI Whisper",
      "OpenAI APIs",
      "Text-to-speech",
      "Backend automation",
    ],
    status: "Personal project",
    year: "2025",
    mockup: "telegram",
    caseStudy: {
      problem:
        "Talking is faster than typing, but most assistants make you type anyway. The goal was a conversation that never leaves a chat app the user already has open: speak into Telegram, be spoken an answer back, with no separate client to install and no transcript to read.",
      sections: [
        {
          heading: "Approach",
          body: "The whole thing is a webhook-driven pipeline. Telegram posts the voice message to the backend, the audio is transcribed to text, the transcript goes to an LLM together with the conversation's stored history, the response is converted to speech, and the resulting audio returns to the same thread as a voice reply. I built the Telegram webhook integration, the audio-processing workflow, the LLM response pipeline and the speech-to-text / text-to-speech flow.",
          points: [
            "Telegram Bot API webhook receives the inbound voice note",
            "OpenAI Whisper transcribes the audio to text",
            "LLM generates the reply from the transcript plus thread context",
            "Text-to-speech renders the answer and it returns as a voice message",
          ],
        },
        {
          heading: "Conversation memory",
          body: "A voice agent that forgets the previous turn is a novelty. Conversation state is persisted per thread so follow-up questions resolve against what was already said, which is what turns a sequence of isolated requests into something that behaves like a conversation.",
          points: [
            "Persistent conversation memory across turns",
            "Contextual responses rather than per-message answers",
          ],
        },
        {
          heading: "What it demonstrates",
          body: "Four services — a messaging platform, a transcription model, a language model and a speech synthesiser — each with its own failure modes, latency and audio-format expectations, coordinated into a single round trip that feels immediate to the user. It is small on purpose; the value is the orchestration pattern, which is the same one the production voice work is built on.",
        },
      ],
      note: "The exact text-to-speech provider, hosting environment and workflow platform are not specified in the source material for this project, so they are deliberately not named. This is personal work, not a deployed product.",
    },
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "knowmind-universe",
    rank: 4,
    title: "KnowMind Universe",
    kicker: "Emotional Intelligence assessment & reporting SaaS",
    summary:
      "A platform for psychologists, trainers, coaches and organizations to administer Emotional Intelligence assessments across six domains and get a reviewed report into the respondent's hands. Scoring handles reverse-scored items and configurable weights; every report moves through a controlled Draft → Edited → Approved → Sent workflow before it can be delivered. Access is role-aware with row-level security, and the critical journeys are covered by Playwright end-to-end and smoke tests.",
    tags: [
      "Assessment SaaS",
      "Scoring Engine",
      "Report Approval",
      "Automated Delivery",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "WhatsApp integration",
      "Email automation",
      "Playwright",
    ],
    status: "Delivered",
    year: "2025–2026",
    mockup: "assessment",
    caseStudy: {
      problem:
        "Running an assessment practice by hand means scoring sheets by hand, remembering which items are reverse-scored, writing each report from a template, then chasing the delivery. The scoring has to be exactly repeatable, the practitioner has to stay in control of what goes out under their name, and a report that reaches the wrong inbox is not a bug you can apologise your way out of.",
      sections: [
        {
          heading: "Scoring engine",
          body: "Results are calculated from explicit scoring rules rather than ad-hoc arithmetic: reverse-scored questions are handled as part of the model, and domain weights are configurable where supported, so an instrument can be tuned without rewriting the engine. The same inputs always produce the same scores — the baseline requirement for anything a practitioner is going to put their name on.",
          points: [
            "Scoring across six Emotional Intelligence domains",
            "Reverse-scored item handling built into the scoring rules",
            "Configurable domain weights where supported",
            "Cohort and group management for organizational runs",
          ],
        },
        {
          heading: "Report workflow",
          body: "Generated reports do not go straight out. Each one passes through controlled approval states — Draft, Edited, Approved, Sent — so a coach can revise the generated narrative and explicitly approve it before anything is delivered. Delivery itself happens over WhatsApp or email using private report links rather than attachments scattered across inboxes.",
          points: [
            "Draft → Edited → Approved → Sent approval states",
            "Practitioner review and editing before approval",
            "WhatsApp and email delivery via private report links",
          ],
        },
        {
          heading: "Access control and data",
          body: "Assessment responses are sensitive, so access is enforced at the data layer as well as in the interface: row-level security and role-aware access decide who can see which cohort, respondent and report. Real-time synchronisation keeps dashboards current, with fallback behaviour when the live channel is unavailable so the app degrades instead of breaking.",
          points: [
            "Row-level security and role-aware access to cohorts and reports",
            "PostgreSQL and Supabase with Prisma-based data access",
            "Real-time synchronisation with fallback behaviour",
          ],
        },
        {
          heading: "Testing",
          body: "The journeys that matter — taking an assessment, scoring it, moving a report through approval, delivering it — are covered by Playwright end-to-end tests plus a smoke suite, so a regression in the scoring or approval path surfaces before a practitioner finds it.",
          points: [
            "Playwright end-to-end coverage of the core journeys",
            "Smoke tests across the assessment and report paths",
          ],
        },
      ],
      note: "No psychometric or clinical validity is claimed. This is assessment, scoring, reporting and delivery software — validation of the instrument itself is the practitioner's domain and is not evidenced here.",
    },
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "iwis-illness-to-wellness",
    rank: 5,
    title: "IWIS — Illness to Wellness Intelligence System",
    kicker: "Multi-tenant healthcare operations platform",
    summary:
      "IWIS grew out of the Al-Shifa hospital project into a multi-tenant platform more than one hospital can run on without seeing each other's data. It covers role-aware access to operational features, secure database-backed APIs, report and notification delivery over WhatsApp and email, and AI-enabled workflows — alongside engagement mechanics such as doctor streaks and leaderboards.",
    tags: [
      "Healthcare SaaS",
      "Multi-Tenant Architecture",
      "Engagement Workflows",
      "Workflow Automation",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "REST APIs",
      "RBAC",
      "WhatsApp automation",
      "Email automation",
      "LLM workflows",
    ],
    status: "Delivered",
    year: "2025–2026",
    mockup: "healthcare",
    caseStudy: {
      problem:
        "A platform built for one hospital becomes a liability the moment a second one wants it: data that was implicitly separated now has to be explicitly separated, and every role that was obvious in a single-tenant build has to be enforced. IWIS is that transition — the Al-Shifa hospital project re-shaped into a multi-tenant product with the access rules written down rather than assumed.",
      sections: [
        {
          heading: "Multi-tenancy and access",
          body: "Tenant separation keeps each hospital's data its own, and role-aware access decides which application features a given user reaches at all. Access rules are enforced through database-backed APIs rather than hidden interface elements, so the boundary holds wherever the request comes from.",
          points: [
            "Hospital/tenant data separation across the data model",
            "RBAC and role-aware access to application features",
            "Secure database-backed REST APIs carrying the access rules",
          ],
        },
        {
          heading: "Workflows and automation",
          body: "On top of that foundation sit the operational flows: patient and doctor engagement workflows, delivery of reports and notifications, and messaging and email automation for the supported communication paths. AI-enabled workflows are integrated where they make an existing flow faster rather than as a feature on their own.",
          points: [
            "Patient and doctor engagement workflows",
            "Report and notification delivery",
            "WhatsApp and email automation for supported flows",
            "AI-enabled workflows integrated into existing processes",
          ],
        },
        {
          heading: "Engagement features",
          body: "Adoption is the hard part of hospital software, so the platform includes engagement mechanics — doctor streaks and leaderboards — that give clinicians a reason to keep the workflows current instead of treating the system as paperwork.",
          points: [
            "Doctor streaks as an engagement mechanic",
            "Leaderboards across the supported engagement workflows",
          ],
        },
      ],
      note: "Scope is deliberately operational. The platform supports engagement, delivery and administrative workflows — it does not perform clinical diagnosis or medical decision-making. No patient data, tenant specifics or internal endpoints appear anywhere on this site, and the security claims are limited to the controls actually implemented and verified.",
    },
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "factory-operations-crm",
    rank: 6,
    title: "Factory Operations CRM — RD Interlocks",
    kicker: "Operations and CRM for an interlocking-brick manufacturer",
    summary:
      "An end-to-end operations system for an interlocking-brick manufacturing business, built so leads, customers, production, delivery and money all live in one application. It covers customer onboarding and lead management with Meta lead capture where configured, production-related operations and delivery coordination, and billing, payment tracking and ledger-oriented records — with configurable admin settings and role-based access over the top.",
    tags: [
      "Business Operations",
      "CRM",
      "Manufacturing Workflows",
      "Billing & Ledgers",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "Meta lead integration",
      "RBAC",
    ],
    status: "Delivered",
    year: "2025–2026",
    mockup: "crm",
    caseStudy: {
      problem:
        "A manufacturing business runs on spreadsheets that do not know about each other: enquiries in one place, production in another, deliveries on paper, payments in a ledger book. The cost is not one big failure but constant small reconciliation — nobody can say what a customer owes and what is still to be delivered without asking three people.",
      sections: [
        {
          heading: "Leads and customers",
          body: "Lead and customer information is managed through a single application, with lead capture from Meta advertising where that integration is configured, so an enquiry becomes a record automatically rather than after somebody reads a notification.",
          points: [
            "Unified lead and customer/client management",
            "Meta lead integration for ad-sourced enquiries where configured",
            "Customer onboarding into the same system that bills them",
          ],
        },
        {
          heading: "Operations and delivery",
          body: "Production-related operations and delivery coordination are brought into the same workflow as the customer record, so what was promised, what is being made and what has gone out are all readable from one place.",
          points: [
            "Production-related operational workflows",
            "Delivery coordination tied to customer orders",
          ],
        },
        {
          heading: "Billing and ledgers",
          body: "The financial side covers billing, payment tracking and ledger-oriented records, which is what makes the rest of the system worth keeping current — the operational data and the money refer to the same entities.",
          points: [
            "Billing workflows against customer accounts",
            "Payment tracking per customer",
            "Ledger-oriented financial records",
          ],
        },
        {
          heading: "Administration",
          body: "Business parameters are configurable rather than hard-coded, so administrators maintain the supported settings themselves, and authentication plus role-based access control decide who can touch operational versus financial data.",
          points: [
            "Configurable admin settings for supported business parameters",
            "Authentication and role-based access control",
          ],
        },
      ],
      note: "This is not a full accounting-compliance system. Billing, payment tracking and ledger records exist to support day-to-day operations, and the exact production, inventory, delivery and finance capabilities follow the deployed feature set rather than this description.",
    },
  },

  /* ---------------------------------------------------------------- 07 */
  {
    slug: "sirah-digital-3d-website",
    rank: 7,
    title: "Sirah Digital — 3D Website & CMS",
    kicker: "Corporate site with interactive 3D and content management",
    summary:
      "An interactive company website combining 3D web elements, smooth transitions and responsive layouts with a CMS, so supported content can be updated without a code change for every routine edit. Work covered the interactive UI, 3D component integration, animation refinement, the CMS, responsive design and loading performance.",
    tags: ["Corporate Website", "Interactive 3D", "Animation", "CMS"],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "3D web components",
      "CSS animation",
      "CMS",
      "Lazy loading",
    ],
    status: "Delivered",
    year: "2025–2026",
    mockup: "web",
  },

  /* ---------------------------------------------------------------- 08 */
  {
    slug: "fortune-innovatives-website",
    rank: 8,
    title: "Fortune Innovatives — Website & CMS",
    kicker: "Corporate website with CMS-driven content workflows",
    summary:
      "A corporate website delivered end to end with a content management system behind it, so administrators publish supported content changes to the live site themselves. Work covered UI implementation, interactive components, CMS integration, content workflows and debugging production behaviour.",
    tags: ["Corporate Website", "CMS Integration", "Responsive Development"],
    stack: ["React", "Next.js", "TypeScript", "CSS", "CMS", "Responsive UI"],
    status: "Delivered",
    year: "2025–2026",
    mockup: "web",
  },

  /* ---------------------------------------------------------------- 09 */
  {
    slug: "ai-video-to-shorts",
    rank: 9,
    title: "AI Video-to-Shorts",
    kicker: "Long-form video into vertical shorts — in progress",
    summary:
      "An in-progress product direction for turning long-form video into short-form vertical clips: transcription, content analysis, hook identification, vertical reframing, caption generation and export. Its defining constraint is architectural — no GPU, now or in future versions — which pushes the design toward CPU and browser processing, deterministic algorithms and low-cost open-source tooling.",
    tags: [
      "AI Media Automation",
      "Transcription",
      "Content Repurposing",
      "No-GPU Constraint",
    ],
    stack: [
      "Faster-Whisper",
      "Whisper.cpp",
      "ONNX Runtime",
      "Browser-based processing",
      "FFmpeg-style media workflows",
    ],
    status: "In progress",
    year: "2026",
    mockup: "video",
    caseStudy: {
      problem:
        "Repurposing a long video into shorts is hours of scrubbing for the three moments worth clipping, then reframing and captioning each one. Most automated answers to this assume a GPU budget. The question this project is built around is whether the same pipeline can run on CPU and in the browser — because that is what decides whether it can be offered cheaply rather than priced per render.",
      sections: [
        {
          heading: "Intended pipeline",
          body: "The planned workflow is a chain, each stage cheap enough to run without accelerated hardware: transcribe the source, analyse the transcript for content and structure, identify candidate highlights and hooks, reframe the selected segments to vertical, generate captions, and export platform-ready clips. Work so far has been product planning plus exploration of the transcription and automated clip-generation stages.",
          points: [
            "Transcription of long-form source video",
            "Semantic and content analysis of the transcript",
            "Candidate highlight selection and hook identification",
            "Vertical reframing of the selected segments",
            "Caption generation and export of platform-ready clips",
          ],
        },
        {
          heading: "The no-GPU constraint",
          body: "The design constraint is explicit and permanent: no GPU usage, including in future versions. That rules out the obvious implementations and makes the engineering question the interesting part — favouring CPU and browser-side processing, deterministic algorithms over model inference wherever a deterministic one will do, and cost-effective open-source tooling throughout.",
          points: [
            "CPU and browser-based processing instead of accelerated inference",
            "Deterministic algorithms preferred wherever they suffice",
            "Low-cost open-source tooling and infrastructure",
          ],
        },
        {
          heading: "Where it stands",
          body: "This is a project in progress, presented as such. The tooling named here — Faster-Whisper, Whisper.cpp, ONNX Runtime, browser-based processing and FFmpeg-style media workflows — has been explored against the no-GPU constraint. None of it is claimed as a shipped implementation, and no completed phases or deployed capabilities are asserted.",
        },
      ],
      note: "In progress / product concept. The tools listed have been explored rather than shipped, and the completed phases and deployed capabilities are not yet confirmed — nothing here should be read as a released feature.",
    },
  },
];

/** Projects in display order. */
export const orderedProjects: Project[] = [...projects].sort(
  (a, b) => a.rank - b.rank,
);

/** The single flagship entry, rendered full-width. */
export const flagshipProject: Project =
  orderedProjects.find((p) => p.featured) ?? orderedProjects[0];

/** Alternating editorial rows: everything between the flagship and the strip. */
export const rowProjects: Project[] = orderedProjects.filter(
  (p) => !p.featured && p.rank <= 6,
);

/**
 * The editorial showcase: every project that carries a case study of its own
 * and is rendered as a full submerged-numeral row.
 */
export const showcaseProjects: Project[] = orderedProjects.filter(
  (p) => p.rank <= 6,
);

/** Compact lower strip: lighter website work plus the in-progress concept. */
export const stripProjects: Project[] = orderedProjects.filter(
  (p) => p.rank >= 7,
);

/** Only the projects that have a detail route. */
export const caseStudyProjects: Project[] = orderedProjects.filter(
  (p) => p.caseStudy,
);

export function getProject(slug: string): Project | undefined {
  return orderedProjects.find((p) => p.slug === slug);
}

/** Previous/next case study, for the detail-route footer navigation. */
export function getProjectNeighbours(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = caseStudyProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? caseStudyProjects[index - 1] : undefined,
    next:
      index < caseStudyProjects.length - 1
        ? caseStudyProjects[index + 1]
        : undefined,
  };
}
