import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TESTIMONIALS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "What clients and industry peers say about working with Alpha Consultant across insurance, risk management, actuarial and regulatory advisory engagements in Asia Pacific.",
};

const SERVICE_LABEL: Record<string, string> = {
  "enterprise-risk-management": "Enterprise Risk Management",
  "actuarial-consulting": "Actuarial Consulting",
  "insurtech-digital": "Insurtech & Digital Insurance",
  "orsa-advisory": "ORSA Advisory",
  "regulatory-licensing": "Regulatory & Licensing",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  Client Testimonials
                </span>
              </div>
              <h1
                className="font-display text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                What clients say
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Perspectives from clients and industry peers on working with Alpha Consultant across insurance, risk, actuarial and regulatory advisory engagements throughout Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials grid */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="card p-8 flex flex-col"
                >
                  {/* Quote mark */}
                  <div
                    aria-hidden
                    className="text-[4rem] leading-none text-[#C9A040]/20 font-serif mb-2 select-none"
                  >
                    &ldquo;
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[15px] text-slate-300 leading-relaxed flex-1 mb-6">
                    {t.quote}
                  </blockquote>

                  {/* Attribution */}
                  <div className="pt-5 border-t border-white/[0.09]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
                        <p className="text-xs text-[#C9A040] mt-0.5">{t.company}</p>
                      </div>
                      {t.service && SERVICE_LABEL[t.service] && (
                        <span className="shrink-0 px-2.5 py-1 bg-[#C9A040]/10 text-[#E8D9A8] text-[10px] font-semibold rounded-md uppercase tracking-wide">
                          {SERVICE_LABEL[t.service]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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
