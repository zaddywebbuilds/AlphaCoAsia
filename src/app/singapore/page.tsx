import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { EXPERTISE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insurance & Risk Advisory Singapore",
  description:
    "Alpha Consultant provides insurance regulatory, actuarial, risk and compliance advisory to insurers, financial institutions and fintechs in Singapore. MAS-licensed entity specialists.",
  keywords: [
    "insurance consultant Singapore",
    "insurance regulatory consultant Singapore",
    "actuarial consulting Singapore",
    "risk advisory Singapore",
    "ORSA consultant Singapore",
    "RBC2 consultant Singapore",
    "AML CFT consultant Singapore",
    "MAS licence application Singapore",
    "ERM framework Singapore",
    "insurance advisory Singapore",
  ],
  alternates: { canonical: "/singapore" },
  openGraph: {
    title: "Insurance & Risk Advisory Singapore | Alpha Consultant",
    description:
      "Insurance regulatory, actuarial, risk and compliance advisory in Singapore. Specialists in MAS regulation, RBC2, ORSA, AML/CFT and insurance licensing.",
    url: "https://alphacoasia.com/singapore",
    type: "website",
    images: [{ url: "https://alphacoasia.com/og-image.jpg?v=2", width: 1200, height: 630, type: "image/jpeg" }],
  },
};

const SINGAPORE_SERVICES = [
  "enterprise-risk-management",
  "orsa-advisory",
  "risk-based-capital",
  "regulatory-licensing",
  "aml-cft",
  "actuarial-consulting",
  "financial-modelling",
  "due-diligence-corporate-deals",
  "capital-markets-advisory",
  "insurtech-digital",
  "market-entry",
];

const REGULATORY_CONTEXT = [
  {
    label: "MAS Regulatory Framework",
    body: "Singapore insurers operate under the Monetary Authority of Singapore's Insurance Act and a comprehensive set of MAS Notices and Guidelines. Alpha Consultant supports insurers, brokers and financial advisers with licence applications, regulatory submissions and ongoing compliance.",
  },
  {
    label: "RBC2 Capital Framework",
    body: "The Risk-Based Capital 2 (RBC2) framework sets capital adequacy requirements for Singapore-licensed insurers. We provide RBC2 advisory, capital planning support and training to help insurers understand their capital position and meet MAS expectations.",
  },
  {
    label: "ORSA Requirements",
    body: "MAS requires licensed insurers to complete an Own Risk and Solvency Assessment (ORSA) at least annually. We provide independent ORSA reviews and framework development to support insurers in meeting this requirement credibly.",
  },
  {
    label: "AML/CFT Obligations",
    body: "Singapore-regulated financial institutions face detailed AML/CFT requirements under MAS Notice on the Prevention of Money Laundering and Countering the Financing of Terrorism. We develop frameworks, conduct independent reviews and support remediation.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Alpha Consultant",
      url: "https://alphacoasia.com",
      description: "Insurance, risk, actuarial and regulatory advisory in Singapore and Asia Pacific.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "139 Cecil Street, #03-12 YSY Building",
        addressLocality: "Singapore",
        postalCode: "069539",
        addressCountry: "SG",
      },
      telephone: "+6562277175",
      areaServed: { "@type": "City", name: "Singapore" },
      knowsAbout: [
        "MAS Regulatory Compliance",
        "RBC2 Capital Framework",
        "ORSA Advisory",
        "AML/CFT Compliance",
        "Insurance Licensing",
        "Actuarial Consulting",
        "Enterprise Risk Management",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://alphacoasia.com" },
        { "@type": "ListItem", position: 2, name: "Singapore Advisory" },
      ],
    },
  ],
};

export default function SingaporePage() {
  const services = SINGAPORE_SERVICES.map((slug) => EXPERTISE.find((e) => e.slug === slug)).filter(Boolean) as typeof EXPERTISE;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-[#050A12] overflow-hidden">
          <div className="absolute inset-0 tex-grid-fine opacity-30" />
          <div className="container-xl relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="type-technical text-[#C9A040]">Singapore</span>
              </div>
              <h1
                className="font-display text-white mb-5 leading-[1.08]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.028em" }}
              >
                Insurance & Risk Advisory in Singapore
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                Alpha Consultant provides specialist advisory to Singapore-regulated insurers, financial institutions and fintechs. Our work covers MAS regulatory compliance, actuarial consulting, risk management, licensing and corporate transactions.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A040] text-[#050A12] text-sm font-semibold rounded-lg hover:bg-[#B8902E] transition-colors"
                >
                  Discuss Your Requirements <ArrowRight size={14} />
                </Link>
                <Link
                  href="/expertise"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] text-white text-sm font-medium rounded-lg hover:bg-white/[0.1] transition-colors border border-white/[0.1]"
                >
                  All Expertise Areas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory context */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="mb-10">
              <h2
                className="font-display text-white mb-3 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                The Singapore Regulatory Environment
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                Singapore is one of Asia Pacific's most demanding regulatory environments for financial institutions. MAS maintains high standards across capital, risk governance, AML/CFT and conduct. Our advisers work directly with the frameworks that Singapore-licensed entities navigate every day.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REGULATORY_CONTEXT.map((item) => (
                <div key={item.label} className="p-5 bg-[#0D1B2A] rounded-xl border border-white/[0.07]">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={14} className="text-[#C9A040] shrink-0" />
                    <h3 className="text-sm font-semibold text-white">{item.label}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-py bg-[#050A12]">
          <div className="container-xl">
            <div className="mb-10">
              <h2
                className="font-display text-white mb-3 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Advisory Services for Singapore Entities
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                Our advisory covers the full range of regulatory, risk, actuarial and transaction needs for Singapore-licensed insurers, financial advisers, fintechs and holding companies.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/expertise/${service.slug}`}
                  className="group p-5 bg-[#0A1628] rounded-xl border border-white/[0.07] hover:border-[#C9A040]/40 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#C9A040] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{service.tagline}</p>
                  <div className="flex items-center gap-1 mt-3 text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium">Learn more</span>
                    <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="py-12 bg-[#0A1628] border-y border-white/[0.07]">
          <div className="container-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Singapore Office</p>
                <p className="text-sm text-slate-300">139 Cecil Street, #03-12 YSY Building, Singapore 069539</p>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <a href="tel:+6562277175" className="text-sm text-[#C9A040] font-medium">+65 6227 7175</a>
                <a href="mailto:admin@alphacoasia.com" className="text-sm text-slate-400 hover:text-white transition-colors">admin@alphacoasia.com</a>
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
