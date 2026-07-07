import { SearchX } from "lucide-react";

function NothingFound({ msg }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[220px] space-y-4 text-center'>
      <div className='p-4 rounded-full bg-neutral-900 border border-border-gold shadow-gold-glow animate-pulse'>
        <SearchX className='w-8 h-8 text-amber-400' />
      </div>
      <p className='text-neutral-900 font-semibold tracking-wide'>{msg}</p>
      <p className='text-xs text-stone-500'>
        Try changing your input or explore other options.
      </p>
    </div>
  );
}

export default NothingFound;
