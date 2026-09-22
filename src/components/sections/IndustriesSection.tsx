"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/useClient";

const SHORT: Record<string, string> = {
  "insurance-companies": "Insurers",
  "insurance-brokers": "Brokers",
  "financial-advisers": "Advisers",
  "fintech-insurtech": "Fintech",
  banking: "Banks",
  "asset-management": "Asset Mgrs",
  "professional-services": "Prof. Services",
};

/* Orbital geometry. A true circle rather than the old ellipse — the squashed
   orbit read as a mistake rather than as perspective. */
const CX = 300;
const CY = 230;
const R_ORBIT = 168;
const R_CORE = 58;
const R_INNER_RING = 96;
const R_OUTER_RING = 212;

const NODES = INDUSTRIES.map((ind, i) => {
  const deg = -90 + (360 / INDUSTRIES.length) * i;
  const a = deg * (Math.PI / 180);
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    ...ind,
    short: SHORT[ind.slug] ?? ind.title,
    deg,
    cos,
    sin,
    x: CX + cos * R_ORBIT,
    y: CY + sin * R_ORBIT,
  };
});

/* Label placement: nodes near the vertical axis get a centred label above or
   below; everything else sits outboard of the node on its own side. */
function labelFor(n: (typeof NODES)[number]) {
  const vertical = Math.abs(n.cos) < 0.25;
  if (vertical) {
    return {
      anchor: "middle" as const,
      x: n.x,
      y: n.y + (n.sin < 0 ? -26 : 34),
    };
  }
  return {
    anchor: (n.cos > 0 ? "start" : "end") as "start" | "end",
    x: n.x + (n.cos > 0 ? 24 : -24),
    y: n.y + 4,
  };
}

export function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const current = INDUSTRIES[active];
  const activeNode = NODES[active];

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
            <svg
              viewBox="0 0 600 470"
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={`Alpha Consultant at the centre of the financial services ecosystem, connected to ${NODES.map((n) => n.title).join(", ")}. Currently showing ${current.title}.`}
            >
              <defs>
                {/* Core halo */}
                <radialGradient id="ind-core-glow">
                  <stop offset="0%" stopColor="#C9A040" stopOpacity="0.30" />
                  <stop offset="55%" stopColor="#C9A040" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#C9A040" stopOpacity="0" />
                </radialGradient>
                {/* Core disc fill — lit from the top left */}
                <radialGradient id="ind-core-fill" cx="36%" cy="30%">
                  <stop offset="0%" stopColor="#1B2F4E" />
                  <stop offset="100%" stopColor="#0B1526" />
                </radialGradient>
                {/* Active node halo */}
                <radialGradient id="ind-node-glow">
                  <stop offset="0%" stopColor="#C9A040" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#C9A040" stopOpacity="0" />
                </radialGradient>
                {/* Active link: bright at the hub, fading toward the node */}
                <linearGradient id="ind-link" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C9A040" stopOpacity="0.15" />
                  <stop offset="45%" stopColor="#E8D9A8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#C9A040" stopOpacity="0.9" />
                </linearGradient>
                <filter id="ind-soft" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* ── Orbital rings ── */}
              {[R_INNER_RING, R_ORBIT, R_OUTER_RING].map((r, i) => (
                <motion.circle
                  key={`ring-${r}`}
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill="none"
                  stroke="#C9A040"
                  strokeOpacity={i === 1 ? 0.2 : 0.1}
                  strokeWidth={i === 1 ? 1 : 0.8}
                  strokeDasharray={i === 2 ? "2 7" : undefined}
                  initial={{ scale: 0.86, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />
              ))}

              {/* Slow radar sweep on the outer ring */}
              {!reduced && (
                <motion.g
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                  animate={inView ? { rotate: 360 } : {}}
                  transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx={CX}
                    cy={CY}
                    r={R_OUTER_RING}
                    fill="none"
                    stroke="#C9A040"
                    strokeOpacity="0.4"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeDasharray={`90 ${2 * Math.PI * R_OUTER_RING - 90}`}
                  />
                </motion.g>
              )}

              {/* ── Spokes: the full lattice, so the thing reads as a network ── */}
              {NODES.map((n, i) => (
                <motion.line
                  key={`spoke-${n.slug}`}
                  x1={CX}
                  y1={CY}
                  x2={CX + n.cos * R_OUTER_RING}
                  y2={CY + n.sin * R_OUTER_RING}
                  stroke="#C9A040"
                  strokeWidth="0.7"
                  strokeOpacity={i === active ? 0.22 : 0.08}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transition: "stroke-opacity .45s ease" }}
                />
              ))}

              {/* ── Connections, hub to node ── */}
              {NODES.map((n, i) => {
                const on = i === active;
                return (
                  <motion.line
                    key={`link-${n.slug}`}
                    x1={CX}
                    y1={CY}
                    x2={n.x}
                    y2={n.y}
                    stroke={on ? "url(#ind-link)" : "#5B7299"}
                    strokeWidth={on ? 2.2 : 1}
                    strokeOpacity={on ? 1 : 0.32}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transition: "stroke-width .45s ease, stroke-opacity .45s ease" }}
                  />
                );
              })}

              {/* Pulse running out along the live connection */}
              {!reduced && inView && (
                <motion.circle
                  key={`pulse-${activeNode.slug}`}
                  r="3.2"
                  fill="#F0E4BE"
                  animate={{
                    cx: [CX, activeNode.x],
                    cy: [CY, activeNode.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.75, 1] }}
                />
              )}

              {/* ── Core ── */}
              <circle cx={CX} cy={CY} r={R_CORE + 46} fill="url(#ind-core-glow)" />
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                {!reduced && (
                  <motion.circle
                    cx={CX}
                    cy={CY}
                    r={R_CORE + 10}
                    fill="none"
                    stroke="#C9A040"
                    strokeWidth="1"
                    animate={{ r: [R_CORE + 8, R_CORE + 22], opacity: [0.34, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <circle cx={CX} cy={CY} r={R_CORE} fill="url(#ind-core-fill)" />
                <circle cx={CX} cy={CY} r={R_CORE} fill="none" stroke="#C9A040" strokeWidth="1.3" strokeOpacity="0.62" />
                <circle cx={CX} cy={CY} r={R_CORE - 9} fill="none" stroke="#C9A040" strokeWidth="0.6" strokeOpacity="0.22" />
                <text
                  x={CX}
                  y={CY - 3}
                  textAnchor="middle"
                  className="ind-core-title"
                  fill="#fff"
                  fontSize="19"
                  fontWeight="600"
                  fontFamily="Playfair Display, serif"
                >
                  Alpha
                </text>
                <text
                  x={CX}
                  y={CY + 15}
                  textAnchor="middle"
                  className="ind-core-sub"
                  fill="#C9A040"
                  fontSize="7.5"
                  letterSpacing="2.6"
                  fontFamily="Inter, sans-serif"
                >
                  ADVISORY
                </text>
              </motion.g>

              {/* ── Institution nodes ── */}
              {NODES.map((n, i) => {
                const on = i === active;
                const lbl = labelFor(n);
                return (
                  <motion.g
                    key={n.slug}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    {/* Generous invisible hit area */}
                    <circle cx={n.x} cy={n.y} r="30" fill="transparent" />

                    {on && <circle cx={n.x} cy={n.y} r="30" fill="url(#ind-node-glow)" filter="url(#ind-soft)" />}
                    {on && !reduced && (
                      <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r="15"
                        fill="none"
                        stroke="#C9A040"
                        strokeWidth="1.2"
                        animate={{ r: [13, 27], opacity: [0.6, 0] }}
                        transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}

                    {/* Ring + disc */}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={on ? 14 : 10}
                      fill={on ? "#C9A040" : "#12233D"}
                      style={{ transition: "r .35s ease" }}
                    />
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={on ? 14 : 10}
                      fill="none"
                      stroke={on ? "#F0E4BE" : "#7F91AC"}
                      strokeWidth={on ? 1.6 : 1.2}
                      strokeOpacity={on ? 0.9 : 0.55}
                      style={{ transition: "r .35s ease, stroke .35s ease" }}
                    />
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={on ? 4.6 : 3.2}
                      fill={on ? "#221805" : "#C9A040"}
                      fillOpacity={on ? 0.85 : 0.75}
                      style={{ transition: "r .35s ease, fill .35s ease" }}
                    />

                    {/* Label — always light. The old active colour was #0D1B2A,
                       which is invisible against this section's navy. */}
                    <text
                      x={lbl.x}
                      y={lbl.y}
                      textAnchor={lbl.anchor}
                      className="ind-label"
                      fill={on ? "#F0E4BE" : "#8FA2BD"}
                      fontSize="12"
                      fontWeight={on ? 600 : 500}
                      fontFamily="Inter, sans-serif"
                      letterSpacing={on ? "0.02em" : "0"}
                      style={{ transition: "fill .35s ease" }}
                    >
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
                      ? "bg-[#C9A040] border-[#C9A040] text-[#221805] font-semibold"
                      : "bg-white/[0.05] border-white/[0.09] text-slate-400 hover:border-[#C9A040] hover:text-white"
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
