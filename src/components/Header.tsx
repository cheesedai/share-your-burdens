
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-4 px-6 fixed top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border', className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          Share Your Burdens
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/my-submissions" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            My Submissions
          </Link>
          <Link 
            to="https://www.buymeacoffee.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Buy Me a Coffee
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
