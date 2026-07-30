import { FC } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: FC<ErrorStateProps> = ({
  message = 'Something went wrong',
  onRetry,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 p-12 shadow-lg text-center"
    >
      {/* Icon */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mx-auto mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-orange-200 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={48} className="text-red-600" />
        </div>
      </motion.div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something Went Wrong</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{message}</p>

      {/* Button */}
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          <RotateCcw size={20} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorState;
