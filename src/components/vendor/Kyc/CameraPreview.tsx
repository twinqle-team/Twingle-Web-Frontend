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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="relative bg-black rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-inner">
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
            className="w-64 h-64 border-4 border-white/70 rounded-full relative"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div 
              className="absolute top-4 left-1/2 w-8 h-1 bg-[#F84BFC] rounded -translate-x-1/2"
              animate={{ y: [20, 220, 20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      )}

      {/* Permission / Start Button */}
      {!isStreaming && !capturedImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 to-black z-10 px-8 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/30">
            <Camera className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-semibold mb-3">Enable Camera</h3>
          <p className="text-white/70 max-w-xs mb-8">
            We need camera access for live face verification
          </p>

          <Button 
            onClick={startCamera}
            className="px-10 py-4 text-lg"
          >
            Allow Camera Access
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-8 text-center z-20">
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
            className="w-20 h-20 rounded-full border-[7px] border-white bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
          >
            <div className="w-14 h-14 bg-white rounded-full" />
          </motion.button>
        </div>
      )}

      {/* Retake Button */}
      {capturedImage && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <button
            onClick={retake}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors"
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