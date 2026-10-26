import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

const paragraphs = [
  "I'm an AI automation and full-stack developer at Sirah Digital in Chennai, building AI-enabled SaaS for real clients. A model only earns its place once it's wired into the data, the tools and the failure cases around it.",
  "Mostly that is backend work: PostgreSQL schemas and multi-tenant data models, REST and WebSocket APIs on Node.js and Fastify, LLM and speech integrations, and the webhooks, queues and retries that decide what happens when a provider goes quiet.",
  "I work the whole lifecycle — requirements, UI, backend, Playwright end-to-end tests, Docker deployments — then the production support that follows a launch. I'd rather ship something that still behaves three weeks after the demo.",
];

const facts = [
  { label: "Based", value: site.location },
  {
    label: "Currently",
    value: "AI Automation Developer & Full-Stack Developer, Sirah Digital",
  },
  {
    label: "Education",
    value: "B.E. Computer Science and Engineering, 2026",
  },
] as const;

const targetRoles = [
  "AI Engineer",
  "Generative AI Engineer",
  "LLM Application Engineer",
  "AI Automation Engineer",
];

const dtClass =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint sm:w-24 sm:shrink-0 sm:pt-[0.2rem]";
const rowClass =
  "flex flex-col gap-2 border-t border-white/10 py-4 sm:flex-row sm:gap-6";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title={
        <>
          I build AI that works
          <br className="hidden lg:block" />{" "}
          <span className="text-burgundy-300">beyond the model</span>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7">
          {paragraphs.map((copy, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className={i === 0 ? undefined : "mt-6"}
            >
              <p
                className={
                  i === 0
                    ? "text-pretty text-lg leading-[1.6] text-chalk sm:text-[1.1875rem]"
                    : "text-pretty text-base leading-[1.75] text-chalk-dim sm:text-[1.0625rem]"
                }
              >
                {copy}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="min-w-0 lg:col-span-5" delay={0.16}>
          <aside className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="eyebrow">At a glance</h3>
            <dl className="mt-5">
              {facts.map((fact) => (
                <div key={fact.label} className={rowClass}>
                  <dt className={dtClass}>{fact.label}</dt>
                  <dd className="min-w-0 break-words text-sm leading-relaxed text-chalk-dim">
                    {fact.value}
                  </dd>
                </div>
              ))}
              <div className={rowClass}>
                <dt className={dtClass}>Open to</dt>
                <dd className="min-w-0">
                  <ul className="flex flex-wrap gap-2">
                    {targetRoles.map((role) => (
                      <li key={role} className="min-w-0">
                        <Pill tone="brand">{role}</Pill>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
