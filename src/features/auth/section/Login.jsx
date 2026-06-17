import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin.js";
import FormHeader from "../components/FormHeader";
import LoginForm from "../components/LoginForm.jsx";
import StatusIndicator from "../../../global_components/StatusIndicator.jsx";

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
        <FormHeader
          heading='Welcome Back'
          para='Sign in to continue planning your dream wedding.'
        />

        <StatusIndicator success={success} error={error} />

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          onSubmit={handleLoginSubmit}
        />

        {/* Footer Navigation */}
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
