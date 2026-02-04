import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ANIMATION_TIMING, ANIMATION_EASING } from '../../utils/animations';

interface HeroSectionProps {
  className?: string;
}

/**
 * Hero Section Component
 * Displays the main value proposition with headline, subheadline, and CTA
 * Features staggered entrance animations with specific delays
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  // Staggered animation variants with specific delays
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_TIMING.slow,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  };

  const headlineVariants = {
    ...heroVariants,
    visible: {
      ...heroVariants.visible,
      transition: {
        ...heroVariants.visible.transition,
        delay: 0, // 0ms delay
      },
    },
  };

  const subheadlineVariants = {
    ...heroVariants,
    visible: {
      ...heroVariants.visible,
      transition: {
        ...heroVariants.visible.transition,
        delay: 0.2, // 200ms delay
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_TIMING.medium,
        ease: ANIMATION_EASING.easeOut,
        delay: 0.4, // 400ms delay
      },
    },
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Allow animations to show through
    padding: isMobile 
      ? `${theme.spacing.xxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxxl} ${theme.spacing.lg}`,
    textAlign: 'center',
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '800px',
    width: '100%',
  };

  // Responsive headline font size
  const getHeadlineFontSize = () => {
    if (isMobile) return '32px'; // 32px on mobile (lower end of 32-48px range)
    if (isTablet) return '56px'; // 56px on tablet (between mobile and desktop)
    return theme.typography.fontSize.display; // 72px on desktop
  };

  const headlineStyles: React.CSSProperties = {
    fontSize: getHeadlineFontSize(),
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    lineHeight: '1.1',
  };

  const subheadlineStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.lg : theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: `0 auto ${theme.spacing.xxl} auto`,
  };

  const ctaContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    flexWrap: 'wrap',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
  };

  return (
    <section style={containerStyles} className={className} id="hero" data-testid="hero-section">
      <div style={contentStyles}>
        <motion.h1
          style={headlineStyles}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          Advanced MT5 Gold Trading Bot
        </motion.h1>
        
        <motion.p
          style={subheadlineStyles}
          variants={subheadlineVariants}
          initial="hidden"
          animate="visible"
        >
          Harness the power of 40+ prediction engines, GPU acceleration, and machine learning models to maximize your gold trading profits with precision and speed.
        </motion.p>
        
        <motion.div
          style={ctaContainerStyles}
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
        >
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              // Scroll to pricing section or handle CTA action
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started Now
          </Button>
          
          <Button
            variant="outline"
            size="large"
            onClick={() => {
              // Scroll to features section
              const featuresSection = document.getElementById('features');
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};