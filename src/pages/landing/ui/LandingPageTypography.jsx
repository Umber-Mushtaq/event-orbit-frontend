import Badge from "../../../shared_components/Badge";
function LandingPageTypography() {
  return (
    <>
      <Badge title='Event Orbit' />
      <h2 className='font-display text-3xl leading-normal tracking-wide !text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)] md:text-6xl'>
        The smartest way to make your{" "}
        <span className='text-amber-400 italic drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]'>
          special day perfect
        </span>
      </h2>
      <p className='mx-auto mb-8 mt-3 max-w-3xl text-sm font-semibold tracking-wide text-white! drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-base'>
        An editorially curated marketplace of vetted venues, photographers,
        florists, planners and chefs across 68 cities.
      </p>
    </>
  );
}
export default LandingPageTypography;
