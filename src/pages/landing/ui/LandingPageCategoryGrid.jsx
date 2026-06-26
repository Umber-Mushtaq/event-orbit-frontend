import { useNavigate } from "react-router";
import { useCategories } from "../../../hooks/useGetAllCategories";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import bg_img from "../../../assets/service1.jpg";
import CustomHeader from "../../../shared_components/CustomHeader";
import { ArrowUpRight } from "lucide-react";

function LandingPageCategoriesGrid() {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    const params = new URLSearchParams({ category: categoryId }).toString();
    navigate(`/services?${params}`);
  };

  if (loading) return <CustomLoading msg='Loading Categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='py-20 flex flex-col max-w-7xl mx-auto px-5'>
      <CustomHeader badge='Categories' title='Explore Categories' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8  mt-10 w-full'>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className='group relative rounded-xl overflow-hidden shadow-gold-glow hover:shadow-gold-glow-hover transition-all duration-500 border border-border-gold h-64 w-full cursor-pointer'
          >
            <div
              className='absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500'
              style={{
                backgroundImage: `url(${cat.image || bg_img})`,
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />
            <div className='absolute bottom-4 left-4 z-10'>
              <h3 className='text-white font-bold text-lg uppercase tracking-wide drop-shadow-md'>
                {cat.name}
              </h3>
              {cat.totalListings && (
                <p className='text-xs text-stone-300 mt-1'>
                  {cat.totalListings} Listings
                </p>
              )}
            </div>

            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100  z-20'>
              <ArrowUpRight className=' text-amber-400 text-20xl font-bold' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPageCategoriesGrid;
