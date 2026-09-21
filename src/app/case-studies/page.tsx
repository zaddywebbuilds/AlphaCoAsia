import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CASE_STUDIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Selected Advisory Engagements",
  description:
    "A selection of Alpha Consultant's advisory and consulting engagements across insurance, risk, regulatory and actuarial disciplines in Asia Pacific.",
};

export default function CaseStudiesPage() {
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
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Selected Consulting Engagements
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                A selection of advisory and consulting engagements across insurance, risk, regulatory, actuarial and market entry disciplines throughout Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        <section className="section-py bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="card p-8 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#EDF3F9] text-[#1A3550] text-xs font-semibold rounded-md">
                        {cs.industry}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#64748B]">
                        <MapPin size={10} />
                        {cs.market}
                      </span>
                    </div>
                    <span className="text-xs text-[#A8801A] font-medium">{cs.service}</span>
                  </div>

                  <h2 className="text-base font-semibold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#1A3550] transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">{cs.challenge}</p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#F8F6F1] border border-[#E4E0D6] text-xs text-[#64748B] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-[#E4E0D6] text-xs font-semibold text-[#A8801A]">
                    Read engagement
                    <ArrowRight size={11} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
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
