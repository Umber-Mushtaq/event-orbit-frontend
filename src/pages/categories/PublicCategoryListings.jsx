import { useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useCategories } from "../../hooks/useGetAllCategories";
import CustomHeader from "../../shared_components/CustomHeader";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";
import bgImg from "../../assets/service1.jpg";
import { getCategorySlug } from "../../utils/slug";

function PublicCategoryListings() {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();

  const openCategory = (category) => {
    const slug = getCategorySlug(category);
    if (!slug) return;
    navigate(`/category/${slug}`);
  };

  if (loading) return <CustomLoading msg='Loading categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <main className='min-h-screen bg-slate-50 py-16 px-5 text-slate-950 dark:bg-neutral-950 dark:text-white'>
      <div className='mx-auto flex max-w-7xl flex-col'>
        <CustomHeader badge='Categories' title='Explore Categories' />

        <div className='mt-10 grid w-full grid-cols-1 gap-8 md:grid-cols-3'>
          {categories.map((category) => (
            <button
              type='button'
              key={category.id}
              onClick={() => openCategory(category)}
              className='group relative h-64 w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] dark:border-border-gold dark:bg-neutral-950 dark:shadow-gold-glow dark:hover:border-border-gold-hover dark:hover:shadow-gold-glow-hover'
            >
              <div
                className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                style={{
                  backgroundImage: `url(${category.image || bgImg})`,
                }}
              />
              <div
                className='absolute inset-0'
                style={{
                  background:
                    "linear-gradient(to top, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.28), transparent)",
                }}
              />

              <div className='absolute bottom-4 left-4 z-10'>
                <h3 className='font-montserrat text-lg font-black uppercase tracking-wide text-[#fff] drop-shadow-md'>
                  {category.name}
                </h3>
                <p className='mt-1 text-xs text-[#e5e7eb]'>
                  {category.listings || category.totalListings || 0} Listings
                </p>
              </div>

              <div className='absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-neutral-950'>
                  <ArrowUpRight className='h-5 w-5' />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PublicCategoryListings;
