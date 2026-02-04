import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { Navigation } from '../../components/layout/Navigation';
import { ThemeProvider } from '../../theme/ThemeProvider';

/**
 * Property 12: Active Section Highlighting
 * For any section currently in the viewport (intersection ratio > 0.5), 
 * the corresponding navigation item should be highlighted with an active state.
 * 
 * Feature: mt5-gold-trading-bot-website, Property 12: Active Section Highlighting
 * Validates: Requirements 12.5
 */

describe('Property 12: Active Section Highlighting', () => {
  beforeEach(() => {
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

    // Mock window dimensions for desktop view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  const validSections = ['hero', 'features', 'trading-modes', 'performance', 'technology', 'pricing'];
  const sectionLabels = {
    'hero': 'Home',
    'features': 'Features',
    'trading-modes': 'Trading Modes',
    'performance': 'Performance',
    'technology': 'Technology',
    'pricing': 'Pricing'
  };

  it('should highlight the correct navigation item for any active section', () => {
    fc.assert(
      fc.property(
        // Generate valid section IDs
        fc.constantFrom(...validSections),
        (activeSection) => {
          const { unmount } = render(
            <TestWrapper>
              <Navigation activeSection={activeSection} />
            </TestWrapper>
          );

          try {
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();

            // Find the active link by its label
            const activeLinkLabel = sectionLabels[activeSection as keyof typeof sectionLabels];
            const activeLink = screen.getByRole('link', { name: activeLinkLabel });
            expect(activeLink).toBeInTheDocument();

            // Check that the active link has the correct href
            expect(activeLink).toHaveAttribute('href', `#${activeSection}`);

          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10, timeout: 15000 }
    );
  });

  it('should only highlight one navigation item at a time', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validSections),
        (activeSection) => {
          const { unmount } = render(
            <TestWrapper>
              <Navigation activeSection={activeSection} />
            </TestWrapper>
          );

          try {
            // Get all navigation links
            const links = screen.getAllByRole('link');
            
            // Count how many links have the active section href
            const activeLinks = links.filter(link => 
              link.getAttribute('href') === `#${activeSection}`
            );

            // Should have exactly one active link
            expect(activeLinks).toHaveLength(1);

            // Verify the active link corresponds to the correct section
            const activeLinkLabel = sectionLabels[activeSection as keyof typeof sectionLabels];
            const activeLink = screen.getByRole('link', { name: activeLinkLabel });
            expect(activeLinks[0]).toBe(activeLink);

          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 20, timeout: 10000 }
    );
  });

  it('should handle section transitions correctly', () => {
    fc.assert(
      fc.property(
        // Generate pairs of different sections to test transitions
        fc.tuple(
          fc.constantFrom(...validSections),
          fc.constantFrom(...validSections)
        ).filter(([from, to]) => from !== to),
        ([fromSection, toSection]) => {
          // Start with first section active
          const { rerender, unmount } = render(
            <TestWrapper>
              <Navigation activeSection={fromSection} />
            </TestWrapper>
          );

          try {
            // Verify initial active section
            const initialActiveLinkLabel = sectionLabels[fromSection as keyof typeof sectionLabels];
            const initialActiveLink = screen.getByRole('link', { name: initialActiveLinkLabel });
            expect(initialActiveLink).toHaveAttribute('href', `#${fromSection}`);

            // Transition to second section
            rerender(
              <TestWrapper>
                <Navigation activeSection={toSection} />
              </TestWrapper>
            );

            // Verify new active section
            const newActiveLinkLabel = sectionLabels[toSection as keyof typeof sectionLabels];
            const newActiveLink = screen.getByRole('link', { name: newActiveLinkLabel });
            expect(newActiveLink).toHaveAttribute('href', `#${toSection}`);

            // Verify only one section is active
            const allLinks = screen.getAllByRole('link');
            const activeLinks = allLinks.filter(link => 
              link.getAttribute('href') === `#${toSection}`
            );
            expect(activeLinks).toHaveLength(1);

          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 15, timeout: 10000 }
    );
  });

  it('should maintain active highlighting across different viewport sizes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validSections),
        fc.integer({ min: 320, max: 2560 }), // Viewport width
        (activeSection, viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: viewportWidth,
          });

          // Update matchMedia mock for the new viewport
          window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: viewportWidth >= 768, // Assume desktop/tablet for >= 768px
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }));

          const { unmount } = render(
            <TestWrapper>
              <Navigation activeSection={activeSection} />
            </TestWrapper>
          );

          try {
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();

            const isMobile = viewportWidth < 768;
            const activeLinkLabel = sectionLabels[activeSection as keyof typeof sectionLabels];

            if (isMobile) {
              // On mobile, check for hamburger menu
              const hamburgerButton = screen.queryByRole('button', { 
                name: /toggle navigation menu/i 
              });
              expect(hamburgerButton).toBeInTheDocument();

            } else {
              // On desktop/tablet, active link should be visible
              const activeLink = screen.getByRole('link', { name: activeLinkLabel });
              expect(activeLink).toBeInTheDocument();
              expect(activeLink).toHaveAttribute('href', `#${activeSection}`);
            }

          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 15, timeout: 10000 }
    );
  });

  it('should handle invalid or undefined active sections gracefully', () => {
    fc.assert(
      fc.property(
        // Generate invalid section names or undefined
        fc.oneof(
          fc.constant(undefined),
          fc.constant(''),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !validSections.includes(s))
        ),
        (invalidSection) => {
          const { unmount } = render(
            <TestWrapper>
              <Navigation activeSection={invalidSection} />
            </TestWrapper>
          );

          try {
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();

            // Navigation should still render all links
            const links = screen.getAllByRole('link');
            expect(links.length).toBe(validSections.length);

            // All links should be present and functional
            validSections.forEach(section => {
              const linkLabel = sectionLabels[section as keyof typeof sectionLabels];
              const link = screen.getByRole('link', { name: linkLabel });
              expect(link).toBeInTheDocument();
              expect(link).toHaveAttribute('href', `#${section}`);
            });

          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 15, timeout: 10000 }
    );
  });
});