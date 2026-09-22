import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { COMPANY, EXPERTISE, INDUSTRIES } from "@/lib/data";

const footerExpertise = EXPERTISE.slice(0, 6);
const footerIndustries = INDUSTRIES.slice(0, 5);

export function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Main footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-base font-semibold text-white leading-tight">
                Alpha Consultant
              </div>
              <div className="text-xs font-medium text-[#C9A040] tracking-[0.1em] uppercase mt-0.5">
                AlphaCoAsia
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              Specialist insurance, actuarial, risk and regulatory advisory firm serving financial institutions across Asia Pacific.
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <Mail size={14} className="mt-0.5 text-[#C9A040] shrink-0" />
                {COMPANY.email}
              </a>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <Phone size={14} className="mt-0.5 text-[#C9A040] shrink-0" />
                {COMPANY.phone}
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={14} className="mt-0.5 text-[#C9A040] shrink-0" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
              Expertise
            </h3>
            <ul className="space-y-2.5">
              {footerExpertise.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/expertise/${item.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={10} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/expertise"
                  className="text-xs font-semibold text-[#C9A040] hover:text-[#D4AF60] uppercase tracking-wide"
                >
                  All Expertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5">
              {footerIndustries.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/industries/${item.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={10} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Leadership", href: "/about#leadership" },
                { label: "APAC Experience", href: "/about#apac" },
                { label: "Testimonials", href: "/about#testimonials" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Insights", href: "/insights" },
                { label: "Training", href: "/training" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={10} className="text-[#C9A040] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Alpha Consultant | AlphaCoAsia. All rights reserved.
          </p>
          {/* Privacy Policy and Terms links removed: both pointed at routes that
             do not exist and 404d. They need real legal copy from the client —
             a privacy notice in particular, given the contact form collects
             personal data under Singapore's PDPA. */}
        </div>
      </div>
    </footer>
  );
}
