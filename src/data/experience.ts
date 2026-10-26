import type {
  RecognitionEntry,
  TimedEducationEntry,
  TimedExperienceEntry,
} from "@/lib/types";

/**
 * Employment history. Dates and titles follow the resume exactly — it is the
 * authoritative source. One role only; nothing here is extrapolated.
 */
export const experience: TimedExperienceEntry[] = [
  {
    company: "Sirah Digital",
    role: "AI Automation Developer & Full-Stack Developer",
    period: "Oct 2025 — Present",
    startDateTime: "2025-10",
    startLabel: "Oct 2025",
    endLabel: "Present",
    location: "Chennai, India",
    summary:
      "Client and internal products across AI automation, SaaS application development, voice AI and CRM — from requirements and technical planning through implementation, testing, deployment and post-launch support.",
    highlights: [
      "Build AI-enabled SaaS applications, CRM capabilities and business automation across healthcare, manufacturing and operational workflows.",
      "Develop multi-tenant architecture, authentication and RBAC, subscription flows, database schemas and migrations, API integrations and real-time features.",
      "Integrate LLM APIs, structured outputs, retrieval-based knowledge workflows, speech services and external business systems into end-to-end products.",
      "Implement and validate voice-agent workflows spanning conversation handling, lead updates, site-visit booking, telephony adapters and speech processing.",
      "Contribute across the product lifecycle: backend and UI development, automated testing, deployment, debugging and production support.",
    ],
  },
];

export const education: TimedEducationEntry[] = [
  {
    institution: "Peri Institute of Technology, Chennai",
    qualification: "B.E. Computer Science and Engineering",
    detail: "CGPA 8.3 / 10",
    period: "May 2026",
    dateTime: "2026-05",
  },
];

export const recognition: RecognitionEntry[] = [
  {
    title: "Appreciation Certificate",
    issuer: "Sirah Digital",
    detail:
      "Recognised for adaptability, collaboration and workplace contribution.",
  },
];
