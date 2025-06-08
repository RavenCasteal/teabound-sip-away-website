import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

export const usePerformanceMetrics = () => {
  useEffect(() => {
    // Report Web Vitals
    const reportWebVitals = () => {
      if (typeof window !== 'undefined') {
        onCLS(console.log); // Cumulative Layout Shift
        onINP(console.log); // Interaction to Next Paint
        onLCP(console.log); // Largest Contentful Paint
        onFCP(console.log); // First Contentful Paint
        onTTFB(console.log); // Time to First Byte
      }
    };

    // Monitor resource timing
    const reportResourceTiming = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      resources.forEach(resource => {
        console.log({
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize,
          type: resource.initiatorType
        });
      });
    };

    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('Long task detected:', entry);
      });
    });

    observer.observe({ entryTypes: ['longtask'] });

    reportWebVitals();
    reportResourceTiming();

    return () => {
      observer.disconnect();
    };
  }, []);
}; 