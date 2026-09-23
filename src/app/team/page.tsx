import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LEADERSHIP } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "The Alpha Consultant leadership team — chartered actuaries, C-suite executives and corporate finance specialists with deep experience across Asia Pacific insurance, risk, regulatory and capital markets.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | Alpha Consultant",
    description:
      "Meet the partners and directors behind Alpha Consultant's insurance, risk and capital markets advisory practice.",
    url: "https://alphacoasia.com/team",
  },
};

export default function TeamIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#05090F]">
          <div className="absolute inset-0 tex-grid-fine opacity-30 pointer-events-none" />
          <div className="container-xl relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  Our Team
                </span>
              </div>
              <h1
                className="font-display text-white leading-[1.06] mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                The people behind
                <br className="hidden sm:block" /> the practice
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                Chartered actuaries, C-suite executives and corporate finance specialists with direct experience from major regional insurers, reinsurers and capital markets across Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        {/* Team grid */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LEADERSHIP.map((person) => (
                <Link
                  key={person.slug}
                  href={`/team/${person.slug}`}
                  className="group card overflow-hidden flex flex-col"
                >
                  {/* Portrait */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070D14]">
                    <Image
                      src={`${BASE}${person.image}`}
                      alt={`${person.name}, ${person.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.10]" />
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-[linear-gradient(to_top,rgba(5,9,15,0.80)_0%,transparent_100%)]" />
                  </div>

                  {/* Copy */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="type-technical text-[#C9A040] mb-2">{person.title}</span>
                    <h2 className="font-display text-lg font-semibold text-white mb-1 leading-snug">
                      {person.name}
                    </h2>
                    {person.credentials && (
                      <p className="text-xs text-slate-500 mb-3">{person.credentials}</p>
                    )}
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">
                      {person.shortBio}
                    </p>

                    {/* Expertise chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {person.expertise.slice(0, 4).map((e) => (
                        <span
                          key={e}
                          className="px-2 py-0.5 bg-[#0D1B2A] border border-white/[0.08] rounded text-[11px] text-slate-400"
                        >
                          {e}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 type-technical text-white group-hover:text-[#C9A040] transition-colors mt-auto">
                      Full profile
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
