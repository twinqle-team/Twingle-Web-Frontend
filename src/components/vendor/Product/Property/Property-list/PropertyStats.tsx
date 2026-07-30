import { FC } from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Key, DollarSign } from 'lucide-react';
import { usePropertyStats } from '@/hooks/useProperties';

const StatCard: FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  index: number;
}> = ({ icon, label, value, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`relative group backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 p-6 shadow-lg overflow-hidden`}
    >
      {/* Gradient glow effect */}
      <div className={`absolute inset-0 ${color} opacity-5 group-hover:opacity-10 transition-opacity blur-xl`} />
      
      {/* Gradient border glow */}
      <div className={`absolute inset-0 rounded-2xl ${color} opacity-0 group-hover:opacity-20 transition-opacity blur-sm p-px`} />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const PropertyStats: FC = () => {
  const { data: stats, isLoading } = usePropertyStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      icon: <Home size={24} />,
      label: 'Total Properties',
      value: stats.total,
      color: 'bg-blue-500',
    },
    {
      icon: <Building size={24} />,
      label: 'Properties For Sale',
      value: stats.forSale,
      color: 'bg-emerald-500',
    },
    {
      icon: <Key size={24} />,
      label: 'Properties For Rent',
      value: stats.forRent,
      color: 'bg-purple-500',
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Sold Properties',
      value: stats.sold,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <StatCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          color={card.color}
          index={index}
        />
      ))}
    </div>
  );
};

export default PropertyStats;
