import React from 'react';

export const ShimmerCard: React.FC<{ height?: string; className?: string }> = ({
  height = 'h-32',
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/30 p-5 ${height} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="h-4 bg-slate-700/50 rounded w-1/3 mb-4" />
      <div className="h-8 bg-slate-700/40 rounded w-2/3 mb-3" />
      <div className="h-3 bg-slate-700/30 rounded w-1/2" />
    </div>
  );
};

export const AIProcessingState: React.FC<{ message: string; subtext?: string }> = ({
  message,
  subtext = 'Processing with Creator PGP Neural Models...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-md text-center my-6">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 opacity-20" />
      </div>
      <h4 className="text-base font-semibold text-slate-100 mb-1">{message}</h4>
      <p className="text-xs text-slate-400 max-w-xs">{subtext}</p>
    </div>
  );
};
