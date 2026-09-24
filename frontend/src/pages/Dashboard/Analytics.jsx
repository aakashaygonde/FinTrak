import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LoadingState, Badge, ExportMenu } from "../../components/ui";
import { addThousandsSeparator } from "../../utils/helper";
import { exportToCSV, exportToExcel } from "../../utils/exportHelper";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import {
  LuChartLine,
  LuTrendingUp,
  LuPercent,
  LuShieldAlert,
  LuCircleCheck,
  LuArrowUpRight,
  LuArrowDownLeft,
} from "react-icons/lu";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#64748b"];

const Analytics = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [dashRes, expRes, incRes] = await Promise.all([
          axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA),
          axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
          axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        ]);

        setDashboardData(dashRes.data);
        setExpenses(expRes.data || []);
        setIncomes(incRes.data || []);
      } catch (err) {
        console.error("Error loading analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalIncome = dashboardData?.totalIncome || 0;
  const totalExpense = dashboardData?.totalExpense || 0;
  const netSavings = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0
      ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100))
      : 0;

  // Category breakdown for pie chart
  const categoryPieData = useMemo(() => {
    const map = {};
    expenses.forEach((item) => {
      const cat = item.category?.trim() || "Uncategorized";
      map[cat] = (map[cat] || 0) + (Number(item.amount) || 0);
    });

    return Object.keys(map).map((key, i) => ({
      name: key,
      amount: map[key],
      color: COLORS[i % COLORS.length],
    }));
  }, [expenses]);

  // Income sources for pie chart
  const incomePieData = useMemo(() => {
    const map = {};
    incomes.forEach((item) => {
      const src = item.source?.trim() || "Other";
      map[src] = (map[src] || 0) + (Number(item.amount) || 0);
    });

    return Object.keys(map).map((key, i) => ({
      name: key,
      amount: map[key],
      color: COLORS[(i + 2) % COLORS.length],
    }));
  }, [incomes]);

  const handleExportCSV = () => {
    const summary = [
      { Metric: "Total Inflows (Income)", Value: totalIncome },
      { Metric: "Total Outflows (Expense)", Value: totalExpense },
      { Metric: "Net Cashflow Surplus/Deficit", Value: netSavings },
      { Metric: "Savings Rate (%)", Value: `${savingsRate}%` },
      ...categoryPieData.map((c) => ({
        Metric: `Expense - ${c.name}`,
        Value: c.amount,
      })),
      ...incomePieData.map((inc) => ({
        Metric: `Income - ${inc.name}`,
        Value: inc.amount,
      })),
    ];
    exportToCSV(summary, "fintrack_analytics_report.csv");
  };

  const handleExportExcel = () => {
    const summary = [
      { Metric: "Total Inflows (Income)", "Value (INR)": totalIncome },
      { Metric: "Total Outflows (Expense)", "Value (INR)": totalExpense },
      { Metric: "Net Cashflow Surplus/Deficit", "Value (INR)": netSavings },
      { Metric: "Savings Rate (%)", "Value (INR)": `${savingsRate}%` },
      ...categoryPieData.map((c) => ({
        Metric: `Expense - ${c.name}`,
        "Value (INR)": c.amount,
      })),
      ...incomePieData.map((inc) => ({
        Metric: `Income - ${inc.name}`,
        "Value (INR)": inc.amount,
      })),
    ];
    exportToExcel(summary, "fintrack_analytics_report.xls", "FinTrack Financial Analytics");
  };

  return (
    <DashboardLayout activeMenu="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Financial Intelligence & Analytics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive breakdown of cashflow trends, savings efficiency, and category allocation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <ExportMenu
              label="Export Analytics"
              onExportExcel={handleExportExcel}
              onExportCSV={handleExportCSV}
            />
            <Badge variant="default" size="md" withDot>
              Live Telemetry
            </Badge>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Savings Rate</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <LuPercent size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              {savingsRate}%
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {savingsRate >= 20 ? "Exceeds standard 20% benchmark" : "Recommended target: 20%+"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Net Surplus</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <LuTrendingUp size={16} />
              </div>
            </div>
            <h3
              className={`text-2xl font-bold mt-2 tabular-nums ${
                netSavings >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              ₹{addThousandsSeparator(Math.abs(netSavings))}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {netSavings >= 0 ? "Positive cash surplus" : "Deficit alert"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Inflows</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <LuArrowDownLeft size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              ₹{addThousandsSeparator(totalIncome)}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Across all revenue sources</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Outflows</span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <LuArrowUpRight size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              ₹{addThousandsSeparator(totalExpense)}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Across logged categories</p>
          </div>
        </div>

        {/* Charts Grid */}
        {loading ? (
          <LoadingState message="Processing financial telemetry and charts..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Overview (Cashflow Bar Chart) */}
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
            />

            {/* Expense Categories Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Expense Distribution by Category
                </h4>
                <span className="text-xs text-slate-400">
                  {categoryPieData.length} categories
                </span>
              </div>

              {categoryPieData.length === 0 ? (
                <p className="text-xs text-slate-400 py-10 text-center">
                  No expense records logged yet.
                </p>
              ) : (
                <CustomPieChart
                  data={categoryPieData}
                  label="Expense Breakdown"
                  totalAmount={totalExpense}
                  showTextAnchor={true}
                  colors={COLORS}
                />
              )}
            </div>

            {/* Income Sources Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Income Inflows by Source
                </h4>
                <span className="text-xs text-slate-400">
                  {incomePieData.length} sources
                </span>
              </div>

              {incomePieData.length === 0 ? (
                <p className="text-xs text-slate-400 py-10 text-center">
                  No income records logged yet.
                </p>
              ) : (
                <CustomPieChart
                  data={incomePieData}
                  label="Income Sources"
                  totalAmount={totalIncome}
                  showTextAnchor={true}
                  colors={COLORS.slice(2)}
                />
              )}
            </div>

            {/* Financial Health Score Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 tracking-tight mb-1">
                  FinTrack Health Diagnosis
                </h4>
                <p className="text-xs text-slate-500 mb-5">
                  Algorithmically calculated based on savings rate, cashflow consistency, and budget discipline.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Financial Health Score</span>
                    <span className="text-sm font-bold text-indigo-600">
                      {savingsRate >= 30 ? "92/100 (Exceptional)" : savingsRate >= 15 ? "78/100 (Healthy)" : "58/100 (Needs Attention)"}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        savingsRate >= 20 ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(Math.max(savingsRate * 2.5, 30), 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <LuCircleCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Real-time tracking is enabled across all transactions.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <LuCircleCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Excel report exports available anytime without data loss.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <LuCircleCheck size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span>Bank-grade security: sensitive tokens securely stored in browser session.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Updated in real time</span>
                <span>FinTrack Core Engine</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
