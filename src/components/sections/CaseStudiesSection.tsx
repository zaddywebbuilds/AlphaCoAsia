"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CaseStudiesSection({ limit = 4 }: { limit?: number }) {
  const items = CASE_STUDIES.slice(0, limit);

  return (
    <section className="section-py bg-[#F8F6F1]">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Track Record"
            title="Selected Engagements"
            description="A selection of advisory and consulting engagements across insurance, risk and regulatory disciplines."
          />
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1B2A] hover:text-[#A8801A] transition-colors whitespace-nowrap shrink-0"
          >
            View all engagements <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col h-full bg-white rounded-xl border border-[#E4E0D6] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gold slide-in bar */}
                <div className="h-0.5 bg-gradient-to-r from-[#C9A040] to-[#A8801A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#EDF3F9] text-[#1A3550] text-xs font-semibold rounded-md">
                      {cs.industry}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#64748B]">
                      <MapPin size={10} />
                      {cs.market}
                    </span>
                  </div>
                  <span className="text-xs text-[#A8801A] font-medium">{cs.service}</span>
                </div>

                <h3 className="text-base font-semibold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#1A3550]">
                  {cs.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed flex-1">{cs.challenge}</p>

                <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-[#E4E0D6] text-xs font-semibold text-[#A8801A]">
                  Read engagement
                  <ArrowRight size={11} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
