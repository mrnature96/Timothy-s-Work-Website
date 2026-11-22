import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGallery } from '../services/api';

const GalleryPreview: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetchGallery().then(setItems).catch(() => {}); }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Recent Work</h2>
        <p className="section-subtitle">Browse completed projects across all categories.</p>
        <div className="gallery-grid">
          {items.slice(0, 6).map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-placeholder"><span className="icon">\uD83D\uDDBC</span>{item.title}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/gallery" className="btn btn-primary">View All Projects</Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
