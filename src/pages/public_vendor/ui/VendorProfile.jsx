import { useMemo } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";

import { ImageGallery } from "../../services/ui/ImageGallery";
import Avatar from "../../../assets/fallback.png";
import {
  FacebookSvg,
  InstagramSvg,
  LinkedinSvg,
} from "../../../shared_components/SocialIcons";
import { useWishlistState } from "../../../hooks/useWishlistState";
import { getVendorSlug } from "../../../utils/slug";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80";

const digitsOnly = (value = "") => String(value).replace(/\D/g, "");

const formatPrice = (value) => {
  const amount = Number(value || 0);
  return amount > 0 ? `PKR ${amount.toLocaleString()}` : "Quote on request";
};

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className='flex flex-col mb-6'>
      <div className='flex items-center gap-2'>
        <Icon className='w-4 h-4 text-amber-500/70' />
        <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
          {title}
        </h3>
      </div>
      {description ? (
        <p className='text-sm text-stone-400 font-normal mt-1 pl-6'>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className='rounded-2xl bg-neutral-950/60 border border-white/5 p-4 transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-0.5'>
      <div className='flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-bold'>
        <Icon className='w-4 h-4' />
        {label}
      </div>
      <div className='mt-2 text-2xl font-black text-white'>{value}</div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href }) {
  const card = (
    <div className='h-full rounded-2xl bg-neutral-950/60 border border-white/5 p-4 transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-0.5'>
      <div className='flex gap-3'>
        <Icon className='w-4 h-4 text-amber-500/80 shrink-0 mt-1' />
        <div className='min-w-0'>
          <p className='text-[10px] uppercase tracking-widest font-bold text-stone-500'>
            {label}
          </p>
          <p className='text-sm text-stone-200 mt-1 break-words'>
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );

  if (!href) return card;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {card}
    </a>
  );
}

function ReviewCard({ review }) {
  return (
    <article className='rounded-2xl bg-neutral-950/60 border border-white/5 p-5'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center gap-3 min-w-0'>
          <div className='w-11 h-11 rounded-full overflow-hidden bg-neutral-900 shrink-0'>
            <img
              src={review.userId?.profileImage || Avatar}
              alt={review.userId?.firstName || "Customer"}
              className='w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <div className='min-w-0'>
            <p className='font-bold text-white truncate'>
              {review.userId?.firstName || "Customer"} {review.userId?.lastName || ""}
            </p>
            <p className='text-xs text-stone-500'>
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent"}
            </p>
          </div>
        </div>
        <span className='flex items-center gap-1 text-amber-400 text-xs font-black'>
          <Star className='w-4 h-4 fill-amber-400' />
          {review.rating || 0}
        </span>
      </div>
      <p className='text-sm text-stone-400 leading-relaxed mt-4'>
        {review.comment || "No written comment provided."}
      </p>
    </article>
  );
}

function VendorProfile({
  profile,
  reviews = [],
  services = [],
  allServices = [],
  bookingTarget = "",
}) {
  const vendorName =
    profile.businessName ||
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
    "Vendor";
  const ownerName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
  const location = [profile.location, profile.city, profile.country].filter(Boolean).join(", ");
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
    : Number(profile.vendorRating || 0);
  const priceList = services.map((service) => Number(service.price || 0)).filter(Boolean);
  const startingPrice = priceList.length ? Math.min(...priceList) : 0;
  const primaryServiceId = services[0]?.id || services[0]?._id;
  const {
    isWishlisted,
    toggleWishlist,
    updatingServiceId,
  } = useWishlistState();
  const vendorIsWishlisted = primaryServiceId ? isWishlisted(primaryServiceId) : false;
  const wishlistUpdating =
    primaryServiceId && String(updatingServiceId) === String(primaryServiceId);
  const whatsappLink =
    profile.whatsappNumber || profile.phoneNumber
      ? `https://wa.me/${digitsOnly(profile.whatsappNumber || profile.phoneNumber)}`
      : "";
  const galleryImages = useMemo(() => {
    const images = [profile.profileImage, ...services.flatMap((service) => service.images || [])]
      .filter(Boolean);
    const uniqueImages = [...new Set(images)].slice(0, 6);
    return uniqueImages.length ? uniqueImages : [FALLBACK_IMAGE];
  }, [profile.profileImage, services]);

  const similarVendors = useMemo(() => {
    const vendors = new Map();
    allServices.forEach((service) => {
      const vendor = service.vendor;
      const vendorId = vendor?._id || vendor?.id || service.vendorId;
      if (!vendorId || String(vendorId) === String(profile._id)) return;
      if (!vendors.has(String(vendorId))) {
        vendors.set(String(vendorId), {
          id: vendorId,
          name:
            vendor?.businessName ||
            `${vendor?.firstName || ""} ${vendor?.lastName || ""}`.trim() ||
            "Verified Vendor",
          image: vendor?.profileImage || service.images?.[0] || Avatar,
          location: vendor?.location || vendor?.city || "EventOrbit marketplace",
          rating: Number(vendor?.vendorRating || 4.8).toFixed(1),
        });
      }
    });
    return Array.from(vendors.values()).slice(0, 3);
  }, [allServices, profile._id]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: vendorName, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Share can be cancelled by the browser/user, so no UI error is needed.
    }
  };

  const contactItems = [
    { icon: Store, label: "Business Name", value: profile.businessName },
    { icon: Users, label: "Owner", value: ownerName },
    { icon: Mail, label: "Email", value: profile.email, href: profile.email ? `mailto:${profile.email}` : "" },
    { icon: Phone, label: "Phone", value: profile.phoneNumber, href: profile.phoneNumber ? `tel:${profile.phoneNumber}` : "" },
    { icon: MessageSquare, label: "WhatsApp", value: profile.whatsappNumber, href: whatsappLink },
    { icon: MapPin, label: "Address", value: profile.address || profile.location },
    { icon: MapPin, label: "City", value: profile.city },
    { icon: Globe, label: "Country", value: profile.country },
    { icon: Globe, label: "Website", value: profile.website, href: profile.website },
    { icon: Clock3, label: "Experience", value: `${profile.yearsOfExperience || 0} years` },
    { icon: Sparkles, label: "Status", value: profile.status || (profile.isApproved ? "Active" : "Pending") },
  ];

  return (
    <main className='min-h-screen w-full bg-neutral-950 text-white font-poppins antialiased pb-24 selection:bg-amber-500 selection:text-black'>
      <section className='max-w-7xl mx-auto px-3 mt-6'>
        <nav className='mb-5 flex flex-wrap items-center gap-2 text-xs text-stone-500'>
          <Link to='/' className='hover:text-amber-400 transition-colors'>Home</Link>
          <ChevronRight className='w-3 h-3' />
          <Link to='/categories' className='hover:text-amber-400 transition-colors'>Categories</Link>
          <ChevronRight className='w-3 h-3' />
          <Link to='/vendors' className='hover:text-amber-400 transition-colors'>Vendors</Link>
          <ChevronRight className='w-3 h-3' />
          <span className='text-stone-300'>{vendorName}</span>
        </nav>
        <ImageGallery images={galleryImages} title={vendorName} />
      </section>

      <section className='max-w-7xl mx-auto px-3 mt-12 space-y-10'>
        <div className='bg-neutral-900/50 p-6 rounded-2xl'>
          <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
            <div className='max-w-4xl'>
              <div className='inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-4 shadow-sm backdrop-blur-md'>
                <BadgeCheck className='w-3.5 h-3.5 animate-pulse' />
                EventOrbit Verified Vendor
              </div>
              <h1 className='font-montserrat font-black text-3xl md:text-5xl tracking-wide uppercase leading-tight bg-gradient-to-r from-white via-white to-stone-400 bg-clip-text text-transparent'>
                {vendorName}
              </h1>
              <div className='flex flex-wrap items-center gap-4 mt-4 text-sm text-stone-400'>
                {location ? (
                  <span className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-amber-400' />
                    {location}
                  </span>
                ) : null}
                <span className='flex items-center gap-2'>
                  <Star className='w-4 h-4 fill-amber-400 text-amber-400' />
                  {Number(avgRating || 0).toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              <p className='text-stone-400 text-sm leading-relaxed whitespace-pre-line font-normal mt-5'>
                {profile.vendorBio ||
                  profile.businessDescription ||
                  "No profile description provided for this vendor."}
              </p>
            </div>

            <div className='flex flex-wrap gap-3 lg:justify-end'>
              {bookingTarget ? (
                <Link
                  to={bookingTarget}
                  className='flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-black text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg tracking-wider uppercase'
                >
                  <CalendarDays className='w-3.5 h-3.5' />
                  Book Now
                </Link>
              ) : null}
              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target='_blank'
                  rel='noreferrer'
                  className='text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl'
                >
                  <MessageSquare className='w-3.5 h-3.5' />
                  WhatsApp
                </a>
              ) : null}
              {profile.phoneNumber ? (
                <a
                  href={`tel:${profile.phoneNumber}`}
                  className='text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl'
                >
                  <Phone className='w-3.5 h-3.5' />
                  Call
                </a>
              ) : null}
              <button
                type='button'
                onClick={() => toggleWishlist(primaryServiceId)}
                disabled={!primaryServiceId || wishlistUpdating}
                title={
                  primaryServiceId
                    ? vendorIsWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                    : "No listing available to wishlist"
                }
                className={`text-xs font-poppins transition-colors flex items-center gap-2 bg-white/5 border px-4 py-3 rounded-xl ${
                  vendorIsWishlisted
                    ? "border-amber-500/40 text-amber-400"
                    : "border-white/10 text-stone-300 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${vendorIsWishlisted ? "fill-amber-400" : ""}`} />
                {vendorIsWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button
                type='button'
                onClick={handleShare}
                className='text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl'
              >
                <Share2 className='w-3.5 h-3.5' />
                Share
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 pt-4 border-t border-white/10'>
            <StatCard icon={Star} label='Rating' value={Number(avgRating || 0).toFixed(1)} />
            <StatCard icon={Store} label='Packages' value={services.length} />
            <StatCard icon={CalendarDays} label='Starting' value={formatPrice(startingPrice)} />
            <StatCard icon={Clock3} label='Experience' value={`${profile.yearsOfExperience || 0} yrs`} />
            <StatCard icon={Sparkles} label='Status' value={profile.status || (profile.isApproved ? "Active" : "Pending")} />
          </div>
        </div>

        <div className='transition-all duration-300 p-8 relative group'>
          <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
          <SectionHeading
            icon={Sparkles}
            title='Vendor Overview'
            description='Business profile, background, and marketplace details.'
          />
          <p className='text-stone-400 text-sm leading-relaxed whitespace-pre-line font-normal pl-6'>
            {profile.businessDescription ||
              profile.vendorBio ||
              "No business description provided for this vendor."}
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pl-0 md:pl-6'>
            {[
              ["Verified Vendor", "Reviewed by EventOrbit"],
              ["Secure Booking", "Clear booking path available"],
              ["Fast Contact", "Call and WhatsApp actions"],
              ["Trusted Profile", "Complete marketplace details"],
            ].map(([title, text]) => (
              <div key={title} className='rounded-2xl bg-neutral-900/50 border border-white/5 p-4'>
                <CheckCircle2 className='w-4 h-4 text-amber-400 mb-3' />
                <h4 className='font-bold text-white text-sm'>{title}</h4>
                <p className='text-xs text-stone-500 mt-1 leading-relaxed'>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
          <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
          <SectionHeading
            icon={Store}
            title='Vendor Details'
            description='Contact, location, website, and profile information.'
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {contactItems.map((item) => (
              <ContactCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
              />
            ))}
          </div>
          <div className='flex flex-wrap gap-3 mt-5 text-amber-400'>
            {profile.instagram ? (
              <a href={profile.instagram} target='_blank' rel='noreferrer' aria-label='Instagram'>
                <InstagramSvg className='w-5 h-5 hover:text-amber-300' />
              </a>
            ) : null}
            {profile.linkedin ? (
              <a href={profile.linkedin} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                <LinkedinSvg className='w-5 h-5 hover:text-amber-300' />
              </a>
            ) : null}
            {profile.facebook ? (
              <a href={profile.facebook} target='_blank' rel='noreferrer' aria-label='Facebook'>
                <FacebookSvg className='w-5 h-5 hover:text-amber-300' />
              </a>
            ) : null}
          </div>
        </div>

        <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
          <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
          <SectionHeading
            icon={Star}
            title='Customer Reviews'
            description='Recent feedback for this vendor.'
          />

          {reviews.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6'>
              <div className='rounded-2xl bg-neutral-900/50 border border-white/5 p-6'>
                <p className='text-5xl font-black text-white'>
                  {Number(avgRating || 0).toFixed(1)}
                </p>
                <div className='flex gap-1 text-amber-400 mt-3'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className='w-4 h-4 fill-amber-400' />
                  ))}
                </div>
                <p className='text-sm text-stone-500 mt-3'>
                  {reviews.length} verified reviews
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {reviews.slice(0, 4).map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </div>
          ) : (
            <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-stone-400'>
              No reviews are available for this vendor yet.
            </div>
          )}
        </div>

        {similarVendors.length > 0 ? (
          <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <SectionHeading
              icon={Users}
              title='Similar Vendors'
              description='Explore more verified vendors from the marketplace.'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {similarVendors.map((vendor) => (
                <Link
                  key={vendor.id}
                  to={`/vendor/${getVendorSlug(vendor) || vendor.id}`}
                  className='cursor-pointer bg-neutral-900/70 border border-border-gold rounded-xl shadow-gold-glow hover:shadow-gold-glow-hover transition-all duration-300 overflow-hidden p-5 flex flex-col gap-4'
                >
                  <div className='h-40 rounded-lg overflow-hidden bg-neutral-950'>
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                      loading='lazy'
                    />
                  </div>
                  <div className='flex items-start justify-between gap-3'>
                    <h4 className='text-lg font-bold text-white uppercase tracking-wide line-clamp-2'>
                      {vendor.name}
                    </h4>
                    <span className='flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0'>
                      <Star className='w-4 h-4 fill-amber-400' />
                      {vendor.rating}
                    </span>
                  </div>
                  <p className='text-sm text-stone-400 flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-amber-400' />
                    {vendor.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <Link
          to='/vendors'
          className='w-fit text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-2 rounded-lg'
        >
          <ArrowLeft className='w-3 h-3' /> Return to Vendors
        </Link>
      </section>
    </main>
  );
}

export default VendorProfile;
