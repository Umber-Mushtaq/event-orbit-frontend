import { MapPin, Phone, Globe, ShieldCheck } from "lucide-react";
import Avatar from "../../../assets/fallback.png";
import {
  LinkedinSvg,
  InstagramSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";
import { useNavigate } from "react-router";

function VendorCard({ vendor }) {
  const navigate = useNavigate();
  console.log(vendor);

  const handleClick = () => {
    navigate(`/vendor/${vendor._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='cursor-pointer bg-neutral-900/70 border border-border-gold rounded-xl shadow-gold-glow hover:shadow-gold-glow-hover transition-all duration-300 overflow-hidden p-6 flex flex-col gap-4'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold text-white uppercase tracking-wide'>
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

      <p className='text-sm text-stone-300'>
        {vendor.businessDescription || "No description provided."}
      </p>
      {vendor.vendorBio && (
        <p className='text-xs text-stone-400 italic'>{vendor.vendorBio}</p>
      )}

      <div className='flex flex-col gap-2 text-xs text-stone-300'>
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
