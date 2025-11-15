
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { motion, AnimatePresence } from 'framer-motion';

export type Page = 'home' | 'about';

const App: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const handleNavigate = (page: Page, section?: string) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
    
    // Use a timeout to ensure the page has re-rendered before scrolling
    setTimeout(() => {
      if (section) {
        const element = document.querySelector(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-brand-dark"
    >
      <Header onLoginClick={openLoginModal} onNavigate={handleNavigate} />
      <main>
        <AnimatePresence mode="wait">
            <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'about' && <AboutPage />}
            </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
