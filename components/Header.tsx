
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from './Button';
import { ministriesData, churchInfoData } from '../services/firebaseService';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: string, section?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinistryMenuOpen, setMinistryMenuOpen] = useState(false);
  const [isChurchMenuOpen, setChurchMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States for mobile submenus
  const [isMobileChurchSubMenuOpen, setMobileChurchSubMenuOpen] = useState(false);
  const [isMobileMinistrySubMenuOpen, setMobileMinistrySubMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Lock scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent | null, page: string, section?: string) => {
    e?.preventDefault();
    onNavigate(page, section);
    setMinistryMenuOpen(false);
    setChurchMenuOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const handleMobileSubMenuToggle = (menu: 'church' | 'ministry') => {
    if (menu === 'church') {
      setMobileChurchSubMenuOpen(!isMobileChurchSubMenuOpen);
    } else {
      setMobileMinistrySubMenuOpen(!isMobileMinistrySubMenuOpen);
    }
  }

  const mobileMenuVariants = {
    closed: { x: '-100%' },
    open: { x: '0%' }
  };

  const subMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between w-full">
              <div className="flex-1">
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-light p-2" aria-label="Open menu">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
              </div>
              <div className="flex-1 text-center">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="inline-block" aria-label="Go to home page">
                  <Logo className="h-14 w-14" />
                </a>
              </div>
              <div className="flex-1"></div> {/* Spacer to center the logo */}
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between w-full">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} aria-label="Go to home page">
                <Logo />
              </a>
              <nav className="flex items-center space-x-8">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer">Início</a>

                <div className="relative" onMouseEnter={() => setChurchMenuOpen(true)} onMouseLeave={() => setChurchMenuOpen(false)}>
                  <button onClick={(e) => e.preventDefault()} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer flex items-center gap-1">
                    Igreja
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isChurchMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
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
                  <button onClick={(e) => e.preventDefault()} className="font-body text-sm font-medium text-brand-light hover:text-brand-gold transition-colors duration-300 cursor-pointer flex items-center gap-1">
                    Ministérios
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isMinistryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
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
              <div className="flex items-center space-x-4">
                <Button onClick={() => onNavigate('donation')} variant="solid">
                  Doar
                </Button>
                <Button onClick={() => onNavigate('login')} variant="outline">
                  Login
                </Button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-brand-dark z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <Logo className="h-12 w-12" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-light p-2" aria-label="Close menu">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-4 text-xl font-body">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-brand-light hover:text-brand-gold transition-colors">Início</a>

              <div>
                <button onClick={() => handleMobileSubMenuToggle('church')} className="w-full flex justify-between items-center text-brand-light hover:text-brand-gold transition-colors">
                  <span>Igreja</span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileChurchSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <AnimatePresence>
                  {isMobileChurchSubMenuOpen && (
                    <motion.div
                      variants={subMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden pl-4 mt-2 flex flex-col space-y-3"
                    >
                      {churchInfoData.map(info => (
                        <a key={info.slug} href="#" onClick={(e) => handleNavClick(e, `igreja/${info.slug}`)} className="text-brand-light/80 hover:text-brand-gold transition-colors text-lg">{info.name}</a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="text-brand-light hover:text-brand-gold transition-colors">Sobre Nós</a>

              <div>
                <button onClick={() => handleMobileSubMenuToggle('ministry')} className="w-full flex justify-between items-center text-brand-light hover:text-brand-gold transition-colors">
                  <span>Ministérios</span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileMinistrySubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <AnimatePresence>
                  {isMobileMinistrySubMenuOpen && (
                    <motion.div
                      variants={subMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden pl-4 mt-2 flex flex-col space-y-3"
                    >
                      {ministriesData.map(ministry => (
                        <a key={ministry.slug} href="#" onClick={(e) => handleNavClick(e, `ministry/${ministry.slug}`)} className="text-brand-light/80 hover:text-brand-gold transition-colors text-lg">{ministry.name}</a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" onClick={(e) => handleNavClick(e, 'schedule')} className="text-brand-light hover:text-brand-gold transition-colors">Programação</a>
              <a href="#eventos" onClick={(e) => handleNavClick(e, 'home', '#eventos')} className="text-brand-light hover:text-brand-gold transition-colors">Eventos</a>
              <a href="#contato" onClick={(e) => handleNavClick(e, 'home', '#contato')} className="text-brand-light hover:text-brand-gold transition-colors">Contato</a>

              <div className="pt-8 flex flex-col space-y-4">
                <Button onClick={() => handleNavClick(null, 'donation')} variant="solid">Doar</Button>
                <Button onClick={() => handleNavClick(null, 'login')} variant="outline">Login</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;