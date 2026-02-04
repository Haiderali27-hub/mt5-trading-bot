import { useEffect, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Custom hook for detecting element visibility using Intersection Observer API
 * Configured with 50% threshold for active section detection
 * 
 * @param ref - React ref object pointing to the element to observe
 * @param options - Intersection Observer options
 * @returns Object containing isIntersecting state and intersection entry
 */
export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.5, // Default 50% threshold for active section detection
    root = null,
    rootMargin = '0px',
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported in this browser');
      setIsIntersecting(true); // Fallback: assume visible
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin]);

  return { isIntersecting, entry };
};
