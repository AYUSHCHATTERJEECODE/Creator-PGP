'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Sparkles,
  Image as ImageIcon,
  Menu,
  X,
  History,
  FolderKanban,
  Settings,
  User,
  Wand2,
  Zap,
} from 'lucide-react';
import { Youtube, Instagram } from './BrandIcons';
import { BRAND, NAVIGATION_ITEMS } from '@/config/constants';
import { UserProfile, YouTubeChannel } from '@/types';
import { ChannelSwitcher } from './ChannelSwitcher';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  user: UserProfile;
  channels: YouTubeChannel[];
  activeChannel: YouTubeChannel | null;
  onSelectChannel: (channel: YouTubeChannel) => void;
  onConnectNew: () => void;
  isManualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  user,
  channels,
  activeChannel,
  onSelectChannel,
  onConnectNew,
  isManualMode,
  onToggleManualMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bottomItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'ai-content', label: 'AI Content', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'thumbnail-ai', label: 'Thumbnails', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[#080c18]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40">
            <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" priority />
          </div>
          <span className="font-bold text-base text-white tracking-tight">{BRAND.name}</span>
        </div>

        <div className="flex items-center space-x-2">
          <ChannelSwitcher
            channels={channels}
            activeChannel={activeChannel}
            onSelectChannel={onSelectChannel}
            onConnectNew={onConnectNew}
            isManualMode={isManualMode}
            onToggleManualMode={onToggleManualMode}
          />
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open full menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080c18]/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        {bottomItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] min-h-[48px] rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? 'bg-cyan-500/15 border border-cyan-500/30' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Tab */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] min-h-[48px] rounded-xl transition-all ${
            drawerOpen ? 'text-purple-400 scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="p-1 rounded-lg">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">More</span>
        </button>
      </nav>

      {/* Slide-over Full Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[#090e1c] border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-cyan-500/40">
                  <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
                </div>
                <span className="font-bold text-sm text-white">{BRAND.name} Menu</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
                All Creator Tools
              </div>

              {NAVIGATION_ITEMS.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {'badge' in item && item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quota & User Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Monthly Credits</span>
                <span className="font-bold text-cyan-400">
                  {user.creditsRemaining} / {user.monthlyQuota}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (user.creditsRemaining / user.monthlyQuota) * 100
                    )}%`,
                  }}
                />
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                  <Image src={user.avatar || '/logo.png'} alt={user.name} fill className="object-cover" />
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
