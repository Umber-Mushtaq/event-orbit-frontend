import { MessageSquare, Calendar, ShieldAlert } from "lucide-react";

export function ServiceDetailsVendorProfile({ vendor }) {
  const fallbackAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";

  return (
    <div className='bg-neutral-900/40 border border-white/5 rounded-2xl p-6 shadow-xl'>
      <div className='flex items-center gap-4 mb-6'>
        <div className='w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-500/40 bg-neutral-950 shrink-0'>
          <img
            src={vendor?.avatar || fallbackAvatar}
            alt={vendor?.businessName}
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <span className='text-[9px] uppercase tracking-widest text-amber-500 font-extrabold block'>
            Organized By
          </span>
          <h4 className='font-montserrat font-black text-base text-white tracking-wide uppercase line-clamp-1'>
            {vendor?.businessName || "Verified Pro Studio"}
          </h4>
          <p className='text-xs text-stone-500 mt-0.5'>
            Member since {vendor?.memberSince || "2025"}
          </p>
        </div>
      </div>

      <div className='space-y-3'>
        <button className='w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-white/5 border border-white/10 text-stone-200 hover:text-white font-medium text-xs py-3 rounded-xl transition-all cursor-pointer'>
          <MessageSquare className='w-3.5 h-3.5 text-amber-500' />
          <span>Consult Vendor Directly</span>
        </button>
        <button className='w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-white/5 border border-white/10 text-stone-200 hover:text-white font-medium text-xs py-3 rounded-xl transition-all cursor-pointer'>
          <Calendar className='w-3.5 h-3.5 text-amber-500' />
          <span>Check Availability Window</span>
        </button>
      </div>
    </div>
  );
}
