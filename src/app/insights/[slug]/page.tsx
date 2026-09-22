import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisciplineHero, SUBJECT_FOR_CATEGORY } from "@/components/viz/DisciplineImage";
import { INSIGHTS_PLACEHOLDER, EXPERTISE } from "@/lib/data";

/** The discipline a briefing's category maps onto, for the related-expertise rail. */
const EXPERTISE_FOR_CATEGORY: Record<string, string> = {
  "Regulatory Compliance": "regulatory-licensing",
  "Risk & Governance": "enterprise-risk-management",
  Actuarial: "actuarial-consulting",
  "Fintech & Insurtech": "insurtech-digital",
  "APAC Markets": "market-entry",
};

export async function generateStaticParams() {
  return INSIGHTS_PLACEHOLDER.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = INSIGHTS_PLACEHOLDER.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt.slice(0, 300),
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: `${a.title} | Alpha Consultant`,
      description: a.excerpt.slice(0, 300),
      url: `https://alphacoasia.com/insights/${slug}`,
      type: "article",
      publishedTime: a.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = INSIGHTS_PLACEHOLDER.find((x) => x.slug === slug);
  if (!a) notFound();

  const idx = INSIGHTS_PLACEHOLDER.findIndex((x) => x.slug === slug);
  const prev = INSIGHTS_PLACEHOLDER[idx - 1];
  const next = INSIGHTS_PLACEHOLDER[idx + 1];
  const imgId = SUBJECT_FOR_CATEGORY[a.category] ?? "enterprise-risk-management";
  const related = EXPERTISE.find((e) => e.slug === EXPERTISE_FOR_CATEGORY[a.category]);
  const alsoIn = INSIGHTS_PLACEHOLDER.filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.excerpt,
        datePublished: a.date,
        articleSection: a.category,
        url: `https://alphacoasia.com/insights/${slug}`,
        author: { "@type": "Organization", name: "Alpha Consultant", url: "https://alphacoasia.com" },
        publisher: { "@type": "Organization", name: "Alpha Consultant", url: "https://alphacoasia.com" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alphacoasia.com" },
          { "@type": "ListItem", position: 2, name: "Insights", item: "https://alphacoasia.com/insights" },
          { "@type": "ListItem", position: 3, name: a.title },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-14 bg-[#050A12] overflow-hidden">
          <div className="absolute inset-0 tex-grid-fine opacity-30" />
          <div className="container-xl relative z-10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 type-technical text-slate-500 hover:text-white transition-colors mb-9"
            >
              <ArrowLeft size={12} />
              All Insights
            </Link>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-block px-3 py-1 bg-[#C9A040]/15 text-[#E8D9A8] text-xs font-semibold rounded-full uppercase tracking-wide">
                  {a.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock size={11} /> {a.readTime}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar size={11} /> {formatDate(a.date)}
                </span>
              </div>

              <h1
                className="font-display text-white mb-6 leading-[1.1]"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 3rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                {a.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="bg-[#050A12]">
          <div className="container-xl">
            <DisciplineHero
              id={imgId}
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="aspect-video w-full rounded-[14px] shadow-[0_28px_64px_-30px_rgba(0,0,0,0.95)]"
            />
          </div>
        </section>

        {/* Body */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Standfirst */}
                <p className="text-slate-200 text-lg leading-relaxed border-l-2 border-[#C9A040] pl-6">
                  {a.excerpt}
                </p>

                {/* What it covers */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-5">What this briefing covers</h2>
                  <ul className="space-y-3">
                    {a.covers.map((c) => (
                      <li key={c} className="flex gap-3.5 items-start">
                        <CheckCircle size={15} className="text-[#C9A040] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Honest status. The written piece does not exist yet, so the
                   page routes to a conversation rather than implying a body of
                   text that was never published. */}
                <div className="p-6 bg-[#0D1B2A] rounded-xl border border-white/[0.09]">
                  <h3 className="text-sm font-semibold text-white mb-2">Full briefing</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    The written briefing on this topic is being prepared. In the meantime our
                    consultants can talk through how it applies to your organisation directly.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#E0C870] transition-colors"
                    >
                      Discuss this topic <ArrowRight size={13} />
                    </Link>
                    {related && (
                      <Link
                        href={`/expertise/${related.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.15] text-white text-sm font-medium rounded-lg hover:border-[#C9A040] transition-colors"
                      >
                        {related.shortTitle} expertise <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Prev / next */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {prev ? (
                    <Link href={`/insights/${prev.slug}`} className="card p-5 group">
                      <span className="type-technical text-slate-500 flex items-center gap-1.5 mb-2">
                        <ArrowLeft size={10} /> Previous
                      </span>
                      <span className="block text-sm font-medium text-white group-hover:text-[#C9A040] transition-colors leading-snug">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <Link href={`/insights/${next.slug}`} className="card p-5 group sm:text-right">
                      <span className="type-technical text-slate-500 flex items-center gap-1.5 mb-2 sm:justify-end">
                        Next <ArrowRight size={10} />
                      </span>
                      <span className="block text-sm font-medium text-white group-hover:text-[#C9A040] transition-colors leading-snug">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {alsoIn.length > 0 && (
                  <div className="p-5 bg-[#0A1628] rounded-xl border border-white/[0.09]">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      More in {a.category}
                    </h3>
                    <ul className="space-y-3">
                      {alsoIn.map((o) => (
                        <li key={o.slug}>
                          <Link
                            href={`/insights/${o.slug}`}
                            className="text-sm text-slate-300 hover:text-[#C9A040] transition-colors leading-snug block"
                          >
                            {o.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-5 bg-[#0D1B2A] rounded-xl border border-white/[0.09]">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Briefing details
                  </h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Category</dt>
                      <dd className="text-white text-right">{a.category}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Reading time</dt>
                      <dd className="text-white text-right">{a.readTime}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Published</dt>
                      <dd className="text-white text-right">{formatDate(a.date)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
