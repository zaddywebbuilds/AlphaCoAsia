"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { EXPERTISE, INDUSTRIES } from "@/lib/data";
import { ExpertiseGlyph } from "@/components/viz/ExpertiseGlyph";

const NAV = [
  {
    label: "Expertise",
    href: "/expertise",
    mega: EXPERTISE.map((e) => ({ label: e.title, href: `/expertise/${e.slug}`, slug: e.slug, sub: e.tagline })),
  },
  {
    label: "Industries",
    href: "/industries",
    mega: INDUSTRIES.map((i) => ({ label: i.title, href: `/industries/${i.slug}`, slug: i.slug, sub: "" })),
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
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || active !== null;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "bg-[#070D18]/92 backdrop-blur-xl border-b border-white/[0.09] shadow-[0_8px_40px_-20px_rgba(0,0,0,0.9)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-[74px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none shrink-0">
            <span className="font-display text-[17px] font-semibold text-white tracking-tight">
              Alpha Consultant
            </span>
            <span className="type-technical text-[#C9A040] mt-1">AlphaCoAsia</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setActive(null)}>
            {NAV.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setActive(item.mega ? item.label : null)}>
                {item.mega ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-[13.5px] font-medium text-slate-300 hover:text-white rounded-md transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${active === item.label ? "rotate-180 text-[#C9A040]" : ""}`}
                    />
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3.5 py-2 text-[13.5px] font-medium text-slate-300 hover:text-white rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mega panel */}
                {item.mega && active === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px]">
                    <div className="rounded-[14px] border border-white/[0.10] bg-[#0A1119]/97 backdrop-blur-xl shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)] overflow-hidden">
                      <div className="p-2.5 grid grid-cols-2 gap-1">
                        {item.mega.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] group transition-colors"
                          >
                            {item.label === "Expertise" && (
                              <span className="w-9 h-9 shrink-0 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 group-hover:text-slate-300 transition-colors">
                                <ExpertiseGlyph id={child.slug} active className="w-8 h-6" />
                              </span>
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                                {child.label}
                              </span>
                              {child.sub && (
                                <span className="block text-[11.5px] text-slate-500 truncate mt-0.5">
                                  {child.sub}
                                </span>
                              )}
                            </span>
                            <ArrowRight size={11} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-white/[0.03] border-t border-white/[0.07]">
                        <Link href={item.href} className="type-technical text-[#C9A040] hover:text-[#E0C780] flex items-center gap-1.5 transition-colors">
                          View all {item.label} <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="btn-magnetic hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A040] text-[#0A1628] text-[13px] font-semibold rounded-md hover:bg-[#D4AF60] shrink-0"
          >
            Discuss Your Challenge
            <ArrowRight size={13} className="btn-arrow" />
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-white rounded-md"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="lg:hidden bg-[#070D18] border-t border-white/[0.08] h-[calc(100dvh-74px)] overflow-y-auto">
          <div className="container-xl py-6 space-y-1">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-white/[0.06] last:border-b-0 pb-2 mb-2">
                <Link
                  href={item.href}
                  className="block px-1 py-3 text-[15px] font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.mega && (
                  <div className="grid grid-cols-2 gap-1 pb-2">
                    {item.mega.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="px-1 py-2 text-[12.5px] text-slate-400 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="block mt-4 px-4 py-3.5 bg-[#C9A040] text-[#0A1628] text-sm font-semibold rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              Discuss Your Challenge
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
