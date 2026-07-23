import logo from "../assets/logo.png";
import { Link } from "react-router";

function AppLogo({ to = "/", className = "", imgClassName = "" }) {
  return (
    <Link
      to={to}
      className={`group flex h-13 w-13 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm ${className}`.trim()}
    >
      <div className='flex items-center justify-center transition-transform duration-300 group-hover:scale-105'>
        <img
          src={logo}
          alt='EventOrbit Logo'
          className={`w-12 h-auto object-contain ${imgClassName}`.trim()}
        />
      </div>
    </Link>
  );
}

export default AppLogo;
