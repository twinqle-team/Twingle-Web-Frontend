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
            onClick={() => toggleFeature(feature)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              selectedFeatures.includes(feature)
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
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
                <div className="px-4 py-2 rounded-full font-medium text-sm bg-purple-500 text-white flex items-center justify-between gap-2">
                  <span className="truncate">{feature}</span>
                  <button
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
          <div className="flex gap-2">
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
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={addCustomFeature}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingCustom(false);
                setCustomFeatureInput('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsAddingCustom(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors font-medium text-sm"
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
