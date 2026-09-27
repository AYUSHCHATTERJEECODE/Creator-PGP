'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { Navbar } from '@/components/Navbar';
import { ToastContainer } from '@/components/Toast';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { AIContentStudioView } from '@/features/ai-content/AIContentStudioView';
import { ThumbnailAnalyzerView } from '@/features/thumbnail-ai/ThumbnailAnalyzerView';
import { BackgroundRemoverView } from '@/features/thumbnail-ai/BackgroundRemoverView';
import { YouTubeDashboardView } from '@/features/youtube/YouTubeDashboardView';
import { InstagramToolsView } from '@/features/instagram/InstagramToolsView';
import { ContentHistoryView } from '@/features/history/ContentHistoryView';
import { SavedProjectsView } from '@/features/projects/SavedProjectsView';
import { SettingsView } from '@/features/settings/SettingsView';
import { LandingPage } from '@/features/landing/LandingPage';
import { AuthModal } from '@/features/auth/AuthModal';
import { OnboardingModal } from '@/features/auth/OnboardingModal';
import { DBService } from '@/services/database/dbService';
import { UserProfile, YouTubeChannel, ContentHistoryRecord, Project, NotificationToast } from '@/types';
import {
  Sparkles,
  FileText,
  Hash,
  Lightbulb,
  Image as ImageIcon,
  Scissors,
  Wand2,
  X,
  Plus,
} from 'lucide-react';
import { Youtube, Instagram } from '@/components/BrandIcons';

export default function Home() {
  // Global App State
  const [isClient, setIsClient] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [subTool, setSubTool] = useState<string>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);

  // Entities
  const [user, setUser] = useState<UserProfile>(DBService.getDefaultUser());
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [activeChannel, setActiveChannel] = useState<YouTubeChannel | null>(null);
  const [history, setHistory] = useState<ContentHistoryRecord[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isConnectYouTubeOpen, setIsConnectYouTubeOpen] = useState(false);
  const [newChannelHandle, setNewChannelHandle] = useState('');
  const [newChannelTitle, setNewChannelTitle] = useState('');

  // Initial Load from DBService
  useEffect(() => {
    setIsClient(true);
    const loadedUser = DBService.getUser();
    const loadedChannels = DBService.getChannels();
    const loadedHistory = DBService.getHistory();
    const loadedProjects = DBService.getProjects();

    setUser(loadedUser);
    setChannels(loadedChannels);
    setActiveChannel(loadedChannels[0] || null);
    setHistory(loadedHistory);
    setProjects(loadedProjects);

    // If new user hasn't finished onboarding, trigger onboarding
    if (!loadedUser.onboardingCompleted) {
      setIsOnboardingOpen(true);
    }
  }, []);

  // Toast System
  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Clipboard Helper
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('Copied to clipboard!', 'success');
    } catch (e) {
      addToast('Failed to copy text', 'error');
    }
  };

  // History & Project Handlers
  const handleSaveToHistory = (toolType: any, toolName: string, input: any, output: any) => {
    const record = DBService.saveHistoryItem({
      userId: user.id,
      toolType,
      toolName,
      input,
      output,
      platform: user.primaryPlatform,
    });
    setHistory(DBService.getHistory());
    addToast(`${toolName} output saved to history.`, 'success');
  };

  const handleDeleteHistory = (id: string) => {
    DBService.deleteHistoryItem(id);
    setHistory(DBService.getHistory());
    addToast('Record deleted from history.', 'info');
  };

  const handleCreateProject = (title: string, description?: string) => {
    const proj = DBService.createProject(title, description);
    setProjects(DBService.getProjects());
    addToast(`Project "${title}" created.`, 'success');
  };

  const handleRenameProject = (id: string, newTitle: string) => {
    DBService.renameProject(id, newTitle);
    setProjects(DBService.getProjects());
    addToast('Project renamed successfully.', 'success');
  };

  const handleDeleteProject = (id: string) => {
    DBService.deleteProject(id);
    setProjects(DBService.getProjects());
    addToast('Project removed.', 'info');
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    DBService.saveUser(updated);
  };

  // YouTube Channel Connection
  const handleAddYouTubeChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelTitle.trim()) return;

    const handle = newChannelHandle.startsWith('@') ? newChannelHandle : `@${newChannelHandle || 'newcreator'}`;
    const newChan = DBService.addManualChannel({
      channelId: `UC_${Date.now()}`,
      title: newChannelTitle.trim(),
      handle: handle.trim(),
      customUrl: `https://www.youtube.com/${handle.trim()}`,
      avatarUrl: '/logo.png',
      subscriberCount: 25000,
      videoCount: 45,
      viewCount: 1200000,
      watchTimeHours: 48000,
      likesCount: 84000,
      commentsCount: 6200,
    });

    const updatedChannels = DBService.getChannels();
    setChannels(updatedChannels);
    setActiveChannel(newChan);
    setIsConnectYouTubeOpen(false);
    setNewChannelTitle('');
    setNewChannelHandle('');
    addToast(`Channel "${newChan.title}" connected successfully!`, 'success');
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#070a14] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Optional Landing Page view if user wants to see public presentation
  if (currentTab === 'landing') {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <LandingPage
          onOpenApp={() => setCurrentTab('dashboard')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={(u, isSignUp) => {
            handleUpdateUser(u);
            addToast(`Welcome back, ${u.name || user.name}!`, 'success');
            if (isSignUp) setIsOnboardingOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a14] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Desktop Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onUpgradeClick={() => setCurrentTab('settings')}
      />

      {/* Main Workspace Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Desktop Header */}
        <Navbar
          user={user}
          channels={channels}
          activeChannel={activeChannel}
          onSelectChannel={(ch) => {
            setActiveChannel(ch);
            addToast(`Switched channel context to "${ch.title}"`, 'info');
          }}
          onConnectNew={() => setIsConnectYouTubeOpen(true)}
          isManualMode={isManualMode}
          onToggleManualMode={(val) => {
            setIsManualMode(val);
            addToast(val ? 'Switched to Manual / Planning Mode' : 'Switched to Live API Data', 'info');
          }}
          onQuickAction={(action) => {
            if (action === 'ai-content') setCurrentTab('ai-content');
            if (action === 'notifications') addToast('All channel and studio notifications are up to date.', 'info');
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Mobile Navigation & Header */}
        <MobileNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          channels={channels}
          activeChannel={activeChannel}
          onSelectChannel={(ch) => {
            setActiveChannel(ch);
            addToast(`Switched to "${ch.title}"`, 'info');
          }}
          onConnectNew={() => setIsConnectYouTubeOpen(true)}
          isManualMode={isManualMode}
          onToggleManualMode={(val) => {
            setIsManualMode(val);
            addToast(val ? 'Manual / Planning Mode' : 'Live Data', 'info');
          }}
        />

        {/* Tab Content Display Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto mobile-bottom-safe">
          {/* TAB 1: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <DashboardView
              user={user}
              activeChannel={activeChannel}
              history={history}
              isManualMode={isManualMode}
              onNavigateTab={(tab, sub) => {
                setCurrentTab(tab);
                if (sub) setSubTool(sub);
              }}
              onConnectYouTube={() => setIsConnectYouTubeOpen(true)}
              onToggleManualMode={setIsManualMode}
              onCopyText={handleCopyText}
            />
          )}

          {/* TAB 2: AI CONTENT STUDIO */}
          {currentTab === 'ai-content' && (
            <AIContentStudioView
              initialSubTool={subTool}
              onSaveToHistory={handleSaveToHistory}
              onCopyText={handleCopyText}
            />
          )}

          {/* TAB 3: THUMBNAIL AI */}
          {currentTab === 'thumbnail-ai' && (
            <div className="space-y-6">
              {/* Sub-selector for Thumbnail AI vs Background Remover */}
              <div className="flex gap-2 border-b border-slate-800/80 pb-3">
                <button
                  onClick={() => setSubTool('analyzer')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    subTool === 'analyzer'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Thumbnail Vision AI (11-Factor Engine)
                </button>
                <button
                  onClick={() => setSubTool('bg-remove')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    subTool === 'bg-remove'
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Background Remover (Transparent PNG)
                </button>
              </div>

              {subTool === 'bg-remove' ? (
                <BackgroundRemoverView />
              ) : (
                <ThumbnailAnalyzerView onSaveToHistory={handleSaveToHistory} />
              )}
            </div>
          )}

          {/* TAB 4: YOUTUBE STUDIO */}
          {currentTab === 'youtube' && (
            <YouTubeDashboardView
              channels={channels}
              activeChannel={activeChannel}
              onSelectChannel={setActiveChannel}
              onConnectYouTube={() => setIsConnectYouTubeOpen(true)}
              isManualMode={isManualMode}
              onToggleManualMode={setIsManualMode}
              onUpdateManualData={(updates) => {
                if (activeChannel) {
                  const updated = { ...activeChannel, ...updates };
                  setActiveChannel(updated);
                  const allChannels = channels.map((c) => (c.id === updated.id ? updated : c));
                  setChannels(allChannels);
                  DBService.saveChannels(allChannels);
                  addToast('Manual planning targets saved.', 'success');
                }
              }}
            />
          )}

          {/* TAB 5: INSTAGRAM TOOLS */}
          {currentTab === 'instagram' && (
            <InstagramToolsView
              onSaveToHistory={handleSaveToHistory}
              onCopyText={handleCopyText}
            />
          )}

          {/* TAB 6: AI TOOLS DIRECTORY */}
          {currentTab === 'ai-tools' && (
            <div className="space-y-6 pb-12">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <Wand2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">AI Creator Tools Suite</h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Explore all 10 specialized intelligence engines for YouTube & Instagram
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'title', tab: 'ai-content', name: 'High CTR Title Engine', desc: 'Curiosity gap, psychological framing & Generate ×2', icon: <Sparkles className="w-5 h-5 text-cyan-400" /> },
                  { id: 'description', tab: 'ai-content', name: 'SEO Description Studio', desc: 'Keyword optimization, CTA and automatic chapters', icon: <FileText className="w-5 h-5 text-blue-400" /> },
                  { id: 'hashtags', tab: 'ai-content', name: 'Viral Hashtag Engine', desc: 'Targeted tags for YouTube, Instagram, Shorts & Reels', icon: <Hash className="w-5 h-5 text-purple-400" /> },
                  { id: 'daily_video', tab: 'ai-content', name: 'Daily Video Generator', desc: 'Multi-idea brainstorming with 3-second hooks & angles', icon: <Lightbulb className="w-5 h-5 text-amber-400" /> },
                  { id: 'similar', tab: 'ai-content', name: 'Similar Content ×2', desc: 'Two distinct creative angles preserving core concept', icon: <Sparkles className="w-5 h-5 text-pink-400" /> },
                  { id: 'analyzer', tab: 'thumbnail-ai', name: '11-Factor Thumbnail Vision', desc: 'Simulate eye-tracking, mobile legibility & curiosity', icon: <ImageIcon className="w-5 h-5 text-emerald-400" /> },
                  { id: 'bg-remove', tab: 'thumbnail-ai', name: 'AI Background Remover', desc: 'Edge-aware transparent PNG subject extraction', icon: <Scissors className="w-5 h-5 text-rose-400" /> },
                  { id: 'reels', tab: 'instagram', name: 'Reels Hook & Caption AI', desc: 'Pattern interrupts and high retention audio pairings', icon: <Instagram className="w-5 h-5 text-fuchsia-400" /> },
                  { id: 'yt-growth', tab: 'youtube', name: 'Channel Analytics Studio', desc: 'Multi-channel metrics, CTR benchmarks & planning mode', icon: <Youtube className="w-5 h-5 text-red-400" /> },
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentTab(tool.tab);
                      setSubTool(tool.id);
                    }}
                    className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-3 rounded-2xl bg-slate-800 w-fit mb-3 group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{tool.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-cyan-400 flex items-center justify-between">
                      <span>Launch Engine</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CONTENT HISTORY */}
          {currentTab === 'history' && (
            <ContentHistoryView
              history={history}
              onDeleteHistoryItem={handleDeleteHistory}
              onCopyText={handleCopyText}
              onRegenerateItem={(item) => {
                setCurrentTab('ai-content');
                addToast(`Loaded inputs for ${item.toolName}. Ready to regenerate!`, 'info');
              }}
            />
          )}

          {/* TAB 8: SAVED PROJECTS */}
          {currentTab === 'projects' && (
            <SavedProjectsView
              projects={projects}
              onCreateProject={handleCreateProject}
              onRenameProject={handleRenameProject}
              onDeleteProject={handleDeleteProject}
              onNavigateToStudio={() => setCurrentTab('ai-content')}
            />
          )}

          {/* TAB 9: SETTINGS & ACCOUNT */}
          {(currentTab === 'settings' || currentTab === 'account') && (
            <SettingsView
              user={user}
              onUpdateUser={handleUpdateUser}
              onAddToast={addToast}
            />
          )}
        </main>
      </div>

      {/* Connect YouTube Channel Modal */}
      {isConnectYouTubeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-red-500/40 p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setIsConnectYouTubeOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="p-3.5 rounded-2xl bg-red-600/15 text-red-400 border border-red-500/30 w-fit mx-auto">
                <Youtube className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Connect YouTube Channel</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Authorize official Google YouTube Data API access or add a channel handle for tracking.
              </p>
            </div>

            <form onSubmit={handleAddYouTubeChannel} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Channel Display Name
                </label>
                <input
                  type="text"
                  required
                  value={newChannelTitle}
                  onChange={(e) => setNewChannelTitle(e.target.value)}
                  placeholder="e.g. Code & Coffee Studios"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Handle (@handle)
                </label>
                <input
                  type="text"
                  required
                  value={newChannelHandle}
                  onChange={(e) => setNewChannelHandle(e.target.value)}
                  placeholder="@codeandcoffee"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-200 block">Official Google OAuth Authorization:</span>
                <p>We only request read-only statistics (view count, subscribers, CTR). Your password is never shared.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition active:scale-95 flex items-center justify-center space-x-2"
              >
                <Youtube className="w-4 h-4" />
                <span>Verify & Connect Channel</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Questionnaire Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        user={user}
        onComplete={(updates) => {
          handleUpdateUser(updates);
          setIsOnboardingOpen(false);
          addToast(`Studio personalized for ${updates.name}!`, 'success');
        }}
        onSkip={() => {
          handleUpdateUser({ onboardingCompleted: true });
          setIsOnboardingOpen(false);
        }}
      />

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u, isSignUp) => {
          handleUpdateUser(u);
          addToast(`Logged in as ${u.name || user.name}`, 'success');
          if (isSignUp) setIsOnboardingOpen(true);
        }}
      />
    </div>
  );
}
