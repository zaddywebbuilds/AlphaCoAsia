"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const challenges = [
  {
    label: "Entering a new Asian market",
    href: "/expertise/market-entry",
    tag: "Market Entry",
  },
  {
    label: "Navigating regulatory licensing",
    href: "/expertise/regulatory-licensing",
    tag: "Regulatory",
  },
  {
    label: "Strengthening your ERM framework",
    href: "/expertise/enterprise-risk-management",
    tag: "ERM",
  },
  {
    label: "Preparing or reviewing ORSA",
    href: "/expertise/orsa-advisory",
    tag: "ORSA",
  },
  {
    label: "Reviewing AML/CFT controls",
    href: "/expertise/aml-cft",
    tag: "AML/CFT",
  },
  {
    label: "Developing a digital insurance proposition",
    href: "/expertise/insurtech-digital",
    tag: "Insurtech",
  },
  {
    label: "Navigating RBC2 requirements",
    href: "/expertise/risk-based-capital",
    tag: "RBC",
  },
  {
    label: "Training your risk or insurance team",
    href: "/training",
    tag: "Training",
  },
];

export function ChallengeNav() {
  return (
    <section className="section-py bg-[#0D1B2A] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="challengegrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#challengegrid)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A040] to-transparent opacity-60" />

      <div className="container-xl relative z-10">
        <SectionHeader
          eyebrow="Start Here"
          title="What Challenge Are You Facing?"
          description="Find the right advisory service based on what your business needs right now."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {challenges.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-start justify-between p-5 bg-[#0A1628] rounded-xl border border-white/8 hover:bg-[#1A3550] hover:border-[#C9A040]/40 group transition-all duration-300"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-[#C9A040]/15 text-[#C9A040] text-xs font-semibold rounded mb-2">
                  {c.tag}
                </span>
                <p className="text-sm font-medium text-slate-200 leading-snug group-hover:text-white transition-colors">
                  {c.label}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="text-[#C9A040] shrink-0 ml-3 mt-0.5 translate-x-0 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
