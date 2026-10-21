import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Home } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { AdminFilterState, AdminProperty } from '../../types/AdminProperty';
import { useProperties } from '@/hooks/useAdminProperties';
import AdminPropertyStats from './AdminPropertyStats';
import AdminPropertyFilterToolbar from './AdminPropertyFilterToolbar';
import AdminPropertySkeleton from './AdminPropertySkeleton';
import AdminErrorState from './AdminErrorState';
import AdminEmptyState from './AdminEmptyState';
import AdminPropertyListingCard from './AdminpropertyListingCard';
import AdminDeletePropertyModal from './AdminDeletePropertyModal';
import AdminEditPropertyModal from './AdminEditPropertyModal';
import AdminPagination from './AdminPropertyCard';

export default function AdminPropertiesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState<AdminFilterState>({
    search: '',
    propertyType: null,
    status: null,
    city: null,
    priceRange: null,
    sortBy: 'newest',
  });
  const [selectedProperty, setSelectedProperty] = useState<AdminProperty | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useProperties(filters, currentPage, itemsPerPage);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  const handleFilterChange = (newFilters: AdminFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      propertyType: null,
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

  const handleAddProperty = () => {
    // Navigate to add property page
    window.location.href = '/admin/new-property';
  };

  const handleEdit = (property: AdminProperty) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const handleDelete = (property: AdminProperty) => {
    setSelectedProperty(property);
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
                  <Home className="text-[#F2B60A]" size={26} />
                </div>
                My Properties
              </h1>
              <p className="max-w-2xl text-sm text-[#60756a] sm:text-lg">
                Manage, edit, and organize all your uploaded property listings.
              </p>
            </div>

            {/* Add button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProperty}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#012E19] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#074b2d] hover:shadow-xl md:w-auto"
            >
              <Plus size={20} />
              Add New Property
            </motion.button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <AdminPropertyStats />

        {/* Filters */}
        <AdminPropertyFilterToolbar onFilterChange={handleFilterChange} onReset={handleReset} />

        {/* Properties grid */}
        {isLoading ? (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <AdminPropertySkeleton key={i} />)}
          </div>
        ) : isError ? (
          <AdminErrorState message="Failed to load properties" onRetry={() => refetch()} />
        ) : !data || data.data.length === 0 ? (
          <AdminEmptyState onAddProperty={handleAddProperty} />
        ) : (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {data.data.map((property, index) => (
                <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <AdminPropertyListingCard property={property} onEdit={handleEdit} onDelete={handleDelete} />
                </motion.div>
              ))}
            </motion.div>
            {data.total > itemsPerPage && <AdminPagination currentPage={currentPage} totalPages={totalPages} totalItems={data.total} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} onItemsPerPageChange={handleItemsPerPageChange} />}
          </>
        )}
      </div>
      <AdminEditPropertyModal isOpen={isEditModalOpen} property={selectedProperty} onClose={() => setIsEditModalOpen(false)} onSuccess={() => refetch()} />
      <AdminDeletePropertyModal isOpen={isDeleteModalOpen} propertyId={selectedProperty?.id || ''} propertyTitle={selectedProperty?.title || ''} onClose={() => setIsDeleteModalOpen(false)} onSuccess={() => refetch()} />
    </div>
  );
}
