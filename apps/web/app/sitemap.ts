import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/data/properties";
import { getBlogPosts } from "@/lib/data/resources";
import { getRentals } from "@/lib/data/rentals";
import { investmentOpportunities } from "@/lib/data/investments";

const BASE_URL = "https://chapterrealestate.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, posts, rentals] = await Promise.all([
    getProperties(),
    getBlogPosts(),
    getRentals(),
  ]);

  const rentalPages: MetadataRoute.Sitemap = rentals.map((r) => ({
    url: `${BASE_URL}/rentals/${r.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/resources/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const investmentPages: MetadataRoute.Sitemap = investmentOpportunities.map((o) => ({
    url: `${BASE_URL}/investments/${o.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/brokerage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/buyers-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sellers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/property-management`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/investments`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recruitment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...propertyPages,
    ...rentalPages,
    ...articlePages,
    ...investmentPages,
  ];
}
