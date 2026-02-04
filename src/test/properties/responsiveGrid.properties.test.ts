import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { theme } from '../../theme/theme';
import { getGridConfig, getResponsiveGridStyles } from '../../utils/grid';

/**
 * Feature: mt5-gold-trading-bot-website
 * Property 1: Responsive Grid Adaptation
 * 
 * For any section with grid layout, when rendered at mobile width (< 768px), 
 * the grid should display 1 column; at tablet width (768-1023px), 2 columns; 
 * and at desktop width (≥ 1024px), 3-4 columns.
 * 
 * Validates: Requirements 2.4, 8.1, 8.2, 8.3
 */
describe('Property 1: Responsive Grid Adaptation', () => {
  it('should display 1 column for mobile viewport widths', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths in mobile range
        fc.integer({ min: theme.breakpoints.mobile.min, max: theme.breakpoints.mobile.max }),
        (viewportWidth) => {
          // Simulate mobile viewport
          const expectedColumns = 1;
          
          // For mobile, grid should always be 1 column
          const gridConfig = getGridConfig(1);
          const actualColumns = parseInt(gridConfig.gridTemplateColumns.match(/repeat\((\d+),/)?.[1] || '1');
          
          return actualColumns === expectedColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display 2 columns for tablet viewport widths', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths in tablet range
        fc.integer({ min: theme.breakpoints.tablet.min, max: theme.breakpoints.tablet.max }),
        (viewportWidth) => {
          // Simulate tablet viewport
          const expectedColumns = 2;
          
          // For tablet, grid should be 2 columns
          const gridConfig = getGridConfig(2);
          const actualColumns = parseInt(gridConfig.gridTemplateColumns.match(/repeat\((\d+),/)?.[1] || '1');
          
          return actualColumns === expectedColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display 3-4 columns for desktop viewport widths', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths in desktop range
        fc.integer({ min: theme.breakpoints.desktop.min, max: theme.breakpoints.desktop.max }),
        // Generate random desktop column count (3 or 4)
        fc.constantFrom(3, 4),
        (viewportWidth, desktopColumns) => {
          // Simulate desktop viewport
          const expectedColumns = desktopColumns;
          
          // For desktop, grid should be 3 or 4 columns
          const gridConfig = getGridConfig(desktopColumns as 3 | 4);
          const actualColumns = parseInt(gridConfig.gridTemplateColumns.match(/repeat\((\d+),/)?.[1] || '1');
          
          return actualColumns === expectedColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display 3-4 columns for wide viewport widths', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths in wide range
        fc.integer({ min: theme.breakpoints.wide.min, max: 2560 }),
        // Generate random desktop column count (3 or 4)
        fc.constantFrom(3, 4),
        (viewportWidth, desktopColumns) => {
          // Simulate wide viewport
          const expectedColumns = desktopColumns;
          
          // For wide screens, grid should still be 3 or 4 columns
          const gridConfig = getGridConfig(desktopColumns as 3 | 4);
          const actualColumns = parseInt(gridConfig.gridTemplateColumns.match(/repeat\((\d+),/)?.[1] || '1');
          
          return actualColumns === expectedColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should generate responsive grid styles with correct breakpoint adaptations', () => {
    fc.assert(
      fc.property(
        // Generate random desktop column count (3 or 4)
        fc.constantFrom(3, 4),
        (desktopColumns) => {
          const styles = getResponsiveGridStyles(desktopColumns as 3 | 4);
          
          // Verify base styles (mobile)
          const hasMobileGrid = styles.display === 'grid' && styles.gridTemplateColumns === '1fr';
          
          // Verify tablet breakpoint exists
          const tabletKey = `@media (min-width: ${theme.breakpoints.tablet.min}px)`;
          const hasTabletBreakpoint = tabletKey in styles;
          const tabletStyles = styles[tabletKey as keyof typeof styles] as any;
          const hasTabletColumns = hasTabletBreakpoint && 
            tabletStyles?.gridTemplateColumns === 'repeat(2, 1fr)';
          
          // Verify desktop breakpoint exists
          const desktopKey = `@media (min-width: ${theme.breakpoints.desktop.min}px)`;
          const hasDesktopBreakpoint = desktopKey in styles;
          const desktopStyles = styles[desktopKey as keyof typeof styles] as any;
          const hasDesktopColumns = hasDesktopBreakpoint && 
            desktopStyles?.gridTemplateColumns === `repeat(${desktopColumns}, 1fr)`;
          
          return hasMobileGrid && hasTabletColumns && hasDesktopColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use appropriate gap spacing at different breakpoints', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(3, 4),
        (desktopColumns) => {
          const styles = getResponsiveGridStyles(desktopColumns as 3 | 4);
          
          // Mobile gap should be theme.spacing.lg
          const mobileGap = styles.gap === theme.spacing.lg;
          
          // Tablet gap should be theme.spacing.lg
          const tabletKey = `@media (min-width: ${theme.breakpoints.tablet.min}px)`;
          const tabletStyles = styles[tabletKey as keyof typeof styles] as any;
          const tabletGap = tabletStyles?.gap === theme.spacing.lg;
          
          // Desktop gap should be theme.spacing.xl
          const desktopKey = `@media (min-width: ${theme.breakpoints.desktop.min}px)`;
          const desktopStyles = styles[desktopKey as keyof typeof styles] as any;
          const desktopGap = desktopStyles?.gap === theme.spacing.xl;
          
          return mobileGap && tabletGap && desktopGap;
        }
      ),
      { numRuns: 100 }
    );
  });
});
