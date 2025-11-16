
import React from 'react';
// FIX: Import HTMLMotionProps
import { motion, HTMLMotionProps } from 'framer-motion';

// FIX: Use HTMLMotionProps to avoid type conflicts with React's default button attributes.
interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'outline' | 'solid';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'outline', ...props }) => {
  const baseClasses = "font-bold py-2 px-6 rounded-sm transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    outline: "bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark",
    solid: "bg-brand-gold border-2 border-brand-gold text-brand-dark hover:bg-brand-gold/80 hover:border-brand-gold/80"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;