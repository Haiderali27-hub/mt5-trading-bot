import React from 'react';
import { motion } from 'framer-motion';
import { TradingModeCard } from '../ui/TradingModeCard';
import { tradingModes } from '../../data/tradingModes';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface TradingModesSectionProps {
  className?: string;
}

/**
 * Trading Modes Section Component
 * Displays the 3 trading modes of the MT5 Gold Trading Bot in a responsive grid layout
 * Features staggered entrance animations when entering viewport
 */
export const TradingModesSection: React.FC<TradingModesSectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger child animations by 100ms
        delayChildren: 0.2, // Start child animations after 200ms
      },
    },
  };

  // Get responsive grid columns based on breakpoint
  const getGridColumns = () => {
    switch (breakpoint) {
      case 'mobile':
        return '1fr'; // 1 column on mobile
      case 'tablet':
        return 'repeat(2, 1fr)'; // 2 columns on tablet
      case 'desktop':
      case 'wide':
        return 'repeat(3, 1fr)'; // 3 columns on desktop and wide
      default:
        return 'repeat(3, 1fr)';
    }
  };

  // Get responsive gap based on breakpoint
  const getGridGap = () => {
    switch (breakpoint) {
      case 'mobile':
        return theme.spacing.lg; // 24px gap on mobile
      case 'tablet':
        return theme.spacing.lg; // 24px gap on tablet
      case 'desktop':
      case 'wide':
        return theme.spacing.xl; // 32px gap on desktop
      default:
        return theme.spacing.xl;
    }
  };

  const sectionStyles: React.CSSProperties = {
    padding: `${theme.spacing.xxxl} ${theme.spacing.lg}`,
    backgroundColor: 'transparent', // Allow animations to show through
    minHeight: 'auto',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: breakpoint === 'mobile' ? theme.typography.fontSize.xxxl : '56px',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: '1.2',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    maxWidth: '600px',
    margin: `0 auto ${theme.spacing.xxl} auto`,
    lineHeight: '1.6',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridColumns(),
    gap: getGridGap(),
    width: '100%',
  };

  return (
    <section style={sectionStyles} className={className} id="trading-modes" data-testid="trading-modes-section">
      <div style={containerStyles}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 style={titleStyles}>
            Trading Modes
          </h2>
          <p style={subtitleStyles}>
            Choose the trading mode that best fits your strategy and risk tolerance. Each mode is designed to optimize performance for different trading approaches.
          </p>
        </motion.div>

        <motion.div
          style={gridStyles}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          data-testid="trading-modes-grid"
        >
          {tradingModes.map((mode, index) => (
            <TradingModeCard
              key={mode.id}
              icon={mode.icon}
              name={mode.name}
              description={mode.description}
              features={mode.features}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};