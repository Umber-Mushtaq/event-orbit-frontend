import React from "react";
import {
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Globe,
  Award,
} from "lucide-react";
import { Link } from "react-router";

export function VendorProfile({ vendor }) {
  const token = localStorage.getItem("token");
  const fallbackAvatar =
    "https://api.dicebear.com/7.x/initials/svg?seed=" +
    encodeURIComponent(vendor?.businessName || "Vendor") +
    "&backgroundType=solid&backgroundColor=1c1917";

  const memberYear = vendor?.createdAt
    ? new Date(vendor.createdAt).getFullYear()
    : "2026";

  // Formats WhatsApp string cleanly for the wa.me global redirection API
  const rawWhatsApp = vendor?.whatsappNumber || "";
  const cleanedWhatsApp = rawWhatsApp.replace(/\D/g, "");
  const whatsappLink = cleanedWhatsApp
    ? `https://wa.me/${cleanedWhatsApp}`
    : null;

  return (
    <div className='bg-neutral-900/40 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md text-left'>
      {/* Brand Identity Block */}
      <Link to={`/vendors/${vendor?._id}`} className='flex items-start gap-4 mb-5 group'>
        <div className='w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-500/40 bg-neutral-950 shrink-0 flex items-center justify-center'>
          <img
            src={
              vendor?.profileImage && vendor.profileImage.trim() !== ""
                ? vendor.profileImage
                : fallbackAvatar
            }
            alt={vendor?.businessName || "Vendor Profile"}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.src = fallbackAvatar;
            }}
          />
        </div>
        <div className='min-w-0'>
          <span className='text-[9px] uppercase tracking-widest text-amber-400 font-black flex items-center gap-1 mb-0.5'>
            <Award className='w-3 h-3 shrink-0' /> EventOrbit Verified Vendor
          </span>
          <h4 className='font-montserrat font-black text-lg text-white tracking-wide uppercase line-clamp-1 leading-tight group-hover:text-amber-400 transition-colors'>
            {vendor?.businessName || "Exclusive Studio Pro"}
          </h4>
          <p className='text-xs text-stone-400 font-medium truncate'>
            Manager: {vendor?.fullName || "Verified Professional"}
          </p>
        </div>
      </Link>

      {/* Vendor Bio Statement */}
      {(vendor?.vendorBio || vendor?.businessDescription) && (
        <div className='mb-5 bg-neutral-950/40 border border-white/5 p-3.5 rounded-xl'>
          <p className='text-xs text-stone-400 leading-relaxed font-light italic'>
            "{vendor.vendorBio || vendor.businessDescription}"
          </p>
        </div>
      )}

      {/* Contact Channels Matrix */}
      <div className='space-y-2 mb-5 border-t border-white/5 pt-4 text-xs text-stone-300 font-light'>
        {vendor?.email && (
          <div className='flex items-center gap-2.5'>
            <Mail className='w-3.5 h-3.5 text-amber-500/70 shrink-0' />
            <span className='truncate text-stone-400'>{vendor.email}</span>
          </div>
        )}
        {(vendor?.phoneNumber || vendor?.whatsappNumber) && (
          <div className='flex items-center gap-2.5'>
            <Phone className='w-3.5 h-3.5 text-amber-500/70 shrink-0' />
            <span className='text-stone-400'>
              {vendor.phoneNumber || vendor.whatsappNumber}
            </span>
          </div>
        )}
        <div className='text-[10px] text-stone-500 font-medium uppercase tracking-wider pt-1'>
          Registered Active Since {memberYear}
        </div>
      </div>

      {/* Social and Web Links Ribbon */}
      <div className='flex flex-wrap items-center gap-2.5 mb-6 border-b border-white/5 pb-4'>
        {/* Global Website Link */}
        <a
          href={
            vendor?.website ||
            `https://www.google.com/search?q=${encodeURIComponent(vendor?.businessName || "EventOrbit Vendor")}`
          }
          target='_blank'
          rel='noreferrer'
          className='p-2 rounded-lg bg-neutral-950 border border-white/5 hover:border-amber-500/30 text-stone-400 hover:text-white transition-all shadow-md'
          title='Website'
        >
          <Globe className='w-3.5 h-3.5' />
        </a>

        {/* LinkedIn Link */}
        <a
          href={
            vendor?.linkedin ||
            `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(vendor?.businessName || "EventOrbit Vendor")}`
          }
          target='_blank'
          rel='noreferrer'
          className='p-2 rounded-lg bg-neutral-950 border border-white/5 hover:border-amber-500/30 text-stone-400 hover:text-white transition-all shadow-md'
          title='LinkedIn'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
            <rect width='4' height='12' x='2' y='9' />
            <circle cx='4' cy='4' r='2' />
          </svg>
        </a>

        {/* Instagram Link */}
        <a
          href={
            vendor?.instagram
              ? `https://instagram.com/${vendor.instagram.replace("@", "")}`
              : "https://www.instagram.com"
          }
          target='_blank'
          rel='noreferrer'
          className='p-2 rounded-lg bg-neutral-950 border border-white/5 hover:border-amber-500/30 text-stone-400 hover:text-white transition-all shadow-md'
          title='Instagram'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
            <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
            <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
          </svg>
        </a>

        {/* Facebook Link */}
        <a
          href={vendor?.facebook || "https://www.facebook.com"}
          target='_blank'
          rel='noreferrer'
          className='p-2 rounded-lg bg-neutral-950 border border-white/5 hover:border-amber-500/30 text-stone-400 hover:text-white transition-all shadow-md'
          title='Facebook'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
          </svg>
        </a>
      </div>

      {/* Primary Interaction Directives */}
      <div className='space-y-3'>
        {whatsappLink && (
          <a
            href={whatsappLink}
            target='_blank'
            rel='noreferrer'
            className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-black text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg tracking-wider uppercase'
          >
            <MessageSquare className='w-3.5 h-3.5 fill-neutral-950 text-neutral-950' />
            <span>Chat via WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}
