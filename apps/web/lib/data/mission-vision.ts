import rawContent from "@/lib/content/mission-vision.json";
import { createAnonClient, getMissionVision as dbGet, type MissionVisionItem } from "@chapter/db";

export type { MissionVisionItem } from "@chapter/db";

const fallback = (rawContent as unknown as { items: MissionVisionItem[] }).items;

let warned = false;
export async function getMissionVision(): Promise<MissionVisionItem[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGet(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] mission-vision: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
