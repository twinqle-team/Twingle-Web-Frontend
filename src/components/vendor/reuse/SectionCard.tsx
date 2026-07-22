import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const SectionCard: FC<SectionCardProps> = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white backdrop-blur-md bg-opacity-80 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionCard;
