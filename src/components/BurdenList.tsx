
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Heart } from 'lucide-react';
import BurdenCard from './BurdenCard';

interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
}

interface BurdenListProps {
  burdens: Burden[];
  isLoading: boolean;
  showScrollHint: boolean;
  scrollPosition: number;
}

const BurdenList: React.FC<BurdenListProps> = ({ 
  burdens, 
  isLoading, 
  showScrollHint, 
  scrollPosition 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const scrollHintVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="mb-8 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center mb-4"
      >
        <h2 className="text-2xl font-semibold">Recent Submissions</h2>
        <div className="ml-3 p-1 bg-accent rounded-full flex items-center">
          <Heart size={14} className="text-primary mr-1" />
          <span className="text-xs font-medium">
            {burdens.reduce((total, burden) => total + burden.hugs, 0)} Hugs
          </span>
        </div>
      </motion.div>
      
      <p className="text-muted-foreground mb-8">
        Read what others have shared and offer support with a virtual hug.
      </p>
      
      <AnimatePresence>
        {showScrollHint && scrollPosition < 200 && (
          <motion.div 
            variants={scrollHintVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex flex-col items-center text-muted-foreground/70"
          >
            <span className="text-sm mb-2">Scroll to explore more</span>
            <ArrowDown size={20} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
              className="glass p-6 rounded-2xl h-48"
            />
          ))}
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {burdens.map((burden) => (
            <BurdenCard
              key={burden.id}
              id={burden.id}
              content={burden.content}
              hugs={burden.hugs}
              createdAt={burden.createdAt}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BurdenList;
