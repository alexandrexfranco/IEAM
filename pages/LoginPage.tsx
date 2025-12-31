import React, { useState } from 'react';
// FIX: Add Variants to import
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Button from '../components/Button';
import { signInWithPassword, signUp } from '../services/firebaseService';

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

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper function to get friendly error messages
  const getFriendlyErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes('auth/invalid-credential') || errorMessage.includes('auth/wrong-password')) {
      return 'Email ou senha incorretos. Por favor, verifique suas credenciais.';
    }
    if (errorMessage.includes('auth/user-not-found')) {
      return 'Usuário não encontrado. Verifique seu email ou cadastre-se.';
    }
    if (errorMessage.includes('auth/email-already-in-use')) {
      return 'Este email já está cadastrado. Faça login ou use outro email.';
    }
    if (errorMessage.includes('auth/weak-password')) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (errorMessage.includes('auth/invalid-email')) {
      return 'Email inválido. Por favor, verifique o formato do email.';
    }
    if (errorMessage.includes('auth/network-request-failed')) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    return errorMessage; // Return original message if no match
  };

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
      const errorMsg = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(getFriendlyErrorMessage(errorMsg));
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
      const errorMsg = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(getFriendlyErrorMessage(errorMsg));
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

                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={inputStyles}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition"
                      aria-label={showLoginPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showLoginPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {error && <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded p-3">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <input type="text" placeholder="Nome Completo" value={signupName} onChange={(e) => setSignupName(e.target.value)} className={inputStyles} required />
                  <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className={inputStyles} required />

                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className={inputStyles}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition"
                      aria-label={showSignupPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showSignupPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar Senha"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className={inputStyles}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition"
                      aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {error && <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded p-3">{error}</p>}
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
