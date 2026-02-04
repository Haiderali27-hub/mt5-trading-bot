import React from 'react';
import { motion } from 'framer-motion';
import { TechnologyBadge } from '../ui/TechnologyBadge';
import { technologyCategories } from '../../data/technologies';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface TechnologySectionProps {
  className?: string;
}

/**
 * Technology Section Component
 * Displays the technology stack of the MT5 Gold Trading Bot organized by categories
 * Features staggered entrance animations and responsive layout
 */
export const TechnologySection: React.FC<TechnologySectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger category animations by 200ms
        delayChildren: 0.1, // Start category animations after 100ms
      },
    },
  };

  // Category animation variants
  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // Badge container animation variants
  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Fast stagger for badges
        delayChildren: 0.2, // Start badge animations after category appears
      },
    },
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

  const categoriesGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing.xl,
    width: '100%',
  };

  const categoryCardStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: '12px',
    padding: theme.spacing.xl,
    transition: 'border-color 0.3s ease',
  };

  const categoryHeaderStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  };

  const categoryIconStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    color: theme.colors.accent.primary,
    marginRight: theme.spacing.md,
    flexShrink: 0,
  };

  const categoryTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.primary,
    margin: 0,
  };

  const badgesContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  };

  return (
    <section style={sectionStyles} className={className} id="technology" data-testid="technology-section">
      <div style={containerStyles}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 style={titleStyles}>
            Technology Stack
          </h2>
          <p style={subtitleStyles}>
            Powered by cutting-edge technologies and advanced algorithms, our MT5 Gold Trading Bot leverages the latest innovations in machine learning, GPU acceleration, and high-frequency trading.
          </p>
        </motion.div>

        <motion.div
          style={categoriesGridStyles}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          data-testid="technology-categories-grid"
        >
          {technologyCategories.map((category) => (
            <motion.div
              key={category.id}
              style={categoryCardStyles}
              variants={categoryVariants}
              whileHover={{
                borderColor: theme.colors.border.hover,
                transition: { duration: 0.2 }
              }}
              data-testid={`technology-category-${category.id}`}
            >
              <div style={categoryHeaderStyles}>
                <div style={categoryIconStyles}>
                  {category.icon}
                </div>
                <h3 style={categoryTitleStyles}>
                  {category.name}
                </h3>
              </div>

              <motion.div
                style={badgesContainerStyles}
                variants={badgeContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                data-testid={`technology-badges-${category.id}`}
              >
                {category.technologies.map((technology, techIndex) => (
                  <TechnologyBadge
                    key={technology.id}
                    name={technology.name}
                    index={techIndex}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};