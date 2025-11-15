
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { signInWithPassword } from '../services/supabaseService';

interface LoginModalProps {
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2, type: 'spring', stiffness: 120 } },
  exit: { y: "100vh", opacity: 0 }
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user, error: authError } = await signInWithPassword(email, password);
      if (authError) {
        throw new Error(authError);
      }
      if (user) {
        // Handle successful login
        alert(`Bem-vindo, ${user.email}!`);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-brand-dark border-2 border-brand-gold/50 rounded-lg shadow-2xl p-8 w-full max-w-md relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-gold/70 hover:text-brand-gold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-3xl font-heading font-bold text-center text-brand-gold mb-6">Área de Membros</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
