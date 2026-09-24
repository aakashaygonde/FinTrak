import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { LuX } from "react-icons/lu";

const DashboardLayout = ({ children, activeMenu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-20">
        <SideMenu activeMenu={activeMenu} />
      </aside>

      {/* 2. Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Inside Drawer */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 z-30 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <LuX size={20} />
            </button>

            <SideMenu
              activeMenu={activeMenu}
              onItemClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Main Content Viewport */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Navbar
          activeMenu={activeMenu}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        <footer className="border-t border-slate-200/80 bg-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
            <p className="font-medium text-slate-600">Personal Finance & Expense Management Platform</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
