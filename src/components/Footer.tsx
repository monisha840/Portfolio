import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { navLinks, site } from "@/lib/site";

interface ExternalEntry {
  label: string;
  href: string;
  /** mailto:/download links stay in the same tab */
  external?: boolean;
  download?: string;
  ariaLabel: string;
}

const elsewhere: ExternalEntry[] = [
  {
    label: "GitHub",
    href: site.github,
    external: true,
    ariaLabel: "GitHub profile (opens in a new tab)",
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    external: true,
    ariaLabel: "LinkedIn profile (opens in a new tab)",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    ariaLabel: `Email ${site.name}`,
  },
  {
    label: "Résumé",
    href: site.resumePath,
    download: site.resumeFileName,
    ariaLabel: "Résumé (PDF download)",
  },
];

const linkClass =
  "inline-flex min-w-0 items-center gap-1.5 text-sm text-chalk-dim transition-colors duration-300 hover:text-chalk";

/**
 * Server component on purpose: the copyright year is computed during render,
 * so there is no client/server mismatch to hydrate.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule-t">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-[-0.02em] text-chalk">
              {site.name}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-burgundy-300">
              {site.role}
            </p>
            <p className="mt-5 break-words text-sm text-chalk-faint">
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-mute">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="min-w-0">
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Profiles and documents" className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-mute">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map(({ label, href, external, download, ariaLabel }) => (
                <li key={label} className="min-w-0">
                  <a
                    href={href}
                    aria-label={ariaLabel}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    {...(download ? { download } : {})}
                    className={linkClass}
                  >
                    {label}
                    <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rule-t mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6">
          <p className="min-w-0 break-words font-mono text-[11px] text-chalk-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="min-w-0 break-words font-mono text-[11px] text-chalk-faint">
            Next.js · TypeScript · Tailwind CSS
          </p>
          <Link
            href="/#home"
            className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-mute transition-colors duration-300 hover:text-burgundy-300"
          >
            Back to top
            <ArrowUp className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}
