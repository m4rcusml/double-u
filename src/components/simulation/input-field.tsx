import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
}

export const InputField = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  className = '',
  prefix,
  suffix,
  error
}: InputFieldProps) => {
  return (
    <motion.div 
      className={`flex flex-col gap-1.5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-muted-foreground">{prefix}</span>
          </div>
        )}
        <ShadcnInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-muted-foreground">{suffix}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </motion.div>
  );
};
