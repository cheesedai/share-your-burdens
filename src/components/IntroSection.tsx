
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import BurdenForm from './BurdenForm';

interface IntroSectionProps {
  onSubmit: (content: string, password: string) => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onSubmit }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center mb-2"
        >
          <Sparkles className="text-primary mr-2" size={24} />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Share Your Burdens
          </h1>
          <Sparkles className="text-primary ml-2" size={24} />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          A safe space to anonymously share what's weighing on you and
          support others through their struggles.
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <BurdenForm onSubmit={onSubmit} className="mb-16" />
      </motion.div>
    </>
  );
};

export default IntroSection;
