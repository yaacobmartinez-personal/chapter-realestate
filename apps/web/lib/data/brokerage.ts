import rawContent from "@/lib/content/brokerage.json";

// ─── Buy — 10-Step Program ────────────────────────────────────────────────────
export interface BuyStep {
  step: string;
  title: string;
  desc: string;
}

// Chapter Real Estate's 10-step home buying program (Manitoba).
export const buySteps: BuyStep[] = [
  {
    step: "01",
    title: "Start with real estate research",
    desc: "Explore Winnipeg and Manitoba neighbourhoods, track prices, and pinpoint the areas that fit your lifestyle and budget.",
  },
  {
    step: "02",
    title: "Set your buying budget",
    desc: "Map out your monthly finances and factor in ownership costs like utilities, property taxes, and condo fees so you know your comfortable range.",
  },
  {
    step: "03",
    title: "Get pre-qualified for a mortgage",
    desc: "Sit down with a mortgage advisor to understand your financing options and strengthen your position before you shop.",
  },
  {
    step: "04",
    title: "Partner with a Chapter agent",
    desc: "Team up with an experienced Chapter Real Estate agent who guides you across Manitoba — at no cost to you as a buyer.",
  },
  {
    step: "05",
    title: "Explore homes and communities",
    desc: "Tour properties in person, take notes, and ask questions about layout, condition, and the surrounding neighbourhood.",
  },
  {
    step: "06",
    title: "Make an offer",
    desc: "Craft a competitive offer with your agent's guidance, then navigate counteroffers and terms with confidence.",
  },
  {
    step: "07",
    title: "Book a professional home inspection",
    desc: "Arrange an inspection to surface any major issues and confirm the home is safe and sound before you commit.",
  },
  {
    step: "08",
    title: "Finalize your mortgage",
    desc: "Choose between fixed and variable rates and amortization terms, and explore first-time buyer programs available in Manitoba.",
  },
  {
    step: "09",
    title: "Complete the home appraisal",
    desc: "Your lender arranges an independent valuation to confirm the home's fair market value.",
  },
  {
    step: "10",
    title: "Sign your closing paperwork",
    desc: "Complete the final documents with legal and lending support — then pick up the keys to your new home.",
  },
];

// ─── Buyer's Guide (full page) ────────────────────────────────────────────────
export interface BuyGuideStep {
  step: string;
  title: string;
  paragraphs: string[];
  image: string;
}

// Long-form intro for the dedicated /buyers-guide page.
export const buyerGuideIntro =
  "Buying a home in Winnipeg and across Manitoba is an exciting milestone — but it can also feel overwhelming. We created this guide to help you make informed decisions with confidence, from your very first search to the day you get the keys. Here's what to expect, step by step.";

// Closing message shown at the end of the guide.
export const buyerGuideClosing =
  "Congratulations on taking the first step — this is where it all becomes real. Whenever you're ready, a Chapter agent is here to guide you the rest of the way, and long after closing day.";

export const buyerGuideSteps: BuyGuideStep[] = [
  {
    step: "01",
    title: "Start with Real Estate Research",
    paragraphs: [
      "Every great move starts with a clear picture of where you want to be. Where do you see yourself living — a condo in the Exchange District, a character home in Wolseley, a family house in River Heights, or a new build in Bridgwater? Start by exploring Winnipeg's neighbourhoods and the surrounding Manitoba communities that fit your lifestyle.",
      "As you research, separate your non-negotiables from the features you're willing to compromise on. Keep an eye on listing prices across your preferred areas so you develop a feel for the market and what your budget realistically buys. The more informed you are going in, the more confident every decision that follows will be.",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    step: "02",
    title: "Consider Your Home Buying Budget",
    paragraphs: [
      "Instead of asking “what will the bank lend me?”, ask “what am I comfortable spending?” The two are rarely the same. Map out your monthly finances and build in the true cost of ownership — not just the mortgage payment, but utilities, property taxes, insurance, condo fees, and ongoing maintenance.",
      "Setting a comfortable budget up front protects you from stretching too thin and keeps your search focused on homes that genuinely work for your life. A Chapter agent can help you understand the full cost picture for the areas you're considering.",
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  },
  {
    step: "03",
    title: "Get Pre-Qualified for a Mortgage",
    paragraphs: [
      "Before you fall in love with a home, understand what you can finance. Meeting with a mortgage advisor early helps you understand your options, your rate, and the price range you qualify for.",
      "A pre-qualification (or pre-approval) does two things: it gives you clarity while you search, and it strengthens your position when you're ready to make an offer. In a competitive market, sellers take pre-approved buyers more seriously.",
    ],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
  },
  {
    step: "04",
    title: "Partner with a Chapter Agent",
    paragraphs: [
      "It doesn't cost you anything to work with a real estate agent when buying a home in Manitoba — but it can save you time, stress, and second-guessing. Your Chapter agent works for you: sourcing listings, booking showings, reading the market, and negotiating on your behalf.",
      "We serve Winnipeg and communities across Manitoba, and we tailor our approach to your goals — whether you're a first-time buyer, upsizing for a growing family, or adding an investment property.",
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80",
  },
  {
    step: "05",
    title: "Explore Homes and Communities",
    paragraphs: [
      "Now the exciting part — seeing homes in person. Take notes at every showing and don't be afraid to ask questions about the layout, the condition, and the age of major systems like the roof, furnace, and windows.",
      "Look beyond the property itself. Consider the neighbourhood: your commute, nearby schools, parks, and amenities, and whether the community fits the way you live. The right home is as much about location and lifestyle as it is about the four walls.",
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  },
  {
    step: "06",
    title: "Make an Offer on a Home",
    paragraphs: [
      "When you find the one, your Chapter agent helps you craft a fair, competitive offer based on current market conditions and comparable recent sales. Your offer can include conditions — like financing, a home inspection, or the sale of your current home — to protect you.",
      "Expect some back-and-forth. Sellers may counter on price, closing date, or terms, and we'll guide you through each round of negotiation until you reach an agreement that works — or decide to walk away.",
    ],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
  },
  {
    step: "07",
    title: "Book a Professional Home Inspection",
    paragraphs: [
      "A professional home inspection gives you peace of mind about the home's safety and condition. An inspector examines the structure, roof, electrical, plumbing, heating, and more, and flags anything that needs attention.",
      "If the inspection surfaces significant issues, you have options: renegotiate the price, request repairs, or — depending on your conditions — walk away. It's a small investment that can save you from costly surprises later.",
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  },
  {
    step: "08",
    title: "Finalize Your Mortgage",
    paragraphs: [
      "With an accepted offer in hand, it's time to finalize your financing. You'll choose between a fixed-rate mortgage (predictable payments) and a variable-rate mortgage (which moves with the market), along with an amortization period that fits your budget.",
      "This is also when programs and rebates come into play. Ask your advisor about CMHC mortgage insurance, first-time home buyer programs, and Manitoba land transfer considerations — they can meaningfully affect your upfront costs.",
    ],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80",
  },
  {
    step: "09",
    title: "Time for a Home Appraisal",
    paragraphs: [
      "Your mortgage lender will arrange an independent appraisal to confirm the fair market value of the property. This protects the lender — and you — by making sure the amount being financed lines up with what the home is actually worth.",
      "It's a standard step in the process, and your Chapter agent and lender will coordinate it so it happens smoothly.",
    ],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  },
  {
    step: "10",
    title: "Sign Your Closing Paperwork",
    paragraphs: [
      "You're almost home. In the final stretch, you'll sign your mortgage and closing documents, and a real estate lawyer will guide you through the legal details, title transfer, and final costs.",
      "Once everything is signed and funds are exchanged, the keys are yours. Congratulations on your new home — this is the moment it all becomes real. And Chapter is here for you well beyond closing day.",
    ],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
  },
];

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
export interface Agent {
  id: string;
  name: string;
  specialties: string;
  phone: string;
  email: string;
  image: string;
  listings: number;
}

// ⚠️ PLACEHOLDER ROSTER — mock data showing how the agents grid renders.
// Replace names, titles, contact details, and `image` URLs with the real
// Chapter Real Estate roster and headshots before launch.
const AGENT_PLACEHOLDER_PHOTO =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80";

export const agents: Agent[] = [
  { id: "a1", name: "Agent Name", specialties: "Residential Sales", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a2", name: "Agent Name", specialties: "Luxury & Estates", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a3", name: "Agent Name", specialties: "First-Time Buyers", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a4", name: "Agent Name", specialties: "Investment Properties", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a5", name: "Agent Name", specialties: "Commercial", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a6", name: "Agent Name", specialties: "Condos & Lofts", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a7", name: "Agent Name", specialties: "New Construction", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
  { id: "a8", name: "Agent Name", specialties: "Relocation", phone: "204-000-0000", email: "agent@chapterrealestate.ca", image: AGENT_PLACEHOLDER_PHOTO, listings: 0 },
];

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
