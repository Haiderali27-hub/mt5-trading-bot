import { useCallback } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Custom hook for smooth scroll functionality
 * Handles smooth scrolling to sections with offset for fixed navigation
 * Updates URL hash without page jump
 */
export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { offset = 80, behavior = 'smooth' } = options; // Default 80px offset for fixed nav

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Element with id "${sectionId}" not found`);
      return;
    }

    try {
      // Calculate the target position with offset
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementTop - offset;

      // Perform smooth scroll
      window.scrollTo({
        top: Math.max(0, targetPosition), // Ensure we don't scroll above the page
        behavior,
      });

      // Update URL hash without causing a page jump
      // We use replaceState to avoid adding to browser history
      const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
      window.history.replaceState(null, '', newUrl);
    } catch (error) {
      console.error('Error during smooth scroll:', error);
      
      // Fallback: try basic scrollIntoView
      try {
        element.scrollIntoView({ behavior, block: 'start' });
        window.history.replaceState(null, '', `#${sectionId}`);
      } catch (fallbackError) {
        console.error('Fallback scroll also failed:', fallbackError);
      }
    }
  }, [offset, behavior]);

  return { scrollToSection };
};