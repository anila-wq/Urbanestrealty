import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  imageLoadTime: number;
  componentCount: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor component mounting
    const componentCount = document.querySelectorAll('[data-component]').length;
    
    // Monitor image loading
    let imageLoadTime = 0;
    const images = document.querySelectorAll('img');
    
    Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          const start = performance.now();
          img.onload = () => {
            imageLoadTime = Math.max(imageLoadTime, performance.now() - start);
            resolve(void 0);
          };
          img.onerror = () => resolve(void 0);
        });
      })
    ).then(() => {
      const endTime = performance.now();
      
      setMetrics({
        loadTime: endTime - startTime,
        renderTime: endTime - startTime,
        imageLoadTime,
        componentCount,
      });
    });

    // Show performance overlay on Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-[9999] border border-gray-600">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
        <div>Render Time: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Image Load: {metrics.imageLoadTime.toFixed(2)}ms</div>
        <div>Components: {metrics.componentCount}</div>
        <div className="text-xs text-gray-400 mt-2">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  );
};