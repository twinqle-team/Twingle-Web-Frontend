// src/pages/KYCVerification.tsx
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { CameraPreview } from './CameraPreview';
import { ProgressStepper } from './ProgressStepper';
import { DocumentFile } from '@/components/vendor/Kyc/types/kyc';
import { UploadZone } from './UploadZone';
import { Button } from './Button';
import { SuccessAnimation } from './SuccessAnimation';
import { DocumentChecklist } from './DocumentCheckList';
import { CircularProgress } from './CircularProgress';
import { useStepper } from '@/hooks/vendor/useStepper';

const KYCVerification: React.FC = () => {
  const { currentStep, nextStep, prevStep } = useStepper();
  
  const [idDocument, setIdDocument] = useState<DocumentFile | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [checklistComplete, setChecklistComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileAccepted = (file: DocumentFile) => setIdDocument(file);
  const handleFileRemoved = () => setIdDocument(null);

  const simulateUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          nextStep();
        }, 600);
      }
    }, 120);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Upload ID
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold tracking-tighter">Verify Your Identity</h1>
              <p className="text-xl text-white/70 mt-4">Takes less than 2 minutes</p>
            </div>

            <UploadZone 
              onFileAccepted={handleFileAccepted} 
              onFileRemoved={handleFileRemoved} 
              currentFile={idDocument} 
            />

            <div className="flex gap-4 mt-12">
              <Button variant="secondary" className="flex-1" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button 
                className="flex-1" 
                onClick={nextStep}
                disabled={!idDocument}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 2: // Live Verification
        return (
          <div>
            <h2 className="text-4xl font-semibold text-white mb-8">Live Verification</h2>
            
            <div className="mb-12">
              <DocumentChecklist onComplete={setChecklistComplete} />
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-6">Take a quick selfie</h3>
              <CameraPreview onCapture={setSelfieImage} />
            </div>

            <div className="flex gap-4">
              <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
              <Button 
                onClick={() => {
                  if (idDocument && selfieImage && checklistComplete) {
                    simulateUpload();
                  }
                }}
                disabled={!idDocument || !selfieImage || !checklistComplete}
                className="flex-1"
              >
                {isUploading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </div>
        );

      case 3: // Review & Submit
        if (isUploading) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <CircularProgress progress={uploadProgress} />
            </div>
          );
        }

        return (
          <div>
            <SuccessAnimation />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {idDocument && (
                <div className="bg-white/5 p-6 rounded-3xl">
                  <p className="text-sm text-white/60 mb-3">DOCUMENT</p>
                  <p className="font-medium">{idDocument.name}</p>
                </div>
              )}
              {selfieImage && (
                <div className="bg-white/5 p-6 rounded-3xl">
                  <p className="text-sm text-white/60 mb-3">SELFIE</p>
                  <img src={selfieImage} alt="Selfie" className="rounded-2xl" />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-16">
              <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => alert("✅ Verification submitted successfully!")}
              >
                Submit Verification
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#000002] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <ProgressStepper currentStep={currentStep} />

        <div className="mt-10 bg-[#0A0A0F] border border-white/10 rounded-3xl p-8 lg:p-16 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;