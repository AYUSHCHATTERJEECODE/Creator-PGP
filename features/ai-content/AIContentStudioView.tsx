'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Hash,
  Lightbulb,
  Copy,
  Check,
  RefreshCw,
  Bookmark,
  Share2,
  Sliders,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { NICHES, CONTENT_TONES } from '@/config/constants';
import {
  DescriptionResult,
  HashtagGroupsResult,
  DailyVideoIdea,
  SimilarContentResult,
  PlatformType,
} from '@/types';
import { AIProcessingState } from '@/components/LoadingSkeleton';

interface AIContentStudioViewProps {
  initialSubTool?: string;
  onSaveToHistory: (toolType: any, toolName: string, input: any, output: any) => void;
  onSaveToProject?: (title: string, type: any, data: any) => void;
  onCopyText: (text: string) => void;
}

export const AIContentStudioView: React.FC<AIContentStudioViewProps> = ({
  initialSubTool = 'title',
  onSaveToHistory,
  onSaveToProject,
  onCopyText,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'title' | 'description' | 'hashtags' | 'daily_video' | 'similar'>(
    (initialSubTool as any) || 'title'
  );

  // Common inputs
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [tone, setTone] = useState(CONTENT_TONES[0]);
  const [platform, setPlatform] = useState<PlatformType>('youtube');
  const [script, setScript] = useState('');
  const [existingTitle, setExistingTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('Tech-savvy creators and digital entrepreneurs');
  const [numIdeas, setNumIdeas] = useState(3);

  // Loading & Outputs
  const [isLoading, setIsLoading] = useState(false);
  const [isX2Mode, setIsX2Mode] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Specific state results
  const [titleResults, setTitleResults] = useState<any[]>([]);
  const [descriptionResult, setDescriptionResult] = useState<any>(null);
  const [hashtagResult, setHashtagResult] = useState<any>(null);
  const [dailyIdeasResult, setDailyIdeasResult] = useState<DailyVideoIdea[]>([]);
  const [similarResult, setSimilarResult] = useState<SimilarContentResult | null>(null);

  const handleCopy = (key: string, text: string) => {
    onCopyText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. Generate Titles
  const handleGenerateTitles = async (forceX2?: boolean) => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const x2 = forceX2 !== undefined ? forceX2 : isX2Mode;

    try {
      const res = await fetch('/api/ai/title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, tone, platform, isX2: x2 }),
      });
      const data = await res.json();
      if (data.titles) {
        setTitleResults(data.titles);
        onSaveToHistory('title_generator', 'High CTR Title Engine', { topic, niche, tone, isX2: x2 }, data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Generate Description
  const handleGenerateDescription = async (forceX2?: boolean) => {
    if (!topic.trim() && !existingTitle.trim() && !script.trim()) return;
    setIsLoading(true);
    const x2 = forceX2 !== undefined ? forceX2 : isX2Mode;

    try {
      const res = await fetch('/api/ai/description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, existingTitle, script, niche, tone, isX2: x2 }),
      });
      const data = await res.json();
      setDescriptionResult(data);
      onSaveToHistory('description_generator', 'SEO Description Studio', { topic, existingTitle, isX2: x2 }, data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Generate Hashtags
  const handleGenerateHashtags = async (forceX2?: boolean) => {
    if (!topic.trim() && !existingTitle.trim()) return;
    setIsLoading(true);
    const x2 = forceX2 !== undefined ? forceX2 : isX2Mode;

    try {
      const res = await fetch('/api/ai/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: existingTitle,
          topic,
          niche,
          targetAudience,
          platform,
          isX2: x2,
        }),
      });
      const data = await res.json();
      setHashtagResult(data);
      onSaveToHistory('viral_hashtags', 'Viral Hashtags Engine', { topic, existingTitle, isX2: x2 }, data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Daily Video Ideas
  const handleGenerateDailyIdeas = async (forceX2?: boolean) => {
    setIsLoading(true);
    const x2 = forceX2 !== undefined ? forceX2 : isX2Mode;

    try {
      const res = await fetch('/api/ai/video-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          audience: targetAudience,
          platform,
          count: numIdeas,
          contentStyle: tone,
          isX2: x2,
        }),
      });
      const data = await res.json();
      if (data.ideas) {
        setDailyIdeasResult(data.ideas);
        onSaveToHistory('daily_video_generator', 'Daily Video Engine', { niche, targetAudience, isX2: x2 }, data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Similar Content Generator
  const handleGenerateSimilar = async () => {
    if (!existingTitle.trim() && !topic.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/similar-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          existingTitle: existingTitle || topic,
          topic,
          existingIdea: script,
        }),
      });
      const data = await res.json();
      setSimilarResult(data);
      onSaveToHistory('similar_content', 'Similar Content Engine', { existingTitle, topic }, data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Studio Navigation Tabs */}
      <div className="flex overflow-x-auto pb-1 scrollbar-none gap-2">
        {[
          { id: 'title', label: 'Title Engine', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
          { id: 'description', label: 'Text → Description', icon: <FileText className="w-4 h-4 text-blue-400" /> },
          { id: 'hashtags', label: 'Viral Hashtags', icon: <Hash className="w-4 h-4 text-purple-400" /> },
          { id: 'daily_video', label: 'Daily Video Generator', icon: <Lightbulb className="w-4 h-4 text-amber-400" /> },
          { id: 'similar', label: 'Similar Content ×2', icon: <Layers className="w-4 h-4 text-pink-400" /> },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-800 text-white border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Input Parameters
              </span>

              {/* Generate ×2 System Toggle */}
              <button
                type="button"
                onClick={() => setIsX2Mode(!isX2Mode)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition border ${
                  isX2Mode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Generates 2 distinct independent variations"
              >
                <Flame className={`w-3.5 h-3.5 ${isX2Mode ? 'text-yellow-300' : ''}`} />
                <span>Generate ×2 Mode</span>
              </button>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Topic / Video Focus <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How to Build an AI Agent in 2026"
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/40 transition"
              />
            </div>

            {/* Existing Title / Keyword (Optional/Contextual) */}
            {(activeSubTab === 'description' || activeSubTab === 'similar' || activeSubTab === 'hashtags') && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Existing Title / Draft Hook (Optional)
                </label>
                <input
                  type="text"
                  value={existingTitle}
                  onChange={(e) => setExistingTitle(e.target.value)}
                  placeholder="e.g. The Real Math Behind Going Viral"
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 transition"
                />
              </div>
            )}

            {/* Script / Notes for Description or Similar */}
            {activeSubTab === 'description' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Script Excerpt or Bullet Points
                </label>
                <textarea
                  rows={4}
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Paste rough script notes, key timestamps, or product links here..."
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 transition resize-none"
                />
              </div>
            )}

            {/* Niche & Category Select */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                >
                  {NICHES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                >
                  {CONTENT_TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'youtube', label: 'YouTube' },
                  { id: 'youtube_shorts', label: 'Shorts' },
                  { id: 'instagram_reels', label: 'Reels' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition text-center ${
                      platform === p.id
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Ideas Counter */}
            {activeSubTab === 'daily_video' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Number of Ideas: <span className="text-cyan-400 font-bold">{numIdeas}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={numIdeas}
                  onChange={(e) => setNumIdeas(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  if (activeSubTab === 'title') handleGenerateTitles(false);
                  if (activeSubTab === 'description') handleGenerateDescription(false);
                  if (activeSubTab === 'hashtags') handleGenerateHashtags(false);
                  if (activeSubTab === 'daily_video') handleGenerateDailyIdeas(false);
                  if (activeSubTab === 'similar') handleGenerateSimilar();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'Generating...' : 'Generate Content'}</span>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  if (activeSubTab === 'title') handleGenerateTitles(true);
                  if (activeSubTab === 'description') handleGenerateDescription(true);
                  if (activeSubTab === 'hashtags') handleGenerateHashtags(true);
                  if (activeSubTab === 'daily_video') handleGenerateDailyIdeas(true);
                  if (activeSubTab === 'similar') handleGenerateSimilar();
                }}
                className="py-3 px-4 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/50 text-purple-200 font-bold text-xs transition active:scale-95 flex items-center justify-center space-x-1.5 disabled:opacity-50 shrink-0"
                title="Generate 2 independent distinct variations"
              >
                <Flame className="w-3.5 h-3.5 text-pink-400" />
                <span>Generate ×2</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Results Display */}
        <div className="lg:col-span-7 space-y-4">
          {isLoading ? (
            <AIProcessingState
              message="Synthesizing Creator Assets..."
              subtext="Optimizing click-through rate, retention hooks, and semantic SEO parameters..."
            />
          ) : (
            <div className="space-y-4">
              {/* TAB 1: TITLE GENERATOR OUTPUT */}
              {activeSubTab === 'title' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Generated Titles {titleResults.length > 0 && `(${titleResults.length})`}
                    </h3>
                    {titleResults.length > 0 && (
                      <button
                        onClick={() => handleGenerateTitles(isX2Mode)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate</span>
                      </button>
                    )}
                  </div>

                  {titleResults.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-slate-500 text-xs">
                      Enter a topic on the left and tap <strong>Generate Content</strong> or <strong>Generate ×2</strong> to produce high-CTR titles.
                    </div>
                  ) : (
                    titleResults.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition group shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                                {item.angle || 'High CTR'}
                              </span>
                              {item.estimatedCtrScore && (
                                <span className="text-[11px] font-bold text-emerald-400">
                                  {item.estimatedCtrScore}% CTR Potential
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition">
                              {item.title}
                            </h4>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            <button
                              onClick={() => handleCopy(`title-${idx}`, item.title)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                              title="Copy title"
                            >
                              {copiedKey === `title-${idx}` ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: TEXT -> DESCRIPTION OUTPUT */}
              {activeSubTab === 'description' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      YouTube Description Blueprint
                    </h3>
                    {descriptionResult && (
                      <button
                        onClick={() => handleGenerateDescription(isX2Mode)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate</span>
                      </button>
                    )}
                  </div>

                  {!descriptionResult ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-slate-500 text-xs">
                      Enter topic or paste your script notes to generate an SEO description with timestamps, CTA, and keywords.
                    </div>
                  ) : (
                    // Supports single or Version A & B (Generate x2)
                    <div className="space-y-4">
                      {descriptionResult.versionA && descriptionResult.versionB ? (
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            { label: 'Variation 1 (Analytical & Hook)', data: descriptionResult.versionA, id: 'vA' },
                            { label: 'Variation 2 (Action & Direct Value)', data: descriptionResult.versionB, id: 'vB' },
                          ].map((v) => (
                            <div key={v.id} className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                                  {v.label}
                                </span>
                                <button
                                  onClick={() => handleCopy(v.id, `${v.data.title}\n\n${v.data.description}\n\n${v.data.cta}`)}
                                  className="text-xs text-slate-300 hover:text-white flex items-center space-x-1 px-2.5 py-1 bg-slate-800 rounded-lg"
                                >
                                  {copiedKey === v.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>Copy All</span>
                                </button>
                              </div>
                              <p className="text-xs font-semibold text-cyan-300">TITLE: {v.data.title}</p>
                              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{v.data.description}</p>
                              <div className="p-3 bg-slate-950/70 rounded-xl text-xs text-slate-300 border border-slate-800">
                                <strong>CTA:</strong> {v.data.cta}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                          {/* Title */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Optimized Title
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                              <span className="text-sm font-bold text-cyan-300">{descriptionResult.title}</span>
                              <button
                                onClick={() => handleCopy('desc-title', descriptionResult.title)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                              >
                                {copiedKey === 'desc-title' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Description Body */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Description Body
                            </div>
                            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                              {descriptionResult.description}
                            </div>
                          </div>

                          {/* Chapters */}
                          {descriptionResult.chapters && descriptionResult.chapters.length > 0 && (
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Video Chapters / Timestamps
                              </div>
                              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 font-mono text-xs text-slate-300">
                                {descriptionResult.chapters.map((ch: any, idx: number) => (
                                  <div key={idx} className="flex space-x-2">
                                    <span className="text-cyan-400">{ch.timestamp}</span>
                                    <span>{ch.title}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA & Keywords */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
                              <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Call To Action</span>
                              <p className="text-slate-300 whitespace-pre-line">{descriptionResult.cta}</p>
                            </div>
                            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
                              <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Target Keywords</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {descriptionResult.keywords?.map((kw: string, i: number) => (
                                  <span key={i} className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Copy Button */}
                          <button
                            onClick={() =>
                              handleCopy(
                                'desc-all',
                                `${descriptionResult.title}\n\n${descriptionResult.description}\n\n${descriptionResult.cta}\n\nKeywords: ${descriptionResult.keywords?.join(', ')}`
                              )
                            }
                            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700 transition"
                          >
                            {copiedKey === 'desc-all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            <span>Copy Complete Description Package</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VIRAL HASHTAGS OUTPUT */}
              {activeSubTab === 'hashtags' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Categorized Hashtag Matrix
                    </h3>
                    {hashtagResult && (
                      <button
                        onClick={() => handleGenerateHashtags(isX2Mode)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate</span>
                      </button>
                    )}
                  </div>

                  {!hashtagResult ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-slate-500 text-xs">
                      Generate high-reach, non-spam hashtags categorized for YouTube, Instagram, Shorts, and Reels.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { title: 'YouTube Hashtags (Search & Discovery)', key: 'youtubeHashtags', tags: hashtagResult.youtubeHashtags || [] },
                        { title: 'Instagram Hashtags (Explore Feed & Niches)', key: 'instagramHashtags', tags: hashtagResult.instagramHashtags || [] },
                        { title: 'Shorts Hashtags (Algorithm Feed Velocity)', key: 'shortsHashtags', tags: hashtagResult.shortsHashtags || [] },
                        { title: 'Reels Hashtags (Trending Audio & Reels Feed)', key: 'reelsHashtags', tags: hashtagResult.reelsHashtags || [] },
                      ].map((grp) => (
                        <div key={grp.key} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200">{grp.title}</span>
                            <button
                              onClick={() => handleCopy(grp.key, grp.tags.join(' '))}
                              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800/80"
                            >
                              {copiedKey === grp.key ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>Copy Group</span>
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {grp.tags.map((tag: string, i: number) => (
                              <span
                                key={i}
                                onClick={() => handleCopy(`tag-${tag}`, tag)}
                                className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-700/60 text-xs font-mono text-cyan-300 hover:border-cyan-400 cursor-pointer transition"
                                title="Click to copy single tag"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DAILY VIDEO GENERATOR */}
              {activeSubTab === 'daily_video' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Daily Content Blueprints {dailyIdeasResult.length > 0 && `(${dailyIdeasResult.length})`}
                    </h3>
                    {dailyIdeasResult.length > 0 && (
                      <button
                        onClick={() => handleGenerateDailyIdeas(isX2Mode)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate</span>
                      </button>
                    )}
                  </div>

                  {dailyIdeasResult.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-slate-500 text-xs">
                      Select your target audience and content style to generate comprehensive video ideas with hooks, angles, tags, and CTAs.
                    </div>
                  ) : (
                    dailyIdeasResult.map((idea, index) => (
                      <div key={idea.id || index} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                              Angle: {idea.contentAngle}
                            </span>
                            <h4 className="text-base font-bold text-slate-100 mt-1.5">{idea.title}</h4>
                          </div>

                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleCopy(`idea-${index}`, `${idea.title}\n\nHook: ${idea.hook}\n\nAngle: ${idea.contentAngle}\n\nCTA: ${idea.cta}`)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                              title="Copy complete idea"
                            >
                              {copiedKey === `idea-${index}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* 3-Second Hook */}
                        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs">
                          <span className="font-bold text-cyan-400 block text-[10px] uppercase mb-0.5">3-Second Opening Hook</span>
                          <p className="text-cyan-100 font-medium italic">"{idea.hook}"</p>
                        </div>

                        {/* Synopsis & CTA */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Core Concept</span>
                            <p>{idea.description}</p>
                          </div>
                          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Retention CTA</span>
                            <p>{idea.cta}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {idea.hashtags?.map((tag, i) => (
                            <span key={i} className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded-lg bg-purple-950/50 border border-purple-800/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 5: SIMILAR CONTENT GENERATOR */}
              {activeSubTab === 'similar' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        Similar Content Engine (Two Distinct Angles)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Zero synonym-swapping: Generates two completely different narrative structures
                      </p>
                    </div>
                  </div>

                  {!similarResult ? (
                    <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-slate-500 text-xs">
                      Enter an existing video title or topic to create two original, independent creative variations.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {/* Variation 1 */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                            Variation 1: {similarResult.variation1?.angle}
                          </span>
                          <button
                            onClick={() => handleCopy('var1', `${similarResult.variation1.title}\n\nHook: ${similarResult.variation1.hook}\n\n${similarResult.variation1.description}`)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          >
                            {copiedKey === 'var1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{similarResult.variation1?.title}</h4>
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase block mb-1">Hook</span>
                          <p className="italic text-slate-200">"{similarResult.variation1?.hook}"</p>
                        </div>
                        <p className="text-xs text-slate-300">{similarResult.variation1?.description}</p>
                      </div>

                      {/* Variation 2 */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30">
                            Variation 2: {similarResult.variation2?.angle}
                          </span>
                          <button
                            onClick={() => handleCopy('var2', `${similarResult.variation2.title}\n\nHook: ${similarResult.variation2.hook}\n\n${similarResult.variation2.description}`)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          >
                            {copiedKey === 'var2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{similarResult.variation2?.title}</h4>
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                          <span className="text-[10px] font-bold text-purple-400 uppercase block mb-1">Hook</span>
                          <p className="italic text-slate-200">"{similarResult.variation2?.hook}"</p>
                        </div>
                        <p className="text-xs text-slate-300">{similarResult.variation2?.description}</p>
                      </div>
                    </div>
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
