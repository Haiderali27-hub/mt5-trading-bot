import type { Variants } from 'framer-motion';

/**
 * Animation timing constants
 * Duration range: 200-600ms
 * Easing functions: easeOut, easeInOut
 */
export const ANIMATION_TIMING = {
  fast: 0.2, // 200ms
  medium: 0.4, // 400ms
  slow: 0.6, // 600ms
} as const;

export const ANIMATION_EASING = {
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
} as const;

/**
 * Creates animation variants that respect user's motion preferences
 * @param normalVariants - Standard animation variants
 * @param reducedMotion - Whether to use reduced motion
 * @returns Appropriate variants based on motion preference
 */
export const getMotionVariants = (
  normalVariants: Variants,
  reducedMotion: boolean
): Variants => {
  if (reducedMotion) {
    // Return static variants with no animation
    const reducedVariants: Variants = {};
    Object.keys(normalVariants).forEach((key) => {
      const variant = normalVariants[key];
      if (typeof variant === 'object' && variant !== null) {
        // Extract final state without transitions
        const { transition, ...finalState } = variant as any;
        reducedVariants[key] = {
          ...finalState,
          transition: { duration: 0 }, // Instant transition
        };
      } else {
        reducedVariants[key] = variant;
      }
    });
    return reducedVariants;
  }
  return normalVariants;
};

/**
 * Section variants for fade-in/slide-up animations
 * Used for major content sections entering the viewport
 */
export const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_TIMING.slow,
      ease: ANIMATION_EASING.easeOut,
    },
  },
};

/**
 * Card variants with stagger support
 * Used for animating lists of cards with sequential delays
 */
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: ANIMATION_TIMING.medium,
      ease: ANIMATION_EASING.easeOut,
    },
  }),
};

/**
 * Hover variants for interactive elements
 * Provides visual feedback on hover state
 */
export const hoverVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: ANIMATION_TIMING.fast,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
};

/**
 * Additional animation variants for specific use cases
 */

/**
 * Fade-in variant without movement
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_TIMING.medium,
      ease: ANIMATION_EASING.easeOut,
    },
  },
};

/**
 * Scale variant for emphasis
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_TIMING.medium,
      ease: ANIMATION_EASING.easeOut,
    },
  },
};
