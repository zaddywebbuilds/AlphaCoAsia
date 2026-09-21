"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlobeMount } from "@/components/three/GlobeMount";
import { HeroVideo } from "@/components/sections/HeroVideo";

/* Disciplines ringed around the globe like an instrument legend.
   Angles are hand-placed to clear the headline column and each other. */
const RING = [
  { label: "ERM", a: -108 },
  { label: "ORSA", a: -62 },
  { label: "RBC2", a: -18 },
  { label: "ACTUARIAL", a: 26 },
  { label: "REGULATORY", a: 68 },
  { label: "AML/CFT", a: 112 },
];

const DISCIPLINES = [
  "Enterprise Risk Management",
  "Actuarial",
  "ORSA",
  "RBC2",
  "Regulatory Licensing",
  "AML/CFT",
  "Insurtech",
  "Market Entry",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#05090F] overflow-hidden tex-grain">
      {/* L1 base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#05090F_0%,#0A1628_46%,#071120_100%)]" />
      {/* L2 atmospheric lighting */}
      <div className="absolute top-[-18%] right-[-6%] w-[820px] h-[820px] rounded-full bg-[#1E9FD8] opacity-[0.10] blur-[130px]" />
      <div className="absolute bottom-[-24%] left-[-10%] w-[640px] h-[640px] rounded-full bg-[#1E3F9E] opacity-[0.16] blur-[140px]" />
      <div className="absolute top-[42%] left-[34%] w-[380px] h-[380px] rounded-full bg-[#C9A040] opacity-[0.045] blur-[120px]" />
      {/* L3 technical grid */}
      <div className="absolute inset-0 tex-grid opacity-60" />
      {/* L4 vignette */}
      <div className="absolute inset-0 tex-vignette" />
      {/* Top edge light */}
      <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,#C9A040_35%,#38BDF8_65%,transparent)] opacity-70" />

      <div className="container-xl relative z-10 pt-32 pb-24 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* ---------- content ---------- */}
          <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#C9A040] opacity-70 anim-node" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A040]" />
              </span>
              <span className="type-technical text-slate-400">
                Singapore Based · Asia Pacific Advisory
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-display text-white mb-7"
              style={{
                fontSize: "clamp(2.3rem, 4.6vw, 4.1rem)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.028em",
              }}
            >
              Insurance, Risk, Actuarial{" "}
              <span className="text-[#C9A040]">&amp;</span>
              <br />
              Regulatory Advisory
              <br />
              <span className="relative inline-block">
                Across Asia Pacific
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-[linear-gradient(to_right,#38BDF8,transparent)] opacity-60" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="text-[17px] text-slate-300/90 leading-relaxed max-w-xl mb-10"
            >
              Helping insurers, financial institutions, fintechs and growing businesses navigate
              regulation, risk, market entry and transformation across Asia Pacific.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9A040] text-[#0A1628] text-sm font-semibold rounded-md hover:bg-[#D4AF60] shadow-[0_10px_30px_-10px_rgba(201,160,64,0.6)]"
              >
                Discuss Your Challenge
                <ArrowRight size={15} className="btn-arrow" />
              </Link>
              <Link
                href="/expertise"
                className="btn-magnetic inline-flex items-center gap-2.5 px-7 py-3.5 text-white text-sm font-medium rounded-md border border-white/18 hover:border-[#38BDF8]/50 hover:bg-white/[0.04]"
              >
                Explore Our Expertise
                <ArrowRight size={15} className="btn-arrow opacity-60" />
              </Link>
            </motion.div>
          </div>

          {/* ---------- console: two surfaces, network above, footage below ---------- */}
          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="panel-dim overflow-hidden mx-auto w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[580px]"
            >
              {/* Console header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] anim-node" />
                  <span className="type-technical text-slate-400">APAC Network · Active</span>
                </div>
                <span className="type-technical text-slate-600 tabular hidden sm:block">
                  1.3521° N &nbsp;103.8198° E
                </span>
              </div>

              {/* Pane 1 — live network */}
              <div className="relative aspect-[4/3.05]">
                <GlobeMount />
                {RING.map((d, i) => {
                  const rad = (d.a * Math.PI) / 180;
                  return (
                    <motion.div
                      key={d.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.85 + i * 0.09 }}
                      className="absolute hidden sm:flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${50 + Math.cos(rad) * 43}%`,
                        top: `${50 + Math.sin(rad) * 41}%`,
                      }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                      <span className="type-technical text-[#8FE3FF]/55 whitespace-nowrap">{d.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pane 2 — footage */}
              <div className="relative border-t border-white/[0.08]">
                <div className="relative aspect-[16/6.2]">
                  <HeroVideo />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-2.5">
                    <span className="type-technical text-slate-300">Singapore</span>
                    <span className="type-technical text-[#C9A040]/70 hidden sm:block">Base of Operations</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Discipline legend rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.07] bg-[#05090F]/40 backdrop-blur-sm"
      >
        <div className="container-xl">
          <div className="flex items-center gap-x-6 gap-y-2 py-3.5 overflow-x-auto scrollbar-none">
            <span className="type-technical text-[#C9A040]/70 shrink-0">Disciplines</span>
            <div className="w-px h-3 bg-white/12 shrink-0" />
            {DISCIPLINES.map((d) => (
              <span key={d} className="type-technical text-slate-500 whitespace-nowrap shrink-0">
                {d}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
