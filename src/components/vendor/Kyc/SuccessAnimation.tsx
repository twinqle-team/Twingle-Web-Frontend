// src/components/kyc/SuccessAnimation.tsx
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

export const SuccessAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center border-8 border-emerald-400 mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Check className="w-20 h-20 text-emerald-400" strokeWidth={4} />
        </motion.div>
      </motion.div>
      
      <h2 className="text-4xl font-semibold text-white text-center">Verification Submitted</h2>
      <p className="text-white/70 text-center max-w-xs mt-4 text-lg">
        Your documents have been securely received. Our team will review shortly.
      </p>
    </div>
  );
};