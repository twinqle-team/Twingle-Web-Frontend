// src/components/kyc/DocumentChecklist.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import React, { useState } from 'react';

const checklistItems = [
  "Entire document is visible",
  "All four corners are shown",
  "No glare or reflections",
  "Text is clearly readable",
  "Image is sharp and not blurry",
  "Good lighting conditions",
  "Original document (not a photocopy)"
];

interface DocumentChecklistProps {
  onComplete: (isComplete: boolean) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ onComplete }) => {
  const [checked, setChecked] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    const newChecked = checked.includes(index)
      ? checked.filter(i => i !== index)
      : [...checked, index];
    
    setChecked(newChecked);
    onComplete(newChecked.length === checklistItems.length);
  };

  return (
    <div className="space-y-4">
      {checklistItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => toggleCheck(index)}
          className="group flex cursor-pointer items-start gap-3 rounded-xl border border-[#dce8e0] bg-white p-4 transition-all hover:border-[#F2B60A] hover:bg-[#fffdf5] sm:gap-4 sm:p-5"
        >
          <div className="pt-0.5">
            {checked.includes(index) ? (
              <CheckCircle2 className="h-6 w-6 text-[#012E19]" />
            ) : (
              <Circle className="h-6 w-6 text-[#b8cfc1] group-hover:text-[#a57900]" />
            )}
          </div>
          <p className="text-sm leading-tight text-[#012E19] sm:text-base">{item}</p>
        </motion.div>
      ))}
    </div>
  );
};