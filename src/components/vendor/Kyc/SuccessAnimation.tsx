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
        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border-8 border-[#F2B60A] bg-[#fff8df] sm:h-32 sm:w-32"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Check className="h-16 w-16 text-[#012E19] sm:h-20 sm:w-20" strokeWidth={4} />
        </motion.div>
      </motion.div>
      
      <h2 className="text-center text-3xl font-semibold text-[#012E19] sm:text-4xl">Verification Submitted</h2>
      <p className="mt-4 max-w-sm text-center text-base text-[#60756a] sm:text-lg">
        Your documents have been securely received. Our team will review shortly.
      </p>
    </div>
  );
};