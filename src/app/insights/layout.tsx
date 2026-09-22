import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  /* A plain string here would replace the root title object for this whole
     subtree, taking its "%s | Alpha Consultant" template with it and leaving
     the article pages unbranded. Restate the template so children keep it. */
  title: {
    default: "Insurance, Risk & Regulatory Insights",
    template: "%s | Alpha Consultant",
  },
  description:
    "Perspectives on insurance regulation, enterprise risk management, actuarial matters, insurtech and emerging financial services trends across Asia Pacific.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insurance, Risk & Regulatory Insights | Alpha Consultant",
    description:
      "Thought leadership on regulatory developments, risk management practice, actuarial matters and emerging trends across Asia Pacific financial services.",
  },
};

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
