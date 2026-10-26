export const COMPANY = {
  name: "Alpha Consultant",
  domain: "AlphaCoAsia",
  tagline: "Insurance, Risk, Actuarial & Regulatory Advisory Across Asia Pacific",
  description:
    "Helping insurers, financial institutions, fintechs and growing businesses navigate regulation, risk, market entry and transformation across Asia Pacific.",
  address: "139 Cecil Street, #03-12 YSY Building, Singapore 069539",
  phone: "+65 6227 7175",
  email: "admin@alphacoasia.com",
  url: "https://alphacoasia.com",
};

export const EXPERTISE = [
  {
    slug: "enterprise-risk-management",
    title: "Enterprise Risk Management",
    shortTitle: "ERM",
    tagline: "Building robust risk frameworks that meet regulatory expectations and drive strategic value.",
    description:
      "Independent ERM framework reviews, ORSA advisory, risk governance design and risk culture development for insurers and financial institutions across Asia Pacific.",
    icon: "shield",
    topics: ["ERM Framework Review", "Risk Governance", "Risk Culture", "Risk Appetite", "ORSA", "Stress Testing"],
    faqs: [
      { q: "What is an ERM framework review?", a: "An independent assessment of an organisation's enterprise risk management framework, covering risk governance, risk appetite, risk identification and assessment processes, stress testing and management reporting. The review benchmarks the framework against regulatory expectations and industry practice, and identifies gaps that need to be addressed." },
      { q: "Who typically commissions an ERM framework review?", a: "Boards and senior management of licensed insurers and financial institutions, often in advance of a regulatory inspection, following changes in ownership or business strategy, or as part of an ongoing governance improvement programme." },
      { q: "What is the difference between ERM and ORSA?", a: "ERM is the broader framework within which risk is identified, measured and managed across the organisation. ORSA is a specific regulatory requirement that assesses the insurer's solvency needs relative to its risk profile and is produced within the ERM framework. A sound ERM framework is a precondition for a credible ORSA." },
    ],
  },
  {
    slug: "actuarial-consulting",
    title: "Actuarial Consulting",
    shortTitle: "Actuarial",
    tagline: "Rigorous actuarial analysis supporting pricing, reserving and capital decisions.",
    description:
      "Actuarial pricing, reserving, financial modelling and capital analysis for insurance companies, reinsurers and financial institutions.",
    icon: "calculator",
    topics: ["Pricing & Reserving", "Financial Modelling", "Capital Modelling", "Product Development", "Peer Review"],
    faqs: [
      { q: "When does an insurer need external actuarial support?", a: "External actuarial support is typically engaged for independent peer review of internal actuarial work, specialist pricing and reserving projects, capital modelling, product development and regulatory submissions where an independent actuarial opinion is expected or required." },
      { q: "What is actuarial peer review?", a: "An independent review of actuarial assumptions, methods and outputs conducted by a qualified actuary who was not involved in producing the original work. Regulatory frameworks and governance standards in Singapore and across Asia Pacific expect peer review for material actuarial work." },
      { q: "What actuarial work is required under IFRS 17?", a: "IFRS 17 requires insurers to measure insurance contracts using actuarial estimates of future cash flows, a risk adjustment for non-financial risk, and a Contractual Service Margin representing unearned profit. The transition and ongoing production of IFRS 17 results typically requires actuarial modelling and governance support." },
    ],
  },
  {
    slug: "orsa-advisory",
    title: "ORSA Advisory",
    shortTitle: "ORSA",
    tagline: "Independent ORSA reviews and framework development for licensed insurers.",
    description:
      "Own Risk and Solvency Assessment advisory including independent reviews, framework design, governance assessment and regulatory alignment.",
    icon: "chart",
    topics: ["Independent ORSA Review", "ORSA Framework Design", "Governance Assessment", "Regulatory Alignment"],
    faqs: [
      { q: "What is an ORSA?", a: "The Own Risk and Solvency Assessment is a regulatory requirement for licensed insurers under risk-based supervisory frameworks including Singapore's RBC2 framework. It requires the insurer to assess its overall solvency needs relative to its risk profile, business strategy and risk appetite, and to demonstrate that it holds adequate capital to support those risks." },
      { q: "How often must Singapore insurers complete an ORSA?", a: "MAS requires licensed insurers to complete an ORSA at least annually and more frequently following material changes to the risk profile, business strategy or solvency position. The ORSA report is submitted to MAS as part of the insurer's regulatory reporting obligations." },
      { q: "What does MAS expect from an ORSA report?", a: "MAS expects the ORSA to cover the insurer's risk profile and risk appetite, forward-looking solvency projections under base case and stress scenarios, and an assessment of capital adequacy relative to the insurer's own risk tolerance. The ORSA must demonstrate board engagement and ownership of the risk and solvency assessment process." },
    ],
  },
  {
    slug: "risk-based-capital",
    title: "Risk-Based Capital",
    shortTitle: "RBC",
    tagline: "Specialist RBC2 advisory and training for Singapore and regional insurers.",
    description:
      "Risk-Based Capital (RBC2) advisory, implementation support and professional training for insurers navigating the Singapore regulatory capital framework.",
    icon: "trending",
    topics: ["RBC2 Advisory", "Capital Planning", "RBC Training", "Implementation Support"],
    faqs: [
      { q: "What is the RBC2 framework in Singapore?", a: "Risk-Based Capital 2 (RBC2) is the capital adequacy regulatory framework for Singapore-licensed insurers, administered by MAS. It replaced the original RBC framework and introduced more risk-sensitive capital requirements aligned with international standards. Insurers must maintain Financial Resources at least equal to their Total Risk Requirement at all times." },
      { q: "Which insurers does RBC2 apply to?", a: "RBC2 applies to all insurers licensed in Singapore under the Insurance Act, including life insurers, general insurers and composite insurers. The framework includes specific requirements calibrated to each business type and the insurer's risk profile." },
      { q: "What triggers an RBC2 regulatory intervention?", a: "MAS may intervene when an insurer's capital adequacy ratio falls below the supervisory intervention levels set under RBC2. Insurers approaching these thresholds are expected to notify MAS and submit a capital restoration plan. Maintaining a capital buffer above the minimum is standard practice for licensed insurers." },
    ],
  },
  {
    slug: "regulatory-licensing",
    title: "Regulatory & Licensing Advisory",
    shortTitle: "Regulatory",
    tagline: "Navigating MAS and regional regulatory requirements with experienced practitioners.",
    description:
      "MAS insurance and financial adviser licence applications, regulatory compliance advisory, licensing strategy and regulatory change management across Singapore and Asia.",
    icon: "document",
    topics: ["MAS Licence Applications", "Regulatory Compliance", "Licensing Strategy", "Regulatory Change"],
    faqs: [
      { q: "What types of licences does MAS issue for insurance?", a: "MAS issues licences for life insurance, general insurance and composite insurance business, as well as licences for Lloyd's Managing Agents operating in Singapore. Separate licensing frameworks apply to insurance intermediaries including insurance brokers, financial advisers and MAS-regulated fintech firms." },
      { q: "How long does a MAS insurance licence application take?", a: "The timeline depends on the completeness of the application and the complexity of the proposed business model. Applicants should plan for a process of several months from submission to in-principle approval, with additional time required to fulfil pre-licensing conditions before the licence is granted." },
      { q: "What documentation is required for a MAS insurance licence application?", a: "A MAS insurance licence application requires a detailed business plan, financial projections, fit and proper documentation for key individuals, governance and risk management frameworks, AML/CFT policies and regulatory capital projections among other materials. MAS has published detailed guidance on its requirements." },
    ],
  },
  {
    slug: "aml-cft",
    title: "AML/CFT Compliance",
    shortTitle: "AML/CFT",
    tagline: "Building defensible AML/CFT frameworks for Singapore-regulated financial institutions.",
    description:
      "Anti-money laundering and counter-financing of terrorism framework development, independent reviews and compliance outsourcing for regulated entities.",
    icon: "lock",
    topics: ["AML/CFT Framework", "Independent Review", "Compliance Outsourcing", "PDPA Compliance"],
    faqs: [
      { q: "What is an AML/CFT independent review?", a: "An independent review of an organisation's anti-money laundering and counter-financing of terrorism framework, conducted by a party external to the compliance function. It assesses the adequacy of policies, controls and procedures against MAS regulatory requirements and identifies gaps requiring remediation." },
      { q: "How often should AML/CFT frameworks be reviewed?", a: "MAS regulations require regulated entities to conduct periodic reviews of their AML/CFT frameworks. The frequency depends on the entity type and risk profile, but annual reviews of key framework components are standard practice for Singapore-regulated insurers, financial advisers and other MAS-regulated entities." },
      { q: "What triggers an enhanced AML/CFT review?", a: "Enhanced reviews are typically triggered by regulatory changes, a material change in business model or customer base, findings from internal audit or prior external reviews, or regulatory feedback following a MAS inspection. Boards are expected to commission independent reviews when these triggers arise." },
    ],
  },
  /* The transactions and capital pillars, worded from alphacoasia.com, which
     presents both alongside the insurance-risk foundation. Led by Edmund Chan.
     M&A and due diligence sit here rather than under capital markets, so the
     two do not overlap — this mirrors the split on their own site. */
  {
    slug: "due-diligence-corporate-deals",
    title: "Due Diligence & Corporate Deals",
    shortTitle: "Corporate Deals",
    tagline: "Cross-border transactions, managed end to end.",
    description:
      "Buy-side and sell-side M&A advice, financial, actuarial, operational and regulatory due diligence, deal project management across jurisdictions, joint ventures, valuation and post-merger integration. An actuarial and regulatory background gives particular depth on insurers, brokers, fund managers and other regulated targets.",
    icon: "search",
    topics: [
      "Mergers & Acquisitions",
      "Financial & Actuarial Due Diligence",
      "Deal Project Management",
      "Joint Ventures & Strategic Partnerships",
      "Valuation & Financial Modelling",
      "Post-Merger Integration",
    ],
    faqs: [
      { q: "What is involved in insurance M&A due diligence?", a: "Insurance M&A due diligence covers financial, actuarial, regulatory and operational assessment of the target. Key areas include reserve adequacy, capital position and projections, regulatory compliance status, licensing, reinsurance arrangements, management quality and systems infrastructure. The actuarial component is often the most material because reserve adequacy directly affects the value of the business." },
      { q: "Why is actuarial due diligence important in insurance transactions?", a: "Reserve adequacy is often the most material uncertainty in an insurance acquisition. Independent actuarial review of the target's technical provisions, claims development experience and pricing assumptions helps buyers form a realistic view of the balance sheet before the transaction completes and avoids post-closing reserve surprises." },
      { q: "What regulatory approvals are required for insurance M&A in Asia?", a: "Most Asian markets require regulatory approval for changes of control in licensed insurance companies. In Singapore, MAS must approve any acquisition of a substantial shareholding in a licensed insurer. Similar requirements apply in Hong Kong, Malaysia and Indonesia, each with their own notification timelines and approval criteria." },
    ],
  },
  {
    slug: "capital-markets-advisory",
    title: "IPO & Capital Markets Advisory",
    shortTitle: "Capital Markets",
    tagline: "From private company to listed issuer.",
    description:
      "IPO readiness and listing venue selection, pre-IPO restructuring and governance, pre-IPO and private fundraising, listing execution and roadshow coordination, cross-border and alternative listing routes, and ongoing obligations after listing.",
    icon: "trending-up",
    topics: [
      "IPO Readiness & Venue Selection",
      "Pre-IPO Restructuring & Governance",
      "Pre-IPO & Private Fundraising",
      "Listing Execution & Roadshow",
      "Cross-Border & Alternative Routes",
      "Post-Listing Support",
    ],
    faqs: [
      { q: "What is an IPO readiness assessment for an insurance company?", a: "An assessment of the company's preparedness for a public listing, covering governance and board composition, financial reporting and controls, regulatory standing, disclosure requirements and investor relations capability. It identifies gaps that need to be addressed before a listing process begins and gives management a realistic view of the work required." },
      { q: "Which listing venues are most relevant for Asian insurance companies?", a: "Singapore Exchange (SGX), Hong Kong Stock Exchange (HKEX) and Bursa Malaysia are the primary venues for regional insurance companies. Each has different listing requirements, liquidity profiles and investor bases. The choice of venue depends on the company's size, business focus, shareholder profile and strategic objectives." },
      { q: "What pre-IPO restructuring is typically required for insurers?", a: "Pre-IPO restructuring for insurers often covers group structure simplification, transfer of non-core assets, governance enhancements including board independence requirements, related party transaction policies, and financial reporting alignment with listing venue standards. Regulatory approval from the relevant insurance supervisor may be required for structural changes." },
    ],
  },
  {
    slug: "insurtech-digital",
    title: "Insurtech & Digital Insurance",
    shortTitle: "Insurtech",
    tagline: "Strategic advisory for digital insurers, MGA platforms and insurance technology ventures.",
    description:
      "Strategy, regulatory and operational advisory for insurtech companies, digital insurance platforms and financial institutions building insurance propositions.",
    icon: "zap",
    topics: ["Digital Insurance Strategy", "Insurtech Advisory", "Platform Development", "Regulatory Navigation"],
    faqs: [
      { q: "What regulatory requirements apply to digital insurers in Singapore?", a: "Digital insurers in Singapore require a licence from MAS under the Insurance Act. MAS has issued guidelines covering technology risk management, business continuity, cyber resilience and customer protection that apply specifically to digital insurance operations. Product approval processes apply to all insurance products regardless of distribution channel." },
      { q: "What is an MGA and does it need a licence in Singapore?", a: "A Managing General Agent (MGA) underwrites insurance on behalf of a licensed insurer, typically with delegated binding authority for a defined class of business. Whether an MGA platform requires its own MAS licence depends on the scope of its activities. MAS has published guidance on the regulatory perimeter for intermediaries including MGAs." },
      { q: "What is the difference between a digital insurer and an insurtech?", a: "A digital insurer is a licensed insurance company that distributes and manages insurance products through digital channels. An insurtech is typically a technology company operating in the insurance value chain, which may or may not require a licence depending on its activities. Some insurtechs hold or require insurance distribution, brokerage or underwriting licences." },
    ],
  },
  {
    slug: "market-entry",
    title: "Asia Market Entry Advisory",
    shortTitle: "Market Entry",
    tagline: "Structured market entry support for insurance and financial services businesses entering Asia.",
    description:
      "Market assessment, regulatory strategy, licensing and operational advisory for companies entering Singapore, Hong Kong, Indonesia, Malaysia and other Asian markets.",
    icon: "globe",
    topics: ["Market Assessment", "Regulatory Strategy", "Licensing", "Operational Setup"],
    faqs: [
      { q: "What does market entry advisory involve for insurance companies entering Singapore?", a: "Market entry advisory covers regulatory strategy and licensing route assessment, business plan development, regulatory submissions to MAS, governance framework design, fit and proper documentation for key individuals and operational setup to meet MAS requirements. The process spans from initial feasibility through to licence grant and operational launch." },
      { q: "How do foreign insurers establish a presence in Singapore?", a: "Foreign insurers can establish a presence in Singapore as a licensed branch, a locally incorporated subsidiary or through a representative office for non-underwriting activities. Each route has different regulatory requirements, capital implications and operational constraints. The choice depends on the nature of the business and the insurer's long-term objectives in Singapore." },
      { q: "Which Asian markets require local insurance licences for foreign insurers?", a: "Most Asian markets require foreign insurers to obtain a local licence to write insurance business in that jurisdiction. Singapore, Hong Kong, Malaysia, Indonesia and Vietnam each have distinct licensing regimes with different capital requirements, governance standards and business plan expectations. Some markets impose restrictions on foreign ownership that affect the entry structure." },
    ],
  },
  {
    slug: "financial-modelling",
    title: "Financial Modelling",
    shortTitle: "Modelling",
    tagline: "Rigorous financial and actuarial models supporting business decisions and regulatory submissions.",
    description:
      "Financial modelling, due diligence support, business planning and valuation analysis for insurance and financial services transactions.",
    icon: "bar-chart",
    topics: ["Business Planning Models", "Due Diligence", "Valuation", "Scenario Analysis"],
    faqs: [
      { q: "What is a financial model review for an insurance company?", a: "An independent assessment of the design, assumptions and outputs of an insurer's financial model, covering model structure and logic, assumption setting and governance, output validation and the appropriateness of the model for its intended use. Model reviews are expected for material models used in regulatory submissions, capital decisions and transaction support." },
      { q: "When do insurers need external financial modelling support?", a: "External modelling support is typically engaged for business planning, capital management decisions, M&A and due diligence, regulatory submissions where model validation is required, and product development where pricing models need independent assessment. It is also used when an insurer lacks in-house modelling capacity for a specific project." },
      { q: "What financial modelling is required under RBC2 and IFRS 17?", a: "RBC2 requires insurers to model their capital requirements under a range of stress scenarios and to project solvency ratios over a forward-looking planning horizon. IFRS 17 requires actuarial cash flow models to estimate future insurance cash flows and measure insurance liabilities. Both frameworks involve significant modelling infrastructure and governance requirements." },
    ],
  },
];

export const INDUSTRIES = [
  {
    slug: "insurance-companies",
    title: "Insurance Companies",
    description:
      "ERM, ORSA, RBC, actuarial, regulatory compliance and digital transformation advisory for licensed insurers across Asia Pacific.",
    challenges: ["Regulatory compliance", "Capital adequacy", "ERM framework", "Digital transformation", "Market expansion"],
  },
  {
    slug: "insurance-brokers",
    title: "Insurance Brokers",
    description:
      "Compliance advisory, AML/CFT frameworks, regulatory licensing and operational guidance for licensed insurance brokers.",
    challenges: ["MAS compliance", "AML/CFT obligations", "Business development", "Digital channels"],
  },
  {
    slug: "financial-advisers",
    title: "Financial Advisers",
    description:
      "Compliance support, regulatory guidance and professional development for financial advisory businesses and representatives.",
    challenges: ["Regulatory requirements", "Compliance frameworks", "Professional training", "Business growth"],
  },
  {
    slug: "fintech-insurtech",
    title: "Fintech & Insurtech",
    description:
      "Strategy, regulatory navigation and operational advisory for fintech and insurtech companies building financial services propositions in Asia.",
    challenges: ["Licensing strategy", "Regulatory navigation", "Product design", "Operational build"],
  },
  {
    slug: "banking",
    title: "Banks",
    description:
      "Risk advisory, AML/CFT compliance and financial modelling support for banking institutions operating across Asia.",
    challenges: ["Risk frameworks", "AML/CFT compliance", "Financial modelling", "Regulatory change"],
  },
  {
    slug: "asset-management",
    title: "Asset & Fund Managers",
    description:
      "Regulatory compliance, risk advisory and operational support for asset managers and fund management companies in Asia.",
    challenges: ["Regulatory compliance", "Risk management", "Operational efficiency", "Market entry"],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    description:
      "Specialist insurance and financial services advisory for accounting firms, law firms and professional services companies serving regulated clients.",
    challenges: ["Specialist knowledge", "Regulatory navigation", "Client support", "Training"],
  },
];

/* Order, titles, bios, highlights, portraits and emails all taken from the
   leadership section of alphacoasia.com. Highlights are the firm's own wording.
   Eugene Cheong is no longer listed there and has been removed accordingly. */
export const LEADERSHIP = [
  {
    slug: "raymond-cheung",
    name: "Raymond Cheung",
    title: "Founder & Managing Director",
    credentials: "B.Bus, AIA, ASAS, ACLP, MBA",
    shortBio:
      "Chartered Actuary and C-suite executive with over 20 years in insurance, reinsurance, capital markets and regulatory engagement across Asia Pacific.",
    highlights: [
      "Former Group CEO of Basel Medical Group (Nasdaq: BMGL), whose Nasdaq IPO he led",
      "Independent Director of iO3 Ltd (Nasdaq) and SDAI Ltd (SGX); formerly of BJCG Ltd (SGX)",
      "Singapore Director and MAS Key Appointment Holder at a Major Payment Institution",
      "Former CRO of AIG Asia Pacific and Group CRO of Asia Capital Re; former Regional Insurance Lead at Grab",
      "Chaired the Singapore Actuarial Society's RBC Working Party for 8 years",
    ],
    expertise: ["Enterprise Risk Management", "Actuarial", "Regulatory Advisory", "Insurtech", "RBC2", "Capital Markets"],
    markets: ["Singapore", "Hong Kong", "Malaysia", "Indonesia", "Regional APAC"],
    affiliations: ["Singapore Actuarial Society", "Singapore College of Insurance", "SMU Academy"],
    pastRoles: [
      "AIG Asia Pacific (CRO)",
      "Asia Capital Reinsurance (Group CRO)",
      "Grab (Regional Insurance Lead)",
      "Basel Medical Group (Group CEO, Nasdaq IPO)",
    ],
    email: "raymond.cheung@alphacoasia.com",
    linkedin: "https://www.linkedin.com/in/raymond-cheung-erm/",
    image: "/media/team/raymond-cheung.jpg",
  },
  {
    slug: "edmund-chan",
    name: "Edmund Chan",
    title: "Partner",
    credentials: "MBA",
    shortBio:
      "Over 28 years in corporate finance and business across many industries, now focused on the energy sector.",
    highlights: [
      "Cross-border IPO and M&A advisory",
      "Project management of corporate deals spanning Asia Pacific and North America",
      "Leads Alpha's Capital Markets and Corporate Deals practice",
    ],
    expertise: ["IPO Advisory", "M&A & Due Diligence", "Cross-Border Deals", "Corporate Finance", "Capital Markets"],
    markets: ["Singapore", "Asia Pacific", "North America"],
    affiliations: [],
    pastRoles: [],
    email: "ed@alphacoasia.com",
    linkedin: "",
    image: "/media/team/edmund-chan.jpg",
  },
  {
    slug: "byong-chon",
    name: "Byong Chon",
    title: "Technology Director",
    credentials: "",
    shortBio:
      "Over 15 years with technology MNCs, consultancies and start-ups, including portfolio management.",
    highlights: [
      "Fintech, insurtech and supply-chain financing across Southeast Asia",
      "Digital transformation and technology strategy",
    ],
    expertise: ["Technology Strategy", "Digital Transformation", "Fintech & Insurtech", "Business Development", "Supply-Chain Financing"],
    markets: ["Singapore", "Indonesia", "Philippines", "Regional APAC"],
    affiliations: [],
    pastRoles: [
      "Apple Pte Ltd (Enterprise Account Manager)",
      "LG Electronics Singapore (R&D)",
      "Intel China (Business Analyst)",
      "AccelerAsia (Senior Business Consultant)",
    ],
    email: "",
    linkedin: "",
    image: "/media/team/byong-chon.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The folks at Alpha are my Insurtech people, and their services are top-notch with excellent customer services that always manage to keep their cool no matter the situation. I specifically admired their culture and their ability to see through the noise, isolate issues, and develop solutions.",
    author: "Dr. Winston Go, FLMI",
    company: "AXA Global Healthcare",
    role: "Head of New Business, Underwriting and Product Development",
    service: "insurtech-digital",
  },
  {
    quote:
      "The team leads at Alpha Consult, led by Raymond, a man with the broadest risk management experience and expertise of anyone I've met. While most actuaries focus on narrow insurance underwriting or investment risks, the team lead has delivered value across the entire value chain of organizations from various industries.",
    author: "Colin Priest",
    company: "DataRobot",
    role: "VP AI Strategy",
    service: "enterprise-risk-management",
  },
  {
    quote:
      "We cannot talk of Alpha consultancy without the CEO, who is a seasoned actuarial and risk professional, well versed in his areas of work. I have always enjoyed his thought-provoking discussions and expert presentations.",
    author: "Mei Eng Chan",
    company: "Etiqa Insurance Singapore",
    role: "Chief Financial Officer",
    service: "actuarial-consulting",
  },
  {
    quote:
      "Given their tremendous experience in both insurance, reinsurance, and insurtech, they bring a unique combination of experiences, and I look forward to following their thought leadership in the topic of Enterprise Risk Management.",
    author: "Veng Hoong Loh",
    company: "Swiss Re",
    role: "Digital Proposition Lead",
    service: "enterprise-risk-management",
  },
  {
    quote:
      "Alpha Consultancy is a reliable Insurtech consultant partner for everything, from every step of our company life cycle, and they perfectly understand what we really need.",
    author: "Samuel Setiawan",
    company: "PT Equity Life Indonesia",
    role: "Chief Executive Officer",
    service: "insurtech-digital",
  },
  {
    quote:
      "The team at Alphacoasia has always been very patient and nurturing in sharing knowledge. They are very good at explaining complicated concepts in laymen's terms.",
    author: "Ashlea Lam",
    company: "Prudential Assurance Company Singapore",
    role: "Operational Risk Manager",
    service: "enterprise-risk-management",
  },
  {
    quote:
      "Alpha consultancy is a truly dedicated, innovative organization that connects businesses through expert advice and extensive business network in actuary, particularly in the field of risk management.",
    author: "Caryn Chua",
    company: "Institute & Faculty of Actuaries, UK",
    role: "South-East Asia Representative",
    service: "actuarial-consulting",
  },
  {
    quote:
      "In ORSA and its applications in the insurance context, Alpha consultancy is one of the best ERM and insurance consulting firms I know in my professional life.",
    author: "Agustinus Nicholas L Tobing",
    company: "RISE",
    role: "Security Assurance Country Lead",
    service: "orsa-advisory",
  },
];

export const CASE_STUDIES = [
  {
    slug: "erm-orsa-peer-review-digital-insurer-hong-kong",
    title: "ERM Framework and ORSA Peer Review",
    industry: "Insurance",
    market: "Hong Kong",
    service: "Enterprise Risk Management",
    challenge:
      "A licensed digital insurer required an independent peer review of its Group ERM framework and ORSA process.",
    alphaRole:
      "Conducted an independent peer review of the ERM framework and ORSA documentation, covering governance structures, risk appetite and framework design. Provided recommendations for strengthening alignment with regulatory expectations.",
    tags: ["ERM", "ORSA", "Digital Insurance", "Peer Review"],
  },
  {
    slug: "insurance-broker-licensing-singapore",
    title: "Insurance Broker Licence Applications",
    industry: "Insurance",
    market: "Singapore",
    service: "Regulatory & Licensing",
    challenge:
      "Three insurance brokers sought to obtain MAS licences for their Singapore operations.",
    alphaRole:
      "Provided end-to-end advisory on the MAS insurance broker licence application process. All three brokers received in-principle approval from MAS.",
    tags: ["Licensing", "MAS", "Insurance Broker", "Regulatory"],
  },
  {
    slug: "erm-training-takaful-brunei",
    title: "ERM Consultancy and Senior Management Training",
    industry: "Takaful",
    market: "Brunei",
    service: "Enterprise Risk Management",
    challenge:
      "The largest takaful group in Brunei required ERM consultancy and senior management training to strengthen its enterprise risk capabilities.",
    alphaRole:
      "Delivered ERM consultancy and conducted senior management training covering enterprise risk management frameworks, governance and practical implementation.",
    tags: ["ERM", "Training", "Takaful", "Brunei"],
  },
  {
    slug: "rbc-training-insurance-professionals",
    title: "RBC Training for Insurance Professionals",
    industry: "Insurance",
    market: "Singapore",
    service: "Risk-Based Capital",
    challenge:
      "An insurance company required professional training in the Risk-Based Capital (RBC2) framework for its actuarial and finance team.",
    alphaRole:
      "Designed and delivered a structured training programme covering RBC2 methodology, capital requirements and reporting obligations.",
    tags: ["RBC2", "Training", "Actuarial", "Singapore"],
  },
  {
    slug: "aml-cft-framework-development",
    title: "AML/CFT Framework Development",
    industry: "Financial Services",
    market: "Singapore",
    service: "AML/CFT Compliance",
    challenge:
      "A financial institution required development of an AML/CFT framework to meet MAS regulatory requirements and internal governance needs.",
    alphaRole:
      "Developed an AML/CFT governance framework including policies, procedures, risk assessment methodology and training materials aligned with MAS Notice requirements.",
    tags: ["AML/CFT", "Compliance", "Regulatory", "MAS"],
  },
  {
    slug: "medical-group-acquisition-singapore",
    title: "Medical Group Acquisition and Integration",
    industry: "Healthcare",
    market: "Singapore",
    service: "Due Diligence & Corporate Deals",
    challenge:
      "A corporate client sought to complete the acquisition of a medical group and required deal advisory and post-acquisition support.",
    alphaRole:
      "Advised on the transaction and managed the post-acquisition integration process.",
    tags: ["M&A", "Healthcare", "Integration", "Singapore"],
  },
  {
    slug: "insurance-due-diligence-indonesia",
    title: "Financial Due Diligence on Indonesian General Insurer",
    industry: "Insurance",
    market: "Indonesia",
    service: "Due Diligence & Corporate Deals",
    challenge:
      "An M&A client required financial due diligence on a licensed local general insurer in Indonesia.",
    alphaRole:
      "Conducted financial due diligence covering the insurer's balance sheet, technical reserves, underwriting performance and regulatory standing.",
    tags: ["Due Diligence", "Insurance", "Indonesia", "M&A"],
  },
  {
    slug: "insurance-due-diligence-malaysia",
    title: "M&A Due Diligence on Three Malaysian Insurers",
    industry: "Insurance",
    market: "Malaysia",
    service: "Due Diligence & Corporate Deals",
    challenge:
      "A client required M&A due diligence across three insurers in Malaysia. Separately, the regulator sought actuarial advice on an RM15m insurer acquisition.",
    alphaRole:
      "Conducted M&A due diligence across three insurers and provided actuarial advice to the regulator in connection with the RM15m acquisition.",
    tags: ["Due Diligence", "Insurance", "Malaysia", "Actuarial", "Regulatory"],
  },
  {
    slug: "multi-sector-acquisition-advisory",
    title: "Strategic Acquisition Advisory",
    industry: "Multi-Sector",
    market: "Asia Pacific",
    service: "Due Diligence & Corporate Deals",
    challenge:
      "A client sought strategic advice on acquisition opportunities across insurance, consumer retail and fund management.",
    alphaRole:
      "Provided strategic acquisition advisory covering target assessment, deal structuring and negotiation support.",
    tags: ["M&A", "Strategy", "Insurance", "Fund Management"],
  },
  {
    slug: "digital-asset-exchange-rmo-licence",
    title: "Digital Asset Exchange Regulatory Licence",
    industry: "Fintech",
    market: "Singapore",
    service: "Regulatory & Licensing",
    challenge:
      "A digital asset exchange sought to obtain an MAS Recognised Market Operator licence.",
    alphaRole:
      "Oversaw the MAS Recognised Market Operator licence application, which MAS granted.",
    tags: ["Licensing", "MAS", "Digital Asset", "Regulatory"],
  },
  {
    slug: "financial-adviser-ifa-licence-compliance",
    title: "Financial Adviser and IFA Licensing",
    industry: "Financial Services",
    market: "Singapore",
    service: "Regulatory & Licensing",
    challenge:
      "A financial services group required MAS licences for its financial adviser and independent financial adviser businesses, followed by ongoing compliance support.",
    alphaRole:
      "Managed the licence applications through to approval and provided outsourced compliance services after licensing.",
    tags: ["Licensing", "MAS", "Financial Adviser", "Compliance"],
  },
  {
    slug: "risk-management-review-cambodia",
    title: "Risk Management Review — Microfinance and Banking",
    industry: "Financial Services",
    market: "Cambodia",
    service: "Enterprise Risk Management",
    challenge:
      "A microfinance institution and local bank in Cambodia required an independent risk management review.",
    alphaRole:
      "Conducted a risk management review covering governance, risk identification, controls and reporting for both institutions.",
    tags: ["ERM", "Microfinance", "Banking", "Cambodia"],
  },
  {
    slug: "internal-audit-fund-management-singapore",
    title: "Internal Audit for Fund Management Company",
    industry: "Asset Management",
    market: "Singapore",
    service: "Enterprise Risk Management",
    challenge:
      "A fund management company required an internal audit, control and assurance review.",
    alphaRole:
      "Conducted the internal audit and control review, covering governance arrangements, operational controls and assurance processes.",
    tags: ["Internal Audit", "Fund Management", "Controls", "Singapore"],
  },
  {
    slug: "erm-charitable-organisation-singapore",
    title: "ERM and Risk Control Review — Charitable Organisation",
    industry: "Non-Profit",
    market: "Singapore",
    service: "Enterprise Risk Management",
    challenge:
      "A large charitable organisation required ERM consultancy and a risk and control review.",
    alphaRole:
      "Delivered ERM consultancy and conducted a risk and control review covering governance, risk appetite and the internal control environment.",
    tags: ["ERM", "Governance", "Risk Controls", "Singapore"],
  },
  {
    slug: "actuarial-motor-warranty-singapore",
    title: "Actuarial Review of Motor Warranty Portfolio",
    industry: "Insurance",
    market: "Singapore",
    service: "Actuarial Consulting",
    challenge:
      "An insurer required an actuarial pricing review of its motor warranty portfolio, alongside motor insurance strategy for a broker.",
    alphaRole:
      "Conducted the actuarial pricing review of the motor warranty portfolio and provided motor insurance strategy advice to the broker.",
    tags: ["Actuarial", "Motor Insurance", "Pricing", "Singapore"],
  },
  {
    slug: "cyber-insurance-market-research-indonesia",
    title: "Cyber Insurance Market Research — Indonesia",
    industry: "Insurance",
    market: "Indonesia",
    service: "Insurtech & Digital Insurance",
    challenge:
      "A Lloyd's coverholder required market research on personal and SME cyber insurance demand in Indonesia.",
    alphaRole:
      "Conducted market research covering personal and SME cyber insurance demand, distribution and regulatory landscape in Indonesia.",
    tags: ["Cyber Insurance", "Market Research", "Indonesia", "Insurtech"],
  },
  {
    slug: "balanced-scorecard-healthcare-malaysia",
    title: "Balanced Scorecard Advisory — Healthcare Software",
    industry: "Healthcare",
    market: "Malaysia",
    service: "Enterprise Risk Management",
    challenge:
      "A Bursa-listed healthcare software provider required balanced scorecard advisory to strengthen strategic performance management.",
    alphaRole:
      "Provided balanced scorecard advisory covering strategic objective-setting, KPI design and implementation.",
    tags: ["Strategy", "Balanced Scorecard", "Healthcare", "Malaysia"],
  },
  {
    slug: "fintech-micro-lending-indonesia",
    title: "Technical Adviser to Digital Micro-Lending Platform",
    industry: "Fintech",
    market: "Indonesia",
    service: "Insurtech & Digital Insurance",
    challenge:
      "A digital micro-lending platform in Indonesia required a technical adviser to support its development.",
    alphaRole:
      "Served as technical adviser, providing guidance on platform design, risk controls and regulatory considerations.",
    tags: ["Fintech", "Micro-Lending", "Indonesia", "Digital"],
  },
];

/* Coordinates are the real financial centre of each market, used to place
   nodes on the globe and the APAC network plane. Node presence reflects
   advisory experience only — Alpha's single office is Singapore. */
export const APAC_MARKETS = [
  {
    country: "Singapore",
    code: "SG",
    city: "Singapore",
    lat: 1.35,
    lng: 103.82,
    hub: true,
    engagements: ["Insurance Licensing", "Regulatory Compliance", "ERM/ORSA", "AML/CFT", "RBC2", "Actuarial", "Insurtech"],
  },
  {
    country: "Hong Kong",
    code: "HK",
    city: "Hong Kong",
    lat: 22.32,
    lng: 114.17,
    hub: false,
    engagements: ["ERM/ORSA Peer Review", "Digital Insurance", "Insurance Advisory"],
  },
  {
    country: "Malaysia",
    code: "MY",
    city: "Kuala Lumpur",
    lat: 3.14,
    lng: 101.69,
    hub: false,
    engagements: ["Insurance Advisory", "Risk Management", "Regulatory Compliance"],
  },
  {
    country: "Indonesia",
    code: "ID",
    city: "Jakarta",
    lat: -6.21,
    lng: 106.85,
    hub: false,
    engagements: ["Market Entry", "Insurance Advisory", "Regulatory"],
  },
  {
    country: "Vietnam",
    code: "VN",
    city: "Ho Chi Minh City",
    lat: 10.82,
    lng: 106.63,
    hub: false,
    engagements: ["Market Entry", "Insurance Advisory"],
  },
  {
    country: "Myanmar",
    code: "MM",
    city: "Yangon",
    lat: 16.87,
    lng: 96.2,
    hub: false,
    engagements: ["Market Entry", "Insurance Advisory"],
  },
  {
    country: "Cambodia",
    code: "KH",
    city: "Phnom Penh",
    lat: 11.56,
    lng: 104.92,
    hub: false,
    engagements: ["Risk Management Review"],
  },
  {
    country: "Taiwan",
    code: "TW",
    city: "Taipei",
    lat: 25.03,
    lng: 121.57,
    hub: false,
    engagements: ["Insurance Advisory", "Training"],
  },
  {
    country: "Brunei",
    code: "BN",
    city: "Bandar Seri Begawan",
    lat: 4.89,
    lng: 114.94,
    hub: false,
    engagements: ["ERM Consultancy", "Senior Management Training"],
  },
];

export const INSIGHTS_PLACEHOLDER = [
  {
    slug: "mas-fit-and-proper-assessment-insurers",
    title: "MAS Fit and Proper Assessment for Insurance Key Appointments",
    category: "Regulatory",
    excerpt: "How the MAS fit and proper assessment applies to directors, key appointment holders and controllers of Singapore insurers, the four criteria under FSG-G01, and how to prepare a submission that avoids delay.",
    date: "2026-10-26",
    readTime: "7 min read",
    author: "Alpha Consultant",
    covers: [
      "MAS fit and proper assessment for insurers",
      "Fit and proper criteria Singapore FSG-G01",
      "Insurer director and key appointment holder approval",
      "Insurance corporate governance regulations Singapore",
      "Handling adverse disclosures in MAS submissions",
    ],
  },
  {
    slug: "internal-audit-requirements-singapore-insurers",
    title: "Internal Audit Requirements for Singapore Insurers: What MAS Expects",
    category: "Regulatory",
    excerpt: "What MAS requires of the internal audit function for licensed insurers, how to structure an effective audit programme, and what boards need to understand about their oversight responsibilities.",
    date: "2026-10-25",
    readTime: "7 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "mas-market-conduct-framework-insurers",
    title: "MAS Market Conduct Framework: What Singapore Insurers Need to Know",
    category: "Regulatory",
    excerpt: "How MAS approaches market conduct supervision for Singapore insurers, the key requirements for sales, disclosure and customer outcomes, and what boards need to demonstrate.",
    date: "2026-10-24",
    readTime: "8 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "appointed-actuary-requirements-singapore",
    title: "Appointed Actuary Requirements for Singapore Insurers",
    category: "Actuarial",
    excerpt: "What MAS requires of the Appointed Actuary role, who must appoint one, what the actuary is responsible for, and what insurers need to understand about this key regulatory obligation.",
    date: "2026-10-23",
    readTime: "7 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "technology-risk-management-insurers-singapore",
    title: "Technology Risk Management for Singapore Insurers: MAS TRM Guidelines",
    category: "Regulatory",
    excerpt: "How Singapore-licensed insurers must manage technology risk under MAS Notice 655 and the Technology Risk Management Guidelines, and what regulators expect in practice.",
    date: "2026-10-22",
    readTime: "7 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "preparing-mas-insurance-licence-application",
    title: "Preparing a MAS Insurance Licence Application: A Practical Guide",
    category: "Regulatory",
    excerpt: "What a MAS insurance licence application involves, what MAS scrutinises closely, and how to prepare a submission that gives your application the best chance of a smooth, efficient process.",
    date: "2026-10-21",
    readTime: "8 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "what-to-expect-orsa-advisory-engagement",
    title: "What to Expect from an ORSA Advisory Engagement",
    category: "Risk",
    excerpt: "A practical guide to what an ORSA advisory engagement involves, what a quality ORSA review covers, the most common gaps external reviews find, and how to get the most from working with an external adviser.",
    date: "2026-10-20",
    readTime: "7 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "choosing-insurance-regulatory-consultant-singapore",
    title: "Choosing an Insurance Regulatory Consultant in Singapore: What to Look For",
    category: "Regulatory",
    excerpt: "A practical guide to selecting the right insurance regulatory consultant for MAS licensing, compliance and risk advisory work -- what to ask, what to look for, and what to avoid.",
    date: "2026-10-19",
    readTime: "7 min read",
    author: "Alpha Consultant",
  },
  {
    slug: "financial-modelling-insurance-capital-planning",
    title: "Financial Modelling for Insurance Business Planning and Capital Decisions",
    category: "Actuarial",
    excerpt: "Robust financial modelling is central to how insurance boards and management teams make capital allocation, product strategy and M&A decisions. A model is only as good as the assumptions behind it and the governance around it. This briefing examines what good insurance financial modelling looks like across business planning, capital allocation, product development and M&A due diligence.",
    covers: [
      "Business planning models: solvency projection, scenario analysis and cash flow",
      "Capital modelling, economic capital and return-on-capital by business line",
      "Actuarial modelling for product pricing and profitability testing",
      "M&A and acquisition modelling: embedded value, reserve adequacy and synergies",
      "Model governance: validation, assumption setting and documentation standards",
    ],
    readTime: "8 min read",
    date: "2026-10-14",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "bancassurance-conduct-risk-apac",
    title: "Bancassurance Conduct Risk and Regulatory Reform Across Asia Pacific",
    category: "Regulatory",
    excerpt: "Bancassurance is one of the most significant insurance distribution channels in Asia Pacific and one of the most persistently problematic from a conduct perspective. Mis-selling through bank channels has generated regulatory action across Singapore, Hong Kong, Vietnam and other markets. This briefing examines the structural causes of conduct risk in bancassurance and how regulation is responding.",
    covers: [
      "Why bancassurance generates conduct risk: incentives, complexity and sales pressure",
      "MAS conduct framework: balanced scorecard, suitability and product due diligence",
      "Regional regulatory developments: Hong Kong, Vietnam, South Korea and Indonesia",
      "What good bancassurance governance looks like in practice",
      "Representative training, remuneration structures and customer outcome monitoring",
    ],
    readTime: "8 min read",
    date: "2026-10-13",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "ma-due-diligence-asian-insurance-markets",
    title: "M&A Due Diligence in Asian Insurance Markets: What Buyers Need to Know",
    category: "Corporate Deals",
    excerpt: "Acquiring an insurer or insurance intermediary in Asia Pacific involves financial, actuarial, regulatory and operational due diligence that differs materially from a non-financial transaction. Discovering post-closing that reserves were inadequate or that the regulator had concerns can result in losses that dwarf the cost of proper pre-closing work. This briefing covers the key dimensions that acquirers need to assess.",
    covers: [
      "Regulatory due diligence: licence scope, MAS history and change-of-control approvals",
      "Actuarial due diligence: reserve adequacy, pricing profitability and embedded value",
      "Reinsurance programme assessment: structure, counterparty credit and run-off recoverables",
      "Operational due diligence: distribution, technology, talent and financial statements",
      "Valuation considerations: embedded value, comparables and integration of due diligence findings",
    ],
    readTime: "9 min read",
    date: "2026-10-12",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "cyber-insurance-regulatory-underwriting-apac",
    title: "Cyber Insurance: Regulatory Expectations and Underwriting Challenges in Asia Pacific",
    category: "Insurtech & Digital",
    excerpt: "Cyber insurance is one of the fastest-growing and most technically demanding lines in the region. Regulatory expectations are developing alongside the product, and underwriters face genuine challenges in modelling a risk that is constantly evolving. This briefing examines MAS technology risk expectations, the conduct risk dimension of cyber product governance, and the underwriting challenges of accumulation, moral hazard and silent cyber.",
    covers: [
      "What cyber insurance covers and where common exclusions create coverage gaps",
      "MAS Technology Risk Management Guidelines and cyber risk in the ORSA",
      "Accumulation, correlation and silent cyber: the underwriting challenges",
      "Pricing variables in a developing market: security controls, sector and revenue",
      "State-sponsored attack exclusions and the evolving war exclusion debate",
    ],
    readTime: "8 min read",
    date: "2026-10-11",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "ipo-readiness-insurance-financial-services-asia",
    title: "IPO Readiness for Insurance and Financial Services Companies in Asia",
    category: "Capital Markets",
    excerpt: "Preparing a regulated financial services business for a public listing in Asia requires governance, regulatory, actuarial and financial work that goes well beyond standard IPO preparation. MAS change-of-control approvals, IFRS 17 prospectus financials, embedded value disclosure and the investor education challenge all need to be addressed earlier than most issuers expect. This briefing sets out the key readiness dimensions.",
    covers: [
      "MAS regulatory pre-clearance and change-of-control notification requirements",
      "Governance transformation: board composition, committees and internal controls",
      "Financial reporting: IFRS 17 prospectus financials and embedded value disclosure",
      "Investor positioning and analyst community education for insurance IPOs",
      "Choosing between SGX and HKEX: investor base, peer group and compliance burden",
    ],
    readTime: "9 min read",
    date: "2026-10-10",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "reinsurance-regulatory-requirements-apac",
    title: "Reinsurance Arrangements and Regulatory Requirements Across Asia Pacific",
    category: "Risk & Governance",
    excerpt: "Reinsurance is central to how insurers manage capital and risk, but regulatory requirements governing reinsurance arrangements vary significantly across Asia Pacific markets. The credit an insurer can take for ceded risk, local retention requirements, counterparty approval frameworks and the treatment of reinsurance in the ORSA all differ by jurisdiction. This briefing covers the key regulatory dimensions insurers and reinsurers need to understand.",
    covers: [
      "Singapore RBC2 framework: counterparty credit, local retention and collateral requirements",
      "Regional requirements: Malaysia BNM, Indonesia OJK, Thailand, Vietnam and the Philippines",
      "Counterparty credit risk management: panel governance, concentration and aged recoverables",
      "Catastrophe reinsurance design for Asia Pacific perils and climate-adjusted modelling",
      "Reinsurance disputes: contract certainty, follow-the-fortunes and claims management",
    ],
    readTime: "8 min read",
    date: "2026-10-09",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "ifrs17-implementation-asian-insurers",
    title: "IFRS 17 in Practice: Implementation Challenges for Asian Insurers",
    category: "Actuarial",
    excerpt: "IFRS 17 has reshaped how insurance contracts are measured and reported. For Asian insurers, the practical challenges of data, modelling, disclosure and governance are proving more demanding than the initial accounting analysis suggested. First reporting periods have exposed gaps that were not visible in parallel runs. This briefing addresses where implementation challenges have been most persistent and what a sustainable operating model looks like.",
    covers: [
      "Data infrastructure: contract grouping, historical data and ongoing data governance",
      "Actuarial model complexity, run time constraints and model change governance",
      "Discount rate methodology and the currency challenge for regional insurers",
      "Disclosure requirements: CSM reconciliations, risk adjustment and investor communication",
      "What a sustainable IFRS 17 operating model looks like beyond the first reporting period",
    ],
    readTime: "9 min read",
    date: "2026-10-08",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "digital-distribution-conduct-regulation",
    title: "Digital Distribution and Conduct Risk: What Insurers and Intermediaries Need to Know",
    category: "Fintech & Insurtech",
    excerpt: "The growth of digital insurance distribution has moved faster than regulatory frameworks across most Asia Pacific markets. Regulators are catching up, with conduct risk, suitability assessment and product governance all under increased scrutiny. The scale of digital distribution amplifies conduct exposure rather than reducing the standard of care expected. We examine the key obligations and practical controls insurers and digital platforms should have in place.",
    covers: [
      "Direct-to-consumer, embedded insurance and aggregator models under scrutiny",
      "Suitability assessment obligations in a digital journey",
      "Product governance and target market determination",
      "Claims handling transparency and complaints data",
      "Practical controls for insurers and platform operators",
    ],
    readTime: "7 min read",
    date: "2026-10-07",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "esg-risk-insurance-apac",
    title: "ESG Risk Management for Asia Pacific Insurers: From Reporting to Integration",
    category: "Risk & Governance",
    excerpt: "Regional regulators have made clear that climate and broader ESG risks should be integrated into insurers governance and risk frameworks, not treated as a sustainability reporting exercise. For most insurers in the region, the gap between regulatory expectation and current practice remains wide. This piece covers the key dimensions of ESG risk integration, from scenario analysis and transition risk assessment through to board-level governance and disclosure requirements.",
    covers: [
      "Regulatory expectations on environmental risk management in the region",
      "Integrating climate risk into governance rather than sustainability reporting",
      "Scenario analysis and transition risk assessment for insurers",
      "Investment decision-making and underwriting implications",
      "Board-level governance and disclosure",
    ],
    readTime: "9 min read",
    date: "2026-10-06",
    author: "Alpha Consultant",
    draft: false,
    featured: true,
  },
  {
    slug: "market-entry-asia-pacific-insurance",
    title: "Entering Asia Pacific Insurance Markets: A Regulatory and Commercial Roadmap",
    category: "APAC Markets",
    excerpt: "Expanding into Asia Pacific requires navigating nine distinct regulatory systems, each with its own foreign ownership rules, capital requirements, product approval timelines and distribution restrictions. Strategic decisions made at the design stage have long-term cost and operational consequences that are difficult to unwind. We set out the framework considerations for insurers and intermediaries assessing entry into Singapore, Malaysia, Indonesia, the Philippines, Thailand or Vietnam.",
    covers: [
      "Foreign ownership rules and permitted structures by market",
      "Capital requirements and product approval timelines",
      "Distribution restrictions and local partnership models",
      "Legal entity structure and reinsurance arrangements at the design stage",
      "Sequencing entry across Singapore, Malaysia, Indonesia, the Philippines, Thailand and Vietnam",
    ],
    readTime: "10 min read",
    date: "2026-10-05",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "insurtech-regulatory-strategy-singapore",
    title: "Licensing Strategy for Insurtech and Digital Insurance Platforms in Asia Pacific",
    category: "Fintech & Insurtech",
    excerpt: "Asia Pacific has no single regulatory template for digital insurance. Singapore, Hong Kong, Malaysia and Indonesia each provide different licensing pathways, capital thresholds and conduct requirements. The right choice of initial market depends on product design, target customer base and expansion roadmap. Sandbox regimes offer early-stage optionality but carry their own constraints. This guide sets out the structural decisions digital insurance founders need to make, and the questions regulators will ask.",
    covers: [
      "Comparing licensing pathways across Singapore, Hong Kong, Malaysia and Indonesia",
      "Capital thresholds and conduct requirements by market",
      "When a sandbox helps and when it constrains",
      "Choosing an initial market against your product and expansion roadmap",
      "The questions regulators ask digital insurance applicants",
    ],
    readTime: "7 min read",
    date: "2026-10-04",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "aml-cft-insurance-sector-apac",
    title: "AML/CFT in Asia Pacific Insurance: Where Regulators Are Focusing",
    category: "Regulatory Compliance",
    excerpt: "FATF Mutual Evaluation reports across Southeast and Northeast Asia have repeatedly identified the insurance sector as carrying under-appreciated money laundering exposure, particularly in high-value single-premium life and cross-border distribution. Regional regulators have responded with enhanced customer due diligence requirements, transaction monitoring obligations and, in several markets, mandatory AML culture reviews. We examine current supervisory priorities and what insurers and brokers need to have in place.",
    covers: [
      "Why FATF evaluations flag insurance as an under-appreciated ML/TF channel",
      "Higher-risk products: single-premium life, credit insurance, cross-border distribution",
      "Enhanced customer due diligence and beneficial ownership expectations",
      "Transaction monitoring and alert handling for insurers and brokers",
      "AML culture reviews and what supervisors look for",
    ],
    readTime: "7 min read",
    date: "2026-10-03",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "rbc2-capital-framework-singapore",
    title: "RBC2: Capital Framework Implications for Singapore Insurers",
    category: "Risk & Governance",
    excerpt: "The revised Risk-Based Capital framework introduces more granular treatment of insurance risk, market risk and credit risk, and tighter rules on admissible capital quality. General and life insurers face materially different impacts depending on their asset mix, product profile and reinsurance arrangements. We outline the key technical changes, where the final framework diverged from earlier consultation papers, and the practical steps insurers should take to assess their position and engage with their boards.",
    covers: [
      "Technical changes to insurance, market and credit risk treatment",
      "Tighter rules on the quality and tiering of admissible capital",
      "Differing impacts on life versus general insurers by asset and product mix",
      "Where the final framework diverged from earlier consultation papers",
      "Assessing your position and briefing the board",
    ],
    readTime: "9 min read",
    date: "2026-10-02",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "orsa-best-practice-apac",
    title: "ORSA in Practice: Moving Beyond Compliance to Strategic Value",
    category: "Risk & Governance",
    excerpt: "The Own Risk and Solvency Assessment has become a regulatory fixture across Asia Pacific, yet many insurers still treat it as an annual compliance exercise. A well-executed ORSA should influence business planning, capital allocation and stress testing. This piece sets out what a high-quality ORSA looks like in practice, covering risk appetite integration, forward-looking capital projections and how regulators across Singapore, Malaysia and Hong Kong are evaluating submissions.",
    covers: [
      "What separates a strategic ORSA from an annual compliance exercise",
      "Integrating risk appetite into business planning and capital allocation",
      "Building credible forward-looking capital projections and stress scenarios",
      "How regulators in Singapore, Malaysia and Hong Kong evaluate submissions",
      "Board engagement and the ORSA governance trail",
    ],
    readTime: "8 min read",
    date: "2026-10-01",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "mas-insurance-regulatory-update",
    title: "MAS Insurance Regulatory Developments: What Singapore Insurers Need to Act On",
    category: "Regulatory Compliance",
    excerpt: "The Monetary Authority of Singapore has intensified its supervisory focus on insurance company governance, risk culture and senior management accountability. Recent thematic reviews have highlighted gaps in board oversight of risk appetite, weaknesses in outsourcing due diligence and inconsistencies in policyholder disclosure. We examine the key findings, the regulatory expectations boards are being held to, and how insurers can close the most common gaps before the next supervisory cycle.",
    covers: [
      "Recent MAS thematic review findings and what they signal about supervisory priorities",
      "Board and senior management accountability expectations under the current framework",
      "Common gaps in outsourcing due diligence and vendor risk oversight",
      "Policyholder disclosure consistency and conduct expectations",
      "Practical steps to close gaps ahead of the next supervisory cycle",
    ],
    readTime: "6 min read",
    date: "2026-09-30",
    author: "Alpha Consultant",
    draft: false,
  },
  {
    slug: "actuarial-assumptions-interest-rates-asia",
    title: "Actuarial Assumptions and the Interest Rate Environment: Implications for Asian Life Insurers",
    category: "Actuarial",
    excerpt: "The shift from the prolonged low-rate era to a higher-for-longer regime has significant implications for the reserving, pricing and investment strategies of Asian life insurers. Many policies priced during the low-rate era embedded guaranteed return assumptions that now look exposed. Simultaneously, rising discount rates have reduced the present value of long-duration liabilities. We examine how actuarial teams and boards should be revisiting assumptions, stress testing positions and communicating changes to regulators.",
    covers: [
      "How the shift to a higher-for-longer regime changes reserving and pricing",
      "Legacy guaranteed return assumptions written in the low-rate era",
      "Discount rate movements and the present value of long-duration liabilities",
      "Stress testing the position and revisiting assumption bases",
      "Communicating the change to management, boards and regulators",
    ],
    readTime: "8 min read",
    date: "2026-09-29",
    author: "Alpha Consultant",
    draft: false,
  },
];

export const ALPHA_VALUES = [
  {
    letter: "A",
    value: "Authentic",
    description: "Genuine relationships, honest assessments and advice that reflects the true position rather than what clients want to hear.",
  },
  {
    letter: "L",
    value: "Learner",
    description: "Continuously deepening expertise in an industry that never stops changing. Every engagement brings new knowledge.",
  },
  {
    letter: "P",
    value: "Passion",
    description: "Genuine enthusiasm for insurance, risk and regulatory disciplines, and for helping clients navigate complex challenges.",
  },
  {
    letter: "H",
    value: "Honest",
    description: "Transparent communication and straightforward advice, even when the message is difficult.",
  },
  {
    letter: "A",
    value: "Adventurous",
    description: "Willingness to engage with complex, unfamiliar and cross-border challenges across Asia Pacific markets.",
  },
];

export const NAV_LINKS = [
  {
    label: "Expertise",
    href: "/expertise",
    children: EXPERTISE.map((e) => ({ label: e.title, href: `/expertise/${e.slug}` })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: INDUSTRIES.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
  },
  { label: "Training", href: "/training" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];
