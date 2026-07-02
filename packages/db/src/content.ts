import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  TeamMember,
  TeamMemberRow,
  Testimonial,
  TestimonialRow,
  CompanyValue,
  CompanyValueRow,
  ProcessStep,
  ProcessStepRow,
  SocialLink,
  SocialLinkRow,
} from "./types";

// ─── Team / Leadership ────────────────────────────────────────────────────────
const TEAM = "team_members";

function rowToMember(r: TeamMemberRow): TeamMember {
  return { id: r.id, name: r.name, role: r.role, bio: r.bio, image: r.image, sortOrder: r.sort_order };
}
export function memberToRow(m: TeamMember): TeamMemberRow {
  return { id: m.id, name: m.name, role: m.role, bio: m.bio, image: m.image, sort_order: m.sortOrder };
}
export async function getTeamMembers(db: SupabaseClient): Promise<TeamMember[]> {
  const { data, error } = await db.from(TEAM).select("*").order("sort_order", { ascending: true });
  if (error) throw new Error(`getTeamMembers: ${error.message}`);
  return (data as TeamMemberRow[]).map(rowToMember);
}
export async function upsertTeamMember(db: SupabaseClient, m: TeamMember): Promise<TeamMember> {
  const { data, error } = await db.from(TEAM).upsert(memberToRow(m), { onConflict: "id" }).select("*").single();
  if (error) throw new Error(`upsertTeamMember: ${error.message}`);
  return rowToMember(data as TeamMemberRow);
}
export async function deleteTeamMember(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(TEAM).delete().eq("id", id);
  if (error) throw new Error(`deleteTeamMember: ${error.message}`);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = "testimonials";

function rowToTestimonial(r: TestimonialRow): Testimonial {
  return { id: r.id, text: r.quote, author: r.author, context: r.context, sortOrder: r.sort_order };
}
export function testimonialToRow(t: Testimonial): TestimonialRow {
  return { id: t.id, quote: t.text, author: t.author, context: t.context, sort_order: t.sortOrder };
}
export async function getTestimonials(db: SupabaseClient): Promise<Testimonial[]> {
  const { data, error } = await db.from(TESTIMONIALS).select("*").order("sort_order", { ascending: true });
  if (error) throw new Error(`getTestimonials: ${error.message}`);
  return (data as TestimonialRow[]).map(rowToTestimonial);
}
export async function upsertTestimonial(db: SupabaseClient, t: Testimonial): Promise<Testimonial> {
  const { data, error } = await db.from(TESTIMONIALS).upsert(testimonialToRow(t), { onConflict: "id" }).select("*").single();
  if (error) throw new Error(`upsertTestimonial: ${error.message}`);
  return rowToTestimonial(data as TestimonialRow);
}
export async function deleteTestimonial(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(TESTIMONIALS).delete().eq("id", id);
  if (error) throw new Error(`deleteTestimonial: ${error.message}`);
}

// ─── Company values ───────────────────────────────────────────────────────────
const VALUES = "company_values";

function rowToValue(r: CompanyValueRow): CompanyValue {
  return { id: r.id, iconKey: r.icon_key, title: r.title, description: r.description, sortOrder: r.sort_order };
}
export function valueToRow(v: CompanyValue): CompanyValueRow {
  return { id: v.id, icon_key: v.iconKey, title: v.title, description: v.description, sort_order: v.sortOrder };
}
export async function getCompanyValues(db: SupabaseClient): Promise<CompanyValue[]> {
  const { data, error } = await db.from(VALUES).select("*").order("sort_order", { ascending: true });
  if (error) throw new Error(`getCompanyValues: ${error.message}`);
  return (data as CompanyValueRow[]).map(rowToValue);
}
export async function upsertCompanyValue(db: SupabaseClient, v: CompanyValue): Promise<CompanyValue> {
  const { data, error } = await db.from(VALUES).upsert(valueToRow(v), { onConflict: "id" }).select("*").single();
  if (error) throw new Error(`upsertCompanyValue: ${error.message}`);
  return rowToValue(data as CompanyValueRow);
}
export async function deleteCompanyValue(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(VALUES).delete().eq("id", id);
  if (error) throw new Error(`deleteCompanyValue: ${error.message}`);
}

// ─── Chapter's process steps ──────────────────────────────────────────────────
const PROCESS = "process_steps";

function rowToStep(r: ProcessStepRow): ProcessStep {
  return { id: r.id, step: r.step, title: r.title, desc: r.description, sortOrder: r.sort_order };
}
export function stepToRow(s: ProcessStep): ProcessStepRow {
  return { id: s.id, step: s.step, title: s.title, description: s.desc, sort_order: s.sortOrder };
}
export async function getProcessSteps(db: SupabaseClient): Promise<ProcessStep[]> {
  const { data, error } = await db.from(PROCESS).select("*").order("sort_order", { ascending: true });
  if (error) throw new Error(`getProcessSteps: ${error.message}`);
  return (data as ProcessStepRow[]).map(rowToStep);
}
export async function upsertProcessStep(db: SupabaseClient, s: ProcessStep): Promise<ProcessStep> {
  const { data, error } = await db.from(PROCESS).upsert(stepToRow(s), { onConflict: "id" }).select("*").single();
  if (error) throw new Error(`upsertProcessStep: ${error.message}`);
  return rowToStep(data as ProcessStepRow);
}
export async function deleteProcessStep(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(PROCESS).delete().eq("id", id);
  if (error) throw new Error(`deleteProcessStep: ${error.message}`);
}

// ─── Social links ─────────────────────────────────────────────────────────────
const SOCIAL = "social_links";

function rowToSocial(r: SocialLinkRow): SocialLink {
  return { id: r.id, name: r.name, href: r.href, enabled: r.enabled, sortOrder: r.sort_order };
}
export function socialToRow(s: SocialLink): SocialLinkRow {
  return { id: s.id, name: s.name, href: s.href, enabled: s.enabled, sort_order: s.sortOrder };
}
/** All social links (admin). */
export async function getSocialLinks(db: SupabaseClient): Promise<SocialLink[]> {
  const { data, error } = await db.from(SOCIAL).select("*").order("sort_order", { ascending: true });
  if (error) throw new Error(`getSocialLinks: ${error.message}`);
  return (data as SocialLinkRow[]).map(rowToSocial);
}
export async function upsertSocialLink(db: SupabaseClient, s: SocialLink): Promise<SocialLink> {
  const { data, error } = await db.from(SOCIAL).upsert(socialToRow(s), { onConflict: "id" }).select("*").single();
  if (error) throw new Error(`upsertSocialLink: ${error.message}`);
  return rowToSocial(data as SocialLinkRow);
}
export async function deleteSocialLink(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(SOCIAL).delete().eq("id", id);
  if (error) throw new Error(`deleteSocialLink: ${error.message}`);
}
