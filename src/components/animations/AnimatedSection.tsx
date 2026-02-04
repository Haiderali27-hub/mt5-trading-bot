import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { sectionVariants, getMotionVariants } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * AnimatedSection wrapper component
 * Wraps content sections with viewport-triggered animations
 * Uses Framer Motion's useInView hook for viewport detection
 * Respects user's prefers-reduced-motion preference
 */
export const AnimatedSection = ({
  children,
  className,
  id,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true, // Animation triggers only once
    amount: 0.2, // Trigger when 20% of element is visible
  });

  // Get appropriate variants based on motion preference
  const variants = getMotionVariants(sectionVariants, prefersReducedMotion);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
