
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSchedule } from '../services/supabaseService';
import { ChurchService } from '../types';

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


const SchedulePage: React.FC = () => {
    const [schedule, setSchedule] = useState<ChurchService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            const data = await getSchedule();
            setSchedule(data);
            setLoading(false);
        }
        fetchSchedule();
    }, []);

    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img
                src="https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Church interior with clock"
                className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div 
                    className="relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
                        Programação Semanal
                    </h1>
                    <p className="font-body text-lg md:text-xl text-brand-gold mt-2">Nossos encontros de fé e comunhão</p>
                </motion.div>
            </section>

            {/* Schedule Section */}
            <section className="py-16 sm:py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <p className="text-center text-brand-gold text-xl">Carregando programação...</p>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {schedule.map((service) => (
                                <motion.div 
                                    key={service.id} 
                                    className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl p-6 flex flex-col group"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-2xl font-bold font-heading text-brand-gold mb-2">{service.title}</h3>
                                    <div className="flex items-center text-brand-gold/80 mb-4 text-md">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <span>{service.day}</span>
                                        <span className="mx-2">|</span>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{service.time}</span>
                                    </div>
                                    <p className="text-brand-light/80">{service.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SchedulePage;