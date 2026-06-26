import {
  InstagramSvg,
  TwitterSvg,
  FacebookSvg,
  EmailSvg,
} from "../../../shared_components/SocialIcons";

function LandingPageFooter() {
  return (
    <footer className='bg-neutral-950 border-t border-border-gold text-stone-300 py-12 px-6 md:px-12'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8'>
        <div className='md:col-span-2 space-y-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-neutral-950 shadow-gold-glow'>
              A
            </div>
            <span className='text-lg font-montserrat text-amber-400'>
              Atelier Maison
            </span>
          </div>
          <p className='text-stone-400 text-sm leading-relaxed'>
            A vetted marketplace of the world's most considered event makers.
            Editorially curated, by invitation.
          </p>
          <div className='flex space-x-4 text-amber-400'>
            <InstagramSvg className='w-5 h-5 hover:text-amber-300 transition' />
            <TwitterSvg className='w-5 h-5 hover:text-amber-300 transition' />
            <FacebookSvg className='w-5 h-5 hover:text-amber-300 transition' />
            <EmailSvg className='w-5 h-5 hover:text-amber-300 transition' />
          </div>
        </div>

        <div>
          <h4 className='text-stone-300 font-semibold mb-3'>MARKETPLACE</h4>
          <ul className='space-y-2 text-stone-400 text-sm'>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Vendors
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Categories
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Cities
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Search
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-stone-300 font-semibold mb-3'>COMPANY</h4>
          <ul className='space-y-2 text-stone-400 text-sm'>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Journal
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Contact
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-stone-300 font-semibold mb-3'>LEGAL</h4>
          <ul className='space-y-2 text-stone-400 text-sm mb-6'>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Privacy
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Terms
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Cookies
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-amber-400 transition'>
                Vendor Agreement
              </a>
            </li>
          </ul>

          <h4 className='text-stone-300 font-semibold mb-3'>DISPATCH</h4>
          <p className='text-stone-400 text-sm mb-3'>
            Quarterly notes from the editors.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
