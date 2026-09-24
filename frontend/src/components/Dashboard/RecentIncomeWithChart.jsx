import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#875CF5", "#38BDF8", "#F59E0B", "#10B981", "#EC4899"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        if (!data || data.length === 0) {
            setChartData([{ name: "No Income", amount: 1 }]);
            return;
        }

        const grouped = data.reduce((acc, item) => {
            const key = item?.source || "Other";
            acc[key] = (acc[key] || 0) + (Number(item?.amount) || 0);
            return acc;
        }, {});

        const dataArr = Object.entries(grouped).map(([name, amount]) => ({
            name,
            amount,
        }));

        setChartData(dataArr);
    }, [data]);

    const hasData = data && data.length > 0;
    const colors = hasData ? COLORS : ["#E2E8F0"];

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-medium'>Last 60 Days Income</h5>
        </div>

        <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`₹${addThousandsSeparator(totalIncome || 0)}`}
            colors={colors}
            />
    </div>
  )
}

export default RecentIncomeWithChart