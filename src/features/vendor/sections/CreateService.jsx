import CreateServiceHeader from "../components/CreateServiceHeader";
import BasicServiceInfo from "../components/BasicServiceInfo";
import PricingAndMetrics from "../components/PricingAndMatrix";
import GalleryUploadSection from "../components/GalleryUploadSection";

function CreateService() {
  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      <CreateServiceHeader />

      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start'
      >
        <div className='lg:col-span-7 flex flex-col gap-6'>
          <BasicServiceInfo />
          <PricingAndMetrics />
        </div>

        <div className='lg:col-span-5'>
          <GalleryUploadSection />
        </div>
      </form>
    </section>
  );
}

export default CreateService;
