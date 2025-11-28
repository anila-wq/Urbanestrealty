import * as React from 'react';
import { cn } from './utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    const baseStyles = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50';
    
    return (
      <label
        ref={ref}
        className={cn(baseStyles, className)}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
