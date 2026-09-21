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
    <section ref={ref} className="relative bg-[#050A12] border-y border-[#C9A040]/15 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(201,160,64,0.05)_0%,transparent_55%,rgba(201,160,64,0.03)_100%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,rgba(201,160,64,0.5)_50%,transparent)]" />

      <div className="container-xl relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-0 py-11">
          <span className="hidden lg:block text-[13.5px] text-slate-400 lg:pr-10 lg:border-r lg:border-[#C9A040]/18 shrink-0">
            Specialist advisory across
            <br /> Asia Pacific
          </span>

          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, filter: "blur(7px)", y: 10 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 lg:px-10 text-center lg:text-left"
            >
              {i > 0 && (
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[linear-gradient(to_bottom,transparent,rgba(201,160,64,0.28),transparent)]" />
              )}
              <div
                className="font-display tabular bg-[linear-gradient(135deg,#F0E4C0,#C9A040_70%)] bg-clip-text text-transparent"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="type-technical text-slate-400 mt-3">{s.label}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:pl-10 lg:border-l lg:border-[#C9A040]/18 lg:max-w-[280px]"
          >
            <div className="type-technical text-[#C9A040]/70 mb-3">Practice Areas</div>
            <div className="flex flex-wrap gap-1.5">
              {DISCIPLINES.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 bg-[#C9A040]/[0.07] border border-[#C9A040]/20 rounded text-[11.5px] font-medium text-slate-300"
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
