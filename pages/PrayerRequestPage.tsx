import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createPrayerRequest } from '../services/firebaseService';
import Button from '../components/Button';

const PrayerRequestPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        request: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.request) {
            alert('Por favor, preencha seu nome e o pedido de oração.');
            return;
        }

        try {
            setSubmitting(true);
            await createPrayerRequest({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                request: formData.request,
                status: 'Pendente',
                createdAt: new Date().toISOString()
            });

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', request: '' });

            // Reset submitted state after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            alert('Erro ao enviar pedido de oração. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-4 rounded-lg outline-none transition-colors placeholder:text-brand-light/40";

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gold mb-4">
                        Pedidos de Oração
                    </h1>
                    <p className="text-brand-light/70 text-lg max-w-2xl mx-auto">
                        Compartilhe seu pedido de oração conosco. Nossa equipe de intercessores estará orando por você.
                    </p>
                </motion.div>

                {/* Banner Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.pexels.com/photos/8468135/pexels-photo-8468135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Oração"
                        className="w-full h-64 md:h-80 object-cover"
                    />
                </motion.div>

                {/* Success Message */}
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <div>
                                <h3 className="text-green-500 font-bold text-lg">Pedido Enviado com Sucesso!</h3>
                                <p className="text-brand-light/70 text-sm">Estaremos orando por você. Que Deus abençoe!</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#2A2A2A] border border-brand-gold/10 rounded-2xl shadow-2xl p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-brand-gold text-sm font-bold mb-2">
                                Nome Completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={inputStyles}
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-brand-gold text-sm font-bold mb-2">
                                E-mail (opcional)
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={inputStyles}
                                placeholder="seu@email.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-brand-gold text-sm font-bold mb-2">
                                Telefone (opcional)
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={inputStyles}
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        {/* Prayer Request */}
                        <div>
                            <label className="block text-brand-gold text-sm font-bold mb-2">
                                Seu Pedido de Oração <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={6}
                                value={formData.request}
                                onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                                className={inputStyles}
                                placeholder="Compartilhe seu pedido de oração..."
                                required
                            />
                            <p className="text-brand-light/40 text-xs mt-2">
                                Seus dados serão tratados com confidencialidade e respeito.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                variant="solid"
                                disabled={submitting}
                                className="min-w-[200px]"
                            >
                                {submitting ? 'Enviando...' : 'Enviar Pedido'}
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-[#2A2A2A] border border-brand-gold/10 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 className="text-brand-light font-bold mb-2">Confidencial</h3>
                        <p className="text-brand-light/60 text-sm">Seus dados são protegidos e tratados com sigilo</p>
                    </div>

                    <div className="bg-[#2A2A2A] border border-brand-gold/10 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-brand-light font-bold mb-2">Equipe Dedicada</h3>
                        <p className="text-brand-light/60 text-sm">Intercessores comprometidos em orar por você</p>
                    </div>

                    <div className="bg-[#2A2A2A] border border-brand-gold/10 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-brand-light font-bold mb-2">Com Amor</h3>
                        <p className="text-brand-light/60 text-sm">Oramos com fé e amor pelo seu pedido</p>
                    </div>
                </motion.div>

                {/* Bible Verse */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-8 max-w-2xl">
                        <p className="text-brand-light/90 text-lg italic mb-3">
                            "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças."
                        </p>
                        <p className="text-brand-gold font-bold">Filipenses 4:6</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrayerRequestPage;
