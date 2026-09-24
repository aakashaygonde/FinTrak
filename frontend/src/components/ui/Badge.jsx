import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  withDot = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    danger: "bg-rose-50 text-rose-700 border-rose-200/60",
    warning: "bg-amber-50 text-amber-700 border-amber-200/60",
    info: "bg-sky-50 text-sky-700 border-sky-200/60",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const dots = {
    default: "bg-indigo-500",
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    neutral: "bg-slate-500",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-tight ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {withDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dots[variant] || dots.default
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
