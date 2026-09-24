import React from "react";

export const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 ${
        hover ? "hover:shadow-sm hover:border-slate-300 transition-all duration-200" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 pb-4 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-base font-semibold text-slate-900 tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-xs text-slate-500 font-normal leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`pt-4 mt-4 border-t border-slate-100 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

export default Card;
