import { User, Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useRegister } from "../hooks/useRegister.js";

function Register() {
  const {
    formData,
    isVendor,
    error,
    success,
    loading,
    handleInputChange,
    handleCheckboxChange,
    handleRegisterSubmit,
  } = useRegister();

  return (
    <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 z-10 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-white/5'>
      <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-border-gold rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col'>
        <div className='text-center mb-8'>
          <h2 className='font-montserrat font-black text-2xl md:text-3xl text-white tracking-tight'>
            Create Your Account
          </h2>
          <p className='font-poppins font-light text-xs text-stone-400 mt-2'>
            Start your wedding journey today.
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className='mb-4 text-center text-xs font-poppins text-red-400 bg-red-500/10 border border-red-500/20 py-2.5 rounded-xl'>
            {error}
          </div>
        )}
        {success && (
          <div className='mb-4 text-center text-xs font-poppins text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 rounded-xl'>
            {success}
          </div>
        )}

        <form className='flex flex-col gap-5' onSubmit={handleRegisterSubmit}>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='w-full relative flex items-center'>
              <User className='absolute left-4 w-4 h-4 text-stone-500' />
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                disabled={loading}
                className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
                required
              />
            </div>
          </div>

          <div className='relative flex items-center'>
            <Mail className='absolute left-4 w-4 h-4 text-stone-500' />
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
              required
            />
          </div>

          <div className='relative flex items-center'>
            <Lock className='absolute left-4 w-4 h-4 text-stone-500' />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
              required
            />
          </div>

          <label className='flex items-start gap-3 cursor-pointer mt-1 group'>
            <input
              type='checkbox'
              checked={isVendor}
              onChange={handleCheckboxChange}
              disabled={loading}
              className='w-4 h-4 mt-0.5 rounded border-border-gold accent-border-gold text-neutral-950 bg-neutral-900 focus:ring-0 cursor-pointer'
            />
            <span className='font-poppins font-light text-xs text-stone-400 leading-normal group-hover:text-stone-300 transition-colors'>
              Check this if you want to register as vendor.
            </span>
          </label>

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

        <div className='text-center mt-6 font-poppins text-xs text-light-text'>
          Already have an account?{" "}
          <Link
            to='/auth/login'
            className='text-border-gold-hover font-semibold hover:underline cursor-pointer'
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
