import { Link } from "react-router";

function CustomButton({ content }) {
  return (
    <Link
      to='/auth'
      className='w-fit bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-medium py-3 px-6 rounded-lg backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer inline-flex items-center justify-center'
    >
      {content}
    </Link>
  );
}

export default CustomButton;
