
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = ["Upload ID", "Live Verification", "Review & Submit"];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-[#dce8e0] bg-white px-3 py-3 shadow-sm sm:gap-4 sm:px-5 sm:py-4">
      {steps.map((title, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={index} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <motion.div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm transition-all sm:h-9 sm:w-9 ${
                isCompleted
                  ? 'border-[#012E19] bg-[#012E19] text-white'
                  : isCurrent
                  ? 'border-[#F2B60A] bg-[#F2B60A] text-[#012E19] shadow-md'
                  : 'border-[#b8cfc1] text-[#60756a]'
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
            </motion.div>
            <span className={`truncate text-[11px] font-semibold sm:text-sm ${isCurrent ? 'text-[#012E19]' : 'text-[#80958a]'}`}>
              {title}
            </span>
            {index < steps.length - 1 && <div className="hidden h-px flex-1 bg-[#dce8e0] sm:block" />}
          </div>
        );
      })}
    </div>
  );
};