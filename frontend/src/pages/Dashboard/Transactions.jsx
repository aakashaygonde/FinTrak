import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import { Button, Input, Select, LoadingState, EmptyState } from "../../components/ui";
import { addThousandsSeparator } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  LuSearch,
  LuPlus,
  LuArrowDownLeft,
  LuArrowUpRight,
  LuDownload,
  LuFilter,
} from "react-icons/lu";
import toast from "react-hot-toast";

const Transactions = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'expense' | 'income'
  const [sortBy, setSortBy] = useState("date-desc");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, incRes] = await Promise.all([
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
      ]);

      setExpenses(expRes.data || []);
      setIncomes(incRes.data || []);
    } catch (err) {
      console.error("Error fetching transactions", err);
      toast.error("Could not load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Combine and normalize transactions
  const combinedTransactions = useMemo(() => {
    const expList = expenses.map((item) => ({
      ...item,
      id: item._id,
      title: item.category,
      type: "expense",
      rawDate: new Date(item.date),
      displayDate: moment(item.date).format("Do MMM YYYY"),
    }));

    const incList = incomes.map((item) => ({
      ...item,
      id: item._id,
      title: item.source,
      type: "income",
      rawDate: new Date(item.date),
      displayDate: moment(item.date).format("Do MMM YYYY"),
    }));

    let all = [];
    if (activeTab === "all") {
      all = [...expList, ...incList];
    } else if (activeTab === "expense") {
      all = expList;
    } else {
      all = incList;
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      all = all.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.amount.toString().includes(q)
      );
    }

    // Sorting
    all.sort((a, b) => {
      if (sortBy === "date-desc") return b.rawDate - a.rawDate;
      if (sortBy === "date-asc") return a.rawDate - b.rawDate;
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

    return all;
  }, [expenses, incomes, activeTab, searchQuery, sortBy]);

  const totalExpenseVal = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalIncomeVal = incomes.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const netCashflow = totalIncomeVal - totalExpenseVal;

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="space-y-6">
        {/* Header Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Inflow
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                ₹{addThousandsSeparator(totalIncomeVal)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <LuArrowDownLeft size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Outflow
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                ₹{addThousandsSeparator(totalExpenseVal)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <LuArrowUpRight size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Net Cashflow
              </p>
              <h3
                className={`text-xl sm:text-2xl font-bold mt-1 tabular-nums ${
                  netCashflow >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {netCashflow >= 0 ? "+" : "-"}₹{addThousandsSeparator(Math.abs(netCashflow))}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <LuFilter size={20} />
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Tab switchers */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({expenses.length + incomes.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("expense")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === "expense"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Expenses ({expenses.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("income")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === "income"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Income ({incomes.length})
              </button>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={LuPlus}
                onClick={() => navigate("/income")}
              >
                Add Income
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={LuPlus}
                onClick={() => navigate("/expense")}
              >
                Add Expense
              </Button>
            </div>
          </div>

          {/* Search bar & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            <div className="sm:col-span-2">
              <Input
                placeholder="Search by category, source, or amount..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={LuSearch}
              />
            </div>
            <div>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { label: "Newest First", value: "date-desc" },
                  { label: "Oldest First", value: "date-asc" },
                  { label: "Highest Amount", value: "amount-desc" },
                  { label: "Lowest Amount", value: "amount-asc" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
            <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
              Transaction History ({combinedTransactions.length})
            </h4>
            <span className="text-xs text-slate-400">
              Showing filtered results
            </span>
          </div>

          {loading ? (
            <LoadingState message="Fetching all transactions..." />
          ) : combinedTransactions.length === 0 ? (
            <EmptyState
              title="No transactions found"
              description="No transaction matching your current filter criteria was found."
              actionText="Manage Expenses"
              onAction={() => navigate("/expense")}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {combinedTransactions.map((tx) => (
                <TransactionInfoCard
                  key={`${tx.type}_${tx.id}`}
                  title={tx.title}
                  icon={tx.icon}
                  date={tx.displayDate}
                  amount={tx.amount}
                  type={tx.type}
                  hideDeleteBtn={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
