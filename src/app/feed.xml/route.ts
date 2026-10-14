import { INSIGHTS_PLACEHOLDER } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
  const BASE = "https://alphacoasia.com";
  const sorted = [...INSIGHTS_PLACEHOLDER].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE}/insights/${a.slug}</link>
      <guid isPermaLink="true">${BASE}/insights/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
      <category>${a.category}</category>
      <author>admin@alphacoasia.com (Alpha Consultant)</author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alpha Consultant Insights</title>
    <link>${BASE}/insights</link>
    <description>Insurance, risk, actuarial and regulatory intelligence for Asia Pacific financial institutions.</description>
    <language>en-sg</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/og-image.jpg</url>
      <title>Alpha Consultant Insights</title>
      <link>${BASE}/insights</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
