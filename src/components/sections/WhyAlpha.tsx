"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PILLARS = [
  {
    title: "Senior Practitioners",
    description:
      "Senior practitioners remain closely involved throughout every engagement. You work directly with experienced professionals who understand your industry.",
  },
  {
    title: "Specialist Depth",
    description:
      "Our focus is insurance, actuarial, risk and regulatory advisory. This is not a side practice within a generalist firm — it is our entire focus.",
  },
  {
    title: "Regional Understanding",
    description:
      "Experience across Singapore, Hong Kong, Malaysia, Indonesia and broader Asia Pacific markets means we understand local regulatory expectations and market dynamics.",
  },
  {
    title: "Practical Implementation",
    description:
      "We deliver recommendations that can actually be implemented. We have the operational experience to help clients navigate from strategy to execution.",
  },
  {
    title: "Cross-Functional Expertise",
    description:
      "Actuarial, compliance, risk, regulatory and digital capabilities allow us to support complex, multi-disciplinary advisory requirements from a single trusted team.",
  },
  {
    title: "Boutique Access",
    description:
      "The accountability and direct senior access of a boutique firm, combined with credentials earned across major regional insurance and financial institutions.",
  },
];

/* The framework as a stepped structure: each capability is a plate, the stack
   widens toward its base, and the whole thing assembles as the section arrives. */
function Framework({ active, inView }: { active: number | null; inView: boolean }) {
  const CX = 150;
  return (
    <svg viewBox="0 0 300 330" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="plateTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E3D8" />
        </linearGradient>
        <linearGradient id="plateTopOn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5C97F" />
          <stop offset="100%" stopColor="#C9A040" />
        </linearGradient>
      </defs>

      {/* Structural axis */}
      <motion.line
        x1={CX} y1={56} x2={CX} y2={296}
        stroke="#0D1B2A" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 4"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {PILLARS.map((_, i) => {
        const y = 70 + i * 36;
        const hw = 62 + i * 11;
        const hh = hw * 0.3;
        const t = 10;
        const on = active === i;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
            style={{ transition: "filter .4s ease" }}
          >
            {/* Side faces give the plate thickness */}
            <path d={`M ${CX - hw} ${y} L ${CX} ${y + hh} L ${CX} ${y + hh + t} L ${CX - hw} ${y + t} Z`}
              fill={on ? "#A8801A" : "#C9C4B6"} fillOpacity={on ? 0.95 : 0.55}
              style={{ transition: "fill .45s ease, fill-opacity .45s ease" }} />
            <path d={`M ${CX + hw} ${y} L ${CX} ${y + hh} L ${CX} ${y + hh + t} L ${CX + hw} ${y + t} Z`}
              fill={on ? "#8B6914" : "#B8B3A4"} fillOpacity={on ? 0.95 : 0.5}
              style={{ transition: "fill .45s ease, fill-opacity .45s ease" }} />
            {/* Top face */}
            <path d={`M ${CX} ${y - hh} L ${CX + hw} ${y} L ${CX} ${y + hh} L ${CX - hw} ${y} Z`}
              fill={on ? "url(#plateTopOn)" : "url(#plateTop)"}
              stroke={on ? "#8B6914" : "#D5CFC0"} strokeWidth="1"
              style={{ transition: "stroke .45s ease" }} />
            {/* Index marker */}
            <circle cx={CX} cy={y} r={on ? 4 : 2.6}
              fill={on ? "#0D1B2A" : "#C9A040"} fillOpacity={on ? 1 : 0.45}
              style={{ transition: "r .4s ease, fill .4s ease" }} />
          </motion.g>
        );
      })}
    </svg>
  );
}

export function WhyAlpha() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative section-py bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-60" />
      <div className="absolute -top-24 -right-20 w-[520px] h-[520px] rounded-full bg-[#C9A040] opacity-[0.07] blur-[120px]" />

      <div className="container-xl relative z-10">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A040]" />
            <span className="type-technical text-[#C9A040]">Why Alpha Consultant</span>
          </div>
          <h2
            className="font-display text-white leading-[1.08] mb-5"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            Senior expertise. Direct access.
            <br className="hidden sm:block" /> Practical execution.
          </h2>
          <p className="text-[15px] text-slate-400 leading-relaxed">
            Large consultancies sell scale. Alpha Consultant offers specialist depth, senior-level
            involvement and the kind of direct access that drives better outcomes for clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Structure */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-28">
            <div className="max-w-[380px] mx-auto">
              <Framework active={active} inView={inView} />
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C9A040]" />
                <span className="type-technical text-slate-500">The Alpha Framework · 6 Components</span>
              </div>
            </div>
          </div>

          {/* Components */}
          <div className="lg:col-span-7 order-1 lg:order-2" onMouseLeave={() => setActive(null)}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={`group relative py-5 pl-7 pr-4 border-b border-white/[0.09] last:border-b-0 outline-none transition-colors duration-400 ${
                  active === i ? "bg-white/70" : ""
                }`}
              >
                <span
                  className={`absolute left-0 top-5 bottom-5 w-[2px] transition-all duration-400 ${
                    active === i ? "bg-[#C9A040]" : "bg-white/15"
                  }`}
                />
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="type-technical text-[#C9A040] tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-[13.5px] text-slate-400 leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
