"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0A1628] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A040] to-transparent opacity-60" />

      {/* Subtle glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#1A3550] opacity-30 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#0D2A4A] opacity-20 blur-3xl" />

      <div className="container-xl relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/8 border border-white/12 rounded-full mb-8"
          >
            <MapPin size={12} className="text-[#C9A040]" />
            <span className="text-xs font-medium text-slate-300 tracking-wide">
              Singapore Based &middot; Asia Pacific Advisory
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-white mb-6"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            Insurance, Risk, Actuarial{" "}
            <span className="text-[#C9A040]">&amp;</span>
            <br />
            Regulatory Advisory
            <br />
            Across Asia Pacific
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-10"
          >
            Helping insurers, financial institutions, fintechs and growing businesses navigate
            regulation, risk, market entry and transformation across Asia Pacific.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A040] text-white text-sm font-semibold rounded-md hover:bg-[#A8801A] transition-colors"
            >
              Discuss Your Challenge
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white text-sm font-medium rounded-md hover:bg-white/16 border border-white/20 hover:border-white/30 transition-all"
            >
              Explore Our Expertise
            </Link>
          </motion.div>

          {/* Discipline tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-12"
          >
            {[
              "Enterprise Risk Management",
              "Actuarial",
              "ORSA",
              "RBC2",
              "Regulatory Licensing",
              "AML/CFT",
              "Insurtech",
              "Market Entry",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/6 border border-white/10 rounded-full text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628]/80 to-transparent" />
    </section>
  );
}
