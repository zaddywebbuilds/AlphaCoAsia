"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisciplineImage, SUBJECT_FOR_SERVICE } from "@/components/viz/DisciplineImage";
import { CASE_STUDIES } from "@/lib/data";

/* Simplified filter labels that map to one or more service strings */
const FILTERS: { label: string; match: (s: string) => boolean }[] = [
  { label: "All", match: () => true },
  { label: "Risk & ERM", match: (s) => ["Enterprise Risk Management", "ORSA Advisory", "Risk-Based Capital", "Actuarial Consulting"].includes(s) },
  { label: "Regulatory", match: (s) => ["Regulatory & Licensing", "AML/CFT Compliance"].includes(s) },
  { label: "Transactions", match: (s) => s === "Due Diligence & Corporate Deals" },
  { label: "Digital & Insurtech", match: (s) => s === "Insurtech & Digital Insurance" },
];

const MARKETS = ["All markets", ...Array.from(new Set(CASE_STUDIES.map((cs) => cs.market))).sort()];

export default function CaseStudiesPage() {
  const [service, setService] = useState("All");
  const [market, setMarket] = useState("All markets");

  const filtered = CASE_STUDIES.filter((cs) => {
    const svcMatch = FILTERS.find((f) => f.label === service)?.match(cs.service) ?? true;
    const mktMatch = market === "All markets" || cs.market === market;
    return svcMatch && mktMatch;
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Track Record</span>
              </div>
              <h1
                className="font-display text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Selected Consulting Engagements
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Advisory and consulting engagements across insurance, risk, regulatory, actuarial and market entry disciplines throughout Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Service filters */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setService(f.label)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors"
                    style={{
                      backgroundColor: service === f.label ? "#C9A040" : "rgba(255,255,255,0.05)",
                      color: service === f.label ? "#221805" : "rgba(148,163,184,0.8)",
                      border: service === f.label ? "1px solid #C9A040" : "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Market select */}
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="sm:ml-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-[#0E1B30] border border-white/[0.09] focus:outline-none focus:border-[#C9A040] transition-colors"
              >
                {MARKETS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Result count */}
            <p className="text-xs text-slate-500 mb-6">
              {filtered.length} engagement{filtered.length !== 1 ? "s" : ""}
              {service !== "All" || market !== "All markets"
                ? ` matching${service !== "All" ? ` "${service}"` : ""}${market !== "All markets" ? ` · ${market}` : ""}`
                : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500 text-sm">No engagements match this combination.</p>
                <button
                  onClick={() => { setService("All"); setMarket("All markets"); }}
                  className="mt-4 text-xs text-[#C9A040] hover:text-[#E8D9A8] transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((cs, i) => (
                  <Link
                    key={cs.slug}
                    href={`/case-studies/${cs.slug}`}
                    className="card p-8 flex flex-col group overflow-hidden"
                  >
                    <DisciplineImage
                      id={SUBJECT_FOR_SERVICE[cs.service] ?? "enterprise-risk-management"}
                      priority={i < 2}
                      className="-mx-8 -mt-8 mb-6 aspect-[1400/654]"
                    />
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#C9A040]/12 text-[#E8D9A8] text-xs font-semibold rounded-md">
                          {cs.industry}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={10} />
                          {cs.market}
                        </span>
                      </div>
                      <span className="text-xs text-[#C9A040] font-medium">{cs.service}</span>
                    </div>

                    <h2 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-[#E8D9A8] transition-colors">
                      {cs.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">{cs.challenge}</p>

                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-[#0A1628] border border-white/[0.09] text-xs text-slate-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-white/[0.09] text-xs font-semibold text-[#C9A040]">
                      Read engagement
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
