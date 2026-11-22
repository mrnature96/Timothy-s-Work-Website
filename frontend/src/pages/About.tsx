import React from 'react';

const About: React.FC = () => (
  <>
    {/* Hero */}
    <section className="hero" style={{ minHeight: '60vh' }}>
      <div className="hero-content">
        <h1>About <span>Tim&apos;s Welding</span></h1>
        <p>North Texas&apos; trusted partner for custom metal fabrication and welding services since day one.</p>
      </div>
    </section>

    {/* Mission */}
    <section className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">Our Mission</h2>
        <p className="section-subtitle" style={{ marginBottom: '32px' }}>To deliver exceptional welding and fabrication services with integrity, quality, and care — building lasting relationships with every customer we serve.</p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          Tim&apos;s Welding & Fabrication was founded on a simple principle: do honest work at fair prices.
          Whether it&apos;s a custom gate for your home, a structural steel beam for your business,
          or emergency welding repair on the ranch — we treat every project with the same level of
          dedication and craftsmanship.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="section section-light">
      <div className="container">
        <h2 className="section-title">Our Values</h2>
        <p className="section-subtitle">The principles that guide every weld we make.</p>
        <div className="wcu-grid" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="wcu-item">
            <div className="wcu-icon">&#x1F6E1;&#xFE0F;</div>
            <h3>Safety</h3>
            <p>Every job site follows OSHA standards and best practices.</p>
          </div>
          <div className="wcu-item">
            <div className="wcu-icon">&#x1F3C6;</div>
            <h3>Quality</h3>
            <p>Every weld is inspected, every cut is precise, every finish is professional.</p>
          </div>
          <div className="wcu-item">
            <div className="wcu-icon">&#x1F512;</div>
            <h3>Integrity</h3>
            <p>Honest quotes, transparent pricing, no surprises.</p>
          </div>
          <div className="wcu-item">
            <div className="wcu-icon">&#x2705;</div>
            <h3>Reliability</h3>
            <p>We show up on time and deliver on our promises.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Choose */}
    <section className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">Why Customers Choose Tim&apos;s Welding</h2>
        <p className="section-subtitle">
          1. <strong>Experience:</strong> Years of hands-on welding and fabrication expertise.
        </p>
        <p className="section-subtitle" style={{ marginBottom: '16px' }}>
          2. <strong>Versatility:</strong> From home gates to industrial fabrication — no job is too big or small.
        </p>
        <p className="section-subtitle" style={{ marginBottom: '16px' }}>
          3. <strong>On-Site Service:</strong> We come to you — ranches, farms, construction sites, and more.
        </p>
        <p className="section-subtitle" style={{ marginBottom: '48px' }}>
          4. <strong>Local Focus:</strong> We know North Texas and serve it with pride.
        </p>
      </div>
    </section>

    {/* Service Area */}
    <section className="section section-dark">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">Service Area</h2>
        <p className="section-subtitle">We proudly serve all of North Texas, including:</p>
        <div style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '2' }}>
          <p><strong>Denton</strong> &bull; <strong>Dallas</strong> &bull; <strong>Fort Worth</strong> &bull; <strong>Wise County</strong> &bull; <strong>Collin County</strong> &bull; <strong>Tarrant County</strong> &bull; <strong>Collin County</strong> &bull; <strong>Parker County</strong> &bull; <strong>and surrounding areas</strong></p>
        </div>
      </div>
    </section>
  </>
);

export default About;
