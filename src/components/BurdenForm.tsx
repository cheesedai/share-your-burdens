
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { Send, Lock, Info, Check, AlertCircle } from 'lucide-react';

interface BurdenFormProps {
  className?: string;
  onSubmit: (content: string, password: string) => void;
}

const BurdenForm: React.FC<BurdenFormProps> = ({ className, onSubmit }) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState<'content' | 'password' | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (content.length < 20) {
      toast({
        title: "Content too short",
        description: "Please share at least 20 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Check for specific names (simple check)
    const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    if (nameRegex.test(content)) {
      toast({
        title: "Please avoid using specific names",
        description: "Keep submissions anonymous by removing names",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length > 20) {
      toast({
        title: "Password too long",
        description: "Please use a password with 20 characters or less",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(content, password);
      setContent('');
      setPassword('');
      setIsSubmitting(false);
      
      toast({
        title: "Burden shared",
        description: "Thank you for sharing. Your submission is now visible to others.",
      });
    }, 1000);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const buttonVariants = {
    disabled: { 
      opacity: 0.7,
      scale: 0.98
    },
    enabled: { 
      opacity: 1,
      scale: 1
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'glass p-6 sm:p-8 rounded-2xl w-full max-w-2xl mx-auto relative overflow-hidden',
        className
      )}
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.h2 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-medium mb-2 flex items-center"
        >
          <Info size={18} className="text-primary mr-2" />
          Share Your Burden
        </motion.h2>
        <p className="text-muted-foreground mb-6">
          Share what's weighing on you. All submissions are anonymous.
        </p>
      </motion.div>
      
      <div className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="flex justify-between mb-1">
            <label htmlFor="content" className="text-sm font-medium text-foreground">
              What's on your mind? <span className="text-muted-foreground">(min. 20 characters)</span>
            </label>
            <span 
              className={cn(
                "text-xs font-medium transition-colors",
                content.length >= 20 ? "text-green-500" : "text-muted-foreground"
              )}
            >
              {content.length} / 20+
              {content.length >= 20 && <Check size={12} className="inline ml-1" />}
            </span>
          </div>
          
          <div className="relative">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused('content')}
              onBlur={() => setIsFocused(null)}
              placeholder="I've been struggling with..."
              className={cn(
                "w-full rounded-xl p-4 bg-background border text-base transition-all resize-none",
                isFocused === 'content' 
                  ? "border-primary/50 ring-2 ring-primary/20 shadow-sm" 
                  : "border-input",
                content.length >= 20 && "border-green-200"
              )}
              style={{ height: "120px" }}
              required
            />
            
            <motion.div 
              className="absolute bottom-2 right-2 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={content.length > 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              No specific names please
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-1">
            <Lock size={14} className="text-muted-foreground mr-1" />
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Recovery Password <span className="text-muted-foreground">(optional, 20 char max)</span>
            </label>
          </div>
          
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocused('password')}
            onBlur={() => setIsFocused(null)}
            placeholder="Create a password to view your submissions later"
            className={cn(
              "w-full rounded-xl p-4 bg-background border focus:outline-none transition-all",
              isFocused === 'password' 
                ? "border-primary/50 ring-2 ring-primary/20 shadow-sm" 
                : "border-input"
            )}
          />
          
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <Info size={12} className="mr-1" />
            Save this password if you want to see your submissions later
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={isSubmitting || content.length < 20}
            variants={buttonVariants}
            initial="disabled"
            animate={isSubmitting || content.length < 20 ? "disabled" : "enabled"}
            whileHover={!(isSubmitting || content.length < 20) ? "hover" : undefined}
            whileTap={!(isSubmitting || content.length < 20) ? "tap" : undefined}
            className={cn(
              "w-full rounded-xl p-4 font-medium transition-all flex items-center justify-center",
              isSubmitting || content.length < 20
                ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sharing...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Share Anonymous Burden
              </>
            )}
          </motion.button>
          
          {content.length > 0 && content.length < 20 && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mt-2 text-amber-500 text-sm"
            >
              <AlertCircle size={14} className="mr-1" />
              Please write at least 20 characters
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.form>
  );
};

export default BurdenForm;
