import { MapPin, Phone, Globe, ShieldCheck } from "lucide-react";
import Avatar from "../../../assets/fallback.png";
import {
  LinkedinSvg,
  InstagramSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";
import { useNavigate } from "react-router";
import { getVendorSlug } from "../../../utils/slug";

function VendorCard({ vendor }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = getVendorSlug(vendor);
    navigate(slug ? `/vendor/${slug}` : `/vendor/${vendor._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='flex cursor-pointer flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_14px_35px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.16)] dark:border-border-gold dark:bg-neutral-900/70 dark:shadow-gold-glow dark:hover:shadow-gold-glow-hover'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold uppercase tracking-wide text-slate-950 dark:text-white'>
          {vendor.businessName || `${vendor.firstName} ${vendor.lastName}`}
        </h3>
        {vendor.isApproved && (
          <div className='flex items-center gap-1 text-amber-400 text-xs font-semibold'>
            <ShieldCheck className='w-4 h-4' />
            Verified
          </div>
        )}
      </div>

      <div className='h-40 rounded-lg overflow-hidden'>
        <img
          src={
            vendor.profileImage && vendor.profileImage.trim() !== ""
              ? vendor.profileImage
              : Avatar
          }
          alt={vendor.businessName || "Vendor"}
          className='w-full h-full object-cover'
        />
      </div>

      <p className='text-sm text-slate-600 dark:text-stone-300'>
        {vendor.businessDescription || "No description provided."}
      </p>
      {vendor.vendorBio && (
        <p className='text-xs italic text-slate-500 dark:text-stone-400'>{vendor.vendorBio}</p>
      )}

      <div className='flex flex-col gap-2 text-xs text-slate-600 dark:text-stone-300'>
        {vendor.address && (
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-amber-400' />
            <span>{vendor.address}</span>
          </div>
        )}
        {vendor.phoneNumber && (
          <div className='flex items-center gap-2'>
            <Phone className='w-4 h-4 text-amber-400' />
            <span>{vendor.phoneNumber}</span>
          </div>
        )}
        {vendor.email && (
          <div className='flex items-center gap-2'>
            <EmailSvg className='w-4 h-4 text-amber-400' />
            <span>{vendor.email}</span>
          </div>
        )}
      </div>

      {/* Social links */}
      <div className='flex gap-3 mt-3 text-amber-400'>
        {vendor.website && (
          <a href={vendor.website} target='_blank' rel='noreferrer'>
            <Globe className='w-4 h-4 hover:text-amber-300' />
          </a>
        )}
        {vendor.instagram && (
          <a href={vendor.instagram} target='_blank' rel='noreferrer'>
            <InstagramSvg className='w-4 h-4 hover:text-amber-300' />
          </a>
        )}
        {vendor.linkedin && (
          <a href={vendor.linkedin} target='_blank' rel='noreferrer'>
            <LinkedinSvg className='w-4 h-4 hover:text-amber-300' />
          </a>
        )}
        {vendor.facebook && (
          <a href={vendor.facebook} target='_blank' rel='noreferrer'>
            <FacebookSvg className='w-4 h-4 hover:text-amber-300' />
          </a>
        )}
      </div>
    </div>
  );
}
export default VendorCard;
