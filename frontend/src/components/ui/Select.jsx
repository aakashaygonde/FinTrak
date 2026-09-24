import React from "react";
import { LuChevronDown } from "react-icons/lu";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  id,
  required = false,
  disabled = false,
  className = "",
  placeholder = "Select an option",
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-slate-700 tracking-wide flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative w-full">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none bg-white border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-slate-900 outline-none transition-all duration-150 ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
              : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/15"
          } ${disabled ? "bg-slate-50 opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const labelText = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={idx} value={val}>
                {labelText}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <LuChevronDown size={16} />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Select;
