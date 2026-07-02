import rawContent from "@/lib/content/buyer-guide.json";
import { createAnonClient, getBuyerGuideSteps as dbGet, type BuyerGuideStep } from "@chapter/db";

export type { BuyerGuideStep } from "@chapter/db";

const fallback = (rawContent as unknown as { steps: BuyerGuideStep[] }).steps;

let warned = false;
export async function getBuyerGuideSteps(): Promise<BuyerGuideStep[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGet(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] buyer-guide: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
