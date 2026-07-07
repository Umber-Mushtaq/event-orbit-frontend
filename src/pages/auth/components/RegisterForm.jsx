import { User, Mail, Lock, Loader2 } from "lucide-react";

function RegisterForm({
  formData,
  isVendor,
  loading,
  onInputChange,
  onCheckboxChange,
  onSubmit,
}) {
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
