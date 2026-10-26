import { Award, GraduationCap } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { education, recognition } from "@/data/experience";

const labelClass =
  "flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint";
const iconClass = "h-3.5 w-3.5 shrink-0 text-burgundy-300";

/**
 * Education + recognition. Rendered inside the experience section, so it
 * exposes `h3` headings rather than its own `<Section>` wrapper.
 */
export function Education() {
  return (
    <div className="min-w-0 space-y-10">
      <Reveal delay={0.12}>
        <div className="border-t border-white/10 pt-7">
          <h3 className={labelClass}>
            <GraduationCap aria-hidden="true" className={iconClass} strokeWidth={1.75} />
            Education
          </h3>
          <ul className="mt-6 space-y-7">
            {education.map((entry) => (
              <li key={entry.institution} className="min-w-0">
                <p className="text-pretty text-base font-medium leading-snug tracking-[-0.01em] text-chalk">
                  {entry.qualification}
                </p>
                <p className="mt-2 break-words text-sm leading-relaxed text-chalk-dim">
                  {entry.institution}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-chalk-mute">
                  <span className="text-chalk-faint">Graduated</span>
                  <time dateTime={entry.dateTime} className="text-chalk-dim">
                    {entry.period}
                  </time>
                  <span aria-hidden="true" className="text-chalk-faint">
                    ·
                  </span>
                  <span>{entry.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="border-t border-white/10 pt-7">
          <h3 className={labelClass}>
            <Award aria-hidden="true" className={iconClass} strokeWidth={1.75} />
            Recognition
          </h3>
          <ul className="mt-6 space-y-7">
            {recognition.map((entry) => (
              <li key={entry.title} className="min-w-0">
                <p className="text-pretty text-base font-medium leading-snug tracking-[-0.01em] text-chalk">
                  {entry.title}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-burgundy-300">
                  {entry.issuer}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-chalk-mute">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
