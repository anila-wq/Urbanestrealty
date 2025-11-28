import * as React from 'react';
import { cn } from './utils';

interface ToggleGroupContextValue {
  value?: string | string[];
  onValueChange?: (value: string) => void;
  type?: 'single' | 'multiple';
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({});

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function ToggleGroup({
  className = '',
  type = 'single',
  value,
  onValueChange,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider
      value={{
        value,
        onValueChange: onValueChange as any,
        type,
      }}
    >
      <div
        className={cn('flex items-center justify-center gap-1', className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className = '', value: itemValue, variant = 'default', size = 'default', ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const isPressed = Array.isArray(context.value)
      ? context.value.includes(itemValue)
      : context.value === itemValue;

    const handleClick = () => {
      if (!context.onValueChange) return;

      if (context.type === 'multiple' && Array.isArray(context.value)) {
        const newValue = isPressed
          ? context.value.filter((v) => v !== itemValue)
          : [...context.value, itemValue];
        context.onValueChange(newValue as any);
      } else {
        context.onValueChange(itemValue);
      }
    };

    const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      default: isPressed ? 'bg-accent text-accent-foreground' : 'bg-transparent',
      outline: isPressed ? 'bg-accent text-accent-foreground border border-input' : 'border border-input bg-transparent',
    };
    
    const sizeStyles = {
      default: 'h-9 px-3',
      sm: 'h-8 px-2',
      lg: 'h-10 px-4',
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        data-state={isPressed ? 'on' : 'off'}
        aria-pressed={isPressed}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

ToggleGroupItem.displayName = 'ToggleGroupItem';
