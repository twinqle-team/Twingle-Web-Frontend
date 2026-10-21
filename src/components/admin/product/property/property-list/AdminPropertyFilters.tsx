import { FC, useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { FilterState } from '@/components/vendor/types/property';

interface AdminPropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const AdminPropertyFilters: FC<AdminPropertyFiltersProps> = ({ onFilterChange, onReset }) => {
  const [draftFilters, setDraftFilters] = useState<FilterState>({ search: '', propertyType: null, status: null, city: null, priceRange: null, sortBy: 'newest' });

  const updateFilter = (key: keyof FilterState, value: string | null) => {
    const nextFilters = { ...draftFilters, [key]: value || null };
    setDraftFilters(nextFilters);
    onFilterChange(nextFilters);
  };

  const resetFilters = () => {
    setDraftFilters({ search: '', propertyType: null, status: null, city: null, priceRange: null, sortBy: 'newest' });
    onReset();
  };

  return (
    <div className="mb-6 rounded-xl border border-[#dce8e0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80958a]" /><input value={draftFilters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Search properties..." className="w-full rounded-lg border border-[#dce8e0] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></div>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-4 lg:flex">
          <select value={draftFilters.propertyType || ''} onChange={(event) => updateFilter('propertyType', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="">All types</option><option value="apartment">Apartment</option><option value="house">House</option><option value="villa">Villa</option><option value="land">Land</option></select>
          <select value={draftFilters.status || ''} onChange={(event) => updateFilter('status', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="">All status</option><option value="for-sale">For sale</option><option value="for-rent">For rent</option><option value="sold">Sold</option></select>
          <select value={draftFilters.sortBy} onChange={(event) => updateFilter('sortBy', event.target.value)} className="rounded-lg border border-[#dce8e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#F2B60A]"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest-price">Highest price</option><option value="lowest-price">Lowest price</option></select>
          <button type="button" onClick={resetFilters} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce8e0] px-3 py-2.5 text-sm font-semibold text-[#012E19] hover:bg-[#f0f5f1]"><RotateCcw size={15} /> Reset</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyFilters;
