
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface BurdenFormProps {
  className?: string;
  onSubmit: (content: string, password: string) => void;
}

const BurdenForm: React.FC<BurdenFormProps> = ({ className, onSubmit }) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'glass p-6 rounded-2xl w-full max-w-2xl mx-auto',
        className
      )}
    >
      <h2 className="text-xl font-medium mb-2">Share Your Burden</h2>
      <p className="text-muted-foreground mb-6">
        Share what's weighing on you. All submissions are anonymous.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="content" className="text-sm font-medium text-foreground block mb-1">
            What's on your mind? <span className="text-muted-foreground">(min. 20 characters)</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="I've been struggling with..."
            className="w-full rounded-xl p-4 bg-background border border-input h-32 focus:ring-2 focus:ring-ring focus:outline-none transition-all resize-none"
            required
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {content.length} / 20+ characters
            </span>
            <span className="text-xs text-muted-foreground">
              No specific names please
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="text-sm font-medium text-foreground block mb-1">
            Recovery Password <span className="text-muted-foreground">(optional, 20 char max)</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password to view your submissions later"
            className="w-full rounded-xl p-4 bg-background border border-input focus:ring-2 focus:ring-ring focus:outline-none transition-all"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Save this password if you want to see your submissions later
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || content.length < 20}
          className={cn(
            "w-full rounded-xl p-4 font-medium transition-all",
            isSubmitting || content.length < 20
              ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isSubmitting ? "Sharing..." : "Share Anonymous Burden"}
        </button>
      </div>
    </form>
  );
};

export default BurdenForm;
