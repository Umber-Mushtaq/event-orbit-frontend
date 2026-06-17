import { useRef } from "react";
import { Upload } from "lucide-react";
import CreateServiceFormHeaders from "./CreateServiceFormHeaders";
import GalleryPreviewItem from "../components/GalleryPreviewItem";

function GalleryUploadSection({ form }) {
  const fileInputRef = useRef(null);

  // Normalize fallback variations between creating versus editing hooks
  const currentImagesArray = form.imageFiles || form.images || [];
  const isLimitReached = currentImagesArray.length >= 6;

  const triggerFileSelection = () => {
    if (!isLimitReached) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelection = (e) => {
    const freshFiles = Array.from(e.target.files);

    if (currentImagesArray.length + freshFiles.length > 6) {
      alert("You can only upload up to 6 portfolio pictures.");
      return;
    }

    const updateFn = (prev) => [...prev, ...freshFiles];
    if (form.setImageFiles) form.setImageFiles(updateFn);
    else if (form.setImages) form.setImages(updateFn);
  };

  const removeFileFromBatch = (indexToRemove) => {
    const filterFn = (prev) => prev.filter((_, idx) => idx !== indexToRemove);

    if (form.setImageFiles) form.setImageFiles(filterFn);
    else if (form.setImages) form.setImages(filterFn);
  };

  return (
    <div className='bg-white/5 backdrop-blur-md border border-stone-400 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-5'>
      {/* Header Panel Metadata */}
      <div className='flex justify-between items-center'>
        <CreateServiceFormHeaders number={3} text='Gallery Upload Section' />
        <span className='text-[10px] font-poppins font-bold px-2 py-0.5 bg-neutral-900/60 border border-white/10 rounded text-stone-400'>
          {currentImagesArray.length} / 6 Images
        </span>
      </div>

      {/* Native File Input Input Trigger */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileSelection}
        multiple
        accept='image/*'
        className='hidden'
        disabled={form.loading || isLimitReached}
      />

      {/* Core Clickable Drag/Drop Area Box */}
      <div
        onClick={triggerFileSelection}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center group transition-colors duration-300 bg-neutral-900/20 ${
          isLimitReached
            ? "border-stone-700 opacity-30 cursor-not-allowed"
            : "border-stone-400 hover:border-border-gold cursor-pointer"
        }`}
      >
        <div className='w-12 h-12 rounded-full bg-white/5 border border-stone-400 flex items-center justify-center text-stone-400 group-hover:text-border-gold-hover group-hover:border-border-gold/30 transition-all duration-300 mb-4'>
          <Upload className='w-5 h-5' />
        </div>
        <p className='font-poppins font-medium text-sm text-stone-400 mb-1'>
          {isLimitReached ? "Upload limit reached" : "Upload Image"}
        </p>
        <p className='font-poppins font-light text-xs text-stone-400'>
          Showcase your best work (Max 5MB)
        </p>
      </div>

      {/* Fixed 6-Slot Grid Preview Matrix */}
      <div className='grid grid-cols-3 gap-3 mt-2'>
        {[...Array(6)].map((_, idx) => (
          <GalleryPreviewItem
            key={idx}
            asset={currentImagesArray[idx]}
            index={idx}
            onRemove={removeFileFromBatch}
            onUploadTrigger={triggerFileSelection}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryUploadSection;
