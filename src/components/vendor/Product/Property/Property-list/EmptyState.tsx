import { FC } from 'react';
import { motion } from 'framer-motion';
import { Home, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddProperty?: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ onAddProperty }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 p-12 shadow-lg text-center"
    >
      {/* Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mx-auto mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center mx-auto">
          <Home size={48} className="text-blue-600" />
        </div>
      </motion.div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven&apos;t uploaded any properties yet. Start by creating your first property listing to get started!
      </p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddProperty}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        <Plus size={20} />
        Add Property
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;
