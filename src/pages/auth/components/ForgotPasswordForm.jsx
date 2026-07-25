import { Mail, Loader2 } from "lucide-react";

function ForgotPasswordForm({ email, setEmail, loading, onSubmit }) {
  return (
    <>
      {/* Form Submission */}
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
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
    </>
  );
}

export default ForgotPasswordForm;
