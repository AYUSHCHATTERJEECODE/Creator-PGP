'use client';

import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Copy,
  Check,
  Trash2,
  Eye,
  RefreshCw,
  FolderPlus,
  SlidersHorizontal,
} from 'lucide-react';
import { ContentHistoryRecord, ToolType } from '@/types';

interface ContentHistoryViewProps {
  history: ContentHistoryRecord[];
  onDeleteHistoryItem: (id: string) => void;
  onCopyText: (text: string) => void;
  onRegenerateItem: (item: ContentHistoryRecord) => void;
}

export const ContentHistoryView: React.FC<ContentHistoryViewProps> = ({
  history,
  onDeleteHistoryItem,
  onCopyText,
  onRegenerateItem,
}) => {
  const [search, setSearch] = useState('');
  const [filterTool, setFilterTool] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<ContentHistoryRecord | null>(null);

  const handleCopy = (id: string, text: string) => {
    onCopyText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHistory = history.filter((item) => {
    const matchesTool = filterTool === 'all' || item.toolType === filterTool;
    const searchLower = search.toLowerCase();
    const topic = (item.input?.topic || item.input?.existingTitle || '').toLowerCase();
    const toolName = (item.toolName || '').toLowerCase();
    const outputString = JSON.stringify(item.output || '').toLowerCase();
    const matchesSearch = !search || topic.includes(searchLower) || toolName.includes(searchLower) || outputString.includes(searchLower);
    return matchesTool && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Persistent Content History</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Search and manage your generated titles, descriptions, hashtags, video hooks, and thumbnail analyses.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {filteredHistory.length} Total Records
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by topic, keyword, or tool output..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={filterTool}
            onChange={(e) => setFilterTool(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All AI Tools</option>
            <option value="title_generator">Title Generator</option>
            <option value="description_generator">Description Generator</option>
            <option value="viral_hashtags">Viral Hashtags</option>
            <option value="daily_video_generator">Daily Video Generator</option>
            <option value="similar_content">Similar Content</option>
            <option value="thumbnail_analyzer">Thumbnail Vision AI</option>
            <option value="reel_hook">Reel Hooks</option>
          </select>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-500 text-sm">
          No records found matching your filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((record) => {
            let outputPreview = '';
            if (record.output?.titles) {
              outputPreview = record.output.titles.map((t: any) => `• ${t.title}`).join('\n');
            } else if (record.output?.title) {
              outputPreview = `${record.output.title}\n\n${record.output.description || ''}`;
            } else if (record.output?.youtubeHashtags) {
              outputPreview = record.output.youtubeHashtags.join(' ');
            } else if (record.output?.ideas) {
              outputPreview = record.output.ideas.map((id: any) => `• ${id.title}: ${id.hook}`).join('\n');
            } else if (record.output?.overallScore) {
              outputPreview = `Thumbnail Score: ${record.output.overallScore}/100\n${record.output.whyThisScore?.join('\n') || ''}`;
            } else if (typeof record.output === 'string') {
              outputPreview = record.output;
            }

            return (
              <div
                key={record.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                      {record.toolName}
                    </span>
                    <span className="text-xs text-slate-400">
                      Topic: <strong>{record.input?.topic || record.input?.existingTitle || 'N/A'}</strong>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span>{new Date(record.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 font-mono whitespace-pre-line max-h-36 overflow-y-auto leading-relaxed">
                  {outputPreview || JSON.stringify(record.output, null, 2)}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setActiveModalItem(record)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => handleCopy(record.id, outputPreview)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition flex items-center space-x-1"
                    >
                      {copiedId === record.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy</span>
                    </button>

                    <button
                      onClick={() => onRegenerateItem(record)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this record?')) {
                        onDeleteHistoryItem(record.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{activeModalItem.toolName} Details</h3>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Input Payload</span>
              <pre className="p-3 bg-slate-950 rounded-xl text-xs text-cyan-300 overflow-x-auto mt-1">
                {JSON.stringify(activeModalItem.input, null, 2)}
              </pre>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Generated Output</span>
              <pre className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 overflow-x-auto mt-1 whitespace-pre-wrap">
                {JSON.stringify(activeModalItem.output, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
