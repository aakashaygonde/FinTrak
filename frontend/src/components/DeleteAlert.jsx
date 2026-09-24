import React from "react";
import { LuTriangleAlert, LuTrash2 } from "react-icons/lu";
import { Button } from "./ui";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-600 flex items-center justify-center shrink-0">
          <LuTriangleAlert size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Confirm Deletion
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {content || "Are you sure you want to delete this record? This action cannot be undone."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          icon={LuTrash2}
          onClick={onDelete}
        >
          Delete Record
        </Button>
      </div>
    </div>
  );
};

export default DeleteAlert;
