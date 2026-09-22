import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisciplineImage } from "@/components/viz/DisciplineImage";
import { INDUSTRIES, EXPERTISE, CASE_STUDIES } from "@/lib/data";

/* Which disciplines each institution type most often engages us on. */
const DISCIPLINES: Record<string, string[]> = {
  "insurance-companies": ["enterprise-risk-management", "orsa-advisory", "risk-based-capital", "actuarial-consulting", "regulatory-licensing"],
  "insurance-brokers": ["regulatory-licensing", "aml-cft", "enterprise-risk-management"],
  "financial-advisers": ["regulatory-licensing", "aml-cft"],
  "fintech-insurtech": ["insurtech-digital", "regulatory-licensing", "market-entry", "financial-modelling"],
  banking: ["enterprise-risk-management", "aml-cft", "financial-modelling"],
  "asset-management": ["regulatory-licensing", "aml-cft", "enterprise-risk-management"],
  "professional-services": ["actuarial-consulting", "financial-modelling", "enterprise-risk-management"],
};

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) return {};
  return {
    title: ind.title,
    description: ind.description,
    keywords: ind.challenges,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${ind.title} | Alpha Consultant`,
      description: ind.description,
      url: `https://alphacoasia.com/industries/${slug}`,
      type: "article",
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) notFound();

  const disciplines = (DISCIPLINES[slug] ?? [])
    .map((d) => EXPERTISE.find((e) => e.slug === d))
    .filter((e): e is (typeof EXPERTISE)[number] => Boolean(e));

  const engagements = CASE_STUDIES.filter(
    (c) => c.industry.toLowerCase() === ind.title.toLowerCase().split(" ")[0].toLowerCase()
  ).slice(0, 2);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 bg-[#05090F] overflow-hidden tex-grain">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_55%_35%,#12263D_0%,#05090F_72%)]" />
          <div className="absolute inset-0 tex-grid-fine opacity-40" />
          <div className="container-xl relative z-10">
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 type-technical text-slate-500 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft size={12} />
              All Industries
            </Link>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="type-technical text-[#C9A040]">Institution Type</span>
              </div>
              <h1
                className="font-display text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                {ind.title}
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">{ind.description}</p>
            </div>
          </div>
        </section>

        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#C9A040]" />
                  <span className="type-technical text-[#C9A040]">How We Support You</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {disciplines.map((d) => (
                    <Link key={d.slug} href={`/expertise/${d.slug}`} className="card p-6 flex flex-col group overflow-hidden">
                      <DisciplineImage id={d.slug} className="-mx-6 -mt-6 mb-5 aspect-[1400/654]" />
                      <h3 className="text-[15px] font-semibold text-white mb-1.5 leading-snug">
                        <span className="link-rule">{d.title}</span>
                      </h3>
                      <p className="text-[13px] text-slate-400 leading-relaxed">{d.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 flex flex-col gap-5">
                <div className="panel-light p-6">
                  <span className="type-technical text-[#C9A040] block mb-4">Typical Challenges</span>
                  <ul className="space-y-2.5">
                    {ind.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[13.5px] text-slate-400">
                        <span className="w-1 h-1 rounded-full bg-[#C9A040] mt-2 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {engagements.length > 0 && (
                  <div className="panel-light p-6">
                    <span className="type-technical text-[#C9A040] block mb-4">Related Engagements</span>
                    <div className="space-y-4">
                      {engagements.map((e) => (
                        <Link key={e.slug} href={`/case-studies/${e.slug}`} className="block group">
                          <h4 className="text-[13.5px] font-semibold text-white leading-snug mb-1">
                            <span className="link-rule">{e.title}</span>
                          </h4>
                          <p className="type-technical text-slate-500">{e.market} · {e.service}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="btn-magnetic inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#12213A]"
                >
                  Discuss your requirements
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
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
