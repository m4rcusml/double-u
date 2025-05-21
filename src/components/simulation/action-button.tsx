import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const ActionButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  fullWidth = false,
  icon
}: ActionButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent text-white hover:bg-accent/90';
      case 'secondary':
        return 'bg-secondary text-accent-foreground hover:bg-secondary/90';
      case 'outline':
        return 'border-accent text-accent-foreground hover:bg-accent hover:text-white';
      default:
        return 'bg-accent text-white hover:bg-accent/90';
    }
  };

  return (
    <motion.div
      className={fullWidth ? 'w-full' : ''}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button 
        onClick={onClick}
        variant={variant === 'outline' ? 'outline' : 'default'}
        className={`${getVariantClasses()} ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    </motion.div>
  );
};
