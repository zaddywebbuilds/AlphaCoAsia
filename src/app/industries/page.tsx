import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { INDUSTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Alpha Consultant advises insurers, insurance brokers, financial advisers, fintechs, banks, asset managers and professional services firms across Asia Pacific.",
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 bg-[#05090F] overflow-hidden tex-grain">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_30%,#12263D_0%,#05090F_72%)]" />
          <div className="absolute inset-0 tex-grid-fine opacity-40" />
          <div className="container-xl relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="type-technical text-[#C9A040]">Industries</span>
              </div>
              <h1
                className="font-display text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                Serving the financial services ecosystem
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                We work with regulated institutions and the businesses that support them across
                Singapore and Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        <section className="section-py bg-[#F8F6F1] relative">
          <div className="absolute inset-0 tex-grid-dark opacity-50" />
          <div className="container-xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {INDUSTRIES.map((ind, i) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="card p-7 flex flex-col group overflow-hidden"
                >
                  <DisciplineImage id={ind.slug} priority={i < 3} className="-mx-7 -mt-7 mb-6 h-[164px]" />
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="type-technical text-[#94A3B8] tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-[#0D1B2A] mb-2.5 leading-snug">
                    <span className="link-rule">{ind.title}</span>
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-5">{ind.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {ind.challenges.slice(0, 3).map((c) => (
                      <span key={c} className="px-2 py-0.5 bg-[#F8F6F1] border border-[#E4E0D6] text-[11.5px] text-[#64748B] rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] group-hover:text-[#A8801A] transition-colors">
                    Explore sector
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
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
