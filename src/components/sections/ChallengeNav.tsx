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
    label: "Applying for a MAS licence",
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
    <section className="section-py bg-white">
      <div className="container-xl">
        <SectionHeader
          eyebrow="Start Here"
          title="What Challenge Are You Facing?"
          description="Find the right advisory service based on what your business needs right now."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {challenges.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-center justify-between p-4 bg-[#F8F6F1] rounded-xl border border-[#E4E0D6] hover:bg-[#EDF3F9] hover:border-[#244872] group transition-all"
            >
              <div>
                <span className="inline-block px-2 py-0.5 bg-[#C9A040]/12 text-[#8B6914] text-xs font-semibold rounded mb-1.5">
                  {c.tag}
                </span>
                <p className="text-sm font-medium text-[#0D1B2A] leading-snug">{c.label}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-[#A8801A] shrink-0 ml-3 translate-x-0 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
