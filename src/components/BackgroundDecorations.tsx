
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Flowing lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
            style={{
              left: 0,
              right: 0,
              top: `${15 + i * 15}%`,
              opacity: 0.4 + (i % 3) * 0.1,
            }}
            animate={{
              x: ['-5%', '5%', '-5%'],
              scaleY: [1, 2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Soft floating circles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 140 + 60;
          return (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full bg-accent/10"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                opacity: 0.1 + (Math.random() * 0.2),
              }}
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
                opacity: [0.1 + (Math.random() * 0.2), 0.15 + (Math.random() * 0.2), 0.1 + (Math.random() * 0.2)],
              }}
              transition={{
                duration: 10 + Math.random() * 15, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Gentle waves */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute h-[40px] w-full"
            style={{
              bottom: `${10 + i * 12}%`,
              opacity: 0.1,
              background: `linear-gradient(90deg, transparent 0%, rgba(125, 160, 200, ${0.1 - i * 0.02}) 20%, rgba(125, 160, 200, ${0.1 - i * 0.02}) 80%, transparent 100%)`,
            }}
            animate={{
              x: ['-3%', '3%', '-3%'],
            }}
            transition={{
              duration: 18 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Vertical soft lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`vline-${i}`}
            className="absolute w-[1px] bg-gradient-to-b from-secondary/0 via-secondary/20 to-secondary/0"
            style={{
              left: `${8 + i * 8}%`,
              top: 0,
              bottom: 0,
              opacity: 0.2,
            }}
            animate={{
              height: ['70%', '90%', '70%'],
              y: ['10%', '5%', '10%'],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Soft blurred gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/20 to-primary/5 opacity-30" />
    </div>
  );
};

export default BackgroundDecorations;
