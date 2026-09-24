import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Button, LoadingState, Badge, ExportMenu } from "../../components/ui";
import { addThousandsSeparator } from "../../utils/helper";
import { exportToCSV, exportToExcel } from "../../utils/exportHelper";
import {
  LuPiggyBank,
  LuTrendingUp,
  LuCircleAlert,
  LuCircleCheck,
  LuPlus,
  LuSparkles,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const DEFAULT_BUDGETS = [
  { category: "Food & Dining", limit: 15000, icon: "🍔" },
  { category: "Housing & Rent", limit: 25000, icon: "🏠" },
  { category: "Transportation", limit: 8000, icon: "🚗" },
  { category: "Utilities & Bills", limit: 6000, icon: "💡" },
  { category: "Entertainment", limit: 5000, icon: "🎬" },
  { category: "Shopping", limit: 7000, icon: "🛍️" },
  { category: "Healthcare", limit: 4000, icon: "💊" },
  { category: "Other Expenses", limit: 5000, icon: "📦" },
];

const Budgets = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load custom budgets or fallback to default
  const [budgets] = useState(() => {
    const saved = localStorage.getItem("fintrack_budgets");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_BUDGETS;
      }
    }
    return DEFAULT_BUDGETS;
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
        setExpenses(res.data || []);
      } catch (err) {
        console.error("Error fetching expenses for budgets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  // Compute category spending from expenses
  const categorySpending = useMemo(() => {
    const map = {};
    expenses.forEach((item) => {
      const cat = item.category?.trim() || "Other Expenses";
      map[cat] = (map[cat] || 0) + (Number(item.amount) || 0);
    });
    return map;
  }, [expenses]);

  const budgetStats = useMemo(() => {
    let totalLimit = 0;
    let totalSpent = 0;

    const items = budgets.map((b) => {
      let spent = 0;
      Object.keys(categorySpending).forEach((cat) => {
        if (
          cat.toLowerCase().includes(b.category.toLowerCase()) ||
          b.category.toLowerCase().includes(cat.toLowerCase())
        ) {
          spent += categorySpending[cat];
        }
      });

      totalLimit += b.limit;
      totalSpent += spent;

      const percentage = Math.min(Math.round((spent / b.limit) * 100), 200);
      const remaining = b.limit - spent;

      return {
        ...b,
        spent,
        remaining,
        percentage,
      };
    });

    return {
      items,
      totalLimit,
      totalSpent,
      totalRemaining: totalLimit - totalSpent,
      overallPercentage: totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0,
    };
  }, [budgets, categorySpending]);

  const handleExportCSV = () => {
    const data = budgetStats.items.map((b) => ({
      Category: b.category,
      "Budget Limit (INR)": b.limit,
      "Spent (INR)": b.spent,
      "Remaining (INR)": b.remaining,
      "Usage (%)": `${b.percentage}%`,
      Status: b.percentage > 100 ? "Over Budget" : b.percentage >= 75 ? "Warning" : "Safe",
    }));
    exportToCSV(data, "fintrack_budgets.csv");
  };

  const handleExportExcel = () => {
    const data = budgetStats.items.map((b) => ({
      Category: b.category,
      "Budget Limit (INR)": b.limit,
      "Spent (INR)": b.spent,
      "Remaining (INR)": b.remaining,
      "Usage (%)": `${b.percentage}%`,
      Status: b.percentage > 100 ? "Over Budget" : b.percentage >= 75 ? "Warning" : "Safe",
    }));
    exportToExcel(data, "fintrack_budgets.xls", "FinTrack Monthly Budgets");
  };

  return (
    <DashboardLayout activeMenu="Budgets">
      <div className="space-y-6">
        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-300 border border-white/10">
              <LuSparkles size={13} className="text-amber-400" />
              Monthly Budget Guard
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Smart Monthly Spending Caps
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track category-level caps against real-time expenses to protect your savings and prevent month-end overspending.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <ExportMenu
              label="Export Budgets"
              variant="secondary"
              onExportExcel={handleExportExcel}
              onExportCSV={handleExportCSV}
            />

            <Button
              variant="primary"
              size="md"
              icon={LuPlus}
              onClick={() => navigate("/expense")}
            >
              Add Expense
            </Button>
          </div>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Budget Limit
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              ₹{addThousandsSeparator(budgetStats.totalLimit)}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Across 8 financial categories</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Actual Spent
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              ₹{addThousandsSeparator(budgetStats.totalSpent)}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-semibold ${
                  budgetStats.overallPercentage > 100
                    ? "text-rose-600"
                    : budgetStats.overallPercentage > 80
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {budgetStats.overallPercentage}% consumed
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Remaining Allowance
            </p>
            <h3
              className={`text-2xl font-bold mt-1 tabular-nums ${
                budgetStats.totalRemaining >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              ₹{addThousandsSeparator(Math.abs(budgetStats.totalRemaining))}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {budgetStats.totalRemaining >= 0 ? "Under total budget" : "Over budget limit"}
            </p>
          </div>
        </div>

        {/* Category Budget Cards */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Category Spending vs Budgets
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically calculated against logged expenses in your account.
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingState message="Analyzing your budget metrics..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetStats.items.map((b, idx) => {
                const isOver = b.percentage > 100;
                const isWarning = b.percentage >= 75 && !isOver;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{b.icon}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">
                            {b.category}
                          </h4>
                          <span className="text-xs text-slate-400">
                            Cap: ₹{addThousandsSeparator(b.limit)}
                          </span>
                        </div>
                      </div>

                      <Badge
                        variant={isOver ? "danger" : isWarning ? "warning" : "success"}
                        size="sm"
                        withDot
                      >
                        {isOver ? "Over Budget" : `${b.percentage}%`}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isOver
                              ? "bg-rose-500"
                              : isWarning
                              ? "bg-amber-500"
                              : "bg-indigo-600"
                          }`}
                          style={{ width: `${Math.min(b.percentage, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>Spent: ₹{addThousandsSeparator(b.spent)}</span>
                        <span>
                          {b.remaining >= 0
                            ? `Left: ₹${addThousandsSeparator(b.remaining)}`
                            : `Deficit: ₹${addThousandsSeparator(Math.abs(b.remaining))}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
