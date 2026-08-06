import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const SavedPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Saved Properties</h1>
        <p className="mt-2 text-gray-600">Properties you have saved</p>
      </div>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-xl shadow-sm"
      >
        <div className="p-4 bg-gray-50 rounded-full mb-4">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved properties yet</h3>
        <p className="text-sm text-gray-600 text-center max-w-md">
          Start exploring properties and save your favorites to see them here.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SavedPage;