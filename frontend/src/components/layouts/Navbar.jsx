import React, { useContext } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import Logo from "./Logo";
import { LuPlus, LuBell } from "react-icons/lu";

const Navbar = ({ activeMenu, onToggleMobileMenu }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu Trigger + Brand / Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <HiOutlineMenu className="text-xl" />
          </button>

          {/* Show Logo on Mobile, Breadcrumb on Desktop */}
          <div className="lg:hidden">
            <Logo size="sm" linkTo="/dashboard" />
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-slate-400 font-normal">Platform</span>
            <span className="text-slate-300">/</span>
            <h1 className="font-semibold text-slate-800 tracking-tight text-sm md:text-base">
              {activeMenu || "Dashboard"}
            </h1>
          </div>
        </div>

        {/* Right Section: Quick Action + Notification + User Avatar */}
        <div className="flex items-center gap-3">
          {/* Quick Action: New Transaction */}
          <button
            type="button"
            onClick={() => navigate("/expense")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <LuPlus size={15} />
            <span className="hidden sm:inline">Add Expense</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/income")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-lg transition-colors cursor-pointer"
          >
            <LuPlus size={15} />
            <span>Add Income</span>
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* User Profile Quick Link */}
          <Link
            to="/settings"
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-100 transition-all"
            title="Profile & Settings"
          >
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user?.fullName || "User"}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName || "User"}
                width="w-8"
                height="h-8"
                style="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
              />
            )}
            <span className="hidden md:inline-block text-xs font-semibold text-slate-700">
              {user?.fullName?.split(" ")[0] || "User"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
