import { FC } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const delta = 2;
    const range:any = [];
    const rangeWithDots:any = [];
    // let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i == 1 || i == totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i:any, index: number) => {
      if (index > 0 && i - range[index - 1] === 2) {
        rangeWithDots.push(range[index - 1] + 1);
      } else if (index > 0 && i - range[index - 1] !== 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
    });

    return rangeWithDots;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 p-6 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Items per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={e => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 text-sm"
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>

        {/* Info text */}
        <div className="text-sm text-gray-600 font-medium">
          Showing {startItem} to {endItem} of {totalItems} Properties
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page:any, index: number) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} className="px-2 py-1 text-gray-600">
                    ...
                  </span>
                );
              }

              return (
                <motion.button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pagination;
