"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Calculator, BarChart2, TrendingUp, FileText, Lock, Zap, Globe, BarChart } from "lucide-react";
import { EXPERTISE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  calculator: Calculator,
  chart: BarChart2,
  trending: TrendingUp,
  document: FileText,
  lock: Lock,
  zap: Zap,
  globe: Globe,
  "bar-chart": BarChart,
};

export function ExpertiseSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-xl">
        <SectionHeader
          eyebrow="Our Expertise"
          title="Specialist Advisory Across the Insurance & Risk Value Chain"
          description="From regulatory licensing to ERM and actuarial analytics, we bring senior-level expertise to every engagement."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERTISE.map((item, i) => {
            const Icon = ICONS[item.icon] || Shield;
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/expertise/${item.slug}`}
                  className="card p-6 flex flex-col h-full group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EDF3F9] flex items-center justify-center mb-4 group-hover:bg-[#0D1B2A] transition-colors">
                    <Icon
                      size={18}
                      className="text-[#1A3550] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[#0D1B2A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                    {item.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#A8801A] group-hover:text-[#8B6914] transition-colors">
                    Learn more
                    <ArrowRight
                      size={12}
                      className="translate-x-0 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
