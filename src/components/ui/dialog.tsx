import { useEffect, createContext, useContext } from 'react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open = false, onOpenChange = () => {}, children }: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function DialogTrigger({ asChild, children }: DialogTriggerProps) {
  const context = useContext(DialogContext);
  
  if (asChild && children) {
    return <div onClick={() => context?.onOpenChange(true)}>{children}</div>;
  }
  
  return <button onClick={() => context?.onOpenChange(true)}>{children}</button>;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DialogContent({ className = '', children }: DialogContentProps) {
  const context = useContext(DialogContext);
  
  if (!context?.open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => {
      if (e.target === e.currentTarget) {
        context.onOpenChange(false);
      }
    }}>
      <div className="fixed inset-0 bg-black/80" />
      <div className={cn('relative bg-gray-900 rounded-lg p-6 w-full max-w-lg', className)}>
        {children}
      </div>
    </div>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="mb-4">{children}</div>;
}

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DialogTitle({ className = '', children }: DialogTitleProps) {
  return <h2 className={className}>{children}</h2>;
}

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function DialogDescription({ className = '', children }: DialogDescriptionProps) {
  return <p className={className}>{children}</p>;
}

export function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogOverlay({ className = '' }: { className?: string }) {
  return <div className={cn('fixed inset-0 bg-black/80', className)} />;
}

export function DialogClose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const context = useContext(DialogContext);
  return (
    <button onClick={() => context?.onOpenChange(false)} className={className}>
      {children}
    </button>
  );
}

export function DialogFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex justify-end gap-2 mt-4', className)}>{children}</div>;
}
