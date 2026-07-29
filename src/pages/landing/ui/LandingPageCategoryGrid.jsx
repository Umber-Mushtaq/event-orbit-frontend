import { Link, useNavigate } from "react-router";
import { useCategories } from "../../../hooks/useGetAllCategories";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import bg_img from "../../../assets/service1.jpg";
import CustomHeader from "../../../shared_components/CustomHeader";
import { ArrowUpRight } from "lucide-react";
import { getCategorySlug } from "../../../utils/slug";

function LandingPageCategoriesGrid() {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const slug = getCategorySlug(category);
    if (!slug) return;
    navigate(`/category/${slug}`, {
      state: { categoryName: category.name },
    });
  };

  if (loading) return <CustomLoading msg='Loading Categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='mx-auto flex max-w-7xl flex-col px-5 py-20'>
      <CustomHeader badge='Categories' title='Explore Categories' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-12 w-full'>
        {categories.slice(0, 3).map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className='group relative h-64 w-full cursor-pointer overflow-hidden rounded-xl border border-white/70 bg-card shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] dark:border-border-gold dark:shadow-gold-glow dark:hover:shadow-gold-glow-hover'
          >
            <div
              className='absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500'
              style={{
                backgroundImage: `url(${cat.image || bg_img})`,
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/26 to-transparent dark:from-black/75 dark:via-black/40' />
            <div className='absolute bottom-4 left-4 z-10'>
              <h3 className='text-lg font-bold uppercase tracking-wide text-white! drop-shadow-md'>
                {cat.name}
              </h3>
              {(cat.listings || cat.totalListings) && (
                <p className='mt-1 text-xs text-stone-200!'>
                  {cat.listings || cat.totalListings} Listings
                </p>
              )}
            </div>

            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100  z-20'>
              <ArrowUpRight className=' text-amber-400 text-20xl font-bold' />
            </div>
          </div>
        ))}
      </div>

      <Link
        to='/categories'
        className='bg-amber-400 px-5 py-2.5 rounded-md font-semibold w-fit mx-auto transition hover:bg-amber-300 shadow-gold-glow text-neutral-950'
      >
        Explore Categories
      </Link>
    </div>
  );
}

export default LandingPageCategoriesGrid;
