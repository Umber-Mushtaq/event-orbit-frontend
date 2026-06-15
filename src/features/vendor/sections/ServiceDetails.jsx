import ServiceGallery from "../components/ServiceGallery";
import ServiceHeader from "../components/ServiceHeader";
import ServiceDescription from "../components/ServiceDescription";
import ServiceLogistics from "../components/ServiceLogistics";
import ServiceReviewsList from "../components/ServiceReviewsList";
function ServiceDetails() {
  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden flex flex-col justify-start gap-8'>
      <div className='w-full max-w-full mx-auto flex flex-col gap-8 z-10 relative'>
        <ServiceGallery />
        <ServiceHeader />
        <ServiceDescription />
        <ServiceLogistics />
        <ServiceReviewsList />
      </div>
    </section>
  );
}

export default ServiceDetails;
