import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ExpertiseGlyph } from "@/components/viz/ExpertiseGlyph";
import { CASE_STUDIES, EXPERTISE } from "@/lib/data";

/* Maps an engagement to the discipline diagram used across the site, so the
   detail page speaks the same visual language as the card it came from. */
const GLYPH_FOR: Record<string, string> = {
  "Enterprise Risk Management": "enterprise-risk-management",
  "Regulatory & Licensing": "regulatory-licensing",
  "Risk-Based Capital": "risk-based-capital",
  "AML/CFT Compliance": "aml-cft",
};

const EXPERTISE_FOR: Record<string, string> = {
  "Enterprise Risk Management": "enterprise-risk-management",
  "Regulatory & Licensing": "regulatory-licensing",
  "Risk-Based Capital": "risk-based-capital",
  "AML/CFT Compliance": "aml-cft",
};

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: `${cs.title} — an Alpha Consultant advisory engagement in ${cs.market} across ${cs.service}.`,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];
  const glyph = GLYPH_FOR[cs.service] ?? "enterprise-risk-management";
  const related = EXPERTISE.find((e) => e.slug === EXPERTISE_FOR[cs.service]);

  return (
    <>
      <Navbar />
      <main>
        {/* Report cover */}
        <section className="relative pt-32 pb-16 bg-[#05090F] overflow-hidden tex-grain">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_60%_40%,#12263D_0%,#05090F_72%)]" />
          <div className="absolute inset-0 tex-grid-fine opacity-40" />

          <div className="container-xl relative z-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 type-technical text-slate-500 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft size={12} />
              All Engagements
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-baseline gap-5 mb-6">
                  <span className="type-index text-[#C9A040]/35 text-[3.4rem]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5 pt-2">
                    <span className="type-technical text-[#C9A040]">{cs.service}</span>
                    <span className="flex items-center gap-1.5 type-technical text-slate-500">
                      <MapPin size={10} /> {cs.market} · {cs.industry}
                    </span>
                  </div>
                </div>

                <h1
                  className="font-display text-white leading-[1.1] mb-6"
                  style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
                >
                  {cs.title}
                </h1>

                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-white/[0.06] border border-white/[0.10] rounded text-[11.5px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="panel-dim overflow-hidden">
                  <div className="relative h-[190px] bg-[#070D14] text-slate-500 border-b border-white/[0.07]">
                    <div className="absolute inset-0 tex-grid-fine opacity-50" />
                    <div className="absolute inset-0">
                      <ExpertiseGlyph id={glyph} active className="w-full h-full" />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_78%_at_50%_45%,transparent_35%,rgba(7,13,20,0.8)_100%)]" />
                  </div>
                  <div className="p-7">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <span className="type-technical text-slate-600 block mb-1">Market</span>
                        <span className="text-[13px] text-white">{cs.market}</span>
                      </div>
                      <div>
                        <span className="type-technical text-slate-600 block mb-1">Sector</span>
                        <span className="text-[13px] text-white">{cs.industry}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section-py bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="mb-11">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-[#A8801A]" />
                    <span className="type-technical text-[#A8801A]">Context</span>
                  </div>
                  <p className="text-[17px] text-[#334155] leading-relaxed">{cs.challenge}</p>
                </div>

                <div className="mb-11">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-[#A8801A]" />
                    <span className="type-technical text-[#A8801A]">Alpha&apos;s Role</span>
                  </div>
                  <p className="text-[17px] text-[#334155] leading-relaxed">{cs.alphaRole}</p>
                </div>

                <div className="p-6 bg-[#F8F6F1] border border-[#E4E0D6] rounded-xl">
                  <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">
                    Engagement details are summarised at a level that preserves client
                    confidentiality. Specific outcomes are described only where they can be stated
                    factually.
                  </p>
                </div>
              </div>

              {/* Rail */}
              <aside className="lg:col-span-4 flex flex-col gap-5">
                {related && (
                  <div className="panel-light p-6">
                    <span className="type-technical text-[#A8801A] block mb-3">Related Expertise</span>
                    <h3 className="text-[15px] font-semibold text-[#0D1B2A] mb-2">{related.title}</h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">{related.tagline}</p>
                    <Link
                      href={`/expertise/${related.slug}`}
                      className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] hover:text-[#A8801A] transition-colors group"
                    >
                      <span className="link-rule">View discipline</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}

                <div className="panel-light p-6">
                  <span className="type-technical text-[#A8801A] block mb-3">Next Engagement</span>
                  <h3 className="text-[15px] font-semibold text-[#0D1B2A] mb-2">{next.title}</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    {next.market} · {next.service}
                  </p>
                  <Link
                    href={`/case-studies/${next.slug}`}
                    className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] hover:text-[#A8801A] transition-colors group"
                  >
                    <span className="link-rule">Open engagement</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
