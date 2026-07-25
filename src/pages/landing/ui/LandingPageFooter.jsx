import {
  InstagramSvg,
  TwitterSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";
import { Link } from "react-router";

function LandingPageFooter() {
  return (
    <footer className='border-t border-border bg-background/95 text-foreground py-12 px-6 md:px-12 backdrop-blur-sm'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8'>
        <div className='md:col-span-2 space-y-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground shadow-gold-glow'>
              A
            </div>
            <span className='text-lg font-montserrat text-foreground'>
              Atelier Maison
            </span>
          </div>
          <p className='text-muted-foreground text-sm leading-relaxed max-w-md'>
            A vetted marketplace of the world's most considered event makers.
            Editorially curated, by invitation.
          </p>
          <div className='flex space-x-4 text-primary'>
            <InstagramSvg className='w-5 h-5 transition hover:text-primary-hover' />
            <TwitterSvg className='w-5 h-5 transition hover:text-primary-hover' />
            <FacebookSvg className='w-5 h-5 transition hover:text-primary-hover' />
            <EmailSvg className='w-5 h-5 transition hover:text-primary-hover' />
          </div>
        </div>

        <div>
          <h4 className='text-foreground font-semibold mb-3'>MARKETPLACE</h4>
          <ul className='space-y-2 text-muted-foreground text-sm'>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Vendors
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Categories
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Cities
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Search
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-foreground font-semibold mb-3'>COMPANY</h4>
          <ul className='space-y-2 text-muted-foreground text-sm'>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Journal
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Contact
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                FAQs
              </a>
            </li>
            <li>
              <Link to='/blog' className='hover:text-primary transition-colors'>
                Blog
              </Link>
            </li>
            <li>
              <Link to='/help' className='hover:text-primary transition-colors'>
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-foreground font-semibold mb-3'>LEGAL</h4>
          <ul className='space-y-2 text-muted-foreground text-sm mb-6'>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Privacy
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Terms
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Cookies
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary transition-colors'>
                Vendor Agreement
              </a>
            </li>
          </ul>

          <h4 className='text-foreground font-semibold mb-3'>DISPATCH</h4>
          <p className='text-muted-foreground text-sm mb-3'>
            Quarterly notes from the editors.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
