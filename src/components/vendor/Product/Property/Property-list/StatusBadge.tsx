import { FC } from 'react';

interface StatusBadgeProps {
  status: 'for-sale' | 'for-rent' | 'sold';
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    'for-sale': {
      label: 'For Sale',
      bgColor: 'bg-emerald-500/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-300',
    },
    'for-rent': {
      label: 'For Rent',
      bgColor: 'bg-blue-500/20',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-300',
    },
    sold: {
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

export default StatusBadge;
