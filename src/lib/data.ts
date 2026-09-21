export const COMPANY = {
  name: "Alpha Consultant",
  domain: "AlphaCoAsia",
  tagline: "Insurance, Risk, Actuarial & Regulatory Advisory Across Asia Pacific",
  description:
    "Helping insurers, financial institutions, fintechs and growing businesses navigate regulation, risk, market entry and transformation across Asia Pacific.",
  address: "20 Maxwell Road, #09-17, Maxwell House, Singapore 069113",
  phone: "+65 6227 7175",
  email: "info@alphacoasia.com",
  linkedin: "https://www.linkedin.com/company/alpha-consultant-alphacoasia",
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
    slug: "mas-insurance-regulatory-update",
    title: "MAS Insurance Regulatory Developments: Key Updates for Insurers",
    category: "Regulatory Compliance",
    excerpt:
      "A review of recent Monetary Authority of Singapore regulatory developments affecting licensed insurers and the implications for risk management and compliance frameworks.",
    readTime: "6 min read",
    date: "2024-11-15",
    author: "Alpha Consultant",
    draft: true,
  },
  {
    slug: "orsa-best-practice-apac",
    title: "ORSA Best Practice: What Asia-Pacific Insurers Need to Know",
    category: "Risk & Governance",
    excerpt:
      "Key considerations for insurers preparing or refreshing their Own Risk and Solvency Assessment, with a focus on practical governance and regulatory alignment.",
    readTime: "8 min read",
    date: "2024-10-28",
    author: "Alpha Consultant",
    draft: true,
  },
  {
    slug: "insurtech-regulatory-strategy-singapore",
    title: "Navigating Regulatory Licensing: A Guide for Insurtech and Digital Insurance Companies",
    category: "Fintech & Insurtech",
    excerpt:
      "What insurtech founders and digital insurance platform operators need to understand about Asia Pacific regulatory environments and licensing pathways.",
    readTime: "7 min read",
    date: "2024-09-20",
    author: "Alpha Consultant",
    draft: true,
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
