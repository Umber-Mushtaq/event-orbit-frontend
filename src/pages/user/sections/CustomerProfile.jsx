import React from "react";
import { useCustomerProfile } from "../hooks/useCustomerProfile";
import { CustomerPictureCard } from "../components/CustomerPicutreCard";
import { CustomerPersonalInfoCard } from "../components/CustomerPersonalInfoCard";
import StatusIndicator from "../../../shared_components/StatusIndecator";

function CustomerProfile() {
  const { formStates, avatar, status, handleSubmit } = useCustomerProfile();

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-16 lg:px-24 relative overflow-hidden flex flex-col justify-start'>
      {/* HEADER SECTION PANEL */}
      <div className='w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5 z-10 relative'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-normal text-3xl text-white tracking-tight'>
            Personal Profile Settings
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400'>
            Update your personal coordinates, account details, and profile
            avatar identity.
          </p>
        </div>

        <button
          type='submit'
          form='customer-profile-form'
          disabled={status.loading}
          className='bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed'
        >
          {status.loading ? "Saving Changes..." : "Save Updates"}
        </button>
      </div>

      {/* FEEDBACK STATUS ENGINE */}
      <StatusIndicator
        error={status.error}
        success={status.success}
        className='w-full max-w-5xl mx-auto mb-6 font-poppins text-xs p-4 rounded-xl z-10 relative'
      />

      {/* SYSTEM SUBMISSION FORM LAYOUT GRID */}
      <form
        id='customer-profile-form'
        onSubmit={handleSubmit}
        className='w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start'
      >
        {/* LEFT COMPONENT ROW SLOTS (Avatar Engine) */}
        <div className='lg:col-span-4 flex flex-col gap-6 w-full'>
          <CustomerPictureCard avatar={avatar} loading={status.loading} />
        </div>

        {/* RIGHT COMPONENT ROW SLOTS (Core Customer Data Inputs) */}
        <div className='lg:col-span-8 flex flex-col gap-6 w-full'>
          <CustomerPersonalInfoCard
            formStates={formStates}
            loading={status.loading}
          />
        </div>
      </form>
    </section>
  );
}

export default CustomerProfile;
