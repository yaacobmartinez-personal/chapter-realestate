import rawContent from "@/lib/content/values.json";
import { createAnonClient, getCompanyValues, type CompanyValue } from "@chapter/db";

export type { CompanyValue } from "@chapter/db";

const fallback = (rawContent as unknown as { values: CompanyValue[] }).values;

let warned = false;
export async function getValues(): Promise<CompanyValue[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await getCompanyValues(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] values: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
