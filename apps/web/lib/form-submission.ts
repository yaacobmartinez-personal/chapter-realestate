/**
 * Core form submission handler.
 * Each submission is delivered via two channels (if configured):
 *   1. SMTP email via Nodemailer
 *   2. Google Sheets row append via the Sheets API
 *
 * Required env vars:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
 */

import nodemailer from "nodemailer";
import { google } from "googleapis";

export type FormType = "contact" | "property-inquiry" | "recruitment";

export interface FormPayload {
  formType: FormType;
  fields: Record<string, string>;
}

export interface SubmissionResult {
  ok: boolean;
  error?: string;
}

// ─── Email ────────────────────────────────────────────────────────────────────

function buildEmailHtml(payload: FormPayload): string {
  const rows = Object.entries(payload.fields)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap;border-bottom:1px solid #eee">${key}</td>
          <td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee">${value || "—"}</td>
        </tr>`
    )
    .join("");

  const label: Record<FormType, string> = {
    contact: "Contact Form",
    "property-inquiry": "Property Inquiry",
    recruitment: "Agent Application",
  };

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#000;padding:24px 32px">
        <p style="color:#c8a96e;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0">Chapter Real Estate</p>
        <h1 style="color:#fff;font-size:22px;font-weight:300;margin:8px 0 0">New ${label[payload.formType]} Submission</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows}
      </table>
      <div style="padding:16px 12px;background:#f7f7f7">
        <p style="font-size:11px;color:#999;margin:0">Submitted via chapterrealestate.ca</p>
      </div>
    </div>
  `;
}

async function sendEmail(payload: FormPayload): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_TO) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subjects: Record<FormType, string> = {
    contact: "New Contact Form Submission",
    "property-inquiry": "New Property Inquiry",
    recruitment: "New Agent Application",
  };

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to: SMTP_TO,
    subject: subjects[payload.formType],
    html: buildEmailHtml(payload),
  });
}

// ─── Google Sheets ────────────────────────────────────────────────────────────

const SHEET_TABS: Record<FormType, string> = {
  contact: "Contact",
  "property-inquiry": "Property Inquiries",
  recruitment: "Applications",
};

async function appendToSheet(payload: FormPayload): Promise<void> {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) return;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const tab = SHEET_TABS[payload.formType];
  const timestamp = new Date().toLocaleString("en-CA", { timeZone: "America/Winnipeg" });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[timestamp, ...Object.values(payload.fields)]],
    },
  });
}

// ─── Public handler ───────────────────────────────────────────────────────────

export async function submitForm(payload: FormPayload): Promise<SubmissionResult> {
  try {
    await Promise.all([sendEmail(payload), appendToSheet(payload)]);
    return { ok: true };
  } catch (err) {
    console.error("[submitForm]", err);
    return { ok: false, error: "Submission failed. Please try again or contact us directly." };
  }
}
