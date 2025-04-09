
// Define the Burden interface for reuse across components
export interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
  views?: number; // Optional view count
}

// Sample data with more realistic burdens
export const sampleBurdens: Burden[] = [
  {
    id: '1',
    content: "我尝试一边全职工作一边完成学位，感觉两边都做不好。我总是精疲力尽，担心自己永远赶不上进度。",
    hugs: 28,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    views: 124,
  },
  {
    id: '2',
    content: "最近我的焦虑越来越严重，甚至很难去公共场所。我没有告诉任何人因为我不想让他们担心。",
    hugs: 42,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    views: 156,
  },
  {
    id: '3',
    content: "从事目前的职业5年后，我觉得我不再喜欢这个行业了。我已经投入了这么多时间和金钱，害怕重新开始。",
    hugs: 15,
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    views: 89,
  },
  {
    id: '4',
    content: "我忍不住在社交媒体上与他人比较。感觉每个人都取得了很多成就，而我还停留在原地。",
    hugs: 37,
    createdAt: new Date(Date.now() - 691200000), // 8 days ago
    views: 211,
  },
  {
    id: '5',
    content: "我是家里第一个上大学的人，成功的压力让人透不过气。我不知道自己是否足够聪明能够成功。",
    hugs: 24,
    createdAt: new Date(Date.now() - 1209600000), // 14 days ago
    views: 178,
  },
  {
    id: '6',
    content: "我感觉自己的努力从来没有得到家人的认可。无论我多么努力工作，多么成功，都没有人为我感到骄傲。",
    hugs: 53,
    createdAt: new Date(Date.now() - 518400000), // 6 days ago
    views: 245,
  },
  {
    id: '7',
    content: "我在三个月前失去了我最亲密的朋友，但我还是不知道如何继续前进。我假装一切都好，但内心深处我很痛苦。",
    hugs: 89,
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
    views: 367,
  },
  {
    id: '8',
    content: "我的伴侣最近心情非常低落，我不知道如何帮助他。我尝试了一切方法，但感觉自己很无能为力。",
    hugs: 47,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    views: 218,
  },
  {
    id: '9',
    content: "我经常对工作感到疲惫不堪，但我不能辞职因为我需要支付账单。我感到被困住了，看不到出路。",
    hugs: 36,
    createdAt: new Date(Date.now() - 604800000), // 7 days ago
    views: 183,
  },
  {
    id: '10',
    content: "我发现很难与他人建立深层次的连接，总是保持距离，害怕被人伤害。这导致我感到孤独和被隔绝。",
    hugs: 61,
    createdAt: new Date(Date.now() - 950400000), // 11 days ago
    views: 274,
  },
  {
    id: '11',
    content: "我一直在隐藏我的性取向，害怕被家人和朋友拒绝。这种隐藏真实自我的痛苦每天都在消耗我。",
    hugs: 78,
    createdAt: new Date(Date.now() - 1036800000), // 12 days ago
    views: 326,
  },
  {
    id: '12',
    content: "我担心自己永远找不到真爱。已经30多岁了，看着朋友们都结婚生子，而我还是单身，感到非常焦虑。",
    hugs: 41,
    createdAt: new Date(Date.now() - 864000000), // 10 days ago
    views: 198,
  },
];

// Generate a realistic view count
const generateViewCount = (hugCount: number, baseCount: number = 50) => {
  return Math.floor(baseCount + hugCount * 2 + Math.random() * 100);
};

// Load burdens from localStorage with proper view tracking
export const loadBurdensFromStorage = (): Burden[] => {
  try {
    const userBurdens: Burden[] = [];
    const viewedBurdens = JSON.parse(localStorage.getItem('viewed_burdens') || '{}');
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('burden_')) {
        try {
          const burdenData = JSON.parse(localStorage.getItem(key) || '{}');
          const burdenId = key.replace('burden_', '');
          
          userBurdens.push({
            id: burdenId,
            content: burdenData.content,
            hugs: burdenData.hugs || 0,
            createdAt: new Date(burdenData.createdAt || Date.now()),
            views: burdenData.views || generateViewCount(burdenData.hugs || 0),
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
    
    return allBurdens;
  } catch (e) {
    console.error("Error loading burdens:", e);
    return sampleBurdens;
  }
};

// Record a view for a burden
export const recordBurdenView = (burdenId: string) => {
  try {
    // Get currently viewed burdens
    const viewedBurdens = JSON.parse(localStorage.getItem('viewed_burdens') || '{}');
    
    // If this burden hasn't been viewed in this session
    if (!viewedBurdens[burdenId]) {
      // Mark as viewed
      viewedBurdens[burdenId] = true;
      localStorage.setItem('viewed_burdens', JSON.stringify(viewedBurdens));
      
      // Update view count in the burden data
      const burdenKey = `burden_${burdenId}`;
      const burdenData = JSON.parse(localStorage.getItem(burdenKey) || '{}');
      
      if (burdenData) {
        burdenData.views = (burdenData.views || 0) + 1;
        localStorage.setItem(burdenKey, JSON.stringify(burdenData));
      }
    }
  } catch (e) {
    console.error("Error recording view:", e);
  }
};

// Save a burden to localStorage
export const saveBurdenToStorage = (
  content: string, 
  password: string = ''
): Burden => {
  const newBurdenId = Date.now().toString();
  const initialViews = 1; // Start with 1 view (the author)
  
  const newBurden: Burden = {
    id: newBurdenId,
    content,
    hugs: 0,
    createdAt: new Date(),
    views: initialViews,
  };
  
  // Store the burden in localStorage with its password
  const burdenData = {
    content,
    hugs: 0,
    createdAt: new Date().toISOString(),
    password: password || '', // Store the password with the burden
    views: initialViews,
  };
  
  // Save to localStorage
  localStorage.setItem(`burden_${newBurdenId}`, JSON.stringify(burdenData));
  
  // If password was provided, save it
  if (password) {
    // Save the last used password
    localStorage.setItem('last_used_password', password);
  }
  
  // Mark as viewed by the author
  const viewedBurdens = JSON.parse(localStorage.getItem('viewed_burdens') || '{}');
  viewedBurdens[newBurdenId] = true;
  localStorage.setItem('viewed_burdens', JSON.stringify(viewedBurdens));
  
  return newBurden;
};

// Update hugs count for a burden
export const updateHugsCount = (burdenId: string): number => {
  try {
    const burdenKey = `burden_${burdenId}`;
    const burdenData = JSON.parse(localStorage.getItem(burdenKey) || '{}');
    
    if (burdenData) {
      const newHugsCount = (burdenData.hugs || 0) + 1;
      burdenData.hugs = newHugsCount;
      localStorage.setItem(burdenKey, JSON.stringify(burdenData));
      return newHugsCount;
    }
    return 0;
  } catch (e) {
    console.error("Error updating hugs count:", e);
    return 0;
  }
};
