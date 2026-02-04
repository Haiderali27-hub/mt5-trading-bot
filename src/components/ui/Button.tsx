import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useTheme } from '../../theme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getMotionVariants } from '../../utils/animations';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
}

const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut' as const,
    },
  },
  active: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut' as const,
    },
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  style,
  ...props
}) => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  // Get appropriate variants based on motion preference
  const variants = getMotionVariants(hoverVariants, prefersReducedMotion);

  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: theme.typography.fontFamily.primary,
      fontWeight: theme.typography.fontWeight.semibold,
      borderRadius: '8px',
      transition: 'all 0.2s ease-in-out',
      opacity: disabled ? 0.5 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.accent.primary,
          color: theme.colors.background.primary,
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.accent.secondary,
          color: theme.colors.text.primary,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.colors.accent.primary,
          border: `2px solid ${theme.colors.accent.primary}`,
        };
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`, // Increased for 44px minimum touch target
          fontSize: theme.typography.fontSize.sm,
          minHeight: '44px', // Ensure minimum touch target height
        };
      case 'medium':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.base,
          minHeight: '44px', // Ensure minimum touch target height
        };
      case 'large':
        return {
          padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.lg,
          minHeight: '44px', // Ensure minimum touch target height
        };
      default:
        return {};
    }
  };

  const buttonStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <motion.button
      style={buttonStyles}
      variants={variants}
      initial="rest"
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : 'active'}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </motion.button>
  );
};
