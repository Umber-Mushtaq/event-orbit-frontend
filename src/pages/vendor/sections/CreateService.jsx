import { useCreateService } from "../hooks/useCreateService";
import CreateServiceHeader from "../components/CreateServiceHeader";
import BasicServiceInfo from "../components/BasicServiceInfo";
import PricingAndMetrics from "../components/PricingAndMatrix";
import GalleryUploadSection from "../components/GalleryUploadSection";
import { Loader2 } from "lucide-react";

function CreateService() {
  const serviceForm = useCreateService();

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      <CreateServiceHeader />

      {/* Inline Feedback Alerts */}
      {serviceForm.error && (
        <div className='max-w-6xl mx-auto mb-6 text-center text-xs font-poppins text-red-400 bg-red-500/10 border border-red-500/20 py-2.5 rounded-xl'>
          {serviceForm.error}
        </div>
      )}
      {serviceForm.success && (
        <div className='max-w-6xl mx-auto mb-6 text-center text-xs font-poppins text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 rounded-xl'>
          {serviceForm.success}
        </div>
      )}

      <form
        onSubmit={serviceForm.handleServiceSubmit}
        className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start'
      >
        {/* Left Column Fields Column */}
        <div className='lg:col-span-7 flex flex-col gap-6'>
          <BasicServiceInfo form={serviceForm} />
          <PricingAndMetrics form={serviceForm} />
        </div>

        {/* Right Column Files Column */}
        <div className='lg:col-span-5'>
          <GalleryUploadSection form={serviceForm} />
        </div>
        <button
          type='submit'
          disabled={serviceForm.loading}
          className='w-full lg:col-span-12 bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3.5 px-6 lg:px-10 lg:py-3 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50 inline-flex items-center justify-center'
        >
          {serviceForm.loading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            "Publish"
          )}
        </button>
      </form>
    </section>
  );
}

export default CreateService;
