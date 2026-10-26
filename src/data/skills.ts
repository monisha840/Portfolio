import { projects } from "@/data/projects";
import type { Capability, TechPanel } from "@/lib/types";

/**
 * Technologies and areas of experience.
 *
 * Content is taken verbatim from the resume + professional profile document —
 * no proficiency scores, no ratings, no invented tooling.
 *
 * The one number this file carries is `evidence`: the projects on this site
 * that actually use a capability. It is a count of applied work, not a skill
 * rating, and it is validated against `projects.ts` below so it cannot drift.
 */

/* ---------------------------------------------------------------- panel 01 */

export const capabilities: Capability[] = [
  {
    id: "generative-ai",
    name: "Generative AI",
    evidence: ["evokz-ace", "ai-telegram-voice-agent", "ai-video-to-shorts"],
  },
  {
    id: "llm-applications",
    name: "LLM applications",
    evidence: [
      "sirah-voice-ai",
      "evokz-ace",
      "ai-telegram-voice-agent",
      "iwis-illness-to-wellness",
    ],
  },
  {
    id: "rag",
    name: "Retrieval-augmented generation",
    evidence: ["sirah-voice-ai"],
  },
  {
    id: "embeddings",
    name: "Embeddings & vector search",
    evidence: ["sirah-voice-ai"],
  },
  {
    id: "agents",
    name: "AI agents & dialogue state",
    evidence: ["sirah-voice-ai", "ai-telegram-voice-agent"],
  },
  {
    id: "tool-calling",
    name: "Tool & function calling",
    evidence: ["sirah-voice-ai"],
  },
  {
    id: "speech",
    name: "Speech AI",
    evidence: [
      "sirah-voice-ai",
      "ai-telegram-voice-agent",
      "ai-video-to-shorts",
    ],
  },
  {
    id: "automation",
    name: "Workflow automation",
    evidence: [
      "evokz-ace",
      "ai-telegram-voice-agent",
      "knowmind-universe",
      "iwis-illness-to-wellness",
      "factory-operations-crm",
    ],
  },
];

/** Denominator for the capability meters: every project on the site. */
export const capabilityTotal = projects.length;

/* ------------------------------------------------------------ panels 02–06 */

export const techPanels: TechPanel[] = [
  {
    id: "ai-stack",
    title: "AI technologies",
    blurb: "The model, speech and telephony services I build these systems on.",
    items: [
      { name: "OpenAI APIs", glyph: "brand:openai" },
      { name: "Sarvam AI", glyph: "icon:audioLines" },
      { name: "Whisper", glyph: "icon:mic" },
      { name: "Exotel", glyph: "icon:phone" },
      {
        name: "Vector DBs",
        full: "Vector databases & search",
        glyph: "icon:scanSearch",
      },
      { name: "Structured outputs", glyph: "icon:braces" },
      { name: "Prompt engineering", glyph: "icon:terminal" },
      { name: "Fine-tuning", full: "Model fine-tuning", glyph: "icon:sliders" },
      { name: "Conversational AI", glyph: "icon:messages" },
      { name: "Speech-to-text", glyph: "icon:waveform" },
      { name: "Text-to-speech", glyph: "icon:volume" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    blurb: "Languages I write production code in, across services and queries.",
    items: [
      { name: "Python", glyph: "brand:python" },
      { name: "TypeScript", glyph: "brand:typescript" },
      { name: "JavaScript", glyph: "brand:javascript" },
      { name: "SQL", glyph: "icon:database" },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & data",
    blurb:
      "Services, APIs and schemas: multi-tenant models, real-time channels, queues.",
    items: [
      { name: "Node.js", glyph: "brand:nodejs" },
      { name: "Express.js", glyph: "brand:express" },
      { name: "Fastify", glyph: "brand:fastify" },
      { name: "REST APIs", glyph: "icon:network" },
      { name: "WebSockets", glyph: "icon:cable" },
      { name: "PostgreSQL", glyph: "brand:postgresql" },
      { name: "Supabase", glyph: "brand:supabase" },
      { name: "Prisma", glyph: "brand:prisma" },
      { name: "Drizzle ORM", glyph: "brand:drizzle" },
      { name: "MongoDB", glyph: "brand:mongodb" },
      { name: "Redis", glyph: "brand:redis" },
      { name: "BullMQ", glyph: "icon:queue" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Dashboards, admin tooling and sites for the systems I build.",
    items: [
      { name: "React", glyph: "brand:react" },
      { name: "Next.js", glyph: "brand:nextjs" },
      { name: "Tailwind CSS", glyph: "brand:tailwindcss" },
      { name: "HTML5", glyph: "brand:html5" },
      { name: "CSS3", glyph: "brand:css" },
    ],
  },
  {
    id: "delivery",
    title: "Testing, deployment & automation",
    blurb:
      "How work reaches production, stays there, and runs without me watching.",
    items: [
      { name: "Playwright", glyph: "icon:drama" },
      {
        name: "E2E tests",
        full: "End-to-end & smoke testing",
        glyph: "icon:flask",
      },
      { name: "Git", glyph: "brand:git" },
      { name: "GitHub", glyph: "brand:github" },
      { name: "Docker", glyph: "brand:docker" },
      { name: "Docker Compose", glyph: "icon:layers" },
      { name: "Vercel", glyph: "brand:vercel" },
      { name: "Linux / VPS", glyph: "brand:linux" },
      { name: "Caddy", glyph: "brand:caddy" },
      { name: "n8n", glyph: "brand:n8n" },
      { name: "Webhooks", glyph: "icon:webhook" },
      {
        name: "Scheduled jobs",
        full: "Scheduled workflows",
        glyph: "icon:calendarClock",
      },
      { name: "Telegram", full: "Telegram Bot API", glyph: "brand:telegram" },
      { name: "WhatsApp", glyph: "brand:whatsapp" },
      { name: "Evolution API", glyph: "icon:plug" },
    ],
  },
];

/* --------------------------------------------------------------- integrity */

/**
 * Every `evidence` entry has to name a real project, otherwise a meter would
 * silently under-report. Cheap enough to run on import, and it fails the build
 * rather than shipping a wrong count.
 */
const slugs = new Set(projects.map((p) => p.slug));
for (const capability of capabilities) {
  for (const slug of capability.evidence) {
    if (!slugs.has(slug)) {
      throw new Error(
        `skills.ts: capability "${capability.id}" cites unknown project "${slug}"`,
      );
    }
  }
}
