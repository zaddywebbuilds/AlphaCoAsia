"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { COMPANY } from "@/lib/data";

const SERVICE_OPTIONS = [
  "Insurance Advisory",
  "Enterprise Risk Management",
  "ORSA",
  "Actuarial Consulting",
  "Risk-Based Capital (RBC2)",
  "Regulatory & Licensing",
  "AML/CFT Compliance",
  "Insurtech & Digital Insurance",
  "Asia Market Entry",
  "Financial Modelling",
  "Professional Training",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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
                {submitted ? (
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Name *</label>
                        <input required type="text" placeholder="Your name" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Company *</label>
                        <input required type="text" placeholder="Your organisation" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Work Email *</label>
                        <input required type="email" placeholder="your@company.com" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Country</label>
                        <input type="text" placeholder="Singapore" className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5 uppercase tracking-wide">Area of Interest</label>
                      {/* Opaque rather than translucent, so the closed control and
                          the open option list sit on the same colour. */}
                      <select className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-[#0E1B30]">
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
                        rows={5}
                        placeholder="Please describe your business challenge or what you would like to discuss..."
                        className="w-full px-4 py-3 border border-white/[0.09] rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A040] focus:ring-1 focus:ring-[#C9A040] bg-white/[0.06] resize-y"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A040] text-[#221805] text-sm font-semibold rounded-lg hover:bg-[#12213A] transition-colors disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send Message"}
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
