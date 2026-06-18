import { Link } from "react-router";
import logo from "../assets/logo.png";

function AppLogo({ to }) {
  return (
    <Link
      to={to}
      className='w-13 h-13 rounded-xl bg-glass-gold border border-border-gold/20 text-border-gold flex items-center justify-center transition-all duration-300 hover:border-border-gold hover:shadow-gold-glow group'
    >
      <div className='flex items-center justify-center transition-transform duration-300 group-hover:scale-105'>
        <img
          src={logo}
          alt='EventOrbit Logo'
          className='w-12 h-auto object-contain'
        />
      </div>
    </Link>
  );
}

export default AppLogo;
