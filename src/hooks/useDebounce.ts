import { useCallback, useRef, useEffect } from 'react';

/**
 * Debounce hook that returns a debounced version of the callback
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced function
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ) as T;
}

/**
 * Creates a debounced storage save function
 * @param key - localStorage key
 * @param delay - Debounce delay in ms (default: 500ms)
 */
export function useDebouncedStorage<T>(
  key: string,
  delay: number = 500
) {
  const save = useCallback((data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage not available or quota exceeded
    }
  }, [key]);

  return useDebouncedCallback(save, delay);
}

/**
 * Throttle hook - executes immediately, then ignores subsequent calls for delay period
 */
export function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const lastCallRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callbackRef.current(...args);
      }
    },
    [delay]
  ) as T;
}
