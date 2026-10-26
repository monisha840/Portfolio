"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface CapabilityMeterProps {
  /** how many segments are lit */
  filled: number;
  /** total segments — one per project on the site */
  total: number;
  /** stagger offset in seconds, so rows light up in sequence */
  delay?: number;
}

const LIT =
  "h-full flex-1 origin-left rounded-full bg-burgundy-400 shadow-[0_0_7px_-1px_var(--color-burgundy-500)]";

const segmentVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  shown: { scaleX: 1, opacity: 1 },
};

/**
 * A segmented capability indicator. One segment per project on this site, lit
 * for the projects that actually use the capability — so the length means
 * "applied here", never "good at this by N percent".
 *
 * Purely decorative: the row prints the same count as text, and this is hidden
 * from assistive tech.
 *
 * Two things here are deliberate:
 *
 * · The scroll trigger sits on the track, not on each segment. A segment
 *   starts at `scaleX(0)`, so its box has no area, and an IntersectionObserver
 *   watching a zero-area target can never report it as intersecting — on
 *   narrow viewports that left whole meters stuck at their initial state. The
 *   track is always a real box, so one observer per row drives the children
 *   through variants.
 *
 * · The segments stay `motion.span` in both motion modes. The server cannot
 *   know the visitor's preference, so it renders the animated `initial`; if
 *   the reduced-motion path swapped in a plain `<span>`, React would leave
 *   that server-written `opacity: 0` on the node and the segment would never
 *   appear. One element type means framer-motion always owns the style.
 */
export function CapabilityMeter({
  filled,
  total,
  delay = 0,
}: CapabilityMeterProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="mt-[7px] flex h-[3px] gap-[3px]"
      initial={reduce ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "-30px 0px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { delayChildren: delay, staggerChildren: 0.055 }
      }
    >
      {Array.from({ length: total }, (_, i) =>
        i < filled ? (
          <motion.span
            key={i}
            className={LIT}
            variants={segmentVariants}
            transition={{
              duration: reduce ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ) : (
          <span key={i} className="h-full flex-1 rounded-full bg-white/[0.07]" />
        ),
      )}
    </motion.div>
  );
}
