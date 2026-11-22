import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => (
  <section className="section">
    <div className="cta-banner">
      <h2>Ready to Start Your Project?</h2>
      <p>Get a free, no-obligation quote today. We respond fast.</p>
      <Link to="/get-quote" className="btn btn-secondary">Request a Free Quote</Link>
    </div>
  </section>
);

export default CTA;
