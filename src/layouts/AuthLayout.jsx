import { Link, Outlet } from "react-router";
import { ArrowLeft } from "lucide-react";
import HeroImg from "../assets/hero_bg.jpg";
import ThemeToggle from "../shared_components/ThemeToggle";

function AuthLayout() {
  return (
    <div className='relative flex min-h-screen w-full overflow-hidden bg-background text-foreground lg:flex-row'>
      <div className='relative flex min-h-[60vh] w-full flex-col justify-between overflow-hidden p-8 md:p-12 lg:min-h-screen lg:w-1/2 lg:p-16'>
        <div className='absolute right-4 top-4 z-20'>
          <ThemeToggle />
        </div>
        <Link
          to='/'
          className='absolute left-4 top-5 z-20 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground duration-200 group'
        >
          <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
          Back to Home
        </Link>
        <div className='absolute inset-0 w-full h-full z-0'>
          <img
            src={HeroImg}
            alt='Wedding Celebration'
            className='w-full h-full object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background/80 lg:bg-gradient-to-b lg:from-background/75 lg:via-background/45 lg:to-background/85' />
        </div>

        <div className='relative z-10 my-auto max-w-lg pt-12 text-center lg:pt-0'>
          <h1 className='mb-4 text-balance font-montserrat text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl'>
            Begin Planning Your <br />
            <span className='text-primary'>Dream Wedding</span>
          </h1>
          <p className='text-pretty font-poppins text-sm leading-relaxed text-muted-foreground'>
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

export default AuthLayout;
