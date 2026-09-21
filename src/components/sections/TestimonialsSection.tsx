"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/useClient";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = usePrefersReducedMotion();
  const t = TESTIMONIALS[i];

  const go = useCallback((d: number) => {
    setDir(d);
    setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Advance on a slow cadence; pauses entirely under reduced motion.
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => go(1), 9000);
    return () => window.clearInterval(id);
  }, [reduced, inView, go]);

  return (
    <section ref={ref} className="relative section-py bg-[#05090F] overflow-hidden tex-grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_40%_45%,#12263D_0%,#05090F_72%)]" />
      <div className="absolute inset-0 tex-grid-fine opacity-30" />

      {/* Dimensional quote glyph sitting behind the text */}
      <div
        aria-hidden
        className="absolute left-[3%] top-[16%] select-none pointer-events-none font-display text-[#C9A040] leading-none"
        style={{ fontSize: "clamp(14rem, 30vw, 30rem)", opacity: 0.055 }}
      >
        &ldquo;
      </div>

      <div className="container-xl relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-[#C9A040]" />
          <span className="type-technical text-[#C9A040]">What Clients Say</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 14, rotateX: reduced ? 0 : -4 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -10, rotateX: reduced ? 0 : 3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="scene-3d"
              >
                <p
                  className="font-display text-white leading-[1.32] mb-9"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.05rem)", fontWeight: 400, letterSpacing: "-0.015em" }}
                >
                  {t.quote}
                </p>
                <footer className="flex items-center gap-4">
                  <span className="w-10 h-px bg-[#C9A040]" />
                  <div>
                    <cite className="not-italic text-[15px] font-semibold text-white block">{t.author}</cite>
                    <span className="text-[13px] text-slate-400">
                      {t.role} · <span className="text-[#C9A040]">{t.company}</span>
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between lg:justify-end gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#C9A040] hover:text-[#C9A040] transition-colors"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#C9A040] hover:text-[#C9A040] transition-colors"
              >
                <ArrowRight size={15} />
              </button>
            </div>
            <div className="flex lg:flex-col items-center lg:items-end gap-2">
              <span className="type-technical text-slate-600 tabular">
                {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
              <div className="flex lg:flex-col gap-1.5">
                {TESTIMONIALS.map((_, n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setDir(n > i ? 1 : -1);
                      setI(n);
                    }}
                    aria-label={`Testimonial ${n + 1}`}
                    aria-current={n === i}
                    className={`transition-all duration-400 rounded-full ${
                      n === i ? "bg-[#C9A040] w-5 h-1 lg:w-1 lg:h-5" : "bg-white/20 w-1.5 h-1 lg:w-1 lg:h-1.5 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
