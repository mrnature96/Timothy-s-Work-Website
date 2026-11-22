import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Tim&apos;s Welding & Fabrication</h3>
          <p>North Texas&apos; trusted source for custom metal fabrication, structural steel, welding repair, and on-site welding services.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/get-quote">Get a Quote</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li>Custom Fabrication</li>
            <li>Structural Steel</li>
            <li>Welding Repair</li>
            <li>Ranch & Farm Welding</li>
            <li>Gates & Fencing</li>
            <li>Heavy Equipment Repair</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tim&apos;s Welding & Fabrication. All rights reserved.</p>
        <p>Serving North Texas — Denton, Collin, Dallas, Tarrant & surrounding counties.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
