import rawContent from "@/lib/content/contact.json";

// ─── Offices ──────────────────────────────────────────────────────────────────
export interface Office {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

// ─── Business Hours ───────────────────────────────────────────────────────────
export interface BusinessHour {
  day: string;
  hours: string;
}

const raw = rawContent as unknown as {
  offices: Office[];
  businessHours: BusinessHour[];
};

export const offices = raw.offices;
export const businessHours = raw.businessHours;
