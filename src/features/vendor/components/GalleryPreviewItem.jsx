import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

function GalleryPreviewItem({ asset, index, onRemove, onUploadTrigger }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!asset) {
      setPreviewUrl(null);
      return;
    }

    // Handle File instances safely with automatic cleanup
    if (asset instanceof File) {
      const objectUrl = URL.createObjectURL(asset);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    // If it's already a Cloudinary/remote URL string, use directly
    setPreviewUrl(asset);
  }, [asset]);

  return (
    <div className='aspect-square bg-neutral-900/40 border border-stone-400 rounded-xl flex items-center justify-center relative overflow-hidden hover:border-border-gold transition-colors duration-200 group'>
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt='Work Preview'
            className='w-full h-full object-cover'
          />
          {/* Remove Button Overlay */}
          <button
            type='button'
            onClick={() => onRemove(index)}
            className='absolute top-1 right-1 p-1 bg-black/80 text-rose-400 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer'
          >
            <X className='w-3 h-3' />
          </button>
        </>
      ) : (
        /* Empty Slot Click Trigger */
        <div
          onClick={onUploadTrigger}
          className='w-full h-full flex items-center justify-center cursor-pointer'
        >
          <Upload className='w-5 h-5 opacity-20 text-white' />
        </div>
      )}
    </div>
  );
}

export default GalleryPreviewItem;
