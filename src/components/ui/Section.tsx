import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** mono eyebrow, e.g. "02 — Selected work" */
  eyebrow?: string;
  /** rendered as the section's h2 */
  title?: ReactNode;
  /** supporting paragraph under the title */
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  /** draw the hairline rule above the section */
  divider?: boolean;
  /** full-bleed sections opt out of the shell wrapper */
  bleed?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = "",
  divider = true,
  bleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={`relative scroll-mt-24 py-20 sm:py-24 lg:py-32 ${
        divider ? "rule-t" : ""
      } ${className}`}
    >
      <div className={bleed ? "" : "shell"}>
        {(eyebrow || title || lede) && (
          <header className="mb-12 max-w-3xl sm:mb-16">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2
                id={`${id}-heading`}
                className="text-balance text-[length:var(--text-h2)] font-semibold leading-[1.05] tracking-[-0.03em]"
              >
                {title}
              </h2>
            )}
            {lede && (
              <p className="mt-5 text-pretty text-base leading-relaxed text-chalk-dim sm:text-lg">
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
