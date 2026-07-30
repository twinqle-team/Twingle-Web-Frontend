import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDeleteProperty } from '@/hooks/useProperties';

interface DeletePropertyModalProps {
  isOpen: boolean;
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeletePropertyModal: FC<DeletePropertyModalProps> = ({
  isOpen,
  propertyId,
  propertyTitle,
  onClose,
  onSuccess,
}) => {
  const { mutate: deleteProperty, isPending } = useDeleteProperty();

  const handleDelete = async () => {
    deleteProperty(propertyId, {
      onSuccess: () => {
        toast.success('Property deleted successfully');
        onClose();
        onSuccess?.();
      },
      onError: () => {
        toast.error('Failed to delete property');
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header with danger color */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-white flex-shrink-0" />
                <h2 className="text-xl font-bold text-white">Delete Property?</h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Are you sure you want to permanently delete this property?
                  </p>
                  <p className="text-gray-900 font-semibold bg-gray-50 px-4 py-3 rounded-lg">
                    "{propertyTitle}"
                  </p>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone. All associated data will be permanently removed.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending && <Loader size={18} className="animate-spin" />}
                    {isPending ? 'Deleting...' : 'Delete Property'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeletePropertyModal;
