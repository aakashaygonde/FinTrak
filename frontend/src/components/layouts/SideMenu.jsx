import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import Logo from "./Logo";
import { LuLogOut, LuChevronRight } from "react-icons/lu";

const SideMenu = ({ activeMenu, onItemClick }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    navigate("/login");
  };

  const handleNav = (path) => {
    if (path === "logout" || path === "/logout") {
      handleLogout();
      return;
    }
    navigate(path);
    if (onItemClick) onItemClick();
  };

  const isActive = (item) => {
    if (activeMenu) {
      if (activeMenu.toLowerCase() === item.label.toLowerCase()) return true;
      if (item.subItems?.some((sub) => sub.label.toLowerCase() === activeMenu.toLowerCase()))
        return true;
    }
    if (location.pathname === item.path) return true;
    if (item.subItems?.some((sub) => location.pathname === sub.path)) return true;
    return false;
  };

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200/80 flex flex-col justify-between select-none">
      {/* Top Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Logo size="md" showSubtitle={true} linkTo="/dashboard" />
        </div>

        {/* Navigation Section */}
        <div className="p-3.5 space-y-1">
          <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Overview
          </p>

          {SIDE_MENU_DATA.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={active ? "text-white" : "text-slate-500"} />
                    <span>{item.label}</span>
                  </div>

                  {item.subItems && (
                    <LuChevronRight
                      size={14}
                      className={`transition-transform ${
                        active ? "text-indigo-200" : "text-slate-400"
                      }`}
                    />
                  )}
                </button>

                {/* Sub-items for Transactions (Expenses & Income) */}
                {item.subItems && active && (
                  <div className="pl-9 pr-2 py-1 space-y-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive =
                        location.pathname === sub.path ||
                        activeMenu?.toLowerCase() === sub.label.toLowerCase();

                      return (
                        <button
                          key={sub.path}
                          type="button"
                          onClick={() => handleNav(sub.path)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                            isSubActive
                              ? "bg-indigo-50 text-indigo-700 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <SubIcon
                            size={14}
                            className={isSubActive ? "text-indigo-600" : "text-slate-400"}
                          />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
          <Link
            to="/settings"
            onClick={onItemClick}
            className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition-opacity"
          >
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user?.fullName || "User"}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName || "User"}
                width="w-9"
                height="h-9"
                style="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {user?.fullName || "FinTrack User"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || "Personal Plan"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ml-1"
          >
            <LuLogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
