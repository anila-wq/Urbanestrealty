import * as React from 'react';
import { cn } from './utils';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className = '', variant = 'default', size = 'default', pressed, onPressedChange, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed || false);

    React.useEffect(() => {
      if (pressed !== undefined) {
        setIsPressed(pressed);
      }
    }, [pressed]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !isPressed;
      setIsPressed(newPressed);
      onPressedChange?.(newPressed);
      props.onClick?.(e);
    };

    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 transition-colors';
    
    const variantStyles = {
      default: isPressed ? 'bg-accent text-accent-foreground' : 'bg-transparent',
      outline: isPressed ? 'bg-accent text-accent-foreground border border-input' : 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    };
    
    const sizeStyles = {
      default: 'h-9 px-2 min-w-9',
      sm: 'h-8 px-1.5 min-w-8',
      lg: 'h-10 px-2.5 min-w-10',
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        data-state={isPressed ? 'on' : 'off'}
        aria-pressed={isPressed}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

export const toggleVariants = () => '';
