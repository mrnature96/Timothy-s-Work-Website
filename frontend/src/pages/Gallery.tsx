import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';
import { GALLERY_CATEGORIES } from '../types';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchGallery(category === 'All' ? undefined : category)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Project Gallery</h1>
        <p className="section-subtitle">Browse our completed work across all categories.</p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 20px', border: '2px solid #e0e0e0', borderRadius: '4px',
                background: category === cat ? '#4a90d9' : 'transparent',
                color: category === cat ? '#fff' : '#333',
                cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No projects found for this category.</p>
        ) : (
          <div className="gallery-grid">
            {items.map((item) => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-placeholder">
                  <span className="icon">&#128203;</span>
                  <div><strong>{item.title}</strong></div>
                  <div style={{ fontSize: '0.85rem' }}>{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
