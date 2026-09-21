import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { APACMap } from "@/components/sections/APACMap";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LEADERSHIP, COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Alpha Consultant | Insurance & Risk Advisory Singapore",
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
                  Founded on a Belief That Specialist Expertise Should Be Accessible
                </h2>
                <div className="space-y-4 text-sm text-[#64748B] leading-relaxed">
                  <p>
                    Alpha Consultant was established to bring senior-level insurance, actuarial, risk and regulatory expertise directly to clients across Asia Pacific, without the overhead and delegation common in larger advisory firms.
                  </p>
                  <p>
                    Our team brings direct experience from major regional insurance companies, reinsurers, insurtech platforms and financial institutions across Singapore, Hong Kong, Malaysia, Indonesia and other APAC markets.
                  </p>
                  <p>
                    We work with licensed insurers, insurance brokers, financial advisers, fintechs, banks, asset managers and professional services firms, providing the kind of hands-on, senior advisory that drives real business outcomes.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { title: "What We Believe", body: "That specialist advisory requires genuine expertise, not generalist advice. That clients deserve direct access to experienced practitioners. That good risk management and regulatory compliance are strategic advantages, not just cost centres." },
                  { title: "Where We Operate", body: "Primarily Singapore, with active advisory experience across Hong Kong, Malaysia, Indonesia, Myanmar, Cambodia, Vietnam, Brunei, Taiwan and broader Asia Pacific markets." },
                  { title: "How We Work", body: "As a boutique firm, every engagement involves direct senior participation. We do not delegate to junior staff. We bring deep expertise and we stay accountable to the outcome." },
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
