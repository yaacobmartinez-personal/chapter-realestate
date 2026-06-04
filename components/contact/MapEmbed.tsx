"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

const OFFICE = {
  lng: -97.1384,
  lat: 49.8954,
  label: "Main Office",
  address: "123 Portage Ave, Suite 400, Winnipeg, MB",
};

export default function MapEmbed() {
  return (
    <section className="relative h-[520px] w-full">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: OFFICE.lng, latitude: OFFICE.lat, zoom: 14 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        <Marker longitude={OFFICE.lng} latitude={OFFICE.lat} anchor="bottom">
          <div className="flex flex-col items-center group cursor-default">
            <div className="bg-black text-white text-xs font-light tracking-wide px-3 py-1.5 mb-1.5 whitespace-nowrap shadow-lg group-hover:bg-[#c8a96e] transition-colors duration-200">
              {OFFICE.address}
            </div>
            <div className="w-3 h-3 bg-[#c8a96e] rotate-45 -mt-1 shadow-md" />
          </div>
        </Marker>
      </Map>

      {/* Office info overlay */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-sm pointer-events-none">
        <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-1">{OFFICE.label}</p>
        <p className="flex items-center gap-2 text-sm font-light text-black">
          <MapPin size={13} className="text-[#c8a96e] flex-shrink-0" />
          {OFFICE.address}
        </p>
      </div>
    </section>
  );
}
