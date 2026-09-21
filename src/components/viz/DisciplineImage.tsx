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

/* Subjects that also have a taller crop, for surfaces large enough to show
   the detail in the frame rather than cropping it away. */
const HERO_SUBJECTS = new Set([
  "enterprise-risk-management",
  "actuarial-consulting",
  "orsa-advisory",
  "risk-based-capital",
  "regulatory-licensing",
  "aml-cft",
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
        className="object-cover [filter:saturate(0.62)_contrast(1.02)_brightness(0.92)]"
      />
      <div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(150deg,rgba(10,22,40,0.34),transparent_55%,rgba(30,159,216,0.10))]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.07]" />
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
}: {
  id: string;
  className?: string;
  priority?: boolean;
}) {
  const file = SUBJECTS.has(id) ? id : "enterprise-risk-management";

  return (
    <div className={`relative overflow-hidden bg-[#070D14] ${className}`} aria-hidden="true">
      <Image
        src={`${BASE}/media/disciplines/${file}.jpg`}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        className="object-cover [filter:saturate(0.4)_contrast(1.02)_brightness(0.82)] scale-[1.02] group-hover:scale-[1.07] group-hover/card:scale-[1.07] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {/* Navy/cyan grade, so every image sits in the same palette */}
      <div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(150deg,rgba(10,22,40,0.55),rgba(7,13,20,0.35)_55%,rgba(30,159,216,0.14))]" />
      {/* Edge falloff, so the crop reads as intentional */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_82%_82%_at_50%_48%,transparent_48%,rgba(7,13,20,0.62)_100%)]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );
}
