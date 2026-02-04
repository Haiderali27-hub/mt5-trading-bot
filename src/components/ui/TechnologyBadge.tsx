import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';

export interface TechnologyBadgeProps {
  name: string;
  index?: number;
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.05, // Faster stagger for badges
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  }),
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut' as const,
    },
  },
};

export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
  name,
  index = 0,
}) => {
  const theme = useTheme();

  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: '20px',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.primary,
    cursor: 'default',
    whiteSpace: 'nowrap',
    transition: 'border-color 0.2s ease',
  };

  return (
    <motion.div
      custom={index}
      variants={badgeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      data-testid={`technology-badge-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div
        style={badgeStyles}
        variants={hoverVariants}
        initial="rest"
        whileHover="hover"
      >
        {name}
      </motion.div>
    </motion.div>
  );
};