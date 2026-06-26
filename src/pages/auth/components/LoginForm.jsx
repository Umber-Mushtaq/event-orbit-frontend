import { Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router";

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSubmit,
}) {
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Forgot Password Link */}
      <div className='flex justify-end -mt-2'>
        <Link
          to='/auth/forgot-password'
          className='font-poppins text-xs text-stone-400 hover:text-border-gold-hover transition-colors duration-200 cursor-pointer'
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3 px-6 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer mt-2 inline-flex items-center justify-center disabled:opacity-50'
      >
        {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
