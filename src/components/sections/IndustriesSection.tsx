"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

const SHORT: Record<string, string> = {
  "insurance-companies": "Insurers",
  "insurance-brokers": "Brokers",
  "financial-advisers": "Advisers",
  "fintech-insurtech": "Fintech",
  banking: "Banks",
  "asset-management": "Asset Mgrs",
  "professional-services": "Prof. Services",
};

const CX = 210;
const CY = 190;
const RX = 152;
const RY = 128;

const NODES = INDUSTRIES.map((ind, i) => {
  // Start at the top and distribute evenly around the core.
  const a = (-90 + (360 / INDUSTRIES.length) * i) * (Math.PI / 180);
  return {
    ...ind,
    short: SHORT[ind.slug] ?? ind.title,
    x: CX + Math.cos(a) * RX,
    y: CY + Math.sin(a) * RY,
    cos: Math.cos(a),
  };
});

export function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];

  return (
    <section ref={ref} className="relative section-py bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-50" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Who We Help</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Serving the financial
              <br className="hidden sm:block" /> services ecosystem
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Select an institution type to see how we support it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Ecosystem */}
          <div className="lg:col-span-7">
            {/* viewBox is padded horizontally so edge labels never clip */}
            <svg viewBox="-46 0 512 380" className="w-full h-auto" role="group" aria-label="Institution types served">
              {/* Connections */}
              {NODES.map((n, i) => {
                const on = i === active;
                return (
                  <motion.line
                    key={`l-${n.slug}`}
                    x1={CX} y1={CY} x2={n.x} y2={n.y}
                    stroke={on ? "#C9A040" : "#0D1B2A"}
                    strokeWidth={on ? 1.8 : 0.9}
                    strokeOpacity={on ? 0.95 : 0.16}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transition: "stroke .4s ease, stroke-width .4s ease, stroke-opacity .4s ease" }}
                  />
                );
              })}

              {/* Core */}
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <circle cx={CX} cy={CY} r="46" fill="#0D1B2A" />
                <circle cx={CX} cy={CY} r="46" fill="none" stroke="#C9A040" strokeWidth="1.2" strokeOpacity="0.5" />
                <circle cx={CX} cy={CY} r="56" fill="none" stroke="#C9A040" strokeWidth="0.7" strokeOpacity="0.2" />
                <text x={CX} y={CY - 2} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Playfair Display, serif">
                  Alpha
                </text>
                <text x={CX} y={CY + 13} textAnchor="middle" fill="#C9A040" fontSize="7" letterSpacing="2.2" fontFamily="Inter, sans-serif">
                  ADVISORY
                </text>
              </motion.g>

              {/* Institution nodes */}
              {NODES.map((n, i) => {
                const on = i === active;
                const anchor = Math.abs(n.cos) < 0.25 ? "middle" : n.cos > 0 ? "start" : "end";
                const ox = anchor === "middle" ? 0 : n.cos > 0 ? 17 : -17;
                const oy = anchor === "middle" ? (n.y < CY ? -19 : 26) : 4;
                return (
                  <motion.g
                    key={n.slug}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    {on && <circle cx={n.x} cy={n.y} r="17" fill="#C9A040" fillOpacity="0.16" />}
                    <circle cx={n.x} cy={n.y} r={on ? 10 : 7}
                      fill={on ? "#C9A040" : "#fff"} stroke={on ? "#A8801A" : "#0D1B2A"}
                      strokeWidth="1.4" strokeOpacity={on ? 1 : 0.4}
                      style={{ transition: "r .35s ease, fill .35s ease" }} />
                    <text x={n.x + ox} y={n.y + oy} textAnchor={anchor}
                      fill={on ? "#0D1B2A" : "#64748B"} fontSize="10.5"
                      fontWeight={on ? 600 : 500} fontFamily="Inter, sans-serif"
                      style={{ transition: "fill .35s ease" }}>
                      {n.short}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* Detail */}
          <div className="lg:col-span-5">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="panel-light p-7"
            >
              <span className="type-technical text-[#C9A040] mb-3 block">Institution Type</span>
              <h3 className="font-display text-white text-xl font-semibold mb-3">{current.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{current.description}</p>

              <span className="type-technical text-slate-500 mb-3 block">Typical Challenges</span>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {current.challenges.map((c) => (
                  <span key={c} className="px-2.5 py-1 bg-[#0A1628] border border-white/[0.09] rounded text-[11.5px] text-slate-400">
                    {c}
                  </span>
                ))}
              </div>

              <Link
                href={`/industries/${current.slug}`}
                className="inline-flex items-center gap-1.5 py-2.5 type-technical text-white hover:text-[#C9A040] transition-colors group"
              >
                <span className="link-rule">Explore this sector</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Quick switcher for keyboard / touch */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {NODES.map((n, i) => (
                <button
                  key={n.slug}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`px-4 py-2.5 min-h-[40px] rounded-full text-[11.5px] font-medium border transition-all ${
                    i === active
                      ? "bg-[#0D1B2A] border-[#0D1B2A] text-white"
                      : "bg-white/[0.05] border-white/[0.09] text-slate-400 hover:border-[#C9A040]"
                  }`}
                >
                  {n.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
