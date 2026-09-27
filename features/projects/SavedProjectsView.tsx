'use client';

import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Folder,
  Trash2,
  Edit2,
  FileText,
  Calendar,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Project } from '@/types';

interface SavedProjectsViewProps {
  projects: Project[];
  onCreateProject: (title: string, description?: string) => void;
  onRenameProject: (id: string, newTitle: string) => void;
  onDeleteProject: (id: string) => void;
  onNavigateToStudio: () => void;
}

export const SavedProjectsView: React.FC<SavedProjectsViewProps> = ({
  projects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  onNavigateToStudio,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreateProject(newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setIsCreating(false);
  };

  const handleStartRename = (proj: Project) => {
    setEditingId(proj.id);
    setRenameValue(proj.title);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      onRenameProject(id, renameValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Saved Content Projects</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Organize multi-part video series, campaign assets, titles, descriptions, and thumbnail tests into structured folders.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2 self-start active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Project Folder</span>
          </button>
        </div>
      </div>

      {/* Create Project Modal/Drawer */}
      {isCreating && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl animate-in fade-in space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Content Project</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. AI Productivity Series Q4"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description (Optional)</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Brief summary of what this project covers..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Create Folder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Selected Project Deep-Dive View */}
      {selectedProject ? (
        <div className="space-y-4 animate-in fade-in">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedProject.description || 'No description provided.'}</p>
              </div>

              <button
                onClick={onNavigateToStudio}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add AI Content to Project</span>
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Saved Items ({selectedProject.items?.length || 0})
              </span>

              {(!selectedProject.items || selectedProject.items.length === 0) ? (
                <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-500 text-xs">
                  This project folder is empty. Use the AI Content Studio to generate titles or descriptions and save them directly here.
                </div>
              ) : (
                selectedProject.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                        {item.type}
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-slate-200">{item.title}</h5>
                      <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                        {JSON.stringify(item.data)}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Projects List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => {
            const isEditing = editingId === proj.id;

            return (
              <div
                key={proj.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition group shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                      <Folder className="w-5 h-5" />
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleStartRename(proj)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title="Rename"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            onDeleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="flex items-center space-x-2 my-2">
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="px-2 py-1 bg-slate-950 border border-cyan-500 rounded-lg text-xs text-white w-full"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(proj.id)}
                        className="p-1 bg-emerald-500 text-slate-950 rounded-lg"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                      {proj.title}
                    </h4>
                  )}

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {proj.description || 'No description provided.'}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {proj.itemCount || 0} Assets
                  </span>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold transition"
                  >
                    <span>Open Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
