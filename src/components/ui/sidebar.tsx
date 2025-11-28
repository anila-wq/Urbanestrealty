import * as React from 'react';
import { cn } from './utils';

export function Sidebar({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground',
        className
      )}
      {...props}
    />
  );
}

export function SidebarHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-2 p-4', className)}
      {...props}
    />
  );
}

export function SidebarContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-auto p-4', className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-auto p-4', className)}
      {...props}
    />
  );
}

export function SidebarNav({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex flex-col space-y-1', className)}
      {...props}
    />
  );
}

export function SidebarNavItem({ className = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        className
      )}
      {...props}
    />
  );
}
