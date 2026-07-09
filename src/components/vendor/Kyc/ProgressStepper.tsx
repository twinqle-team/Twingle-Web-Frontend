// src/components/kyc/ProgressStepper.tsx
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = ["Upload ID", "Live Verification", "Review & Submit"];

  return (
    <div className="flex items-center gap-4 md:gap-8 sticky top-6 z-50 bg-[#000002]/90 backdrop-blur-2xl px-8 py-5 rounded-3xl border border-white/10">
      {steps.map((title, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={index} className="flex items-center gap-4 flex-1">
            <motion.div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500'
                  : isCurrent
                  ? 'bg-gradient-to-br from-[#0028F5] to-[#F84BFC] border-[#F84BFC] shadow-lg shadow-pink-500/40'
                  : 'border-white/30'
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
            </motion.div>
            <span className={`font-medium text-sm md:text-base ${isCurrent ? 'text-white' : 'text-white/60'}`}>
              {title}
            </span>
            {index < steps.length - 1 && <div className="flex-1 h-px bg-white/10" />}
          </div>
        );
      })}
    </div>
  );
};