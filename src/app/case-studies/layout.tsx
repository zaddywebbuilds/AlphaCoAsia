import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Selected Advisory Engagements",
  description:
    "A selection of Alpha Consultant's advisory and consulting engagements across insurance, risk, regulatory and actuarial disciplines in Asia Pacific.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
