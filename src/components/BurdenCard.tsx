
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

interface BurdenCardProps {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
  className?: string;
}

const BurdenCard: React.FC<BurdenCardProps> = ({ 
  id, 
  content, 
  hugs, 
  createdAt, 
  className 
}) => {
  const { toast } = useToast();
  const [hugCount, setHugCount] = useState(hugs);
  const [isHugging, setIsHugging] = useState(false);
  
  const handleHug = () => {
    if (isHugging) return;
    
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    
    // Simulate API call
    setTimeout(() => {
      setIsHugging(false);
      toast({
        title: "Hug sent!",
        description: "Your support means a lot.",
        duration: 2000,
      });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'glass p-6 rounded-2xl w-full card-hover',
        className
      )}
    >
      <div className="mb-4">
        <div className="inline-block px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </div>
      </div>
      
      <p className="text-foreground/90 text-base leading-relaxed mb-6">
        {content}
      </p>
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleHug}
          disabled={isHugging}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all",
            isHugging 
              ? "bg-accent/70 text-accent-foreground cursor-not-allowed" 
              : "bg-accent hover:bg-accent/80 text-accent-foreground"
          )}
        >
          <Heart 
            size={16} 
            className={isHugging ? "animate-pulse" : ""} 
            fill={isHugging ? "currentColor" : "none"} 
          />
          <span>Hug</span>
          <span className="ml-1 font-medium">{hugCount}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default BurdenCard;
