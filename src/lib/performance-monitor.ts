import { logger } from "@/lib/logger";

export const initPerformanceMonitoring = () => {
  if (typeof window === "undefined") return;

  // Web Vitals figyelése (egyszerűsített)
  window.addEventListener("load", () => {
    // Time to First Byte (közelítő)
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      logger.debug(`TTFB: ${ttfb.toFixed(2)}ms`);
    }

    // Paint Timing
    const paintEntries = performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      logger.debug(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
    });
  });

  // Long Tasks Observer
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Csak a kiugróan hosszú feladatokat logoljuk (pl. > 100ms)
        if (entry.duration > 100) {
          logger.warn(`Long Task detected: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    // A böngésző nem támogatja a PerformanceObserver-t
    console.warn("PerformanceObserver not supported");
  }
};
