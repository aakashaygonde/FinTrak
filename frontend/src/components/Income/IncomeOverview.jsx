import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { Button } from "../ui";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
            Income Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your earnings over time and analyze your revenue streams.
          </p>
        </div>

        <Button
          variant="success"
          size="sm"
          icon={LuPlus}
          onClick={onAddIncome}
          className="self-start sm:self-auto shrink-0"
        >
          Add Income
        </Button>
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;