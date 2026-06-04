"use client";

import { useRef, useCallback } from "react";
import Map, { Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

interface PropertyMapProps {
  lng: number;
  lat: number;
  address: string;
}

export default function PropertyMap({ lng, lat, address }: PropertyMapProps) {
  const mapRef = useRef<MapRef>(null);

  const handleLoad = useCallback(() => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 15, duration: 0 });
  }, [lng, lat]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">Location</p>
          <h2 className="text-3xl font-light text-black">Neighbourhood Map</h2>
        </div>

        <div className="relative h-[480px] overflow-hidden">
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{ longitude: lng, latitude: lat, zoom: 14.5 }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            onLoad={handleLoad}
            attributionControl={false}
          >
            <NavigationControl position="bottom-right" showCompass={false} />

            <Marker longitude={lng} latitude={lat} anchor="bottom">
              <div className="flex flex-col items-center group cursor-default">
                {/* Address bubble */}
                <div className="bg-black text-white text-xs font-light tracking-wide px-3 py-1.5 mb-1.5 whitespace-nowrap shadow-lg group-hover:bg-[#c8a96e] transition-colors duration-200">
                  {address}
                </div>
                {/* Pin */}
                <div className="w-3 h-3 bg-[#c8a96e] rotate-45 -mt-1 shadow-md" />
              </div>
            </Marker>
          </Map>

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
