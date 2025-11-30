import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCongregations } from '../services/firebaseService';
import { Congregation } from '../types';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CongregationsPage: React.FC = () => {
    const [congregations, setCongregations] = useState<Congregation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCongregations = async () => {
            const data = await getCongregations();
            setCongregations(data);
            setLoading(false);
        }
        fetchCongregations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img
                    src="https://images.pexels.com/photos/1750275/pexels-photo-1750275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Mapa com pinos de localização"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div
                    className="relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
                        Nossas Congregações
                    </h1>
                    <p className="font-body text-lg md:text-xl text-brand-gold mt-2">Encontre uma igreja perto de você</p>
                </motion.div>
            </section>

            {/* Congregations Section */}
            <section className="py-16 sm:py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <p className="text-center text-brand-gold text-xl">Carregando congregações...</p>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {congregations.map((congregation) => (
                                <motion.div
                                    key={congregation.id}
                                    className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl p-6 flex flex-col group"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-2xl font-bold font-heading text-brand-gold mb-2">{congregation.name}</h3>
                                    <div className="space-y-3 text-brand-light/90 mb-4 flex-grow text-sm sm:text-base">
                                        <p><span className="font-bold text-brand-gold/90">Endereço:</span> {congregation.address}</p>
                                        <p><span className="font-bold text-brand-gold/90">Dirigente:</span> {congregation.pastor}</p>
                                        <p><span className="font-bold text-brand-gold/90">Cultos:</span> {congregation.schedule}</p>
                                    </div>
                                    <div className="h-48 rounded-md overflow-hidden mt-4 border border-brand-gold/20">
                                        <iframe
                                            src={congregation.mapUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CongregationsPage;