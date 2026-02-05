import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { scalabilityAnalysis } from '../../data/institutionalData';

export const ScalabilityAnalysisPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="scalability">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Scalability Analysis
        </h1>
        
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2 style={{fontSize: '24px', fontWeight: '600', marginBottom: '16px'}}>Capital Scalability</h2>
          <p><strong>Liquidity Capacity:</strong> {scalabilityAnalysis.liquidityCapacity}</p>
          <p><strong>Slippage Sensitivity:</strong> {scalabilityAnalysis.slippageSensitivity}</p>
          <p><strong>Capital Scalability:</strong> {scalabilityAnalysis.capitalScalability}</p>
          <p><strong>Trade Size Impact:</strong> {scalabilityAnalysis.tradeSizeImpact}</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default ScalabilityAnalysisPage;