"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEADERSHIP } from "@/lib/data";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

/* Portrait plate — a dimensional frame with the career history sitting on a
   lower plane behind the monogram. Replace the plate with a photo when one exists. */
function Plate({ person, tall }: { person: (typeof LEADERSHIP)[number]; tall?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#0A1628] ${tall ? "h-[300px]" : "h-full min-h-[168px]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_35%_25%,#1A3550_0%,#0A1628_70%)]" />
      <div className="absolute inset-0 tex-grid-fine opacity-50" />

      {/* Career companies on a recessed plane */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 gap-1 opacity-[0.16]">
        {person.pastRoles.slice(0, 4).map((r) => (
          <span key={r} className="type-technical text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {r}
          </span>
        ))}
      </div>

      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display font-semibold text-white/[0.13] select-none"
          style={{ fontSize: tall ? "7rem" : "3.6rem", letterSpacing: "-0.04em" }}
        >
          {initials(person.name)}
        </span>
      </div>

      {/* Spotlight sweep */}
      <div className="absolute -inset-x-8 -top-16 h-32 bg-[linear-gradient(105deg,transparent,rgba(56,189,248,0.10),transparent)] rotate-[-8deg]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-[linear-gradient(to_right,transparent,#C9A040,transparent)]" />
    </div>
  );
}

export function LeadershipSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [lead, ...team] = LEADERSHIP;

  return (
    <section ref={ref} className="relative section-py bg-[#F8F6F1] overflow-hidden">
      <div className="absolute inset-0 tex-grid-dark opacity-50" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#A8801A]" />
              <span className="type-technical text-[#A8801A]">Leadership</span>
            </div>
            <h2
              className="font-display text-[#0D1B2A] leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Meet our senior advisors
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h-dark mb-5" />
            <p className="text-sm text-[#64748B] leading-relaxed">
              Direct practitioner experience from major regional insurance, reinsurance and
              financial institutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Founder */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <Link
              href={`/team/${lead.slug}`}
              className="group block h-full bg-white rounded-[14px] border border-[#E4E0D6] overflow-hidden shadow-[0_2px_4px_rgba(10,22,40,0.04)] hover:shadow-[0_28px_56px_-28px_rgba(10,22,40,0.4)] hover:-translate-y-[3px] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <Plate person={lead} tall />
              <div className="p-7">
                <span className="type-technical text-[#A8801A] mb-3 block">Founder</span>
                <h3 className="font-display text-[#0D1B2A] text-2xl font-semibold leading-tight mb-1">
                  <span className="link-rule">{lead.name}</span>
                </h3>
                {lead.credentials && (
                  <p className="type-technical text-[#A8801A] mb-1.5">{lead.credentials}</p>
                )}
                <p className="text-[13px] text-[#64748B] mb-4">{lead.title}</p>
                <p className="text-sm text-[#64748B] leading-relaxed mb-5">{lead.shortBio}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {lead.expertise.slice(0, 5).map((e) => (
                    <span key={e} className="px-2.5 py-1 bg-[#F8F6F1] border border-[#E4E0D6] rounded text-[11.5px] text-[#64748B]">
                      {e}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] group-hover:text-[#A8801A] transition-colors">
                  Full profile
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-500" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Team */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {team.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, x: 22 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <Link
                  href={`/team/${p.slug}`}
                  className="group grid grid-cols-1 sm:grid-cols-[168px_1fr] h-full bg-white rounded-[14px] border border-[#E4E0D6] overflow-hidden shadow-[0_2px_4px_rgba(10,22,40,0.04)] hover:shadow-[0_24px_48px_-26px_rgba(10,22,40,0.36)] hover:-translate-y-[3px] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <Plate person={p} />
                  <div className="p-6">
                    <h3 className="text-[16px] font-semibold text-[#0D1B2A] leading-tight mb-0.5">
                      <span className="link-rule">{p.name}</span>
                    </h3>
                    {p.credentials && (
                      <p className="type-technical text-[#A8801A] mb-1">{p.credentials}</p>
                    )}
                    <p className="text-[12.5px] text-[#64748B] mb-3">{p.title}</p>
                    <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-3 mb-3">
                      {p.shortBio}
                    </p>
                    <span className="inline-flex items-center gap-1.5 type-technical text-[#0D1B2A] group-hover:text-[#A8801A] transition-colors">
                      Full profile
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
