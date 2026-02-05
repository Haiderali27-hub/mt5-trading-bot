import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatedSection } from '../animations/AnimatedSection';

interface HeroSectionProps {
  className?: string;
}

/**
 * Hero Section Component
 * Main landing section with MT5 Gold Trading Bot presentation
 * Features dark theme with animated elements and call-to-action
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';

  const handleCTAClick = () => {
    // Navigate to contact for licensing inquiry
    window.open('mailto:exodellta@gmail.com?subject=MT5 Gold Trading Bot - Licensing Inquiry&body=I am interested in learning more about the MT5 Gold Trading Bot. Please provide licensing information.', '_blank');
  };

  const handleLearnMoreClick = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: isMobile 
      ? `${theme.spacing.xxxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxxl} ${theme.spacing.lg}`,
    textAlign: 'center',
    position: 'relative',
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
    zIndex: 2,
  };

  const badgeStyles: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: 'rgba(93, 214, 44, 0.1)',
    border: `1px solid ${theme.colors.accent.primary}`,
    borderRadius: '50px',
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const headlineStyles: React.CSSProperties = {
    fontSize: isMobile ? '48px' : '72px',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    lineHeight: '1.1',
    background: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.accent.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subheadlineStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.lg : theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
    lineHeight: '1.6',
    maxWidth: '700px',
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
      <AnimatedSection>
        <div style={contentStyles}>
          <motion.div
            style={badgeStyles}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Advanced Algorithmic Trading
          </motion.div>

          <motion.h1
            style={headlineStyles}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            MT5 Gold Trading Bot
          </motion.h1>
          
          <motion.p
            style={subheadlineStyles}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            Professional-grade automated trading system with 40+ prediction engines, 
            GPU acceleration, and institutional-level performance for XAUUSD markets.
          </motion.p>
          
          <motion.div
            style={ctaContainerStyles}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleCTAClick}
              data-testid="hero-cta-button"
            >
              Contact for Licensing
            </Button>
            
            <Button
              variant="outline"
              size="large"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};