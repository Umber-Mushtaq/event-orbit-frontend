import { Link } from "react-router";
import logo from "../assets/logo.png";
function AppLogo({ to, className = "", imgClassName = "" }) {
  return (
    <Link
      to={to}
      className={`w-13 h-13 rounded-xl bg-glass-gold border border-border-gold/30 text-border-gold flex items-center justify-center shadow-gold-glow animate-pulse [animation-duration:4s] ${className}`}
    >
      <div className=' flex items-center gap-3'>
        <img src={logo} alt='Logo' className={`w-12 h-auto object-contain ${imgClassName}`} />
      </div>
    </Link>
  );
}

export default AppLogo;
