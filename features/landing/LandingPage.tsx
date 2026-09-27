'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Eye,
  Scissors,
  BarChart3,
  Layers,
  CheckCircle2,
  ChevronDown,
  Shield,
  Zap,
  Star,
  Check,
} from 'lucide-react';
import { Youtube, Instagram } from '@/components/BrandIcons';
import { BRAND, PLANS } from '@/config/constants';

interface LandingPageProps {
  onOpenApp: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp, onOpenAuth }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is Creator PGP?',
      a: 'Creator PGP is an all-in-one AI creator suite combining content generation, thumbnail vision intelligence, background removal, and multi-channel YouTube growth analytics in a single unified dashboard.',
    },
    {
      q: 'How does the Thumbnail Vision AI work?',
      a: 'Our Vision AI evaluates thumbnails across 11 visual retention and curiosity factors (including visual attention, subject contrast, text readability at mobile feed sizes, and rule-of-thirds composition) to estimate click potential and provide actionable improvements.',
    },
    {
      q: 'Does Creator PGP guarantee viral video results?',
      a: 'No platform can honestly guarantee virality. Creator PGP provides proven data-driven frameworks, high-CTR angles, and retention-optimized assets to give your content the highest statistical probability of discovery.',
    },
    {
      q: 'Can I connect multiple YouTube channels?',
      a: 'Yes. Creator PGP supports multi-channel switcher functionality, allowing you to manage long-form channels, shorts channels, and client channels from one dashboard.',
    },
    {
      q: 'Is there a free plan available?',
      a: 'Yes! The Free Creator plan includes 100 monthly credits, title & description tools, hashtag engines, and thumbnail analysis so you can experience the platform before upgrading.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Public Navigation */}
      <header className="sticky top-0 z-40 bg-[#070a14]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" priority />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">{BRAND.name}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition">Features</a>
          <a href="#tools" className="hover:text-cyan-400 transition">AI Tools</a>
          <a href="#thumbnail" className="hover:text-cyan-400 transition">Thumbnail AI</a>
          <a href="#youtube" className="hover:text-cyan-400 transition">YouTube Studio</a>
          <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
          <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
        </nav>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </button>
          <button
            onClick={onOpenApp}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
          >
            Launch Studio
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 pt-16 sm:pt-24 pb-20 text-center max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI Creator Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          AI-Powered Tools to Help Creators <span className="gradient-text">Plan, Optimize & Analyze</span> Content
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AI Creator Studio + YouTube Growth Dashboard + Content Generation Suite + 11-Factor Thumbnail Intelligence for modern creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onOpenApp}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Open {BRAND.name} Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition"
          >
            Start Free Trial
          </button>
        </div>

        {/* Feature Badges */}
        <div className="pt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Generate ×2 Multi-Angle System</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>11-Factor Vision AI Analysis</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official YouTube OAuth Integration</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mobile-First & PWA Ready</span>
          </span>
        </div>
      </section>

      {/* Live Interactive Tools Preview Section */}
      <section id="tools" className="px-4 sm:px-8 py-16 bg-[#080d1e] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Everything Your Content Pipeline Needs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built specifically for YouTube and Instagram creators looking to save hours of production time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition space-y-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">AI Content Generation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate high-retention titles, complete SEO descriptions with timestamp chapters, and categorized hashtag bundles for YouTube and Instagram.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">11-Point Thumbnail Vision</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload thumbnails to simulate eye-tracking heat, mobile legibility, subject contrast, and curiosity loops before spending credits on rendering.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-red-500/40 transition space-y-3">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 w-fit">
                <Youtube className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">YouTube Growth Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect multiple authorized YouTube channels, switch contexts seamlessly, and plan target milestones using official API data or Manual Planning Mode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-8 py-20 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Pricing Plans</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Fair Plans for Solo Creators & Studios
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Start free, upgrade as your channel grows. No surprise charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(PLANS) as (keyof typeof PLANS)[]).map((key) => {
            const plan = PLANS[key];
            const isPopular = 'popular' in plan && plan.popular;

            return (
              <div
                key={key}
                className={`p-6 sm:p-8 rounded-3xl border transition flex flex-col justify-between ${
                  isPopular
                    ? 'bg-slate-900 border-cyan-500/60 shadow-2xl shadow-cyan-500/15 relative'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <div className="text-3xl font-black text-white mb-4">{plan.price}</div>
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenApp}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition active:scale-95 ${
                    isPopular
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-8 py-16 bg-[#080d1e] border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="px-4 sm:px-8 py-12 border-t border-slate-800 bg-[#060812] text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-cyan-500/40">
            <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
          </div>
          <span className="font-bold text-base text-white tracking-tight">{BRAND.name}</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          The premier AI creator studio for YouTube and Instagram creators. Designed for high performance, mobile readiness, and verified channel growth.
        </p>
        <div className="text-[11px] text-slate-600">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
