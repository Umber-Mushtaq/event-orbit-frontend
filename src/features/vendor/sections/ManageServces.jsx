import { useState } from "react";
import { Plus, Edit2, Trash2, AlertTriangle, X, Eye } from "lucide-react";
import { SERVICES_LIST as initialServices } from "../dummyData";
import { Link } from "react-router";

function ManageServices() {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const triggerDeletePrompt = (id) => {
    setSelectedServiceId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setServices((prev) => prev.filter((item) => item.id !== selectedServiceId));
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-2xl py-3 px-4 text-white relative overflow-hidden'>
      <div className='w-full max-w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5 z-10 relative'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-normal text-2xl text-white tracking-tight'>
            Manage Services
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
            Review live portfolio listings, filter status rows, and manage
            entries.
          </p>
        </div>

        <Link
          to='/vendor/dashboard/create'
          className='bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-3 px-5 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap'
        >
          <Plus className='w-4 h-4 text-border-gold-hover' />
          Add New Service
        </Link>
      </div>

      <div className='w-full max-w-full mx-auto flex flex-col gap-4 z-10 relative'>
        {services.map((service) => (
          <div
            key={service.id}
            className='bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 transition-all duration-300 hover:border-border-gold/30 hover:shadow-lg'
          >
            {/* Left Box: Thumbnail + Info Stack */}
            <div className='flex items-center gap-4 sm:gap-5 w-full sm:w-auto min-w-0'>
              {/* Responsive Thumbnail Sizing */}
              <div className='w-24 h-20 sm:w-28 sm:h-22 md:w-32 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-md'>
                <img
                  src={service.image}
                  alt={service.title}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Text Container: min-w-0 prevents text overflow crashes */}
              <div className='font-poppins flex flex-col min-w-0'>
                <h3 className='font-montserrat font-bold text-sm sm:text-base md:text-lg text-white tracking-wide truncate'>
                  {service.title}
                </h3>
                <span className='text-[11px] sm:text-xs text-stone-400 mt-0.5'>
                  {service.category}
                </span>
                <span className='text-xs sm:text-sm font-bold text-border-gold-hover tracking-wide mt-1.5 sm:mt-2'>
                  ${service.price}
                </span>
              </div>
            </div>

            {/* Right Box: Status Badges & Action Buttons */}
            <div className='flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0'>
              {/* STATUS IDENTIFIER BADGE */}
              <span
                className={`font-poppins text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap ${
                  service.status === "approved"
                    ? "text-emerald-400 drop-shadow-[0_2px_8px_rgba(52,211,153,0.15)]"
                    : "text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]"
                }`}
              >
                ● {service.status}
              </span>

              {/* ACTION TOGGLES BUTTON ROW */}
              <div className='flex items-center gap-2 shrink-0'>
                <button className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold text-white font-poppins text-[10px] sm:text-[11px] font-semibold py-2 px-3 sm:px-3.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-gold-glow whitespace-nowrap'>
                  <Edit2 className='w-3 h-3 text-border-gold-hover' />
                  Edit
                </button>
                <Link
                  to='/vendor/dashboard/service/detatails'
                  className='bg-teal-950/40 hover:bg-teal-900/50 border border-teal-500/50 text-teal-200 font-poppins text-[10px] sm:text-[11px] font-semibold py-2 px-3 sm:px-3.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap'
                >
                  <Eye className='w-3 h-3 text-teal-400/80' />
                  View
                </Link>

                <button
                  onClick={() => triggerDeletePrompt(service.id)}
                  className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-poppins text-[10px] sm:text-[11px] font-semibold py-2 px-3 sm:px-3.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap'
                >
                  <Trash2 className='w-3 h-3' />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in'>
          <div className='w-full max-w-md bg-neutral-900 border border-stone-400 rounded-3xl p-6 md:p-8 shadow-2xl relative flex flex-col items-center text-center animate-scale-fade'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer'
            >
              <X className='w-5 h-5' />
            </button>

            <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
              <AlertTriangle className='w-6 h-6' />
            </div>

            <h2 className='font-montserrat font-bold text-xl text-white tracking-tight'>
              Confirm Delete
            </h2>
            <p className='font-poppins font-light text-sm text-stone-400 mt-2 leading-relaxed max-w-xs'>
              Are you absolutely sure you want to remove this service entry?
              This configuration path action cannot be undone.
            </p>

            <div className='grid grid-cols-2 gap-4 w-full mt-8'>
              <button
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='w-full bg-neutral-800 hover:bg-neutral-700 border border-white/5 text-stone-300 font-poppins text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer'
              >
                No, Cancel
              </button>

              <button
                type='button'
                onClick={handleConfirmDelete}
                className='w-full bg-red-500 text-white font-poppins text-xs font-semibold py-3 px-4 rounded-xl hover:bg-red-600 active:scale-98 transition-all cursor-pointer shadow-lg shadow-red-500/10'
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ManageServices;
