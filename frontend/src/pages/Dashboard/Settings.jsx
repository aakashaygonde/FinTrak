import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import CharAvatar from "../../components/Cards/CharAvatar";
import { Button, Input, Select, Badge } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LuUser,
  LuMail,
  LuShieldCheck,
  LuLogOut,
  LuDollarSign,
  LuCheck,
  LuLayers,
} from "react-icons/lu";

const Settings = () => {
  useUserAuth();
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [currency, setCurrency] = useState("INR");
  const [themeMode, setThemeMode] = useState("light");

  const handleSavePreferences = () => {
    localStorage.setItem("fintrack_currency", currency);
    toast.success("Preferences saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    navigate("/login");
  };

  return (
    <DashboardLayout activeMenu="Profile & Settings">
      <div className="max-w-4xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user?.fullName || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-xs"
                />
              ) : (
                <CharAvatar
                  fullName={user?.fullName || "User"}
                  width="w-16"
                  height="h-16"
                  style="text-xl font-bold bg-indigo-50 text-indigo-700 border-2 border-indigo-200 shadow-xs"
                />
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {user?.fullName || "FinTrack User"}
                  </h3>
                  <Badge variant="success" size="sm" withDot>
                    Verified
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  FinTrack ID: {user?._id || "Local Member"}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={LuLogOut}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 self-start sm:self-auto"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>

          {/* Account Details Form */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={user?.fullName || ""}
              disabled
              icon={LuUser}
              helperText="Set at registration"
            />
            <Input
              label="Email Address"
              value={user?.email || ""}
              disabled
              icon={LuMail}
              helperText="Connected authentication email"
            />
          </div>
        </div>

        {/* Financial Preferences Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
              Platform & Currency Preferences
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize how your financial numbers and currencies are presented.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Select
              label="Preferred Currency Symbol"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={[
                { label: "₹ INR (Indian Rupee)", value: "INR" },
                { label: "$ USD (United States Dollar)", value: "USD" },
                { label: "€ EUR (Euro)", value: "EUR" },
                { label: "£ GBP (British Pound)", value: "GBP" },
              ]}
            />

            <Select
              label="Appearance Theme"
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value)}
              options={[
                { label: "FinTrack SaaS Light (Default)", value: "light" },
                { label: "System Default", value: "system" },
              ]}
            />
          </div>

          <div className="pt-3 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              icon={LuCheck}
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </div>
        </div>

        {/* Security & Data Integrity */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <LuShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                Data Privacy & Security
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                FinTrack stores your financial transactions securely with JWT bearer tokens.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">Active Authentication Session</span>
              <p className="text-slate-500 mt-0.5">JWT token active in client storage.</p>
            </div>
            <Badge variant="default" size="sm">
              Session Active
            </Badge>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
