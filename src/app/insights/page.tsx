import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INSIGHTS_PLACEHOLDER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insurance, Risk & Regulatory Insights",
  description:
    "Perspectives on insurance regulation, enterprise risk management, actuarial matters, insurtech and emerging financial services trends across Asia Pacific.",
};

const CATEGORIES = ["All", "Regulatory Compliance", "Risk & Governance", "Actuarial", "Fintech & Insurtech", "APAC Markets"];

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Insights</span>
              </div>
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Perspectives on Insurance, Risk &amp; Regulation
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Thought leadership on regulatory developments, risk management practice, actuarial matters and emerging trends across Asia Pacific financial services.
              </p>
            </div>
          </div>
        </section>

        <section className="section-py bg-white">
          <div className="container-xl">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors border ${
                    cat === "All"
                      ? "bg-[#0D1B2A] text-white border-[#0D1B2A]"
                      : "bg-white text-[#64748B] border-[#E4E0D6] hover:border-[#0D1B2A] hover:text-[#0D1B2A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INSIGHTS_PLACEHOLDER.map((insight) => (
                <Link key={insight.slug} href={`/insights/${insight.slug}`} className="card bg-white p-6 flex flex-col group">
                  <span className="inline-block px-2.5 py-1 bg-[#EDF3F9] text-[#1A3550] text-xs font-semibold rounded-md mb-4">
                    {insight.category}
                  </span>
                  <h2 className="text-sm font-semibold text-[#0D1B2A] leading-snug mb-3 group-hover:text-[#1A3550] transition-colors flex-1">
                    {insight.title}
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-5">{insight.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E4E0D6]">
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                      <Clock size={11} /> {insight.readTime}
                    </span>
                    <span className="text-xs text-[#A8801A] font-semibold flex items-center gap-1">
                      Read <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-16 p-10 bg-[#0D1B2A] rounded-2xl text-center">
              <h3 className="font-display text-xl font-semibold text-white mb-3">APAC Insurance &amp; Risk Brief</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                Perspectives on insurance regulation, risk management and emerging financial services developments across Asia Pacific.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Work email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C9A040] text-white text-sm font-semibold rounded-lg hover:bg-[#A8801A] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
