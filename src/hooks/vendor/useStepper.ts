// src/hooks/useStepper.ts
import { useState } from 'react';

export const useStepper = (initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const markStepCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    markStepCompleted,
    isStepCompleted: (step: number) => completedSteps.includes(step),
  };
};