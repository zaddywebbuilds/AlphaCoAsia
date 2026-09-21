"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";

/* Editorial spans — deliberately uneven so the row never reads as a card grid. */
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];

export function CaseStudiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative section-py bg-[#F8F6F1] overflow-hidden">
      <div className="absolute inset-0 tex-grid-dark opacity-70" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#A8801A]" />
              <span className="type-technical text-[#A8801A]">Track Record</span>
            </div>
            <h2
              className="font-display text-[#0D1B2A] leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Selected engagements
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h-dark mb-5" />
            <p className="text-sm text-[#64748B] leading-relaxed">
              Advisory and consulting work across insurance, risk, regulatory and actuarial
              disciplines throughout Asia Pacific.
            </p>
          </div>
        </div>

        {/* Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-6">
          {CASE_STUDIES.map((cs, i) => {
            const wide = i === 4;
            return (
              <motion.article
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`${SPAN[i]} scene-3d group relative`}
              >
                {/* Stacked sheets beneath the cover — the dossier's page edges */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 bottom-0 rounded-[12px] bg-[#ECE8DE] border border-[#DED9CC] translate-x-[7px] translate-y-[7px] group-hover:translate-x-[13px] group-hover:translate-y-[11px] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 bottom-0 rounded-[12px] bg-[#F3F0E8] border border-[#E4E0D6] translate-x-[3.5px] translate-y-[3.5px] group-hover:translate-x-[6.5px] group-hover:translate-y-[5.5px] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                {/* Cover sheet */}
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="relative block h-full bg-white rounded-[12px] border border-[#E4E0D6] overflow-hidden shadow-[0_2px_4px_rgba(10,22,40,0.04)] group-hover:shadow-[0_26px_54px_-26px_rgba(10,22,40,0.42)] group-hover:-translate-y-[3px] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  {/* File tab */}
                  <span className="absolute top-0 left-8 h-[3px] w-16 bg-[#C9A040] rounded-b-sm" />
                  {/* Corner registration marks */}
                  <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C9A040]/0 group-hover:border-[#C9A040]/60 transition-colors duration-500" />
                  <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C9A040]/0 group-hover:border-[#C9A040]/60 transition-colors duration-500" />

                  <div className={`p-7 sm:p-8 h-full flex ${wide ? "flex-col lg:flex-row lg:items-center gap-8" : "flex-col"}`}>
                    <div className={wide ? "lg:w-[58%]" : ""}>
                      <div className="flex items-baseline gap-4 mb-5">
                        <span className="type-index text-[#0D1B2A]/13 text-[2.75rem] group-hover:text-[#C9A040]/35 transition-colors duration-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1 pt-1">
                          <span className="type-technical text-[#A8801A]">{cs.service}</span>
                          <span className="flex items-center gap-1 type-technical text-[#94A3B8]">
                            <MapPin size={9} /> {cs.market} · {cs.industry}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display text-[#0D1B2A] text-xl sm:text-[1.4rem] font-semibold leading-snug mb-3">
                        <span className="link-rule">{cs.title}</span>
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className={wide ? "lg:w-[42%] lg:border-l lg:border-[#E4E0D6] lg:pl-8" : "mt-auto pt-6"}>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cs.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 bg-[#F8F6F1] border border-[#E4E0D6] rounded text-[11px] text-[#64748B]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 type-technical text-[#0D1B2A] group-hover:text-[#A8801A] transition-colors">
                        Open engagement
                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/case-studies"
            className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0D1B2A] text-white text-sm font-semibold rounded-lg hover:bg-[#1A3550]"
          >
            View all engagements
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
