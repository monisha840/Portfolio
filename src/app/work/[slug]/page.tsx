import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import {
  caseStudyProjects,
  getProject,
  getProjectNeighbours,
} from "@/data/projects";
import { site } from "@/lib/site";

interface ProjectPageProps {
  /** Next 15: route params arrive as a promise */
  params: Promise<{ slug: string }>;
}

/** Statically generate every project that has a case study. */
export function generateStaticParams(): { slug: string }[] {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

function clampText(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    return {
      title: `Project not found · ${site.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title} — ${project.kicker}`;
  const description = clampText(project.summary);

  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const { prev, next } = getProjectNeighbours(slug);

  return <ProjectCaseStudy project={project} prev={prev} next={next} />;
}
