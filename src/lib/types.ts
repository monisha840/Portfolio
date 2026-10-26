import type { TechGlyph } from "@/components/ui/TechIcon";

export type ProjectStatus = "Production" | "Delivered" | "Personal project" | "In progress";

export interface CaseStudySection {
  heading: string;
  body: string;
  /** optional bullet list rendered under the body */
  points?: string[];
}

export interface Project {
  slug: string;
  /** display order; 1 = flagship */
  rank: number;
  title: string;
  /** one-line positioning, e.g. "Real-estate voice-agent SaaS" */
  kicker: string;
  /** 2–3 sentence overview used on the index page */
  summary: string;
  /** short descriptors shown as pills, e.g. "Conversational Voice AI" */
  tags: string[];
  /** technology names, exactly as claimed by the source documents */
  stack: string[];
  status: ProjectStatus;
  year: string;
  /** which mockup composition the card renders */
  mockup: MockupKind;
  /** true for the single flagship entry rendered full-bleed */
  featured?: boolean;
  /** only present when a verified public URL exists */
  liveUrl?: string;
  repoUrl?: string;
  /** when absent, the project has no detail route */
  caseStudy?: {
    problem: string;
    sections: CaseStudySection[];
    /** honest scope note shown in the case study */
    note?: string;
  };
}

export type MockupKind =
  | "voice"
  | "creative"
  | "telegram"
  | "assessment"
  | "healthcare"
  | "crm"
  | "web"
  /** appended: the in-progress AI Video-to-Shorts composition */
  | "video";

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  detail: string;
  period: string;
}

/* ------------------------------------------------------------------
   Appended for the About / Experience / Skills / Education sections.
   Nothing above this line was modified.
   ------------------------------------------------------------------ */

/** An award or acknowledgement — rendered alongside education. */
export interface RecognitionEntry {
  title: string;
  issuer: string;
  detail: string;
}

/**
 * `ExperienceEntry` plus machine-readable date parts, so the timeline can
 * render a real `<time dateTime="…">` instead of an opaque string.
 * `period` is kept as the single display string for any other consumer.
 */
export interface TimedExperienceEntry extends ExperienceEntry {
  /** value for <time dateTime>, e.g. "2025-10" */
  startDateTime: string;
  /** human label for the start, e.g. "Oct 2025" */
  startLabel: string;
  /** human label for the end, e.g. "Present" */
  endLabel: string;
}

/** `EducationEntry` plus a machine-readable date for `<time dateTime>`. */
export interface TimedEducationEntry extends EducationEntry {
  /** value for <time dateTime>, e.g. "2026-05" */
  dateTime: string;
}

/* ------------------------------------------------------------------
   Skills dashboard.
   ------------------------------------------------------------------ */

/** One technology tile: the label printed on it, and the glyph beside it. */
export interface TechItem {
  /** short label shown on the tile */
  name: string;
  /** `"brand:nextjs"` for an official mark, `"icon:webhook"` for a neutral glyph */
  glyph: TechGlyph;
  /** unabbreviated name, exposed to assistive tech when `name` is shortened */
  full?: string;
}

/** A technology panel in the skills dashboard. */
export interface TechPanel {
  id: string;
  /** small uppercase panel label */
  title: string;
  /** one-line framing sentence */
  blurb: string;
  items: TechItem[];
}

/**
 * An AI engineering capability.
 *
 * There are deliberately no proficiency scores. The only quantity recorded is
 * `evidence` — the projects on this site that actually use the capability —
 * so the meter reports applied use and nothing more.
 */
export interface Capability {
  id: string;
  name: string;
  /** project slugs from `projects.ts`; validated at module load */
  evidence: string[];
}
