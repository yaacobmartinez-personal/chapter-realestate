/**
 * Shown wherever a listing has no photo yet. Served from each app's `public/`
 * folder, so it costs no request to storage and works offline.
 *
 * Applied at *render* time only — never written to the database. A row with no
 * photo keeps an empty `image`, so it starts showing the real thing the moment
 * one is uploaded, and reports can still tell "no photo" from "has a photo".
 */
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * The image to render for a listing, falling back to the placeholder.
 *
 * Worth routing every card through this: `next/image` throws on an empty
 * `src`, so an image-less row would otherwise break the page it appears on
 * rather than just looking bare.
 */
export function cover(image?: string | null, images?: string[] | null): string {
  return image?.trim() || images?.find((u) => u?.trim()) || PLACEHOLDER_IMAGE;
}

/** True when a listing has no real photo — for "needs a photo" badges. */
export function hasPhoto(image?: string | null, images?: string[] | null): boolean {
  return Boolean(image?.trim() || images?.some((u) => u?.trim()));
}

/**
 * A never-empty image list for carousels. `PropertyCarousel` indexes into the
 * array and divides by its length, so an empty gallery doesn't render an empty
 * state — it throws and takes the whole detail page with it.
 */
export function gallery(images?: string[] | null, image?: string | null): string[] {
  const found = (images ?? []).filter((u) => u?.trim());
  if (found.length) return found;
  return [image?.trim() || PLACEHOLDER_IMAGE];
}
