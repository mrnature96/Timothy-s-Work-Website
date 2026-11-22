import React from 'react';

const FEATURES = [
  { icon: "\u2705", title: "Reliability", desc: "We show up on time, every time." },
  { icon: "\uD83C\uDFC6", title: "Quality Workmanship", desc: "Every weld meets industry standards." },
  { icon: "\uD83D\uDCCD", title: "Local Company", desc: "Serving North Texas for years." },
  { icon: "\uD83D\uDCB0", title: "Honest Pricing", desc: "Transparent quotes, no hidden fees." },
  { icon: "\u26A1", title: "Fast Communication", desc: "Quick responses on quotes and updates." },
  { icon: "\uD83D\uDD12", title: "Safety First", desc: "OSHA-compliant practices on every job." },
];

const WhyChooseUs: React.FC = () => (
  <section className="section">
    <div className="container">
      <h2 className="section-title">Why Choose Tim&apos;s Welding?</h2>
      <p className="section-subtitle">Trusted by homeowners, ranchers, and businesses across North Texas.</p>
      <div className="wcu-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className="wcu-item">
            <div className="wcu-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
