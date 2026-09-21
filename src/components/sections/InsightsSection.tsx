"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { INSIGHTS_PLACEHOLDER } from "@/lib/data";

/* Abstract data thumbnail — reveals on hover, keyed to the row index so each
   topic gets its own signature rather than a repeated motif. */
function Thumb({ n, on }: { n: number; on: boolean }) {
  const bars = [
    [22, 48, 34, 62, 40, 70],
    [58, 30, 66, 24, 52, 38],
    [30, 44, 58, 72, 50, 28],
  ][n % 3];
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={12 + i * 17}
          y={70 - h * 0.7}
          width="9"
          height={h * 0.7}
          fill={i === n % bars.length ? "#C9A040" : "#38BDF8"}
          opacity={on ? (i === n % bars.length ? 0.9 : 0.4) : 0.16}
          style={{
            transform: `scaleY(${on ? 1 : 0.45})`,
            transformOrigin: "bottom",
            transformBox: "fill-box",
            transition: `transform .55s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, opacity .45s ease`,
          }}
        />
      ))}
      <line x1="8" y1="70" x2="112" y2="70" stroke="#0D1B2A" strokeOpacity={on ? 0.35 : 0.14} strokeWidth="0.8" />
    </svg>
  );
}

export function InsightsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative section-py bg-white overflow-hidden">
      <div className="absolute inset-0 tex-grid-dark opacity-40" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#A8801A]" />
              <span className="type-technical text-[#A8801A]">Insights</span>
            </div>
            <h2
              className="font-display text-[#0D1B2A] leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Research &amp; perspectives
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h-dark mb-5" />
            <p className="text-sm text-[#64748B] leading-relaxed">
              Our publishing programme covers regulatory developments, risk practice and actuarial
              matters across Asia Pacific. The first pieces are in preparation.
            </p>
          </div>
        </div>

        {/* Editorial index */}
        <div className="border-t border-[#E4E0D6]">
          {INSIGHTS_PLACEHOLDER.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group grid grid-cols-1 sm:grid-cols-[72px_1fr_auto] items-center gap-5 py-7 border-b border-[#E4E0D6]"
            >
              <span className="type-index text-[#0D1B2A]/14 text-[2.4rem] group-hover:text-[#C9A040]/40 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="type-technical text-[#A8801A]">{a.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E4E0D6]" />
                  <span className="type-technical text-[#94A3B8] flex items-center gap-1">
                    <Clock size={9} /> {a.readTime}
                  </span>
                  <span className="px-2 py-0.5 border border-[#E4E0D6] rounded type-technical text-[#94A3B8]">
                    In Preparation
                  </span>
                </div>
                <h3 className="font-display text-[#0D1B2A] text-lg sm:text-xl font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="text-[13.5px] text-[#64748B] leading-relaxed mt-1.5 max-w-2xl">
                  {a.excerpt}
                </p>
              </div>

              <div className="hidden sm:block w-[108px] h-[72px] shrink-0">
                <Thumb n={i} on={hover === i} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-[13px] text-[#94A3B8] max-w-md leading-relaxed">
            To be notified when the first pieces are published, get in touch.
          </p>
          <Link
            href="/insights"
            className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0D1B2A] text-white text-sm font-semibold rounded-lg hover:bg-[#1A3550]"
          >
            View the programme
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
