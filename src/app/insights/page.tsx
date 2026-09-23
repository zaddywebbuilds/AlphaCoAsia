"use client";
import { useState } from "react";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisciplineHero, DisciplineImage } from "@/components/viz/DisciplineImage";
import { INSIGHTS_PLACEHOLDER } from "@/lib/data";
import Link from "next/link";

const SUBJECT_FOR: Record<string, string> = {
  "Regulatory Compliance": "regulatory-licensing",
  "Risk & Governance": "enterprise-risk-management",
  Actuarial: "actuarial-consulting",
  "Fintech & Insurtech": "insurtech-digital",
  "APAC Markets": "market-entry",
};

const CATEGORIES = [
  "All",
  "Regulatory Compliance",
  "Risk & Governance",
  "Actuarial",
  "Fintech & Insurtech",
  "APAC Markets",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightsPage() {
  const [active, setActive] = useState("All");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNlStatus("loading");
    const data = new FormData(e.currentTarget);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    data.append("subject", "APAC Insurance Brief subscription request");
    data.append("from_name", "Alpha Consultant Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      setNlStatus(json.success ? "ok" : "error");
    } catch {
      setNlStatus("error");
    }
  }
  const featured = INSIGHTS_PLACEHOLDER.find((a) => (a as any).featured);
  const filtered =
    active === "All"
      ? INSIGHTS_PLACEHOLDER.filter((a) => !(a as any).featured)
      : INSIGHTS_PLACEHOLDER.filter(
          (a) => a.category === active && !(a as any).featured
        );

  return (
    <>
      <Navbar />
      <main>
        {/* ─── Hero banner ─── */}
        <section className="pt-32 pb-16 bg-[#050A12] border-b border-white/[0.07]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  Insights
                </span>
              </div>
              <h1
                className="font-display text-white leading-[1.06] mb-5"
                style={{
                  fontSize: "clamp(2.1rem, 4.5vw, 3.4rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                Perspectives on Insurance,
                <br className="hidden sm:block" /> Risk &amp; Regulation
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Thought leadership on regulatory developments, risk management
                practice, actuarial matters and emerging trends across Asia
                Pacific financial services.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Featured article ─── */}
        {featured && (
          <section className="bg-[#0A1628] py-12 border-b border-white/[0.07]">
            <div className="container-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  Latest
                </span>
              </div>
              <Link
                href={`/insights/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.09] hover:border-[#C9A040]/40 transition-colors duration-500 bg-[#0E1B30]"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <DisciplineHero
                    id={SUBJECT_FOR[featured.category] ?? "enterprise-risk-management"}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-video lg:aspect-auto lg:h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B30]/60 to-transparent lg:bg-gradient-to-r" />
                </div>

                {/* Copy */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-block px-3 py-1 bg-[#C9A040]/15 text-[#E8D9A8] text-xs font-semibold rounded-full tracking-wide uppercase">
                      {featured.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock size={11} />
                      {featured.readTime}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(featured.date)}
                    </span>
                  </div>

                  <h2
                    className="font-display text-white leading-snug mb-5 group-hover:text-[#E8D9A8] transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[15px] text-slate-400 leading-relaxed mb-8 max-w-lg">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#C9A040] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    Read the analysis
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ─── Article grid ─── */}
        <section className="bg-[#0A1628] section-py">
          <div className="container-xl">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                    cat === active
                      ? "bg-[#C9A040] text-[#0A1628] border-[#C9A040] font-semibold"
                      : "bg-white/[0.05] text-slate-400 border-white/[0.09] hover:border-[#C9A040]/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-slate-500 py-10 text-sm">
                No articles in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((article) => {
                  const imgId =
                    SUBJECT_FOR[article.category] ?? "enterprise-risk-management";
                  return (
                    <Link
                      key={article.slug}
                      href={`/insights/${article.slug}`}
                      className="group card p-0 flex flex-col overflow-hidden hover:border-[#C9A040]/40 transition-colors duration-400"
                    >
                      {/* Cover image */}
                      <DisciplineImage
                        id={imgId}
                        className="-mx-0 -mt-0 aspect-[1400/654] w-full"
                      />

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6 sm:p-7">
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="inline-block px-2.5 py-1 bg-[#C9A040]/12 text-[#E8D9A8] text-[11px] font-semibold rounded-md tracking-wide uppercase">
                            {article.category}
                          </span>
                        </div>

                        <h2 className="font-display text-white text-[1.05rem] font-semibold leading-snug mb-3 group-hover:text-[#E8D9A8] transition-colors duration-300">
                          {article.title}
                        </h2>

                        <p className="text-[13.5px] text-slate-400 leading-relaxed flex-1 mb-5">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/[0.09]">
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock size={11} />
                              {article.readTime}
                            </span>
                            <span className="w-px h-3 bg-white/20" />
                            <span>{formatDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#C9A040] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read <ChevronRight size={12} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Newsletter */}
            <div className="mt-20 rounded-2xl overflow-hidden border border-white/[0.09]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left — copy */}
                <div className="p-10 sm:p-14 bg-[#0D1B2A]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-[#C9A040]" />
                    <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                      Briefing
                    </span>
                  </div>
                  <h3
                    className="font-display text-white mb-4 leading-snug"
                    style={{
                      fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    APAC Insurance &amp; Risk Brief
                  </h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-sm">
                    Periodic perspectives on insurance regulation, risk management
                    practice and emerging developments across Asia Pacific. Written
                    for senior insurance and risk professionals.
                  </p>
                  {nlStatus === "ok" ? (
                    <p className="text-sm text-[#E8D9A8] bg-[#C9A040]/10 border border-[#C9A040]/20 rounded-lg px-4 py-3">
                      Subscribed. We will be in touch with the next briefing.
                    </p>
                  ) : (
                    <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-sm">
                      <input type="checkbox" name="botcheck" className="hidden" />
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="Work email address"
                        className="flex-1 px-4 py-3 bg-white/[0.07] border border-white/[0.15] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A040]/60 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={nlStatus === "loading"}
                        className="px-5 py-3 bg-[#C9A040] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#E0C870] transition-colors whitespace-nowrap disabled:opacity-60"
                      >
                        {nlStatus === "loading" ? "…" : "Subscribe"}
                      </button>
                      {nlStatus === "error" && (
                        <p className="text-xs text-red-400 mt-1 w-full">Something went wrong — please try again.</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Right — what to expect */}
                <div className="p-10 sm:p-14 bg-[#0A1628] border-t lg:border-t-0 lg:border-l border-white/[0.07]">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-6">
                    What you receive
                  </p>
                  <ul className="space-y-5">
                    {[
                      {
                        head: "Regulatory updates",
                        body: "Key MAS and regional regulatory developments that affect licensed insurers, intermediaries and fintech platforms.",
                      },
                      {
                        head: "Risk practice",
                        body: "Practical commentary on enterprise risk management, ORSA, capital frameworks and governance.",
                      },
                      {
                        head: "Market intelligence",
                        body: "Emerging trends in Asia Pacific financial services and what they mean for risk, compliance and business strategy.",
                      },
                    ].map(({ head, body }) => (
                      <li key={head} className="flex gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A040] mt-[7px] shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">
                            {head}
                          </p>
                          <p className="text-[13px] text-slate-400 leading-relaxed">
                            {body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
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
