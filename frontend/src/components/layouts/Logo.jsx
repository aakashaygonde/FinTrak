import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ size = "md", showSubtitle = false, linkTo = "/dashboard", className = "" }) => {
  const sizeMap = {
    sm: { icon: "w-7 h-7", text: "text-base", sub: "text-[10px]" },
    md: { icon: "w-8 h-8", text: "text-lg", sub: "text-[11px]" },
    lg: { icon: "w-10 h-10", text: "text-2xl", sub: "text-xs" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* FinTrack Geometric Brand Mark */}
      <div
        className={`${currentSize.icon} bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-xs shrink-0 text-white font-bold tracking-wider`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[60%] h-[60%]"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-slate-900 ${currentSize.text}`}>
            Fin<span className="text-indigo-600">Track</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-slate-500 font-medium mt-0.5 tracking-tight ${currentSize.sub}`}>
            Personal Finance Platform
          </span>
        )}
      </div>
    </div>
  );

  return linkTo ? <Link to={linkTo} className="inline-flex">{content}</Link> : content;
};

export default Logo;
