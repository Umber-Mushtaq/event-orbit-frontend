import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Loader2,
  Building2,
  FileText,
  Image,
  Upload,
  X,
} from "lucide-react";

function RegisterForm({
  formData,
  isVendor,
  loading,
  onInputChange,
  onCheckboxChange,
  onSubmit,
}) {
  // Handle local state for the preview string
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Generate local URL for previewing on screen
      setImagePreview(URL.createObjectURL(file));

      // 2. Pass the file object up to your form handler hook
      onInputChange({
        target: {
          name: "profileImage",
          value: file, // Store the raw file object for backend uploading
        },
      });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onInputChange({
      target: {
        name: "profileImage",
        value: "",
      },
    });
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      {/* Name Input Row */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='w-full relative flex items-center'>
          <User className='absolute left-4 w-4 h-4 text-stone-500' />
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={onInputChange}
            disabled={loading}
            className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
            required
          />
        </div>
        <div className='w-full relative flex items-center'>
          <User className='absolute left-4 w-4 h-4 text-stone-500' />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={onInputChange}
            disabled={loading}
            className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div className='relative flex items-center'>
        <Mail className='absolute left-4 w-4 h-4 text-stone-500' />
        <input
          type='email'
          name='email'
          placeholder='Email Address'
          value={formData.email}
          onChange={onInputChange}
          disabled={loading}
          className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          required
        />
      </div>

      {/* Password Input */}
      <div className='relative flex items-center'>
        <Lock className='absolute left-4 w-4 h-4 text-stone-500' />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={onInputChange}
          disabled={loading}
          className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          required
        />
      </div>

      {/* Vendor Toggle */}
      <label className='flex items-start gap-3 cursor-pointer mt-1 group'>
        <input
          type='checkbox'
          checked={isVendor}
          onChange={onCheckboxChange}
          disabled={loading}
          className='w-4 h-4 mt-0.5 rounded border-border-gold accent-border-gold text-neutral-950 bg-neutral-900 focus:ring-0 cursor-pointer'
        />
        <span className='font-poppins font-light text-xs text-stone-400 leading-normal group-hover:text-stone-300 transition-colors'>
          Check this if you want to register as vendor.
        </span>
      </label>

      {/* Dynamic Extra Vendor Fields */}
      {isVendor && (
        <div className='flex flex-col gap-5 animate-fadeIn transition-all duration-300 border-l-2 border-border-gold/30 pl-3 ml-0.5'>
          {/* Business Name */}
          <div className='relative flex items-center'>
            <Building2 className='absolute left-4 w-4 h-4 text-stone-500' />
            <input
              type='text'
              name='businessName'
              placeholder='Business Name'
              value={formData.businessName || ""}
              onChange={onInputChange}
              disabled={loading}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
              required={isVendor}
            />
          </div>

          {/* Profile Image File Picker & Preview */}
          <div className='flex flex-col gap-2'>
            {!imagePreview ? (
              // Upload Placeholder Click Zone
              <label className='relative flex flex-col items-center justify-center w-full h-24 bg-neutral-900/30 border border-dashed border-border-gold/60 rounded-xl cursor-pointer hover:bg-neutral-900/60 transition duration-200 group/upload'>
                <div className='flex flex-col items-center justify-center pt-2 pb-2 text-center px-4'>
                  <Upload className='w-5 h-5 text-stone-500 group-hover/upload:text-border-gold transition-colors mb-1' />
                  <p className='text-xs text-stone-400 font-poppins'>
                    <span className='font-semibold text-border-gold'>
                      Click to upload
                    </span>{" "}
                    profile picture
                  </p>
                  <p className='text-[10px] text-stone-500 font-poppins mt-0.5'>
                    PNG, JPG, or WEBP
                  </p>
                </div>
                <input
                  type='file'
                  name='profileImage'
                  accept='image/*'
                  disabled={loading}
                  onChange={handleFileChange}
                  className='hidden'
                />
              </label>
            ) : (
              // Active Preview Screen Element
              <div className='relative flex items-center gap-4 bg-neutral-900/50 border border-border-gold p-3 rounded-xl animate-fadeIn'>
                <img
                  src={imagePreview}
                  alt='Profile Preview'
                  className='w-14 h-14 object-cover rounded-lg border border-border-gold/50 shadow-md'
                />
                <div className='flex flex-col flex-1 min-w-0'>
                  <p className='text-xs font-semibold text-white truncate font-poppins'>
                    {formData.profileImage?.name || "Selected Image"}
                  </p>
                  <p className='text-[10px] text-stone-400 font-poppins'>
                    Ready for upload
                  </p>
                </div>
                <button
                  type='button'
                  onClick={removeImage}
                  disabled={loading}
                  className='p-1.5 rounded-md bg-stone-900 border border-stone-800 text-stone-400 hover:text-rose-400 transition-colors'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            )}
          </div>

          {/* Business Description */}
          <div className='relative flex items-start'>
            <FileText className='absolute left-4 top-3.5 w-4 h-4 text-stone-500' />
            <textarea
              name='businessDescription'
              placeholder='Tell us briefly about your services...'
              value={formData.businessDescription || ""}
              onChange={onInputChange}
              disabled={loading}
              rows={3}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins resize-none'
              required={isVendor}
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer mt-2 inline-flex items-center justify-center disabled:opacity-50'
      >
        {loading ? (
          <Loader2 className='w-5 h-5 animate-spin' />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
