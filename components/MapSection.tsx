
import React from 'react';
import { motion } from 'framer-motion';

const MapSection: React.FC = () => {
  return (
    <section id="localizacao" className="bg-brand-dark/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-brand-gold mb-4">
            Nossa Localização
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
        </motion.div>
        
        <motion.div
          className="overflow-hidden rounded-lg shadow-2xl border border-brand-gold/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!4v1763318030385!6m8!1m7!1sKUFfC1-IVn5EtECA2kzIDQ!2m2!1d-20.26547614694392!2d-40.40274700480455!3f198.30171165185482!4f2.9537550161147124!5f0.7820865974627469" 
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;