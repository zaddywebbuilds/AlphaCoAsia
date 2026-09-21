"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section className="section-py bg-[#0D1B2A] relative overflow-hidden">
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A040] to-transparent opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A040] opacity-[0.03] blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        <SectionHeader
          eyebrow="What Clients Say"
          title="Trusted by Leading Financial Organisations"
          align="center"
          light
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#0A1628] rounded-2xl border border-white/10 p-10 overflow-hidden">
            {/* Large quote mark */}
            <Quote
              size={64}
              className="text-[#C9A040] opacity-10 absolute top-6 left-6"
              fill="currentColor"
            />
            {/* Gold accent left edge */}
            <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-[#C9A040] to-transparent opacity-60" />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-lg text-slate-200 leading-relaxed font-display italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A040] to-[#A8801A] flex items-center justify-center text-white text-sm font-semibold">
                    {t.author.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.role}</div>
                    <div className="text-sm text-[#C9A040]">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-6 bg-[#C9A040]" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-2 rounded-full border border-white/12 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIdx((p) => (p + 1) % TESTIMONIALS.length)}
                className="p-2 rounded-full border border-white/12 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
