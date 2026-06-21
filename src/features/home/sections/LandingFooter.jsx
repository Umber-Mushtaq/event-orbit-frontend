import Logo from "../../../assets/logo.png";
import { Share2, MessageSquare, Link as LinkIcon } from "lucide-react";

function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const socials = [
    { Icon: Share2, href: "#" },
    { Icon: MessageSquare, href: "#" },
    { Icon: LinkIcon, href: "#" },
  ];

  return (
    <footer className='  text-light-text font-poppins text-sm py-12 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden'>
      <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10'>
        <div className='md:col-span-8 flex flex-col gap-4 text-center md:text-left items-center md:items-start'>
          <p className='font-light text-xs text-light-text/80 leading-relaxed max-w-xs'>
            Bringing your dream wedding to life with top-tier professionals,
            smart planning tools, and premium services all in one elegant
            platform.
          </p>
        </div>
        <div className='md:col-span-4 flex justify-center md:justify-end gap-4'>
          {socials.map((social, idx) => {
            const SocialIcon = social.Icon;
            return (
              <a
                key={idx}
                href={social.href}
                className='w-9 h-9 rounded-full bg-white/5 text-light-text border border-white/10 flex items-center justify-center hover:bg-glass-gold-hover hover:text-border-gold-hover hover:border-border-gold/50 hover:shadow-gold-glow transition-all duration-300 cursor-pointer'
              >
                <SocialIcon className='w-4 h-4' />
              </a>
            );
          })}
        </div>
      </div>

      <div className='w-full max-w-6xl mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-light-text z-10'>
        <p>&copy; {currentYear} Platery. All rights reserved.</p>
        <div className='flex gap-6'>
          <a
            href='#privacy'
            className='hover:text-light-text transition-colors duration-200'
          >
            Privacy Policy
          </a>
          <a
            href='#terms'
            className='hover:text-light-text transition-colors duration-200'
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
