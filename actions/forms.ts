"use server";

import type { SubmissionResult } from "@/lib/form-submission";

// Delivery is disabled until SMTP and Google Sheets accounts are configured.
// Forms show a success state to users but no data is sent or stored yet.

export async function submitContactForm(_formData: FormData): Promise<SubmissionResult> {
  return { ok: true };
}

export async function submitPropertyInquiry(_formData: FormData): Promise<SubmissionResult> {
  return { ok: true };
}

export async function submitRecruitmentForm(_formData: FormData): Promise<SubmissionResult> {
  return { ok: true };
}
