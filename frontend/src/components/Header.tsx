import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <header className="site-header">
      <nav className="nav-bar">
        <Link to="/" className="nav-logo">
          Tim&apos;s <span>Welding</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/gallery" className={isActive('/gallery')}>Gallery</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          <li><Link to="/get-quote" className={`nav-cta ${isActive('/get-quote')}`}>Get a Quote</Link></li>
        </ul>
        <button className="mobile-toggle">&#9776;</button>
      </nav>
    </header>
  );
};

export default Header;
