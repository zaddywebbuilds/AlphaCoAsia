import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ChallengeNav } from "@/components/sections/ChallengeNav";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { EXPERTISE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insurance, Risk & Actuarial Advisory Expertise",
  description:
    "Alpha Consultant's specialist expertise spans enterprise risk management, actuarial consulting, ORSA, RBC2, regulatory licensing, AML/CFT, insurtech and Asia market entry.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertisePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Expertise</span>
              </div>
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Specialist Advisory Across Insurance, Risk &amp; Regulation
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                From regulatory licensing and ERM to actuarial analytics and insurtech strategy, our expertise covers the full scope of financial services advisory in Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        {/* Need-framed entry, ahead of the service-named list — for visitors who
            know what they are facing but not what it is called. */}
        <ChallengeNav />

        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="mb-12 max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="type-technical text-[#C9A040]">Disciplines</span>
              </div>
              <h2
                className="font-display text-white leading-[1.08]"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                The full range of our advisory
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXPERTISE.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/expertise/${item.slug}`}
                  className="card p-7 flex flex-col group overflow-hidden"
                >
                  {/* Discipline diagram on its own dark plane */}
                  <DisciplineImage id={item.slug} priority={i < 3} className="-mx-7 -mt-7 mb-6 aspect-[1400/654]" />

                  <div className="flex items-center justify-between mb-3">
                    <span className="type-technical text-slate-500 tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="type-technical text-[#C9A040]">{item.shortTitle}</span>
                  </div>
                  <h2 className="text-base font-semibold text-white mb-2 leading-snug group-hover:text-[#E8D9A8] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.topics.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#0A1628] border border-white/[0.09] text-xs text-slate-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A040] group-hover:text-[#E8D9A8] transition-colors">
                    Learn more <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
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
