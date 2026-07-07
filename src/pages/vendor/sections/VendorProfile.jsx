import { useVendorProfile } from "../hooks/useVendorProfile";
import { AccountPictureCard } from "../components/AccountPIctureCard";
import { BusinessInfoCard } from "../components/BusinessInfoCard";
import { PersonalInfoCard } from "../components/PersonalInfoCard";
import { SocialFootprintCard } from "../components/SocialFootPrintCard";
import StatusIndicator from "../../../shared_components/StatusIndecator";

function VendorProfile() {
  const { formStates, avatar, status, handleSubmit } = useVendorProfile();

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-16 lg:px-24 relative overflow-hidden flex flex-col justify-start'>
      <div className='w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5 z-10 relative'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-normal text-3xl text-white tracking-tight'>
            Profile Settings
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
            Update personal accounts, register corporate info, and configure
            external contact metrics.
          </p>
        </div>

        <button
          type='submit'
          form='profile-edit-form'
          disabled={status.loading}
          className='bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed'
        >
          {status.loading ? "Saving Changes..." : "Save Updates"}
        </button>
      </div>

      <StatusIndicator
        error={status.error}
        success={status.success}
        className='w-full max-w-5xl mx-auto mb-6 font-poppins text-xs p-4 rounded-xl z-10 relative'
      />

      {/* 2. MAIN CORE FORMS GRID LAYOUT INTERFACE */}
      <form
        id='profile-edit-form'
        onSubmit={handleSubmit}
        className='w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start'
      >
        {/* LEFT COMPONENT COLUMN GRID (5 Slots) */}
        <div className='lg:col-span-5 flex flex-col gap-6 w-full'>
          <AccountPictureCard avatar={avatar} loading={status.loading} />
          <BusinessInfoCard formStates={formStates} loading={status.loading} />
        </div>

        {/* RIGHT COMPONENT COLUMN GRID (7 Slots) */}
        <div className='lg:col-span-7 flex flex-col gap-6 w-full'>
          <PersonalInfoCard formStates={formStates} loading={status.loading} />
          <SocialFootprintCard
            formStates={formStates}
            loading={status.loading}
          />
        </div>
      </form>
    </section>
  );
}

export default VendorProfile;
