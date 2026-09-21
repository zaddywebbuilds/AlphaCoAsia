"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "@/components/sections/HeroVideo";

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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050A12]">
      <HeroVideo />

      <div className="container-xl relative z-10 pt-32 pb-32">
        <div className="max-w-[46rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C9A040] opacity-70 anim-node" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A040]" />
            </span>
            <span className="type-technical text-[#D9C99A]">
              Singapore Based · Asia Pacific Advisory
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-display text-white mb-7"
            style={{
              fontSize: "clamp(2.5rem, 5.4vw, 4.6rem)",
              fontWeight: 600,
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
            }}
          >
            Insurance, Risk, Actuarial{" "}
            <span className="bg-[linear-gradient(100deg,#E8D9A8,#C9A040)] bg-clip-text text-transparent">
              &amp;
            </span>
            <br />
            Regulatory Advisory
            <br />
            <span className="bg-[linear-gradient(100deg,#F0E4C0,#C9A040_70%)] bg-clip-text text-transparent">
              Across Asia Pacific
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[17px] sm:text-[18px] text-slate-300/90 leading-relaxed max-w-xl mb-10"
          >
            Helping insurers, financial institutions, fintechs and growing businesses navigate
            regulation, risk, market entry and transformation across Asia Pacific.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3.5"
          >
            <Link
              href="/contact"
              className="btn-magnetic inline-flex items-center gap-2.5 px-8 py-4 rounded-md text-[14px] font-semibold text-[#221805] bg-[linear-gradient(135deg,#E8D9A8,#C9A040_55%,#B08C2E)] shadow-[0_14px_38px_-12px_rgba(201,160,64,0.55)]"
            >
              Discuss Your Challenge
              <ArrowRight size={15} className="btn-arrow" />
            </Link>
            <Link
              href="/expertise"
              className="btn-magnetic inline-flex items-center gap-2.5 px-8 py-4 rounded-md text-[14px] font-medium text-white border border-[#C9A040]/35 hover:border-[#C9A040]/70 hover:bg-[#C9A040]/[0.07]"
            >
              Explore Our Expertise
              <ArrowRight size={15} className="btn-arrow opacity-70" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Discipline legend rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-[#C9A040]/15"
      >
        <div className="container-xl">
          <div className="flex items-center gap-x-6 gap-y-2 py-4 overflow-x-auto scrollbar-none">
            <span className="type-technical text-[#C9A040]/80 shrink-0">Disciplines</span>
            <div className="w-px h-3 bg-[#C9A040]/25 shrink-0" />
            {DISCIPLINES.map((d) => (
              <span key={d} className="type-technical text-slate-400 whitespace-nowrap shrink-0">
                {d}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
