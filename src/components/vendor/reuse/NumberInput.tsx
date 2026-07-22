import { FC, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: FieldError;
  onChange?: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  showControls?: boolean;
  step?: number;
}

const NumberInput: FC<NumberInputProps> = ({
  label,
  error,
  onChange,
  onIncrement,
  onDecrement,
  showControls = false,
  step = 1,
  id,
  value,
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
      {showControls ? (
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDecrement}
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            aria-label="Decrease"
          >
            <Minus size={18} />
          </motion.button>
          <input
            id={id}
            type="number"
            value={value || 0}
            onChange={(e) => onChange?.(Number(e.target.value))}
            className={`flex-1 px-4 py-2.5 border rounded-lg font-medium transition-all duration-200 text-center
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
              bg-white text-gray-900 placeholder-gray-400
              hover:border-gray-300 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400`}
            step={step}
            {...props}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onIncrement}
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            aria-label="Increase"
          >
            <Plus size={18} />
          </motion.button>
        </div>
      ) : (
        <input
          id={id}
          type="number"
          value={value || ''}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className={`w-full px-4 py-2.5 border rounded-lg font-medium transition-all duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
            bg-white text-gray-900 placeholder-gray-400
            hover:border-gray-300 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400`}
          step={step}
          {...props}
        />
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

export default NumberInput;
