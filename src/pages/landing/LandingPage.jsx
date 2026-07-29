import LandingPageSearchFilter from "./ui/LandingPageSearchFilter";
import LandingPageTypography from "./ui/LandingPageTypography";
import HeroBg from "../../assets/hero_bg3.jpg";
import LandingPageCategoriesGrid from "./ui/LandingPageCategoryGrid";
import LandingPageStatistics from "./ui/LandingPageStatistics";
import LandingSteps from "./ui/LandingPageSteps";
import LandingPageBlogSection from "./ui/LandingPageBlogSection";
import LandingPageVerifiedVendors from "./ui/LandingPageVerifiedVendors";
import ContactSection from "./ui/ContactSection";
import FAQSection from "./ui/FAQSection";
import SEO from "../../seo/SEO";
import { organizationSchema, websiteSchema } from "../../seo/schema";

function LandingPage() {
  return (
    <>
      <SEO
        title='Event Orbit | Official Website'
        description='Discover trusted event vendors, categories, services, and planning resources with Event Orbit.'
        keywords={[
          "Event Orbit",
          "event vendors",
          "wedding services",
          "event planning",
          "trusted vendors",
        ]}
        canonical='/'
        image={HeroBg}
        type='website'
        schema={[organizationSchema(), websiteSchema()]}
      />
      <section
        className='relative flex min-h-[540px] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center md:py-36 bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url(${HeroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.36)] dark:bg-[rgba(0,0,0,0.62)]'></div>
        <div className='absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent'></div>
        <div className='relative z-10 max-w-5xl'>
          <LandingPageTypography />
          <LandingPageSearchFilter />
        </div>
      </section>
      <LandingPageCategoriesGrid />
      <LandingPageVerifiedVendors />
      <LandingPageStatistics />
      <LandingSteps />
      <LandingPageBlogSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}

export default LandingPage;
