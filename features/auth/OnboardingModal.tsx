'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Youtube, Instagram } from '@/components/BrandIcons';
import { BRAND, NICHES } from '@/config/constants';
import { UserProfile, PlatformType } from '@/types';

interface OnboardingModalProps {
  isOpen: boolean;
  user: UserProfile;
  onComplete: (updates: Partial<UserProfile>) => void;
  onSkip: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  user,
  onComplete,
  onSkip,
}) => {
  const [creatorName, setCreatorName] = useState(user.name || '');
  const [platform, setPlatform] = useState<PlatformType>('both');
  const [niche, setNiche] = useState(NICHES[0]);
  const [contentType, setContentType] = useState('Deep-Dive Tutorials & Case Studies');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name: creatorName.trim() || user.name,
      primaryPlatform: platform,
      niche,
      contentType,
      onboardingCompleted: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 mx-auto">
            <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" priority />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Personalize Your {BRAND.name} Studio
          </h3>
          <p className="text-xs text-slate-400">
            Tell us about your audience and channel goals to fine-tune AI recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Creator / Channel Name
            </label>
            <input
              type="text"
              required
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="e.g. Alex Tech Labs"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Platform Focus
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-4 h-4 text-red-400" /> },
                { id: 'instagram_reels', label: 'Instagram', icon: <Instagram className="w-4 h-4 text-rose-400" /> },
                { id: 'both', label: 'Both / Cross-Post', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as any)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                    platform === p.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Niche Category</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {NICHES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Content Format / Style
            </label>
            <input
              type="text"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              placeholder="e.g. 10-minute deep dives, shorts & reels challenges"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-slate-400 hover:text-white transition font-medium"
            >
              Skip for now
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 transition active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
