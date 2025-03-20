
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('w-full py-6 px-6 border-t border-border bg-secondary/30', className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Share Your Burdens. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href="https://www.buymeacoffee.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Support This Project
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
