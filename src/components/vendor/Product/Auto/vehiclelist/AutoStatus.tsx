import { FC } from 'react';

interface AutoStatusProps {
  status: 'available' | 'reserved' | 'sold';
}

const AutoStatus: FC<AutoStatusProps> = ({ status }) => {
  const statusConfig = {
    'available': {
      label: 'Available',
      bgColor: 'bg-emerald-500/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-300',
    },
    'reserved': {
      label: 'Reserved',
      bgColor: 'bg-amber-500/20',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-300',
    },
    'sold': {
      label: 'Sold',
      bgColor: 'bg-gray-500/20',
      textColor: 'text-gray-700 dark:text-gray-400',
      borderColor: 'border-gray-300',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      {config.label}
    </span>
  );
};

export default AutoStatus;
