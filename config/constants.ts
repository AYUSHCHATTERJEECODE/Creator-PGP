export const BRAND = {
  name: 'Creator PGP',
  tagline: 'AI-Powered Creator Toolkit & YouTube Growth Intelligence',
  description: 'AI Creator Studio + YouTube Growth Dashboard + Content Generation Suite + Thumbnail Intelligence Tool for YouTube and Instagram creators.',
  logo: '/logo.png',
  logoJpg: '/logo.jpg',
  alt: 'Creator PGP Official Logo',
  demoModeNotice: 'Demo Mode: Safe simulated AI response (Connect Gemini API Key in Settings for live cloud models)',
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '#dashboard' },
  { id: 'ai-content', label: 'AI Content', icon: 'Sparkles', href: '#ai-content', badge: 'Core' },
  { id: 'thumbnail-ai', label: 'Thumbnail AI', icon: 'Image', href: '#thumbnail-ai', badge: 'Popular' },
  { id: 'youtube', label: 'YouTube', icon: 'Youtube', href: '#youtube' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', href: '#instagram' },
  { id: 'ai-tools', label: 'AI Tools', icon: 'Wand2', href: '#ai-tools' },
  { id: 'history', label: 'Content History', icon: 'History', href: '#history' },
  { id: 'projects', label: 'Saved Projects', icon: 'FolderKanban', href: '#projects' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '#settings' },
  { id: 'account', label: 'Account', icon: 'User', href: '#account' },
] as const;

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free Creator',
    monthlyCredits: 100,
    price: '$0',
    features: [
      'Basic AI Content Studio',
      'Title & Description Generator',
      'Standard Hashtag Engine',
      'Thumbnail Click Potential (10/mo)',
      '1 Connected YouTube Channel',
      '7-day Analytics & Manual Planning',
      'Persistent Content History',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro Creator',
    monthlyCredits: 1000,
    price: '$29/mo',
    popular: true,
    features: [
      'Unlimited Generate ×2 System',
      'Viral Hashtag Intelligence Engine',
      'Deep 11-Factor Thumbnail AI',
      'AI Background Remover (HD Transparent PNG)',
      'Up to 5 Connected YouTube Channels',
      '90-day Analytics & Competitor Benchmarks',
      'Instagram Reels Studio & Hooks',
      'Unlimited Projects & Cloud Storage',
    ],
  },
  premium: {
    id: 'premium',
    name: 'Studio Agency',
    monthlyCredits: 5000,
    price: '$79/mo',
    features: [
      'Everything in Pro',
      'Unlimited Thumbnail Vision AI',
      'Batch Background Remover',
      'Unlimited YouTube Channel Switcher',
      'Custom Gemini API Key Passthrough',
      'Daily Multi-Angle Video Script Engine',
      'Priority Model Compute & Zero Rate Limits',
      'Priority 24/7 Creator Support',
    ],
  },
} as const;

export const NICHES = [
  'Tech & AI',
  'Gaming & Esports',
  'Finance & Crypto',
  'Fitness & Health',
  'Education & Tutorials',
  'Vlog & Lifestyle',
  'Business & Entrepreneurship',
  'Travel & Food',
  'Comedy & Entertainment',
  'Music & Audio',
  'Science & Documentaries',
  'Other',
];

export const CONTENT_TONES = [
  'Engaging & High Energy',
  'Professional & Informative',
  'Dramatic & Story-driven',
  'Conversational & Friendly',
  'Provocative & Curiosity Gap',
  'Humorous & Relatable',
  'Urgent & Action-Oriented',
];
