
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from './Button';
import { ministriesData, churchInfoData } from '../services/supabaseService';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: string, section?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinistryMenuOpen, setMinistryMenuOpen] = useState(false);
  const [isChurchMenuOpen, setChurchMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, page: string, section?: string) => {
    e.preventDefault();
    onNavigate(page, section);
    setMinistryMenuOpen(false);
    setChurchMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home', '#home')} aria-label="Go to home page">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
             <a href="#home" onClick={(e) => handleNavClick(e, 'home', '#home')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Início</a>
             
             <div className="relative" onMouseEnter={() => setChurchMenuOpen(true)} onMouseLeave={() => setChurchMenuOpen(false)}>
                <a href="#" onClick={(e) => e.preventDefault()} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer flex items-center gap-1">
                    Igreja
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isChurchMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
                <AnimatePresence>
                    {isChurchMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-brand-dark/90 backdrop-blur-sm shadow-lg rounded-md py-2 z-50 border border-brand-gold/20"
                        >
                        {churchInfoData.map(info => (
                            <a
                                key={info.slug}
                                href="#"
                                onClick={(e) => handleNavClick(e, `igreja/${info.slug}`)}
                                className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-colors duration-200"
                            >
                                {info.name}
                            </a>
                        ))}
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>

             <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Sobre Nós</a>
             
             <div className="relative" onMouseEnter={() => setMinistryMenuOpen(true)} onMouseLeave={() => setMinistryMenuOpen(false)}>
                <a href="#" onClick={(e) => e.preventDefault()} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer flex items-center gap-1">
                    Ministérios
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isMinistryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
                <AnimatePresence>
                    {isMinistryMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-brand-dark/90 backdrop-blur-sm shadow-lg rounded-md py-2 z-50 border border-brand-gold/20"
                        >
                        {ministriesData.map(ministry => (
                            <a
                                key={ministry.slug}
                                href="#"
                                onClick={(e) => handleNavClick(e, `ministry/${ministry.slug}`)}
                                className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-colors duration-200"
                            >
                                {ministry.name}
                            </a>
                        ))}
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
             
             <a href="#" onClick={(e) => handleNavClick(e, 'schedule')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Programação</a>
             <a href="#eventos" onClick={(e) => handleNavClick(e, 'home', '#eventos')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Eventos</a>
             <a href="#contato" onClick={(e) => handleNavClick(e, 'home', '#contato')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Contato</a>
          </nav>
          <div className="hidden md:block">
            <Button onClick={() => onNavigate('login')}>
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
