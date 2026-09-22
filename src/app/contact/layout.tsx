import type { Metadata } from "next";

/* The contact page is a client component for the form state, so it cannot
   export metadata itself — without this it inherited the site default title. */
export const metadata: Metadata = {
  title: "Contact Alpha Consultant",
  description:
    "Discuss an insurance, risk, actuarial or regulatory requirement with Alpha Consultant. Based at 20 Maxwell Road, Singapore, serving clients across Asia Pacific.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
