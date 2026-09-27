'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Eye,
  Clock,
  ThumbsUp,
  ExternalLink,
  Plus,
  Sliders,
  Calendar,
  TrendingUp,
  BarChart3,
  Video,
  CheckCircle2,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import { Youtube } from '@/components/BrandIcons';
import { YouTubeChannel, YouTubeAnalyticsData, VideoPerformance } from '@/types';
import { YouTubeService } from '@/services/youtube/youtubeService';

interface YouTubeDashboardViewProps {
  channels: YouTubeChannel[];
  activeChannel: YouTubeChannel | null;
  onSelectChannel: (channel: YouTubeChannel) => void;
  onConnectYouTube: () => void;
  isManualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
  onUpdateManualData?: (updates: Partial<YouTubeChannel>) => void;
}

export const YouTubeDashboardView: React.FC<YouTubeDashboardViewProps> = ({
  channels,
  activeChannel,
  onSelectChannel,
  onConnectYouTube,
  isManualMode,
  onToggleManualMode,
  onUpdateManualData,
}) => {
  const [timeframe, setTimeframe] = useState<'7d' | '28d' | '90d'>('28d');
  const [isEditingManual, setIsEditingManual] = useState(false);
  const [manualForm, setManualForm] = useState({
    subscriberCount: activeChannel?.subscriberCount || 50000,
    viewCount: activeChannel?.viewCount || 2500000,
    watchTimeHours: activeChannel?.watchTimeHours || 120000,
    videoCount: activeChannel?.videoCount || 95,
  });

  const analytics: YouTubeAnalyticsData = YouTubeService.getAnalytics(
    activeChannel?.channelId || 'chan-1',
    timeframe,
    isManualMode
  );

  const handleSaveManualForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateManualData) {
      onUpdateManualData({
        subscriberCount: Number(manualForm.subscriberCount),
        viewCount: Number(manualForm.viewCount),
        watchTimeHours: Number(manualForm.watchTimeHours),
        videoCount: Number(manualForm.videoCount),
      });
    }
    setIsEditingManual(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Channel Profile */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Channel Avatar & Info */}
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-xl shadow-red-500/10 shrink-0">
              <Image
                src={activeChannel?.avatarUrl || '/logo.png'}
                alt={activeChannel?.title || 'YouTube Channel'}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2.5">
                <a
                  href={activeChannel?.customUrl || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-bold text-white hover:text-red-400 transition flex items-center space-x-2"
                >
                  <span>{activeChannel?.title || 'No Channel Connected'}</span>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>

                {activeChannel?.isConnected && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                <a
                  href={activeChannel?.customUrl || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {activeChannel?.handle || '@handle'}
                </a>
                <span>•</span>
                <span>{activeChannel?.videoCount || 0} Videos</span>
                <span>•</span>
                <span>ID: {activeChannel?.channelId?.substring(0, 12)}...</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mode Switcher */}
            <button
              onClick={() => onToggleManualMode(!isManualMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition ${
                isManualMode
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isManualMode ? 'Manual / Planning Mode' : 'Live YouTube API'}</span>
            </button>

            {isManualMode && (
              <button
                onClick={() => setIsEditingManual(!isEditingManual)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Planning Numbers</span>
              </button>
            )}

            <button
              onClick={onConnectYouTube}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition flex items-center space-x-2"
            >
              <Youtube className="w-4 h-4" />
              <span>Connect Channel</span>
            </button>
          </div>
        </div>

        {/* Manual Planning Disclaimer Banner */}
        {isManualMode && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Manual / Planning Data Active:</strong>
              These metrics represent target benchmarks or planning simulations entered by the creator. They are strictly separate from official YouTube API statistics and do not affect live channel metrics.
            </div>
          </div>
        )}
      </div>

      {/* Manual Data Edit Modal/Form if open */}
      {isEditingManual && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-xl space-y-4 animate-in fade-in">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
            Edit Manual / Planning Projections
          </h4>
          <form onSubmit={handleSaveManualForm} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subscriber Target</label>
              <input
                type="number"
                value={manualForm.subscriberCount}
                onChange={(e) => setManualForm({ ...manualForm, subscriberCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">View Goal</label>
              <input
                type="number"
                value={manualForm.viewCount}
                onChange={(e) => setManualForm({ ...manualForm, viewCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Watch Time (Hours)</label>
              <input
                type="number"
                value={manualForm.watchTimeHours}
                onChange={(e) => setManualForm({ ...manualForm, watchTimeHours: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Videos</label>
              <input
                type="number"
                value={manualForm.videoCount}
                onChange={(e) => setManualForm({ ...manualForm, videoCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div className="sm:col-span-4 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingManual(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
              >
                Save Planning Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Channel Growth & Performance</span>
        </h3>

        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {(['7d', '28d', '90d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeframe === t ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === '7d' ? 'Last 7 Days' : t === '28d' ? 'Last 28 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Views ({timeframe})</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.totalViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +16.8% vs prev
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Watch Time</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.totalWatchTimeHours.toLocaleString()} hrs
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> 4.2 min avg
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Subs Gained</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            +{analytics.subscribersGained.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> High conversion
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Average CTR</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.averageCtr}%
          </div>
          <span className="text-[11px] text-cyan-400 font-medium mt-1 flex items-center">
            Top 15% in niche
          </span>
        </div>
      </div>

      {/* Visual Bar/Line Chart Simulation */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Daily View Trendline
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {analytics.dailyMetrics.length} data points
          </span>
        </div>

        {/* Responsive Bar Graphic */}
        <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-1">
          {analytics.dailyMetrics.slice(-21).map((pt, i) => {
            const maxViews = Math.max(...analytics.dailyMetrics.map((p) => p.views));
            const heightPercent = Math.max(12, Math.round((pt.views / maxViews) * 100));

            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 px-2 py-1 bg-slate-950 border border-slate-700 text-[10px] text-slate-200 rounded whitespace-nowrap z-20 pointer-events-none shadow-lg">
                  {pt.date}: {pt.views.toLocaleString()} views ({pt.ctr}% CTR)
                </div>

                <div
                  className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-cyan-400 rounded-t-md transition-all duration-300 group-hover:from-cyan-400 group-hover:to-purple-400 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[11px] text-slate-500 px-1 border-t border-slate-800/80 pt-2">
          <span>{analytics.dailyMetrics[0]?.date}</span>
          <span>{analytics.dailyMetrics[Math.floor(analytics.dailyMetrics.length / 2)]?.date}</span>
          <span>{analytics.dailyMetrics[analytics.dailyMetrics.length - 1]?.date}</span>
        </div>
      </div>

      {/* Top Performing Videos */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Video className="w-4 h-4 text-red-400" />
          <span>Top Video Performance in Period</span>
        </h4>

        <div className="space-y-3">
          {analytics.topVideos.map((vid) => (
            <div
              key={vid.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="relative w-24 aspect-video rounded-xl overflow-hidden border border-slate-700 shrink-0">
                  <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">{vid.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">Published {vid.publishedAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-left sm:text-right shrink-0 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Views</span>
                  <span className="font-bold text-slate-200">{vid.views.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Likes</span>
                  <span className="font-bold text-slate-200">{vid.likes.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">CTR</span>
                  <span className="font-bold text-emerald-400">{vid.ctr}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
