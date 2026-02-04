import React from 'react';
import { motion } from 'framer-motion';
import { PerformanceMetricCard } from '../ui/PerformanceMetricCard';
import { performanceMetrics } from '../../data/performanceMetrics';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface PerformanceSectionProps {
  className?: string;
}

/**
 * Performance Section Component
 * Displays key performance metrics of the MT5 Gold Trading Bot in a responsive grid layout
 * Features animated counters and color-coded metrics based on trend
 */
export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ className }) => {
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
    <section style={sectionStyles} className={className} id="performance" data-testid="performance-section">
      <div style={containerStyles}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 style={titleStyles}>
            Live Performance Metrics
          </h2>
          <p style={subtitleStyles}>
            Real-time performance data showcasing the effectiveness and reliability of our MT5 Gold Trading Bot across key trading metrics.
          </p>
        </motion.div>

        <motion.div
          style={gridStyles}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          data-testid="performance-metrics-grid"
        >
          {performanceMetrics.map((metric, index) => (
            <PerformanceMetricCard
              key={metric.id}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              trend={metric.trend}
              description={metric.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};