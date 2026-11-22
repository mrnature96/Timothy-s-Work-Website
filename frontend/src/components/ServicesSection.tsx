import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';

const ICONS: Record<string, string> = {
  "Custom": "\u2699\uFE0F", "Structural": "\uD83C\uDFD2\u200D\u2699\uFE0F",
  "Repair": "\uD83D\uDD28", "Ranch": "\uD83C\uDF3E",
  "Gates": "\uD83D\uDD0E", "Fencing": "\uD83D\uDED2",
  "Handrails": "\uD83D\uDD35", "Trailer": "\uD83D\uDE9B",
  "Equipment": "\uD83E\uDDD5\u200D\u2699\uFE0F", "Industrial": "\uD83C\uDFED",
  "On-Site": "\uD83D\uDE99",
};

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setServices([
        { id: 1, name: "Custom Metal Fabrication", description: "Precision metal fabrication for custom projects of any size." },
        { id: 2, name: "Structural Steel", description: "Structural steel fabrication and installation." },
        { id: 3, name: "Welding Repair", description: "Emergency and scheduled welding repairs." },
        { id: 4, name: "Ranch & Farm Welding", description: "Agricultural and rural property welding." },
        { id: 5, name: "Gates & Entrances", description: "Custom gates and entrance solutions." },
        { id: 6, name: "Pipe Fencing", description: "Durable pipe fencing for properties." },
        { id: 7, name: "Handrails & Stairs", description: "Code-compliant handrails and stair systems." },
        { id: 8, name: "Heavy Equipment Repair", description: "On-site and shop-based equipment repair." },
        { id: 9, name: "Industrial Fabrication", description: "Custom industrial components and assemblies." },
      ]));
  }, []);

  return (
    <section className="section section-light">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">From custom gates to heavy industrial fabrication.</p>
        <div className="services-grid">
          {services.map((s) => {
            const iconKey = Object.keys(ICONS).find(k => s.name.toLowerCase().includes(k.toLowerCase())) || '';
            return (
              <div key={s.id} className="service-card">
                <div className="service-icon">{ICONS[iconKey] || "\u2699\uFE0F"}</div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
