
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
  const base = "font-medium rounded-2xl transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#0028F5] to-[#F84BFC] text-white shadow-xl hover:brightness-110",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-xl",
  };

  const sizes = {
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <span className="animate-spin mr-2">⟳</span>}
      {children}
    </motion.button>
  );
};