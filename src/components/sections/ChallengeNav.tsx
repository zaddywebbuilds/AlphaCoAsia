"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { usePrefersReducedMotion, useDeviceTier } from "@/lib/useClient";

/* Each challenge carries the glyph of the discipline that answers it — the same
   diagram the visitor will meet again on the expertise card. */
const CHALLENGES = [
  { label: "Entering a new Asian market", href: "/expertise/market-entry", tag: "Market Entry", glyph: "market-entry", z: -10 },
  { label: "Navigating regulatory licensing", href: "/expertise/regulatory-licensing", tag: "Regulatory", glyph: "regulatory-licensing", z: 0 },
  { label: "Strengthening your ERM framework", href: "/expertise/enterprise-risk-management", tag: "ERM", glyph: "enterprise-risk-management", z: -14 },
  { label: "Preparing or reviewing ORSA", href: "/expertise/orsa-advisory", tag: "ORSA", glyph: "orsa-advisory", z: -4 },
  { label: "Reviewing AML/CFT controls", href: "/expertise/aml-cft", tag: "AML/CFT", glyph: "aml-cft", z: -6 },
  { label: "Developing a digital insurance proposition", href: "/expertise/insurtech-digital", tag: "Insurtech", glyph: "insurtech-digital", z: -16 },
  { label: "Navigating RBC2 requirements", href: "/expertise/risk-based-capital", tag: "RBC", glyph: "risk-based-capital", z: -2 },
  { label: "Training your risk or insurance team", href: "/training", tag: "Training", glyph: "training", z: -12 },
];

export function ChallengeNav() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);
  const panels = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const tiltOff = reduced || tier === "low";

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (tiltOff) return;
      for (const el of panels.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / 2.4);
        el.style.setProperty("--ty", `${(dx * 4 * f).toFixed(2)}deg`);
        el.style.setProperty("--tx", `${(-dy * 3 * f).toFixed(2)}deg`);
      }
    },
    [tiltOff]
  );

  const reset = useCallback(() => {
    setHover(null);
    for (const el of panels.current) {
      if (!el) continue;
      el.style.setProperty("--ty", "0deg");
      el.style.setProperty("--tx", "0deg");
    }
  }, []);

  return (
    <section ref={ref} className="relative section-py bg-[#070D18] overflow-hidden tex-grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,#12263D_0%,#070D18_70%)]" />
      <div className="absolute inset-0 tex-grid opacity-50" />
      <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,#C9A040_50%,transparent)] opacity-40" />

      <div className="container-xl relative z-10">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A040]" />
            <span className="type-technical text-[#C9A040]">Start Here</span>
          </div>
          <h2
            className="font-display text-white leading-[1.08] mb-5"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            What are you navigating?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Find the right advisory service based on what your business needs right now.
          </p>
        </div>

        <div
          className="scene-3d grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
          onPointerMove={onMove}
          onPointerLeave={reset}
        >
          {CHALLENGES.map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                ref={(n) => {
                  panels.current[i] = n;
                }}
                href={c.href}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="tilt-card group/p relative block h-full overflow-hidden rounded-[13px] border border-white/[0.09] bg-[linear-gradient(158deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018)_55%,rgba(255,255,255,0.04))] hover:border-[#C9A040]/40 hover:[--tz:18px] focus-visible:[--tz:18px] shadow-[0_20px_44px_-24px_rgba(0,0,0,0.9)]"
                style={{ ["--tz" as string]: `${c.z}px` }}
              >
                <span className="absolute top-0 left-[16%] right-[16%] h-px bg-[linear-gradient(to_right,transparent,rgba(201,160,64,0.6),transparent)] opacity-0 group-hover/p:opacity-100 transition-opacity duration-500" />

                {/* The subject surfaces behind the panel on hover */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: hover === i ? 0.42 : 0 }}
                >
                  <DisciplineImage id={c.glyph} className="w-full h-full" />
                </div>

                <div className="relative p-5 flex flex-col h-full min-h-[132px]">
                  <span className="inline-flex self-start px-2.5 py-1 bg-[#C9A040]/12 border border-[#C9A040]/22 text-[#C9A040] type-technical rounded mb-3">
                    {c.tag}
                  </span>
                  <p className="text-[13.5px] font-medium text-slate-200 leading-snug group-hover/p:text-white transition-colors pr-6">
                    {c.label}
                  </p>
                  <ArrowRight
                    size={13}
                    className="mt-auto ml-auto text-[#C9A040] translate-x-0 group-hover/p:translate-x-1 transition-transform duration-500"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
