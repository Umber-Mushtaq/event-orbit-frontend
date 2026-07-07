import ServiceCalendar from "../sections/ServiceCalender";
import LocationMeta from "../components/LocationMeta";
import InteractiveMap from "../components/InteractiveMap";

export default function ServiceLogistics({ location, capacity, serviceId }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start'>
      {/* Left Structural Column Panel Box */}
      <div className='lg:col-span-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col gap-4 h-full min-h-[400px]'>
        <h3 className='font-montserrat font-bold text-lg text-white tracking-wide border-b border-white/5 pb-3'>
          Logistics & Location
        </h3>

        {/* Text Block Layer */}
        <LocationMeta location={location} capacity={capacity} />

        {/* Leaflet Map Logic Layer */}
        <InteractiveMap location={location} />
      </div>

      {/* Right Structural Column Panel Box */}
      <div className='lg:col-span-6 flex justify-center lg:justify-end h-full w-full'>
        <ServiceCalendar serviceId={serviceId} />
      </div>
    </div>
  );
}
