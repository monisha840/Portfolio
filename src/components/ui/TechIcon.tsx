import {
  AudioLines,
  AudioWaveform,
  Braces,
  Cable,
  CalendarClock,
  Database,
  Drama,
  FlaskConical,
  Layers,
  MessagesSquare,
  Mic,
  Network,
  PhoneCall,
  Plug,
  ListOrdered,
  ScanSearch,
  SlidersHorizontal,
  Terminal,
  Volume2,
  Webhook,
  type LucideIcon,
} from "lucide-react";

import { brandPaths, type BrandSlug } from "@/components/ui/brand-paths";

/**
 * Neutral glyphs, used only where a technology has no official mark we can
 * legitimately inline. They are deliberately generic line icons so they never
 * read as a logo.
 */
const neutralIcons = {
  audioLines: AudioLines,
  braces: Braces,
  cable: Cable,
  calendarClock: CalendarClock,
  database: Database,
  drama: Drama,
  flask: FlaskConical,
  layers: Layers,
  messages: MessagesSquare,
  mic: Mic,
  network: Network,
  phone: PhoneCall,
  plug: Plug,
  queue: ListOrdered,
  scanSearch: ScanSearch,
  sliders: SlidersHorizontal,
  terminal: Terminal,
  volume: Volume2,
  waveform: AudioWaveform,
  webhook: Webhook,
} satisfies Record<string, LucideIcon>;

export type NeutralGlyph = keyof typeof neutralIcons;

/**
 * A glyph reference kept as a plain string so the skills data stays pure data:
 * `"brand:nextjs"` resolves to an official mark, `"icon:webhook"` to a neutral
 * line icon.
 */
export type TechGlyph = `brand:${BrandSlug}` | `icon:${NeutralGlyph}`;

/**
 * Renders a technology glyph at a fixed 20x20 box so brand marks (solid, 24
 * viewBox) and lucide icons (stroked, 24 viewBox) sit on the same optical
 * baseline. Always decorative — the tile prints the technology name next to it.
 */
export function TechIcon({
  glyph,
  className = "",
}: {
  glyph: TechGlyph;
  className?: string;
}) {
  const [kind, key] = glyph.split(":") as ["brand" | "icon", string];

  if (kind === "brand") {
    return (
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path d={brandPaths[key as BrandSlug].path} />
      </svg>
    );
  }

  const Icon = neutralIcons[key as NeutralGlyph];
  return (
    <Icon
      size={20}
      strokeWidth={1.5}
      aria-hidden="true"
      focusable="false"
      className={className}
    />
  );
}
