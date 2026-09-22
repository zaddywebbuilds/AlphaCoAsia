import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Clock, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisciplineImage } from "@/components/viz/DisciplineImage";

export const metadata: Metadata = {
  title: "Insurance, Risk & Actuarial Training Programmes",
  description:
    "Alpha Consultant delivers professional training programmes in ERM, ORSA, RBC2, AML/CFT, cyber risk, ESG and insurtech for insurance and financial services professionals.",
  alternates: { canonical: "/training" },
};

const COURSES = [
  {
    subject: "enterprise-risk-management",
    title: "Enterprise Risk Management",
    topics: ["ERM framework fundamentals", "Risk governance", "Risk appetite design", "ORSA integration"],
    audience: "Risk officers, CFOs, board members",
    format: "Workshop / Custom corporate",
  },
  {
    subject: "risk-based-capital",
    title: "Risk-Based Capital (RBC2)",
    topics: ["RBC2 framework overview", "Capital requirements", "Reporting obligations", "Implementation planning"],
    audience: "Actuaries, finance teams, risk professionals",
    format: "Workshop / Seminar",
  },
  {
    subject: "orsa-advisory",
    title: "ORSA for Insurers",
    topics: ["ORSA requirements", "Framework design", "Regulatory expectations", "Governance integration"],
    audience: "Risk officers, actuaries, compliance professionals",
    format: "Workshop / Custom corporate",
  },
  {
    subject: "aml-cft",
    title: "AML/CFT Compliance",
    topics: ["MAS AML/CFT requirements", "Risk-based approach", "Customer due diligence", "Suspicious transaction reporting"],
    audience: "Compliance officers, MLROs, risk teams",
    format: "Workshop / Custom corporate",
  },
  {
    subject: "cyber-risk",
    title: "Cyber Risk & Insurance",
    topics: ["Cyber risk landscape", "Insurance implications", "Governance frameworks", "Incident response"],
    audience: "Risk officers, IT leaders, insurance professionals",
    format: "Seminar / Workshop",
  },
  {
    subject: "esg-risk",
    title: "ESG Risk Management",
    topics: ["ESG regulatory trends", "Integration into risk frameworks", "Reporting requirements", "Scenario analysis"],
    audience: "Risk professionals, executives, compliance teams",
    format: "Workshop / Seminar",
  },
  {
    subject: "insurtech-digital",
    title: "Insurtech & Digital Insurance",
    topics: ["Digital insurance landscape", "Regulatory considerations", "Technology platforms", "Business model innovation"],
    audience: "Insurance professionals, fintech teams, executives",
    format: "Workshop / Seminar",
  },
  {
    subject: "actuarial-consulting",
    title: "Actuarial Pricing & Reserving",
    topics: ["Pricing methodology", "Reserving approaches", "Regulatory context", "Model validation"],
    audience: "Actuaries, finance professionals, risk teams",
    format: "Technical workshop",
  },
];

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Training</span>
              </div>
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Professional Risk &amp; Insurance Training
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Structured training programmes delivered by experienced practitioners for insurance, risk and financial services professionals across Asia Pacific.
              </p>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="py-12 bg-[#0D1B2A] border-b border-white/8">
          <div className="container-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: Award, title: "Practitioner-Led", desc: "Delivered by senior professionals with direct industry experience" },
                { icon: Users, title: "Flexible Delivery", desc: "Custom corporate programmes tailored to your organisation's requirements" },
                { icon: Clock, title: "Flexible Format", desc: "Half-day workshops, full-day sessions or multi-module programmes" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#C9A040]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{title}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Programmes</span>
              </div>
              <h2 className="font-display text-white text-3xl font-semibold leading-tight" style={{ letterSpacing: "-0.015em" }}>
                Training Programmes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COURSES.map((course, i) => (
                <div key={course.title} className="card p-6 flex flex-col group overflow-hidden">
                  <DisciplineImage id={course.subject} priority={i < 2} className="-mx-6 -mt-6 mb-5 h-[150px]" />
                  <h3 className="text-base font-semibold text-white mb-3">{course.title}</h3>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {course.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-[#C9A040] shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/[0.09] space-y-1">
                    <p className="text-xs text-slate-500"><span className="font-medium text-slate-400">Audience:</span> {course.audience}</p>
                    <p className="text-xs text-slate-500"><span className="font-medium text-slate-400">Format:</span> {course.format}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-[#0A1628] rounded-2xl border border-white/[0.09] text-center">
              <h3 className="font-display text-xl font-semibold text-white mb-3">Enquire About Corporate Training</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                We deliver custom training programmes tailored to your organisation&apos;s specific requirements. Get in touch to discuss your training needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#12213A] transition-colors"
              >
                Request Training Information <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
