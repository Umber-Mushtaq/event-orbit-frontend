import { Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin.js";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    loading,
    handleLoginSubmit,
  } = useLogin();

  return (
    <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 z-10 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-white/5'>
      <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-border-gold rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col'>
        <div className='text-center mb-8'>
          <h2 className='font-montserrat font-black text-2xl md:text-3xl text-white tracking-tight'>
            Welcome Back
          </h2>
          <p className='font-poppins font-light text-xs text-light-text mt-2'>
            Sign in to continue planning your dream wedding.
          </p>
        </div>

        {/* Action Status Indicators */}
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

        <form className='flex flex-col gap-5' onSubmit={handleLoginSubmit}>
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

          <div className='relative flex items-center'>
            <Lock className='absolute left-4 w-4 h-4 text-light-text' />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className='w-full bg-neutral-900/50 border border-border-gold rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
              required
            />
          </div>

          <div className='flex justify-end -mt-2'>
            <Link
              to='/auth/forgot-password'
              className='font-poppins text-xs text-stone-400 hover:text-border-gold-hover transition-colors duration-200 cursor-pointer'
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer mt-2 inline-flex items-center justify-center disabled:opacity-50'
          >
            {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : "Sign In"}
          </button>
        </form>

        <div className='text-center mt-6 font-poppins text-xs text-light-text'>
          Don't have an Account?{" "}
          <Link
            to='/auth/register'
            className='text-border-gold-hover font-semibold hover:underline cursor-pointer'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
