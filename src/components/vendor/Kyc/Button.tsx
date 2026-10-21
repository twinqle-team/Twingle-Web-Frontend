
import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  className = '',
  ...props
}) => {
  const base = "font-medium rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-[#F2B60A]/30 disabled:opacity-50";
  
  const variants = {
    primary: "bg-[#012E19] text-white shadow-md hover:bg-[#074b2d]",
    secondary: "bg-white border border-[#dce8e0] text-[#012E19] hover:bg-[#f7faf8]",
  };

  const sizes = {
    md: "px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-base",
    lg: "px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading}
        {...(props as any)}
    >
      {isLoading && <span className="animate-spin mr-2">⟳</span>}
      {children}
    </motion.button>
  );
};