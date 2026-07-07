// VendorProfile.jsx
import React from "react";
import { MapPin, Phone, Globe, ShieldCheck, Star } from "lucide-react";
import {
  LinkedinSvg,
  InstagramSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";
import CustomHeader from "../../../shared_components/CustomHeader";

function VendorProfile({ profile, reviews }) {
  if (!profile)
    return <p className='text-stone-400'>No vendor profile found.</p>;

  const avgRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className='w-full bg-neutral-950'>
      {/* Centered container that grows on large screens */}
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 py-8'>
        <CustomHeader
          badge='Vendor Profile'
          title={profile.firstName + " " + profile.lastName}
        />

        {/* Header: two-column grid on md+ */}
        <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start my-10'>
          {/* Image column */}
          <div className='flex-shrink-0'>
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.businessName}
                className='w-44 h-44 sm:w-48 sm:h-48 rounded-lg object-cover border border-border-gold shadow-gold-glow'
              />
            ) : (
              <div className='w-44 h-44 sm:w-48 sm:h-48 rounded-lg bg-stone-800' />
            )}
          </div>

          {/* Info column */}
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <h1 className='text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide flex flex-col md:flex-row md:items-center gap-3'>
                {profile.businessName ||
                  `${profile.firstName} ${profile.lastName}`}
                {profile.isApproved && (
                  <span className='flex items-center gap-1 text-amber-400 text-sm font-semibold'>
                    <ShieldCheck className='w-4 h-4' /> Verified
                  </span>
                )}
              </h1>

              {avgRating && (
                <div className='flex items-center gap-2 text-amber-400'>
                  <Star className='w-5 h-5' />
                  <span className='text-sm lg:text-base'>
                    {avgRating} / 5{" "}
                    <span className='text-stone-400'>({reviews.length})</span>
                  </span>
                </div>
              )}
            </div>

            <p className='text-stone-400 text-sm sm:text-base mt-3 max-w-3xl'>
              {profile.vendorBio}
            </p>

            {/* Contact row */}
            <div className='mt-4 flex flex-wrap gap-4 text-stone-300 text-sm'>
              {profile.address && (
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-amber-400' />
                  <span>{profile.address}</span>
                </div>
              )}
              {profile.phoneNumber && (
                <div className='flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-amber-400' />
                  <span>{profile.phoneNumber}</span>
                </div>
              )}
              {profile.email && (
                <div className='flex items-center gap-2'>
                  <EmailSvg className='w-4 h-4 text-amber-400' />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className='mt-4 flex items-center gap-4 text-amber-400'>
              {profile.website && (
                <a href={profile.website} target='_blank' rel='noreferrer'>
                  <Globe className='w-5 h-5 hover:text-amber-300' />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target='_blank' rel='noreferrer'>
                  <InstagramSvg className='w-5 h-5 hover:text-amber-300' />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target='_blank' rel='noreferrer'>
                  <LinkedinSvg className='w-5 h-5 hover:text-amber-300' />
                </a>
              )}
              {profile.facebook && (
                <a href={profile.facebook} target='_blank' rel='noreferrer'>
                  <FacebookSvg className='w-5 h-5 hover:text-amber-300' />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        <section className='mb-10'>
          <h2 className='text-xl font-semibold text-amber-400 mb-3'>About</h2>
          <p className='text-stone-300 text-sm sm:text-base leading-relaxed max-w-4xl'>
            {profile.businessDescription}
          </p>
        </section>

        {/* Reviews grid expands to fill width */}
        <section>
          <h2 className='text-xl font-semibold text-amber-400 mb-6'>Reviews</h2>

          {reviews && reviews.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className='bg-neutral-900/70 border border-border-gold rounded-lg p-5 shadow-gold-glow'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      {review.userId?.profileImage ? (
                        <img
                          src={review.userId.profileImage}
                          alt={review.userId.firstName}
                          className='w-9 h-9 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center text-xs text-white'>
                          {review.userId.firstName[0]}
                        </div>
                      )}
                      <div>
                        <div className='text-sm text-white font-semibold'>
                          {review.userId.firstName} {review.userId.lastName}
                        </div>
                        <div className='text-xs text-stone-500'>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-1 text-amber-400 text-sm'>
                      <Star className='w-4 h-4' />
                      {review.rating}
                    </div>
                  </div>

                  <p className='text-stone-300 text-sm mb-2'>
                    {review.comment}
                  </p>
                  <p className='text-xs text-amber-400'>
                    {review.serviceId?.title}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className='text-stone-400'>No reviews yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default VendorProfile;
