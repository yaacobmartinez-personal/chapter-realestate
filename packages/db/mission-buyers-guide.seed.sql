-- ─────────────────────────────────────────────────────────────────────────────
-- Chapter Real Estate — Mission/Vision + Buyer's Guide seed
-- Run AFTER mission-buyers-guide.sql. Upserts, safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Mission & Vision ─────────────────────────────────────────────────────────
insert into public.mission_vision (id, label, heading, body, sort_order) values
  ('mv1', 'Our Mission', $q$To simplify real estate and create lasting value for every client.$q$, $q$We exist to make property ownership, investment, and management accessible, transparent, and rewarding — for first-time buyers, seasoned investors, and everyone in between.$q$, 1),
  ('mv2', 'Our Vision', $q$To become the most trusted real estate platform in Canada.$q$, $q$Starting in Winnipeg, we're building a scalable, technology-driven platform that sets a new standard for how real estate companies operate and serve their communities.$q$, 2)
on conflict (id) do update set
  label = excluded.label, heading = excluded.heading, body = excluded.body, sort_order = excluded.sort_order;

-- ─── Buyer's Guide steps ──────────────────────────────────────────────────────
-- short_desc = the one-line summary shown on the brokerage Buy section.
-- paragraphs = the full copy shown on the /buyers-guide page.
insert into public.buyer_guide_steps (id, step, title, short_desc, paragraphs, image, sort_order) values
  ('g01', '01', $q$Start with Real Estate Research$q$,
   $q$Explore Winnipeg and Manitoba neighbourhoods, track prices, and pinpoint the areas that fit your lifestyle and budget.$q$, array[
    $q$Every great move starts with a clear picture of where you want to be. Where do you see yourself living — a condo in the Exchange District, a character home in Wolseley, a family house in River Heights, or a new build in Bridgwater? Start by exploring Winnipeg's neighbourhoods and the surrounding Manitoba communities that fit your lifestyle.$q$,
    $q$As you research, separate your non-negotiables from the features you're willing to compromise on. Keep an eye on listing prices across your preferred areas so you develop a feel for the market and what your budget realistically buys. The more informed you are going in, the more confident every decision that follows will be.$q$
  ], 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', 1),
  ('g02', '02', $q$Consider Your Home Buying Budget$q$,
   $q$Map out your monthly finances and factor in ownership costs like utilities, property taxes, and condo fees so you know your comfortable range.$q$, array[
    $q$Instead of asking what the bank will lend you, ask what you're comfortable spending — the two are rarely the same. Map out your monthly finances and build in the true cost of ownership: not just the mortgage payment, but utilities, property taxes, insurance, condo fees, and ongoing maintenance.$q$,
    $q$Setting a comfortable budget up front protects you from stretching too thin and keeps your search focused on homes that genuinely work for your life. A Chapter agent can help you understand the full cost picture for the areas you're considering.$q$
  ], 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', 2),
  ('g03', '03', $q$Get Pre-Qualified for a Mortgage$q$,
   $q$Sit down with a mortgage advisor to understand your financing options and strengthen your position before you shop.$q$, array[
    $q$Before you fall in love with a home, understand what you can finance. Meeting with a mortgage advisor early helps you understand your options, your rate, and the price range you qualify for.$q$,
    $q$A pre-qualification (or pre-approval) does two things: it gives you clarity while you search, and it strengthens your position when you're ready to make an offer. In a competitive market, sellers take pre-approved buyers more seriously.$q$
  ], 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80', 3),
  ('g04', '04', $q$Partner with a Chapter Agent$q$,
   $q$Team up with an experienced Chapter Real Estate agent who guides you across Manitoba — at no cost to you as a buyer.$q$, array[
    $q$It doesn't cost you anything to work with a real estate agent when buying a home in Manitoba — but it can save you time, stress, and second-guessing. Your Chapter agent works for you: sourcing listings, booking showings, reading the market, and negotiating on your behalf.$q$,
    $q$We serve Winnipeg and communities across Manitoba, and we tailor our approach to your goals — whether you're a first-time buyer, upsizing for a growing family, or adding an investment property.$q$
  ], 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80', 4),
  ('g05', '05', $q$Explore Homes and Communities$q$,
   $q$Tour properties in person, take notes, and ask questions about layout, condition, and the surrounding neighbourhood.$q$, array[
    $q$Now the exciting part — seeing homes in person. Take notes at every showing and don't be afraid to ask questions about the layout, the condition, and the age of major systems like the roof, furnace, and windows.$q$,
    $q$Look beyond the property itself. Consider the neighbourhood: your commute, nearby schools, parks, and amenities, and whether the community fits the way you live. The right home is as much about location and lifestyle as it is about the four walls.$q$
  ], 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80', 5),
  ('g06', '06', $q$Make an Offer on a Home$q$,
   $q$Craft a competitive offer with your agent's guidance, then navigate counteroffers and terms with confidence.$q$, array[
    $q$When you find the one, your Chapter agent helps you craft a fair, competitive offer based on current market conditions and comparable recent sales. Your offer can include conditions — like financing, a home inspection, or the sale of your current home — to protect you.$q$,
    $q$Expect some back-and-forth. Sellers may counter on price, closing date, or terms, and we'll guide you through each round of negotiation until you reach an agreement that works — or decide to walk away.$q$
  ], 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80', 6),
  ('g07', '07', $q$Book a Professional Home Inspection$q$,
   $q$Arrange an inspection to surface any major issues and confirm the home is safe and sound before you commit.$q$, array[
    $q$A professional home inspection gives you peace of mind about the home's safety and condition. An inspector examines the structure, roof, electrical, plumbing, heating, and more, and flags anything that needs attention.$q$,
    $q$If the inspection surfaces significant issues, you have options: renegotiate the price, request repairs, or — depending on your conditions — walk away. It's a small investment that can save you from costly surprises later.$q$
  ], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 7),
  ('g08', '08', $q$Finalize Your Mortgage$q$,
   $q$Choose between fixed and variable rates and amortization terms, and explore first-time buyer programs available in Manitoba.$q$, array[
    $q$With an accepted offer in hand, it's time to finalize your financing. You'll choose between a fixed-rate mortgage (predictable payments) and a variable-rate mortgage (which moves with the market), along with an amortization period that fits your budget.$q$,
    $q$This is also when programs and rebates come into play. Ask your advisor about CMHC mortgage insurance, first-time home buyer programs, and Manitoba land transfer considerations — they can meaningfully affect your upfront costs.$q$
  ], 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80', 8),
  ('g09', '09', $q$Time for a Home Appraisal$q$,
   $q$Your lender arranges an independent valuation to confirm the home's fair market value.$q$, array[
    $q$Your mortgage lender will arrange an independent appraisal to confirm the fair market value of the property. This protects the lender — and you — by making sure the amount being financed lines up with what the home is actually worth.$q$,
    $q$It's a standard step in the process, and your Chapter agent and lender will coordinate it so it happens smoothly.$q$
  ], 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', 9),
  ('g10', '10', $q$Sign Your Closing Paperwork$q$,
   $q$Complete the final documents with legal and lending support — then pick up the keys to your new home.$q$, array[
    $q$You're almost home. In the final stretch, you'll sign your mortgage and closing documents, and a real estate lawyer will guide you through the legal details, title transfer, and final costs.$q$,
    $q$Once everything is signed and funds are exchanged, the keys are yours. Congratulations on your new home — this is the moment it all becomes real. And Chapter is here for you well beyond closing day.$q$
  ], 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80', 10)
on conflict (id) do update set
  step = excluded.step, title = excluded.title, short_desc = excluded.short_desc, paragraphs = excluded.paragraphs, image = excluded.image, sort_order = excluded.sort_order;
