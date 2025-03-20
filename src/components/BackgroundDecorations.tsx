
import React from 'react';
import { Weight, CloudRain, Frown, Package, HandHelping } from 'lucide-react';
import { motion } from 'framer-motion';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-right decoration */}
      <motion.div 
        className="absolute top-20 right-[10%] text-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Weight size={120} strokeWidth={1} />
      </motion.div>
      
      {/* Bottom-left decoration */}
      <motion.div 
        className="absolute bottom-20 left-[5%] text-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <CloudRain size={80} strokeWidth={1} />
      </motion.div>
      
      {/* Middle-right decoration */}
      <motion.div 
        className="absolute top-[40%] right-[5%] text-accent-foreground/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <Package size={180} strokeWidth={1} />
      </motion.div>
      
      {/* Top-left decoration */}
      <motion.div 
        className="absolute top-[15%] left-[8%] text-muted-foreground/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.9 }}
      >
        <Frown size={100} strokeWidth={1} />
      </motion.div>
      
      {/* Center-bottom decoration */}
      <motion.div 
        className="absolute bottom-[10%] left-[45%] text-muted-foreground/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      >
        <HandHelping size={120} strokeWidth={1} />
      </motion.div>
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.3 + (Math.random() * 0.4),
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: i * 0.2 },
              y: { 
                duration: 3 + Math.random() * 3, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.3,
              }
            }}
          />
        ))}
      </div>
      
      {/* Add subtle rain-like elements to symbolize emotional release */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-[1px] h-[20px] bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
            }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              y: {
                duration: 7 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 0.7,
              },
              opacity: {
                duration: 7 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 0.7,
              }
            }}
          />
        ))}
      </div>
      
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/0 to-primary/5 opacity-30" />
    </div>
  );
};

export default BackgroundDecorations;
