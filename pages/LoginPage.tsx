
import React, { useState } from 'react';
// FIX: Add Variants to import
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Button from '../components/Button';
import { signInWithPassword, signUp } from '../services/supabaseService';

interface LoginPageProps {
    onNavigate: (page: string) => void;
}

// FIX: Explicitly type variants with Variants to fix ease property type error.
const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user, error: authError } = await signInWithPassword(loginEmail, loginPassword);
      if (authError) throw new Error(authError);
      if (user) {
        if (user.role === 'admin') {
            alert(`Bem-vindo, Administrador!`);
            onNavigate('admin/dashboard');
        } else {
            alert(`Bem-vindo, ${user.email}!`);
            onNavigate('home');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    setError('');
    try {
        const { user, error: authError } = await signUp(signupName, signupEmail, signupPassword);
        if (authError) throw new Error(authError);
        if (user) {
            alert('Cadastro realizado com sucesso! Faça o login para continuar.');
            setIsLoginView(true);
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
        setLoading(false);
    }
  };

  const inputStyles = "w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark pt-24 pb-12 px-4">
      <div className="w-full max-w-md bg-brand-dark border-2 border-brand-gold/30 rounded-lg shadow-2xl p-8 space-y-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center text-brand-gold">
            Área de Membros
          </h2>
        </div>
        
        <div className="flex border-b-2 border-brand-gold/30">
            <button 
                onClick={() => setIsLoginView(true)}
                className={`flex-1 p-3 font-body font-bold transition-colors duration-300 ${isLoginView ? 'bg-brand-gold text-brand-dark' : 'text-brand-gold hover:bg-brand-gold/20'}`}
            >
                Login
            </button>
            <button 
                onClick={() => setIsLoginView(false)}
                className={`flex-1 p-3 font-body font-bold transition-colors duration-300 ${!isLoginView ? 'bg-brand-gold text-brand-dark' : 'text-brand-gold hover:bg-brand-gold/20'}`}
            >
                Cadastro
            </button>
        </div>

        <div className="overflow-hidden">
            <AnimatePresence mode="wait">
            {isLoginView ? (
                <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className={inputStyles} required />
                        <input type="password" placeholder="Senha" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={inputStyles} required />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
                        <p className="text-xs text-center text-brand-light/50 mt-4">Admin: admin@ieam.com.br / admin123</p>
                    </form>
                </motion.div>
            ) : (
                <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <input type="text" placeholder="Nome Completo" value={signupName} onChange={(e) => setSignupName(e.target.value)} className={inputStyles} required />
                        <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className={inputStyles} required />
                        <input type="password" placeholder="Senha" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className={inputStyles} required />
                        <input type="password" placeholder="Confirmar Senha" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} className={inputStyles} required />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Button>
                    </form>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
