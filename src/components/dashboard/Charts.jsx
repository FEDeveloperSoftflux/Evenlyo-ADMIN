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

const Charts = () => {
  // Sample data for yearly earnings overview matching the image
  const chartData = [
    { month: 'Jan', value: 310 },
    { month: 'Feb', value: 250 },
    { month: 'Mar', value: 350 },
    { month: 'Apr', value: 450 },
    { month: 'May', value: 400 },
    { month: 'Jun', value: 500 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-left justify-between mb-6">
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
              left: 0,
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
              domain={[0, 600]}
              ticks={[0, 150, 300, 450, 600]}
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

export default Charts;
