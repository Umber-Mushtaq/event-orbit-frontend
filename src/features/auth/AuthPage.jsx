import { Outlet } from "react-router";
import HeroImg from "../../assets/back-img.png";

import AppLogo from "../home/components/Logo";

function AuthPage() {
  return (
    <div className='min-h-screen w-full bg-neutral-950 text-white flex flex-col lg:flex-row relative overflow-hidden'>
      <div className='w-full lg:w-1/2 relative min-h-[60vh] lg:min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden'>
        <div className='absolute inset-0 w-full h-full z-0'>
          <img
            src={HeroImg}
            alt='Wedding Celebration'
            className='w-full h-full object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient lg:bg-gradient bg-black/60 ' />
        </div>

        <div className='my-auto z-10 max-w-lg pt-12 lg:pt-0 relative text-center'>
          <h1 className='font-montserrat font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-balance text-white'>
            Begin Planning Your <br />
            <span className='text-border-gold drop-shadow-[0_2px_15px_rgba(251,191,36,0.5)]'>
              Dream Wedding
            </span>
          </h1>
          <p className='font-poppins font-light text-sm text-stone-200 leading-relaxed text-pretty'>
            Join thousands of couples discovering trusted wedding professionals
            and creating unforgettable celebrations.
          </p>
        </div>
        <div className='hidden lg:block h-4 z-10' />
      </div>
      <Outlet />
    </div>
  );
}

export default AuthPage;
