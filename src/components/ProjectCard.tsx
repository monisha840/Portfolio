import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectMockup } from "@/components/ProjectMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { firstSentence } from "@/lib/text";
import type { Project, ProjectStatus } from "@/lib/types";

type Variant = "flagship" | "row" | "compact";

interface ProjectCardProps {
  project: Project;
  /** 1-based display number shown in the index label */
  index: number;
  variant: Variant;
  /** desktop only: place the mockup on the right instead of the left */
  flip?: boolean;
  /** stagger offset handed to Reveal */
  delay?: number;
}

export function ProjectCard({
  project,
  index,
  variant,
  flip = false,
  delay = 0,
}: ProjectCardProps) {
  if (variant === "flagship") {
    return <Flagship project={project} index={index} delay={delay} />;
  }
  if (variant === "compact") {
    return <Compact project={project} index={index} delay={delay} />;
  }
  return <Row project={project} index={index} flip={flip} delay={delay} />;
}

/* --------------------------------------------------------------- flagship */

function Flagship({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  return (
    <Reveal as="article" delay={delay} className="group relative min-w-0">
      {/* decorative bloom — clipped so it can never widen the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-28 -right-16 h-64 w-64 rounded-full bg-burgundy-700/15 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative grid min-w-0 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <MetaRow project={project} index={index} accent />

          <h3 className="mt-6 text-pretty text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-[12px] tracking-[0.04em] text-burgundy-300">
            {project.kicker}
          </p>

          <p className="mt-6 text-pretty text-base leading-relaxed text-chalk-dim">
            {project.summary}
          </p>

          <TagRow tags={project.tags} className="mt-7" />
          <TechList
            stack={project.stack}
            status={project.status}
            className="mt-8"
          />

          {project.caseStudy && (
            <ButtonLink
              href={`/work/${project.slug}`}
              variant="ghost"
              className="mt-9"
            >
              View case study
              <span className="sr-only">: {project.title}</span>
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          )}
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ProjectMockup
            kind={project.mockup}
            className="aspect-[4/3] w-full sm:aspect-[16/10]"
          />
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------- row */

function Row({
  project,
  index,
  flip,
  delay,
}: {
  project: Project;
  index: number;
  flip: boolean;
  delay: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group rule-t min-w-0 pt-10 sm:pt-14"
    >
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <MetaRow project={project} index={index} />

          <h3 className="mt-5 text-pretty text-[length:var(--text-h3)] leading-[1.15] font-semibold tracking-[-0.025em]">
            {project.title}
          </h3>
          <p className="mt-2.5 font-mono text-[12px] tracking-[0.04em] text-burgundy-300">
            {project.kicker}
          </p>

          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-chalk-dim">
            {project.summary}
          </p>

          <TagRow tags={project.tags} className="mt-6" />
          <TechList
            stack={project.stack}
            status={project.status}
            className="mt-7"
          />

          {project.caseStudy && (
            <div className="mt-7">
              <CaseStudyLink project={project} />
            </div>
          )}
        </div>

        <div className={`min-w-0 ${flip ? "" : "lg:order-first"}`}>
          <ProjectMockup
            kind={project.mockup}
            className="aspect-[4/3] w-full transition-transform duration-500 ease-[var(--ease-out-expo)] sm:aspect-[16/11] lg:group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- compact */

function Compact({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  const visibleStack = project.stack.slice(0, 4);
  const hiddenCount = project.stack.length - visibleStack.length;

  return (
    <Reveal
      as="article"
      delay={delay}
      className="group rule-t flex min-w-0 flex-col gap-5 pt-7"
    >
      <MetaRow project={project} index={index} />

      <ProjectMockup
        kind={project.mockup}
        className="h-32 w-full transition-transform duration-500 ease-[var(--ease-out-expo)] sm:h-36 lg:group-hover:-translate-y-1"
      />

      <div className="min-w-0">
        <h3 className="text-pretty text-lg leading-snug font-semibold tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-burgundy-300">
          {project.kicker}
        </p>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-chalk-mute">
          {firstSentence(project.summary)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
          {visibleStack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[11px] leading-none break-words text-chalk-dim"
            >
              {tech}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="font-mono text-[11px] leading-none text-chalk-faint">
              +{hiddenCount}
            </li>
          )}
        </ul>

        {project.caseStudy && (
          <div className="mt-5">
            <CaseStudyLink project={project} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ parts */

function MetaRow({
  project,
  index,
  accent = false,
}: {
  project: Project;
  index: number;
  accent?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
      <span
        className={`font-mono text-[11px] tracking-[0.22em] ${
          accent ? "text-burgundy-300" : "text-chalk-faint"
        }`}
      >
        {String(index).padStart(2, "0")}
      </span>
      <StatusPill status={project.status} />
      <span className="font-mono text-[11px] tracking-[0.14em] text-chalk-mute">
        {project.year}
      </span>
      {accent && (
        <span className="eyebrow" aria-label="Flagship project">
          Flagship
        </span>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <Pill tone={status === "Production" ? "brand" : "default"}>
      <span className="sr-only">Status: </span>
      {status}
    </Pill>
  );
}

function TagRow({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={`flex min-w-0 flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="min-w-0">
          <Pill>{tag}</Pill>
        </li>
      ))}
    </ul>
  );
}

export function TechList({
  stack,
  status,
  className = "",
}: {
  stack: string[];
  status: ProjectStatus;
  className?: string;
}) {
  const label = status === "In progress" ? "Tooling explored" : "Stack";

  return (
    <div className={`min-w-0 ${className}`}>
      <p className="font-mono text-[10px] tracking-[0.22em] text-chalk-mute uppercase">
        {label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="font-mono text-[11px] leading-none break-words text-chalk-dim"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group/cs inline-flex max-w-full items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-burgundy-300 uppercase transition-colors duration-300 hover:text-burgundy-200"
    >
      <span className="border-b border-burgundy-500/40 pb-0.5 transition-colors duration-300 group-hover/cs:border-burgundy-300">
        View case study
        <span className="sr-only">: {project.title}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5"
      />
    </Link>
  );
}
