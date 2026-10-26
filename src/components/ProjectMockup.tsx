import type { ReactNode } from "react";
import type { MockupKind } from "@/lib/types";

/**
 * Original, abstract interface compositions — pure JSX + CSS + inline SVG.
 * No external images, no screenshots, no chart libraries, no canvas.
 * Each one evokes the shape of the real product without impersonating it.
 */

const CAPTION = "Illustrative interface — not a production screenshot";

const DESCRIPTIONS: Record<MockupKind, string> = {
  voice:
    "Abstract illustration of a live-call panel: a speech waveform, alternating caller and agent transcript turns, and a chip showing a site-visit booking tool being executed.",
  creative:
    "Abstract illustration of a creative-automation workspace: a grid of branded template compositions beside a scheduling rail of queued delivery times.",
  telegram:
    "Abstract illustration of a chat thread made of voice-note bubbles with play controls and waveforms, alternating between the user and the agent.",
  assessment:
    "Abstract illustration of an assessment report: six scored domain bars above a Draft to Edited to Approved to Sent report workflow.",
  healthcare:
    "Abstract illustration of a multi-tenant clinical dashboard: summary tiles above engagement leaderboard rows with streak indicators.",
  crm: "Abstract illustration of an operations table: order rows with customer, amount and payment-state columns above a ledger balance row.",
  web: "Abstract illustration of a layered, perspective-tilted website layout with a navigation row and a headline block.",
  video:
    "Abstract illustration of a video-repurposing pipeline: a long-form source with a selected segment on a timeline, feeding a vertical captioned clip.",
};

const CHROME_LABELS: Record<MockupKind, string> = {
  voice: "voice agent · live call",
  creative: "creative automation",
  telegram: "telegram thread",
  assessment: "assessment report",
  healthcare: "tenant dashboard",
  crm: "operations ledger",
  web: "site composition",
  video: "clip pipeline",
};

interface ProjectMockupProps {
  kind: MockupKind;
  /** sizing classes for the frame, e.g. "aspect-[4/3]" or "h-40" */
  className?: string;
}

export function ProjectMockup({ kind, className = "" }: ProjectMockupProps) {
  return (
    <figure className="min-w-0">
      <div
        role="img"
        aria-label={DESCRIPTIONS[kind]}
        className={`relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_30px_90px_-50px_var(--color-burgundy-600)] ${className}`}
      >
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.07] bg-ink-850 px-3 py-2"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy-500" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/10" />
          <span className="ml-1 truncate font-mono text-[10px] tracking-[0.14em] text-chalk-faint uppercase">
            {CHROME_LABELS[kind]}
          </span>
        </div>
        <div
          aria-hidden
          className="relative min-h-0 min-w-0 flex-1 overflow-hidden p-3 sm:p-4"
        >
          <Body kind={kind} />
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-chalk-mute uppercase">
        {CAPTION}
      </figcaption>
    </figure>
  );
}

function Body({ kind }: { kind: MockupKind }) {
  switch (kind) {
    case "voice":
      return <VoicePanel />;
    case "creative":
      return <CreativePanel />;
    case "telegram":
      return <TelegramPanel />;
    case "assessment":
      return <AssessmentPanel />;
    case "healthcare":
      return <HealthcarePanel />;
    case "crm":
      return <CrmPanel />;
    case "web":
      return <WebPanel />;
    case "video":
      return <VideoPanel />;
  }
}

/* ------------------------------------------------------------------ atoms */

function Chip({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex max-w-full min-w-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] leading-none ${
        muted
          ? "border-white/12 bg-white/[0.04] text-chalk-mute"
          : "border-burgundy-500/45 bg-burgundy-700/30 text-burgundy-200"
      }`}
    >
      <svg
        viewBox="0 0 10 10"
        className="h-2 w-2 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.4 5.2 3.8 7.6 8.6 2.4" />
      </svg>
      <span className="truncate">{children}</span>
    </span>
  );
}

function MicroLabel({ children }: { children: ReactNode }) {
  return (
    <p className="truncate font-mono text-[8px] tracking-[0.14em] text-chalk-faint uppercase">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ voice */

const WAVE = [
  8, 16, 27, 41, 56, 46, 32, 22, 36, 52, 64, 55, 40, 26, 17, 29, 47, 60, 70, 62,
  49, 33, 19, 12, 24, 40, 56, 66, 51, 35, 21, 14, 26, 43, 58, 47, 30, 17, 10, 19,
];

function VoicePanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] text-burgundy-300 uppercase">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy-400"
            style={{ animation: "pulse-soft 2.6s ease-in-out infinite" }}
          />
          <span className="truncate">live call</span>
        </span>
        <span className="shrink-0 font-mono text-[9px] text-chalk-mute">
          02:14
        </span>
      </div>

      <svg
        viewBox="0 0 160 72"
        preserveAspectRatio="none"
        className="h-9 w-full shrink-0 text-burgundy-400 sm:h-11"
      >
        {WAVE.map((h, i) => (
          <rect
            key={i}
            x={i * 4}
            y={(72 - h) / 2}
            width={2.4}
            height={h}
            rx={1.2}
            fill="currentColor"
            opacity={0.35 + (h / 70) * 0.65}
          />
        ))}
      </svg>

      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        <Turn label="caller" widths={["100%", "58%"]} />
        <Turn label="agent" widths={["94%", "76%", "42%"]} brand />
        <Turn label="caller" widths={["82%", "36%"]} />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5">
        <Chip>book_site_visit</Chip>
        <Chip muted>update_lead</Chip>
      </div>
    </div>
  );
}

function Turn({
  label,
  widths,
  brand = false,
}: {
  label: string;
  widths: string[];
  brand?: boolean;
}) {
  return (
    <div className="flex min-w-0 gap-2">
      <span
        className={`w-10 shrink-0 font-mono text-[8px] tracking-[0.12em] uppercase ${
          brand ? "text-burgundy-300" : "text-chalk-faint"
        }`}
      >
        {label}
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        {widths.map((w, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full ${
              brand ? "bg-burgundy-600/75" : "bg-white/12"
            }`}
            style={{ width: w }}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- creative */

const TILE_GRADIENTS = [
  "from-burgundy-600/80 via-burgundy-800/60 to-ink-900",
  "from-ink-800 via-burgundy-800/55 to-burgundy-700/70",
  "from-burgundy-900/80 via-burgundy-600/50 to-ink-850",
  "from-burgundy-700/70 via-ink-800 to-burgundy-900/70",
];

const QUEUE = [
  { time: "09:00", done: true },
  { time: "12:30", done: true },
  { time: "17:00", done: false },
  { time: "20:15", done: false },
];

function CreativePanel() {
  return (
    <div className="flex h-full min-h-0 gap-3">
      <div className="grid min-w-0 flex-1 content-start grid-cols-2 gap-2">
        {TILE_GRADIENTS.map((gradient, i) => (
          <div
            key={i}
            className="min-w-0 overflow-hidden rounded-md border border-white/[0.08] bg-ink-850"
          >
            <div className={`h-8 bg-gradient-to-br sm:h-11 ${gradient}`} />
            <div className="space-y-1 p-1.5">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 shrink-0 rounded-sm bg-white/25" />
                <span className="h-1 min-w-0 flex-1 rounded-full bg-white/15" />
              </div>
              <span
                className="block h-1 rounded-full bg-white/10"
                style={{ width: i % 2 === 0 ? "72%" : "54%" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden w-[4.75rem] shrink-0 flex-col gap-2 border-l border-white/[0.07] pl-2.5 sm:flex">
        <MicroLabel>queue</MicroLabel>
        {QUEUE.map(({ time, done }) => (
          <div key={time} className="flex items-center justify-between gap-1">
            <span className="font-mono text-[8px] text-chalk-mute">{time}</span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                done ? "bg-burgundy-400" : "bg-white/20"
              }`}
            />
          </div>
        ))}
        <span className="mt-auto block h-1 w-full rounded-full bg-white/[0.08]">
          <span className="block h-full w-1/2 rounded-full bg-burgundy-500" />
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- telegram */

const MINI_WAVE = [5, 9, 14, 8, 16, 11, 6, 13, 18, 10, 7, 15, 9, 5];

function TelegramPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col justify-end gap-2 overflow-hidden">
      <VoiceBubble side="in" duration="0:12" />
      <TextBubble widths={["100%", "62%"]} />
      <VoiceBubble side="out" duration="0:19" />
    </div>
  );
}

function VoiceBubble({
  side,
  duration,
}: {
  side: "in" | "out";
  duration: string;
}) {
  const out = side === "out";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[86%] min-w-0 items-center gap-2 rounded-2xl border px-2.5 py-2 ${
          out
            ? "border-burgundy-500/35 bg-burgundy-800/40"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            out ? "bg-burgundy-600 text-white" : "bg-white/15 text-chalk"
          }`}
        >
          <svg viewBox="0 0 8 8" className="h-2 w-2" fill="currentColor">
            <path d="M1.6 0.7 7 4 1.6 7.3Z" />
          </svg>
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
          {MINI_WAVE.map((h, i) => (
            <span
              key={i}
              className={`w-[2px] shrink-0 rounded-full ${
                out ? "bg-burgundy-200/70" : "bg-white/35"
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
        <span className="shrink-0 font-mono text-[8px] text-chalk-mute">
          {duration}
        </span>
      </div>
    </div>
  );
}

function TextBubble({ widths }: { widths: string[] }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[76%] min-w-0 space-y-1.5 rounded-2xl border border-burgundy-500/30 bg-burgundy-900/50 px-2.5 py-2">
        {widths.map((w, i) => (
          <span
            key={i}
            className="block h-1.5 rounded-full bg-burgundy-200/45"
            style={{ width: w, minWidth: "1.5rem" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- assessment */

const DOMAINS = [
  { key: "d1", width: "78%" },
  { key: "d2", width: "54%" },
  { key: "d3", width: "88%" },
  { key: "d4", width: "41%" },
  { key: "d5", width: "67%" },
  { key: "d6", width: "73%" },
];

const WORKFLOW = ["draft", "edited", "approved", "sent"];

function AssessmentPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <MicroLabel>six domains</MicroLabel>
      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        {DOMAINS.map(({ key, width }) => (
          <div key={key} className="flex min-w-0 items-center gap-2">
            <span className="w-5 shrink-0 font-mono text-[8px] tracking-[0.1em] text-chalk-faint uppercase">
              {key}
            </span>
            <span className="block h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-burgundy-800 to-burgundy-400"
                style={{ width }}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-x-1 gap-y-1">
        {WORKFLOW.map((step, i) => (
          <span key={step} className="flex min-w-0 items-center gap-1">
            <span
              className={`rounded-full border px-1.5 py-0.5 font-mono text-[8px] leading-none tracking-[0.08em] uppercase ${
                step === "approved"
                  ? "border-burgundy-400/60 bg-burgundy-700/35 text-burgundy-200"
                  : "border-white/10 bg-white/[0.03] text-chalk-faint"
              }`}
            >
              {step}
            </span>
            {i < WORKFLOW.length - 1 && (
              <svg
                viewBox="0 0 6 10"
                className="h-2 w-1.5 shrink-0 text-chalk-faint"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <path d="M1.5 1.5 4.5 5l-3 3.5" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- healthcare */

const TENANT_TILES = [
  { label: "tenants", width: "62%" },
  { label: "reports", width: "84%" },
  { label: "streaks", width: "47%" },
];

const LEADERBOARD = [
  { name: "86%", streak: 5 },
  { name: "72%", streak: 4 },
  { name: "64%", streak: 3 },
  { name: "48%", streak: 2 },
];

function HealthcarePanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="grid shrink-0 grid-cols-3 gap-1.5">
        {TENANT_TILES.map(({ label, width }) => (
          <div
            key={label}
            className="min-w-0 rounded-md border border-white/[0.07] bg-white/[0.02] p-1.5"
          >
            <MicroLabel>{label}</MicroLabel>
            <span className="mt-1.5 block h-2 rounded-sm bg-white/[0.06]">
              <span
                className="block h-full rounded-sm bg-gradient-to-r from-burgundy-500 to-burgundy-800"
                style={{ width }}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        <MicroLabel>engagement</MicroLabel>
        {LEADERBOARD.map(({ name, streak }, i) => (
          <div key={i} className="flex min-w-0 items-center gap-2">
            <span className="w-2 shrink-0 font-mono text-[8px] text-chalk-faint">
              {i + 1}
            </span>
            <span className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-burgundy-600 to-burgundy-900" />
            <span className="block h-1.5 min-w-0 flex-1 rounded-full bg-white/[0.07]">
              <span
                className="block h-full rounded-full bg-white/18"
                style={{ width: name }}
              />
            </span>
            <span className="flex shrink-0 gap-[2px]">
              {[0, 1, 2, 3, 4].map((d) => (
                <span
                  key={d}
                  className={`h-1 w-1 rounded-full ${
                    d < streak ? "bg-burgundy-400" : "bg-white/12"
                  }`}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- crm */

const LEDGER = [
  { id: "#1042", customer: "92%", amount: "78%", state: "paid" },
  { id: "#1041", customer: "71%", amount: "54%", state: "due" },
  { id: "#1040", customer: "84%", amount: "66%", state: "paid" },
  { id: "#1039", customer: "58%", amount: "88%", state: "part" },
  { id: "#1038", customer: "76%", amount: "42%", state: "paid" },
];

const STATE_TONE: Record<string, string> = {
  paid: "bg-burgundy-400",
  due: "bg-white/25",
  part: "bg-burgundy-600",
};

function CrmPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.07] pb-1.5 font-mono text-[8px] tracking-[0.12em] text-chalk-faint uppercase">
        <span className="w-8 shrink-0">order</span>
        <span className="min-w-0 flex-1 truncate">customer</span>
        <span className="hidden w-10 shrink-0 sm:block">amount</span>
        <span className="w-7 shrink-0 text-right">state</span>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        {LEDGER.map(({ id, customer, amount, state }) => (
          <div key={id} className="flex min-w-0 items-center gap-2">
            <span className="w-8 shrink-0 font-mono text-[8px] text-chalk-mute">
              {id}
            </span>
            <span className="block h-1.5 min-w-0 flex-1 rounded-full bg-white/[0.07]">
              <span
                className="block h-full rounded-full bg-white/15"
                style={{ width: customer }}
              />
            </span>
            <span className="hidden h-1.5 w-10 shrink-0 rounded-full bg-white/[0.07] sm:block">
              <span
                className="block h-full rounded-full bg-burgundy-500/70"
                style={{ width: amount }}
              />
            </span>
            <span className="flex w-7 shrink-0 justify-end">
              <span
                className={`h-1.5 w-1.5 rounded-full ${STATE_TONE[state]}`}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="rule-t flex shrink-0 items-center justify-between gap-2 pt-2">
        <MicroLabel>ledger balance</MicroLabel>
        <span className="block h-1.5 w-12 shrink-0 rounded-full bg-burgundy-600/70" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- web */

function WebPanel() {
  return (
    <div className="relative flex h-full min-h-0 flex-col justify-between overflow-hidden">
      <div className="grid-backdrop absolute inset-0 opacity-30" />

      <div className="relative flex shrink-0 items-center gap-1.5">
        <span className="h-1.5 w-6 shrink-0 rounded-full bg-burgundy-500" />
        <span className="h-1 w-5 shrink-0 rounded-full bg-white/15" />
        <span className="h-1 w-4 shrink-0 rounded-full bg-white/12" />
        <span className="h-1 w-6 shrink-0 rounded-full bg-white/[0.08]" />
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center py-2"
        style={{ perspective: "720px" }}
      >
        <div
          className="relative h-full w-full max-w-[14rem]"
          style={{ transform: "rotateY(-20deg) rotateX(10deg)" }}
        >
          <span className="absolute top-[12%] left-0 h-[64%] w-[56%] rounded-lg border border-white/10 bg-gradient-to-br from-burgundy-700/70 to-ink-900" />
          <span className="absolute top-[26%] left-[22%] h-[60%] w-[56%] rounded-lg border border-white/12 bg-gradient-to-br from-burgundy-500/40 to-ink-850" />
          <span className="absolute top-[6%] left-[44%] h-[58%] w-[52%] rounded-lg border border-burgundy-400/35 bg-ink-850/90" />
        </div>
      </div>

      <div className="relative shrink-0 space-y-1.5">
        <span className="block h-2 w-[68%] rounded-full bg-white/18" />
        <span className="block h-1.5 w-[44%] rounded-full bg-white/10" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ video */

function VideoPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5">
      <div className="flex min-h-0 flex-1 items-stretch gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="min-h-0 flex-1 rounded-md border border-white/[0.08] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900" />
          <div className="relative h-3 shrink-0 overflow-hidden rounded-sm bg-white/[0.06]">
            <span className="absolute inset-y-0 left-[34%] w-[24%] rounded-sm border border-burgundy-400/70 bg-burgundy-700/50" />
          </div>
          <MicroLabel>transcript → hook</MicroLabel>
        </div>

        <span className="flex shrink-0 items-center text-burgundy-300">
          <svg
            viewBox="0 0 12 10"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 5h9M7 1.8 10.4 5 7 8.2" />
          </svg>
        </span>

        <div className="flex w-[22%] max-w-[4.5rem] shrink-0 flex-col justify-end rounded-md border border-burgundy-500/35 bg-gradient-to-b from-ink-800 to-burgundy-950 p-1.5">
          <span className="block h-1 w-full rounded-full bg-white/70" />
          <span className="mt-1 block h-1 w-2/3 rounded-full bg-white/35" />
        </div>
      </div>

      <MicroLabel>cpu / browser · no gpu</MicroLabel>
    </div>
  );
}
