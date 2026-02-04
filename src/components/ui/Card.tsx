import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useTheme } from '../../theme';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = true,
  style,
  ...props
}) => {
  const theme = useTheme();

  const cardStyles = {
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: '12px',
    padding: theme.spacing.lg,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'all 0.3s ease-in-out',
    ...style,
  };

  if (!hoverable) {
    return (
      <div style={cardStyles} {...(props as any)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={cardStyles}
      whileHover={{
        scale: 1.02,
        borderColor: theme.colors.border.hover,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
