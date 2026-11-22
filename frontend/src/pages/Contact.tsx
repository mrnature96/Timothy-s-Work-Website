import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Contact Us</h1>
        <p className="section-subtitle">Get in touch with Tim&apos;s Welding & Fabrication.</p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div>
            <div className="contact-info-item">
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="contact-info-item">
              <h3>Email</h3>
              <p>info@tims-welding.com</p>
            </div>
            <div className="contact-info-item">
              <h3>Service Area</h3>
              <p>Denton, Dallas, Fort Worth, and all of North Texas</p>
            </div>
            <div className="contact-info-item">
              <h3>Hours</h3>
              <p>Monday - Friday: 7:00 AM - 6:00 PM<br />Saturday: 8:00 AM - 2:00 PM<br />Sunday: Closed</p>
            </div>
            <div className="map-placeholder">
              <span>Google Maps — North Texas</span>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {formSent ? (
              <div className="form-success">
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name *</label>
                  <input required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="(555) 123-4567" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Quote Request</option>
                    <option>Service Question</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea required placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
