"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function IndustriesSection() {
  return (
    <section className="section-py bg-[#F8F6F1]">
      <div className="container-xl">
        <SectionHeader
          eyebrow="Who We Help"
          title="Serving Financial Institutions Across the Region"
          description="Whether you are an insurer, a fintech, a bank or a professional services firm, we understand your regulatory environment and the challenges specific to your industry."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/industries/${item.slug}`}
                className="block p-5 bg-white rounded-xl border border-[#E4E0D6] hover:border-[#C9A040] hover:shadow-md transition-all group"
              >
                <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2 group-hover:text-[#1A3550]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#A8801A]">
                  Explore
                  <ArrowRight size={10} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
