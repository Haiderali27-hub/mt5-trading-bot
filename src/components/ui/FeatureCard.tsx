import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { Card } from './Card';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
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

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index = 0,
}) => {
  const theme = useTheme();

  const iconContainerStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: theme.colors.accent.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.background.primary,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
    fontFamily: theme.typography.fontFamily.primary,
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
        <h3 style={titleStyles}>{title}</h3>
        <p style={descriptionStyles}>{description}</p>
      </Card>
    </motion.div>
  );
};
