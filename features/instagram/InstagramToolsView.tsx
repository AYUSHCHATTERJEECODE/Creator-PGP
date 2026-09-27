'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Hash,
  Lightbulb,
  FileText,
  Flame,
} from 'lucide-react';
import { Instagram } from '@/components/BrandIcons';
import { NICHES } from '@/config/constants';
import { AIService } from '@/services/ai/aiService';
import { AIProcessingState } from '@/components/LoadingSkeleton';

interface InstagramToolsViewProps {
  onSaveToHistory: (toolType: any, toolName: string, input: any, output: any) => void;
  onCopyText: (text: string) => void;
}

export const InstagramToolsView: React.FC<InstagramToolsViewProps> = ({
  onSaveToHistory,
  onCopyText,
}) => {
  const [activeTab, setActiveTab] = useState<'hooks' | 'hashtags' | 'captions' | 'ideas'>('hooks');
  const [reelTopic, setReelTopic] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Results
  const [hookResults, setHookResults] = useState<any[]>([]);
  const [captionResult, setCaptionResult] = useState<any>(null);
  const [ideaResults, setIdeaResults] = useState<any[]>([]);
  const [hashtagResults, setHashtagResults] = useState<string[]>([]);

  const handleCopy = (key: string, text: string) => {
    onCopyText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    if (!reelTopic.trim()) return;
    setIsLoading(true);

    try {
      if (activeTab === 'hooks') {
        const res = await AIService.generateInstagramTools('hook', reelTopic, niche);
        setHookResults(res.hooks || []);
        onSaveToHistory('reel_hook', 'Instagram Reel Hook Engine', { reelTopic, niche }, res);
      } else if (activeTab === 'captions') {
        const res = await AIService.generateInstagramTools('caption', reelTopic, niche);
        setCaptionResult(res);
        onSaveToHistory('reel_caption', 'Instagram Reel Caption Engine', { reelTopic, niche }, res);
      } else if (activeTab === 'ideas') {
        const res = await AIService.generateInstagramTools('idea', reelTopic, niche);
        setIdeaResults(res.ideas || []);
        onSaveToHistory('reel_hook', 'Instagram Reel Ideas', { reelTopic, niche }, res);
      } else if (activeTab === 'hashtags') {
        const res = await AIService.generateHashtags({
          topic: reelTopic,
          niche,
          platform: 'instagram_reels',
        });
        const tags = (res as any).instagramHashtags || [];
        setHashtagResults(tags);
        onSaveToHistory('hashtag_generator', 'Instagram Hashtags', { reelTopic, niche }, res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                <Instagram className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Instagram Reels Intelligence</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              High-retention hooks, algorithm hashtags, audio ideas, and engaging caption frameworks tailored for Reels & Explore feeds.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'hooks', label: 'Reel Hook Generator', icon: <Flame className="w-4 h-4 text-rose-400" /> },
          { id: 'hashtags', label: 'Instagram Hashtags', icon: <Hash className="w-4 h-4 text-purple-400" /> },
          { id: 'captions', label: 'Viral Caption Studio', icon: <FileText className="w-4 h-4 text-blue-400" /> },
          { id: 'ideas', label: 'Reel Concept Generator', icon: <Lightbulb className="w-4 h-4 text-amber-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white border border-rose-500/40 shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Reel Parameters
            </span>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Reel Topic or Concept <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={reelTopic}
                onChange={(e) => setReelTopic(e.target.value)}
                placeholder="e.g. 3 AI tools that will replace your workflow"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={isLoading || !reelTopic.trim()}
              onClick={handleGenerate}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Generating...' : `Generate ${activeTab.toUpperCase()}`}</span>
            </button>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-4">
          {isLoading ? (
            <AIProcessingState
              message="Synthesizing Instagram Reel Assets..."
              subtext="Optimizing for first 3-second retention dropoff and shareability..."
            />
          ) : (
            <div className="space-y-4">
              {/* Hooks Output */}
              {activeTab === 'hooks' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    High-Retention Reel Hooks
                  </h3>
                  {hookResults.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs">
                      Enter your Reel topic and tap Generate to see scroll-stopping verbal hooks with retention estimates.
                    </div>
                  ) : (
                    hookResults.map((h, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                {h.style}
                              </span>
                              <span className="text-[11px] font-bold text-emerald-400">
                                {h.retentionEstimate} retention
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-100 italic pt-1">
                              "{h.hook}"
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopy(`hook-${i}`, h.hook)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0"
                          >
                            {copiedKey === `hook-${i}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Captions Output */}
              {activeTab === 'captions' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    High-Engagement Caption & CTA
                  </h3>
                  {!captionResult ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs">
                      Generate ready-to-paste Instagram captions structured for saves and comments.
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {captionResult.caption}
                      </div>
                      <button
                        onClick={() => handleCopy('caption-text', captionResult.caption)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-2"
                      >
                        {copiedKey === 'caption-text' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>Copy Caption</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hashtags Output */}
              {activeTab === 'hashtags' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Instagram Reels Hashtags
                  </h3>
                  {hashtagResults.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs">
                      Enter topic to generate curated Instagram hashtags.
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {hashtagResults.map((tag, i) => (
                          <span
                            key={i}
                            onClick={() => handleCopy(`itag-${i}`, tag)}
                            className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300 hover:border-rose-400 cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleCopy('all-itags', hashtagResults.join(' '))}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-2"
                      >
                        {copiedKey === 'all-itags' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>Copy All Instagram Hashtags</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Ideas Output */}
              {activeTab === 'ideas' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Reel Concepts & Audio Pairings
                  </h3>
                  {ideaResults.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs">
                      Generate original short-form video concepts with visual hooks and audio suggestions.
                    </div>
                  ) : (
                    ideaResults.map((idea, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                        <h4 className="text-sm font-bold text-slate-100">{idea.concept}</h4>
                        <div className="text-xs text-slate-300 space-y-1">
                          <p>
                            <strong className="text-rose-400">Visual Hook:</strong> {idea.visualHook}
                          </p>
                          <p>
                            <strong className="text-amber-400">Audio Suggestion:</strong> {idea.audioSuggestion}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
