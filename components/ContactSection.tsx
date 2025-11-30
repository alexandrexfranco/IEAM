
import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  return (
    <section id="contato" className="py-16 sm:py-20 md:py-28 bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-brand-gold mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-12"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Nome</label>
                <input type="text" id="name" placeholder="Seu Nome" className="w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" placeholder="Seu Email" className="w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Mensagem</label>
                <textarea id="message" rows={4} placeholder="Sua Mensagem" className="w-full bg-brand-dark/50 border-b-2 border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 transition-colors duration-300 outline-none resize-none"></textarea>
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
          <motion.div 
            className="space-y-6 text-brand-light/90"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
             <div>
                 <h3 className="font-bold text-lg text-brand-gold mb-2">Endereço</h3>
                 <p>Rua João Rodrigues Filho, S/Nº</p>
                 <p>Morrinhos, Cariacica Sede - ES</p>
                 <p>CEP: 29156-000</p>
             </div>
             <div>
                 <h3 className="font-bold text-lg text-brand-gold mb-2">Email</h3>
                 <p>contato@ieam.com.br</p>
             </div>
             <div>
                 <h3 className="font-bold text-lg text-brand-gold mb-2">Telefone</h3>
                 <p>(11) 98765-****</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;