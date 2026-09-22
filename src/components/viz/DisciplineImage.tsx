import Image from "next/image";

/* With images.unoptimized the src passes through untouched, so basePath has to
   be applied by hand or every image 404s on the GitHub Pages subdirectory. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Photographic panel for a discipline. One image per subject, graded to the
   navy/gold palette so a row of them reads as one art-directed set rather than
   assorted stock. Decorative: the card's heading carries the meaning. */

/* Every panel subject that has its own photograph. Discipline slugs, the two
   training-only subjects, and the institution types. */
const SUBJECTS = new Set([
  "enterprise-risk-management",
  "actuarial-consulting",
  "orsa-advisory",
  "risk-based-capital",
  "regulatory-licensing",
  "aml-cft",
  "insurtech-digital",
  "market-entry",
  "financial-modelling",
  "due-diligence-corporate-deals",
  "capital-markets-advisory",
  "cyber-risk",
  "esg-risk",
  "training",
  "insurance-companies",
  "insurance-brokers",
  "financial-advisers",
  "fintech-insurtech",
  "banking",
  "asset-management",
  "professional-services",
]);

export function hasDisciplineImage(id: string) {
  return SUBJECTS.has(id);
}

/* The eleven disciplines also ship an uncropped 16:9 frame, for surfaces large
   enough to show the dashboard detail rather than cropping it away. */
const HERO_SUBJECTS = new Set([
  "enterprise-risk-management",
  "actuarial-consulting",
  "orsa-advisory",
  "risk-based-capital",
  "regulatory-licensing",
  "aml-cft",
  "insurtech-digital",
  "market-entry",
  "financial-modelling",
  "due-diligence-corporate-deals",
  "capital-markets-advisory",
]);

export function hasDisciplineHero(id: string) {
  return HERO_SUBJECTS.has(id);
}

/** Large-format 16:9 frame. Give it an `aspect-video` box and nothing is cropped. */
export function DisciplineHero({
  id,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  id: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!HERO_SUBJECTS.has(id)) return null;
  return (
    <div className={`relative overflow-hidden bg-[#070D14] ${className}`}>
      <Image
        src={`${BASE}/media/disciplines/hero/${id}.jpg`}
        alt={ALT[id] ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {/* No grade. These are surfaces, not backdrops — the detail has to read. */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.10]" />
    </div>
  );
}

/** An engagement's discipline decides its cover image. */
export const SUBJECT_FOR_SERVICE: Record<string, string> = {
  "Enterprise Risk Management": "enterprise-risk-management",
  "Regulatory & Licensing": "regulatory-licensing",
  "Risk-Based Capital": "risk-based-capital",
  "AML/CFT Compliance": "aml-cft",
};

/** An article's category decides its image. */
export const SUBJECT_FOR_CATEGORY: Record<string, string> = {
  "Regulatory Compliance": "regulatory-licensing",
  "Risk & Governance": "enterprise-risk-management",
  Actuarial: "actuarial-consulting",
  "Fintech & Insurtech": "insurtech-digital",
  "APAC Markets": "market-entry",
};

/* Descriptive alt per subject. These images carry real content — a risk heat
   map, a capital adequacy chart — so an empty alt throws that away for search
   and for anyone using a screen reader. */
const ALT: Record<string, string> = {
  "enterprise-risk-management": "Enterprise risk management review: risk heat map, exposure by category and mitigation controls",
  "actuarial-consulting": "Actuarial consulting: pricing and reserving analysis with loss distribution modelling",
  "orsa-advisory": "ORSA advisory: forward solvency projection assessed against the regulatory capital requirement",
  "risk-based-capital": "Risk-based capital advisory: capital adequacy by tier and RBC2 solvency ratio",
  "regulatory-licensing": "Regulatory and licensing advisory: MAS financial services licensing process and approval milestones",
  "aml-cft": "AML/CFT compliance: transaction monitoring, customer risk profiling and alert review",
  "insurtech-digital": "Insurtech and digital insurance: platform architecture from channels through to the policy core",
  "market-entry": "Asia market entry advisory: market prioritisation across Asia Pacific",
  "financial-modelling": "Financial modelling: business planning, valuation and scenario analysis",
  "due-diligence-corporate-deals": "Due diligence and corporate deals: an executive boardroom overlooking a financial district at dusk",
  "capital-markets-advisory": "IPO and capital markets advisory: the Singapore central business district and financial institutions along the Singapore River",
  "cyber-risk": "Cyber risk and insurance training for insurance and risk professionals",
  "esg-risk": "ESG risk management training covering regulatory trends and scenario analysis",
  training: "Professional training delivered to an insurance and risk management audience",
  "insurance-companies": "Advisory for licensed insurance companies across Asia Pacific",
  "insurance-brokers": "Advisory for licensed insurance brokers",
  "financial-advisers": "Advisory for financial advisory firms and representatives",
  "fintech-insurtech": "Advisory for fintech and insurtech companies building financial services propositions",
  banking: "Risk and compliance advisory for banking institutions",
  "asset-management": "Advisory for asset managers and fund management companies",
  "professional-services": "Specialist advisory for professional services firms serving regulated clients",
};

export function DisciplineImage({
  id,
  className = "",
  priority = false,
  scrim = false,
  decorative = false,
}: {
  id: string;
  className?: string;
  priority?: boolean;
  /** Only when copy is laid over the image. Bottom-weighted, so the upper
   *  two-thirds of the frame stays completely clear. */
  scrim?: boolean;
  /** Set when an adjacent heading already states the same thing, so the image
   *  would only repeat it to a screen reader. */
  decorative?: boolean;
}) {
  const file = SUBJECTS.has(id) ? id : "enterprise-risk-management";
  const alt = decorative ? "" : ALT[file] ?? "";

  return (
    <div className={`relative overflow-hidden bg-[#070D14] ${className}`} aria-hidden={alt ? undefined : true}>
      <Image
        src={`${BASE}/media/disciplines/${file}.jpg`}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        priority={priority}
        className="object-cover group-hover:scale-[1.04] group-hover/card:scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {/* No grade. These are surfaces, not backdrops — the detail has to read. */}
      {scrim && (
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,18,0.94)_0%,rgba(5,10,18,0.70)_26%,rgba(5,10,18,0.16)_52%,transparent_72%)]" />
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.10]" />
    </div>
  );
}
