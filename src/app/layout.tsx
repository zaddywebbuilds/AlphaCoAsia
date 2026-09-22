import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { EXPERTISE } from "@/lib/data";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alphacoasia.com"),
  title: {
    default: "Insurance, Risk & Actuarial Consulting Singapore | Alpha Consultant",
    template: "%s | Alpha Consultant",
  },
  description:
    "Alpha Consultant is a boutique insurance, actuarial, risk and regulatory advisory firm serving insurers, financial institutions and fintechs across Asia Pacific. Based in Singapore.",
  keywords: [
    "insurance consultant Singapore",
    "enterprise risk management Singapore",
    "actuarial consulting Singapore",
    "insurance regulatory consultant",
    "ORSA consultant",
    "RBC2 consultant Singapore",
    "AML CFT consultant Singapore",
    "insurtech consultant",
    "risk advisory Singapore",
    "financial services consultant Singapore",
    "AlphaCoAsia",
    "Alpha Consultant",
  ],
  authors: [{ name: "Alpha Consultant" }],
  creator: "Alpha Consultant",
  publisher: "Alpha Consultant",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://alphacoasia.com",
    siteName: "Alpha Consultant | AlphaCoAsia",
    title: "Insurance, Risk & Actuarial Consulting Singapore | Alpha Consultant",
    description:
      "Helping insurers, financial institutions, fintechs and growing businesses navigate regulation, risk, market entry and transformation across Asia Pacific.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alpha Consultant - Insurance, Risk & Actuarial Advisory Asia Pacific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance, Risk & Actuarial Consulting Singapore | Alpha Consultant",
    description:
      "Helping insurers and financial institutions navigate regulation, risk and transformation across Asia Pacific.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alpha Consultant",
  alternateName: "AlphaCoAsia",
  url: "https://alphacoasia.com",
  logo: "https://alphacoasia.com/logo.svg",
  description:
    "Boutique insurance, actuarial, risk and regulatory advisory firm serving Asia Pacific.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "20 Maxwell Road, #09-17 Maxwell House",
    addressLocality: "Singapore",
    postalCode: "069113",
    addressCountry: "SG",
  },
  telephone: "+6562277175",
  email: "info@alphacoasia.com",
  image: "https://alphacoasia.com/og-image.jpg",
  /* Every market with evidenced advisory experience, matching APAC_MARKETS. */
  areaServed: ["SG", "HK", "MY", "ID", "VN", "MM", "KH", "TW", "BN"],
  knowsAbout: [
    "Enterprise Risk Management",
    "Own Risk and Solvency Assessment",
    "Risk-Based Capital",
    "Actuarial Pricing and Reserving",
    "MAS Regulatory Licensing",
    "AML/CFT Compliance",
    "Insurtech and Digital Insurance",
    "Asia Market Entry",
    "Financial Modelling",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Advisory Services",
    itemListElement: EXPERTISE.map((e) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: e.title,
        description: e.description,
        url: `https://alphacoasia.com/expertise/${e.slug}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
