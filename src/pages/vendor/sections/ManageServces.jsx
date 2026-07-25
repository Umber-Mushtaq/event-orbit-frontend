import { Plus, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useManageServices } from "../hooks/useManageServices";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import ServiceCard from "../components/ServiceCard";

function ManageServices() {
  const dashboard = useManageServices();

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-2xl py-4 px-3 sm:px-6 text-white relative overflow-hidden'>
      {/* Navigation & Creation Header Block */}
      <div className='w-full max-w-full mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 pb-6 border-b border-white/5 z-10 relative'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-normal text-2xl text-white tracking-tight'>
            Manage Categories
          </h1>
          <p className='font-poppins font-light text-xs sm:text-sm text-stone-400 mt-1'>
            Review live portfolio listings, filter status rows, and manage
            entries.
          </p>
        </div>

        <Link
          to='/vendor/dashboard/create'
          className='bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-3 px-5 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap'
        >
          <Plus className='w-4 h-4 text-border-gold-hover' />
          Add New Category
        </Link>
      </div>

      {/* Dynamic Main Flow Routing Interface */}
      {dashboard.loading ? (
        <div className='w-full py-24 flex flex-col items-center justify-center gap-3 text-stone-400 font-poppins text-sm'>
          <Loader2 className='w-8 h-8 animate-spin text-border-gold-hover' />
          <span>Syncing marketplace profile database...</span>
        </div>
      ) : dashboard.error ? (
        <div className='w-full text-center font-poppins text-xs text-red-400 bg-red-500/10 border border-red-500/20 py-4 rounded-xl'>
          {dashboard.error}
        </div>
      ) : dashboard.services.length === 0 ? (
        <div className='w-full text-center font-poppins text-sm py-16 border border-dashed border-white/10 rounded-2xl text-stone-500 flex flex-col items-center gap-3'>
          <span>You haven't listed any categories yet.</span>
          <Link
            to='/vendor/dashboard/create'
            className='text-xs text-border-gold-hover underline hover:text-white'
          >
            Create your first category listing
          </Link>
        </div>
      ) : (
        /* Render Data Loop Output Stream */
        <div className='w-full max-w-full mx-auto flex flex-col gap-4 z-10 relative'>
          {dashboard.services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onDeleteClick={dashboard.openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* Modal View Context Layer */}
      <DeleteConfirmationModal
        isOpen={dashboard.isModalOpen}
        isLoading={dashboard.deleteLoading}
        onClose={dashboard.closeDeleteModal}
        onConfirm={dashboard.confirmDelete}
      />
    </section>
  );
}

export default ManageServices;
