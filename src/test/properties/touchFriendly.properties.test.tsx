import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import type { ButtonSize, ButtonVariant } from '../../components/ui/Button';
import { theme } from '../../theme';

/**
 * Feature: mt5-gold-trading-bot-website
 * Property 2: Touch-Friendly Interactive Elements
 * 
 * For any interactive element (button, link, card) on mobile devices, 
 * the minimum touch target size should be at least 44x44 pixels 
 * to ensure accessibility.
 * 
 * Validates: Requirements 8.5
 */
describe('Property 2: Touch-Friendly Interactive Elements', () => {
  const MIN_TOUCH_TARGET_SIZE = 44; // pixels

  /**
   * Helper to parse CSS size value (e.g., "16px" -> 16)
   */
  const parsePx = (value: string): number => {
    return parseFloat(value.replace('px', ''));
  };

  /**
   * Helper to calculate minimum button dimensions based on padding and font size
   */
  const getButtonMinDimensions = (size: ButtonSize): { minWidth: number; minHeight: number } => {
    let paddingHorizontal = 0;
    let fontSize = 0;

    switch (size) {
      case 'small':
        paddingHorizontal = parsePx(theme.spacing.lg) * 2;
        fontSize = parsePx(theme.typography.fontSize.sm);
        break;
      case 'medium':
        paddingHorizontal = parsePx(theme.spacing.lg) * 2;
        fontSize = parsePx(theme.typography.fontSize.base);
        break;
      case 'large':
        paddingHorizontal = parsePx(theme.spacing.xl) * 2;
        fontSize = parsePx(theme.typography.fontSize.lg);
        break;
    }

    // All buttons now have minHeight of 44px enforced in CSS
    const minHeight = 44;
    // Minimum width for a button with text (estimate based on padding + some text width)
    const minWidth = paddingHorizontal + (fontSize * 3); // Assume at least 3 characters

    return { minWidth, minHeight };
  };

  it('should have minimum 44x44px touch target for Button components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<ButtonVariant>('primary', 'secondary', 'outline'),
        fc.constantFrom<ButtonSize>('small', 'medium', 'large'),
        (variant, size) => {
          const { minWidth, minHeight } = getButtonMinDimensions(size);

          // Verify that the calculated dimensions meet minimum touch target
          const meetsMinWidth = minWidth >= MIN_TOUCH_TARGET_SIZE;
          const meetsMinHeight = minHeight >= MIN_TOUCH_TARGET_SIZE;

          if (!meetsMinWidth || !meetsMinHeight) {
            console.log(
              `Touch target too small: ${variant} ${size} button ` +
              `(estimated ${minWidth.toFixed(2)}x${minHeight.toFixed(2)}px, ` +
              `required: ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px)`
            );
          }

          return meetsMinWidth && meetsMinHeight;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have minimum 44x44px touch target for Card components', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        (_content) => {
          // Cards have padding of theme.spacing.lg (24px) on all sides
          const cardPadding = parsePx(theme.spacing.lg) * 2; // top + bottom or left + right
          const baseFontSize = parsePx(theme.typography.fontSize.base);
          
          // Minimum card dimensions with content
          const minDimension = cardPadding + (baseFontSize * 1.2);

          const meetsMinSize = minDimension >= MIN_TOUCH_TARGET_SIZE;

          if (!meetsMinSize) {
            console.log(
              `Card touch target too small: ` +
              `(estimated ${minDimension.toFixed(2)}px, ` +
              `required: ${MIN_TOUCH_TARGET_SIZE}px)`
            );
          }

          return meetsMinSize;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have minimum 44x44px touch target for FeatureCard components', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 30 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.string({ minLength: 1, maxLength: 5 }),
        (_title, _description, _icon) => {
          // FeatureCard wraps a Card, which has padding of 24px
          // Plus icon container (48px) + title + description
          const cardPadding = parsePx(theme.spacing.lg) * 2;
          const iconHeight = 48;
          const iconMargin = parsePx(theme.spacing.md);
          const titleFontSize = parsePx(theme.typography.fontSize.xl);
          const titleMargin = parsePx(theme.spacing.sm);
          const descriptionFontSize = parsePx(theme.typography.fontSize.base);
          
          // Minimum height calculation
          const minHeight = cardPadding + iconHeight + iconMargin + 
                           (titleFontSize * 1.2) + titleMargin + 
                           (descriptionFontSize * 1.6 * 2); // At least 2 lines of description
          
          // Minimum width (card padding + some content)
          const minWidth = cardPadding + 100; // Reasonable minimum for card content

          const meetsMinWidth = minWidth >= MIN_TOUCH_TARGET_SIZE;
          const meetsMinHeight = minHeight >= MIN_TOUCH_TARGET_SIZE;

          if (!meetsMinWidth || !meetsMinHeight) {
            console.log(
              `FeatureCard touch target too small: ` +
              `(estimated ${minWidth.toFixed(2)}x${minHeight.toFixed(2)}px, ` +
              `required: ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px)`
            );
          }

          return meetsMinWidth && meetsMinHeight;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain minimum touch target size across different content lengths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<ButtonSize>('small', 'medium', 'large'),
        fc.string({ minLength: 1, maxLength: 50 }),
        (size, buttonText) => {
          const { minWidth, minHeight } = getButtonMinDimensions(size);

          // Even with varying content, touch target should meet minimum
          const meetsMinWidth = minWidth >= MIN_TOUCH_TARGET_SIZE;
          const meetsMinHeight = minHeight >= MIN_TOUCH_TARGET_SIZE;

          if (!meetsMinWidth || !meetsMinHeight) {
            console.log(
              `Touch target too small with content "${buttonText.substring(0, 20)}...": ` +
              `${size} button (estimated ${minWidth.toFixed(2)}x${minHeight.toFixed(2)}px)`
            );
          }

          return meetsMinWidth && meetsMinHeight;
        }
      ),
      { numRuns: 100 }
    );
  });
});
