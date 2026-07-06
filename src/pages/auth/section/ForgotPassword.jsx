import { useForgotPassword } from "../hooks/useForgotPassword.js";
import FormHeader from "../components/FormHeader.jsx";
import ForgotPasswordForm from "../components/ForgotPasswordForm.jsx";
import StatusIndicator from "../../../shared_components/StatusIndecator.jsx";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
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
      <div className='w-full max-w-md bg-neutral-900 backdrop-blur-md border border-border-gold rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col'>
        <div className='mb-6'>
          <Link
            to='/auth/login'
            className='inline-flex items-center gap-2 font-poppins text-xs text-stone-400 hover:text-border-gold-hover transition-colors duration-200 cursor-pointer group'
          >
            <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            Back to Sign In
          </Link>
        </div>
        <FormHeader
          heading='Reset Password'
          para="Enter your email address below and we'll send you a secure link to reset your wedding planner password."
        />

        <StatusIndicator success={success} error={error} />

        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          onSubmit={handleForgotPasswordSubmit}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
