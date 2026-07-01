/**
 * Core form submission handler.
 *
 * 1. Persists every submission to the Supabase `form_submissions` table
 *    (source of truth — service-role client, server-only).
 * 2. Best-effort email notification via Resend (HTTP API, Workers-compatible).
 *    Email is optional: if it fails or isn't configured, the submission is
 *    still saved and the user still sees success.
 *
 * Env vars:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (required, save)
 *   RESEND_API_KEY, RESEND_TO                             (optional, email)
 *   RESEND_FROM                                           (optional, defaults below)
 */

import { createServiceClient, createSubmission, type FormType } from "@chapter/db";
import { Resend } from "resend";

export type { FormType };

export interface FormPayload {
  formType: FormType;
  fields: Record<string, string>;
}

export interface SubmissionResult {
  ok: boolean;
  error?: string;
}

const FORM_LABELS: Record<FormType, string> = {
  contact: "Contact Enquiry",
  "property-inquiry": "Property Inquiry",
  recruitment: "Agent Application",
};

// Escape user-supplied values before placing them in HTML.
function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "firstName" → "First Name", "email" → "Email", "interest" → "Interest".
function humanize(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function buildEmailHtml(payload: FormPayload): string {
  const label = FORM_LABELS[payload.formType];
  const dateStr = new Date().toLocaleString("en-CA", {
    timeZone: "America/Winnipeg",
    dateStyle: "long",
    timeStyle: "short",
  });

  const fieldBlocks = Object.entries(payload.fields)
    .filter(([, value]) => value && value.trim() !== "")
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding:0 0 18px;">
          <p style="margin:0 0 5px;color:#b39a6d;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${esc(humanize(key))}</p>
          <p style="margin:0;padding:0 0 16px;border-bottom:1px solid #efece6;color:#1a1a1a;font-size:15px;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">${esc(value).replace(/\n/g, "<br>")}</p>
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="margin:0;padding:0;background:#f4f3f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #ece9e3;border-radius:2px;overflow:hidden;">
          <tr><td style="background:#0a0a0a;padding:38px 40px 34px;">
            <p style="margin:0 0 12px;color:#c8a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Chapter Real Estate</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:400;font-family:Georgia,'Times New Roman',serif;">New ${esc(label)}</h1>
            <p style="margin:12px 0 0;color:#8c8c8c;font-size:13px;font-family:Arial,Helvetica,sans-serif;">${esc(dateStr)}</p>
          </td></tr>
          <tr><td style="height:3px;line-height:3px;font-size:0;background:#c8a96e;">&nbsp;</td></tr>
          <tr><td style="padding:36px 40px 22px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fieldBlocks}</table>
          </td></tr>
          <tr><td style="padding:22px 40px 28px;background:#faf9f7;border-top:1px solid #ece9e3;">
            <p style="margin:0;color:#9a968e;font-size:12px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
              This lead was submitted via
              <a href="https://chapterrealestate.ca" style="color:#b39a6d;text-decoration:none;">chapterrealestate.ca</a>.
              Reply directly to reach the sender if their email is listed above.
            </p>
          </td></tr>
        </table>
        <p style="margin:20px 0 0;color:#b8b4ac;font-size:11px;font-family:Arial,Helvetica,sans-serif;">© Chapter Real Estate · Winnipeg, Manitoba</p>
      </td></tr>
    </table>
  </div>`;
}

function buildEmailText(payload: FormPayload): string {
  const label = FORM_LABELS[payload.formType];
  const lines = Object.entries(payload.fields)
    .filter(([, value]) => value && value.trim() !== "")
    .map(([key, value]) => `${humanize(key)}: ${value}`);
  return `New ${label} — Chapter Real Estate\n\n${lines.join("\n")}\n\nSubmitted via chapterrealestate.ca`;
}

/** Best-effort email — never throws; logs and returns on any failure. */
async function sendEmail(payload: FormPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO;
  if (!apiKey || !to) return; // email not configured — skip silently

  const from = process.env.RESEND_FROM ?? "Chapter Real Estate <onboarding@resend.dev>";

  // Let you reply straight to the person who submitted the form.
  const replyTo = payload.fields.email?.trim() || undefined;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject: `New ${FORM_LABELS[payload.formType]} — Chapter Real Estate`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    });
    if (error) console.error("[submitForm] resend error:", error);
  } catch (err) {
    console.error("[submitForm] email failed:", err);
  }
}

export async function submitForm(payload: FormPayload): Promise<SubmissionResult> {
  try {
    // Save is critical — must succeed.
    await createSubmission(createServiceClient(), payload);
    // Email is best-effort — must never block or fail the submission.
    await sendEmail(payload);
    return { ok: true };
  } catch (err) {
    console.error("[submitForm]", err);
    return { ok: false, error: "Submission failed. Please try again or contact us directly." };
  }
}
