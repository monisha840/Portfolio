"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Specialties, each one backed by the resume. Kept as plain text, not badges. */
const SPECIALTIES = ["LLMs", "RAG", "Voice AI", "AI agents", "Automation"];

const GRID_MASK =
  "radial-gradient(ellipse 72% 62% at 48% 40%, #000 18%, transparent 76%)";

/** one definition for both plate instances: identical `src`, `srcset` and
    `sizes` mean the browser only ever fetches one derivative */
const PLATE_CLASS = "hero-figure__plate h-full w-full object-cover";
const PLATE_ALT = "Monisha S.S., Generative AI Engineer";

const plate = {
  src: "/monisha-editorial.webp",
  width: 1108,
  height: 1419,
  priority: true,
  sizes: "(max-width: 767px) 44vw, (max-width: 1024px) 52vw, 46vw",
} as const;

/** parallax travel in px at full pointer deflection */
const FIGURE_SHIFT = 9;
const WORD_SHIFT = 16;

export function Hero() {
  const reduce = useReducedMotion();

  const figureRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);

  /**
   * Pointer parallax. The figure and the word travel in opposite
   * directions by a few pixels, which is the whole depth cue — the planes
   * separate as you move rather than sitting on one sheet of glass.
   * Written straight to the DOM from one rAF loop; no React state, so a
   * pointer move never costs a render.
   */
  const p = useRef({
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    raf: 0,
    enabled: false,
  });

  const paint = useCallback(() => {
    const s = p.current;
    s.cx += (s.x - s.cx) * 0.065;
    s.cy += (s.y - s.cy) * 0.065;

    if (figureRef.current) {
      figureRef.current.style.transform = `translate3d(${(
        -s.cx * FIGURE_SHIFT
      ).toFixed(2)}px,${(-s.cy * (FIGURE_SHIFT * 0.6)).toFixed(2)}px,0)`;
    }
    if (wordRef.current) {
      wordRef.current.style.transform = `translate3d(${(
        s.cx * WORD_SHIFT
      ).toFixed(2)}px,${(s.cy * (WORD_SHIFT * 0.35)).toFixed(2)}px,0)`;
    }

    const settled =
      Math.abs(s.x - s.cx) < 0.001 && Math.abs(s.y - s.cy) < 0.001;
    s.raf = settled ? 0 : requestAnimationFrame(paint);
  }, []);

  useEffect(() => {
    const s = p.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");

    const rest = () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.x = s.y = s.cx = s.cy = 0;
      if (figureRef.current) figureRef.current.style.transform = "";
      if (wordRef.current) wordRef.current.style.transform = "";
    };

    const sync = () => {
      s.enabled = fine.matches && !still.matches && wide.matches;
      if (!s.enabled) rest();
    };

    const onMove = (event: PointerEvent) => {
      if (!s.enabled || event.pointerType !== "mouse") return;
      s.x = (event.clientX / window.innerWidth) * 2 - 1;
      s.y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!s.raf) s.raf = requestAnimationFrame(paint);
    };

    sync();
    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [paint]);

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.85,
      delay: reduce ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-24 sm:pt-28 md:pb-24 lg:pb-28"
    >
      {/* ---------- backdrop ----------
          A static grid and an atmospheric floor. Nothing here is blurred
          and nothing animates forever. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
        <div
          className="grid-backdrop absolute inset-[-10%] opacity-45"
          style={{ maskImage: GRID_MASK, WebkitMaskImage: GRID_MASK }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-burgundy-950 to-transparent opacity-75" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ---------- signature word ----------
          Set on the page grid, cut by the rule that opens the next
          section, and passed behind the figure so the crop reads as
          depth rather than as a word that ran out of room. */}
      <motion.div
        aria-hidden
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 hidden select-none md:block"
      >
        <div className="shell">
          <span ref={wordRef} className="hero-word font-black uppercase">
            Intelligence
          </span>
        </div>
      </motion.div>

      {/* ---------- portrait ----------
          One plate, placed twice: beside the intro on phones, and as a
          full editorial column bled off the right of the frame from `md`.
          Both instances carry the same `sizes`, so the browser fetches a
          single derivative. The disc behind her is a flat grey shape, not
          a light — see `.hero-disc`. */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
        className="pointer-events-none absolute -z-10 right-0 top-[13%] hidden aspect-[1108/1419] w-[52%] select-none md:block lg:w-[48%] xl:w-[44%] 2xl:w-[40%]"
      >
        <div ref={figureRef} className="hero-figure relative h-full w-full">
          <span aria-hidden className="hero-disc" />
          <Image
            {...plate}
            alt={PLATE_ALT}
            className={`${PLATE_CLASS} object-[center_18%]`}
          />
        </div>
      </motion.div>

      {/* film grain, over the image planes and under the copy */}
      <div
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0 -z-[6] hidden md:block"
      />

      {/* ---------- content ---------- */}
      <div className="shell relative">
        <div className="relative max-w-xl md:max-w-[52%] lg:max-w-[34rem] xl:max-w-[40rem] 2xl:max-w-[44rem]">
          {/* phones: the plate sits beside the intro rather than behind it,
              anchored to the copy block so it always lines up with the
              eyebrow no matter where the column lands vertically */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
            className="pointer-events-none float-right mb-3 ml-5 w-[38%] max-w-[10.5rem] select-none md:hidden"
          >
            <div className="hero-figure relative aspect-square w-full">
              <span aria-hidden className="hero-disc" />
              <Image
                {...plate}
                alt={PLATE_ALT}
                className={`${PLATE_CLASS} object-[center_10%]`}
              />
            </div>
          </motion.div>

          <motion.p
            {...rise(0.05)}
            className="eyebrow mb-5 flex items-center gap-3 max-sm:tracking-[0.13em]"
          >
            <span aria-hidden className="hidden h-px w-8 bg-burgundy-400/70 sm:block" />
            {site.role}
          </motion.p>

          {/* the signature line — kept deliberately below the statement it
              introduces, since the navbar already carries the name */}
          <motion.p
            {...rise(0.12)}
            className="font-semibold leading-tight tracking-[-0.02em] text-chalk"
            style={{ fontSize: "clamp(1.375rem, 2.1vw, 1.875rem)" }}
          >
            Monisha <span className="text-burgundy-300">S.S.</span>
          </motion.p>

          {/* the engineering statement — the page's h1 and its loudest voice */}
          <motion.h1
            {...rise(0.2)}
            className="mt-4 text-balance font-semibold leading-[1.06] tracking-[-0.035em] text-chalk sm:mt-5"
            style={{ fontSize: "clamp(2rem, 4.05vw, 3.5rem)" }}
          >
            <span>I build AI systems</span>{" "}
            {/* the break lands on the clause rather than stranding "that" */}
            <span className="md:block">
              that solve <span className="text-burgundy-300">real problems</span>
              .
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.28)}
            className="mt-5 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-chalk-dim sm:mt-6 sm:text-base"
          >
            LLM applications, voice agents and speech pipelines — and the
            engineering that puts them into production.
          </motion.p>

          {/* technical identity */}
          <motion.ul
            {...rise(0.36)}
            aria-label="Technical specialties"
            className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-chalk-mute sm:gap-x-3 sm:text-[11px] sm:tracking-[0.18em]"
          >
            {SPECIALTIES.map((item, i) => (
              /* the separator trails its item, so a wrap never leaves an
                 orphaned slash at the start of the next line */
              <li key={item} className="flex items-center whitespace-nowrap">
                {item}
                {i < SPECIALTIES.length - 1 && (
                  <span aria-hidden className="ml-2 text-burgundy-500 sm:ml-3">
                    /
                  </span>
                )}
              </li>
            ))}
          </motion.ul>

          {/* actions */}
          <motion.div
            {...rise(0.44)}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-burgundy-600 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-burgundy-500"
            >
              Explore my work
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={site.resumePath}
              download={site.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-chalk transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.06]"
            >
              <Download size={15} aria-hidden />
              Download résumé
            </a>
          </motion.div>

          <motion.div
            {...rise(0.52)}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Monisha S.S. on GitHub (opens in a new tab)"
              className="text-chalk-mute transition-colors duration-300 hover:text-burgundy-300"
            >
              <GithubMark size={18} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Monisha S.S. on LinkedIn (opens in a new tab)"
              className="text-chalk-mute transition-colors duration-300 hover:text-burgundy-300"
            >
              <LinkedinMark size={18} />
            </a>
            <span aria-hidden className="h-px w-6 bg-white/12" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-chalk-mute sm:text-[11px]">
              Chennai, India
            </span>
          </motion.div>
        </div>
      </div>

      {/* ---------- scroll cue ---------- */}
      <motion.a
        {...rise(0.62)}
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-chalk-mute transition-colors duration-300 hover:text-chalk md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span
          aria-hidden
          className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/20 pt-2"
        >
          <ArrowDown
            size={11}
            className="motion-safe:animate-[scroll-cue_1.9s_ease-in-out_infinite]"
          />
        </span>
      </motion.a>
    </section>
  );
}

export default Hero;
