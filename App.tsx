import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import MinistryPage from './pages/MinistryPage';
import SchedulePage from './pages/SchedulePage';
import ChurchInfoPage from './pages/ChurchInfoPage';
import DonationPage from './pages/DonationPage';
import CongregationsPage from './pages/CongregationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChange } from './services/firebaseService';
import type { User as FirebaseUser } from 'firebase/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (page: string, section?: string) => {
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

  const renderPage = () => {
    if (currentPage.startsWith('ministry/')) {
      const slug = currentPage.split('/')[1];
      return <MinistryPage slug={slug} />;
    }
    if (currentPage === 'igreja/congregacoes') {
      return <CongregationsPage />;
    }
    if (currentPage.startsWith('igreja/')) {
      const slug = currentPage.split('/')[1];
      return <ChurchInfoPage slug={slug} />;
    }
    if (currentPage.startsWith('blog/')) {
      const slug = currentPage.split('/')[1];
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'schedule':
        return <SchedulePage />;
      case 'donation':
        return <DonationPage />;
      case 'admin/dashboard':
      case 'admin/events': // Fallback for legacy link
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <UserDashboardPage />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-brand-dark"
    >
      <Header onNavigate={handleNavigate} currentUser={currentUser} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </motion.div>
  );
};

export default App;
