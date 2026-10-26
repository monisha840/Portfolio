"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

/** "/#projects" -> "projects" */
const sectionId = (href: string) => href.split("#")[1] ?? "";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** empty on routes that have no sections (e.g. a case study) */
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active-section tracking for the nav underline.
     Keyed on the pathname: this component lives in the layout, so it survives
     client-side navigation and has to re-evaluate when the route changes. */
  useEffect(() => {
    const ids = navLinks.map((l) => sectionId(l.href));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    // no sections on this route (e.g. a case study) — clear the highlight
    if (!sections.length) {
      setActive("");
      return;
    }
    setActive(sections[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  /* lock scroll behind the mobile sheet */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-burgundy-700 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-black/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]"
        >
          <Link
            href="/#home"
            aria-label="Monisha S.S. — back to the top of the page"
            className="group flex items-baseline gap-2 font-mono text-sm tracking-tight"
          >
            <span className="font-semibold text-chalk">Monisha</span>
            <span className="text-burgundy-300">S.S.</span>
          </Link>

          {/* desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === sectionId(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 lg:px-4 ${
                      isActive
                        ? "text-chalk"
                        : "text-chalk-mute hover:text-chalk"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-burgundy-500/40 bg-burgundy-700/25"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={site.resumePath}
            download={site.resumeFileName}
            className="hidden rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-dim transition-colors duration-300 hover:border-burgundy-400/60 hover:text-chalk md:inline-block"
          >
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-chalk transition-colors hover:border-white/30 md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-1 pb-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.05 + i * 0.05,
                    duration: 0.4,
                  }}
                  className="border-b border-white/[0.06] py-4 text-2xl font-medium tracking-tight text-chalk-dim transition-colors active:text-burgundy-300"
                >
                  <span className="mr-4 font-mono text-xs text-burgundy-300">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <a
                href={site.resumePath}
                download={site.resumeFileName}
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex w-fit rounded-full bg-burgundy-700 px-6 py-3 text-sm font-medium text-white"
              >
                Download résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
