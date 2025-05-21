import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  change,
  prefix,
  suffix,
  className = ''
}: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="p-4 h-full">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="flex items-baseline">
          {prefix && <span className="text-muted-foreground mr-1">{prefix}</span>}
          <span className="text-2xl font-bold">{value}</span>
          {suffix && <span className="text-muted-foreground ml-1">{suffix}</span>}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {isPositive && (
              <div className="flex items-center text-emerald-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{Math.abs(change)}%</span>
              </div>
            )}
            {isNegative && (
              <div className="flex items-center text-red-500">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{Math.abs(change)}%</span>
              </div>
            )}
            {!isPositive && !isNegative && change === 0 && (
              <span className="text-sm text-muted-foreground">Sem alteração</span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
