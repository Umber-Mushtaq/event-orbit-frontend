import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const GEO_CACHE = { "new york, ny": [40.7128, -74.006] };
const DEFAULT_FALLBACK = [31.5204, 74.3587]; // Lahore

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 13, { animate: true });
  }, [position, map]);
  return null;
}

export default function InteractiveMap({ location }) {
  const [mapCoordinates, setMapCoordinates] = useState(() => {
    const normalized = String(location || "")
      .toLowerCase()
      .trim();
    return GEO_CACHE[normalized] || DEFAULT_FALLBACK;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const normalizedAddress = location.toLowerCase().trim();
    if (GEO_CACHE[normalizedAddress]) {
      setMapCoordinates(GEO_CACHE[normalizedAddress]);
      return;
    }

    const controller = new AbortController();
    const fetchCoordinates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
          { signal: controller.signal },
        );
        const data = await response.json();

        if (data?.[0]) {
          const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          GEO_CACHE[normalizedAddress] = coords;
          setMapCoordinates(coords);
        }
      } catch (error) {
        if (error.name !== "AbortError")
          console.error("Geocoding failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
    return () => controller.abort();
  }, [location]);

  return (
    <div className='w-full grow min-h-[220px] bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden mt-2 relative z-0 shadow-inner'>
      {isLoading && (
        <div className='absolute inset-0 bg-neutral-950/60 backdrop-blur-sm z-30 flex items-center justify-center text-xs font-poppins text-stone-400'>
          Locating venue on map...
        </div>
      )}

      <MapContainer
        center={mapCoordinates}
        zoom={13}
        scrollWheelZoom={false}
        className='w-full h-full absolute inset-0'
      >
        <RecenterMap position={mapCoordinates} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        <Marker position={mapCoordinates}>
          <Popup>
            <div className='font-poppins text-xs font-semibold text-neutral-900 p-0.5'>
              {location}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
