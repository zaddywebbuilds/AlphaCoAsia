"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { COMPANY } from "@/lib/data";

const SERVICE_OPTIONS = [
  "Enterprise Risk Management",
  "Actuarial Consulting",
  "ORSA",
  "Risk-Based Capital (RBC2)",
  "Regulatory & Licensing",
  "AML/CFT Compliance",
  "Insurtech & Digital Insurance",
  "Asia Market Entry",
  "Financial Modelling",
  "Due Diligence & Corporate Deals",
  "IPO & Capital Markets Advisory",
  "Professional Training",
  "Other",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    data.append("subject", "New enquiry from alphacoasia.com");
    data.append("from_name", "Alpha Consultant Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      setStatus(json.success ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">Contact</span>
              </div>
              <h1 className="font-display text-white text-4xl font-semibold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Let&apos;s Discuss Your Business Challenge
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you are navigating regulatory requirements, entering a new market, strengthening your risk framework or developing a new insurance proposition, our team would be pleased to discuss how we can support you.
              </p>
            </div>
          </div>
        </section>

        {/* Form + details */}
        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                {status === "ok" ? (
                  <div className="p-10 bg-[#0A1628] rounded-2xl border border-white/[0.09] text-center">
                    <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center mx-auto mb-5">
                      <Send size={22} className="text-[#C9A040]" />
                    </div>
                    <h2 className="font-display text-xl font-semibold text-white mb-3">
                      Thank You for Getting in Touch
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                      We have received your message and will be in touch shortly. We look forward to understanding how we can support your business.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Web3Forms honeypot — must stay empty to pass spam filter */}
                    <input type="checkbox" name="botcheck" className="hidden" />

                    {status === "error" && (
                      <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                        Something went wrong. Please try again or email us directly at{" "}
                        <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a>.
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Name *</label>
                        <input required name="name" type="text" placeholder="Your name" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Company *</label>
                        <input required name="company" type="text" placeholder="Your organisation" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Work Email *</label>
                        <input required name="email" type="email" placeholder="your@company.com" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Country</label>
                        <input name="country" type="text" placeholder="Singapore" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Area of Interest</label>
                      {/* Opaque rather than translucent, so the closed control and
                          the open option list sit on the same colour. */}
                      <select name="service" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-[#0E1B30]">
                        <option value="">Select a service area</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Message *</label>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Please describe your business challenge or what you would like to discuss..."
                        className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06] resize-y"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#E0C870] transition-colors disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending…" : "Send Message"}
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="p-6 bg-[#0A1628] rounded-2xl border border-white/[0.09]">
                  <h3 className="text-sm font-semibold text-white mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#C9A040] mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-400 leading-relaxed">{COMPANY.address}</p>
                    </div>
                    <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                      <Phone size={15} className="text-[#C9A040] shrink-0" />
                      {COMPANY.phone}
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                      <Mail size={15} className="text-[#C9A040] shrink-0" />
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-[#0D1B2A] rounded-2xl">
                  <h3 className="text-sm font-semibold text-white mb-3">Response Time</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We typically respond to enquiries within one business day. For urgent matters, please call us directly.
                  </p>
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
