
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BurdenForm from '@/components/BurdenForm';
import BurdenCard from '@/components/BurdenCard';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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
  
  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = (content: string, password: string) => {
    const newBurden: Burden = {
      id: Date.now().toString(),
      content,
      hugs: 0,
      createdAt: new Date(),
    };
    
    // In a real app, you would save the password associated with this submission
    // to a database along with the burden content
    
    setBurdens(prev => [newBurden, ...prev]);
    
    // If password was provided
    if (password) {
      toast({
        title: "Password saved",
        description: "You can use this password to view your submissions later.",
      });
      
      // In a real app, you would save this to localStorage or similar
      localStorage.setItem(`burden_${newBurden.id}_password`, password);
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Share Your Burdens
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A safe space to anonymously share what's weighing on you and
              support others through their struggles.
            </p>
          </motion.div>
          
          <BurdenForm onSubmit={handleSubmit} className="mb-16" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Submissions</h2>
            <p className="text-muted-foreground mb-8">
              Read what others have shared and offer support with a virtual hug.
            </p>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="glass p-6 rounded-2xl animate-pulse h-48"
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
