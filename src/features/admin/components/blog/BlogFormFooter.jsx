import { FileText, RotateCcw, Save } from "lucide-react";

function BlogFormFooter({ form, mode, onReset }) {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='min-w-0 space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
          Featured Preview
        </p>
        <div className='flex items-center gap-3'>
          <div className='h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-black/30'>
            {form.featureImage ? (
              <img
                src={form.featureImage}
                alt='Featured preview'
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center text-stone-500'>
                <FileText className='h-6 w-6' />
              </div>
            )}
          </div>
          <div className='min-w-0'>
            <p className='truncate text-sm font-semibold text-white'>
              {form.title || "Blog title preview"}
            </p>
            <p className='mt-1 text-xs text-stone-400'>
              {form.category || "Planning"} â€¢ {form.status}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-3'>
        <button
          type='button'
          onClick={onReset}
          className='inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
        >
          <RotateCcw className='h-4 w-4' />
          Reset
        </button>
        <button
          type='submit'
          className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
        >
          <Save className='h-4 w-4' />
          {mode === "edit" ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </div>
  );
}

export default BlogFormFooter;
