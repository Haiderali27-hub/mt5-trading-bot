import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { Card } from './Card';

export interface PerformanceMetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: 'positive' | 'negative' | 'neutral';
  description: string;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

export const PerformanceMetricCard: React.FC<PerformanceMetricCardProps> = ({
  icon,
  label,
  value,
  unit,
  trend,
  description,
  index = 0,
}) => {
  const theme = useTheme();
  const [animatedValue, setAnimatedValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  // Extract numeric value for animation
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
  const isNumeric = !isNaN(numericValue);

  // Animate counter when component becomes visible
  useEffect(() => {
    if (isVisible && isNumeric) {
      let start = 0;
      const end = numericValue;
      const duration = 1500; // 1.5 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          // Format the animated value to match the original format
          if (value.includes(':')) {
            // Handle ratio format like "1:3.2"
            setAnimatedValue(value);
          } else {
            setAnimatedValue(start.toFixed(1));
          }
        }
      }, 16);

      return () => clearInterval(timer);
    } else if (isVisible) {
      setAnimatedValue(value);
    }
  }, [isVisible, value, numericValue, isNumeric]);

  // Get trend color
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return theme.colors.accent.primary; // Green for positive
      case 'negative':
        return '#FF4444'; // Red for negative/risk indicators
      case 'neutral':
      default:
        return theme.colors.text.primary; // Default text color
    }
  };

  const iconContainerStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    backgroundColor: trend === 'negative' ? '#FF444420' : `${theme.colors.accent.primary}20`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    color: getTrendColor(),
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const valueContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  };

  const valueStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: getTrendColor(),
    fontFamily: theme.typography.fontFamily.primary,
    lineHeight: '1',
  };

  const unitStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: '1.5',
    fontFamily: theme.typography.fontFamily.primary,
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <Card>
        <div style={iconContainerStyles}>
          {icon}
        </div>
        <div style={labelStyles}>{label}</div>
        <div style={valueContainerStyles}>
          <span style={valueStyles}>{animatedValue}</span>
          <span style={unitStyles}>{unit}</span>
        </div>
        <p style={descriptionStyles}>{description}</p>
      </Card>
    </motion.div>
  );
};