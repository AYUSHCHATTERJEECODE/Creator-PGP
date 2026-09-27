'use client';

import React from 'react';
import { Search, Bell, Sparkles, Plus, ExternalLink } from 'lucide-react';
import { UserProfile, YouTubeChannel } from '@/types';
import { ChannelSwitcher } from './ChannelSwitcher';

interface NavbarProps {
  user: UserProfile;
  channels: YouTubeChannel[];
  activeChannel: YouTubeChannel | null;
  onSelectChannel: (channel: YouTubeChannel) => void;
  onConnectNew: () => void;
  isManualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
  onQuickAction: (action: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  channels,
  activeChannel,
  onSelectChannel,
  onConnectNew,
  isManualMode,
  onToggleManualMode,
  onQuickAction,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="hidden lg:flex items-center justify-between h-16 px-6 bg-[#080c18]/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-20">
      {/* Global Search Bar */}
      <div className="relative w-80 max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tools, titles, history, projects..."
          className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition"
        />
      </div>

      {/* Right Actions & Channel Switcher */}
      <div className="flex items-center space-x-3">
        {/* Channel Switcher */}
        <ChannelSwitcher
          channels={channels}
          activeChannel={activeChannel}
          onSelectChannel={onSelectChannel}
          onConnectNew={onConnectNew}
          isManualMode={isManualMode}
          onToggleManualMode={onToggleManualMode}
        />

        {/* Quick Generation CTA */}
        <button
          onClick={() => onQuickAction('ai-content')}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/10 transition active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Content</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => onQuickAction('notifications')}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
};
