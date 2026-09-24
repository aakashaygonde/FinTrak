import React from "react";
import Logo from "./Logo";
import { LuShieldCheck, LuTrendingUp, LuChartPie, LuSparkles } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Form Area */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white shadow-xs">
        <div>
          <Logo size="md" showSubtitle={true} linkTo="/login" />
        </div>

        <div className="my-auto py-8 max-w-md w-full mx-auto">
          {children}
        </div>

        {/* Security / Trust Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <LuShieldCheck size={16} />
            <span>Encrypted & Secure</span>
          </div>
          <span>FinTrack Platform</span>
        </div>
      </div>

      {/* Right Modern FinTech Showcase (visible on lg+) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-12 xl:p-16 flex-col justify-between overflow-hidden">
        {/* Subtle geometric light orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-300 border border-white/10 backdrop-blur-md">
            <LuSparkles size={13} className="text-amber-400" />
            FinTrack v2.0
          </span>
        </div>

        {/* Center Content / Mockup Showcase */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
            Take complete command of your personal finances.
          </h2>
          <p className="text-sm xl:text-base text-slate-300 font-normal leading-relaxed">
            Monitor real-time cashflow, eliminate unnecessary spending, and forecast your savings with an intelligent personal finance platform.
          </p>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                <LuTrendingUp size={18} />
              </div>
              <h4 className="text-sm font-semibold text-white">Smart Analytics</h4>
              <p className="text-xs text-slate-400 mt-1">
                Visual expense trends, category breakdowns, and income reports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <LuChartPie size={18} />
              </div>
              <h4 className="text-sm font-semibold text-white">Budget Discipline</h4>
              <p className="text-xs text-slate-400 mt-1">
                Set category limits and avoid surprise end-of-month deficits.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof / Stat */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} FinTrack Personal Finance Platform</p>
          <div className="flex items-center gap-4">
            <span>Enterprise Security</span>
            <span>•</span>
            <span>Private Local Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
