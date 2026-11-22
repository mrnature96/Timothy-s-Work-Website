import React from 'react';

const TESTIMONIALS = [
  { text: "Tim and his team did an incredible job on our custom gate. Outstanding weld quality and very fair price.", author: "\u2014 Mike R., Denton TX" },
  { text: "We needed emergency welding on our farm equipment and Tim came out the same day. Fixed it right the first time.", author: "\u2014 Sarah L., Wise County" },
  { text: "Professional, honest, and skilled. Tim fabricated a steel canopy for our business and it looks fantastic.", author: "\u2014 James K., Fort Worth" },
];

const Testimonials: React.FC = () => (
  <section className="section section-dark">
    <div className="container">
      <h2 className="section-title">What Our Customers Say</h2>
      <p className="section-subtitle">Don&apos;t just take our word for it.</p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial">
            <p className="testimonial-text">"{t.text}"</p>
            <span className="testimonial-author">{t.author}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
