import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface CarouselContextType {
  currentIndex: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  itemsCount: number;
}

const CarouselContext = React.createContext<CarouselContextType | null>(null);

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  opts?: {
    loop?: boolean;
    align?: 'start' | 'center' | 'end';
  };
}

export function Carousel({ children, className = '', opts }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsCount, setItemsCount] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return opts?.loop ? itemsCount - 1 : 0;
      }
      return prev - 1;
    });
  }, [itemsCount, opts?.loop]);

  const scrollNext = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === itemsCount - 1) {
        return opts?.loop ? 0 : itemsCount - 1;
      }
      return prev + 1;
    });
  }, [itemsCount, opts?.loop]);

  const canScrollPrev = opts?.loop ? true : currentIndex > 0;
  const canScrollNext = opts?.loop ? true : currentIndex < itemsCount - 1;

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        itemsCount,
      }}
    >
      <div className={cn('relative', className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === CarouselContent) {
            return React.cloneElement(child as React.ReactElement<any>, {
              _setItemsCount: setItemsCount,
            });
          }
          return child;
        })}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps {
  children: React.ReactNode;
  className?: string;
  _setItemsCount?: (count: number) => void;
}

export function CarouselContent({ children, className = '', _setItemsCount }: CarouselContentProps) {
  const context = React.useContext(CarouselContext);
  
  React.useEffect(() => {
    const count = React.Children.count(children);
    _setItemsCount?.(count);
  }, [children, _setItemsCount]);

  if (!context) return null;

  return (
    <div className="overflow-hidden">
      <div
        className={cn('flex transition-transform duration-300 ease-out', className)}
        style={{
          transform: `translateX(-${context.currentIndex * 100}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselItem({ children, className = '' }: CarouselItemProps) {
  return (
    <div className={cn('min-w-full flex-shrink-0', className)}>
      {children}
    </div>
  );
}

interface CarouselPreviousProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CarouselPrevious({ className = '' }: CarouselPreviousProps) {
  const context = React.useContext(CarouselContext);
  
  if (!context) return null;

  return (
    <button
      onClick={context.scrollPrev}
      disabled={!context.canScrollPrev}
      className={cn('absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-gray-600 bg-gray-900/80 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center', className)}
      aria-label="Previous slide"
    >
      <ArrowLeft className="h-5 w-5 text-white" />
    </button>
  );
}

interface CarouselNextProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CarouselNext({ className = '' }: CarouselNextProps) {
  const context = React.useContext(CarouselContext);
  
  if (!context) return null;

  return (
    <button
      onClick={context.scrollNext}
      disabled={!context.canScrollNext}
      className={cn('absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-gray-600 bg-gray-900/80 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center', className)}
      aria-label="Next slide"
    >
      <ArrowRight className="h-5 w-5 text-white" />
    </button>
  );
}

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}
