import rawContent from "@/lib/content/brokerage.json";

// ─── Buy — 10-Step Program ────────────────────────────────────────────────────
// The brokerage Buy section now shares the database-backed buyer's guide steps
// (see `@/lib/data/buyer-guide`), rendering each step's `shortDesc`.

// ─── Buyer's Guide (full page) ────────────────────────────────────────────────
// Steps are now database-backed — see `@/lib/data/buyer-guide` (getBuyerGuideSteps)
// and the `buyer_guide_steps` table in @chapter/db. Intro/closing copy stays here.

// Long-form intro for the dedicated /buyers-guide page.
export const buyerGuideIntro =
  "Buying a home in Winnipeg and across Manitoba is an exciting milestone — but it can also feel overwhelming. We created this guide to help you make informed decisions with confidence, from your very first search to the day you get the keys. Here's what to expect, step by step.";

// Closing message shown at the end of the guide.
export const buyerGuideClosing =
  "Congratulations on taking the first step — this is where it all becomes real. Whenever you're ready, a Chapter agent is here to guide you the rest of the way, and long after closing day.";

// ─── Sellers Page (full content) ──────────────────────────────────────────────
export interface SellerSection {
  title: string;
  paragraphs: string[];
  image: string;
}

// Hero/intro — "Make a Strategic Sale", rebranded for Chapter + Manitoba.
export const sellerIntro =
  "Chapter agents know Manitoba. We know the residential and commercial real estate, the neighbourhoods, and what buyers are looking for across Winnipeg and beyond. To get the best price for your property sale, you need representation that understands both your needs and each local market — and we're focused on empowering Manitoba sellers to net the best possible price for their properties.";

export const sellerClosing =
  "Thinking of selling? Let's build a strategy that nets you the best possible price for your home or commercial property.";

// Editorial sections shown as alternating image / text blocks.
export const sellerSections: SellerSection[] = [
  {
    title: "Protecting Your Sale",
    paragraphs: [
      "Chapter's strict adherence to the Manitoba Securities Commission, the Manitoba Real Estate Association, and FINTRAC guidelines means you can trust that our agents are guided by principles of honesty throughout your sale — so you can have real peace of mind. Any time an issue arises, there's a team ready to help create a resolution.",
      "Your sale will progress quickly and with minimal disruption thanks to our collaborative approach. From the property evaluation through to negotiations, your agent has the direct support of our brokerage experts and experienced leadership.",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
  },
  {
    title: "Around-the-Clock Assistance",
    paragraphs: [
      "Our brokerage is a hub of information, and our agents have direct access to on-duty management for advice or guidance during your transaction. We also equip our agents with the templates, forms, sample agreements, and paperwork they need — so the documentation is always ready when your sale calls for it, without delay.",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
  },
  {
    title: "Connect With an Agent",
    paragraphs: [
      "Partner with the right real estate professional to strategically manage your property sale. Chapter's Manitoba agents bring specific area expertise and unique skills that ensure you get the best possible return from your listing.",
    ],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
  },
  {
    title: "Settling the Sale",
    paragraphs: [
      "Rigorous training and real-time leadership support give our agents the ability to manoeuvre through negotiations so you always come out ahead. Your interests stay at the forefront and are never compromised just to complete a sale.",
      "We know what to expect at the negotiating table — and we're always prepared to get you top dollar, no matter what.",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
];

// "Full-Service Listing Support" — what you get working with a Chapter agent.
export const sellerListingSupport: string[] = [
  "A thorough property evaluation to determine your property's value",
  "A current Comparative Market Analysis (CMA) to shape your pricing strategy",
  "Your home or commercial property prepared and marketed by our experts",
  "Connections to the right industry professionals — lawyers, contractors, movers, and more — to make your sale seamless",
  "A competitive market advantage, backed by a reputable, full-service brokerage",
];

// "Eye-Capturing Marketing" — marketing tools available through the brokerage.
export const sellerMarketingTools: string[] = [
  "Professional photography & videography",
  "Flyers for resale and pre-construction listings",
  "Client relationship management (CRM) systems",
  "Social media marketing campaigns",
  "Email campaigns to our buyer database",
  "Targeted Google Ads",
  "Brochures & print collateral",
  "Featured placement on chapterrealestate.ca",
];

// ─── Featured Listings ────────────────────────────────────────────────────────
export interface Listing {
  image: string;
  price: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
}

// ─── Agents Directory ─────────────────────────────────────────────────────────
// Agents are now database-backed — see `@/lib/data/agents` (getAgents) and the
// `agents` table in @chapter/db. The `Agent` type lives in @chapter/db.

// ─── Market Stats ─────────────────────────────────────────────────────────────
export interface MarketStat {
  label: string;
  value: string;
  note: string;
}

const raw = rawContent as unknown as {
  featuredListings: Listing[];
  listingFilters: string[];
  brokerageMarketStats: MarketStat[];
};

export const featuredListings = raw.featuredListings;
export const listingFilters = raw.listingFilters;
export const brokerageMarketStats = raw.brokerageMarketStats;
