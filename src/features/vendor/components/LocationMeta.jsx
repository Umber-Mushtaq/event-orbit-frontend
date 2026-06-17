import { MapPin, Users } from "lucide-react";

export default function LocationMeta({ location, capacity }) {
  return (
    <div className='flex flex-col gap-3 font-poppins text-stone-300 text-sm'>
      {/* Dynamic Address Label */}
      <div className='flex items-center gap-2'>
        <MapPin className='w-4 h-4 text-border-gold shrink-0' />
        <span className='truncate'>{location || "Address not specified."}</span>
      </div>

      {/* Dynamic Capacity Badging */}
      {capacity && (
        <div className='flex items-center gap-2 border-t border-white/5 pt-3 mt-1'>
          <Users className='w-4 h-4 text-border-gold shrink-0' />
          <span>
            Guest Capacity:{" "}
            <strong className='text-white font-semibold'>
              {capacity.toLocaleString()} guests
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
