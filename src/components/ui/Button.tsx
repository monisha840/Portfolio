import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:px-6";

const variants: Record<Variant, string> = {
  primary:
    "bg-burgundy-700 text-white hover:bg-burgundy-600 hover:shadow-[0_0_34px_-6px_var(--color-burgundy-500)]",
  ghost:
    "border border-white/15 text-chalk hover:border-white/35 hover:bg-white/[0.05]",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "children"> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
