import rawContent from "@/lib/content/testimonials.json";
import { createAnonClient, getTestimonials as dbGet, type Testimonial } from "@chapter/db";

export type { Testimonial } from "@chapter/db";

const fallback = (rawContent as unknown as { testimonials: Testimonial[] }).testimonials;

let warned = false;
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGet(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] testimonials: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
