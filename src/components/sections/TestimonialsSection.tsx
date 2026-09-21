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
    <section className="section-py bg-white">
      <div className="container-xl">
        <SectionHeader
          eyebrow="What Clients Say"
          title="Trusted by Leading Financial Organisations"
          align="center"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#F8F6F1] rounded-2xl border border-[#E4E0D6] p-10">
            <Quote
              size={40}
              className="text-[#C9A040] opacity-25 absolute top-8 left-8"
              fill="currentColor"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-lg text-[#0D1B2A] leading-relaxed font-display italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#1A3550] flex items-center justify-center text-white text-sm font-semibold">
                    {t.author.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0D1B2A]">{t.role}</div>
                    <div className="text-sm text-[#64748B]">{t.company}</div>
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
                    i === idx ? "w-6 bg-[#0D1B2A]" : "w-2 bg-[#E4E0D6]"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-2 rounded-full border border-[#E4E0D6] hover:bg-[#F8F6F1] text-[#64748B] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIdx((p) => (p + 1) % TESTIMONIALS.length)}
                className="p-2 rounded-full border border-[#E4E0D6] hover:bg-[#F8F6F1] text-[#64748B] transition-colors"
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
