import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatedSection } from '../animations/AnimatedSection';
import { 
  strategyClassification, 
  edgeExplanation, 
  operationalStructure 
} from '../../data/institutionalData';

interface StrategySectionProps {
  className?: string;
}

/**
 * Strategy Section Component
 * Displays institutional strategy classification and edge explanation
 * Features dark theme with animated cards and professional layout
 */
export const StrategySection: React.FC<StrategySectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';

  const containerStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    padding: isMobile 
      ? `${theme.spacing.xxxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxxl} ${theme.spacing.lg}`,
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.xxxl : '56px',
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
    maxWidth: '700px',
    margin: `0 auto ${theme.spacing.xxl} auto`,
    lineHeight: '1.6',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: theme.spacing.xl,
    backdropFilter: 'blur(10px)',
  };

  const cardTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: '1.6',
  };

  const riskLayersStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: theme.spacing.xl,
    backdropFilter: 'blur(10px)',
  };

  const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
  };

  const bulletStyles: React.CSSProperties = {
    width: '8px',
    height: '8px',
    backgroundColor: theme.colors.accent.primary,
    borderRadius: '50%',
    marginRight: theme.spacing.md,
    flexShrink: 0,
  };

  return (
    <section style={containerStyles} className={className} id="strategy" data-testid="strategy-section">
      <AnimatedSection>
        <div style={contentStyles}>
          <motion.h2
            style={titleStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Strategy Classification & Edge
          </motion.h2>
          
          <motion.p
            style={subtitleStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            Institutional-grade quantitative trading system with proprietary market inefficiency exploitation
          </motion.p>

          <div style={gridStyles}>
            <motion.div
              style={cardStyles}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 style={cardTitleStyles}>Strategy Classification</h3>
              
              <div style={labelStyles}>Market Traded</div>
              <div style={valueStyles}>{strategyClassification.marketTraded}</div>
              
              <div style={labelStyles}>Strategy Type</div>
              <div style={valueStyles}>{strategyClassification.strategyType}</div>
              
              <div style={labelStyles}>Automation Level</div>
              <div style={valueStyles}>{strategyClassification.automationLevel}</div>
              
              <div style={labelStyles}>Trading Timeframe</div>
              <div style={valueStyles}>{strategyClassification.tradingTimeframe}</div>
              
              <div style={labelStyles}>Deployment Model</div>
              <div style={valueStyles}>{strategyClassification.deploymentModel}</div>
            </motion.div>

            <motion.div
              style={cardStyles}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 style={cardTitleStyles}>Competitive Edge</h3>
              
              <div style={labelStyles}>Market Inefficiency Exploited</div>
              <div style={valueStyles}>{edgeExplanation.marketInefficiencyExploited}</div>
              
              <div style={labelStyles}>Why Opportunity Exists</div>
              <div style={valueStyles}>{edgeExplanation.whyOpportunityExists}</div>
              
              <div style={labelStyles}>Data-Driven Justification</div>
              <div style={valueStyles}>{edgeExplanation.dataDrivenJustification}</div>
            </motion.div>
          </div>

          <motion.div
            style={riskLayersStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 style={cardTitleStyles}>Risk Control Architecture</h3>
            <div style={valueStyles} className="mb-4">
              {operationalStructure.signalGenerationSummary}
            </div>
            
            <ul style={listStyles}>
              {operationalStructure.riskControlLayers.map((layer: string, index: number) => (
                <li key={index} style={listItemStyles}>
                  <div style={bulletStyles}></div>
                  {layer}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};