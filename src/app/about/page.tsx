import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { APACMap } from "@/components/sections/APACMap";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ALPHA_VALUES, COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Alpha Consultant",
  description:
    "Alpha Consultant is a boutique insurance, actuarial, risk and regulatory advisory firm based in Singapore, led by senior practitioners with 20+ years of APAC experience.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  About Us
                </span>
              </div>
              <h1 className="font-display text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                A Specialist Advisory Firm Built for Asia Pacific Financial Services
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Alpha Consultant is a Singapore-based boutique advisory firm specialising in insurance, actuarial, risk management, regulatory compliance and financial services consulting across Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-py bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-[#C9A040]" />
                  <span className="text-xs font-semibold text-[#A8801A] uppercase tracking-[0.15em]">Our Story</span>
                </div>
                <h2 className="font-display text-[#0D1B2A] text-2xl font-semibold mb-5 leading-tight">
                  Senior Expertise Across Insurance, Risk and Regulation in Asia Pacific
                </h2>
                <div className="space-y-4 text-sm text-[#64748B] leading-relaxed">
                  <p>
                    Alpha Consultant brings senior-level insurance, actuarial, risk and regulatory expertise to organisations across Asia Pacific. Our roots are in actuarial science, enterprise risk management and regulatory compliance.
                  </p>
                  <p>
                    Our team brings direct experience from major regional insurance companies, reinsurers, insurtech platforms and financial institutions across Singapore, Hong Kong, Malaysia, Indonesia and other APAC markets.
                  </p>
                  <p>
                    We work with licensed insurers, insurance brokers, financial advisers, fintechs, banks, asset managers and professional services firms across Asia Pacific and beyond.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { title: "What We Believe", body: "That specialist advisory requires genuine expertise, not generalist advice. That clients deserve direct access to experienced practitioners. That good risk management and regulatory compliance are strategic advantages, not just cost centres." },
                  { title: "Where We Operate", body: "Primarily Singapore, with active advisory experience across Hong Kong, Malaysia, Indonesia, Myanmar, Cambodia, Vietnam, Brunei, Taiwan and broader Asia Pacific markets." },
                  { title: "How We Work", body: "As a boutique firm, senior practitioners remain closely involved throughout every engagement. We bring deep expertise and stay accountable to the outcome." },
                ].map((item) => (
                  <div key={item.title} className="p-5 bg-[#F8F6F1] rounded-xl border border-[#E4E0D6]">
                    <div className="w-5 h-0.5 bg-[#C9A040] mb-3" />
                    <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ALPHA Values */}
        <section className="section-py bg-[#0A1628] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="valuesgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#valuesgrid)" />
            </svg>
          </div>
          <div className="container-xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Our Values</span>
            </div>
            <h2 className="font-display text-white text-2xl font-semibold mb-10 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              What <span className="text-[#C9A040]">ALPHA</span> Stands For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ALPHA_VALUES.map((v) => (
                <div key={v.letter + v.value} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-4xl font-bold text-[#C9A040] leading-none">{v.letter}</span>
                    <span className="text-sm font-semibold text-white">{v.value}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership">
          <LeadershipSection />
        </section>

        {/* APAC */}
        <section id="apac">
          <APACMap />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Contact strip */}
        <section className="py-12 bg-[#F8F6F1] border-y border-[#E4E0D6]">
          <div className="container-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-[#0D1B2A]">Get in touch</p>
                <p className="text-sm text-[#64748B]">{COMPANY.address}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#64748B]">
                <a href={`tel:${COMPANY.phone}`} className="hover:text-[#0D1B2A] transition-colors">{COMPANY.phone}</a>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[#0D1B2A] transition-colors">{COMPANY.email}</a>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
