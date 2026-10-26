import { Education } from "@/components/sections/Education";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      eyebrow="04 — Experience"
      title={
        <>
          Building AI products at{" "}
          <span className="text-burgundy-300">Sirah Digital</span>.
        </>
      }
      lede="One role, deliberately broad — owned from requirements and schema design through deployment and production support."
    >
      <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="min-w-0 lg:col-span-8">
          <ol className="space-y-20">
            {experience.map((role, i) => (
              <Reveal
                as="li"
                key={`${role.company}-${role.startDateTime}`}
                delay={i * 0.08}
                className="relative min-w-0 pl-7 sm:pl-10"
              >
                {/* hairline rail + node */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 top-[0.6rem] w-px bg-linear-to-b from-burgundy-500/80 via-white/10 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-[-3px] top-[0.5rem] h-[7px] w-[7px] rounded-full bg-burgundy-400 shadow-[0_0_0_4px_#000,0_0_16px_2px_var(--color-burgundy-600)]"
                />

                <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-x-10">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-chalk-mute">
                    <time dateTime={role.startDateTime}>{role.startLabel}</time>
                    <span aria-hidden="true" className="mx-1.5 text-chalk-faint">
                      —
                    </span>
                    <span className="text-burgundy-300">{role.endLabel}</span>
                  </p>

                  <div className="mt-5 min-w-0 lg:mt-0">
                    <h3 className="text-balance text-[length:var(--text-h3)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      {role.role}
                    </h3>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-chalk-mute">
                      <span className="text-chalk-dim">{role.company}</span>
                      <span aria-hidden="true" className="text-chalk-faint">
                        ·
                      </span>
                      <span>{role.location}</span>
                    </p>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-chalk-dim">
                      {role.summary}
                    </p>

                    <p className="eyebrow mt-9">Scope of work</p>
                    <ul className="mt-5 space-y-4 border-t border-white/10 pt-6">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex min-w-0 gap-3.5 sm:gap-4"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6rem] h-px w-3 shrink-0 bg-burgundy-500/70 sm:w-4"
                          />
                          <span className="min-w-0 text-pretty text-sm leading-relaxed text-chalk-dim sm:text-[0.9375rem]">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="min-w-0 lg:col-span-4">
          <Education />
        </div>
      </div>
    </Section>
  );
}
