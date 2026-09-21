"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Only verifiable figures. No count-up — the numbers resolve into focus. */
const STATS = [
  { value: "20+", label: "Years Industry Experience" },
  { value: "9", label: "APAC Markets" },
  { value: "5", label: "Core Disciplines" },
];

const DISCIPLINES = ["Insurance", "Risk", "Actuarial", "Regulatory", "Compliance"];

export function AuthorityStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative bg-[#070D18] border-y border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-40" />
      {/* Ribbon surface */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(255,255,255,0.028)_100%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,rgba(56,189,248,0.35)_30%,rgba(201,160,64,0.35)_70%,transparent)]" />

      <div className="container-xl relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-0 py-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, filter: "blur(7px)", y: 10 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 lg:px-9 first:lg:pl-0"
            >
              {/* Connector between cells */}
              {i > 0 && (
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.14),transparent)]" />
              )}
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display text-white tabular"
                  style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span className="w-5 h-px bg-[#C9A040] mb-2" />
              </div>
              <div className="type-technical text-slate-500 mt-2.5">{s.label}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:pl-9 lg:border-l lg:border-white/[0.09] lg:max-w-[300px]"
          >
            <div className="type-technical text-[#38BDF8]/55 mb-3">Practice Areas</div>
            <div className="flex flex-wrap gap-1.5">
              {DISCIPLINES.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.10] rounded text-[11.5px] font-medium text-slate-300"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
