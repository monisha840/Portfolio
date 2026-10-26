import type { ReactNode } from "react";

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "brand";
}) {
  const tones = {
    default:
      "border-white/12 bg-white/[0.04] text-chalk-dim",
    brand:
      "border-burgundy-500/40 bg-burgundy-700/20 text-burgundy-200",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
