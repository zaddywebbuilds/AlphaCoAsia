"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { EXPERTISE, INDUSTRIES } from "@/lib/data";

const NAV = [
  {
    label: "Expertise",
    href: "/expertise",
    mega: EXPERTISE.map((e) => ({ label: e.title, href: `/expertise/${e.slug}`, sub: e.shortTitle })),
  },
  {
    label: "Industries",
    href: "/industries",
    mega: INDUSTRIES.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
  },
  { label: "Training", href: "/training" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(10,22,40,0.08),0_4px_24px_rgba(10,22,40,0.06)]"
          : "bg-white/90 backdrop-blur-sm border-b border-[#E4E0D6]"
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-[#0D1B2A] leading-tight tracking-tight">
                Alpha Consultant
              </span>
              <span className="text-[10px] font-medium text-[#A8801A] tracking-[0.1em] uppercase">
                AlphaCoAsia
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setActive(null)}>
            {NAV.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setActive(item.label)}>
                {item.mega ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#0D1B2A] rounded-md hover:bg-[#F8F6F1] transition-colors">
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${active === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#0D1B2A] rounded-md hover:bg-[#F8F6F1] transition-colors block"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mega menu */}
                {item.mega && active === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[560px] z-50">
                    <div className="bg-white rounded-xl shadow-[0_8px_40px_rgba(10,22,40,0.12)] border border-[#E4E0D6] overflow-hidden">
                      <div className="p-2 grid grid-cols-2 gap-0.5">
                        {item.mega.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F8F6F1] group transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-[#0D1B2A] group-hover:text-[#1A3550] block truncate">
                                {child.label}
                              </span>
                            </div>
                            <ArrowRight size={12} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-[#F8F6F1] border-t border-[#E4E0D6]">
                        <Link
                          href={item.href}
                          className="text-xs font-semibold text-[#A8801A] hover:text-[#8B6914] uppercase tracking-wide flex items-center gap-1"
                        >
                          View all {item.label} <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#0D1B2A] text-white text-sm font-medium rounded-md hover:bg-[#1A3550] transition-colors"
            >
              Discuss Your Challenge
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#0D1B2A] rounded-md hover:bg-[#F8F6F1]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E4E0D6] max-h-[80vh] overflow-y-auto">
          <div className="container-xl py-4 space-y-1">
            {NAV.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-3 text-sm font-medium text-[#0D1B2A] hover:bg-[#F8F6F1] rounded-md"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.mega && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.mega.slice(0, 5).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-[#64748B] hover:text-[#0D1B2A] hover:bg-[#F8F6F1] rounded-md"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#E4E0D6]">
              <Link
                href="/contact"
                className="block px-4 py-3 bg-[#0D1B2A] text-white text-sm font-medium rounded-md text-center"
                onClick={() => setOpen(false)}
              >
                Discuss Your Challenge
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
