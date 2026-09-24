import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";
import { Button } from "../ui";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
            Expense Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your spending patterns and analyze month-to-date expenses.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={LuPlus}
          onClick={onExpenseIncome}
          className="self-start sm:self-auto shrink-0"
        >
          Add Expense
        </Button>
      </div>

      <div className="mt-8">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;