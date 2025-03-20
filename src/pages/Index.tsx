
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BurdenForm from '@/components/BurdenForm';
import BurdenCard from '@/components/BurdenCard';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';

interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
}

// Sample data
const sampleBurdens: Burden[] = [
  {
    id: '1',
    content: "I'm trying to finish my degree while working full-time, and I feel like I'm failing at both. I'm constantly exhausted and worried I'll never catch up.",
    hugs: 28,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '2',
    content: "My anxiety has been getting worse lately, and I find it hard to even go to public places. I haven't told anyone because I don't want them to worry.",
    hugs: 42,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    content: "I think I'm falling out of love with my career path after 5 years. I've invested so much time and money, and I'm scared to start over.",
    hugs: 15,
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
  },
  {
    id: '4',
    content: "I can't stop comparing myself to others on social media. Everyone seems to be achieving so much while I feel stuck in the same place.",
    hugs: 37,
    createdAt: new Date(Date.now() - 691200000), // 8 days ago
  },
  {
    id: '5',
    content: "I'm the first in my family to go to college, and the pressure to succeed is overwhelming. I don't know if I'm smart enough to make it.",
    hugs: 24,
    createdAt: new Date(Date.now() - 1209600000), // 14 days ago
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [burdens, setBurdens] = useState<Burden[]>(sampleBurdens);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Load any user-submitted burdens from localStorage
    try {
      const userBurdens: Burden[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('burden_')) {
          try {
            const burdenData = JSON.parse(localStorage.getItem(key) || '{}');
            userBurdens.push({
              id: key.replace('burden_', ''),
              content: burdenData.content,
              hugs: burdenData.hugs || 0,
              createdAt: new Date(burdenData.createdAt || Date.now()),
            });
          } catch (e) {
            console.error("Error parsing burden data:", e);
          }
        }
      }
      
      // Combine sample burdens with user burdens, sort by date
      const allBurdens = [...sampleBurdens, ...userBurdens].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      
      setBurdens(allBurdens);
    } catch (e) {
      console.error("Error loading burdens:", e);
    }
    
    // Simulate fetching data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Show scroll hint after loading
    const hintTimer = setTimeout(() => {
      setShowScrollHint(true);
    }, 2500);
    
    // Track scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY > 200) {
        setShowScrollHint(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hintTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSubmit = (content: string, password: string) => {
    const newBurdenId = Date.now().toString();
    const newBurden: Burden = {
      id: newBurdenId,
      content,
      hugs: 0,
      createdAt: new Date(),
    };
    
    // Store the burden in localStorage with its password
    const burdenData = {
      content,
      hugs: 0,
      createdAt: new Date().toISOString(),
      password: password || '', // Store the password with the burden
    };
    
    // Save to localStorage
    localStorage.setItem(`burden_${newBurdenId}`, JSON.stringify(burdenData));
    
    // Update state
    setBurdens(prev => [newBurden, ...prev]);
    
    // If password was provided
    if (password) {
      toast({
        title: "Password saved",
        description: "You can use this password to view your submissions later.",
      });
      
      // Save the last used password
      localStorage.setItem('last_used_password', password);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const scrollHintVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center mb-2"
            >
              <Sparkles className="text-primary mr-2" size={24} />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Share Your Burdens
              </h1>
              <Sparkles className="text-primary ml-2" size={24} />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A safe space to anonymously share what's weighing on you and
              support others through their struggles.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <BurdenForm onSubmit={handleSubmit} className="mb-16" />
          </motion.div>
          
          <div className="mb-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center mb-4"
            >
              <h2 className="text-2xl font-semibold">Recent Submissions</h2>
              <div className="ml-3 p-1 bg-accent rounded-full flex items-center">
                <Heart size={14} className="text-primary mr-1" />
                <span className="text-xs font-medium">
                  {burdens.reduce((total, burden) => total + burden.hugs, 0)} Hugs
                </span>
              </div>
            </motion.div>
            
            <p className="text-muted-foreground mb-8">
              Read what others have shared and offer support with a virtual hug.
            </p>
            
            <AnimatePresence>
              {showScrollHint && scrollPosition < 200 && (
                <motion.div 
                  variants={scrollHintVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex flex-col items-center text-muted-foreground/70"
                >
                  <span className="text-sm mb-2">Scroll to explore more</span>
                  <ArrowDown size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                    className="glass p-6 rounded-2xl h-48"
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {burdens.map((burden) => (
                  <BurdenCard
                    key={burden.id}
                    id={burden.id}
                    content={burden.content}
                    hugs={burden.hugs}
                    createdAt={burden.createdAt}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
