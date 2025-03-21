
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundDecorations from '@/components/BackgroundDecorations';
import IntroSection from '@/components/IntroSection';
import BurdenList from '@/components/BurdenList';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { Burden, loadBurdensFromStorage, saveBurdenToStorage } from '@/utils/burdenData';

const Index = () => {
  const isMobile = useIsMobile();
  const [burdens, setBurdens] = useState<Burden[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Load burdens from localStorage
    const loadedBurdens = loadBurdensFromStorage();
    setBurdens(loadedBurdens);
    
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
    // Save burden to localStorage and get the new burden object
    const newBurden = saveBurdenToStorage(content, password);
    
    // Update state
    setBurdens(prev => [newBurden, ...prev]);
    
    // If password was provided
    if (password) {
      toast({
        title: "Password saved",
        description: "You can use this password to view your submissions later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundDecorations />
      <Header />
      
      <main className="flex-1 pt-20 pb-10 relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <IntroSection onSubmit={handleSubmit} />
          <BurdenList 
            burdens={burdens}
            isLoading={isLoading}
            showScrollHint={showScrollHint}
            scrollPosition={scrollPosition}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
