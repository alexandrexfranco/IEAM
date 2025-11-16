
import React, { useState, useEffect } from 'react';
import { getMinistryBySlug } from '../services/supabaseService';
import { Ministry } from '../types';
import { motion } from 'framer-motion';

interface MinistryPageProps {
  slug: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } 
  },
};

const MinistryPage: React.FC<MinistryPageProps> = ({ slug }) => {
  const [ministry, setMinistry] = useState<Ministry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistry = () => {
        setLoading(true);
        const data = getMinistryBySlug(slug);
        setMinistry(data || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(false);
    }
    fetchMinistry();
  }, [slug]);

  if (loading) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-brand-gold text-xl">Carregando Ministério...</p>
        </div>
    );
  }

  if (!ministry) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-red-500 text-xl">Ministério não encontrado.</p>
        </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img
          src={ministry.bannerImage}
          alt={ministry.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
            className="relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
            {ministry.title}
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-gold mt-2">Conheça nosso ministério</p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section id="missao" className="py-16 sm:py-20 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
                    {/* Description */}
                    <div className="md:w-2/3 text-lg text-brand-light/90 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-gold mb-6">
                            Nossa Missão
                        </h2>
                        {ministry.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Details */}
                    <div className="md:w-1/3 bg-brand-dark/50 border border-brand-gold/20 rounded-lg p-6 space-y-4 h-fit">
                        <h3 className="text-2xl font-heading font-bold text-brand-gold">Detalhes</h3>
                        <div>
                            <p className="font-bold text-brand-light">Líder:</p>
                            <p className="text-brand-gold/90">{ministry.details.leader}</p>
                        </div>
                        <div>
                            <p className="font-bold text-brand-light">Encontros:</p>
                            <p className="text-brand-gold/90">{ministry.details.schedule}</p>
                        </div>
                        <div>
                            <p className="font-bold text-brand-light">Contato:</p>
                            <p className="text-brand-gold/90">{ministry.details.contact}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MinistryPage;