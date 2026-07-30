import { FC, SelectHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: FieldError;
  searchable?: boolean;
  placeholder?: string;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  options,
  error,
  searchable = false,
  placeholder = 'Select an option',
  id,
  value,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  const handleSelect = (optValue: string) => {
    onChange?.({
      target: {
        value: optValue,
      },
    } as any);
    setIsOpen(false);
    setSearchQuery('');
  };

  if (searchable) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
        </label>
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`w-full px-4 py-2.5 border rounded-lg font-medium transition-all duration-200 flex items-center justify-between
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
              bg-white text-gray-900 hover:border-gray-300 focus:outline-none`}
          >
            <span className={value ? 'text-gray-900' : 'text-gray-400'}>
              {selectedLabel}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                {searchable && (
                  <div className="p-2 border-b border-gray-100">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                )}
                <div className="max-h-64 overflow-y-auto">
                  {filteredOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full px-4 py-2.5 text-left font-medium transition-colors ${
                        value === option.value
                          ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      whileHover={{ paddingLeft: 20 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
      </motion.div>
    );
  }

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
      <select
        id={id}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border rounded-lg font-medium transition-all duration-200 appearance-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
          bg-white text-gray-900 placeholder-gray-400
          hover:border-gray-300 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '36px',
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default SelectInput;
