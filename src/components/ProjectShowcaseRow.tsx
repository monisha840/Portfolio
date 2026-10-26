"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ProjectMockup } from "@/components/ProjectMockup";
import { Pill } from "@/components/ui/Pill";
import { firstSentence } from "@/lib/text";
import type { Project } from "@/lib/types";

/* ------------------------------------------------------------------
   Motion constants.

   Everything the pointer drives is deterministic: a letter's displacement
   is a pure function of its distance from the cursor and the row's hover
   progress. Nothing is randomised per frame, and the numbers below are the
   ceiling of the whole effect — the title stays readable at every value.
   ------------------------------------------------------------------ */

/** px of influence either side of the cursor along the title */
const WAVE_RADIUS = 160;
/** vertical distance is weighted up so a wave stays on the hovered line */
const WAVE_Y_WEIGHT = 1.9;
/** peak letter lift, px */
const LIFT = 9;
/** peak letter push toward the viewer, px */
const DEPTH = 26;
/** peak letter rotation, deg */
const TILT_X = 13;
const TILT_Y = 12;
/** peak letter scale increase */
const SCALE = 0.045;
/** how far a weight can sit from its target before we call the row settled */
const EPSILON = 0.002;
/** stack entries shown before the row collapses the rest into a count */
const MAX_STACK = 5;

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

/** Words, each split into characters. The last word carries the accent. */
function splitTitle(title: string) {
  const words = title.split(/\s+/).filter(Boolean);
  let i = 0;
  return words.map((word, wi) => ({
    word,
    accent: wi === words.length - 1 && words.length > 1,
    chars: Array.from(word).map((ch) => ({ ch, i: i++ })),
  }));
}

interface ProjectShowcaseRowProps {
  project: Project;
  /** draws the hairline above the first row; every other row inherits the
      rule of the row above it */
  first?: boolean;
}

export function ProjectShowcaseRow({
  project,
  first = false,
}: ProjectShowcaseRowProps) {
  const rowRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = useMemo(() => splitTitle(project.title), [project.title]);
  const charCount = useMemo(
    () => words.reduce((n, w) => n + w.chars.length, 0),
    [words],
  );

  const anim = useRef({
    /** viewport coordinates of the last pointer sample */
    x: 0,
    y: 0,
    /** 1 while the pointer is inside the row */
    target: 0,
    /** eased hover progress */
    hover: 0,
    /** per-character eased weights */
    weights: [] as number[],
    raf: 0,
    /** false on touch/coarse pointers and under prefers-reduced-motion */
    enabled: false,
  });

  /** Return every letter and the row's own custom properties to rest. */
  const reset = useCallback(() => {
    const a = anim.current;
    if (a.raf) cancelAnimationFrame(a.raf);
    a.raf = 0;
    a.hover = 0;
    a.target = 0;
    a.weights.fill(0);
    for (const el of charsRef.current) {
      if (el) el.style.transform = "";
    }
    const row = rowRef.current;
    if (row) {
      row.style.setProperty("--p-hover", "0");
      row.style.setProperty("--p-mx", "0");
      row.style.setProperty("--p-my", "0");
    }
  }, []);

  const frame = useCallback(() => {
    const a = anim.current;
    const row = rowRef.current;
    const title = titleRef.current;
    if (!row || !title) {
      a.raf = 0;
      return;
    }

    a.hover += (a.target - a.hover) * 0.16;

    const rowBox = row.getBoundingClientRect();
    const titleBox = title.getBoundingClientRect();

    const mx = clamp(((a.x - rowBox.left) / (rowBox.width || 1)) * 2 - 1, -1, 1);
    const my = clamp(((a.y - rowBox.top) / (rowBox.height || 1)) * 2 - 1, -1, 1);

    row.style.setProperty("--p-hover", a.hover.toFixed(4));
    row.style.setProperty("--p-mx", (mx * a.hover).toFixed(4));
    row.style.setProperty("--p-my", (my * a.hover).toFixed(4));

    /* pointer position in the title's own coordinate space — `offsetLeft`
       is measured against the title, which is the nearest positioned
       ancestor, so neither value is affected by scrolling */
    const px = a.x - titleBox.left;
    const py = a.y - titleBox.top;

    const chars = charsRef.current;
    let settled = Math.abs(a.target - a.hover) < EPSILON;

    for (let i = 0; i < chars.length; i += 1) {
      const el = chars[i];
      if (!el) continue;

      const cx = el.offsetLeft + el.offsetWidth / 2;
      const cy = el.offsetTop + el.offsetHeight / 2;
      const dx = px - cx;
      const dy = (py - cy) * WAVE_Y_WEIGHT;
      const dist = Math.sqrt(dx * dx + dy * dy);

      /* smoothstep falloff, plus a small floor so the whole title
         acknowledges the hover rather than only the letters under the
         cursor */
      const f = clamp(1 - dist / WAVE_RADIUS, 0, 1);
      const shaped = f * f * (3 - 2 * f);
      const target = a.hover * (0.2 + 0.8 * shaped);

      /* neighbouring letters ease at slightly different rates: that
         difference is what reads as a travelling ripple */
      const k = 0.12 + (i % 4) * 0.016;
      const w = a.weights[i] + (target - a.weights[i]) * k;
      a.weights[i] = w;

      if (Math.abs(target - w) > EPSILON || w > EPSILON) settled = false;

      if (w < EPSILON) {
        el.style.transform = "";
        continue;
      }

      const dirX = clamp(dx / WAVE_RADIUS, -1, 1);
      el.style.transform =
        `translate3d(0,${(-LIFT * w).toFixed(2)}px,${(DEPTH * w).toFixed(2)}px)` +
        ` rotateX(${(-my * TILT_X * w).toFixed(2)}deg)` +
        ` rotateY(${(dirX * TILT_Y * w).toFixed(2)}deg)` +
        ` scale(${(1 + SCALE * w).toFixed(4)})`;
    }

    if (settled && a.target === 0) {
      reset();
      return;
    }
    a.raf = requestAnimationFrame(frame);
  }, [reset]);

  const start = useCallback(() => {
    const a = anim.current;
    if (!a.raf) a.raf = requestAnimationFrame(frame);
  }, [frame]);

  const onPointerEnter = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const a = anim.current;
      if (!a.enabled || event.pointerType !== "mouse") return;
      a.x = event.clientX;
      a.y = event.clientY;
      a.target = 1;
      start();
    },
    [start],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const a = anim.current;
      if (!a.enabled || event.pointerType !== "mouse") return;
      a.x = event.clientX;
      a.y = event.clientY;
      a.target = 1;
      start();
    },
    [start],
  );

  const onPointerLeave = useCallback(() => {
    const a = anim.current;
    if (!a.enabled) return;
    a.target = 0;
    start();
  }, [start]);

  useEffect(() => {
    anim.current.weights = new Array(charCount).fill(0);
  }, [charCount]);

  useEffect(() => {
    /* the ref holds one object for the component's whole life, so this
       capture is the same state the cleanup needs to cancel */
    const a = anim.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const enabled = fine.matches && !still.matches;
      a.enabled = enabled;
      if (!enabled) reset();
    };

    sync();
    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
      if (a.raf) cancelAnimationFrame(a.raf);
      a.raf = 0;
    };
  }, [reset]);

  const numeral = String(project.rank).padStart(2, "0");
  const category = project.tags[0];
  const stack = project.stack.slice(0, MAX_STACK);
  const rest = project.stack.length - stack.length;
  const href = `/work/${project.slug}`;

  return (
    <article
      ref={rowRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`project-row relative isolate min-w-0 pt-10 sm:pt-12 xl:py-14 ${
        first ? "rule-t" : ""
      }`}
    >
      {/* ---------- the submerged index ----------
          Absolutely anchored to the row's bottom edge: three quarters of the
          glyph sits above the rule, the rest continues underneath it and
          fades into the page. The stage clips anything that would otherwise
          reach the next project. */}
      <span aria-hidden className="project-numeral-stage">
        <span className="project-numeral">
          <span className="project-numeral__layer project-numeral__base">
            {numeral}
          </span>
          <span className="project-numeral__layer project-numeral__accent">
            {numeral}
          </span>
        </span>
      </span>

      {/* the rule is painted after the numeral, so it reads as the surface
          the glyph disappears beneath */}
      <span aria-hidden className="project-row__rule" />

      <div className="relative z-10 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-8 xl:grid-cols-[minmax(0,3.5fr)_minmax(0,4fr)_minmax(0,3.5fr)_auto] xl:items-center xl:gap-x-10">
        {/* numeral gutter: empty on purpose — it reserves the space the
            absolutely positioned glyph occupies */}
        <span aria-hidden className="project-numeral-space order-last xl:order-none" />

        {/* ---------- copy ---------- */}
        <div className="col-span-2 min-w-0 xl:order-none xl:col-span-1">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="eyebrow min-w-0 break-words">{category}</p>
            <p className="font-mono text-[11px] tracking-[0.14em] text-chalk-faint">
              {project.year} · {project.status}
            </p>
          </div>

          <h3 className="mt-4 text-pretty text-[clamp(1.45rem,2.6vw,2.1rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
            <Link href={href} className="project-row__link">
              <span className="sr-only">
                {project.title} — view case study
              </span>
              <span aria-hidden ref={titleRef} className="fluid-title">
                {words.map(({ word, accent, chars }, wi) => (
                  <span
                    key={`${word}-${wi}`}
                    className={`fluid-title__word${
                      accent ? " fluid-title__word--accent" : ""
                    }`}
                  >
                    {chars.map(({ ch, i }) => (
                      <span
                        key={i}
                        className="fluid-title__ch"
                        ref={(el) => {
                          charsRef.current[i] = el;
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </Link>
          </h3>

          <p className="mt-3.5 max-w-[46ch] text-pretty text-[14.5px] leading-relaxed text-chalk-dim">
            {firstSentence(project.summary)}
          </p>

          <ul className="mt-5 flex min-w-0 flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li key={tech} className="min-w-0">
                <Pill>{tech}</Pill>
              </li>
            ))}
            {rest > 0 && (
              <li className="min-w-0">
                <span className="inline-flex items-center px-1 py-1 font-mono text-[11px] leading-none text-chalk-faint">
                  +{rest}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* ---------- preview ---------- */}
        <div className="project-preview col-span-2 min-w-0 xl:order-none xl:col-span-1">
          {/* capped below `xl`, where a full-width illustration would
              otherwise be the tallest thing in the row by far */}
          <ProjectMockup
            kind={project.mockup}
            className="aspect-[16/10] w-full max-w-[32rem] xl:max-w-none"
          />
        </div>

        {/* ---------- affordance ---------- */}
        <span
          aria-hidden
          className="project-arrow order-last self-end justify-self-end xl:order-none xl:self-center"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default ProjectShowcaseRow;
