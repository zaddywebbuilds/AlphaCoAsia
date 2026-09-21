"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years Industry Experience" },
  { value: "9", label: "APAC Markets Served" },
  { value: "50+", label: "Engagements Completed" },
  { value: "5", label: "Core Disciplines" },
];

const disciplines = ["Insurance", "Risk", "Actuarial", "Regulatory", "Compliance"];

export function AuthorityStrip() {
  return (
    <section className="bg-[#0D1B2A] border-b border-white/8">
      <div className="container-xl py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center md:text-left"
              >
                <div
                  className="font-display text-4xl font-semibold text-white mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-white/12" />

          {/* Disciplines */}
          <div className="flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <span
                key={d}
                className="px-3 py-1.5 bg-white/8 border border-white/12 rounded-full text-xs font-medium text-slate-300"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
