// src/components/kyc/CircularProgress.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface CircularProgressProps {
  progress: number;
  size?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 180 }) => {
  const circumference = 2 * Math.PI * ((size - 12) / 2);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 12) / 2}
          fill="none"
          stroke="#ffffff10"
          strokeWidth="8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 12) / 2}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0028F5" />
            <stop offset="100%" stopColor="#F84BFC" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-semibold text-white tabular-nums">{Math.round(progress)}%</div>
          <div className="text-sm text-white/60 -mt-1">uploading</div>
        </div>
      </div>
    </div>
  );
};