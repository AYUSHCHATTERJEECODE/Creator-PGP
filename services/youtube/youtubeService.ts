import { YouTubeChannel, YouTubeAnalyticsData, VideoPerformance } from '@/types';

export class YouTubeService {
  /**
   * Generates Google OAuth 2.0 authorization URL for YouTube Data API v3
   */
  static getOAuthUrl(redirectUri?: string): string {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1048291048-mock-client-id.apps.googleusercontent.com';
    const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
    const redirect = encodeURIComponent(
      redirectUri || (typeof window !== 'undefined' ? `${window.location.origin}/api/youtube/oauth-callback` : 'http://localhost:3000/api/youtube/oauth-callback')
    );
    const state = encodeURIComponent(`creator-pgp-${Date.now()}`);

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;
  }

  /**
   * Default sample/initial channels for demonstration & manual planning mode
   */
  static getInitialChannels(): YouTubeChannel[] {
    return [
      {
        id: 'chan-1',
        channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        title: 'Creator PGP Official',
        handle: '@creatorpgp',
        customUrl: 'https://www.youtube.com/@creatorpgp',
        avatarUrl: '/logo.png',
        subscriberCount: 48200,
        videoCount: 142,
        viewCount: 3840000,
        watchTimeHours: 194200,
        likesCount: 284000,
        commentsCount: 18900,
        isConnected: true,
        isManual: false,
        connectedAt: '2026-08-15T10:00:00Z',
      },
      {
        id: 'chan-2',
        channelId: 'UC_demo_tech_channel_id',
        title: 'PGP Studio Shorts',
        handle: '@pgpstudioshorts',
        customUrl: 'https://www.youtube.com/@pgpstudioshorts',
        avatarUrl: '/logo.png',
        subscriberCount: 12500,
        videoCount: 89,
        viewCount: 920000,
        watchTimeHours: 24300,
        likesCount: 96000,
        commentsCount: 4300,
        isConnected: true,
        isManual: false,
        connectedAt: '2026-09-01T12:00:00Z',
      },
    ];
  }

  /**
   * Channel Analytics Data generator / fetcher
   */
  static getAnalytics(
    channelId: string,
    timeframe: '7d' | '28d' | '90d' | 'custom' = '28d',
    isManual: boolean = false
  ): YouTubeAnalyticsData {
    const days = timeframe === '7d' ? 7 : timeframe === '28d' ? 28 : 90;
    const dailyMetrics = [];
    const now = new Date();

    let totalViews = 0;
    let totalWatchTimeHours = 0;
    let subscribersGained = 0;

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      // Realistic variation
      const baseV = isManual ? 1800 : 4200;
      const factor = 1 + 0.3 * Math.sin(i / 3) + (Math.random() * 0.2 - 0.1);
      const dayViews = Math.round(baseV * factor);
      const dayWatch = Math.round((dayViews * 3.8) / 60);
      const daySubs = Math.round(dayViews * 0.012);

      totalViews += dayViews;
      totalWatchTimeHours += dayWatch;
      subscribersGained += daySubs;

      dailyMetrics.push({
        date: dateStr,
        views: dayViews,
        watchTimeHours: dayWatch,
        subscribers: daySubs,
        ctr: Number((6.8 + Math.sin(i) * 1.2).toFixed(1)),
      });
    }

    const topVideos: VideoPerformance[] = [
      {
        id: 'vid-101',
        title: 'How I Grew from 0 to 100K Subscribers with AI Systems',
        thumbnail: '/logo.png',
        publishedAt: '3 days ago',
        views: 84200,
        likes: 6420,
        comments: 489,
        ctr: 9.4,
        watchTimeHours: 5800,
      },
      {
        id: 'vid-102',
        title: '5 YouTube Thumbnail Mistakes Killing Your Views in 2026',
        thumbnail: '/logo.png',
        publishedAt: '8 days ago',
        views: 61500,
        likes: 4120,
        comments: 312,
        ctr: 8.8,
        watchTimeHours: 3900,
      },
      {
        id: 'vid-103',
        title: 'YouTube Algorithm Shift: What Retention Metrics Actually Matter',
        thumbnail: '/logo.png',
        publishedAt: '16 days ago',
        views: 47800,
        likes: 3890,
        comments: 290,
        ctr: 7.9,
        watchTimeHours: 3100,
      },
      {
        id: 'vid-104',
        title: 'The Viral Hook Blueprint For YouTube Shorts & Reels',
        thumbnail: '/logo.png',
        publishedAt: '24 days ago',
        views: 128000,
        likes: 11200,
        comments: 870,
        ctr: 11.2,
        watchTimeHours: 2400,
      },
    ];

    return {
      timeframe,
      isManualData: isManual,
      totalViews,
      totalWatchTimeHours,
      subscribersGained,
      averageCtr: 8.4,
      averageEngagementRate: 6.2,
      dailyMetrics,
      topVideos,
    };
  }
}
