
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DonationPage: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const pixKey = "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6";

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img
                    src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Mãos em oração"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div 
                    className="relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
                        Contribua com a Obra
                    </h1>
                    <p className="font-body text-lg md:text-xl text-brand-gold mt-2">Sua doação transforma vidas</p>
                </motion.div>
            </section>

            {/* Donation Content Section */}
            <section className="py-16 sm:py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-gold mb-4">
                            Sua Generosidade Faz a Diferença
                        </h2>
                        <p className="text-lg text-brand-light/90 mb-12">
                            "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." (2 Coríntios 9:7). 
                            Sua oferta e seu dízimo nos ajudam a levar o evangelho, cuidar da nossa comunidade e manter a casa do Senhor.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* PIX Donation */}
                        <div className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl p-8 text-center flex flex-col items-center">
                            <h3 className="text-2xl font-bold font-heading text-brand-gold mb-4">Doação via PIX</h3>
                            <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6" 
                                alt="QR Code PIX"
                                className="w-48 h-48 rounded-md bg-white p-2 mb-4"
                            />
                            <p className="text-brand-light/80 mb-2">Chave Aleatória (CNPJ):</p>
                            <p className="font-bold text-brand-gold break-all mb-4">{pixKey}</p>
                            <button 
                                onClick={handleCopy}
                                className="bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-sm hover:bg-brand-gold/80 transition-colors duration-300 w-full max-w-xs"
                            >
                                {copied ? 'Copiado!' : 'Copiar Chave'}
                            </button>
                        </div>

                        {/* Bank Transfer */}
                        <div className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl p-8 text-left">
                             <h3 className="text-2xl font-bold font-heading text-brand-gold mb-4 text-center md:text-left">Transferência Bancária</h3>
                             <div className="space-y-4 text-brand-light/90">
                                <div>
                                    <p className="font-bold">Banco:</p>
                                    <p>Banco do Brasil (001)</p>
                                </div>
                                 <div>
                                    <p className="font-bold">Agência:</p>
                                    <p>1234-5</p>
                                </div>
                                 <div>
                                    <p className="font-bold">Conta Corrente:</p>
                                    <p>12345-6</p>
                                </div>
                                 <div>
                                    <p className="font-bold">Nome:</p>
                                    <p>Igreja Evangélica Apostólica Missionária</p>
                                </div>
                                 <div>
                                    <p className="font-bold">CNPJ:</p>
                                    <p>12.345.678/0001-90</p>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default DonationPage;