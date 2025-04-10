
import React, { useState, useEffect } from 'react';
import { Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { recordBurdenView, updateHugsCount } from '@/utils/burdenData';

interface BurdenCardProps {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
  className?: string;
  views?: number;
}

const BurdenCard: React.FC<BurdenCardProps> = ({ 
  id, 
  content, 
  hugs, 
  createdAt, 
  className,
  views = 0
}) => {
  const { toast } = useToast();
  const [hugCount, setHugCount] = useState(hugs);
  const [isHugging, setIsHugging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewCount, setViewCount] = useState(views);
  
  useEffect(() => {
    // Record view when card is shown
    recordBurdenView(id);
  }, [id]);
  
  const handleHug = () => {
    if (isHugging) return;
    
    setIsHugging(true);
    
    // Update local state
    const newCount = hugCount + 1;
    setHugCount(newCount);
    
    // Update in localStorage
    updateHugsCount(id);
    
    // Animation for heart
    const hearts = ['❤️', '💖', '💕', '💓', '💗'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Simulate API call
    setTimeout(() => {
      setIsHugging(false);
      toast({
        title: `${randomHeart} Hug sent!`,
        description: "Your support means a lot to someone.",
        duration: 2000,
      });
    }, 500);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const calculateMaxHeight = () => {
    // If content is short, don't need expansion
    if (content.length < 150) return "none";
    return isExpanded ? "none" : "100px";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      className={cn(
        'glass p-6 rounded-2xl w-full overflow-hidden transition-all duration-300',
        className
      )}
    >
      <div className="mb-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium"
        >
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </motion.div>
      </div>
      
      <div 
        className={cn(
          "text-foreground/90 text-base leading-relaxed mb-6 relative transition-all duration-300",
          content.length > 150 && !isExpanded && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-12 after:bg-gradient-to-t after:from-white/80 after:to-transparent"
        )}
        style={{ maxHeight: calculateMaxHeight(), overflow: 'hidden' }}
      >
        {content}
      </div>
      
      {content.length > 150 && (
        <button 
          onClick={toggleExpand}
          className="text-sm text-primary font-medium mb-4 hover:underline"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
      
      <div className="flex items-center justify-between">
        <motion.button
          onClick={handleHug}
          disabled={isHugging}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all",
            isHugging 
              ? "bg-accent/70 text-accent-foreground cursor-not-allowed" 
              : "bg-accent hover:bg-accent/80 text-accent-foreground"
          )}
        >
          <Heart 
            size={16} 
            className={isHugging ? "animate-pulse text-red-500" : ""} 
            fill={isHugging ? "currentColor" : "none"} 
            color={isHugging ? "#ef4444" : "currentColor"}
          />
          <span>Hug</span>
          <motion.span 
            key={hugCount}
            initial={{ scale: 1.5, color: "#ef4444" }}
            animate={{ scale: 1, color: "currentColor" }}
            transition={{ duration: 0.3 }}
            className="ml-1 font-medium"
          >
            {hugCount}
          </motion.span>
        </motion.button>
        
        <div className="flex items-center text-xs text-muted-foreground gap-1">
          <Eye size={14} className="opacity-70" />
          <span>{viewCount}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BurdenCard;
