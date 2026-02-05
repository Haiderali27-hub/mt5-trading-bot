import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { complianceFramework } from '../../data/institutionalData';

export const ComplianceGovernancePage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="compliance">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Compliance & Governance
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>Compliance Framework</h2>
          <p><strong>Operational Monitoring:</strong> {complianceFramework.operationalMonitoring}</p>
          <p><strong>Audit Logging:</strong> {complianceFramework.auditLogging}</p>
          <p><strong>Version Control:</strong> {complianceFramework.versionControl}</p>
          <p><strong>Disaster Recovery:</strong> {complianceFramework.disasterRecovery}</p>
          <p><strong>Security Measures:</strong> {complianceFramework.securityMeasures}</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default ComplianceGovernancePage;