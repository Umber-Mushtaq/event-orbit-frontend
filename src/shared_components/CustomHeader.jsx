import Badge from "./Badge";

export default function CustomHeader({ badge, title }) {
  return (
    <div>
      <Badge title={badge} />
      <h1 className='font-montserrat font-black mt-5 text-3xl md:text-5xl text-amber-400 tracking-wide uppercase'>
        {title}
      </h1>
    </div>
  );
}
