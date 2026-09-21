"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const differentiators = [
  {
    title: "Senior Practitioners",
    description:
      "Every engagement is led by experienced professionals, not delegated to junior staff. You work directly with the expertise you are paying for.",
  },
  {
    title: "Specialist Depth",
    description:
      "Our focus is insurance, actuarial, risk and regulatory advisory. This is not a side practice within a generalist firm — it is our entire focus.",
  },
  {
    title: "Regional Understanding",
    description:
      "Experience across Singapore, Hong Kong, Malaysia, Indonesia and broader Asia Pacific markets means we understand local regulatory expectations and market dynamics.",
  },
  {
    title: "Practical Implementation",
    description:
      "We deliver recommendations that can actually be implemented. We have the operational experience to help clients navigate from strategy to execution.",
  },
  {
    title: "Cross-Functional Expertise",
    description:
      "Actuarial, compliance, risk, regulatory and digital capabilities allow us to support complex, multi-disciplinary advisory requirements from a single trusted team.",
  },
  {
    title: "Boutique Access",
    description:
      "The accountability and direct senior access of a boutique firm, combined with credentials earned across major regional insurance and financial institutions.",
  },
];

export function WhyAlpha() {
  return (
    <section className="section-py bg-[#0A1628] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="whygrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whygrid)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A040] to-transparent opacity-60" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-[#C9A040] opacity-[0.03] blur-3xl" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Why Alpha Consultant"
              title="Senior Expertise. Direct Access. Practical Execution."
              description="Large consultancies sell scale. Alpha Consultant offers specialist depth, senior-level involvement and the kind of direct access that drives better outcomes for clients."
              light
            />
            <blockquote className="border-l-2 border-[#C9A040] pl-5 mt-8">
              <p className="text-sm text-slate-400 italic leading-relaxed">
                &ldquo;Alpha doesn&apos;t need a website that merely looks newer. It needs a website that finally reflects the calibre of the people behind the company.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="p-5 rounded-xl bg-[#0D1B2A] border border-white/8 hover:border-[#C9A040]/40 transition-colors duration-300"
              >
                <div className="w-6 h-0.5 bg-[#C9A040] mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
