import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main id="main-content" className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy-700/20 blur-[130px] sm:h-[560px] sm:w-[560px]"
      />

      <div className="shell relative">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="text-[length:var(--text-display)] font-bold leading-[0.82] tracking-[-0.055em]">
          404
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-chalk-dim sm:text-lg">
          This page does not exist — most likely an old link or a typo in the
          URL. Everything else is still exactly where it should be.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Back to home
          </ButtonLink>
          <ButtonLink href="/#projects" variant="ghost">
            View the projects
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </ButtonLink>
        </div>

        <p className="mt-14 break-words font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
          {site.name} — {site.role}
        </p>
      </div>
    </main>
  );
}
