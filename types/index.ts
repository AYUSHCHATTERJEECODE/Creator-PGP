export type PlatformType = 'youtube' | 'youtube_shorts' | 'instagram_reels' | 'both';

export type UserPlan = 'free' | 'pro' | 'premium';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  primaryPlatform: PlatformType;
  niche: string;
  contentType: string;
  plan: UserPlan;
  creditsRemaining: number;
  monthlyQuota: number;
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface YouTubeChannel {
  id: string;
  channelId: string;
  title: string;
  handle: string;
  customUrl: string;
  avatarUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  watchTimeHours?: number;
  likesCount?: number;
  commentsCount?: number;
  isConnected: boolean;
  isManual?: boolean;
  connectedAt?: string;
}

export interface VideoPerformance {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  ctr: number;
  watchTimeHours: number;
}

export interface AnalyticsMetricPoint {
  date: string;
  views: number;
  watchTimeHours: number;
  subscribers: number;
  ctr: number;
}

export interface YouTubeAnalyticsData {
  timeframe: '7d' | '28d' | '90d' | 'custom';
  isManualData: boolean;
  totalViews: number;
  totalWatchTimeHours: number;
  subscribersGained: number;
  averageCtr: number;
  averageEngagementRate: number;
  dailyMetrics: AnalyticsMetricPoint[];
  topVideos: VideoPerformance[];
}

export type ToolType = 
  | 'title_generator'
  | 'description_generator'
  | 'hashtag_generator'
  | 'viral_hashtags'
  | 'daily_video_generator'
  | 'similar_content'
  | 'thumbnail_analyzer'
  | 'background_remover'
  | 'reel_hook'
  | 'reel_caption';

export interface ChapterItem {
  timestamp: string;
  title: string;
}

export interface DescriptionResult {
  title: string;
  description: string;
  cta: string;
  keywords: string[];
  chapters?: ChapterItem[];
}

export interface HashtagGroupsResult {
  youtubeHashtags: string[];
  instagramHashtags: string[];
  shortsHashtags: string[];
  reelsHashtags: string[];
}

export interface DailyVideoIdea {
  id: string;
  videoIdea: string;
  title: string;
  hook: string;
  description: string;
  contentAngle: string;
  tags: string[];
  hashtags: string[];
  cta: string;
}

export interface SimilarContentVariation {
  title: string;
  hook: string;
  angle: string;
  description: string;
  hashtags: string[];
  cta: string;
}

export interface SimilarContentResult {
  variation1: SimilarContentVariation;
  variation2: SimilarContentVariation;
}

export interface ThumbnailAnalysisResult {
  id: string;
  imageUrl: string;
  overallScore: number; // 0-100
  categories: {
    visualAttention: number;
    subjectFocus: number;
    textReadability: number;
    mobileReadability: number;
    contrast: number;
    composition: number;
    curiosity: number;
    emotionalImpact: number;
    clarity: number;
    topicRelevance: number;
    visualHierarchy: number;
  };
  whyThisScore: string[];
  improvementSuggestions: string[];
  analyzedAt: string;
}

export interface ContentHistoryRecord {
  id: string;
  userId: string;
  toolType: ToolType;
  toolName: string;
  input: Record<string, any>;
  output: any;
  platform: PlatformType;
  createdAt: string;
  isFavorite?: boolean;
  projectId?: string;
}

export interface ProjectItem {
  id: string;
  projectId: string;
  title: string;
  type: ToolType;
  data: any;
  createdAt: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description?: string;
  itemCount: number;
  items: ProjectItem[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
