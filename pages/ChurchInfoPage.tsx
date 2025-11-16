
import React, { useState, useEffect } from 'react';
import { getChurchInfoBySlug } from '../services/supabaseService';
import { ChurchInfo } from '../types';
import { motion } from 'framer-motion';

interface ChurchInfoPageProps {
  slug: string;
}

const ChurchInfoPage: React.FC<ChurchInfoPageProps> = ({ slug }) => {
  const [info, setInfo] = useState<ChurchInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = () => {
        setLoading(true);
        const data = getChurchInfoBySlug(slug);
        setInfo(data || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(false);
    }
    fetchInfo();
  }, [slug]);

  if (loading) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-brand-gold text-xl">Carregando...</p>
        </div>
    );
  }

  if (!info) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-red-500 text-xl">Página não encontrada.</p>
        </div>
    );
  }

  const renderContent = (item: { type: 'heading' | 'paragraph'; text: string; }, index: number) => {
    if (item.type === 'heading') {
        return <h2 key={index} className="text-2xl sm:text-3xl font-heading font-bold text-brand-gold mt-8 mb-4">{item.text}</h2>
    }
    return <p key={index}>{item.text}</p>
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img
          src={info.bannerImage}
          alt={info.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
            className="relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
            {info.title}
          </h1>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-4xl mx-auto text-lg text-brand-light/90 space-y-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
               {info.content.map(renderContent)}
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChurchInfoPage;