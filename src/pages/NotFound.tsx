import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BackgroundDecorations from '@/components/BackgroundDecorations';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <BackgroundDecorations />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center z-10"
      >
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-muted-foreground text-lg mb-6">
          We can't seem to find the page you're looking for.
        </p>
        <Link to="/">
          <Button variant="secondary">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
