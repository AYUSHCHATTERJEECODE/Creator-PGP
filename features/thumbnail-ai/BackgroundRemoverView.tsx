'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Download,
  Scissors,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ImageProcessingService } from '@/services/image/imageProcessingService';
import { AIProcessingState } from '@/components/LoadingSkeleton';

export const BackgroundRemoverView: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [threshold, setThreshold] = useState(28);
  const [backgroundPreviewStyle, setBackgroundPreviewStyle] = useState<'checker' | 'dark' | 'neon'>('checker');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setOriginalImage(dataUrl);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessRemoval = async () => {
    if (!originalImage) return;
    setIsProcessing(true);

    try {
      // Process using client-side edge and color distance alpha segmentation
      const transparentDataUrl = await ImageProcessingService.removeBackgroundClient(originalImage, {
        threshold,
      });
      setProcessedImage(transparentDataUrl);
    } catch (err) {
      console.error('Failed to remove background:', err);
      // Fallback to server endpoint
      try {
        const res = await fetch('/api/image/background-remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: originalImage }),
        });
        const data = await res.json();
        if (data.processedImageUrl) {
          setProcessedImage(data.processedImageUrl);
        }
      } catch (serverErr) {
        console.error(serverErr);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      ImageProcessingService.downloadImage(processedImage, `creator-pgp-subject-${Date.now()}.png`);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-tight">AI Background Remover</h2>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-[10px] font-semibold">
                Transparent PNG Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Extract yourself, products, or subjects cleanly for YouTube thumbnails with edge-aware alpha transparency.
            </p>
          </div>

          {originalImage && (
            <button
              onClick={handleReset}
              className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center space-x-1.5 self-start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Another Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Area */}
      {!originalImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 sm:p-16 rounded-3xl border-2 border-dashed border-slate-700 hover:border-pink-500/60 bg-slate-900/40 hover:bg-slate-900/70 transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/jpg"
            className="hidden"
          />
          <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-400 w-fit mx-auto border border-pink-500/20 group-hover:scale-110 transition-transform mb-3">
            <Scissors className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-200">Upload Image to Remove Background</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Drag and drop or tap to select JPG, PNG, or WebP. Transparent subject PNG will be generated.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Original */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Original Image
              </span>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700">
                <Image src={originalImage} alt="Original" fill className="object-contain bg-slate-950" />
              </div>

              {/* Threshold Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Edge Sensitivity Threshold</span>
                  <span className="text-cyan-400 font-bold">{threshold}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Action Button */}
              <button
                disabled={isProcessing}
                onClick={handleProcessRemoval}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-pink-500/20 transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Scissors className="w-4 h-4" />
                <span>{isProcessing ? 'Removing Background...' : 'Remove Background Now'}</span>
              </button>
            </div>
          </div>

          {/* Processed Transparent Output */}
          <div className="lg:col-span-7 space-y-4">
            {isProcessing ? (
              <AIProcessingState
                message="Processing Alpha Matting & Subject Extraction..."
                subtext="Isolating foreground subject and generating transparent PNG layer..."
              />
            ) : !processedImage ? (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                <div className="p-3 rounded-2xl bg-slate-800 w-fit mx-auto text-slate-400">
                  <Layers className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-400">
                  Adjust sensitivity if needed and tap <strong>Remove Background Now</strong> to preview transparent subject.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Transparent Subject Extracted</span>
                  </span>

                  {/* Background Preview Toggles */}
                  <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    {(['checker', 'dark', 'neon'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setBackgroundPreviewStyle(style)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition ${
                          backgroundPreviewStyle === style
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview Container */}
                <div
                  className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center ${
                    backgroundPreviewStyle === 'checker'
                      ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950'
                      : backgroundPreviewStyle === 'dark'
                      ? 'bg-[#080c18]'
                      : 'bg-gradient-to-tr from-cyan-900 via-purple-900 to-slate-950'
                  }`}
                >
                  <img
                    src={processedImage}
                    alt="Transparent PNG Subject"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Download Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Transparent PNG</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
                  >
                    Try Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
