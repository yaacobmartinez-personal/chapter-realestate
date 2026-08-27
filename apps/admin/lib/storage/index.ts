/**
 * Storage abstraction. Swapping providers (Supabase → Bunny → S3) is a one-file
 * change: implement `StorageProvider` and point `storage` at it.
 */
export interface UploadResult {
  url: string;
  key: string;
}

export interface StorageProvider {
  upload(file: {
    body: Buffer;
    key: string;
    contentType: string;
    /**
     * Overwrite an existing object at `key`. Off by default: CMS uploads use
     * UUID keys, so a collision there means a bug. Seed scripts use stable,
     * meaningful keys and turn this on to stay re-runnable.
     */
    upsert?: boolean;
  }): Promise<UploadResult>;
}

import { supabaseProvider } from "./supabase";

export const storage: StorageProvider = supabaseProvider;
