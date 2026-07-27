import { useParams } from "react-router";
import {
  Star,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { ImageGallery } from "../../services/ui/ImageGallery";
import { MapLocation } from "../../services/ui/MapLocation";
import { VendorProfile } from "../../services/ui/VendorProfile";
import { Reviews } from "../../services/ui/Reviews";
import { usePublicServiceDetails } from "../../../hooks/usePublicServiceDetails";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import VendorCard from "../../public_vendor/ui/VendorCard";

export default function PublicServiceDetails() {
  const { id } = useParams();
  const { service, vendor, reviews, relatedVendors, loading, error, refetch } =
    usePublicServiceDetails(id);

  if (loading) {
    return <CustomLoading msg='Loading Data' />;
  }

  if (error || !service) {
    return <CustomError msg='Something went wrong while loading Service' />;
  }

  return (
    <main className='min-h-screen w-full bg-neutral-950 text-white font-poppins antialiased pb-24 selection:bg-amber-500 selection:text-black'>
      <section className='max-w-7xl mx-auto mt-6'>
        <ImageGallery images={service.images} title={service.title} />
      </section>

      <section className='max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
        <div className='lg:col-span-2 space-y-10'>
          <div className='bg-neutral-900/50  p-6 rounded-2xl '>
            <div className='inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-4 shadow-sm backdrop-blur-md'>
              <Award className='w-3.5 h-3.5 animate-pulse' /> Verified Premium
              Platform Service
            </div>
            <h1 className='font-montserrat font-black text-3xl md:text-5xl tracking-wide uppercase leading-tight bg-gradient-to-r from-white via-white to-stone-400 bg-clip-text text-transparent'>
              {service.title}
            </h1>

            <div className='flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-white/30 text-xs text-stone-400'>
              <div className='flex items-center gap-3 py-1.5 rounded-full '>
                <MapPin className='w-4 h-4 text-amber-500' />
                <span className='text-stone-200 font-medium'>
                  {service.location}
                </span>
              </div>
              <div className='flex items-center gap-2 px-3 py-1.5 rounded-full'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.round(service.averageRating || 5) ? "text-amber-400 fill-amber-400" : "text-stone-400"}`}
                    />
                  ))}
                </div>
                <span className='text-stone-300 font-bold font-mono text-xs tracking-wide'>
                  ({reviews.length} VERIFIED REVIEWS)
                </span>
              </div>
            </div>
          </div>

          <div className=' transition-all duration-300  p-8 relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <div className='flex items-center gap-2 mb-4'>
              <Sparkles className='w-4 h-4 text-amber-500/70' />
              <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
                Service Overview
              </h3>
            </div>
            <p className='text-stone-400 text-sm leading-relaxed whitespace-pre-line font-normal pl-6 '>
              {service.description ||
                "No description provided for this luxury listing."}
            </p>
          </div>

          <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <div className='flex flex-col mb-6'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-amber-500/70' />
                <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
                  Service Location Map
                </h3>
              </div>
              <p className='text-sm text-stone-400 font-normal mt-1 pl-6'>
                Exclusively showing localized coordinates inside operating
                sectors.
              </p>
            </div>
            <div className='rounded-xl overflow-hidden  p-1 '>
              <MapLocation
                locationName={service.location}
                coordinates={service.coordinates}
              />
            </div>
          </div>

          <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <div className='flex flex-col mb-6'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='w-4 h-4 text-amber-500/70' />
                <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
                  Related Vendors
                </h3>
              </div>
              <p className='text-sm text-stone-400 font-normal mt-1 pl-6'>
                Verified vendors offering services in this category.
              </p>
            </div>

            {relatedVendors?.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {relatedVendors.map((relatedVendor) => (
                  <VendorCard key={relatedVendor._id} vendor={relatedVendor} />
                ))}
              </div>
            ) : (
              <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-stone-400'>
                No related vendors are available for this service yet.
              </div>
            )}
          </div>

          {/* Reviews Section Wrapper */}
          <div className=' p-2 '>
            <Reviews
              reviews={reviews}
              serviceId={service.id}
              vendorId={vendor?._id}
              onReviewSubmitted={refetch}
            />
          </div>
        </div>

        {/* Right Side: Sticky Checkout / Booking Panel Container */}
        <div className='space-y-8 lg:sticky lg:top-6'>
          <div className='bg-neutral-900/80 border border-amber-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden group'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent' />

            <span className='text-[10px] text-amber-500/70 uppercase tracking-widest font-black block mb-2 font-mono'>
              STARTING CONFIGURATION BASE
            </span>
            <div className='flex items-baseline gap-2 mb-6 border-b border-white/5 pb-4'>
              <span className='text-4xl font-montserrat font-black text-white tracking-tight'>
                Rs. {service.price?.toLocaleString()}
              </span>
              <span className='text-xs text-stone-400 font-medium capitalize font-mono'>
                /{service.priceType || "fixed"}
              </span>
            </div>

            <button className='w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-montserrat font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_4px_30px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer active:scale-[0.99]'>
              Secure Direct Booking
            </button>

            <div className='flex items-start gap-2 mt-5 text-[11px] text-stone-400/90 leading-relaxed bg-neutral-950/40 p-3 rounded-lg border border-white/5'>
              <ShieldCheck className='w-4 h-4 text-amber-500 shrink-0 mt-0.5' />
              <span>
                Protected transactions and verified delivery guaranteed under
                EventOrbit booking policies.
              </span>
            </div>
          </div>

          {/* Sticky Vendor Profile Component Placement */}
          <div className='transition-all duration-300 hover:scale-[1.01]'>
            <VendorProfile vendor={vendor} />
          </div>
        </div>
      </section>
    </main>
  );
}
