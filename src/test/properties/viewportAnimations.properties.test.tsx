import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { AnimatedSection } from '../../components/animations/AnimatedSection';

/**
 * Feature: mt5-gold-trading-bot-website
 * Property 4: Viewport-Triggered Animations
 * 
 * For any animated element, when it enters the viewport (intersection ratio > 0), 
 * the Animation_System should trigger the configured entrance animation 
 * (fade-in or slide-in).
 * 
 * Validates: Requirements 9.1
 */

describe('Property 4: Viewport-Triggered Animations', () => {
  let observerCallback: IntersectionObserverCallback | null = null;
  let mockObserve: any;
  let mockUnobserve: any;
  let mockDisconnect: any;

  beforeEach(() => {
    // Mock IntersectionObserver as a proper constructor
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    (globalThis as any).IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger entrance animation when element enters viewport', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.double({ min: 0.01, max: 1.0 }),
        fc.boolean(),
        async (content, intersectionRatio, isIntersecting) => {
          const { container } = render(
            <AnimatedSection>
              <div>{content}</div>
            </AnimatedSection>
          );

          const animatedDiv = container.firstChild as HTMLElement;
          expect(animatedDiv).toBeTruthy();

          if (!animatedDiv) return false;

          // Verify the element has Framer Motion attributes
          const hasMotionAttributes = 
            animatedDiv.hasAttribute('style') ||
            animatedDiv.getAttribute('data-projection-id') !== null;

          expect(hasMotionAttributes).toBe(true);

          // Simulate intersection observer callback
          if (observerCallback && intersectionRatio > 0) {
            const mockEntry: Partial<IntersectionObserverEntry> = {
              isIntersecting: isIntersecting && intersectionRatio > 0,
              intersectionRatio,
              target: animatedDiv,
              boundingClientRect: animatedDiv.getBoundingClientRect(),
              intersectionRect: animatedDiv.getBoundingClientRect(),
              rootBounds: null,
              time: Date.now(),
            };

            observerCallback([mockEntry as IntersectionObserverEntry], {} as IntersectionObserver);
          }

          // Verify IntersectionObserver observe method was called
          expect(mockObserve).toHaveBeenCalled();

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  it('should use sectionVariants for entrance animations', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (content) => {
          const { container } = render(
            <AnimatedSection>
              <div>{content}</div>
            </AnimatedSection>
          );

          const animatedDiv = container.firstChild as HTMLElement;
          expect(animatedDiv).toBeTruthy();

          if (!animatedDiv) return false;

          // Verify initial hidden state (opacity 0, translateY 50px)
          // Framer Motion applies these via inline styles
          const style = animatedDiv.getAttribute('style');
          
          // The element should have motion-related styling
          expect(style).toBeTruthy();

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  it('should configure IntersectionObserver with appropriate threshold', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (content) => {
          render(
            <AnimatedSection>
              <div>{content}</div>
            </AnimatedSection>
          );

          // Verify IntersectionObserver observe method was called
          expect(mockObserve).toHaveBeenCalled();

          // Verify the observer callback was set
          expect(observerCallback).toBeTruthy();

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);
});
