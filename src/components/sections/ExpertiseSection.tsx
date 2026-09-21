"use client";
import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXPERTISE } from "@/lib/data";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { usePrefersReducedMotion, useDeviceTier } from "@/lib/useClient";

/* Static depth offsets — the matrix sits on three planes rather than one flat
   sheet, so the grid reads dimensional before anyone moves the pointer. */
const PLANE = [0, -14, -6, -8, 0, -16, -12, -4, -10];

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const tiltOff = reduced || tier === "low";

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (tiltOff) return;
      const { clientX, clientY } = e;
      for (const el of cards.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dx = (clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (clientY - (r.top + r.height / 2)) / (r.height / 2);
        // Falloff so only nearby cards respond — avoids the whole grid waving.
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / 2.6);
        el.style.setProperty("--ty", `${(dx * 4 * f).toFixed(2)}deg`);
        el.style.setProperty("--tx", `${(-dy * 3 * f).toFixed(2)}deg`);
      }
    },
    [tiltOff]
  );

  const onLeave = useCallback(() => {
    for (const el of cards.current) {
      if (!el) continue;
      el.style.setProperty("--ty", "0deg");
      el.style.setProperty("--tx", "0deg");
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative section-py bg-[#0A1119] overflow-hidden tex-grain">
      <div className="absolute inset-0 tex-grid-fine opacity-50" />
      <div className="absolute top-[-10%] left-[-8%] w-[520px] h-[520px] rounded-full bg-[#1E3F9E] opacity-[0.13] blur-[130px]" />
      <div className="absolute bottom-[-14%] right-[-6%] w-[480px] h-[480px] rounded-full bg-[#1E9FD8] opacity-[0.08] blur-[130px]" />

      <div className="container-xl relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Our Expertise</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Specialist advisory across the
              <br className="hidden sm:block" /> insurance &amp; risk value chain
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              From regulatory licensing to ERM and actuarial analytics, we bring senior-level
              expertise to every engagement.
            </p>
          </div>
        </div>

        {/* Capability matrix */}
        <div
          className="matrix scene-3d grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                ref={(n) => {
                  cards.current[i] = n;
                }}
                href={`/expertise/${item.slug}`}
                className="tilt-card group/card relative flex flex-col h-full overflow-hidden rounded-[14px] border border-white/[0.09] bg-[linear-gradient(158deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015)_55%,rgba(255,255,255,0.035))] hover:border-[#38BDF8]/35 hover:[--tz:16px] focus-visible:[--tz:16px] shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)]"
                style={{ ["--tz" as string]: `${PLANE[i]}px` }}
              >
                {/* Lit top bevel */}
                <span className="absolute top-0 left-[14%] right-[14%] h-px bg-[linear-gradient(to_right,transparent,rgba(56,189,248,0.5),transparent)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20" />

                {/* Full-bleed discipline panel */}
                <DisciplineImage id={item.slug} className="h-[168px] border-b border-white/[0.07]" />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="type-technical text-slate-600 tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="type-technical text-[#38BDF8]/60">{item.shortTitle}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-slate-400 leading-relaxed">
                    {item.tagline}
                  </p>

                  <div className="mt-auto pt-5 flex items-center gap-1.5 type-technical text-[#C9A040] opacity-0 group-hover/card:opacity-100 translate-y-1 group-hover/card:translate-y-0 transition-all duration-400">
                    View discipline
                    <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
