import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import GalleryPreview from '../components/GalleryPreview';
import CTA from '../components/CTA';

const Home: React.FC = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <WhyChooseUs />
    <Testimonials />
    <GalleryPreview />
    <CTA />
  </>
);

export default Home;
