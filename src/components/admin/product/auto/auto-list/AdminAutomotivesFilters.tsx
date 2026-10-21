import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Search } from 'lucide-react';
import { AdminFilterState } from '../../types/AdminAutomotives';

interface AdminAutomotivesFiltersProps {
  onFilterChange: (filters: AdminFilterState) => void;
  onReset: () => void;
}

const AdminAutomotivesFilters: FC<AdminAutomotivesFiltersProps> = ({
  onFilterChange,
  onReset,
}) => {
  const [draftFilters, setDraftFilters] = useState<AdminFilterState>({ search: '', autoType: null, status: null, city: null, priceRange: null, sortBy: 'newest' });

  const updateFilter = (key: keyof AdminFilterState, value: string | null) => {
    const nextFilters = { ...draftFilters, [key]: value || null };
    setDraftFilters(nextFilters);
    onFilterChange(nextFilters);
  };

  const resetFilters = () => {
    setDraftFilters({ search: '', autoType: null, status: null, city: null, priceRange: null, sortBy: 'newest' });
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-xl border border-[#dce8e0] bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80958a]" />
          <input value={draftFilters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Search vehicles..." className="w-full rounded-lg border border-[#dce8e0] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" />
        </div>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-4 lg:flex">
          <select value={draftFilters.autoType || ''} onChange={(event) => updateFilter('autoType', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="">All types</option><option value="sedan">Sedan</option><option value="suv">SUV</option><option value="pickup">Pickup</option></select>
          <select value={draftFilters.status || ''} onChange={(event) => updateFilter('status', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="">All status</option><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option></select>
          <select value={draftFilters.sortBy} onChange={(event) => updateFilter('sortBy', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest-price">Highest price</option><option value="lowest-price">Lowest price</option></select>
          <button type="button" onClick={resetFilters} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce8e0] px-3 py-2.5 text-sm font-semibold text-[#012E19] hover:bg-[#f0f5f1]"><RotateCcw size={15} /> Reset</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAutomotivesFilters;
