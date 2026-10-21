import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { CameraPreview } from './CameraPreview';
import { ProgressStepper } from './ProgressStepper';
import { DocumentFile } from '@/components/vendor/Kyc/types/kyc';
import { UploadZone } from './UploadZone';
import { Button } from './Button';
import { SuccessAnimation } from './SuccessAnimation';
import { CircularProgress } from './CircularProgress';
import { useStepper } from '@/hooks/vendor/useStepper';

const KYCVerification: React.FC = () => {
  const { currentStep, nextStep, prevStep } = useStepper();
  
  const [idDocument, setIdDocument] = useState<DocumentFile | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center sm:mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-[#012E19] sm:text-5xl">Verify Your Identity</h1>
              <p className="mt-3 text-base text-[#60756a] sm:mt-4 sm:text-xl">Takes less than 2 minutes</p>
            </div>

            <UploadZone 
              onFileAccepted={handleFileAccepted} 
              onFileRemoved={handleFileRemoved} 
              currentFile={idDocument} 
            />

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-12 sm:gap-4">
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
            <h2 className="mb-6 text-2xl font-semibold text-[#012E19] sm:mb-8 sm:text-4xl">Live Verification</h2>
            
            <div className="mb-10">
              <h3 className="mb-5 text-xl font-medium text-[#012E19] sm:mb-6 sm:text-2xl">Take a quick selfie</h3>
              <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#60756a]">Keep your face inside the circle and follow each movement when prompted: look up, look down, turn left, then turn right.</p>
              <CameraPreview onCapture={setSelfieImage} />
            </div>

            <div className="flex flex-col gap-3 min-[420px]:flex-row sm:gap-4">
              <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
              <Button 
                onClick={() => {
                  if (idDocument && selfieImage) {
                    simulateUpload();
                  }
                }}
                disabled={!idDocument || !selfieImage || isUploading}
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

        if (isSubmitted) {
          return <SuccessAnimation />;
        }

        return (
          <div>
            <div className="mb-8 rounded-xl border border-[#f3d37a] bg-[#fff8df] p-4 text-sm leading-relaxed text-[#6f5200]">Review your ID and selfie carefully before submitting. Your verification will only be marked as submitted after you click the button below.</div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-8">
              {idDocument && (
                <div className="rounded-xl border border-[#dce8e0] bg-[#f7faf8] p-4 sm:p-6">
                  <p className="mb-3 text-sm text-[#60756a]">DOCUMENT</p>
                  <p className="font-medium text-[#012E19]">ID document uploaded</p>
                  {idDocument.preview ? <img src={idDocument.preview} alt="Uploaded ID document" className="mt-4 max-h-64 w-full rounded-lg object-contain" /> : <p className="mt-3 text-xs text-[#60756a]">Your document is ready for secure review.</p>}
                </div>
              )}
              {selfieImage && (
                <div className="rounded-xl border border-[#dce8e0] bg-[#f7faf8] p-4 sm:p-6">
                  <p className="mb-3 text-sm text-[#60756a]">SELFIE</p>
                  <img src={selfieImage} alt="Selfie" className="max-h-72 w-full rounded-xl object-contain" />
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row sm:mt-16 sm:gap-4">
              <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => setIsSubmitted(true)}
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Verification Submitted' : 'Submit Verification'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-full bg-white text-[#012E19]">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <ProgressStepper currentStep={currentStep} />

        <div className="mt-6 rounded-xl border border-[#dce8e0] bg-white p-4 shadow-sm sm:mt-8 sm:p-6 lg:p-10">
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