import React from "react";
import { MapPin } from "lucide-react";

export function ServiceDetailsMap({ locationName, coordinates }) {
  const encodedLocation = encodeURIComponent(
    locationName || "Lahore, Pakistan",
  );

  const mapSrcUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className='w-full h-72 rounded-xl overflow-hidden border border-neutral-200 relative bg-neutral-10 group'>
      <iframe
        title='EventOrbit Navigation Map View'
        width='100%'
        height='100%'
        frameBorder='0'
        scrolling='no'
        marginHeight='0'
        marginWidth='0'
        src={mapSrcUrl}
        className='w-full h-full opacity-95 group-hover:opacity-100 transition-opacity duration-300'
      />

      <div className='absolute bottom-3 left-3 bg-white/95 border border-neutral-200/80 px-3 py-1.5 rounded-lg z-20 flex items-center gap-2 pointer-events-none shadow-md backdrop-blur-md'>
        <MapPin className='w-3.5 h-3.5 text-blue-600 animate-bounce' />
        <span className='text-[11px] text-neutral-800 font-semibold tracking-wide uppercase font-mono'>
          {locationName || "LAHORE, PAKISTAN"}
        </span>
      </div>
    </div>
  );
}
