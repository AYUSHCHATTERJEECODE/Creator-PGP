'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  FileText,
  Hash,
  Lightbulb,
  Image as ImageIcon,
  Scissors,
  TrendingUp,
  Eye,
  Users,
  Clock,
  ThumbsUp,
  ExternalLink,
  ArrowUpRight,
  Copy,
  Check,
  Zap,
  Sliders,
} from 'lucide-react';
import { Youtube } from '@/components/BrandIcons';
import { BRAND } from '@/config/constants';
import { UserProfile, YouTubeChannel, ContentHistoryRecord } from '@/types';

interface DashboardViewProps {
  user: UserProfile;
  activeChannel: YouTubeChannel | null;
  history: ContentHistoryRecord[];
  isManualMode: boolean;
  onNavigateTab: (tabId: string, subTool?: string) => void;
  onConnectYouTube: () => void;
  onToggleManualMode: (enabled: boolean) => void;
  onCopyText: (text: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  activeChannel,
  history,
  isManualMode,
  onNavigateTab,
  onConnectYouTube,
  onToggleManualMode,
  onCopyText,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    onCopyText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickActions = [
    {
      id: 'title',
      label: 'Generate Title',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      color: 'hover:border-cyan-500/50',
      action: () => onNavigateTab('ai-content', 'title'),
    },
    {
      id: 'desc',
      label: 'Generate Description',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      color: 'hover:border-blue-500/50',
      action: () => onNavigateTab('ai-content', 'description'),
    },
    {
      id: 'tags',
      label: 'Generate Hashtags',
      icon: <Hash className="w-4 h-4 text-purple-400" />,
      color: 'hover:border-purple-500/50',
      action: () => onNavigateTab('ai-content', 'hashtags'),
    },
    {
      id: 'idea',
      label: 'Daily Video Idea',
      icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
      color: 'hover:border-amber-500/50',
      action: () => onNavigateTab('ai-content', 'daily_video'),
    },
    {
      id: 'thumb',
      label: 'Analyze Thumbnail',
      icon: <ImageIcon className="w-4 h-4 text-emerald-400" />,
      color: 'hover:border-emerald-500/50',
      action: () => onNavigateTab('thumbnail-ai', 'analyzer'),
    },
    {
      id: 'bg-remove',
      label: 'Remove Background',
      icon: <Scissors className="w-4 h-4 text-pink-400" />,
      color: 'hover:border-pink-500/50',
      action: () => onNavigateTab('thumbnail-ai', 'bg-remove'),
    },
    {
      id: 'yt-connect',
      label: 'Connect YouTube',
      icon: <Youtube className="w-4 h-4 text-red-400" />,
      color: 'hover:border-red-500/50',
      action: onConnectYouTube,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#0e162a] to-[#121c38] border border-slate-700/60 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-radial from-cyan-500 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 shrink-0">
              <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" priority />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome back, {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                  {BRAND.name} Studio
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Ready to accelerate your content pipeline? Generate high-CTR titles, analyze your thumbnails, or optimize descriptions in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigateTab('ai-content')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open AI Studio</span>
            </button>
            <button
              onClick={() => onNavigateTab('thumbnail-ai')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition flex items-center space-x-2 active:scale-95"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Test Thumbnail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Quick Actions
          </h2>
          <span className="text-xs text-slate-500">Tap to launch any workflow</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 ${action.color} text-left transition flex flex-col justify-between group active:scale-95 shadow-sm hover:shadow-md`}
            >
              <div className="p-2 rounded-xl bg-slate-800/60 w-fit mb-2 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition line-clamp-1">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Creator Overview / YouTube Channel Metrics */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
              <Image
                src={activeChannel?.avatarUrl || '/logo.png'}
                alt={activeChannel?.title || 'Channel'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <a
                  href={activeChannel?.customUrl || 'https://youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-base text-slate-100 hover:text-cyan-400 transition flex items-center space-x-1.5"
                >
                  <span>{activeChannel?.title || 'No Channel Connected'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                {activeChannel?.isConnected && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                    Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {activeChannel?.handle || '@notconnected'} • {activeChannel?.videoCount || 0} Videos Published
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Indicator Tag */}
            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border ${
                isManualMode
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isManualMode ? 'Manual / Planning Data' : 'Official API Data'}</span>
            </div>
            <button
              onClick={() => onNavigateTab('youtube')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
            >
              Channel Studio
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
              <span>Subscribers</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {(activeChannel?.subscriberCount || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12.4% this month
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
              <span>Total Views</span>
              <Eye className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {(activeChannel?.viewCount || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +18.2% vs prev period
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
              <span>Watch Time (Hrs)</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {(activeChannel?.watchTimeHours || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> 4.2 min avg duration
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
              <span>Likes & Engagement</span>
              <ThumbsUp className="w-4 h-4 text-pink-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {(activeChannel?.likesCount || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-cyan-400 font-medium mt-1 flex items-center">
              <Zap className="w-3 h-3 mr-1" /> 6.8% engagement rate
            </p>
          </div>
        </div>

        {isManualMode && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
            <span>
              <strong>Planning Notice:</strong> You are viewing Manual / Planning Data. Changes here do not modify actual YouTube platform stats.
            </span>
            <button
              onClick={() => onToggleManualMode(false)}
              className="text-xs font-bold underline ml-2 hover:text-amber-200 shrink-0"
            >
              Switch to Live API
            </button>
          </div>
        )}
      </div>

      {/* Recent AI Generations */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100">Recent AI Generations</h2>
            <p className="text-xs text-slate-400">Quickly reuse or copy your latest created assets</p>
          </div>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>View All History</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            No generations yet. Try generating your first video title or description above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {history.slice(0, 3).map((item) => {
              let previewText = '';
              if (item.output?.titles) {
                previewText = item.output.titles[0]?.title || '';
              } else if (item.output?.title) {
                previewText = item.output.title;
              } else if (item.output?.youtubeHashtags) {
                previewText = item.output.youtubeHashtags.slice(0, 4).join(' ');
              } else if (typeof item.output === 'string') {
                previewText = item.output;
              }

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[10px]">
                        {item.toolName}
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-200 line-clamp-3 leading-relaxed">
                      {previewText || 'AI Generation Output'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                      {item.input?.topic || 'General'}
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, previewText)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="Copy to clipboard"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
