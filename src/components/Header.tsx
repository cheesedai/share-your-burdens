
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={cn(
        'w-full py-4 px-6 fixed top-0 z-50 transition-all duration-300',
        scrolled 
          ? 'backdrop-blur-md bg-background/90 shadow-sm' 
          : 'backdrop-blur-none bg-background/80',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-medium tracking-tight hover:opacity-80 transition-opacity"
          >
            <Heart className="text-primary" size={20} />
            <span>Share Your Burdens</span>
          </Link>
        </motion.div>
        
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <motion.div
            custom={1}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/" 
              className={cn(
                "flex items-center space-x-1 text-sm font-medium px-3 py-2 rounded-full transition-colors",
                isActive('/') 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </motion.div>
          
          <motion.div
            custom={2}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/my-submissions" 
              className={cn(
                "flex items-center space-x-1 text-sm font-medium px-3 py-2 rounded-full transition-colors",
                isActive('/my-submissions') 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              )}
            >
              <User size={16} />
              <span className="hidden sm:inline">My Submissions</span>
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
