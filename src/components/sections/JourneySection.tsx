"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STAGES = [
  {
    id: "foundation",
    number: "01",
    label: "Foundation",
    sublabel: "Get licensed",
    description:
      "Selecting a market and legal structure, navigating the licence application, and building the AML/CFT and compliance infrastructure the regulator expects from day one.",
    services: [
      { title: "Regulatory & Licensing", slug: "regulatory-licensing" },
      { title: "AML/CFT Compliance", slug: "aml-cft" },
      { title: "Asia Market Entry", slug: "market-entry" },
    ],
    leads: [{ slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" }],
  },
  {
    id: "operations",
    number: "02",
    label: "Operations",
    sublabel: "Stay compliant",
    description:
      "Embedding ERM, meeting ORSA obligations, managing RBC capital adequacy and obtaining actuarial sign-off — the ongoing obligations of a licensed regulated entity.",
    services: [
      { title: "Enterprise Risk Management", slug: "enterprise-risk-management" },
      { title: "ORSA Advisory", slug: "orsa-advisory" },
      { title: "Risk-Based Capital", slug: "risk-based-capital" },
      { title: "Actuarial Consulting", slug: "actuarial-consulting" },
    ],
    leads: [{ slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" }],
  },
  {
    id: "growth",
    number: "03",
    label: "Growth",
    sublabel: "Scale your business",
    description:
      "Expanding across Asia Pacific markets, digitalising distribution through insurtech and building the financial models that support investment decisions and strategic planning.",
    services: [
      { title: "Insurtech & Digital", slug: "insurtech-digital" },
      { title: "Asia Market Entry", slug: "market-entry" },
      { title: "Financial Modelling", slug: "financial-modelling" },
    ],
    leads: [
      { slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" },
      { slug: "byong-chon", name: "Byong Chon", role: "Technology Director" },
    ],
  },
  {
    id: "transaction",
    number: "04",
    label: "Transaction",
    sublabel: "Buy, sell or partner",
    description:
      "Financial, actuarial and regulatory due diligence on targets. Deal structuring, project management across jurisdictions, and post-merger integration — with particular depth on regulated financial services businesses.",
    services: [
      { title: "Due Diligence & Corporate Deals", slug: "due-diligence-corporate-deals" },
      { title: "Financial Modelling", slug: "financial-modelling" },
    ],
    leads: [
      { slug: "edmund-chan", name: "Edmund Chan", role: "Partner" },
      { slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" },
    ],
  },
  {
    id: "ipo",
    number: "05",
    label: "Pre-IPO",
    sublabel: "Prepare for listing",
    description:
      "Choosing a listing venue, restructuring the group, building board governance and PCAOB-ready controls, preparing the equity story and financial model, and raising pre-IPO capital from strategic and institutional investors.",
    services: [
      { title: "IPO & Capital Markets", slug: "capital-markets-advisory" },
      { title: "Financial Modelling", slug: "financial-modelling" },
      { title: "Enterprise Risk Management", slug: "enterprise-risk-management" },
    ],
    leads: [
      { slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" },
      { slug: "edmund-chan", name: "Edmund Chan", role: "Partner" },
    ],
  },
  {
    id: "listed",
    number: "06",
    label: "Listed",
    sublabel: "Sustain and grow",
    description:
      "Meeting ongoing listing obligations, running risk and remuneration committees, managing investor relations, and executing follow-on placements or rights issues after listing.",
    services: [
      { title: "IPO & Capital Markets", slug: "capital-markets-advisory" },
      { title: "Enterprise Risk Management", slug: "enterprise-risk-management" },
    ],
    leads: [
      { slug: "raymond-cheung", name: "Raymond Cheung", role: "Founder & Managing Director" },
      { slug: "edmund-chan", name: "Edmund Chan", role: "Partner" },
    ],
  },
];

export function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section ref={ref} className="relative section-py bg-[#050A12] overflow-hidden">
      {/* Decorative large stage number in background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.number}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute right-[-4%] top-1/2 -translate-y-[45%] font-display font-semibold text-white/[0.028] select-none pointer-events-none leading-none hidden lg:block"
          style={{ fontSize: "clamp(12rem, 30vw, 34rem)", letterSpacing: "-0.07em" }}
        >
          {stage.number}
        </motion.div>
      </AnimatePresence>

      <div className="container-xl relative z-10">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Your Growth Journey</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              One firm, from your
              <br className="hidden sm:block" /> first licence to your listing
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Most advisory firms cover two or three stages of this journey. We cover all six — with the same core team throughout.
            </p>
          </div>
        </div>

        {/* Stage rail — horizontal on sm+, 3-col grid on mobile */}
        <div className="relative mb-10">
          {/* Track line */}
          <div
            className="absolute top-5 left-5 right-5 h-px bg-white/[0.08] hidden sm:block"
            style={{ top: "20px" }}
          />
          <motion.div
            className="absolute h-px bg-[#C9A040] hidden sm:block"
            style={{ top: "20px", left: "20px" }}
            initial={{ width: 0 }}
            animate={
              inView
                ? {
                    width: `calc(${(active / (STAGES.length - 1)) * 100}% - 40px + ${
                      active === STAGES.length - 1 ? "20px" : "0px"
                    })`,
                  }
                : { width: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-5 sm:gap-0">
            {STAGES.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2.5 group relative z-10"
                  aria-pressed={isActive}
                  aria-label={`Stage ${s.number}: ${s.label}`}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0"
                    animate={{
                      backgroundColor: isActive
                        ? "#C9A040"
                        : isPast
                        ? "rgba(201,160,64,0.18)"
                        : "#050A12",
                      borderColor:
                        isActive || isPast
                          ? "#C9A040"
                          : "rgba(255,255,255,0.14)",
                      scale: isActive ? 1.12 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="font-display text-[11px] font-bold transition-colors duration-300"
                      style={{
                        color: isActive
                          ? "#221805"
                          : isPast
                          ? "#C9A040"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {s.number}
                    </span>
                  </motion.div>
                  <div className="text-center">
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300"
                      style={{ color: isActive ? "#C9A040" : "rgba(148,163,184,0.55)" }}
                    >
                      {s.label}
                    </p>
                    <p className="text-[10px] text-slate-600 hidden sm:block mt-0.5">
                      {s.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 bg-[#0D1B2A] rounded-2xl border border-white/[0.09]">
              {/* Left: copy, services, CTA */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                  <span className="type-technical text-[#C9A040]">Stage {stage.number}</span>
                  <span className="text-white/15">·</span>
                  <span className="type-technical text-slate-500">{stage.sublabel}</span>
                </div>

                <h3
                  className="font-display text-white mb-5 leading-snug"
                  style={{
                    fontSize: "clamp(1.45rem, 2.6vw, 2.1rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.022em",
                  }}
                >
                  {stage.label}
                </h3>

                <p className="text-[15px] text-slate-300 leading-relaxed mb-8">
                  {stage.description}
                </p>

                {/* Service chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {stage.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/expertise/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0A1628] border border-white/[0.09] rounded-lg text-[12.5px] text-white hover:border-[#C9A040] hover:text-[#C9A040] transition-colors"
                    >
                      {svc.title}
                      <ArrowRight size={10} className="opacity-60" />
                    </Link>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#E0C870] transition-colors"
                  >
                    Discuss this stage <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Right: team leads + dots */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <p className="type-technical text-slate-500 mb-4">Who leads this</p>
                  <div className="space-y-3">
                    {stage.leads.map((lead) => (
                      <Link
                        key={lead.slug}
                        href={`/team/${lead.slug}`}
                        className="flex items-center gap-3.5 p-4 bg-[#0A1628] rounded-xl border border-white/[0.07] hover:border-[#C9A040]/40 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#C9A040]/12 border border-[#C9A040]/25 flex items-center justify-center shrink-0">
                          <span className="text-[#C9A040] text-xs font-semibold leading-none">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13.5px] font-semibold text-white group-hover:text-[#C9A040] transition-colors truncate">
                            {lead.name}
                          </p>
                          <p className="text-[11.5px] text-slate-500 truncate">{lead.role}</p>
                        </div>
                        <ArrowRight
                          size={12}
                          className="text-slate-600 group-hover:text-[#C9A040] transition-colors shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-1.5">
                  {STAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to stage ${i + 1}`}
                      className="rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        height: "4px",
                        width: i === active ? "24px" : "8px",
                        backgroundColor:
                          i <= active ? "#C9A040" : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                  <span className="ml-auto type-technical text-slate-600 text-[10px]">
                    {active + 1} / {STAGES.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
