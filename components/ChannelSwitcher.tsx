'use client';

import React, { useState } from 'react';
import { YouTubeChannel } from '@/types';
import { ChevronDown, Plus, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { Youtube } from './BrandIcons';
import Image from 'next/image';

interface ChannelSwitcherProps {
  channels: YouTubeChannel[];
  activeChannel: YouTubeChannel | null;
  onSelectChannel: (channel: YouTubeChannel) => void;
  onConnectNew: () => void;
  isManualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
}

export const ChannelSwitcher: React.FC<ChannelSwitcherProps> = ({
  channels,
  activeChannel,
  onSelectChannel,
  onConnectNew,
  isManualMode,
  onToggleManualMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between space-x-3 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition shadow-sm w-full sm:w-auto"
        >
          <div className="flex items-center space-x-2.5 truncate">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-700 shrink-0">
              <Image
                src={activeChannel?.avatarUrl || '/logo.png'}
                alt={activeChannel?.title || 'Channel'}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left truncate">
              <div className="text-xs font-semibold text-slate-200 truncate flex items-center space-x-1.5">
                <span>{activeChannel?.title || 'No Channel'}</span>
                {activeChannel?.isConnected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {activeChannel?.handle || 'Select channel'}
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        </button>

        {/* Quick Planning Mode Toggle Pill */}
        <button
          type="button"
          onClick={() => onToggleManualMode(!isManualMode)}
          title="Toggle Manual / Planning Data Mode"
          className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-xl text-[11px] font-medium border transition shrink-0 ${
            isManualMode
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {isManualMode ? 'Manual / Planning Mode' : 'Live Data'}
          </span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-50 p-2 animate-in fade-in zoom-in-95">
          <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Connected Channels ({channels.length})
          </div>

          <div className="max-h-60 overflow-y-auto py-1 space-y-1">
            {channels.map((chan) => {
              const isSelected = activeChannel?.id === chan.id;
              return (
                <div
                  key={chan.id}
                  className={`flex items-center justify-between p-2 rounded-xl transition cursor-pointer ${
                    isSelected ? 'bg-cyan-500/15 border border-cyan-500/30' : 'hover:bg-slate-800'
                  }`}
                  onClick={() => {
                    onSelectChannel(chan);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <Image src={chan.avatarUrl || '/logo.png'} alt={chan.title} fill className="object-cover" />
                    </div>
                    <div className="truncate text-left">
                      <p className="text-xs font-medium text-slate-100 truncate">{chan.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{chan.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 ml-2">
                    {chan.customUrl && (
                      <a
                        href={chan.customUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-red-400 p-1"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 mt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onConnectNew();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold shadow-md transition"
            >
              <Youtube className="w-4 h-4" />
              <span>Connect Another Channel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
