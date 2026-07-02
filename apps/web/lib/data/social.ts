import rawContent from "@/lib/content/social-links.json";
import { createAnonClient, getSocialLinks as dbGet, type SocialLink } from "@chapter/db";

export type { SocialLink } from "@chapter/db";

const fallback = (rawContent as unknown as { socialLinks: SocialLink[] }).socialLinks;

let warned = false;
/** Enabled social links only, for public display. */
export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGet(createAnonClient());
    const enabled = data.filter((s) => s.enabled);
    return enabled.length ? enabled : fallback.filter((s) => s.enabled);
  } catch (err) {
    if (!warned) {
      console.warn("[data] social: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback.filter((s) => s.enabled);
  }
}
