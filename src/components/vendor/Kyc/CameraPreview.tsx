// src/components/kyc/CameraPreview.tsx
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, AlertCircle } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

interface CameraPreviewProps {
  onCapture: (image: string) => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  const startCamera = async () => {
    try {
      setError('');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        
        setIsStreaming(true);
        setPermissionGranted(true);
      }
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError') {
        setError("Camera access denied. Please allow camera permission and try again.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera found on this device.");
      } else {
        setError("Unable to access camera. Please check your device settings.");
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      
      setCapturedImage(dataUrl);
      onCapture(dataUrl);
      
      // Stop camera stream after capture
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setIsStreaming(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    // Restart camera
    setTimeout(() => startCamera(), 100);
  };

console.log(permissionGranted)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#dce8e0] bg-black shadow-inner">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${capturedImage ? 'hidden' : ''}`}
      />

      {/* Captured Image */}
      {capturedImage && (
        <img 
          src={capturedImage} 
          alt="Captured Selfie" 
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay Guide */}
      {!capturedImage && isStreaming && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative h-[min(64vw,16rem)] w-[min(64vw,16rem)] rounded-full border-4 border-white/70"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div 
              className="absolute left-1/2 top-4 h-1 w-8 -translate-x-1/2 rounded bg-[#F2B60A]"
              animate={{ y: [20, 220, 20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      )}

      {/* Permission / Start Button */}
      {!isStreaming && !capturedImage && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#012E19]/95 px-5 text-center sm:px-8">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 sm:mb-6 sm:h-20 sm:w-20">
            <Camera className="w-10 h-10" />
          </div>
          
          <h3 className="mb-3 text-xl font-semibold sm:text-2xl">Enable Camera</h3>
          <p className="mb-6 max-w-xs text-sm text-white/70 sm:mb-8 sm:text-base">
            We need camera access for live face verification
          </p>

          <Button 
            onClick={startCamera}
            className="visible inline-flex min-h-12 items-center justify-center bg-[#F2B60A] px-8 py-4 text-base font-bold text-[#012E19] shadow-md hover:bg-[#dca000] sm:px-10 sm:text-lg"
          >
            Allow Camera Access
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#012E19]/95 p-5 text-center sm:p-8">
          <div>
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-6">{error}</p>
            <button 
              onClick={startCamera}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Capture Button */}
      {isStreaming && !capturedImage && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={capturePhoto}
            className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-white bg-white/10 backdrop-blur-xl transition-all hover:bg-[#F2B60A]/30 active:scale-95 sm:h-20 sm:w-20"
          >
            <div className="h-10 w-10 rounded-full bg-[#F2B60A] sm:h-14 sm:w-14" />
          </motion.button>
        </div>
      )}

      {/* Retake Button */}
      {capturedImage && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <button
            onClick={retake}
            className="flex items-center gap-3 rounded-xl bg-[#012E19]/90 px-5 py-3 text-sm text-white transition-colors hover:bg-[#F2B60A] hover:text-[#012E19] sm:px-8 sm:py-4"
          >
            <RefreshCw className="w-5 h-5" />
            Retake Photo
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};