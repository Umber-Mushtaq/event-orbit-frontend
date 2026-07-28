import { useLocation, useParams } from "react-router";
import {
  Star,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { ImageGallery } from "../../services/ui/ImageGallery";
import { MapLocation } from "../../services/ui/MapLocation";
import { Reviews } from "../../services/ui/Reviews";
import { usePublicServiceDetails } from "../../../hooks/usePublicServiceDetails";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import VendorCard from "../../public_vendor/ui/VendorCard";
import SEO from "../../../seo/SEO";
import { breadcrumbSchema, localBusinessSchema } from "../../../seo/schema";

export default function PublicServiceDetails() {
  const { id } = useParams();
  const location = useLocation();
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
      <SEO
        title={`${service.title} Services`}
        description={
          service.description ||
          `View ${service.title} service details, vendors, reviews, and location on Event Orbit.`
        }
        keywords={[service.title, service.location, "event service", "vendor booking"]}
        canonical={location.pathname.startsWith("/vendor/") ? location.pathname : `/services/${id}`}
        image={service.images?.[0]}
        type='product'
        robots={location.pathname.startsWith("/vendor/") ? "noindex,nofollow" : "index,follow"}
        schema={[
          localBusinessSchema({
            name: service.title,
            description: service.description,
            image: service.images?.[0],
            url: `/services/${id}`,
            address: service.location,
            telephone: vendor?.phoneNumber,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${id}` },
          ]),
        ]}
      />
      <section className='max-w-7xl mx-auto mt-6'>
        <ImageGallery images={service.images} title={service.title} />
      </section>

      <section className='max-w-7xl mx-auto mt-12'>
        <div className='space-y-10'>
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

      </section>
    </main>
  );
}
