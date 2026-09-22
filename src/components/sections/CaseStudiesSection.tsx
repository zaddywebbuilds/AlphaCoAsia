"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DisciplineHero, SUBJECT_FOR_SERVICE } from "@/components/viz/DisciplineImage";
import { CASE_STUDIES } from "@/lib/data";

/* Paired 6/6 rows, closed by a full-width card. The spans used to be uneven
   (7/5, 5/7) for editorial rhythm, but with the covers now on a fixed 16:9 the
   two bands in a row differed by ~115px in height, and grid stretch dumped that
   difference as dead space inside the narrower card. Equal spans give identical
   bands; the wide closer still breaks the grid. */
const SPAN = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-12"];


export function CaseStudiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative section-py bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-70" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Track Record</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Selected engagements
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
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
                  className="absolute inset-x-0 top-0 bottom-0 rounded-[12px] bg-[#0E1B30] border border-white/[0.09] translate-x-[7px] translate-y-[7px] group-hover:translate-x-[13px] group-hover:translate-y-[11px] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 bottom-0 rounded-[12px] bg-[#12213A] border border-white/[0.09] translate-x-[3.5px] translate-y-[3.5px] group-hover:translate-x-[6.5px] group-hover:translate-y-[5.5px] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                {/* Cover sheet */}
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className={`relative flex h-full bg-[#0E1B30] rounded-[12px] border border-white/[0.09] overflow-hidden shadow-[0_2px_4px_rgba(10,22,40,0.04)] group-hover:shadow-[0_26px_54px_-26px_rgba(10,22,40,0.42)] group-hover:-translate-y-[3px] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    wide ? "flex-col lg:flex-row lg:items-center" : "flex-col"
                  }`}
                >
                  {/* File tab */}
                  <span className="absolute top-0 left-8 h-[3px] w-16 bg-[#C9A040] rounded-b-sm" />
                  {/* Corner registration marks */}
                  <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C9A040]/0 group-hover:border-[#C9A040]/60 transition-colors duration-500" />
                  <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C9A040]/0 group-hover:border-[#C9A040]/60 transition-colors duration-500 z-10" />

                  {/* The full 16:9 frame in an aspect box — nothing is cropped at
                     any width, and the band scales with the card instead of
                     sitting at a fixed height that slices the image. */}
                  <DisciplineHero
                    id={SUBJECT_FOR_SERVICE[cs.service] ?? "enterprise-risk-management"}
                    sizes={
                      wide
                        ? "(max-width: 1024px) 100vw, 45vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    }
                    className={`w-full aspect-video shrink-0 ${wide ? "lg:w-[45%]" : ""}`}
                  />

                  <div className={`p-7 sm:p-8 flex flex-col flex-1 ${wide ? "lg:justify-center" : ""}`}>
                    <div>
                      <div className="flex items-baseline gap-4 mb-5">
                        <span className="type-index text-white/13 text-[2.75rem] group-hover:text-[#C9A040]/35 transition-colors duration-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1 pt-1">
                          <span className="type-technical text-[#C9A040]">{cs.service}</span>
                          <span className="flex items-center gap-1 type-technical text-slate-500">
                            <MapPin size={9} /> {cs.market} · {cs.industry}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display text-white text-xl sm:text-[1.4rem] font-semibold leading-snug mb-3">
                        <span className="link-rule">{cs.title}</span>
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cs.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 bg-[#0A1628] border border-white/[0.09] rounded text-[11px] text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 type-technical text-white group-hover:text-[#C9A040] transition-colors">
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
            className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#12213A]"
          >
            View all engagements
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
