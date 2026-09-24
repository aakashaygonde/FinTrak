import React from "react";

const InfoCard = ({ icon, label, value, color, subtitle, trend }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`w-11 h-11 flex items-center justify-center text-xl text-white ${
            color || "bg-indigo-600"
          } rounded-xl shadow-xs shrink-0`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans tabular-nums">
          ₹{value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 font-normal">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;