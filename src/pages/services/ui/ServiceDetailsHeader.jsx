import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Heart } from "lucide-react";

export function ServiceDetailsHeader({
  explorePath,
  isFavorite,
  onToggleFavorite,
  isToggling,
}) {
  return (
    <div className='max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-30 relative'>
      <Link
        to={explorePath}
        className='flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-all text-xs uppercase font-bold tracking-wider group'
      >
        <ArrowLeft className='w-4 h-4 text-amber-500 transition-transform group-hover:-translate-x-1' />
        Back To Explore
      </Link>

      <button
        onClick={onToggleFavorite}
        disabled={isToggling}
        className='p-2.5 rounded-full bg-neutral-900 border border-white/30 hover:border-amber-500/40 transition-all text-stone-300 hover:text-red-400 cursor-pointer active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500 scale-110"
              : "text-stone-400"
          }`}
        />
      </button>
    </div>
  );
}
