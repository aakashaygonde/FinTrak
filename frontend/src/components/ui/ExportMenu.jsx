import React, { useState, useRef, useEffect } from "react";
import { LuDownload, LuFileSpreadsheet, LuFileText, LuChevronDown } from "react-icons/lu";
import Button from "./Button";

const ExportMenu = ({
  onExportExcel,
  onExportCSV,
  disabled = false,
  label = "Export",
  size = "sm",
  variant = "outline",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleExcel = () => {
    setIsOpen(false);
    if (onExportExcel) onExportExcel();
  };

  const handleCSV = () => {
    setIsOpen(false);
    if (onExportCSV) onExportCSV();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        icon={LuDownload}
        className="gap-1.5"
      >
        <span>{label}</span>
        <LuChevronDown
          size={14}
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1.5 z-40 focus:outline-none animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Export Format
          </div>

          <button
            type="button"
            onClick={handleExcel}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <LuFileSpreadsheet size={16} className="text-emerald-600" />
            <div>
              <p className="font-semibold">Excel Spreadsheet</p>
              <p className="text-[10px] text-slate-400">Microsoft Excel (.xlsx)</p>
            </div>
          </button>

          <button
            type="button"
            onClick={handleCSV}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <LuFileText size={16} className="text-indigo-600" />
            <div>
              <p className="font-semibold">Comma-Separated</p>
              <p className="text-[10px] text-slate-400">Standard CSV (.csv)</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
