import { MapPin } from "lucide-react";

interface PropertyMapProps {
  lng: number;
  lat: number;
  address: string;
  city?: string;
  province?: string;
}

/**
 * Google Maps as a plain iframe — no JS library, and no API key required.
 *
 * Two embed URLs, picked automatically:
 *
 *   1. No key (the default): `maps?q=…&output=embed`. This endpoint has served
 *      keyless embeds for years and is what most "embed a map" snippets use,
 *      but Google does not document it and gives it no support commitment, so
 *      it could change without notice.
 *   2. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` set: the official Maps Embed API.
 *      Supported and documented; usage is free of charge, though creating the
 *      key means setting up a Google Maps Platform project.
 *
 * Setting the key is the only step needed to move to the supported path — no
 * code change. Either way the trade-off versus the old Mapbox version is
 * Google's standard pin: the custom gold marker isn't expressible in an embed.
 *
 * The contact page's office map is still Mapbox (`components/contact/MapEmbed`),
 * so `mapbox-gl` remains a dependency.
 */

/**
 * Google resolves a text address more reliably than a coordinate pair for a
 * street listing, so prefer it. Coordinates are the fallback, and `0,0` — what
 * the admin form stores for an empty lat/lng — counts as unset, not as a real
 * point in the Gulf of Guinea.
 */
function mapQuery({ lng, lat, address, city, province }: PropertyMapProps): string | null {
  const parts = [address, city, province].map((p) => p?.trim()).filter(Boolean);
  if (parts.length) return parts.join(", ");
  if (lat !== 0 || lng !== 0) return `${lat},${lng}`;
  return null;
}

export default function PropertyMap(props: PropertyMapProps) {
  const { address } = props;
  const query = mapQuery(props);
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Nothing to point at — drop the section rather than render a map of nowhere.
  if (!query) return null;

  const encoded = encodeURIComponent(query);
  const src = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encoded}&zoom=15`
    : `https://www.google.com/maps?q=${encoded}&z=15&output=embed`;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">Location</p>
          <h2 className="text-3xl font-light text-black">Neighbourhood Map</h2>
        </div>

        <div className="relative h-[480px] overflow-hidden bg-gray-100">
          <iframe
            title={`Map of ${address || query}`}
            src={src}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Address overlay */}
          <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center gap-2 shadow-sm pointer-events-none">
            <MapPin size={13} className="text-[#c8a96e] flex-shrink-0" />
            <span className="text-xs font-light text-gray-700 tracking-wide">{address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
