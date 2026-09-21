interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          <div className="w-8 h-px bg-[#C9A040]" />
          <span
            className={`text-xs font-semibold uppercase tracking-[0.15em] ${
              light ? "text-[#C9A040]" : "text-[#A8801A]"
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`text-display-md font-display mb-4 ${
          light ? "text-white" : "text-[#0D1B2A]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed max-w-xl ${
            light ? "text-slate-300" : "text-[#64748B]"
          } ${align === "left" ? "" : "mx-auto"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
