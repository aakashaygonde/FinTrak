import React from "react";
import { LuTriangleAlert, LuRefreshCw } from "react-icons/lu";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  message = "Failed to load financial records. Please check your network connection and try again.",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center p-8 bg-rose-50/50 rounded-xl border border-rose-200/80 ${className}`}
      role="alert"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-3 shadow-xs">
        <LuTriangleAlert size={24} />
      </div>

      <h4 className="text-sm font-semibold text-rose-900 tracking-tight">
        {title}
      </h4>

      <p className="text-xs text-rose-700 max-w-sm mt-1 mb-5 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          className="border-rose-300 text-rose-700 hover:bg-rose-100 bg-white"
          icon={LuRefreshCw}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
