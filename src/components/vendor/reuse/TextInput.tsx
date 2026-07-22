import { FC, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
  helperText?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  error,
  icon,
  helperText,
  id,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full px-4 ${icon ? 'pl-10' : ''} py-2.5 border rounded-lg font-medium transition-all duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
            bg-white text-gray-900 placeholder-gray-400
            hover:border-gray-300 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400`}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1.5 text-sm text-red-500 font-medium"
        >
          {error.message}
        </motion.p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
      )}
    </motion.div>
  );
};

export default TextInput;
