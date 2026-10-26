import type { ComponentType } from "react";
import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";

import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

/** Gives the recipient a subject line that is already useful. */
const MAIL_SUBJECT = "AI engineering role — Monisha S.S.";
const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}`;

/** "https://github.com/monisha840" -> "github.com/monisha840" */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
}

const roles = [
  "AI Engineer",
  "Generative AI Engineer",
  "LLM Application Engineer",
  "AI Automation Engineer",
] as const;

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
}

const channels: Channel[] = [
  { label: "Email", value: site.email, href: mailtoHref, icon: Mail },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone },
  {
    label: "GitHub",
    value: prettyUrl(site.github),
    href: site.github,
    icon: GithubMark,
    external: true,
  },
  {
    label: "LinkedIn",
    value: prettyUrl(site.linkedin),
    href: site.linkedin,
    icon: LinkedinMark,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact" bleed>
      {/* cinematic backdrop — decorative only, fully clipped so it can never
          widen the page or swallow a focus ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-burgundy-700/20 blur-[130px] sm:h-[620px] sm:w-[620px]" />
        {/* oversized word — kept faint so it never competes with the copy
            sitting over it (see the location line at the foot of the section) */}
        <span className="absolute inset-x-0 -bottom-[6%] block select-none whitespace-nowrap text-center text-[20vw] font-bold leading-none tracking-[-0.06em] text-burgundy-950/70">
          CONTACT
        </span>
      </div>

      <div className="shell relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow mb-5">05 — Contact</p>
          <h2
            id="contact-heading"
            className="text-balance text-[length:var(--text-h1)] font-semibold leading-[0.98] tracking-[-0.04em]"
          >
            Have an interesting{" "}
            <span className="text-burgundy-300">AI problem</span> to solve?
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-chalk-dim sm:text-lg">
            I build LLM applications, retrieval pipelines, voice agents and
            automation that run in production. Send me the problem and I will
            tell you honestly whether I can build it.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-mute">
            Open to roles as
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {roles.map((role) => (
              <li key={role} className="min-w-0">
                <Pill tone="brand">{role}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={mailtoHref}>
              <Mail className="size-4 shrink-0" aria-hidden />
              Email me
            </ButtonLink>
            <ButtonLink
              href={site.resumePath}
              variant="ghost"
              prefetch={false}
              download={site.resumeFileName}
              aria-label="Download résumé (PDF)"
            >
              <Download className="size-4 shrink-0" aria-hidden />
              Download résumé
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <ul className="rule-t mt-14 grid gap-4 pt-14 sm:grid-cols-2 lg:mt-16 lg:pt-16">
            {channels.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label} className="min-w-0">
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  aria-label={`${label} — ${value}${
                    external ? " (opens in a new tab)" : ""
                  }`}
                  className="group flex h-full min-w-0 items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-burgundy-500/45 hover:bg-burgundy-700/10 sm:p-6"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-burgundy-300 transition-colors duration-300 group-hover:border-burgundy-500/50">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-mute">
                      {label}
                    </span>
                    <span className="mt-2 block break-all text-[13px] leading-snug text-chalk transition-colors duration-300 group-hover:text-burgundy-100 sm:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-chalk-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy-300"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-burgundy-300" aria-hidden />
              <span className="break-words normal-case tracking-normal">
                {site.location}
              </span>
            </span>
            <span className="break-words">Email reaches me fastest</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
