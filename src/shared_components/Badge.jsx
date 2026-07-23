import { Sparkles } from "lucide-react";
function Badge({ title }) {
  return (
    <div className='relative inline-flex items-center space-x-2 overflow-hidden rounded-full border border-primary/30 bg-card px-4 py-2 shadow-gold-glow'>
      <span className='absolute inset-0 animate-ping rounded-full border border-primary/30'></span>
      <Sparkles className='h-5 w-5 animate-spin-slow text-primary' />
      <span className='font-semibold tracking-wide text-primary animate-shimmer'>
        {title}
      </span>
    </div>
  );
}
export default Badge;
