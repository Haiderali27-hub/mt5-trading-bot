import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatedSection } from '../animations/AnimatedSection';

interface PricingSectionProps {
  className?: string;
}

/**
 * Pricing Section Component
 * Displays pricing information with prominent CTA button
 * Features centered layout with vibrant green CTA
 */
export const PricingSection: React.FC<PricingSectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';

  const handleCTAClick = () => {
    // Navigate to download or external link
    // For demo purposes, this could open a modal, redirect to a download page,
    // or navigate to a contact form
    window.open('https://example.com/download', '_blank');
  };

  const handleLearnMoreClick = () => {
    // Navigate to contact or more information
    window.open('https://example.com/contact', '_blank');
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: 'transparent', // Allow animations to show through
    padding: isMobile 
      ? `${theme.spacing.xxxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxxl} ${theme.spacing.lg}`,
    textAlign: 'center',
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headlineStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.xxl : theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    lineHeight: '1.2',
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.base : theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
    lineHeight: '1.6',
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

  const priceHighlightStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.lg,
  };

  return (
    <section style={containerStyles} className={className} id="pricing" data-testid="pricing-section">
      <AnimatedSection>
        <div style={contentStyles}>
          <motion.h2
            style={headlineStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Trading?
          </motion.h2>
          
          <motion.p
            style={descriptionStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of traders who have revolutionized their gold trading with our advanced MT5 bot. 
            Experience the power of AI-driven predictions and GPU-accelerated execution.
          </motion.p>

          <motion.div
            style={priceHighlightStyles}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
          >
            Get Started Today
          </motion.div>
          
          <motion.div
            style={ctaContainerStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleCTAClick}
              data-testid="pricing-cta-button"
            >
              Download Now
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