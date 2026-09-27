'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  Sliders,
  Smartphone,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ThumbnailAnalysisResult } from '@/types';
import { AIProcessingState } from '@/components/LoadingSkeleton';

interface ThumbnailAnalyzerViewProps {
  onSaveToHistory: (toolType: any, toolName: string, input: any, output: any) => void;
}

export const ThumbnailAnalyzerView: React.FC<ThumbnailAnalyzerViewProps> = ({
  onSaveToHistory,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ThumbnailAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedImage(dataUrl);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/thumbnail-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: selectedImage }),
      });
      const data = await res.json();
      setAnalysisResult(data);
      onSaveToHistory('thumbnail_analyzer', 'Thumbnail Vision AI', { image: 'uploaded_thumbnail' }, data);
    } catch (err) {
      console.error('Thumbnail analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = (sampleUrl: string) => {
    setSelectedImage(sampleUrl);
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Thumbnail Intelligence AI</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                11-Factor Vision Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Upload your thumbnail to simulate human visual attention, mobile readability, contrast separation, and curiosity gaps before publishing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadSample('/logo.png')}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              Load Reference Sample
            </button>
          </div>
        </div>
      </div>

      {/* Upload Zone & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
              selectedImage
                ? 'border-cyan-500/40 bg-slate-950/60'
                : 'border-slate-700 hover:border-cyan-500/60 bg-slate-900/40 hover:bg-slate-900/70'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
            />

            {selectedImage ? (
              <div className="w-full space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <Image
                    src={selectedImage}
                    alt="Thumbnail Preview"
                    fill
                    className="object-cover"
                  />
                  {/* YouTube Duration Timestamp Overlay Simulation */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/85 text-white text-[10px] font-mono font-bold rounded">
                    12:45
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Aspect ratio: 16:9</span>
                  <span className="text-cyan-400 group-hover:underline">Click or drop to replace</span>
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-3">
                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mx-auto border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Upload YouTube Thumbnail</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Drag and drop or tap to browse (JPG, PNG, WebP up to 8MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <button
              disabled={isAnalyzing}
              onClick={handleAnalyze}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing 11 Visual Metrics...' : 'Run Vision AI Analysis'}</span>
            </button>
          )}
        </div>

        {/* Right Column: Click Potential Score & 11 Factors */}
        <div className="lg:col-span-7 space-y-4">
          {isAnalyzing ? (
            <AIProcessingState
              message="Simulating Eye-Tracking & Visual Attention..."
              subtext="Evaluating contrast, text size, subject prominence, and curiosity loops..."
            />
          ) : !analysisResult ? (
            <div className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
                <Eye className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-bold text-slate-200">No Thumbnail Analyzed Yet</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload an image on the left to receive an in-depth score dashboard across 11 key retention factors.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Click Potential Score Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b1528] to-[#111f3d] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                      Visual Click Potential
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        {analysisResult.overallScore}
                      </span>
                      <span className="text-lg font-bold text-slate-400">/ 100</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 max-w-sm">
                      * AI-based analytical estimate assessing visual appeal and curiosity, NOT a guaranteed CTR prediction.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Feed Verdict</span>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-xl inline-block ${
                        analysisResult.overallScore >= 80
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {analysisResult.overallScore >= 80 ? 'High Click Propensity' : 'Needs Optimization'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 11 Factors Category Grid */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  11 Category Performance Scores
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(analysisResult.categories).map(([key, score]) => {
                    const formattedName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                    return (
                      <div key={key} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[11px] text-slate-400 truncate">{formattedName}</span>
                          <span className="font-bold text-cyan-300 text-xs">{score}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-1 rounded-full ${
                              score >= 80
                                ? 'bg-emerald-400'
                                : score >= 65
                                ? 'bg-amber-400'
                                : 'bg-rose-400'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* "Why this score?" Breakdown */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Why This Score?</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {analysisResult.whyThisScore.map((reason, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* "How to improve this thumbnail" */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How To Improve This Thumbnail</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {analysisResult.improvementSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Revision Re-test trigger */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Upload Revised Thumbnail & Test Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
