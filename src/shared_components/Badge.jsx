import { Sparkles } from "lucide-react";
function Badge({ title }) {
  return (
    <div className='inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-900 border border-border-gold shadow-gold-glow relative overflow-hidden'>
      <span className='absolute inset-0 rounded-full border border-amber-400/30 animate-ping'></span>
      <Sparkles className='w-5 h-5 text-amber-400 animate-spin-slow' />
      <span className='text-amber-400 font-semibold tracking-wide animate-shimmer'>
        {title}
      </span>
    </div>
  );
}
export default Badge;
