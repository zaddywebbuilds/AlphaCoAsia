"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { INSIGHTS_PLACEHOLDER } from "@/lib/data";

/* Article subject keyed off its category, so the index reads as one art-directed
   set rather than assorted imagery. */
const SUBJECT_FOR: Record<string, string> = {
  "Regulatory Compliance": "regulatory-licensing",
  "Risk & Governance": "enterprise-risk-management",
  Actuarial: "actuarial-consulting",
  "Fintech & Insurtech": "insurtech-digital",
  "APAC Markets": "market-entry",
};

export function InsightsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <section ref={ref} className="relative section-py bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-40" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Insights</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Research &amp; perspectives
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Our publishing programme covers regulatory developments, risk practice and actuarial
              matters across Asia Pacific. The first pieces are in preparation.
            </p>
          </div>
        </div>

        {/* Editorial index */}
        <div className="border-t border-white/[0.09]">
          {INSIGHTS_PLACEHOLDER.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 sm:grid-cols-[72px_1fr_auto] items-center gap-5 py-7 border-b border-white/[0.09]"
            >
              <span className="type-index text-white/14 text-[2.4rem] group-hover:text-[#C9A040]/40 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="type-technical text-[#C9A040]">{a.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="type-technical text-slate-500 flex items-center gap-1">
                    <Clock size={9} /> {a.readTime}
                  </span>
                  <span className="px-2 py-0.5 border border-white/[0.09] rounded type-technical text-slate-500">
                    In Preparation
                  </span>
                </div>
                <h3 className="font-display text-white text-lg sm:text-xl font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="text-[13.5px] text-slate-400 leading-relaxed mt-1.5 max-w-2xl">
                  {a.excerpt}
                </p>
              </div>

              <DisciplineImage
                id={SUBJECT_FOR[a.category] ?? "enterprise-risk-management"}
                className="hidden sm:block w-[150px] h-[84px] shrink-0 rounded-lg"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-[13px] text-slate-500 max-w-md leading-relaxed">
            To be notified when the first pieces are published, get in touch.
          </p>
          <Link
            href="/insights"
            className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#12213A]"
          >
            View the programme
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
