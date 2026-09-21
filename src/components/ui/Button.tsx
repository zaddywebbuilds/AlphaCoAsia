"use client";
import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#E8D9A8,#C9A040_55%,#B08C2E)] text-[#221805] border border-[#C9A040] hover:brightness-110",
  secondary:
    "bg-white/[0.06] text-white hover:bg-white/[0.11] border border-white/[0.12]",
  outline:
    "bg-transparent text-white hover:bg-[#C9A040]/[0.08] border border-[#C9A040]/35 hover:border-[#C9A040]/70",
  ghost:
    "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent",
  gold:
    "bg-[linear-gradient(135deg,#E8D9A8,#C9A040_55%,#B08C2E)] text-[#221805] border border-[#C9A040] hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A040] focus-visible:ring-offset-2 whitespace-nowrap tracking-wide";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, external, children, className = "", ...props }, ref) => {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
