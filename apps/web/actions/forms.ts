"use server";

import { submitForm, type FormPayload, type SubmissionResult } from "@/lib/form-submission";

function toFields(formData: FormData): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") fields[key] = value;
  }
  return fields;
}

function handle(
  formType: FormPayload["formType"],
  formData: FormData,
): Promise<SubmissionResult> {
  return submitForm({ formType, fields: toFields(formData) });
}

export async function submitContactForm(formData: FormData): Promise<SubmissionResult> {
  return handle("contact", formData);
}

export async function submitPropertyInquiry(formData: FormData): Promise<SubmissionResult> {
  return handle("property-inquiry", formData);
}

export async function submitRecruitmentForm(formData: FormData): Promise<SubmissionResult> {
  return handle("recruitment", formData);
}
