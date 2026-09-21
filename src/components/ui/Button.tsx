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
    "bg-[#0D1B2A] text-white hover:bg-[#1A3550] border border-[#0D1B2A] hover:border-[#1A3550]",
  secondary:
    "bg-white text-[#0D1B2A] hover:bg-[#F8F6F1] border border-[#E4E0D6]",
  outline:
    "bg-transparent text-[#0D1B2A] hover:bg-[#F8F6F1] border border-[#0D1B2A]",
  ghost:
    "bg-transparent text-[#0D1B2A] hover:bg-[#F8F6F1] border border-transparent",
  gold:
    "bg-[#C9A040] text-white hover:bg-[#A8801A] border border-[#C9A040] hover:border-[#A8801A]",
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
