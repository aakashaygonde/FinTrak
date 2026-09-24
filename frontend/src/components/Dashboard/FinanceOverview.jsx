import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#10B981", "#FA2C37"]; // Green for Income, Red for Expense

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
  const hasData = totalIncome > 0 || totalExpense > 0;
  
  const balanceData = hasData
    ? [
        { name: "Total Income", amount: Math.max(0, totalIncome) },
        { name: "Total Expense", amount: Math.max(0, totalExpense) },
      ]
    : [
        { name: "No Transactions", amount: 1 },
      ];

  const chartColors = hasData ? COLORS : ["#E2E8F0"];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-medium'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance || 0)}`}
        colors={chartColors}
      />
    </div>
  );
};

export default FinanceOverview;
