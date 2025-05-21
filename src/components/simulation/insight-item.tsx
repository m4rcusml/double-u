import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon } from 'lucide-react';

interface InsightItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export const InsightItem = ({
  title,
  description,
  icon = <LightbulbIcon className="h-6 w-6" />,
  className = ''
}: InsightItemProps) => {
  return (
    <motion.div 
      className={`flex gap-4 p-4 rounded-lg border border-border ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex-shrink-0 text-accent">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};
