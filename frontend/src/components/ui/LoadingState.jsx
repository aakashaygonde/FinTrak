import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

export const LoadingSpinner = ({ size = 24, className = "" }) => {
  return (
    <LuLoaderCircle
      size={size}
      className={`animate-spin text-indigo-600 ${className}`}
    />
  );
};

export const SkeletonCard = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 p-6 animate-pulse space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
      </div>
      <div className="h-8 bg-slate-200 rounded w-1/2" />
      <div className="h-3 bg-slate-100 rounded w-2/3" />
    </div>
  );
};

export const SkeletonList = ({ count = 3, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3.5 bg-slate-200 rounded w-28" />
              <div className="h-2.5 bg-slate-200 rounded w-16" />
            </div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
      ))}
    </div>
  );
};

const LoadingState = ({ message = "Loading financial data...", minHeight = "min-h-[280px]" }) => {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 bg-white/60 rounded-xl border border-slate-200/60`}
    >
      <LoadingSpinner size={32} />
      <p className="text-xs font-medium text-slate-500 mt-3 tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
