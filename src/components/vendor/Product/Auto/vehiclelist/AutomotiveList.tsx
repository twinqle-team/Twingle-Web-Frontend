import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Car } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Automotives, FilterState } from '@/components/vendor/types/Automotives';
import { useAutomotive } from '@/hooks/useAutomotive';
import AutomotiveVehicleCard from './AutomotiveVehicleCard';
import AutomotivesFilters from './AutomotivesFilters';
import AutomotivesSkeleton from './AutomotivesSkeleton';
import AutomotivesStats from './AutomotivesStats';
import AutoPagination from './AutoPagination';
import AutoErrorState from './AutoErrorState';
import AutoEmptyState from './AutoEmptystate';
import AutoEditModal from './AutoEditModal';
import AutoDeleteModal from './AutoDeleteModal';


export default function AutomotiveList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    autoType: null,
    status: null,
    city: null,
    priceRange: null,
    sortBy: 'newest',
  });
  const [selectedAutomotive, setSelectedAutomotive] = useState<Automotives | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useAutomotive(filters, currentPage, itemsPerPage);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      autoType: null,
      status: null,
      city: null,
      priceRange: null,
      sortBy: 'newest',
    });
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const handleAddAutomotive = () => {
    // Navigate to add automotive page
    window.location.href = '/app/new-automotive';
  };

  const handleEdit = (automotive: Automotives) => {
    setSelectedAutomotive(automotive);
    setIsEditModalOpen(true);
  };

  const handleDelete = (automotive: Automotives) => {
    setSelectedAutomotive(automotive);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-full bg-[#f7faf8] text-[#012E19]">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >

          {/* Title and description */}
          <div className="mb-6 flex flex-col gap-5 sm:mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-3 flex items-center gap-3 text-3xl font-bold text-[#012E19] sm:text-4xl md:text-5xl">
                <div className="shrink-0 rounded-lg bg-[#012E19] p-2">
                  <Car className="text-[#F2B60A]" size={26} />
                </div>
                My Automotive Listings
              </h1>
              <p className="max-w-2xl text-sm text-[#60756a] sm:text-lg">
                Manage, edit, and organize all your uploaded automotive listings.
              </p>
            </div>

            {/* Add button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddAutomotive}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#012E19] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#074b2d] hover:shadow-xl md:w-auto"
            >
              <Plus size={20} />
              Add New Automotive
            </motion.button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <AutomotivesStats />

        {/* Filters */}
        <AutomotivesFilters onFilterChange={handleFilterChange} onReset={handleReset} />

        {/* Properties grid */}
        {isLoading ? (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[...Array(12)].map((_, i) => (
              <AutomotivesSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <AutoErrorState message="Failed to load automotive listings" onRetry={() => refetch()} />
        ) : !data || data.data.length === 0 ? (
          <AutoEmptyState onAddAuto={handleAddAutomotive} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {data.data.map((automotive:any, index:any) => (
                <motion.div
                  key={automotive.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AutomotiveVehicleCard automotive={automotive} onEdit={handleEdit} onDelete={handleDelete} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {data.total > itemsPerPage && (
              <AutoPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={data.total}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </>
        )}
      </div>
      <AutoEditModal
        isOpen={isEditModalOpen}
        property={selectedAutomotive}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => refetch()}
      />
      <AutoDeleteModal
        isOpen={isDeleteModalOpen}
        AutomotivesId={selectedAutomotive?.id || ''}
        AutomotivesTitle={selectedAutomotive?.title || ''}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
