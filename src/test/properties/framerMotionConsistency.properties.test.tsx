import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider } from '../../theme';
import { Button, ButtonVariant, ButtonSize } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FeatureCard } from '../../components/ui/FeatureCard';

/**
 * Feature: mt5-gold-trading-bot-website
 * Property 6: Framer Motion Implementation Consistency
 * 
 * For any animated component, the animation should be implemented using 
 * Framer Motion's motion components or hooks, ensuring consistent animation 
 * behavior across the application.
 * 
 * Validates: Requirements 9.3
 */

describe('Property 6: Framer Motion Implementation Consistency', () => {
  it('should use Framer Motion for Button component animations', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom<ButtonVariant>('primary', 'secondary', 'outline'),
        fc.constantFrom<ButtonSize>('small', 'medium', 'large'),
        fc.string({ minLength: 1, maxLength: 50 }),
        async (variant, size, text) => {
          const { container } = render(
            <ThemeProvider>
              <Button variant={variant} size={size}>
                {text}
              </Button>
            </ThemeProvider>
          );

          const button = container.querySelector('button');
          expect(button).toBeTruthy();

          if (!button) return false;

          // Check for Framer Motion attributes
          // Framer Motion adds data-projection-id or inline styles
          const hasFramerMotionAttributes = 
            button.hasAttribute('style') ||
            button.getAttribute('data-projection-id') !== null ||
            button.parentElement?.hasAttribute('data-projection-id') === true;

          expect(hasFramerMotionAttributes).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  it('should use Framer Motion for Card component animations', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 100 }),
        async (content) => {
          const { container } = render(
            <ThemeProvider>
              <Card>
                <div>{content}</div>
              </Card>
            </ThemeProvider>
          );

          const card = container.firstChild as HTMLElement;
          expect(card).toBeTruthy();

          if (!card) return false;

          // Check for Framer Motion attributes
          const hasFramerMotionAttributes = 
            card.hasAttribute('style') ||
            card.getAttribute('data-projection-id') !== null;

          expect(hasFramerMotionAttributes).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  it('should use Framer Motion for FeatureCard component animations', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 200 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        async (title, description, icon) => {
          const { container } = render(
            <ThemeProvider>
              <FeatureCard
                title={title}
                description={description}
                icon={icon}
              />
            </ThemeProvider>
          );

          const featureCard = container.firstChild as HTMLElement;
          expect(featureCard).toBeTruthy();

          if (!featureCard) return false;

          // Check for Framer Motion attributes
          const hasFramerMotionAttributes = 
            featureCard.hasAttribute('style') ||
            featureCard.getAttribute('data-projection-id') !== null;

          expect(hasFramerMotionAttributes).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  it('should have consistent motion component usage across all animated components', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (text) => {
          // Test multiple components to ensure consistency
          const components = [
            <Button>{text}</Button>,
            <Card><div>{text}</div></Card>,
            <FeatureCard title={text} description={text} icon="🎯" />,
          ];

          let allUseFramerMotion = true;

          for (const component of components) {
            const { container } = render(
              <ThemeProvider>
                {component}
              </ThemeProvider>
            );

            const element = container.firstChild as HTMLElement;
            
            if (!element) {
              allUseFramerMotion = false;
              break;
            }

            // Check for Framer Motion attributes
            const hasFramerMotionAttributes = 
              element.hasAttribute('style') ||
              element.getAttribute('data-projection-id') !== null;

            if (!hasFramerMotionAttributes) {
              allUseFramerMotion = false;
              break;
            }
          }

          expect(allUseFramerMotion).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);
});
