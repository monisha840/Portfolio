import { ProjectCard } from "@/components/ProjectCard";
import { ProjectShowcaseRow } from "@/components/ProjectShowcaseRow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { showcaseProjects, stripProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <Section
      id="projects"
      eyebrow="02 — Projects"
      title={
        <>
          Systems, not{" "}
          <span className="text-burgundy-300">demos</span>.
        </>
      }
      lede="Nine builds across conversational voice AI, generative creative automation, assessment and reporting, healthcare operations and manufacturing. Each entry claims only what the project actually does — no invented metrics, and every interface composition here is an illustration rather than a screenshot."
    >
      <div className="min-w-0 space-y-20 sm:space-y-24">
        {/* ------------------------------- 01–06 · submerged-index rows */}
        <div className="min-w-0">
          {showcaseProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i === 0 ? 0 : 0.04} y={18}>
              <ProjectShowcaseRow project={project} first={i === 0} />
            </Reveal>
          ))}
        </div>

        {/* ----------------------------------- 07–09 · compact strip */}
        <div className="min-w-0">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Also built · in progress</p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-chalk-dim">
              Two content-managed corporate websites, and one product direction
              still being worked out in the open.
            </p>
          </Reveal>

          <div className="mt-12 grid min-w-0 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {stripProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={project.rank}
                variant="compact"
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default FeaturedProjects;
