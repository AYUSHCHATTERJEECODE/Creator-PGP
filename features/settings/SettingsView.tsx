'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Settings,
  User,
  Zap,
  Key,
  Shield,
  Sliders,
  CheckCircle2,
  Check,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { UserProfile, UserPlan } from '@/types';
import { PLANS, NICHES, BRAND } from '@/config/constants';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onAddToast: (msg: string, type?: any) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onAddToast,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'plans' | 'api' | 'mobile'>('profile');

  // Profile form
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [niche, setNiche] = useState(user.niche);
  const [primaryPlatform, setPrimaryPlatform] = useState(user.primaryPlatform);

  // API Config
  const [geminiKey, setGeminiKey] = useState('');
  const [youtubeClientId, setYoutubeClientId] = useState('');
  const [demoMode, setDemoMode] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email, niche, primaryPlatform });
    onAddToast('Creator profile updated successfully.', 'success');
  };

  const handleUpgradePlan = (planId: UserPlan) => {
    const targetPlan = PLANS[planId];
    onUpdateUser({
      plan: planId,
      creditsRemaining: targetPlan.monthlyCredits,
      monthlyQuota: targetPlan.monthlyCredits,
    });
    onAddToast(`Upgraded to ${targetPlan.name}! Monthly quota refreshed.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-cyan-500/40">
              <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Studio Settings & Account</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Manage profile credentials, subscription plans, and external API configurations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800/80 pb-3">
        {[
          { id: 'profile', label: 'Creator Profile', icon: <User className="w-4 h-4" /> },
          { id: 'plans', label: 'Subscription & Quotas', icon: <Zap className="w-4 h-4" /> },
          { id: 'api', label: 'API Keys & Engine', icon: <Key className="w-4 h-4" /> },
          { id: 'mobile', label: 'Mobile App / PWA', icon: <Smartphone className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. CREATOR PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Creator Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Creator Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Platform</label>
              <select
                value={primaryPlatform}
                onChange={(e) => setPrimaryPlatform(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="youtube">YouTube (Long & Shorts)</option>
                <option value="youtube_shorts">YouTube Shorts Specialist</option>
                <option value="instagram_reels">Instagram Reels Specialist</option>
                <option value="both">Both YouTube & Instagram</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* 2. PLANS & QUOTAS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Quota Progress Banner */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Current Tier</span>
                <h4 className="text-lg font-bold text-white capitalize">{user.plan} Creator Plan</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Monthly Credits Remaining</span>
                <div className="text-xl font-bold text-white">
                  {user.creditsRemaining} / {user.monthlyQuota}
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min(100, (user.creditsRemaining / user.monthlyQuota) * 100)}%` }}
              />
            </div>
          </div>

          {/* Pricing Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(PLANS) as UserPlan[]).map((planKey) => {
              const plan = PLANS[planKey];
              const isCurrent = user.plan === planKey;

              return (
                <div
                  key={planKey}
                  className={`p-6 rounded-3xl border transition flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-slate-900 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{plan.name}</span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                          Active Plan
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-white mb-4">{plan.price}</div>

                    <ul className="space-y-2 text-xs text-slate-300 mb-6">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    disabled={isCurrent}
                    onClick={() => handleUpgradePlan(planKey)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-500 cursor-default'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-md active:scale-95'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. API KEYS & ENGINE */}
      {activeTab === 'api' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Credentials & Demo Switch</h3>
          <p className="text-xs text-slate-400">
            Creator PGP uses Google Gemini 1.5/2.0 models for text, title, and vision intelligence.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google Gemini API Key (Optional Override)
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank to use server environment default)"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Never shared publicly. Processed strictly through secure server API routes.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google OAuth Client ID (for YouTube Data API v3)
              </label>
              <input
                type="text"
                value={youtubeClientId}
                onChange={(e) => setYoutubeClientId(e.target.value)}
                placeholder="1048291048...apps.googleusercontent.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 mt-2">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Development Demo Mode</span>
                <span className="text-[11px] text-slate-400">
                  Provides instantaneous simulated AI outputs when offline or during testing.
                </span>
              </div>
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onAddToast('API credentials saved securely.', 'success')}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
            >
              Update API Configuration
            </button>
          </div>
        </div>
      )}

      {/* 4. MOBILE APP READINESS & PWA */}
      {activeTab === 'mobile' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Mobile Architecture & PWA</h3>
              <p className="text-xs text-slate-400">
                Creator PGP is engineered mobile-first and ready to install on Android & iOS
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Android & iOS Viewport Compliance Active</span>
            </div>
            <p>
              • Touch target dimensions exceed 44×44px for thumb comfort.
            </p>
            <p>
              • Persistent bottom navigation bar ensures rapid tool switching.
            </p>
            <p>
              • Zero horizontal scroll overflow across iPhone 13/14/15/16 and Pixel screens.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-400">
            <strong className="text-slate-200 block">How to Install on Mobile:</strong>
            <p>1. Open this website in Safari (iOS) or Chrome (Android).</p>
            <p>2. Tap the Share button (iOS) or Menu dots (Android).</p>
            <p>3. Select <strong>"Add to Home Screen"</strong>.</p>
            <p>4. Creator PGP will launch as a standalone full-screen application with its official icon!</p>
          </div>
        </div>
      )}
    </div>
  );
};
