import React from "react";
import { LuFileQuestion } from "react-icons/lu";

const EmptyState = ({
  icon: Icon = LuFileQuestion,
  title = "No data found",
  message = "There are no records to display yet.",
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center my-3 bg-slate-50/60 border border-dashed border-gray-200 rounded-xl">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 text-primary mb-3">
        <Icon size={24} />
      </div>
      <h6 className="text-sm font-semibold text-gray-700">{title}</h6>
      <p className="text-xs text-gray-400 mt-1 max-w-xs">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 text-xs font-medium text-white bg-primary hover:bg-purple-600 px-3.5 py-1.5 rounded-lg transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
