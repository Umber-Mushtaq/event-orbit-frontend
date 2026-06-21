import { useState, useEffect } from "react";
import { Link } from "react-router";
import AvatarPlaceholder from "../../../assets/avatar3.jpg";

export function UserDashboardHeader() {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 z-10 relative'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-montserrat font-black text-2xl md:text-3xl text-white tracking-tight'>
          Welcome,{" "}
          <span className='bg-linear-to-r from-white to-stone-400 bg-clip-text text-transparent'>
            Customer
          </span>
        </h1>
        <p className='font-poppins font-light text-[11px] md:text-sm text-stone-400 mt-0.5'>
          Here is a baseline summary overview tracking activity.
        </p>
      </div>

      <Link
        to='#'
        className='bg-white/5 border border-white/10 rounded-full py-1 pl-2 pr-4 md:py-1.5 md:pl-2.5 md:pr-5 flex items-center gap-2.5 md:gap-3 shadow-md backdrop-blur-md self-start sm:self-auto transition-all duration-200 hover:bg-white/10 hover:border-border-gold/60 cursor-pointer group'
      >
        <div className='w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-border-gold/40 shrink-0 transition-transform duration-200 group-hover:scale-105'>
          <img
            src={AvatarPlaceholder}
            alt='Vendor profile view'
            className='w-full h-full object-cover'
          />
        </div>
        <span className='font-poppins text-[11px] md:text-xs font-semibold text-white tracking-wide whitespace-nowrap transition-colors duration-200 group-hover:text-border-gold-hover'>
          Vendor Profile
        </span>
      </Link>
    </div>
  );
}
