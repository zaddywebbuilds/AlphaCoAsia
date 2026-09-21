import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LEADERSHIP, EXPERTISE } from "@/lib/data";

export async function generateStaticParams() {
  return LEADERSHIP.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = LEADERSHIP.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name}, ${p.title}`, description: p.shortBio };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = LEADERSHIP.find((x) => x.slug === slug);
  if (!person) notFound();

  const others = LEADERSHIP.filter((p) => p.slug !== slug);
  const related = person.expertise
    .map((e) => EXPERTISE.find((x) => x.title === e || x.shortTitle === e))
    .filter((x): x is (typeof EXPERTISE)[number] => Boolean(x));

  return (
    <>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
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
                  <p className="type-technical text-[#C9A040]/80">{person.credentials}</p>
                )}
              </div>
              <div className="lg:col-span-4">
                <div className="rule-h mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="type-technical text-slate-600 block mb-1">Markets</span>
                    <span className="text-[13px] text-slate-300">{person.markets.length}</span>
                  </div>
                  <div>
                    <span className="type-technical text-slate-600 block mb-1">Disciplines</span>
                    <span className="text-[13px] text-slate-300">{person.expertise.length}</span>
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
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-px bg-[#A8801A]" />
                    <span className="type-technical text-[#A8801A]">Overview</span>
                  </div>
                  <p className="text-[17px] text-[#334155] leading-relaxed">{person.shortBio}</p>
                </div>

                {person.pastRoles.length > 0 && (
                  <div className="mb-11">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-[#A8801A]" />
                      <span className="type-technical text-[#A8801A]">Career Experience</span>
                    </div>
                    {/* Timeline rail */}
                    <div className="relative pl-7">
                      <span className="absolute left-[3px] top-2 bottom-2 w-px bg-[#E4E0D6]" />
                      {person.pastRoles.map((role) => (
                        <div key={role} className="relative pb-6 last:pb-0">
                          <span className="absolute -left-[26px] top-[7px] w-[7px] h-[7px] rounded-full bg-[#C9A040]" />
                          <p className="text-[14.5px] text-[#334155] leading-relaxed">{role}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-[12px] text-[#94A3B8]">
                      Roles listed are previous positions held prior to or alongside Alpha Consultant.
                    </p>
                  </div>
                )}

                {related.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-[#A8801A]" />
                      <span className="type-technical text-[#A8801A]">Related Expertise</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/expertise/${r.slug}`}
                          className="px-3.5 py-2 bg-[#F8F6F1] border border-[#E4E0D6] rounded-lg text-[13px] text-[#0D1B2A] hover:border-[#C9A040] transition-colors"
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
                  <span className="type-technical text-[#A8801A] block mb-4">Areas of Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.expertise.map((e) => (
                      <span key={e} className="px-2.5 py-1 bg-[#F8F6F1] border border-[#E4E0D6] rounded text-[11.5px] text-[#64748B]">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="panel-light p-6">
                  <span className="type-technical text-[#A8801A] block mb-4">Regional Experience</span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.markets.map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-[#F8F6F1] border border-[#E4E0D6] rounded text-[11.5px] text-[#64748B]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {person.affiliations.length > 0 && (
                  <div className="panel-light p-6">
                    <span className="type-technical text-[#A8801A] block mb-4">Professional Involvement</span>
                    <ul className="space-y-2">
                      {person.affiliations.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-[13px] text-[#64748B]">
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
            <div className="mt-16 pt-10 border-t border-[#E4E0D6]">
              <span className="type-technical text-[#A8801A] block mb-6">Other Advisors</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((p) => (
                  <Link key={p.slug} href={`/team/${p.slug}`} className="card p-5 group">
                    <h3 className="text-[14.5px] font-semibold text-[#0D1B2A] mb-1">
                      <span className="link-rule">{p.name}</span>
                    </h3>
                    <p className="text-[12.5px] text-[#64748B] mb-3">{p.title}</p>
                    <span className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] group-hover:text-[#A8801A] transition-colors">
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
