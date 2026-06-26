import { useResetPassword } from "../hooks/useResetPassword";
import FormHeader from "../components/FormHeader.jsx";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";
import StatusIndicator from "../../../shared_components/StatusIndecator.jsx";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

function ResetPassword() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleResetSubmit,
  } = useResetPassword();

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
          heading='Set New Password'
          para='Please enter your new password below. Make sure it is secure and unique.'
        />

        <StatusIndicator success={success} error={error} />

        <ResetPasswordForm
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loading}
          onSubmit={handleResetSubmit}
        />
      </div>
    </div>
  );
}

export default ResetPassword;
