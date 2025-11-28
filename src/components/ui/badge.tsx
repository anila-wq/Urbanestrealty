import * as React from 'react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'border border-border bg-transparent',
      destructive: 'bg-destructive text-destructive-foreground',
    };
    
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors', variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export const badgeVariants = () => '';
