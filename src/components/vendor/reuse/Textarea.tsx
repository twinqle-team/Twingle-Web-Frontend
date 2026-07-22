import { FC, TextareaHTMLAttributes, ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  error?: FieldError;
  maxLength?: number;
  showCounter?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({
  label,
  error,
  maxLength,
  showCounter = false,
  value = '',
  onChange,
  id,
  ...props
}) => {
  const charCount = typeof value === 'string' ? value.length : 0;
  const charPercentage = maxLength ? (charCount / maxLength) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
        {showCounter && maxLength && (
          <span className={`text-xs font-medium ${charPercentage > 90 ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg font-medium transition-all duration-200 resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
          bg-white text-gray-900 placeholder-gray-400
          hover:border-gray-300 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400`}
        maxLength={maxLength}
        {...props}
      />
      {showCounter && maxLength && charPercentage > 90 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1.5 text-xs text-gray-500"
        >
          {maxLength - charCount} characters remaining
        </motion.p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1.5 text-sm text-red-500 font-medium"
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Textarea;
