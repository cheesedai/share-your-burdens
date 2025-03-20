
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BurdenCard from '@/components/BurdenCard';
import PasswordModal from '@/components/PasswordModal';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
}

// You would replace this with actual database lookup in a real app
const findBurdensByPassword = (password: string): Burden[] => {
  // This is just a simulation - in a real app, this would query a database
  if (password === 'demo') {
    return [
      {
        id: '101',
        content: "I've been putting on a brave face at work, but I'm dealing with severe burnout. I can't remember the last time I felt passionate about what I do.",
        hugs: 12,
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
      },
      {
        id: '102',
        content: "My parents keep asking when I'm going to get married and have kids. I don't know how to tell them I might never want either of those things.",
        hugs: 8,
        createdAt: new Date(Date.now() - 1728000000), // 20 days ago
      },
    ];
  }
  
  // Return empty array for any other password (in a real app this would check the database)
  return [];
};

const MySubmissions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [myBurdens, setMyBurdens] = useState<Burden[]>([]);
  const [hasVerified, setHasVerified] = useState(false);
  
  useEffect(() => {
    // If user closes modal without entering password, redirect to home
    if (!showPasswordModal && !hasVerified) {
      navigate('/');
    }
  }, [showPasswordModal, hasVerified, navigate]);
  
  const handlePasswordSubmit = (password: string) => {
    // In a real app, you would verify this password against stored credentials
    const foundBurdens = findBurdensByPassword(password);
    
    if (foundBurdens.length > 0) {
      setMyBurdens(foundBurdens);
      setHasVerified(true);
      setShowPasswordModal(false);
      
      toast({
        title: "Password verified",
        description: `Found ${foundBurdens.length} submission(s) associated with your password.`,
      });
    } else {
      toast({
        title: "No submissions found",
        description: "We couldn't find any submissions associated with that password.",
        variant: "destructive",
      });
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              My Submissions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              View all the burdens you've shared and see how many hugs you've received.
            </p>
          </motion.div>
          
          {hasVerified && (
            <>
              {myBurdens.length > 0 ? (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  {myBurdens.map((burden) => (
                    <BurdenCard
                      key={burden.id}
                      id={burden.id}
                      content={burden.content}
                      hugs={burden.hugs}
                      createdAt={burden.createdAt}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No submissions found</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't shared any burdens with this password yet.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Share a Burden
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      <PasswordModal
        open={showPasswordModal}
        onOpenChange={setShowPasswordModal}
        onSubmit={handlePasswordSubmit}
      />
      
      <Footer />
    </div>
  );
};

export default MySubmissions;
