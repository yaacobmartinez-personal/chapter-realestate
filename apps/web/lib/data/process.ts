import rawContent from "@/lib/content/process.json";
import { createAnonClient, getProcessSteps, type ProcessStep } from "@chapter/db";

export type { ProcessStep } from "@chapter/db";

const fallback = (rawContent as unknown as { steps: ProcessStep[] }).steps;

let warned = false;
export async function getProcess(): Promise<ProcessStep[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await getProcessSteps(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] process: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
