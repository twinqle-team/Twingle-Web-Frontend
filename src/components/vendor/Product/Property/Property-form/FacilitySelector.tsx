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
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2.5 text-center font-medium transition-all duration-200 sm:rounded-full sm:px-4
                ${
                  selectedFacilities[facility.id as keyof typeof selectedFacilities]
                    ? 'border-[#012E19] bg-[#012E19] text-white shadow-lg'
                    : 'border-[#dce8e0] bg-white text-[#012E19] hover:border-[#F2B60A]'
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
                className="inline-flex items-center gap-2 rounded-full border border-[#f3d37a] bg-[#fff8df] px-3 py-1.5 text-sm font-medium text-[#8a6400]"
              >
                {facility}
                <button
                  onClick={() => onCustomFacilityRemove(facility)}
                  type="button"
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-[#f3d37a]"
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
              className="flex items-center gap-2 rounded-lg border-2 border-dashed border-[#b8cfc1] px-4 py-2.5 font-medium text-[#60756a] transition-colors hover:border-[#F2B60A] hover:text-[#012E19]"
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
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="text"
                placeholder="e.g., Solar Panels, Smart Home..."
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                autoFocus
                className="min-w-0 flex-1 rounded-lg border border-[#b8cfc1] px-4 py-2.5 font-medium outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="rounded-lg bg-[#012E19] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#074b2d]"
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
                className="rounded-lg bg-[#eef4f0] px-4 py-2.5 font-medium text-[#012E19] transition-colors hover:bg-[#e1ece5]"
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
