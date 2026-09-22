import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LEADERSHIP, EXPERTISE } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export async function generateStaticParams() {
  return LEADERSHIP.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = LEADERSHIP.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name}, ${p.title}`,
    description: p.shortBio,
    alternates: { canonical: `/team/${slug}` },
    openGraph: {
      title: `${p.name}, ${p.title} | Alpha Consultant`,
      description: p.shortBio,
      url: `https://alphacoasia.com/team/${slug}`,
      type: "profile",
      images: [{ url: p.image, width: 240, height: 300, alt: p.name }],
    },
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = LEADERSHIP.find((x) => x.slug === slug);
  if (!person) notFound();

  const others = LEADERSHIP.filter((p) => p.slug !== slug);
  const related = person.expertise
    .map((e) => EXPERTISE.find((x) => x.title === e || x.shortTitle === e))
    .filter((x): x is (typeof EXPERTISE)[number] => Boolean(x));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: person.name,
        jobTitle: person.title,
        description: person.shortBio,
        url: `https://alphacoasia.com/team/${slug}`,
        image: `https://alphacoasia.com${person.image}`,
        ...(person.email ? { email: person.email } : {}),
        ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
        worksFor: { "@type": "ProfessionalService", name: "Alpha Consultant", url: "https://alphacoasia.com" },
        knowsAbout: person.expertise,
        ...(person.affiliations.length
          ? { affiliation: person.affiliations.map((a) => ({ "@type": "Organization", name: a })) }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alphacoasia.com" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://alphacoasia.com/about" },
          { "@type": "ListItem", position: 3, name: person.name },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        {/* Profile hero */}
        <section className="relative pt-32 pb-16 bg-[#05090F] overflow-hidden tex-grain">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_35%,#12263D_0%,#05090F_72%)]" />
          <div className="absolute inset-0 tex-grid-fine opacity-40" />
          {/* Restrained typographic backdrop */}
          <div
            aria-hidden
            className="absolute right-[-2%] top-[22%] font-display font-semibold text-white/[0.028] select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(8rem, 20vw, 20rem)", letterSpacing: "-0.05em" }}
          >
            {person.name.split(" ").map((n) => n[0]).join("")}
          </div>

          <div className="container-xl relative z-10">
            <Link
              href="/about#leadership"
              className="inline-flex items-center gap-1.5 type-technical text-slate-500 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft size={12} />
              Leadership
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/5] w-full max-w-[320px] rounded-[14px] overflow-hidden border border-white/[0.10] shadow-[0_30px_70px_-32px_rgba(0,0,0,0.95)]">
                  <Image
                    src={`${BASE}${person.image}`}
                    alt={`${person.name}, ${person.title}`}
                    fill
                    sizes="(max-width: 1024px) 60vw, 320px"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,#C9A040,transparent)]" />
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#C9A040]" />
                  <span className="type-technical text-[#C9A040]">{person.title}</span>
                </div>
                <h1
                  className="font-display text-white leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.8rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
                >
                  {person.name}
                </h1>
                {person.credentials && (
                  <p className="type-technical text-[#C9A040]/80 mb-6">{person.credentials}</p>
                )}
                <p className="text-[17px] text-slate-300 leading-relaxed max-w-2xl mb-7">
                  {person.shortBio}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="type-technical text-[#C9A040] hover:text-[#E8D9A8] transition-colors"
                    >
                      {person.email}
                    </a>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 type-technical text-slate-400 hover:text-white transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                {person.highlights.length > 0 && (
                  <div className="mb-11">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-px bg-[#C9A040]" />
                      <span className="type-technical text-[#C9A040]">Selected Highlights</span>
                    </div>
                    <ul className="space-y-3">
                      {person.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-[15.5px] text-slate-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A040] mt-2.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {person.pastRoles.length > 0 && (
                  <div className="mb-11">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-[#C9A040]" />
                      <span className="type-technical text-[#C9A040]">Career Experience</span>
                    </div>
                    {/* Timeline rail */}
                    <div className="relative pl-7">
                      <span className="absolute left-[3px] top-2 bottom-2 w-px bg-white/20" />
                      {person.pastRoles.map((role) => (
                        <div key={role} className="relative pb-6 last:pb-0">
                          <span className="absolute -left-[26px] top-[7px] w-[7px] h-[7px] rounded-full bg-[#C9A040]" />
                          <p className="text-[14.5px] text-slate-300 leading-relaxed">{role}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-[12px] text-slate-500">
                      Roles listed are previous positions held prior to or alongside Alpha Consultant.
                    </p>
                  </div>
                )}

                {related.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-[#C9A040]" />
                      <span className="type-technical text-[#C9A040]">Related Expertise</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/expertise/${r.slug}`}
                          className="px-3.5 py-2 bg-[#0A1628] border border-white/[0.09] rounded-lg text-[13px] text-white hover:border-[#C9A040] transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="lg:col-span-4 flex flex-col gap-5">
                <div className="panel-light p-6">
                  <span className="type-technical text-[#C9A040] block mb-4">Areas of Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.expertise.map((e) => (
                      <span key={e} className="px-2.5 py-1 bg-[#0A1628] border border-white/[0.09] rounded text-[11.5px] text-slate-400">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="panel-light p-6">
                  <span className="type-technical text-[#C9A040] block mb-4">Regional Experience</span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.markets.map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-[#0A1628] border border-white/[0.09] rounded text-[11.5px] text-slate-400">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {person.affiliations.length > 0 && (
                  <div className="panel-light p-6">
                    <span className="type-technical text-[#C9A040] block mb-4">Professional Involvement</span>
                    <ul className="space-y-2">
                      {person.affiliations.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-[13px] text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-[#C9A040] mt-2 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>

            {/* Other advisors */}
            <div className="mt-16 pt-10 border-t border-white/[0.09]">
              <span className="type-technical text-[#C9A040] block mb-6">Other Advisors</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((p) => (
                  <Link key={p.slug} href={`/team/${p.slug}`} className="card p-5 group">
                    <h3 className="text-[14.5px] font-semibold text-white mb-1">
                      <span className="link-rule">{p.name}</span>
                    </h3>
                    <p className="text-[12.5px] text-slate-400 mb-3">{p.title}</p>
                    <span className="inline-flex items-center gap-1.5 type-technical text-white group-hover:text-[#C9A040] transition-colors">
                      Profile
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
