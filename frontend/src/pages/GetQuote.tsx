import React, { useState } from 'react';
import { PROJECT_TYPES, BUDGET_RANGES } from '../types';
import { submitQuote as apiSubmitQuote } from '../services/api';

const GetQuote: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '', phone: '', email: '', city: '',
    project_type: '', project_description: '', budget_range: '', desired_completion_date: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await apiSubmitQuote(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="form-success" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Quote Request Submitted!</h2>
            <p>Thank you for your request. We will review your project details and contact you within 24 hours.</p>
            <p style={{ marginTop: '16px' }}>
              <a href="/" className="btn btn-secondary" style={{ display: 'inline-block', marginTop: '8px' }}>Return Home</a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Request a Quote</h1>
        <p className="section-subtitle">Fill out the form below and we will get back to you promptly.</p>

        {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="John Smith" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={formData.city} onChange={handleChange} required placeholder="Denton" />
            </div>
          </div>

          <h3 style={{ margin: '32px 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Information</h3>
          <div className="form-group">
            <label>Project Type *</label>
            <select name="project_type" value={formData.project_type} onChange={handleChange} required>
              <option value="">Select a project type...</option>
              {PROJECT_TYPES.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <textarea name="project_description" value={formData.project_description} onChange={handleChange} placeholder="Describe your project in detail..." />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Budget Range</label>
              <select name="budget_range" value={formData.budget_range} onChange={handleChange}>
                <option value="">Select a range...</option>
                {BUDGET_RANGES.map((br) => <option key={br} value={br}>{br}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Desired Completion Date</label>
              <input name="desired_completion_date" type="date" value={formData.desired_completion_date} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Upload Photos / Drawings (optional)</label>
            <input type="file" multiple accept="image/*,.pdf,.dwg" style={{ padding: '8px' }} />
            <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '4px' }}>Accepted: JPG, PNG, PDF, DWG</p>
          </div>

          <button type="submit" className="btn btn-sparks" style={{ width: '100%', marginTop: '16px' }}>Submit Quote Request</button>
        </form>
      </div>
    </section>
  );
};

export default GetQuote;
