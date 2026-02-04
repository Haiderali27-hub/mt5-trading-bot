import { theme } from '../theme/theme';

/**
 * Responsive grid utility styles
 * Provides CSS grid configurations for 1, 2, 3, and 4 columns
 * with responsive breakpoint adaptation
 */

export interface GridConfig {
  display: string;
  gridTemplateColumns: string;
  gap: string;
}

/**
 * Get grid configuration based on number of columns
 * @param columns - Number of columns (1, 2, 3, or 4)
 * @param gap - Gap size (defaults to theme spacing)
 * @returns CSS grid configuration object
 */
export const getGridConfig = (
  columns: 1 | 2 | 3 | 4,
  gap: string = theme.spacing.lg
): GridConfig => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  };
};

/**
 * Get responsive grid styles that adapt based on breakpoints
 * Mobile: 1 column
 * Tablet: 2 columns
 * Desktop: 3-4 columns (configurable)
 * @param desktopColumns - Number of columns for desktop (3 or 4)
 * @returns Object with responsive grid styles
 */
export const getResponsiveGridStyles = (desktopColumns: 3 | 4 = 3) => {
  return {
    display: 'grid',
    gap: theme.spacing.lg,
    gridTemplateColumns: '1fr', // Mobile: 1 column
    
    // Tablet: 2 columns
    [`@media (min-width: ${theme.breakpoints.tablet.min}px)`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing.lg,
    },
    
    // Desktop: 3-4 columns
    [`@media (min-width: ${theme.breakpoints.desktop.min}px)`]: {
      gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
      gap: theme.spacing.xl,
    },
  };
};

/**
 * CSS class names for responsive grid layouts
 * Can be used with CSS modules or inline styles
 */
export const gridClasses = {
  container: 'grid-container',
  col1: 'grid-col-1',
  col2: 'grid-col-2',
  col3: 'grid-col-3',
  col4: 'grid-col-4',
  responsive: 'grid-responsive',
};

/**
 * Generate CSS string for responsive grid
 * @param desktopColumns - Number of columns for desktop (3 or 4)
 * @returns CSS string
 */
export const generateResponsiveGridCSS = (desktopColumns: 3 | 4 = 3): string => {
  return `
    display: grid;
    gap: ${theme.spacing.lg};
    grid-template-columns: 1fr;
    
    @media (min-width: ${theme.breakpoints.tablet.min}px) {
      grid-template-columns: repeat(2, 1fr);
      gap: ${theme.spacing.lg};
    }
    
    @media (min-width: ${theme.breakpoints.desktop.min}px) {
      grid-template-columns: repeat(${desktopColumns}, 1fr);
      gap: ${theme.spacing.xl};
    }
  `;
};
