import { FC } from 'react';
import { motion } from 'framer-motion';

const PropertySkeleton: FC = () => {
  return (
    <motion.div
      className="backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 overflow-hidden shadow-lg"
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Image skeleton */}
      <div className="w-full h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Badge + favorite */}
        <div className="flex justify-between items-start">
          <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse" />

        {/* Location */}
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />

        {/* Price */}
        <div className="h-7 w-2/3 bg-gray-300 rounded animate-pulse" />

        {/* Details grid */}
        <div className="grid grid-cols-4 gap-2 py-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>

        {/* Facilities */}
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>

        {/* Footer text */}
        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-9 bg-gray-300 rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default PropertySkeleton;
