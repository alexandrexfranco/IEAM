
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection onNavigate={onNavigate} />
      <ContactSection />
      <MapSection />
    </>
  );
};

export default HomePage;