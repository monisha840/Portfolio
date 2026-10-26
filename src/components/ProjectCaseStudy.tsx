import Link from "next/link";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { ProjectMockup } from "@/components/ProjectMockup";
import { TechList } from "@/components/ProjectCard";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/types";

interface ProjectCaseStudyProps {
  project: Project;
  prev?: Project;
  next?: Project;
}

export function ProjectCaseStudy({
  project,
  prev,
  next,
}: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;

  return (
    <main id="main-content" className="min-w-0 pt-28 pb-24 sm:pt-32 sm:pb-32">
      <div className="shell min-w-0">
        {/* ------------------------------------------------------- back */}
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-chalk-mute uppercase transition-colors duration-300 hover:text-chalk"
          >
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to projects
          </Link>
        </Reveal>

        {/* ----------------------------------------------------- header */}
        <Reveal delay={0.04} className="mt-10 max-w-4xl min-w-0 sm:mt-12">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[11px] tracking-[0.22em] text-burgundy-300">
              {String(project.rank).padStart(2, "0")}
            </span>
            <Pill tone={project.status === "Production" ? "brand" : "default"}>
              <span className="sr-only">Status: </span>
              {project.status}
            </Pill>
            <span className="font-mono text-[11px] tracking-[0.14em] text-chalk-mute">
              {project.year}
            </span>
          </div>

          <h1 className="mt-6 text-balance text-[length:var(--text-h1)] leading-[1.03] font-semibold tracking-[-0.03em]">
            {project.title}
          </h1>
          <p className="mt-4 font-mono text-[13px] tracking-[0.04em] text-burgundy-300">
            {project.kicker}
          </p>
          <p className="mt-7 text-pretty text-base leading-relaxed text-chalk-dim sm:text-lg">
            {project.summary}
          </p>

          <ul className="mt-7 flex min-w-0 flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="min-w-0">
                <Pill>{tag}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ----------------------------------------------------- mockup */}
        <Reveal delay={0.06} className="mt-14 max-w-5xl min-w-0 sm:mt-16">
          <ProjectMockup
            kind={project.mockup}
            className="aspect-[4/3] w-full sm:aspect-[16/9]"
          />
        </Reveal>

        {/* ------------------------------------------------------- body */}
        <div className="mt-16 grid min-w-0 gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          <aside className="min-w-0 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <TechList stack={project.stack} status={project.status} />

            <dl className="rule-t mt-8 space-y-4 pt-8">
              <div className="min-w-0">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-chalk-mute uppercase">
                  Status
                </dt>
                <dd className="mt-2 text-sm text-chalk-dim">
                  {project.status}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-chalk-mute uppercase">
                  Period
                </dt>
                <dd className="mt-2 text-sm text-chalk-dim">{project.year}</dd>
              </div>
            </dl>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            {caseStudy && (
              <>
                <Reveal className="min-w-0">
                  <h2 className="eyebrow">The problem</h2>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-chalk sm:text-xl sm:leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </Reveal>

                <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-14">
                  {caseStudy.sections.map((section, i) => (
                    <Reveal
                      key={section.heading}
                      delay={Math.min(i * 0.04, 0.16)}
                      className="rule-t min-w-0 pt-8"
                    >
                      <h2 className="text-pretty text-[length:var(--text-h3)] leading-[1.2] font-semibold tracking-[-0.025em]">
                        {section.heading}
                      </h2>
                      <p className="mt-5 text-pretty text-base leading-relaxed text-chalk-dim">
                        {section.body}
                      </p>

                      {section.points && (
                        <ul className="mt-6 space-y-3">
                          {section.points.map((point) => (
                            <li
                              key={point}
                              className="flex min-w-0 gap-3 text-[15px] leading-relaxed text-chalk-dim"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.6em] h-px w-3 shrink-0 bg-burgundy-500"
                              />
                              <span className="min-w-0 break-words">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Reveal>
                  ))}
                </div>

                {caseStudy.note && (
                  <Reveal className="mt-14 min-w-0 sm:mt-16">
                    <aside className="min-w-0 rounded-xl border border-burgundy-500/30 border-l-2 border-l-burgundy-500 bg-burgundy-950/50 p-5 sm:p-7">
                      <p className="flex min-w-0 items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-burgundy-200 uppercase">
                        <Info aria-hidden className="h-3.5 w-3.5 shrink-0" />
                        Scope &amp; accuracy note
                      </p>
                      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-chalk-dim">
                        {caseStudy.note}
                      </p>
                    </aside>
                  </Reveal>
                )}
              </>
            )}
          </div>
        </div>

        {/* --------------------------------------------- prev / next nav */}
        {(prev || next) && (
          <Reveal className="rule-t mt-20 min-w-0 pt-8 sm:mt-24">
            <nav
              aria-label="Case study navigation"
              className="grid min-w-0 gap-6 sm:grid-cols-2 sm:gap-8"
            >
              {prev ? (
                <NeighbourLink project={prev} direction="prev" />
              ) : (
                <span aria-hidden />
              )}
              {next && <NeighbourLink project={next} direction="next" />}
            </nav>
          </Reveal>
        )}
      </div>
    </main>
  );
}

function NeighbourLink({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group min-w-0 rounded-xl border border-white/10 p-5 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.03] sm:p-6 ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <span
        className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-chalk-mute uppercase ${
          isNext ? "sm:justify-end" : ""
        }`}
      >
        {!isNext && (
          <ArrowLeft
            aria-hidden
            className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        )}
        {isNext ? "Next project" : "Previous project"}
        {isNext && (
          <ArrowRight
            aria-hidden
            className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
      </span>
      <span className="mt-3 block text-pretty text-base leading-snug font-medium break-words text-chalk transition-colors duration-300 group-hover:text-burgundy-200 sm:text-lg">
        {project.title}
      </span>
      <span className="mt-1.5 block font-mono text-[11px] break-words text-chalk-mute">
        {project.kicker}
      </span>
    </Link>
  );
}
