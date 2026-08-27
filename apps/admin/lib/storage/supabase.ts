import { createServiceClient } from "@chapter/db";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { StorageProvider, UploadResult } from "./index";

/**
 * Single public bucket holding every uploaded image, namespaced by key prefix
 * (`properties/`, `rentals/`, …) rather than split across buckets — one set of
 * storage policies to maintain, one public base URL, and the prefixes mirror
 * the key scheme the admin has always used.
 */
export const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "images";

let _client: SupabaseClient | null = null;
function client(): SupabaseClient {
  // Service role: uploads are already gated by the admin auth check in the
  // upload route, and storage policies only grant public *read*.
  _client ??= createServiceClient();
  return _client;
}

/**
 * Supabase Storage. Objects are served straight from the project's public
 * storage endpoint (`<project>.supabase.co/storage/v1/object/public/<bucket>/…`),
 * which sits behind Supabase's CDN.
 */
export const supabaseProvider: StorageProvider = {
  async upload({ body, key, contentType, upsert = false }): Promise<UploadResult> {
    const { error } = await client()
      .storage.from(BUCKET)
      .upload(key, body, {
        contentType,
        upsert,
        cacheControl: "31536000", // 1 year; keys are immutable
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = client().storage.from(BUCKET).getPublicUrl(key);

    return { url: publicUrl, key };
  },
};
