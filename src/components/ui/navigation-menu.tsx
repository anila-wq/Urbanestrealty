import * as React from 'react';
import { cn } from './utils';

export function NavigationMenu({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)} {...props}>
      {children}
    </nav>
  );
}

export function NavigationMenuList({ className = '', ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)} {...props} />
  );
}

export function NavigationMenuItem({ ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}

export function NavigationMenuTrigger({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function NavigationMenuContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
        className
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({ className = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

export function NavigationMenuIndicator({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden', className)} {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </div>
  );
}

export function NavigationMenuViewport({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('absolute left-0 top-full flex justify-center', className)}>
      <div
        className={cn(
          'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
          className
        )}
        {...props}
      />
    </div>
  );
}
