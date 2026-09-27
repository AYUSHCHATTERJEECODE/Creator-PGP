'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Sparkles,
  Image as ImageIcon,
  Wand2,
  History,
  FolderKanban,
  Settings,
  User,
  Zap,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Youtube, Instagram } from '@/components/BrandIcons';
import { BRAND, NAVIGATION_ITEMS } from '@/config/constants';
import { UserProfile } from '@/types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  user: UserProfile;
  onUpgradeClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Image: <ImageIcon className="w-4 h-4" />,
  Youtube: <Youtube className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  Wand2: <Wand2 className="w-4 h-4" />,
  History: <History className="w-4 h-4" />,
  FolderKanban: <FolderKanban className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  User: <User className="w-4 h-4" />,
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onUpgradeClick,
}) => {
  const quotaPercent = Math.min(100, Math.round((user.creditsRemaining / user.monthlyQuota) * 100));

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#080c18] border-r border-slate-800/80 z-30 select-none">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 px-5 py-4 border-b border-slate-800/80">
        <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-base tracking-tight text-white">{BRAND.name}</span>
            <span className="px-1.5 py-0.2 bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-black uppercase tracking-wider rounded text-white shadow-xs">
              AI
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]">
            Creator Suite & Intelligence
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
          Studio Navigation
        </div>

        {NAVIGATION_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                  } transition`}
                >
                  {iconMap[item.icon]}
                </span>
                <span>{item.label}</span>
              </div>

              {'badge' in item && item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Plan Credits & Quota Card */}
      <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              {user.plan} Plan
            </span>
          </div>
          <span className="text-xs font-bold text-cyan-400">
            {user.creditsRemaining} / {user.monthlyQuota}
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${quotaPercent}%` }}
          />
        </div>

        <button
          onClick={onUpgradeClick}
          className="w-full py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-blue-600 hover:to-blue-500 text-white text-[11px] font-bold tracking-wide transition shadow-sm"
        >
          Upgrade Capacity
        </button>
      </div>

      {/* User Footnote */}
      <div className="px-4 py-3 border-t border-slate-800/80 flex items-center justify-between">
        <div
          onClick={() => onSelectTab('account')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700 group-hover:border-cyan-400 transition">
            <Image src={user.avatar || '/logo.png'} alt={user.name} fill className="object-cover" />
          </div>
          <div className="truncate text-left max-w-[120px]">
            <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition truncate">
              {user.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{user.niche}</p>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('settings')}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
