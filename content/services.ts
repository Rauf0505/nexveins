/* Plain data only — no phosphor imports, because that package calls createContext
   at module scope and a server route file has to read this for metadata. The
   client components pick icons by slug. */

export type ServicePoint = { label: string; body: string };
export type ServiceLink = { slug: string; label: string; body: string };

export type Service = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  image: string;
  ratio: string;
  alt: string;
  lede: string;
  points: ServicePoint[];
  suits: string[];
  approach: string[];
  connects: ServiceLink[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "system-software-development",
    index: "01",
    title: "System Software Development",
    summary: "Software that runs your daily operations in one place.",
    image: "/services/system-software-development.jpg",
    ratio: "1537 / 1023",
    alt: "A developer at a desk, seen from behind, typing in front of a monitor whose screen shows a dark code editor carrying the words System Software and Smart solutions. Stronger business. beside a glowing gear.",
    lede: "POS, CRM, ERP and everything in between — one system your team logs into, instead of five spreadsheets, a notebook and three group chats.",
    points: [
      { label: "POS Systems", body: "Tills that take the sale, print or send the receipt and keep the day's totals, stock and staff shifts in one place." },
      { label: "CRM Systems", body: "Every enquiry, quote and customer conversation in one record, so nobody has to ask a colleague what happened last time." },
      { label: "ERP Solutions", body: "Orders, purchasing, stock, production and accounts reading the same data instead of re-keying it between departments." },
      { label: "Business Management Software", body: "The reporting and approvals your operation runs on, built around how your departments actually hand work over." },
      { label: "Custom SaaS Applications", body: "A product you can run internally or license to customers, built so the next branch or the next client is not a rebuild." },
    ],
    suits: [
      "Operations that outgrew spreadsheets but do not fit an off-the-shelf package.",
      "Teams paying for two tools that each do half of what they need.",
      "Businesses whose paperwork still moves by chat, email and printouts.",
    ],
    approach: [
      "We sit with the people doing the work before writing anything, and map the steps as they really happen.",
      "We agree what done looks like — the reports, the roles, the maximum number of clicks — then build backwards from it.",
      "Roles and permissions come with the build instead of bolted on afterwards, because the shop floor and the office need different screens.",
      "Whoever takes it over gets documentation and a walkthrough, not a mystery.",
    ],
    connects: [
      { slug: "ai-automation", label: "AI Automation", body: "The rules that repeat inside the system — approvals, alerts, data entry — are the first things worth automating." },
      { slug: "website-development", label: "Website Development", body: "A public site can feed the same CRM, so enquiries land in the system instead of an inbox nobody checks." },
    ],
    metaTitle: "System Software Development | NexVeins",
    metaDescription: "POS, CRM, ERP and custom business software built around how your operation actually runs — one system your team logs into instead of five spreadsheets.",
  },
  {
    slug: "website-development",
    index: "02",
    title: "Website Development",
    summary: "Fast websites that turn visitors into enquiries.",
    image: "/services/website-development.jpg",
    ratio: "3 / 2",
    alt: "A hand pointing at a WEB DESIGN label on a blue board, ringed by handwritten boxes reading Layout, Content, Homepage, Publish, Media, Hosting, Design, CSS, CMS, Internet and Usability.",
    lede: "Business sites, stores, portfolios and landing pages built to load quickly, say something clear and give the visitor an obvious next step.",
    points: [
      { label: "Business Websites", body: "A site that explains what you do, who it is for and how to reach you, with pages your team can update without a developer." },
      { label: "E-commerce Websites", body: "Catalogue, cart, checkout and payment set up for the way your customers actually buy, with orders that reach the right inbox." },
      { label: "Portfolio Websites", body: "Work first: case studies, images and credentials arranged so a stranger understands your capability in a minute." },
      { label: "Landing Pages", body: "One page, one offer, one action — for a campaign, a launch, or a product you want to test before committing to a full site." },
      { label: "Custom Web Applications", body: "When the website has to do something — bookings, dashboards, client portals — it is built as software, not as a page." },
    ],
    suits: [
      "Businesses whose current site does not match the quality of the work they deliver.",
      "Owners who still have to phone someone to change a price or a photo.",
      "Teams running ads into a page that gives people nowhere to go.",
    ],
    approach: [
      "Content and structure come before visuals: what the page has to say decides how it looks, not the other way round.",
      "Speed, mobile layout and clear labels are treated as requirements in the first draft, not a clean-up at the end.",
      "Every screen is checked as it will really be seen — on a phone, in bad light, with one thumb.",
      "Analytics and the search basics ship with the site, so you can see what is working once it is live.",
    ],
    connects: [
      { slug: "seo-optimization", label: "SEO Optimization", body: "Search work needs something fast and well-structured to work on — the two are built together, not handed between vendors." },
      { slug: "social-media-marketing", label: "Social Media Marketing", body: "Campaigns need somewhere to send people, and the page they arrive at decides whether the spend returns anything." },
    ],
    metaTitle: "Website Development | NexVeins",
    metaDescription: "Business websites, online stores, portfolios, landing pages and custom web applications — fast, easy to update and built to turn visitors into enquiries.",
  },
  {
    slug: "social-media-marketing",
    index: "03",
    title: "Social Media Marketing",
    summary: "A recognisable brand, in front of the right people.",
    image: "/services/social-media-marketing.jpg",
    ratio: "1537 / 1023",
    alt: "A bright blue illustration headed Social Media Marketing — Build your brand. Engage your audience. Grow your business. — with three icon rows reading increase brand awareness, engage your audience and drive traffic & boost sales, beside a phone and a megaphone ringed by the Facebook, Instagram, Twitter, YouTube and LinkedIn logos.",
    lede: "Management, content and campaigns on the platforms your customers actually use — one consistent look, and a reason to stop scrolling.",
    points: [
      { label: "Social Media Management", body: "Scheduled posting, replies and a calendar you can see in advance, so the account stays active without living on someone's phone." },
      { label: "Content Strategy", body: "Themes, formats and hooks planned around what your audience responds to, instead of whatever the team thought of that week." },
      { label: "Social Media Campaigns", body: "Launches, offers and seasonal pushes built with one objective, one audience and an end date, then measured against it." },
      { label: "Brand Awareness", body: "The same visual language across profile, posts and ads, so the business looks like one business everywhere." },
      { label: "Digital Advertising", body: "Paid work on the platforms that reach your market, with budget tied to a specific result rather than spread to keep everyone happy." },
    ],
    suits: [
      "Businesses that post when someone remembers, then go quiet for a month.",
      "Brands that look different on every platform because nobody owns the visuals.",
      "Owners paying for boosts with no idea what the money produced.",
    ],
    approach: [
      "We start from the outcome — enquiries, store visits, recognition — and choose the platforms that can deliver it.",
      "Creative is made for the feed rather than resized from print; the first few words do most of the work.",
      "Reporting says what happened and what changes next, in plain language.",
      "Nothing runs on a boost alone: every campaign has a place for the interested person to go.",
    ],
    connects: [
      { slug: "website-development", label: "Website Development", body: "Attention needs a destination — the post brings them, the page decides whether anything comes of it." },
      { slug: "ai-automation", label: "AI Automation", body: "Replies, scheduling and comment triage are exactly the repetitive work automation can take off the team." },
    ],
    metaTitle: "Social Media Marketing | NexVeins",
    metaDescription: "Social media management, content strategy, campaigns, brand awareness and digital advertising — a recognisable brand in front of the right people.",
  },
  {
    slug: "seo-optimization",
    index: "04",
    title: "SEO Optimization",
    summary: "Be found in search before they ever contact you.",
    image: "/services/seo-optimization.jpg",
    ratio: "3 / 2",
    alt: "A pale blue illustration headed Boost Your Website SEO — Rank Higher. Get Found. Grow More. — with four icon rows reading keyword research, on-page optimization, quality backlinks and fast & mobile friendly, beside a monitor showing SEO above a rising green arrow, with a search bar, two charts and a target.",
    lede: "On-page, technical and content work so the searches that matter lead to your business rather than to a competitor.",
    points: [
      { label: "On-Page SEO", body: "Titles, headings, internal links and copy aligned to what people actually type when they need what you sell." },
      { label: "Technical SEO", body: "Crawlability, speed, structured data, sitemaps and the mobile basics — what search engines check before they read a word." },
      { label: "Keyword Research", body: "The terms worth chasing separated from the traffic that never buys, matched to pages that exist or need building." },
      { label: "Website Optimization", body: "Fixing what the audit finds on the live site: thin pages, duplicates, broken links, heavy images, unclear calls to action." },
      { label: "Content Optimization", body: "Improving the pages that already rank a little, and planning new ones around real demand instead of a posting schedule." },
    ],
    suits: [
      "Businesses invisible for the phrases their customers actually search.",
      "Sites with traffic that never turns into calls, forms or visits.",
      "Owners who rank for their own name and for nothing else.",
    ],
    approach: [
      "We audit before promising positions: what is broken, what is missing, and what is realistically winnable.",
      "Technical fixes and content move together — a well-written page on a slow, badly crawled site still does not shift.",
      "Reporting is about the queries, pages and enquiries that changed, not a generic score.",
      "Search compounds slowly, so we say which wins are quick and which need patience.",
    ],
    connects: [
      { slug: "website-development", label: "Website Development", body: "The cheapest time to get structure, speed and markup right is while the site is still being built." },
      { slug: "social-media-marketing", label: "Social Media Marketing", body: "Search catches the people looking for you now; social creates the people who search for you later." },
    ],
    metaTitle: "SEO Optimization | NexVeins",
    metaDescription: "On-page and technical SEO, keyword research, website and content optimization — so the searches that matter lead to your business.",
  },
  {
    slug: "ai-automation",
    index: "05",
    title: "AI Automation",
    summary: "Repetitive work moved off your team, done the same way every time.",
    image: "/services/ai-automation.jpg",
    ratio: "3 / 2",
    alt: "A pale violet illustration headed AI Automation, Smarter workflows, Better Results: a robot on a monitor linked to a document, a database and an envelope, above four feature plates reading AI-Powered, Streamline, Boost Productivity and Reliable & Secure, with an Automate. Optimize. Grow. button.",
    lede: "Chatbots, workflow automation and AI tools wired into the systems you already use — applied where they genuinely save time, not as a feature to advertise.",
    points: [
      { label: "AI Chatbots", body: "Answering the questions your team repeats all day on the site or on WhatsApp, and passing the rest to a human with the context already captured." },
      { label: "Business Workflow Automation", body: "Moving data between the tools you already pay for — form to CRM, order to invoice, message to task — so nobody re-keys it." },
      { label: "AI-Powered Tools", body: "Narrow internal tools for one job each: summarising, extracting, checking, drafting — built for the person who does it daily." },
      { label: "Automated Customer Support", body: "Routing, templates and follow-ups so the first response is quick and the difficult cases still reach the right person." },
      { label: "Intelligent Business Processes", body: "The longer loops — stock alerts, reminders, reports generated and sent on schedule — running without anyone starting them." },
    ],
    suits: [
      "Teams whose daily job includes copying information between two screens.",
      "Businesses where the same question gets answered by hand hundreds of times.",
      "Operations that only work because one person remembers everything.",
    ],
    approach: [
      "We look for the task that repeats most, not the demo that impresses most.",
      "Every automation needs a fallback: what happens when the model is unsure, and who gets told.",
      "Access and data handling are decided per workflow — some things should not be automated at all, and we say so.",
      "It is handed over with its rules, logs and limits visible, so your team can change it without us.",
    ],
    connects: [
      { slug: "system-software-development", label: "System Software Development", body: "Automation works best inside a system that already holds the data — often the two are one project." },
      { slug: "seo-optimization", label: "SEO Optimization", body: "The scaling work — briefs, internal links, metadata — is where AI earns its place in a marketing stack." },
    ],
    metaTitle: "AI Automation | NexVeins",
    metaDescription: "AI chatbots, business workflow automation, AI-powered tools, automated support and intelligent processes — repetitive work moved off your team.",
  },
];

export function findService(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}
