
import React from 'react';
import HeroSection from '../components/HeroSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
