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

/* The nine disciplines also ship an uncropped 16:9 frame, for surfaces large
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
]);

export function hasDisciplineHero(id: string) {
  return HERO_SUBJECTS.has(id);
}

/** Large-format crop for detail-page heroes. */
export function DisciplineHero({ id, className = "" }: { id: string; className?: string }) {
  if (!HERO_SUBJECTS.has(id)) return null;
  return (
    <div className={`relative overflow-hidden bg-[#070D14] ${className}`} aria-hidden="true">
      <Image
        src={`${BASE}/media/disciplines/hero/${id}.jpg`}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
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

export function DisciplineImage({
  id,
  className = "",
  priority = false,
  scrim = false,
}: {
  id: string;
  className?: string;
  priority?: boolean;
  /** Only when copy is laid over the image. Bottom-weighted, so the upper
   *  two-thirds of the frame stays completely clear. */
  scrim?: boolean;
}) {
  const file = SUBJECTS.has(id) ? id : "enterprise-risk-management";

  return (
    <div className={`relative overflow-hidden bg-[#070D14] ${className}`} aria-hidden="true">
      <Image
        src={`${BASE}/media/disciplines/${file}.jpg`}
        alt=""
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
