import {
  InstagramSvg,
  TwitterSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";

function LandingPageFooter() {
  return (
    <footer className='bg-neutral-800 border-t border-border-gold text-neutral-900 py-12 px-6 md:px-12'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8'>
        <div className='md:col-span-2 space-y-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-neutral-950 shadow-gold-glow'>
              A
            </div>
            <span className='text-lg font-montserrat text-amber-700'>
              Atelier Maison
            </span>
          </div>
          <p className='text-neutral-900 text-sm leading-relaxed'>
            A vetted marketplace of the world's most considered event makers.
            Editorially curated, by invitation.
          </p>
          <div className='flex space-x-4 text-amber-700'>
            <InstagramSvg className='w-5 h-5 hover:text-amber-700 transition' />
            <TwitterSvg className='w-5 h-5 hover:text-amber-700 transition' />
            <FacebookSvg className='w-5 h-5 hover:text-amber-700 transition' />
            <EmailSvg className='w-5 h-5 hover:text-amber-700 transition' />
          </div>
        </div>

        <div>
          <h4 className='text-neutral-900 font-semibold mb-3'>MARKETPLACE</h4>
          <ul className='space-y-2 text-neutral-900 text-sm'>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Vendors
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Categories
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Cities
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Search
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-neutral-900 font-semibold mb-3'>COMPANY</h4>
          <ul className='space-y-2 text-neutral-900 text-sm'>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Journal
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Contact
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-neutral-900 font-semibold mb-3'>LEGAL</h4>
          <ul className='space-y-2 text-neutral-900 text-sm mb-6'>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Privacy
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Terms
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Cookies
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-700 transition'>
                Vendor Agreement
              </a>
            </li>
          </ul>

          <h4 className='text-neutral-900 font-semibold mb-3'>DISPATCH</h4>
          <p className='text-neutral-900 text-sm mb-3'>
            Quarterly notes from the editors.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
