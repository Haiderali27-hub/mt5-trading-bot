import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const InstitutionalContactPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="contact">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Institutional Contact
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> exodellta@gmail.com</p>
          <p><strong>Phone:</strong> +92 300 1032005</p>
          <p><strong>Company:</strong> EXO-Δ</p>
          <p><strong>Address:</strong> House 16 street 33 I-8/2, Islamabad, Pakistan</p>
          
          <h3 style={{marginTop: '24px'}}>Licensing Inquiries</h3>
          <p>For institutional licensing and deployment inquiries, please contact us directly.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default InstitutionalContactPage;