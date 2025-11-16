
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-20 md:py-28 bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-brand-gold mb-4">
            Nossa Missão
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://picsum.photos/800/600?random=1" 
              alt="Church interior" 
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 text-lg text-brand-light/90 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Somos uma comunidade de fé comprometida em viver e compartilhar a esperança encontrada em Cristo, conforme Colossenses 1:27. Nossa visão é ser uma igreja que glorifica a Deus através da adoração, do discipulado, da comunhão e do serviço missionário.
            </p>
            <p>
              Acreditamos na transformação de vidas pelo poder do Evangelho e buscamos impactar nossa comunidade local e o mundo com o amor de Jesus. Nossos cultos são vibrantes, nossa adoração é sincera e nossa mensagem é centrada na Bíblia.
            </p>
            <p>
              Convidamos você e sua família a se juntarem a nós e a fazerem parte da nossa história.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;