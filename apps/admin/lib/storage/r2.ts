import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { StorageProvider, UploadResult } from "./index";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

let _client: S3Client | null = null;
function client(): S3Client {
  if (_client) return _client;
  _client = new S3Client({
    region: "auto",
    endpoint: `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env("R2_ACCESS_KEY_ID"),
      secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    },
  });
  return _client;
}

/**
 * Cloudflare R2 (S3-compatible). Objects are served from a public domain /
 * Cloudflare CDN configured on the bucket (R2_PUBLIC_BASE_URL).
 */
export const r2Provider: StorageProvider = {
  async upload({ body, key, contentType }): Promise<UploadResult> {
    await client().send(
      new PutObjectCommand({
        Bucket: env("R2_BUCKET"),
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    const base = env("R2_PUBLIC_BASE_URL").replace(/\/$/, "");
    return { url: `${base}/${key}`, key };
  },
};
