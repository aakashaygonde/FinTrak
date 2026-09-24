import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import CharAvatar from "../../components/Cards/CharAvatar";
import { Button, Input, Select, Badge, ExportMenu, Modal } from "../../components/ui";
import { exportToCSV, exportToExcel } from "../../utils/exportHelper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LuUser,
  LuMail,
  LuShieldCheck,
  LuLogOut,
  LuCheck,
  LuDownload,
} from "react-icons/lu";

const Settings = () => {
  useUserAuth();
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [currency, setCurrency] = useState(() => localStorage.getItem("fintrack_currency") || "INR");
  const [themeMode, setThemeMode] = useState("light");
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [isExportingAll, setIsExportingAll] = useState(false);

  const handleSavePreferences = () => {
    localStorage.setItem("fintrack_currency", currency);
    toast.success("Preferences updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    navigate("/login");
  };

  const handleExportAll = async (format = "xlsx") => {
    setIsExportingAll(true);
    try {
      const [expRes, incRes] = await Promise.all([
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
      ]);

      const expenses = expRes.data || [];
      const incomes = incRes.data || [];

      const combined = [
        ...expenses.map((e) => ({
          Type: "Expense",
          "Category / Source": e.category,
          "Amount (INR)": e.amount,
          Date: e.date ? new Date(e.date).toISOString().split("T")[0] : "",
        })),
        ...incomes.map((i) => ({
          Type: "Income",
          "Category / Source": i.source,
          "Amount (INR)": i.amount,
          Date: i.date ? new Date(i.date).toISOString().split("T")[0] : "",
        })),
      ].sort((a, b) => new Date(b.Date) - new Date(a.Date));

      if (format === "csv") {
        exportToCSV(combined, "fintrack_full_backup.csv");
      } else {
        exportToExcel(combined, "fintrack_full_backup.xls", "FinTrack Complete Ledger");
      }
    } catch (err) {
      console.error("Error creating full export", err);
      toast.error("Failed to export complete backup data");
    } finally {
      setIsExportingAll(false);
    }
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
              onClick={() => setShowSignoutModal(true)}
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
              helperText="Set during account registration"
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

        {/* Data Export & Portability Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                Data Portability & Full Backup
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Download a complete, uncompressed ledger of all your income and expenses.
              </p>
            </div>

            <ExportMenu
              label={isExportingAll ? "Exporting..." : "Export Complete Data"}
              disabled={isExportingAll}
              onExportExcel={() => handleExportAll("xlsx")}
              onExportCSV={() => handleExportAll("csv")}
            />
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

        {/* Sign Out Confirmation Modal */}
        <Modal
          isOpen={showSignoutModal}
          onClose={() => setShowSignoutModal(false)}
          title="Sign Out Confirmation"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <LuLogOut size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Are you sure you want to sign out?
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your local authentication session will be cleared. You can sign back in anytime with your email and password.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSignoutModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={LuLogOut}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
