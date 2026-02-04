import { useState, useEffect } from 'react';
import { theme } from '../theme/theme';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

/**
 * Custom hook for detecting the current breakpoint based on window width
 * @returns The current breakpoint (mobile, tablet, desktop, or wide)
 */
export const useMediaQuery = (): Breakpoint => {
  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= theme.breakpoints.wide.min) {
      return 'wide';
    }
    if (width >= theme.breakpoints.desktop.min) {
      return 'desktop';
    }
    if (width >= theme.breakpoints.tablet.min) {
      return 'tablet';
    }
    return 'mobile';
  };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    // Initialize with current window width
    if (typeof window !== 'undefined') {
      return getBreakpoint(window.innerWidth);
    }
    return 'desktop'; // Default for SSR
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
