"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Each challenge carries its own image, distinct from the discipline artwork
   used elsewhere, so the two sets never read as duplicates. */
const CHALLENGES = [
  { label: "Entering a new Asian market", href: "/expertise/market-entry", tag: "Market Entry", img: "market-entry" },
  { label: "Navigating regulatory licensing", href: "/expertise/regulatory-licensing", tag: "Regulatory", img: "regulatory-licensing" },
  { label: "Strengthening your ERM framework", href: "/expertise/enterprise-risk-management", tag: "ERM", img: "enterprise-risk-management" },
  { label: "Preparing or reviewing ORSA", href: "/expertise/orsa-advisory", tag: "ORSA", img: "orsa-advisory" },
  { label: "Reviewing AML/CFT controls", href: "/expertise/aml-cft", tag: "AML/CFT", img: "aml-cft" },
  { label: "Developing a digital insurance proposition", href: "/expertise/insurtech-digital", tag: "Insurtech", img: "insurtech-digital" },
  { label: "Navigating RBC2 requirements", href: "/expertise/risk-based-capital", tag: "RBC", img: "risk-based-capital" },
  { label: "Training your risk or insurance team", href: "/training", tag: "Training", img: "training" },
];

export function ChallengeNav() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative section-py bg-[#070D18] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,#12213A_0%,#070D18_70%)]" />
      <div className="absolute inset-0 tex-grid opacity-40" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CHALLENGES.map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={c.href}
                className="group/p relative block h-full min-h-[210px] rounded-[13px] overflow-hidden border border-white/[0.09] hover:border-[#C9A040]/45 transition-colors duration-500 shadow-[0_20px_44px_-24px_rgba(0,0,0,0.9)]"
              >
                {/* The image is the card, at full clarity */}
                <Image
                  src={`${BASE}/media/challenges/${c.img}.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover/p:scale-[1.05] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* Bottom-weighted only, so the top of the frame stays clear */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,18,0.95)_0%,rgba(5,10,18,0.68)_32%,rgba(5,10,18,0.12)_64%,transparent_86%)]" />

                <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#050A12]/70 backdrop-blur-sm border border-[#C9A040]/30 text-[#C9A040] type-technical rounded">
                  {c.tag}
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 pr-12">
                  <p className="text-[13.5px] font-medium text-white leading-snug">{c.label}</p>
                </div>

                <span className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full border border-[#C9A040]/45 bg-[#050A12]/60 backdrop-blur-sm flex items-center justify-center text-[#C9A040] group-hover/p:bg-[#C9A040] group-hover/p:text-[#221805] group-hover/p:border-[#C9A040] transition-all duration-400">
                  <ArrowRight size={13} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
