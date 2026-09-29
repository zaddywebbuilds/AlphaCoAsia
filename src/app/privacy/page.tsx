import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Alpha Consultant privacy notice — how we collect, use and protect personal data in accordance with Singapore's Personal Data Protection Act (PDPA).",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "October 2024";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A040]" />
                <span className="text-xs font-semibold text-[#C9A040] uppercase tracking-[0.15em]">
                  Legal
                </span>
              </div>
              <h1
                className="font-display text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Privacy Notice
              </h1>
              <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <section className="section-py bg-[#0A1628]">
          <div className="container-xl">
            <div className="max-w-3xl prose-alpha">
              <style>{`
                .prose-alpha h2 {
                  font-family: var(--font-geist-sans), system-ui, sans-serif;
                  font-size: 1.15rem;
                  font-weight: 600;
                  color: #F8F9FB;
                  margin-top: 2.5rem;
                  margin-bottom: 0.75rem;
                  padding-bottom: 0.5rem;
                  border-bottom: 1px solid rgba(255,255,255,0.08);
                }
                .prose-alpha p, .prose-alpha li {
                  font-size: 0.9375rem;
                  line-height: 1.75;
                  color: #94A3B8;
                  margin-bottom: 0.75rem;
                }
                .prose-alpha ul {
                  padding-left: 1.25rem;
                  margin-bottom: 1rem;
                }
                .prose-alpha li {
                  margin-bottom: 0.35rem;
                }
                .prose-alpha a {
                  color: #C9A040;
                  text-decoration: none;
                }
                .prose-alpha strong {
                  color: #E2EAF4;
                  font-weight: 600;
                }
              `}</style>

              <p>
                Alpha Consultant Pte Ltd ("<strong>Alpha Consultant</strong>", "<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") is committed to protecting the personal data of individuals who interact with us, in accordance with the Personal Data Protection Act 2012 of Singapore ("<strong>PDPA</strong>").
              </p>
              <p>
                This Privacy Notice explains how we collect, use, disclose and protect personal data when you visit <strong>alphacoasia.com</strong>, contact us, or engage our advisory services.
              </p>

              <h2>1. Who we are</h2>
              <p>
                Alpha Consultant Pte Ltd is a company registered in Singapore, with its registered office at {COMPANY.address}. We are the data controller for personal data collected through this website and our advisory engagements.
              </p>

              <h2>2. Personal data we collect</h2>
              <p>We may collect the following types of personal data:</p>
              <ul>
                <li><strong>Identity data</strong> — name, job title, company name</li>
                <li><strong>Contact data</strong> — email address, phone number, postal address</li>
                <li><strong>Enquiry data</strong> — the content of messages you send us through the contact form or by email</li>
                <li><strong>Communication preferences</strong> — whether you have subscribed to receive our publications and briefings</li>
              </ul>
              <p>
                We do not collect sensitive personal data (such as financial account numbers, health information, or government-issued identification numbers) through this website.
              </p>

              <h2>3. How we collect personal data</h2>
              <p>We collect personal data when you:</p>
              <ul>
                <li>Complete the enquiry form on this website</li>
                <li>Subscribe to our newsletter or publications</li>
                <li>Contact us directly by email or phone</li>
                <li>Engage our advisory services</li>
              </ul>

              <h2>4. How we use personal data</h2>
              <p>We use personal data for the following purposes:</p>
              <ul>
                <li>To respond to your enquiries and communicate with you about our services</li>
                <li>To provide advisory services you have engaged us for</li>
                <li>To send publications, briefings and updates you have requested</li>
                <li>To comply with our legal and regulatory obligations</li>
                <li>To manage our business operations and client relationships</li>
              </ul>
              <p>
                We will not use your personal data for purposes beyond those stated above without your consent, or where otherwise permitted by the PDPA.
              </p>

              <h2>5. Disclosure of personal data</h2>
              <p>
                We do not sell, rent or trade personal data. We may share personal data with third parties only where necessary:
              </p>
              <ul>
                <li>Service providers who support our operations (such as email and form processing services), who are contractually bound to handle data securely and only for the purposes we specify</li>
                <li>Professional advisers (lawyers, accountants) where required in the course of our work</li>
                <li>Regulatory or government bodies where required by law</li>
              </ul>

              <h2>6. Retention of personal data</h2>
              <p>
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Enquiry data from the contact form is retained for a period sufficient to respond to and manage the enquiry. Client engagement data is retained in accordance with professional and legal requirements.
              </p>

              <h2>7. Protection of personal data</h2>
              <p>
                We implement reasonable security arrangements to protect personal data from unauthorised access, disclosure, alteration or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>8. Your rights</h2>
              <p>Under the PDPA, you have the right to:</p>
              <ul>
                <li>Request access to personal data we hold about you</li>
                <li>Request correction of inaccurate personal data</li>
                <li>Withdraw consent to the use of your personal data (where our use is based on consent), without affecting the lawfulness of processing before withdrawal</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details below. We will respond within a reasonable timeframe and in accordance with PDPA requirements.
              </p>

              <h2>9. Third-party websites</h2>
              <p>
                This website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to read their privacy notices.
              </p>

              <h2>10. Changes to this notice</h2>
              <p>
                We may update this Privacy Notice from time to time. The date at the top of this page reflects when it was last revised. We encourage you to review this notice periodically.
              </p>

              <h2>11. Contact us</h2>
              <p>
                For questions about this Privacy Notice or to exercise your rights under the PDPA, please contact us:
              </p>
              <p>
                <strong>Alpha Consultant Pte Ltd</strong><br />
                {COMPANY.address}<br />
                Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
                Tel: {COMPANY.phone}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
