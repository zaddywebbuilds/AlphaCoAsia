import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisciplineHero, hasDisciplineHero } from "@/components/viz/DisciplineImage";
import { EXPERTISE } from "@/lib/data";

export async function generateStaticParams() {
  return EXPERTISE.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = EXPERTISE.find((e) => e.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    keywords: item.topics,
    alternates: { canonical: `/expertise/${slug}` },
    openGraph: {
      title: `${item.title} | Alpha Consultant`,
      description: item.description,
      url: `https://alphacoasia.com/expertise/${slug}`,
      type: "article",
    },
  };
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = EXPERTISE.find((e) => e.slug === slug);
  if (!item) notFound();

  const idx = EXPERTISE.findIndex((e) => e.slug === slug);
  const prev = EXPERTISE[idx - 1];
  const next = EXPERTISE[idx + 1];

  /* Service + breadcrumb, so the discipline can surface as its own result
     rather than only as part of the firm. */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: item.title,
        serviceType: item.title,
        description: item.description,
        url: `https://alphacoasia.com/expertise/${slug}`,
        provider: { "@type": "ProfessionalService", name: "Alpha Consultant", url: "https://alphacoasia.com" },
        areaServed: ["SG", "HK", "MY", "ID", "VN", "MM", "KH", "TW", "BN"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${item.title} service areas`,
          itemListElement: item.topics.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t } })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alphacoasia.com" },
          { "@type": "ListItem", position: 2, name: "Expertise", item: "https://alphacoasia.com/expertise" },
          { "@type": "ListItem", position: 3, name: item.title },
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
        <section className="relative pt-32 pb-16 bg-[#050A12] overflow-hidden">
          <div className="absolute inset-0 tex-grid-fine opacity-30" />
          <div className="container-xl relative z-10">
            <Link href="/expertise" className="inline-flex items-center gap-1.5 type-technical text-slate-500 hover:text-white transition-colors mb-9">
              <ArrowLeft size={12} />
              All Expertise
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#C9A040]" />
                  <span className="type-technical text-[#C9A040]">{item.shortTitle}</span>
                </div>
                <h1
                  className="font-display text-white mb-5 leading-[1.08]"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.028em" }}
                >
                  {item.title}
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed">{item.tagline}</p>
              </div>

              {/* The work itself, at a size where the detail reads */}
              {hasDisciplineHero(item.slug) && (
                <div className="lg:col-span-6">
                  <DisciplineHero
                    id={item.slug}
                    className="aspect-video w-full rounded-[14px] shadow-[0_28px_64px_-30px_rgba(0,0,0,0.95)]"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">How Alpha Can Help</h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Our team brings direct practitioner experience to every engagement. We work with clients from initial assessment through to implementation, providing practical advisory grounded in real-world understanding of {item.title.toLowerCase()}.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Whether you need an independent review, framework development, regulatory preparation or executive training, our senior consultants can support your requirements directly.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Service Areas</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-3 p-3 bg-[#0A1628] rounded-lg border border-white/[0.09]">
                        <CheckCircle size={14} className="text-[#C9A040] shrink-0" />
                        <span className="text-sm text-white font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#C9A040]/10 rounded-xl border border-[#C9A040]/25">
                  <h3 className="text-sm font-semibold text-white mb-2">Discuss Your {item.shortTitle} Requirements</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Our team would be pleased to understand your requirements and discuss how we can support your organisation.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1B2A] text-white text-sm font-medium rounded-lg hover:bg-[#12213A] transition-colors"
                  >
                    Get in Touch <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="p-5 bg-[#0A1628] rounded-xl border border-white/[0.09]">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Other Expertise</h3>
                  <ul className="space-y-2">
                    {EXPERTISE.filter((e) => e.slug !== slug).slice(0, 6).map((e) => (
                      <li key={e.slug}>
                        <Link href={`/expertise/${e.slug}`} className="text-sm text-slate-400 hover:text-white flex items-center gap-1.5 group">
                          <ArrowRight size={10} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity" />
                          {e.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-[#0D1B2A] rounded-xl">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Singapore Office</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">20 Maxwell Road, Singapore 069113</p>
                  <a href="tel:+6562277175" className="text-xs text-[#C9A040] font-medium">+65 6227 7175</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="py-10 bg-[#0A1628] border-y border-white/[0.09]">
          <div className="container-xl">
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link href={`/expertise/${prev.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft size={14} /> {prev.title}
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/expertise/${next.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  {next.title} <ArrowRight size={14} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
