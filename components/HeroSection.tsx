import React from 'react';
import { motion } from 'framer-motion';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const HeroSection: React.FC = () => {
  const line1 = "Bem-vindo à IEAM";
  const line2 = "Igreja Evangélica Apostólica Missionária";

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <video
        src="https://videos.pexels.com/video-files/2935032/2935032-hd_1920_1080_30fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-4 text-white">
        <motion.h1 
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-light mb-4"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {line1.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
            className="font-body text-base sm:text-lg md:text-2xl text-brand-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
        >
          {line2}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#sobre" aria-label="Scroll down">
          <svg className="w-8 h-8 text-brand-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;