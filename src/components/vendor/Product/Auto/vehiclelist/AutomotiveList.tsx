// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Home } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import { FilterState } from '@/components/vendor/types/Automotives';
// import { useAutomotive } from '@/hooks/useAutomotive';
// import AutomotivesCard from './AutomotivesCard';
// // import AutomotivesStats from './AutomotivesStats';
// import AutomotivesSkeleton from './AutomotivesSkeleton';
// import AutomotivesStats from './AutomotivesStats';
// import AutoPagination from './AutoPagination';
// import AutoErrorState from './AutoErrorState';


// const AutomotivesCardAny: any = AutomotivesCard;

// export default function AutomotiveList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [filters, setFilters] = useState<FilterState>({
//     search: '',
//     autoType: null,
//     status: null,
//     city: null,
//     priceRange: null,
//     sortBy: 'newest',
//   });

//   const { data, isLoading, isError, refetch } = useAutomotive(filters, currentPage, itemsPerPage);

//   const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

//   const handleFilterChange = (newFilters: FilterState) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   const handleReset = () => {
//     setFilters({
//       search: '',
//       autoType: null,
//       status: null,
//       city: null,
//       priceRange: null,
//       sortBy: 'newest',
//     });
//     setCurrentPage(1);
//   };

//   const handleItemsPerPageChange = (count: number) => {
//     setItemsPerPage(count);
//     setCurrentPage(1);
//   };

//   const handleAddAutomotive = () => {
//     // Navigate to add automotive page
//     window.location.href = '/app/new-automotive';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
//       <Toaster position="top-right" />

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         {/* Page header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >

//           {/* Title and description */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center gap-3">
//                 <div className="p-2 bg-blue-500 rounded-lg">
//                   <Home className="text-white" size={32} />
//                 </div>
//                 My Automotive Listings
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Manage, edit, and organize all your uploaded automotive listings.
//               </p>
//             </div>

//             {/* Add button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleAddAutomotive}
//               className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
//             >
//               <Plus size={20} />
//               Add New Automotive
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Stats cards */}
//         <AutomotivesStats />

//         {/* Filters */}
//         {/* Type conflict workaround: suppress TS error when props don't match inferred component type */}
//         {/* @ts-ignore */}
//         <AutomotivesFilters onFilterChange={handleFilterChange} onReset={handleReset} />

//         {/* Properties grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {[...Array(12)].map((_, i) => (
//               <AutomotivesSkeleton key={i} />
//             ))}
//           </div>
//         ) : isError ? (
//           <AutoErrorState message="Failed to load automotive listings" onRetry={() => refetch()} />
//         ) : !data || data.data.length === 0 ? (
//           <AutoErrorState onAddProperty={handleAddAutomotive} />
//         ) : (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//             >
//               {data.data.map((automotive:any, index:any) => (
//                 <motion.div
//                   key={automotive.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <AutomotivesCardAny automotive={automotive} />
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Pagination */}
//             {data.total > itemsPerPage && (
//               <AutoPagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 totalItems={data.total}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={setCurrentPage}
//                 onItemsPerPageChange={handleItemsPerPageChange}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
