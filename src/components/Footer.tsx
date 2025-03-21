
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('w-full py-8 px-6 border-t border-border bg-gradient-to-b from-background to-secondary/20', className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Heart className="text-primary mr-2" size={18} />
              Share Your Burdens
            </h3>
            <p className="text-sm text-muted-foreground">
              A safe space for anonymous sharing and support. We believe in the healing power of sharing our struggles with others.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/my-submissions" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  My Submissions
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="pt-6 border-t border-border/50 flex items-center justify-center"
        >
          <div className="text-sm text-muted-foreground">
            © {year} Share Your Burdens. All rights reserved.
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
