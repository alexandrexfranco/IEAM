
import React, { useState, useEffect } from 'react';
import { ChurchEvent } from '../types';
import { getEvents } from '../services/firebaseService';
import { motion } from 'framer-motion';

interface EventsSectionProps {
  onNavigate?: (page: string) => void;
}

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

// Helper function to format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString: string): string => {
  if (!dateString) return dateString;

  // Check if it's already in YYYY-MM-DD format
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return dateString;
};

const EventsSection: React.FC<EventsSectionProps> = ({ onNavigate }) => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <section id="eventos" className="py-16 sm:py-20 md:py-28 bg-brand-dark/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-brand-gold mb-4">
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
                className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl overflow-hidden flex flex-col group cursor-pointer hover:border-brand-gold/50 transition-all"
                variants={itemVariants}
                onClick={() => onNavigate && event.slug && onNavigate(`evento/${event.slug}`)}
                whileHover={{ y: -5 }}
              >
                <div className="overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-heading text-brand-gold mb-2">{event.title}</h3>
                  <div className="flex items-center text-brand-gold/80 mb-4 text-sm">
                    <span>{formatDate(event.date)}</span>
                    <span className="mx-2">|</span>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-brand-light/80 mb-4 flex-grow line-clamp-3">{event.description}</p>
                  <div className="mt-auto flex items-center gap-2 font-bold text-brand-gold group-hover:gap-3 transition-all">
                    <span>Ver detalhes</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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