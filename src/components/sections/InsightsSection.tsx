import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { INSIGHTS_PLACEHOLDER } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function InsightsSection() {
  return (
    <section className="section-py bg-[#F8F6F1]">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Insights"
            title="Perspectives on Insurance, Risk & Regulation"
          />
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1B2A] hover:text-[#A8801A] transition-colors whitespace-nowrap shrink-0"
          >
            All insights <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INSIGHTS_PLACEHOLDER.map((insight) => (
            <Link
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              className="card bg-white p-6 flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-[#EDF3F9] text-[#1A3550] text-xs font-semibold rounded-md">
                  {insight.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#0D1B2A] leading-snug mb-3 group-hover:text-[#1A3550] transition-colors">
                {insight.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed flex-1">{insight.excerpt}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E4E0D6]">
                <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                  <Clock size={11} />
                  {insight.readTime}
                </span>
                <span className="text-xs text-[#94A3B8]">{insight.author}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
