import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { EXPERTISE } from "@/lib/data";

export async function generateStaticParams() {
  return EXPERTISE.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = EXPERTISE.find((e) => e.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Alpha Consultant Singapore`,
    description: item.description,
  };
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = EXPERTISE.find((e) => e.slug === slug);
  if (!item) notFound();

  const idx = EXPERTISE.findIndex((e) => e.slug === slug);
  const prev = EXPERTISE[idx - 1];
  const next = EXPERTISE[idx + 1];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <Link href="/expertise" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-8">
              <ArrowLeft size={14} />
              All Expertise
            </Link>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">{item.shortTitle}</span>
              </div>
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                {item.title}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">{item.tagline}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-py bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-[#0D1B2A] mb-3">Overview</h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#0D1B2A] mb-4">How Alpha Can Help</h2>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                    Our team brings direct practitioner experience to every engagement. We work with clients from initial assessment through to implementation, providing practical advisory grounded in real-world understanding of {item.title.toLowerCase()}.
                  </p>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Whether you need an independent review, framework development, regulatory preparation or executive training, our senior consultants can support your requirements directly.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#0D1B2A] mb-4">Service Areas</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-3 p-3 bg-[#F8F6F1] rounded-lg border border-[#E4E0D6]">
                        <CheckCircle size={14} className="text-[#C9A040] shrink-0" />
                        <span className="text-sm text-[#0D1B2A] font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#EDF3F9] rounded-xl border border-[#D6E4F0]">
                  <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">Discuss Your {item.shortTitle} Requirements</h3>
                  <p className="text-sm text-[#64748B] mb-4">
                    Our team would be pleased to understand your requirements and discuss how we can support your organisation.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1B2A] text-white text-sm font-medium rounded-lg hover:bg-[#1A3550] transition-colors"
                  >
                    Get in Touch <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="p-5 bg-[#F8F6F1] rounded-xl border border-[#E4E0D6]">
                  <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">Other Expertise</h3>
                  <ul className="space-y-2">
                    {EXPERTISE.filter((e) => e.slug !== slug).slice(0, 6).map((e) => (
                      <li key={e.slug}>
                        <Link href={`/expertise/${e.slug}`} className="text-sm text-[#64748B] hover:text-[#0D1B2A] flex items-center gap-1.5 group">
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
        <section className="py-10 bg-[#F8F6F1] border-y border-[#E4E0D6]">
          <div className="container-xl">
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link href={`/expertise/${prev.slug}`} className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0D1B2A] transition-colors">
                  <ArrowLeft size={14} /> {prev.title}
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/expertise/${next.slug}`} className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0D1B2A] transition-colors">
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
