import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { Card } from './Card';

export interface TradingModeCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  features: string[];
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

export const TradingModeCard: React.FC<TradingModeCardProps> = ({
  icon,
  name,
  description,
  features,
  index = 0,
}) => {
  const theme = useTheme();

  const iconContainerStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    backgroundColor: theme.colors.accent.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.background.primary,
  };

  const nameStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
    marginBottom: theme.spacing.lg,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const featuresListStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const featureItemStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    position: 'relative',
    fontFamily: theme.typography.fontFamily.primary,
  };

  const bulletStyles: React.CSSProperties = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accent.primary,
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card>
        <div style={iconContainerStyles}>
          {icon}
        </div>
        <h3 style={nameStyles}>{name}</h3>
        <p style={descriptionStyles}>{description}</p>
        <ul style={featuresListStyles}>
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} style={featureItemStyles}>
              <span style={bulletStyles}></span>
              {feature}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};