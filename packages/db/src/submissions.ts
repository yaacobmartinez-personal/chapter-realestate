import type { SupabaseClient } from "@supabase/supabase-js";

const TABLE = "form_submissions";

export type FormType = "contact" | "property-inquiry" | "recruitment";

export interface FormSubmissionInput {
  formType: FormType;
  fields: Record<string, string>;
}

/**
 * Persist a public form submission. RLS blocks anonymous access, so this must
 * be called with a service-role client (see `createServiceClient`) from a
 * server context only.
 */
export async function createSubmission(
  db: SupabaseClient,
  input: FormSubmissionInput,
): Promise<void> {
  const { error } = await db.from(TABLE).insert({
    form_type: input.formType,
    fields: input.fields,
  });
  if (error) throw new Error(`createSubmission: ${error.message}`);
}
