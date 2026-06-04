/**
 * Storage abstraction. Swapping providers (R2 → Bunny → S3) is a one-file change:
 * implement `StorageProvider` and point `storage` at it.
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
  }): Promise<UploadResult>;
}

import { r2Provider } from "./r2";

export const storage: StorageProvider = r2Provider;
