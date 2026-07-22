import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { FACILITIES } from '@/components/vendor/Product/Property/Property-form/schema';

interface FacilitySelectorProps {
  selectedFacilities: Record<string, boolean>;
  customFacilities: string[];
  onFacilityChange: (facilityId: string, selected: boolean) => void;
  onCustomFacilityAdd: (facility: string) => void;
  onCustomFacilityRemove: (facility: string) => void;
}

const FacilitySelector: FC<FacilitySelectorProps> = ({
  selectedFacilities,
  customFacilities,
  onFacilityChange,
  onCustomFacilityAdd,
  onCustomFacilityRemove,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacility, setNewFacility] = useState('');

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFacility.trim()) {
      onCustomFacilityAdd(newFacility.trim());
      setNewFacility('');
      setShowAddForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Predefined Facilities */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-900 mb-4">Popular Facilities</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {FACILITIES.map((facility) => (
            <motion.button
              key={facility.id}
              onClick={() =>
                onFacilityChange(
                  facility.id,
                  !selectedFacilities[facility.id as keyof typeof selectedFacilities]
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`px-4 py-2.5 rounded-full font-medium transition-all duration-200 border-2 flex items-center justify-center gap-2
                ${
                  selectedFacilities[facility.id as keyof typeof selectedFacilities]
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: selectedFacilities[facility.id as keyof typeof selectedFacilities]
                    ? 1
                    : 0.8,
                }}
              >
                {selectedFacilities[facility.id as keyof typeof selectedFacilities] && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
              <span className="text-sm">{facility.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Facilities */}
      <div className="border-t pt-6">
        <p className="text-sm font-semibold text-gray-900 mb-4">Custom Facilities</p>

        {/* Custom Facility Tags */}
        {customFacilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {customFacilities.map((facility) => (
              <motion.div
                key={facility}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700"
              >
                {facility}
                <button
                  onClick={() => onCustomFacilityRemove(facility)}
                  type="button"
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  aria-label="Remove facility"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add Custom Facility */}
        <AnimatePresence>
          {!showAddForm ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(true)}
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 font-medium transition-colors"
            >
              <Plus size={18} />
              Add Custom Facility
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleAddFacility}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="e.g., Solar Panels, Smart Home..."
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-2.5 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
              >
                Add
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddForm(false);
                  setNewFacility('');
                }}
                type="button"
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                Cancel
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FacilitySelector;
