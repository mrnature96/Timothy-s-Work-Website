import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Expert <span>Welding</span> & Metal Fabrication</h1>
      <p>Custom fabrication, structural steel, welding repair, and on-site services for homeowners, ranchers, and businesses across North Texas.</p>
      <div className="hero-buttons">
        <Link to="/get-quote" className="btn btn-sparks">Request a Quote</Link>
        <Link to="/about" className="btn btn-secondary">Learn More</Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
