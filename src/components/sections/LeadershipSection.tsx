"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEADERSHIP } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function LeadershipSection() {
  return (
    <section className="section-py bg-[#F8F6F1]">
      <div className="container-xl">
        <SectionHeader
          eyebrow="Leadership"
          title="Meet Our Senior Advisors"
          description="Our consultants bring direct practitioner experience from major regional insurance, reinsurance and financial institutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERSHIP.map((person, i) => (
            <motion.div
              key={person.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="bg-white rounded-xl border border-[#E4E0D6] overflow-hidden h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Photo placeholder */}
                <div className="h-52 bg-gradient-to-br from-[#0A1628] via-[#0D1B2A] to-[#1A3550] flex items-center justify-center relative overflow-hidden">
                  <div className="text-5xl font-display font-bold text-white/10">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {/* Gold line bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A040] to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div>
                    <h3 className="text-base font-semibold text-[#0D1B2A] leading-tight">
                      {person.name}
                    </h3>
                    {person.credentials && (
                      <span className="text-xs font-medium text-[#A8801A] ml-1.5">
                        {person.credentials}
                      </span>
                    )}
                    <p className="text-xs text-[#64748B] mt-0.5 mb-3">{person.title}</p>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">{person.shortBio}</p>

                  {person.pastRoles.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#E4E0D6]">
                      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
                        Previous Experience
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {person.pastRoles.map((role) => (
                          <span
                            key={role}
                            className="px-2 py-0.5 bg-[#F8F6F1] border border-[#E4E0D6] text-xs text-[#64748B] rounded"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/about#${person.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-[#A8801A] hover:text-[#8B6914] transition-colors"
                  >
                    Full profile <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
