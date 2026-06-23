import { Link } from "react-router";
import { useRegister } from "../hooks/useRegister.js";
import FormHeader from "../components/FormHeader.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import StatusIndicator from "../../../global_components/StatusIndicator.jsx";

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
        <FormHeader
          heading='Create Your Account'
          para='Start your wedding journey today.'
        />

        <StatusIndicator error={error} success={success} />

        <RegisterForm
          formData={formData}
          isVendor={isVendor}
          loading={loading}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onSubmit={handleRegisterSubmit}
        />

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
