import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { COMPANY } from "@/lib/data";

export function FinalCTA() {
  return (
    <section className="section-py bg-[#0A1628] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ctogrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctogrid)" />
        </svg>
      </div>

      {/* Gold accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A040] to-transparent opacity-50" />

      <div className="container-xl relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A040]" />
            <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
              Let&apos;s Talk
            </span>
            <div className="w-8 h-px bg-[#C9A040]" />
          </div>

          <h2 className="font-display text-white mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
            Navigating a Complex Insurance, Risk or Regulatory Challenge?
          </h2>

          <p className="text-slate-300 text-base leading-relaxed mb-10">
            Whether you are strengthening your risk framework, entering a new market, preparing for regulatory review or building a new insurance proposition, our team would be pleased to discuss how we can support you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A040] text-white font-semibold rounded-md hover:bg-[#A8801A] transition-colors text-sm"
            >
              Start a Conversation
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-md hover:bg-white/16 border border-white/20 transition-all text-sm"
            >
              Explore Our Track Record
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={14} className="text-[#C9A040]" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={14} className="text-[#C9A040]" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
