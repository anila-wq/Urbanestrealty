import * as React from 'react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md transition-all disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      default: 'bg-gray-900 text-white hover:bg-gray-800',
      outline: 'border border-gray-600 bg-transparent hover:bg-gray-800',
      ghost: 'hover:bg-gray-800',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    };
    
    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    };
    
    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: combinedClassName,
        ref,
      } as any);
    }
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const buttonVariants = () => '';
