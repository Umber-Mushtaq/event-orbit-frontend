import Badge from "../../../shared_components/Badge";
function LandingPageTypography() {
  return (
    <>
      <Badge title='Event Orbit' />
      <h2 className='mask-neutral-50 font-display text-3xl md:text-6xl text-white tracking-wide leading-normal mb-4'>
        The World's Most Considered{" "}
        <span className='text-amber-400 mask-linear-amber-800 italic drop-shadow-md'>
          Event Markets
        </span>
        , in one place.
      </h2>
      <p className='text-stone-300 tracking-wide mb-8'>
        An editorially curated marketplace of vetted venues, photographers,
        florists, planners and chefs across 68 cities.
      </p>
    </>
  );
}
export default LandingPageTypography;
