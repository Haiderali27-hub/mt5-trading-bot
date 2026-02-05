import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { researchValidation } from '../../data/institutionalData';

export const ResearchValidationPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="research">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Research & Validation
        </h1>
        
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2 style={{fontSize: '24px', fontWeight: '600', marginBottom: '16px'}}>Backtesting & Validation</h2>
          <p><strong>Backtesting Period:</strong> {researchValidation.backtestingPeriod}</p>
          <p><strong>Out-of-Sample Testing:</strong> {researchValidation.outOfSampleTesting}</p>
          <p><strong>Walk-Forward Testing:</strong> {researchValidation.walkForwardTesting}</p>
          <p><strong>Monte Carlo Simulations:</strong> {researchValidation.monteCarloSimulations}</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default ResearchValidationPage;