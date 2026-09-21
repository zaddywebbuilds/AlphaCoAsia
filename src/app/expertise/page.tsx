import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Calculator, BarChart2, TrendingUp, FileText, Lock, Zap, Globe, BarChart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { EXPERTISE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insurance, Risk & Actuarial Advisory Expertise",
  description:
    "Alpha Consultant's specialist expertise spans enterprise risk management, actuarial consulting, ORSA, RBC2, regulatory licensing, AML/CFT, insurtech and Asia market entry.",
};

const ICONS: Record<string, React.ElementType> = {
  shield: Shield, calculator: Calculator, chart: BarChart2, trending: TrendingUp,
  document: FileText, lock: Lock, zap: Zap, globe: Globe, "bar-chart": BarChart,
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

        <section className="section-py bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXPERTISE.map((item) => {
                const Icon = ICONS[item.icon] || Shield;
                return (
                  <Link
                    key={item.slug}
                    href={`/expertise/${item.slug}`}
                    className="card p-7 flex flex-col group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EDF3F9] flex items-center justify-center mb-5 group-hover:bg-[#0D1B2A] transition-colors">
                      <Icon size={18} className="text-[#1A3550] group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-base font-semibold text-[#0D1B2A] mb-2 leading-snug group-hover:text-[#1A3550] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.topics.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#F8F6F1] border border-[#E4E0D6] text-xs text-[#64748B] rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A8801A] group-hover:text-[#8B6914] transition-colors">
                      Learn more <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
