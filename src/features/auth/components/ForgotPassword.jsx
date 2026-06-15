import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useForgotPassword } from "../hooks/useForgotPassword.js";

function ForgotPassword() {
  const {
    email,
    setEmail,
    error,
    success,
    loading,
    handleForgotPasswordSubmit,
  } = useForgotPassword();

  return (
    <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 z-10 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-white/5'>
      <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-border-gold rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col'>
        <div className='mb-6'>
          <Link
            to='/auth/login'
            className='inline-flex items-center gap-2 font-poppins text-xs text-stone-400 hover:text-border-gold-hover transition-colors duration-200 cursor-pointer group'
          >
            <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            Back to Sign In
          </Link>
        </div>

        <div className='text-center mb-8'>
          <h2 className='font-montserrat font-black text-2xl md:text-3xl text-white tracking-tight'>
            Reset Password
          </h2>
          <p className='font-poppins font-light text-xs text-light-text mt-2 leading-relaxed'>
            Enter your email address below and we'll send you a secure link to
            reset your wedding planner password.
          </p>
        </div>

        {/* Dynamic Feedback Messaging */}
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

        <form
          className='flex flex-col gap-5'
          onSubmit={handleForgotPasswordSubmit}
        >
          <div className='relative flex items-center'>
            <Mail className='absolute left-4 w-4 h-4 text-light-text' />
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer mt-2 inline-flex items-center justify-center disabled:opacity-50'
          >
            {loading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
