import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  required = false,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const isPassword = type === "password";
  const actualType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 tracking-wide flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      <div
        className={`w-full flex items-center gap-2.5 bg-white border rounded-lg px-3.5 py-2.5 transition-all duration-150 ${
          error
            ? "border-rose-400 focus-within:border-rose-500 focus-within:ring-3 focus-within:ring-rose-500/15"
            : "border-slate-200 focus-within:border-indigo-600 focus-within:ring-3 focus-within:ring-indigo-600/15"
        } ${disabled ? "bg-slate-50 opacity-60 cursor-not-allowed" : ""}`}
      >
        {Icon && <Icon className="text-slate-400 shrink-0" size={17} />}

        <input
          id={inputId}
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none disabled:cursor-not-allowed"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer focus:outline-none"
          >
            {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
