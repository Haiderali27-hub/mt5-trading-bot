import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { 
  strategyClassification, 
  edgeExplanation, 
  operationalStructure,
  technologyInfrastructure 
} from '../../data/institutionalData';

export const StrategyOverviewPage: React.FC = () => {
  const pageStyles: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '300',
    color: '#1A1A1A',
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '24px',
    borderBottom: '2px solid #F0F0F0',
    paddingBottom: '8px'
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666666',
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  };

  const valueStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#1A1A1A',
    marginBottom: '16px',
    lineHeight: '1.5'
  };

  return (
    <InstitutionalLayout currentPage="strategy">
      <div style={pageStyles}>
        <h1 style={titleStyles}>Strategy Overview & Classification</h1>
        
        {/* Detailed Strategy Classification */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Strategy Classification</h2>
          <div style={cardStyles}>
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
          </div>
        </section>

        {/* Edge Explanation */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Competitive Edge Analysis</h2>
          <div style={cardStyles}>
            <div style={labelStyles}>Market Inefficiency Exploited</div>
            <div style={valueStyles}>{edgeExplanation.marketInefficiencyExploited}</div>
            
            <div style={labelStyles}>Why This Opportunity Exists</div>
            <div style={valueStyles}>{edgeExplanation.whyOpportunityExists}</div>
            
            <div style={labelStyles}>Data-Driven Justification</div>
            <div style={valueStyles}>{edgeExplanation.dataDrivenJustification}</div>
            
            <div style={labelStyles}>Historical Persistence Evidence</div>
            <div style={valueStyles}>{edgeExplanation.historicalPersistenceEvidence}</div>
          </div>
        </section>

        {/* Operational Structure */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Operational Structure</h2>
          <div style={cardStyles}>
            <div style={labelStyles}>Signal Generation Summary</div>
            <div style={valueStyles}>{operationalStructure.signalGenerationSummary}</div>
            
            <div style={labelStyles}>Execution Methodology Overview</div>
            <div style={valueStyles}>{operationalStructure.executionMethodologyOverview}</div>
            
            <div style={labelStyles}>Manual Trigger Explanation</div>
            <div style={valueStyles}>{operationalStructure.manualTriggerExplanation}</div>
          </div>

          <h3 style={{...sectionTitleStyles, fontSize: '18px', marginTop: '24px'}}>Risk Control Layers</h3>
          <div style={cardStyles}>
            {operationalStructure.riskControlLayers.map((layer: string, index: number) => (
              <div key={index} style={{marginBottom: '12px', paddingLeft: '16px', borderLeft: '3px solid #E5E5E5'}}>
                <div style={{fontWeight: '600', color: '#1A1A1A', marginBottom: '4px'}}>
                  Layer {index + 1}
                </div>
                <div style={{color: '#4A4A4A', fontSize: '14px'}}>
                  {layer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Overview */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Technology Infrastructure Overview</h2>
          <div style={cardStyles}>
            <div style={labelStyles}>Platform</div>
            <div style={valueStyles}>{technologyInfrastructure.platform}</div>
            
            <div style={labelStyles}>AI Engine Overview</div>
            <div style={valueStyles}>{technologyInfrastructure.aiEngineOverview}</div>
            
            <div style={labelStyles}>Multi-Engine Signal Explanation</div>
            <div style={valueStyles}>{technologyInfrastructure.multiEngineSignalExplanation}</div>
            
            <div style={labelStyles}>Execution Infrastructure</div>
            <div style={valueStyles}>{technologyInfrastructure.executionInfrastructure}</div>
          </div>
        </section>
      </div>
    </InstitutionalLayout>
  );
};
export default StrategyOverviewPage;