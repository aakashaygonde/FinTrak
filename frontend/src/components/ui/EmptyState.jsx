import React from "react";
import { LuFolderOpen } from "react-icons/lu";
import Button from "./Button";

const EmptyState = ({
  icon: Icon = LuFolderOpen,
  title = "No records found",
  description = "Get started by adding your first transaction to see financial insights here.",
  actionText,
  onAction,
  actionIcon,
  className = "",
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white rounded-xl border border-dashed border-slate-200 ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-3.5 shadow-xs">
        <Icon size={24} />
      </div>

      <h4 className="text-sm font-semibold text-slate-800 tracking-tight">
        {title}
      </h4>

      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5 leading-relaxed">
        {description}
      </p>

      {actionText && onAction && (
        <Button
          size="sm"
          variant="primary"
          icon={actionIcon}
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
