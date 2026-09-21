"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXPERTISE } from "@/lib/data";
import { DisciplineImage } from "@/components/viz/DisciplineImage";

export function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative section-py bg-[#080D16] overflow-hidden">
      <div className="absolute inset-0 tex-grid-fine opacity-40" />
      <div className="absolute top-[-12%] right-[-6%] w-[560px] h-[560px] rounded-full bg-[#C9A040] opacity-[0.07] blur-[150px]" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">Our Expertise</span>
            </div>
            <h2
              className="font-display text-white leading-[1.06]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.3rem)", fontWeight: 600, letterSpacing: "-0.028em" }}
            >
              Specialist advisory across the
              <br className="hidden sm:block" />{" "}
              <span className="bg-[linear-gradient(100deg,#F0E4C0,#C9A040_70%)] bg-clip-text text-transparent">
                insurance &amp; risk value chain
              </span>
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

        {/* Dense photo grid — the image is the card, text sits on it */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <Link
                href={`/expertise/${item.slug}`}
                className="group relative block h-full min-h-[232px] rounded-[14px] overflow-hidden border border-white/[0.09] hover:border-[#C9A040]/45 transition-colors duration-500 shadow-[0_20px_46px_-26px_rgba(0,0,0,0.95)]"
              >
                <div className="absolute inset-0">
                  <DisciplineImage id={item.slug} priority={i < 4} className="w-full h-full" />
                </div>

                {/* Legibility scrim under the copy */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,18,0.94)_0%,rgba(5,10,18,0.58)_40%,rgba(5,10,18,0.08)_74%,transparent_100%)]" />

                <span className="absolute top-4 left-5 type-technical text-[#C9A040]/85 z-10">
                  {item.shortTitle}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 pr-16 z-10">
                  <h3 className="font-display text-white text-[17px] font-semibold leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-slate-300/85 leading-relaxed line-clamp-2">
                    {item.tagline}
                  </p>
                </div>

                <span className="absolute bottom-5 right-5 z-10 w-9 h-9 rounded-full border border-[#C9A040]/45 flex items-center justify-center text-[#C9A040] group-hover:bg-[#C9A040] group-hover:text-[#221805] group-hover:border-[#C9A040] transition-all duration-400">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
