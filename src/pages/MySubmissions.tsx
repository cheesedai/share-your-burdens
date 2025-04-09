
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BurdenCard from '@/components/BurdenCard';
import PasswordModal from '@/components/PasswordModal';
import BackgroundDecorations from '@/components/BackgroundDecorations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, LockOpen, ArrowLeft, BoxSelect } from 'lucide-react';

interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
  views?: number;
}

const findBurdensByPassword = (password: string): Burden[] => {
  try {
    const allBurdens: Burden[] = [];
    
    if (password === 'demo') {
      return [
        {
          id: '101',
          content: "我在工作中一直面带微笑，但实际上我正经历着严重的职业倦怠。我已经记不清上一次对工作充满热情是什么时候了。",
          hugs: 12,
          createdAt: new Date(Date.now() - 259200000),
          views: 85,
        },
        {
          id: '102',
          content: "我的父母一直问我什么时候结婚生子。我不知道如何告诉他们我可能永远都不想要这些。",
          hugs: 8,
          createdAt: new Date(Date.now() - 1728000000),
          views: 76,
        },
      ];
    }
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('burden_')) {
        try {
          const burdenData = JSON.parse(localStorage.getItem(key) || '{}');
          
          if (burdenData.password === password) {
            allBurdens.push({
              id: key.replace('burden_', ''),
              content: burdenData.content,
              hugs: burdenData.hugs || 0,
              createdAt: new Date(burdenData.createdAt || Date.now()),
              views: burdenData.views || 0,
            });
          }
        } catch (e) {
          console.error("Error parsing burden data:", e);
        }
      }
    }
    
    return allBurdens.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (e) {
    console.error("Error finding burdens:", e);
    return [];
  }
};

const MySubmissions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [myBurdens, setMyBurdens] = useState<Burden[]>([]);
  const [hasVerified, setHasVerified] = useState(false);
  
  useEffect(() => {
    const lastPassword = localStorage.getItem('last_used_password');
    if (lastPassword) {
      handlePasswordSubmit(lastPassword);
    }
  }, []);
  
  useEffect(() => {
    if (!showPasswordModal && !hasVerified) {
      navigate('/');
    }
  }, [showPasswordModal, hasVerified, navigate]);
  
  const handlePasswordSubmit = (password: string) => {
    const foundBurdens = findBurdensByPassword(password);
    
    if (foundBurdens.length > 0) {
      setMyBurdens(foundBurdens);
      setHasVerified(true);
      setShowPasswordModal(false);
      
      toast({
        title: "密码验证成功",
        description: `找到与您密码关联的 ${foundBurdens.length} 条提交。`,
      });
    } else {
      toast({
        title: "未找到提交内容",
        description: "我们无法找到与该密码相关联的提交内容。",
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
      <BackgroundDecorations />
      <Header />
      
      <main className="flex-1 pt-20 pb-10 relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              我的提交
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              查看您分享的所有心事，并了解您收到了多少拥抱和浏览量。
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
                      views={burden.views}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">未找到提交内容</h3>
                  <p className="text-muted-foreground mb-6">
                    您尚未使用此密码分享任何心事。
                  </p>
                  <Button onClick={() => navigate('/')}>
                    分享心事
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
