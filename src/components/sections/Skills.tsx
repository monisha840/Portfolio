import type { ReactNode } from "react";

import { CapabilityMeter } from "@/components/ui/CapabilityMeter";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { capabilities, capabilityTotal, techPanels } from "@/data/skills";

/**
 * Per-panel layout. Kept here rather than in the data file so the content
 * stays presentation-free — these are complete literal class strings so
 * Tailwind's scanner still sees them.
 */
const layout: Record<string, { span: string; cols: string }> = {
  "ai-stack": {
    span: "sm:col-span-12 lg:col-span-5",
    cols: "grid-cols-2 min-[360px]:grid-cols-3",
  },
  programming: {
    span: "sm:col-span-12 md:col-span-5 lg:col-span-4",
    cols: "grid-cols-2 min-[360px]:grid-cols-4 md:grid-cols-2",
  },
  "backend-data": {
    span: "sm:col-span-12 md:col-span-7 lg:col-span-8",
    cols: "grid-cols-2 min-[360px]:grid-cols-3 lg:grid-cols-4",
  },
  frontend: {
    span: "sm:col-span-12 md:col-span-5 lg:col-span-4",
    cols: "grid-cols-2 min-[360px]:grid-cols-3 md:grid-cols-2",
  },
  delivery: {
    span: "sm:col-span-12 md:col-span-7 lg:col-span-8",
    cols: "grid-cols-2 min-[360px]:grid-cols-3 lg:grid-cols-5",
  },
};

/** Shared dashboard panel chrome: hairline border, mono label, item count. */
function Panel({
  index,
  title,
  blurb,
  count,
  className = "",
  children,
}: {
  index: number;
  title: string;
  blurb: string;
  count: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col rounded-xl border border-white/[0.09] bg-white/[0.018] p-5 sm:p-6 ${className}`}
    >
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 font-mono text-[10.5px] uppercase leading-normal tracking-[0.2em] text-burgundy-300">
          <span aria-hidden="true" className="text-chalk-faint">
            {String(index).padStart(2, "0")} /{" "}
          </span>
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[10px] tabular-nums text-chalk-faint"
        >
          {count}
        </span>
      </header>

      <div aria-hidden="true" className="mt-3 h-px bg-white/[0.07]" />

      <p className="mt-3.5 text-pretty text-[12.5px] leading-relaxed text-chalk-mute">
        {blurb}
      </p>

      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </article>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="03 — Skills"
      title={
        <>
          Technologies and{" "}
          <span className="text-burgundy-300">areas of experience</span>.
        </>
      }
      lede="Grouped by what they do, not ranked. Some I work in daily; some I have shipped once and would reach for again."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-4">
        {/* ---------------------------------------------- 01 capabilities */}
        <Reveal className="min-w-0 sm:col-span-12 lg:col-span-7">
          <Panel
            index={1}
            title="AI engineering"
            blurb="Each meter marks the projects here that use the capability — applied use, not a proficiency score."
            count={capabilities.length}
            className="h-full"
          >
            <ul className="space-y-5">
              {capabilities.map((capability, i) => (
                <li key={capability.id} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 text-pretty text-[13px] leading-snug text-chalk-dim">
                      {capability.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums tracking-wider text-chalk-faint">
                      <span aria-hidden="true">
                        {capability.evidence.length}
                        <span className="text-white/20">/</span>
                        {capabilityTotal}
                      </span>
                      <span className="sr-only">
                        {`used in ${capability.evidence.length} of ${capabilityTotal} projects on this site`}
                      </span>
                    </span>
                  </div>
                  <CapabilityMeter
                    filled={capability.evidence.length}
                    total={capabilityTotal}
                    delay={i * 0.05}
                  />
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* --------------------------------------------- 02–06 tech panels */}
        {techPanels.map((panel, i) => {
          const { span, cols } = layout[panel.id];

          return (
            <Reveal
              key={panel.id}
              delay={i === 0 ? 0.08 : 0.06}
              className={`min-w-0 ${span}`}
            >
              <Panel
                index={i + 2}
                title={panel.title}
                blurb={panel.blurb}
                count={panel.items.length}
                className="h-full"
              >
                <ul className={`grid flex-1 auto-rows-fr gap-2 ${cols}`}>
                  {panel.items.map((item) => (
                    <li key={item.name} className="min-w-0">
                      <div className="group flex h-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.022] px-1.5 py-3 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-px hover:border-burgundy-500/45 hover:bg-burgundy-700/15">
                        <TechIcon
                          glyph={item.glyph}
                          className="shrink-0 text-chalk-dim transition-colors duration-200 group-hover:text-burgundy-200"
                        />
                        <span className="flex min-h-[2.2em] w-full items-center justify-center text-pretty break-words text-center text-[11px] leading-[1.1] text-chalk-dim transition-colors duration-200 group-hover:text-chalk">
                          {item.full ? (
                            <>
                              <span aria-hidden="true">{item.name}</span>
                              <span className="sr-only">{item.full}</span>
                            </>
                          ) : (
                            item.name
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
