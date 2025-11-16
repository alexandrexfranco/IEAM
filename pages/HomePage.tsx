
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ContactSection />
      <MapSection />
    </>
  );
};

export default HomePage;