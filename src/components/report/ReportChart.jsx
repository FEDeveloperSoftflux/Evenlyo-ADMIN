import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ReportChart = () => {
  // Sample data for yearly earnings overview matching the image
  const chartData = [
    { month: 'May 23', value: 3200 },
    { month: 'Jun 23', value: 3000 },
    { month: 'Jul 23', value: 2800 },
    { month: 'Aug 23', value: 3600 },
    { month: 'Sep 23', value: 3400 },
    { month: 'Oct 23', value: 3800 },
    { month: 'Nov 23', value: 3600 },
    { month: 'Dec 23', value: 4200 },
    { month: 'Jan 24', value: 4000 },
    { month: 'Feb 24', value: 4400 },
    { month: 'Mar 24', value: 4200 },
    { month: 'Apr 24', value: 4600 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-black mb-1">Yearly Earnings Overview</h3>
          <p className="text-sm text-gray-500">$5000</p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              domain={[0, 5000]}
              ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
              labelStyle={{ color: '#374151' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#E31B95"
              strokeWidth={3}
              dot={{ fill: '#E31B95', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#E31B95', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportChart;
