import Hero from "../../../assets/wedding.png";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import Subtitle from "../components/Subtitle";
import BlobedImage from "../components/BlobedImage";

function LandingMain() {
  return (
    <div className='flex flex-col lg:flex-row gap-5 items-center justify-start my-auto z-10 w-full relative pt-8 lg:pt-0'>
      <div className='w-full lg:basis-7/12 flex flex-col gap-6'>
        <Headline />
        <Subtitle />
        <div className='w-fit'>
          <CustomButton content='Get Started' />
        </div>
      </div>
      <div className='w-full lg:basis-5/12 flex justify-center lg:justify-end'>
        <BlobedImage image={Hero} />
      </div>
    </div>
  );
}

export default LandingMain;
