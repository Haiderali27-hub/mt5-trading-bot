import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const ResearcherProfilePage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="profile">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Researcher Profile
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>EXO-Δ Research Team</h2>
          <p>Advanced algorithmic trading research and development.</p>
          <p>Specializing in AI-driven market analysis and high-frequency execution systems.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default ResearcherProfilePage;