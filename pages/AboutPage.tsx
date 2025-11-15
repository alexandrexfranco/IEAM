
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } 
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20"> {/* Padding to offset fixed header */}
      {/* Page Header */}
      <section className="relative py-32 md:py-48 text-center bg-brand-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img
          src="https://images.pexels.com/photos/212269/pexels-photo-212269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Church congregation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
            className="relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-brand-light">
            Sobre Nós
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-gold mt-2">Conheça nossa história e missão</p>
        </motion.div>
      </section>

      {/* Nossa Missão Section */}
      <section id="missao" className="py-20 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="text-center"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-gold mb-4">
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
      
      {/* Nossa História Section */}
      <section id="historia" className="py-20 md:py-24 bg-brand-dark/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="text-center"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-gold mb-4">
                    Nossa História
                </h2>
                <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
            </motion.div>

            <motion.div 
                className="max-w-3xl mx-auto text-lg text-brand-light/90 space-y-4 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <p>
                    Fundada em 1998, a Igreja Evangélica Apostólica Missionária nasceu de um pequeno grupo de oração com um grande desejo de ver a comunidade transformada pelo amor de Cristo.
                </p>
                <p>
                    Ao longo dos anos, crescemos em número e em fé, sempre mantendo nosso foco na pregação da Palavra, na comunhão dos santos e no serviço ao próximo. Hoje, somos gratos por tudo que Deus tem feito e animados para o futuro que Ele nos reserva.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Nossos Pastores Section */}
       <section id="lideranca" className="py-20 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="text-center"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-gold mb-4">
                    Nossa Liderança
                </h2>
                <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Pastor Card 1 */}
                <motion.div className="text-center" variants={itemVariants}>
                    <img src="https://picsum.photos/400/400?random=pastor1" alt="Pastor 1" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg object-cover border-4 border-brand-gold/50"/>
                    <h3 className="font-heading text-xl text-brand-gold font-bold">Pr. João Silva</h3>
                    <p className="text-brand-light/80">Pastor Presidente</p>
                </motion.div>
                {/* Pastor Card 2 */}
                <motion.div className="text-center" variants={itemVariants}>
                    <img src="https://picsum.photos/400/400?random=pastor2" alt="Pastor 2" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg object-cover border-4 border-brand-gold/50"/>
                    <h3 className="font-heading text-xl text-brand-gold font-bold">Pra. Maria Oliveira</h3>
                    <p className="text-brand-light/80">Pastora de Jovens</p>
                </motion.div>
                {/* Pastor Card 3 */}
                <motion.div className="text-center" variants={itemVariants}>
                    <img src="https://picsum.photos/400/400?random=pastor3" alt="Pastor 3" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg object-cover border-4 border-brand-gold/50"/>
                    <h3 className="font-heading text-xl text-brand-gold font-bold">Pr. Carlos Santos</h3>
                    <p className="text-brand-light/80">Pastor de Missões</p>
                </motion.div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
