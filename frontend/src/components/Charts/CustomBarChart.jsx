import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";




const BarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const label = item.category || item.source || item.name || "Item";
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {label}
        </p>
        <p className="text-sm text-gray-700">
          Amount: <span className="font-semibold text-gray-900">₹{item.amount}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data = [] }) => {
  const COLORS = ["#875cf5", "#90b9ff"]; // Alternate colors

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No transaction data to display
      </div>
    );
  }

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none"/>
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<BarTooltip />} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} /> 
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
