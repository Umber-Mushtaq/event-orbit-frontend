import { Link, useParams } from "react-router";
import { ArrowLeft, BadgeCheck, Layers3, Store, Sparkles } from "lucide-react";

import { usePublicCategoryDetails } from "../../hooks/usePublicCategoryDetails";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";

import { ImageGallery } from "./ui/ImageGallery";
import VendorCard from "../public_vendor/ui/VendorCard";

export default function PublicCategoryDetails() {
  const { categoryId } = useParams();
  const { category, vendors, loading, error } =
    usePublicCategoryDetails(categoryId);

  if (loading) {
    return <CustomLoading msg='Loading Data' />;
  }

  if (error || !category) {
    return (
      <div className='min-h-screen bg-white/5 border border-white/30 rounded-lg flex flex-col items-center justify-center text-stone-400 gap-4'>
        <CustomError msg={error || "No Data Found"} />
        <Link
          to='/categories'
          className='text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-2 rounded-lg'
        >
          <ArrowLeft className='w-3 h-3' /> Return to Categories
        </Link>
      </div>
    );
  }

  return (
    <main className='min-h-screen w-full bg-neutral-950 text-white font-poppins antialiased pb-24 selection:bg-amber-500 selection:text-black'>
      <section className='max-w-7xl mx-auto px-3 mt-6'>
        <ImageGallery
          images={category.image ? [category.image] : []}
          title={category.name}
        />
      </section>

      <section className='max-w-7xl mx-auto px-3 mt-12'>
        <div className='space-y-10'>
          <div className='bg-neutral-900/50 p-6 rounded-2xl'>
            <div className='inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-4 shadow-sm backdrop-blur-md'>
              <BadgeCheck className='w-3.5 h-3.5 animate-pulse' />
              Category Spotlight
            </div>
            <h1 className='font-montserrat font-black text-3xl md:text-5xl tracking-wide uppercase leading-tight bg-gradient-to-r from-white via-white to-stone-400 bg-clip-text text-transparent'>
              {category.name}
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10'>
              <div className='rounded-2xl bg-neutral-950/60 border border-white/5 p-4'>
                <div className='flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-bold'>
                  <Store className='w-4 h-4' />
                  Vendors
                </div>
                <div className='mt-2 text-2xl font-black text-white'>
                  {vendors.length}
                </div>
              </div>
              <div className='rounded-2xl bg-neutral-950/60 border border-white/5 p-4'>
                <div className='flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-bold'>
                  <Layers3 className='w-4 h-4' />
                  Listings
                </div>
                <div className='mt-2 text-2xl font-black text-white'>
                  {category.listings ?? 0}
                </div>
              </div>
              <div className='rounded-2xl bg-neutral-950/60 border border-white/5 p-4'>
                <div className='flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-bold'>
                  <Sparkles className='w-4 h-4' />
                  Status
                </div>
                <div className='mt-2 text-2xl font-black text-white'>
                  {category.status || "Active"}
                </div>
              </div>
            </div>
          </div>

          <div className='transition-all duration-300 p-8 relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <div className='flex items-center gap-2 mb-4'>
              <Sparkles className='w-4 h-4 text-amber-500/70' />
              <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
                Category Overview
              </h3>
            </div>
            <p className='text-stone-400 text-sm leading-relaxed whitespace-pre-line font-normal pl-6'>
              {category.description ||
                "No description provided for this category."}
            </p>
          </div>

          <div className='transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group'>
            <div className='absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500' />
            <div className='flex flex-col mb-6'>
              <div className='flex items-center gap-2'>
                <Store className='w-4 h-4 text-amber-500/70' />
                <h3 className='font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200'>
                  Related Vendors
                </h3>
              </div>
              <p className='text-sm text-stone-400 font-normal mt-1 pl-6'>
                Vendors listed below actively offer this category.
              </p>
            </div>

            {vendors.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {vendors.map((vendor) => (
                  <VendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-stone-400'>
                No vendors are currently assigned to this category.
              </div>
            )}
          </div>
        </div>

      </section>
    </main>
  );
}
