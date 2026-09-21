import type { MetadataRoute } from "next";
import { EXPERTISE, INDUSTRIES, CASE_STUDIES, LEADERSHIP } from "@/lib/data";

export const dynamic = "force-static";

const BASE = "https://alphacoasia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/expertise`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/industries`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/training`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/case-studies`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/insights`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const expertise_pages = EXPERTISE.map((e) => ({
    url: `${BASE}/expertise/${e.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const industry_pages = INDUSTRIES.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  const case_study_pages = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  // Individual insight articles are not published yet, so they stay out of the
  // sitemap until the pages exist.
  const team_pages = LEADERSHIP.map((p) => ({
    url: `${BASE}/team/${p.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  return [...static_pages, ...expertise_pages, ...industry_pages, ...case_study_pages, ...team_pages];
}
