
// Define the Burden interface for reuse across components
export interface Burden {
  id: string;
  content: string;
  hugs: number;
  createdAt: Date;
}

// Sample data
export const sampleBurdens: Burden[] = [
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

// Load burdens from localStorage
export const loadBurdensFromStorage = (): Burden[] => {
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
    
    return allBurdens;
  } catch (e) {
    console.error("Error loading burdens:", e);
    return sampleBurdens;
  }
};

// Save a burden to localStorage
export const saveBurdenToStorage = (
  content: string, 
  password: string = ''
): Burden => {
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
  
  // If password was provided, save it
  if (password) {
    // Save the last used password
    localStorage.setItem('last_used_password', password);
  }
  
  return newBurden;
};
