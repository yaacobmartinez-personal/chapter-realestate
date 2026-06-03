# Chapter Real Estate — Next.js Website

A full multi-page Next.js 16 website for Chapter Real Estate & Property Management.  
Built with **Next.js App Router**, **Tailwind CSS v4**, and **lucide-react**.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, services, listings, team, testimonials |
| `/about` | Story, mission/vision, values, leadership team, careers CTA |
| `/brokerage` | Buy, sell, listings grid, agent directory, market insights |
| `/property-management` | Overview, services, pricing, owner/tenant portals, free analysis form |
| `/investments` | Opportunities, Barso Group, investor relations |
| `/recruitment` | Why join, commission models, benefits, apply form |
| `/resources` | Blog/insights, guides, FAQ |
| `/contact` | Contact form, office info, map |

## Project Structure

```
app/
  layout.tsx          ← Root layout (Navbar + Footer)
  page.tsx            ← Homepage (imports from components/home/)
  about/page.tsx
  brokerage/page.tsx
  property-management/page.tsx
  investments/page.tsx
  recruitment/page.tsx
  resources/page.tsx
  contact/page.tsx

components/
  Navbar.tsx          ← Sticky nav with dropdowns + mobile menu
  Footer.tsx          ← Full footer with links + social
  home/               ← Homepage section components
    Hero.tsx
    StatsBar.tsx
    Services.tsx
    FeaturedListings.tsx
    WhyChapter.tsx
    PMCta.tsx
    Team.tsx
    Testimonials.tsx
    MarketInsights.tsx
    ContactCTA.tsx
```

## Design System

- **Colors:** White `#ffffff` · Black `#0a0a0a` · Gold accent `#c8a96e` · Light grey `#f7f7f7`
- **Typography:** Geist Sans, weight 300 (light) throughout — clean Scandinavian-inspired
- **Style:** Minimalist luxury-modern. High whitespace. Cinematic hero images via Unsplash.

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
cd chapter-realestate
vercel
```

### Option 2 — GitHub → Vercel dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo — Vercel auto-detects Next.js
4. Click **Deploy**

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Customisation Checklist

- [ ] Replace placeholder phone/email/address in `Navbar.tsx`, `Footer.tsx`, `contact/page.tsx`
- [ ] Add your logo to `public/logo.svg` and reference it in `Navbar.tsx` and `Footer.tsx`
- [ ] Replace Unsplash images with real listing/team photography
- [ ] Connect contact forms to a backend (Resend, Formspree, etc.)
- [ ] Wire up MLS / property search API for live listings
- [ ] Add CRM integration (HubSpot, Follow Up Boss, etc.)
- [ ] Set up owner/tenant portal links
