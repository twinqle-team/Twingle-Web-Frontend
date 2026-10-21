import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AdminSectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const AdminSectionCard: FC<AdminSectionCardProps> = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-[#dce8e0] bg-white/95 p-4 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#012E19] sm:text-xl md:text-2xl">{title}</h3>
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

export default AdminSectionCard;
