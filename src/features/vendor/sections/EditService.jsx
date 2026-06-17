// components/EditService.jsx
import { useEditService } from "../hooks/useEditService";
import CreateServiceHeader from "../components/CreateServiceHeader";
import BasicServiceInfo from "../components/BasicServiceInfo";
import PricingAndMetrics from "../components/PricingAndMatrix";
import GalleryUploadSection from "../components/GalleryUploadSection";
import { Loader2 } from "lucide-react";
import StatusIndicator from "../../../global_components/StatusIndicator";

function EditService() {
  const serviceForm = useEditService();

  // Show a full-screen loading display while pulling current records from MongoDB
  if (serviceForm.fetchingData) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-3 text-stone-400 font-poppins text-sm'>
        <Loader2 className='w-8 h-8 animate-spin text-border-gold-hover' />
        <span>Fetching package details from marketplace server...</span>
      </div>
    );
  }

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      {/* Passing isEditMode lets your header render "Modify Service Package" instead of "Create" */}
      <CreateServiceHeader isEditMode={serviceForm.isEditMode} />

      <StatusIndicator
        success={serviceForm.success}
        error={serviceForm.error}
      />

      <form
        onSubmit={serviceForm.handleServiceSubmit}
        className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start'
      >
        {/* Left Column Input Sub-modules */}
        <div className='lg:col-span-7 flex flex-col gap-6'>
          <BasicServiceInfo form={serviceForm} />
          <PricingAndMetrics form={serviceForm} />
        </div>

        {/* Right Column Interactive File Attachment Dropzones */}
        <div className='lg:col-span-5'>
          <GalleryUploadSection form={serviceForm} />
        </div>

        {/* Form Submission Action Trigger */}
        <button
          type='submit'
          disabled={serviceForm.loading}
          className='w-full lg:col-span-12 bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3.5 px-6 lg:px-10 lg:py-3 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50 inline-flex items-center justify-center'
        >
          {serviceForm.loading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </section>
  );
}

export default EditService;
