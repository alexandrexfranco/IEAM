
import React, { useState, useEffect } from 'react';
import { ChurchEvent } from '../types';
import { getEvents } from '../services/supabaseService';
import { motion } from 'framer-motion';

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

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <section id="eventos" className="py-20 md:py-32 bg-brand-dark/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-brand-gold mb-4">
            Próximos Eventos
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
        </motion.div>

        {events.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {events.map((event) => (
              <motion.div 
                key={event.id} 
                className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl overflow-hidden flex flex-col group"
                variants={itemVariants}
              >
                <div className="overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-heading text-brand-gold mb-2">{event.title}</h3>
                  <div className="flex items-center text-brand-gold/80 mb-4 text-sm">
                    <span>{event.date}</span>
                    <span className="mx-2">|</span>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-brand-light/80 mb-4 flex-grow">{event.description}</p>
                  <a href="#" className="mt-auto self-start font-bold text-brand-gold hover:underline">Saiba Mais</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-brand-light/70">Nenhum evento agendado no momento.</p>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
