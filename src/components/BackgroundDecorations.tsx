
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 动态光晕效果 */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full blur-[100px]"
            style={{
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, rgba(129, 161, 242, 0.15), rgba(100, 198, 255, 0.1))' 
                : 'linear-gradient(135deg, rgba(255, 168, 168, 0.1), rgba(234, 166, 255, 0.08))',
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.4,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* 动态线条效果 */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => {
          const isHorizontal = i % 2 === 0;
          const length = 100 + Math.random() * 200;
          
          return (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r rounded-full"
              style={{
                background: isHorizontal 
                  ? `linear-gradient(90deg, transparent, rgba(${100 + i * 10}, ${140 + i * 5}, 255, 0.2) 50%, transparent)`
                  : `linear-gradient(180deg, transparent, rgba(${255 - i * 10}, ${180 + i * 3}, 255, 0.15) 50%, transparent)`,
                width: isHorizontal ? `${length}px` : '1px',
                height: isHorizontal ? '1px' : `${length}px`,
                left: `${Math.random() * 85}%`,
                top: `${Math.random() * 85}%`,
                opacity: 0.2 + (Math.random() * 0.4),
              }}
              animate={{
                x: isHorizontal ? ['-20px', '20px', '-20px'] : 0,
                y: !isHorizontal ? ['-20px', '20px', '-20px'] : 0,
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>

      {/* 装饰性气泡元素 */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => {
          const size = 3 + Math.random() * 8;
          return (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                background: `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${220 + Math.random() * 35}, ${0.2 + Math.random() * 0.3})`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                opacity: [0.1, 0.7, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      {/* 波浪纹效果 */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(210, 230, 255, ${0.05 - i * 0.01}) 20%, rgba(210, 230, 255, ${0.05 - i * 0.01}) 80%, transparent)`,
              height: '100px',
              width: '100%',
              left: 0,
              top: `${20 + i * 15}%`,
              opacity: 0.6,
            }}
            animate={{
              scaleX: [0.8, 1.1, 0.8],
              scaleY: [1, 1.2, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* 大型装饰元素 */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => {
          const size = 200 + i * 100;
          return (
            <motion.div
              key={`decor-${i}`}
              className="absolute rounded-full opacity-10"
              style={{
                width: size,
                height: size,
                border: `1px solid rgba(${180 + i * 20}, ${200 + i * 20}, 255, 0.2)`,
                left: `${10 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 40 + i * 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }
              }}
            />
          );
        })}
      </div>

      {/* 柔和光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/10 to-primary/5 opacity-30" />
    </div>
  );
};

export default BackgroundDecorations;
