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
          className="flex items-start gap-4 bg-white/5 hover:bg-white/10 rounded-2xl p-5 cursor-pointer border border-transparent hover:border-white/10 transition-all group"
        >
          <div className="pt-0.5">
            {checked.includes(index) ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <Circle className="w-6 h-6 text-white/40 group-hover:text-white/60" />
            )}
          </div>
          <p className="text-lg leading-tight text-white/90">{item}</p>
        </motion.div>
      ))}
    </div>
  );
};