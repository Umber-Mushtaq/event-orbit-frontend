import LandingPageSearchFilter from "./ui/LandingPageSearchFilter";
import LandingPageTypography from "./ui/LandingPageTypography";
import HeroBg from "../../assets/hero_bg.jpg";
import LandingPageCategoriesGrid from "./ui/LandingPageCategoryGrid";
import LandingPageStatistics from "./ui/LandingPageStatistics";
import LandingSteps from "./ui/LandingPageSteps";
import LandingPageVerifiedVendors from "./ui/LandingPageVerifiedVendors";
function LandingPage() {
  return (
    <>
      <section
        className='relative flex flex-col items-center justify-center text-center py-32 px-6 bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url(${HeroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>
        <div className='relative z-10 max-w-5xl'>
          <LandingPageTypography />
          <LandingPageSearchFilter />
        </div>
      </section>
      <LandingPageCategoriesGrid />
      <LandingPageVerifiedVendors />
      <LandingPageStatistics />
      <LandingSteps />
    </>
  );
}

export default LandingPage;
