import { useServiceDetails } from "../hooks/useServiceDetails";
import ServiceGallery from "../components/ServiceGallery";
import ServiceHeader from "../components/ServiceHeader";
import ServiceDescription from "../components/ServiceDescription";
import ServiceLogistics from "../components/ServiceLogistics";
import ServiceReviewsList from "../components/ServiceReviewsList";

function ServiceDetails() {
  const { service, reviews, loading, error } = useServiceDetails();

  if (loading)
    return (
      <div className='text-white p-10 font-poppins text-center'>
        Loading elegant experience...
      </div>
    );
  if (error)
    return (
      <div className='text-rose-400 p-10 font-poppins text-center'>{error}</div>
    );
  if (!service)
    return (
      <div className='text-stone-400 p-10 font-poppins text-center'>
        No service found.
      </div>
    );

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden flex flex-col justify-start gap-8'>
      <div className='w-full max-w-full mx-auto flex flex-col gap-8 z-10 relative'>
        <ServiceGallery images={service.images} />
        <ServiceHeader service={service} reviews={reviews} />
        <ServiceDescription description={service.description} />
        <ServiceLogistics
          location={service.location}
          capacity={service.capacity}
          serviceId={service._id}
        />
        <ServiceReviewsList reviews={reviews} serviceId={service._id} />
      </div>
    </section>
  );
}

export default ServiceDetails;
