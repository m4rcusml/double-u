import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const CardContainer = ({ 
  children, 
  className = '', 
  title, 
  description 
}: CardContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className={`bg-background p-6 shadow-md rounded-lg ${className}`}>
        {title && (
          <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
        )}
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </Card>
    </motion.div>
  );
};
