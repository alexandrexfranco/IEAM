
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from './Button';
import { Page } from '../App';

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (page: Page, section?: string) => void;
}

const navLinks = [
  { page: 'home' as Page, section: '#home', label: 'Início' },
  { page: 'about' as Page, section: '', label: 'Sobre Nós' },
  { page: 'home' as Page, section: '#eventos', label: 'Eventos' },
  { page: 'home' as Page, section: '#contato', label: 'Contato' },
];

const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page, section?: string) => {
    e.preventDefault();
    onNavigate(page, section);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home', '#home')} aria-label="Go to home page">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.page === 'home' ? link.section : '#'}
                onClick={(e) => handleNavClick(e, link.page, link.section)} 
                className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button onClick={onLoginClick}>
              Login
            </Button>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button could be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
