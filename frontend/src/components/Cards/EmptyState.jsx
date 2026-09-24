import React from "react";
import { LuFolderOpen } from "react-icons/lu";
import { Button } from "../ui";

const EmptyState = ({
  icon: Icon = LuFolderOpen,
  title = "No data found",
  message = "There are no records to display yet.",
  description,
  actionText,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center my-2 bg-slate-50/60 border border-dashed border-slate-200 rounded-xl">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-3">
        <Icon size={22} />
      </div>
      <h5 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h5>
      <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
        {description || message}
      </p>
      {actionText && onAction && (
        <div className="mt-4">
          <Button
            size="sm"
            variant="primary"
            icon={actionIcon}
            onClick={onAction}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
