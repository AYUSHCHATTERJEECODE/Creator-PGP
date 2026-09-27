import {
  UserProfile,
  ContentHistoryRecord,
  Project,
  ProjectItem,
  YouTubeChannel,
} from '@/types';
import { YouTubeService } from '../youtube/youtubeService';

const STORAGE_KEYS = {
  USER: 'creator_pgp_user',
  HISTORY: 'creator_pgp_history',
  PROJECTS: 'creator_pgp_projects',
  CHANNELS: 'creator_pgp_channels',
  SETTINGS: 'creator_pgp_settings',
};

export class DBService {
  /**
   * Get Current User Profile
   */
  static getUser(): UserProfile {
    if (typeof window === 'undefined') {
      return this.getDefaultUser();
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to read user from storage', e);
    }
    const defaultUser = this.getDefaultUser();
    this.saveUser(defaultUser);
    return defaultUser;
  }

  static getDefaultUser(): UserProfile {
    return {
      id: 'usr-creator-1',
      email: 'creator@creatorpgp.io',
      name: 'Alex Rivera',
      avatar: '/logo.png',
      primaryPlatform: 'both',
      niche: 'Tech & AI',
      contentType: 'Tutorials & Deep Dives',
      plan: 'pro',
      creditsRemaining: 840,
      monthlyQuota: 1000,
      createdAt: '2026-08-01T00:00:00Z',
      onboardingCompleted: true,
    };
  }

  static saveUser(user: UserProfile): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }

  /**
   * History Records
   */
  static getHistory(): ContentHistoryRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load history', e);
    }
    // Return sample seeded records if empty
    const seed = this.getSeedHistory();
    this.saveAllHistory(seed);
    return seed;
  }

  static saveHistoryItem(item: Omit<ContentHistoryRecord, 'id' | 'createdAt'>): ContentHistoryRecord {
    const newItem: ContentHistoryRecord = {
      ...item,
      id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    const current = this.getHistory();
    const updated = [newItem, ...current];
    this.saveAllHistory(updated);
    return newItem;
  }

  static deleteHistoryItem(id: string): void {
    const current = this.getHistory();
    const updated = current.filter((item) => item.id !== id);
    this.saveAllHistory(updated);
  }

  static updateHistoryItem(id: string, updates: Partial<ContentHistoryRecord>): void {
    const current = this.getHistory();
    const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
    this.saveAllHistory(updated);
  }

  private static saveAllHistory(items: ContentHistoryRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }

  /**
   * Saved Projects
   */
  static getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load projects', e);
    }
    const seed = this.getSeedProjects();
    this.saveAllProjects(seed);
    return seed;
  }

  static createProject(title: string, description?: string): Project {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      userId: 'usr-creator-1',
      title: title.trim(),
      description: description?.trim() || '',
      itemCount: 0,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const current = this.getProjects();
    const updated = [newProj, ...current];
    this.saveAllProjects(updated);
    return newProj;
  }

  static addItemToProject(projectId: string, itemData: Omit<ProjectItem, 'id' | 'projectId' | 'createdAt'>): Project | null {
    const projects = this.getProjects();
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return null;

    const newItem: ProjectItem = {
      ...itemData,
      id: `pitem-${Date.now()}`,
      projectId,
      createdAt: new Date().toISOString(),
    };

    proj.items.push(newItem);
    proj.itemCount = proj.items.length;
    proj.updatedAt = new Date().toISOString();

    this.saveAllProjects(projects);
    return proj;
  }

  static deleteProject(projectId: string): void {
    const projects = this.getProjects();
    const updated = projects.filter((p) => p.id !== projectId);
    this.saveAllProjects(updated);
  }

  static renameProject(projectId: string, newTitle: string): void {
    const projects = this.getProjects();
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      proj.title = newTitle.trim();
      proj.updatedAt = new Date().toISOString();
      this.saveAllProjects(projects);
    }
  }

  private static saveAllProjects(projects: Project[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects', e);
    }
  }

  /**
   * Channels Store
   */
  static getChannels(): YouTubeChannel[] {
    if (typeof window === 'undefined') return YouTubeService.getInitialChannels();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHANNELS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const initial = YouTubeService.getInitialChannels();
    this.saveChannels(initial);
    return initial;
  }

  static saveChannels(channels: YouTubeChannel[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    } catch (e) {}
  }

  static addManualChannel(channel: Omit<YouTubeChannel, 'id' | 'isConnected' | 'isManual'>): YouTubeChannel {
    const newChan: YouTubeChannel = {
      ...channel,
      id: `chan-manual-${Date.now()}`,
      isConnected: true,
      isManual: true,
      connectedAt: new Date().toISOString(),
    };
    const current = this.getChannels();
    const updated = [...current, newChan];
    this.saveChannels(updated);
    return newChan;
  }

  /**
   * Seed Mock Records for Initial Demo
   */
  private static getSeedHistory(): ContentHistoryRecord[] {
    return [
      {
        id: 'hist-1',
        userId: 'usr-creator-1',
        toolType: 'title_generator',
        toolName: 'High CTR Title Engine',
        platform: 'youtube',
        createdAt: '2026-09-26T14:30:00Z',
        input: { topic: 'Artificial Intelligence Tools in 2026', niche: 'Tech & AI' },
        output: {
          titles: [
            { title: 'The Untold Truth About AI in 2026 (Do Not Make This Mistake)', angle: 'Curiosity & Warning', estimatedCtrScore: 94 },
            { title: 'Stop Using AI Like Everyone Else in 2026', angle: 'Contrarian', estimatedCtrScore: 91 },
          ],
        },
      },
      {
        id: 'hist-2',
        userId: 'usr-creator-1',
        toolType: 'description_generator',
        toolName: 'SEO Description Studio',
        platform: 'youtube',
        createdAt: '2026-09-25T11:20:00Z',
        input: { topic: 'How to scale a YouTube channel', niche: 'Business' },
        output: {
          title: 'The Real Math of Growing a 100K YouTube Channel',
          description: 'In this video, we break down the exact mathematics of retention, click-through rate, and thumbnail psychology.',
          cta: '👉 Subscribe for new weekly creator breakdowns!',
          keywords: ['youtube growth', 'retention formula', 'ctr tips', 'creator pgp'],
        },
      },
      {
        id: 'hist-3',
        userId: 'usr-creator-1',
        toolType: 'viral_hashtags',
        toolName: 'Viral Hashtag Engine',
        platform: 'both',
        createdAt: '2026-09-24T09:15:00Z',
        input: { topic: 'Productivity for Creators', niche: 'Lifestyle' },
        output: {
          youtubeHashtags: ['#ProductivityTips', '#CreatorWorkflow', '#CreatorPGP'],
          instagramHashtags: ['#ProductivityHacks', '#DeepWork', '#FocusMode', '#CreatorLife'],
          shortsHashtags: ['#Shorts', '#Productivity'],
          reelsHashtags: ['#ReelsDaily', '#Habits'],
        },
      },
    ];
  }

  private static getSeedProjects(): Project[] {
    return [
      {
        id: 'proj-1',
        userId: 'usr-creator-1',
        title: 'Q4 AI Tech Series',
        description: 'Multi-part breakdown of AI tools for creators and entrepreneurs.',
        itemCount: 3,
        createdAt: '2026-09-20T10:00:00Z',
        updatedAt: '2026-09-26T15:00:00Z',
        items: [
          {
            id: 'item-101',
            projectId: 'proj-1',
            title: 'Episode 1: The AI Creator Stack',
            type: 'title_generator',
            data: { title: 'How We Built a Full Creator Stack with AI' },
            createdAt: '2026-09-20T10:05:00Z',
          },
          {
            id: 'item-102',
            projectId: 'proj-1',
            title: 'Ep 1 Description & Timestamps',
            type: 'description_generator',
            data: { cta: 'Subscribe to Creator PGP!' },
            createdAt: '2026-09-21T11:00:00Z',
          },
        ],
      },
      {
        id: 'proj-2',
        userId: 'usr-creator-1',
        title: 'Shorts & Reels Viral Sprint',
        description: 'Daily short-form video ideas, hooks, and retention scripts.',
        itemCount: 1,
        createdAt: '2026-09-22T08:00:00Z',
        updatedAt: '2026-09-24T12:00:00Z',
        items: [
          {
            id: 'item-201',
            projectId: 'proj-2',
            title: '3 Hooks for 30s Explainer',
            type: 'reel_hook',
            data: { hook: 'Stop scrolling if you want to double your reach...' },
            createdAt: '2026-09-22T08:15:00Z',
          },
        ],
      },
    ];
  }
}
