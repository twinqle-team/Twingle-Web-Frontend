import  { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { VEHICLE_FEATURES } from '@/lib/auto/automotiveValidationSchema';

interface AutomotiveFeatureSelectorProps {
  selectedFeatures: string[];
  customFeatures: string[];
  onFeaturesChange: (features: string[]) => void;
  onCustomFeaturesChange: (customFeatures: string[]) => void;
  error?: string;
}

export default function AutomotiveFeatureSelector({
  selectedFeatures,
  customFeatures,
  onFeaturesChange,
  onCustomFeaturesChange,
  error,
}: AutomotiveFeatureSelectorProps) {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customFeatureInput, setCustomFeatureInput] = useState('');

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onFeaturesChange(selectedFeatures.filter(f => f !== feature));
    } else {
      onFeaturesChange([...selectedFeatures, feature]);
    }
  };

  const addCustomFeature = () => {
    if (customFeatureInput.trim() && !customFeatures.includes(customFeatureInput.trim())) {
      onCustomFeaturesChange([...customFeatures, customFeatureInput.trim()]);
      setCustomFeatureInput('');
      setIsAddingCustom(false);
    }
  };

  const removeCustomFeature = (feature: string) => {
    onCustomFeaturesChange(customFeatures.filter(f => f !== feature));
  };

  return (
    <div className="space-y-4">
      {/* Predefined Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {VEHICLE_FEATURES.map((feature) => (
          <motion.button
            key={feature}
            type="button"
            onClick={() => toggleFeature(feature)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              selectedFeatures.includes(feature)
                ? 'bg-[#012E19] text-white shadow-lg'
                : 'border border-[#dce8e0] bg-white text-[#012E19] hover:border-[#F2B60A] hover:bg-[#fff8df]'
            }`}
          >
            {feature}
          </motion.button>
        ))}
      </div>

      {/* Custom Features */}
      {customFeatures.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Custom Features</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {customFeatures.map((feature) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <div className="flex items-center justify-between gap-2 rounded-full bg-[#F2B60A] px-4 py-2 text-sm font-medium text-[#012E19]">
                  <span className="truncate">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeCustomFeature(feature)}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Feature Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        {isAddingCustom ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={customFeatureInput}
              onChange={(e) => setCustomFeatureInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomFeature();
                }
              }}
              placeholder="Enter custom feature"
              className="min-w-0 flex-1 rounded-lg border border-[#dce8e0] px-4 py-2 outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20"
              autoFocus
            />
            <button
              onClick={addCustomFeature}
              className="rounded-lg bg-[#012E19] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#074b2d]"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingCustom(false);
                setCustomFeatureInput('');
              }}
              className="rounded-lg bg-[#eef4f0] px-4 py-2 text-sm font-medium text-[#012E19] transition-colors hover:bg-[#e1ece5]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsAddingCustom(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-[#b8cfc1] px-4 py-2 text-sm font-medium text-[#012E19] transition-colors hover:border-[#F2B60A] hover:bg-[#fff8df]"
          >
            <Plus size={18} />
            Add Custom Feature
          </motion.button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
