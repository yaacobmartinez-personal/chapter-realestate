import sharp from "sharp";

/**
 * Every uploaded image is normalised to WebP before it reaches storage:
 * it beats JPEG/PNG on size at equal quality, is supported by every browser
 * we target, and gives us one content type to reason about downstream.
 *
 * The web app serves images unoptimized (Cloudflare Workers has no
 * `/_next/image`), so whatever we store here is exactly what visitors
 * download — the shrinking has to happen at upload time.
 */
const MAX_EDGE = 2400; // longest side, px — plenty for a full-bleed hero
const QUALITY = 72;

export interface OptimizedImage {
  body: Buffer;
  contentType: "image/webp";
  ext: "webp";
  width: number;
  height: number;
  /** Size of the original upload, for logging the savings. */
  originalBytes: number;
}

/**
 * Downscale to `MAX_EDGE`, strip metadata (EXIF/GPS/ICC bloat), and re-encode
 * as WebP. Never upscales — a small image stays its own size.
 */
export async function optimizeImage(input: Buffer): Promise<OptimizedImage> {
  const pipeline = sharp(input, { failOn: "error" })
    // Honour the EXIF orientation flag before we throw the metadata away.
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: QUALITY,
      // `effort: 6` buys a few extra percent for ~2x the CPU time; worth it
      // on an admin upload that happens once per image.
      effort: 6,
      smartSubsample: true,
    });

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    body: data,
    contentType: "image/webp",
    ext: "webp",
    width: info.width,
    height: info.height,
    originalBytes: input.byteLength,
  };
}
