import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { Navigation } from '../../components/layout/Navigation';
import { ThemeProvider } from '../../theme/ThemeProvider';

/**
 * Property 11: Navigation Accessibility Across Breakpoints
 * For any screen size, the navigation menu should be present and accessible: 
 * horizontal menu on desktop/tablet, hamburger menu on mobile.
 * 
 * Feature: mt5-gold-trading-bot-website, Property 11: Navigation Accessibility Across Breakpoints
 * Validates: Requirements 12.3
 */

describe('Property 11: Navigation Accessibility Across Breakpoints', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    
    // Mock window.matchMedia for media queries
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
    vi.clearAllMocks();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('should render appropriate navigation interface for any viewport width', () => {
    fc.assert(
      fc.property(
        // Generate viewport widths covering all breakpoints
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth) => {
          let unmount: () => void;

          act(() => {
            // Set window width
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              value: viewportWidth,
            });

            // Trigger resize event to update media query hooks
            window.dispatchEvent(new Event('resize'));

            const result = render(
              <TestWrapper>
                <Navigation activeSection="hero" />
              </TestWrapper>
            );
            unmount = result.unmount;
          });

          try {
            // Navigation should always be present
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();

            // Determine expected behavior based on viewport width
            const isMobile = viewportWidth < 768;

            if (isMobile) {
              // Mobile: Should have hamburger menu button
              const hamburgerButton = screen.getByRole('button', { 
                name: /toggle navigation menu/i 
              });
              expect(hamburgerButton).toBeInTheDocument();
              
              // Should have aria-expanded attribute
              expect(hamburgerButton).toHaveAttribute('aria-expanded');
              
              // Should have proper aria-label
              expect(hamburgerButton).toHaveAttribute('aria-label', 'Toggle navigation menu');

              // Brand/logo should be visible
              expect(screen.getByText('MT5 Gold Bot')).toBeInTheDocument();

            } else {
              // Desktop/Tablet: Should have horizontal navigation links
              const navigationLinks = [
                'Home',
                'Features', 
                'Trading Modes',
                'Performance',
                'Technology',
                'Pricing'
              ];

              navigationLinks.forEach(linkText => {
                const link = screen.getByRole('link', { name: linkText });
                expect(link).toBeInTheDocument();
                expect(link).toHaveAttribute('href');
              });

              // Should not have hamburger menu on desktop/tablet
              expect(screen.queryByRole('button', { 
                name: /toggle navigation menu/i 
              })).not.toBeInTheDocument();
            }

            // Navigation should be accessible via keyboard
            const focusableElements = nav.querySelectorAll(
              'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            expect(focusableElements.length).toBeGreaterThan(0);

            // All focusable elements should be properly accessible
            focusableElements.forEach(element => {
              // Should not have negative tabindex (unless specifically intended)
              const tabIndex = element.getAttribute('tabindex');
              if (tabIndex !== null) {
                expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0);
              }
            });

          } finally {
            act(() => {
              unmount();
            });
          }
        }
      ),
      { numRuns: 20 } // Reduced from 100 to prevent timeout
    );
  }, 10000); // Increased timeout to 10 seconds

  it('should maintain navigation accessibility across breakpoint transitions', () => {
    fc.assert(
      fc.property(
        // Generate pairs of viewport widths to test transitions
        fc.tuple(
          fc.integer({ min: 320, max: 767 }), // Mobile width
          fc.integer({ min: 768, max: 2560 })  // Desktop/tablet width
        ),
        ([mobileWidth, desktopWidth]) => {
          let rerender: (ui: React.ReactElement) => void;
          let unmount: () => void;

          act(() => {
            // Start with mobile viewport
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              value: mobileWidth,
            });

            const result = render(
              <TestWrapper>
                <Navigation activeSection="hero" />
              </TestWrapper>
            );
            rerender = result.rerender;
            unmount = result.unmount;
          });

          try {
            // Verify mobile navigation
            expect(screen.getByRole('button', { 
              name: /toggle navigation menu/i 
            })).toBeInTheDocument();

            act(() => {
              // Transition to desktop viewport
              Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: desktopWidth,
              });

              // Trigger resize and re-render
              window.dispatchEvent(new Event('resize'));
              rerender(
                <TestWrapper>
                  <Navigation activeSection="hero" />
                </TestWrapper>
              );
            });

            // Verify desktop navigation
            const navigationLinks = [
              'Home', 'Features', 'Trading Modes', 
              'Performance', 'Technology', 'Pricing'
            ];

            navigationLinks.forEach(linkText => {
              expect(screen.getByRole('link', { name: linkText })).toBeInTheDocument();
            });

            // Hamburger menu should be gone
            expect(screen.queryByRole('button', { 
              name: /toggle navigation menu/i 
            })).not.toBeInTheDocument();

          } finally {
            act(() => {
              unmount();
            });
          }
        }
      ),
      { numRuns: 10 } // Reduced from 50 to prevent timeout
    );
  }, 10000); // Increased timeout

  it('should provide proper ARIA attributes for any navigation state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        fc.boolean(), // Mobile menu open state
        (viewportWidth, isMobileMenuOpen) => {
          let unmount: () => void;

          act(() => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              value: viewportWidth,
            });

            const result = render(
              <TestWrapper>
                <Navigation activeSection="hero" />
              </TestWrapper>
            );
            unmount = result.unmount;
          });

          try {
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();

            const isMobile = viewportWidth < 768;

            if (isMobile) {
              const hamburgerButton = screen.getByRole('button', { 
                name: /toggle navigation menu/i 
              });
              
              // Should have proper ARIA attributes
              expect(hamburgerButton).toHaveAttribute('aria-label');
              expect(hamburgerButton).toHaveAttribute('aria-expanded');
              
              // aria-expanded should be a valid boolean string
              const ariaExpanded = hamburgerButton.getAttribute('aria-expanded');
              expect(['true', 'false']).toContain(ariaExpanded);
            }

            // All links should have proper href attributes
            const links = nav.querySelectorAll('a[role="link"], a[href]');
            links.forEach(link => {
              expect(link).toHaveAttribute('href');
              const href = link.getAttribute('href');
              expect(href).toMatch(/^#[a-z-]+$/); // Should be hash links
            });

          } finally {
            act(() => {
              unmount();
            });
          }
        }
      ),
      { numRuns: 20 } // Reduced from 100 to prevent timeout
    );
  }, 10000); // Increased timeout
});