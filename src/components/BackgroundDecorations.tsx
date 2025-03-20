
import React from 'react';
import { Circle, Cloud, Star, Sparkles } from 'lucide-react';
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
        <Sparkles size={120} strokeWidth={1} />
      </motion.div>
      
      {/* Bottom-left decoration */}
      <motion.div 
        className="absolute bottom-20 left-[5%] text-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <Star size={80} strokeWidth={1} />
      </motion.div>
      
      {/* Middle-right decoration */}
      <motion.div 
        className="absolute top-[40%] right-[5%] text-accent-foreground/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <Circle size={180} strokeWidth={1} />
      </motion.div>
      
      {/* Top-left decoration */}
      <motion.div 
        className="absolute top-[15%] left-[8%] text-muted-foreground/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.9 }}
      >
        <Cloud size={100} strokeWidth={1} />
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
      
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/0 to-primary/5 opacity-30" />
    </div>
  );
};

export default BackgroundDecorations;
