import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip } from 'recharts';

const ListingCharts = () => {
  // Responsive margin for BarChart
  const [leftMargin, setLeftMargin] = React.useState(10);
  const [xAxisKey, setXAxisKey] = React.useState('name');
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setLeftMargin(0);
        setXAxisKey('shortName');
      } else {
        setLeftMargin(10);
        setXAxisKey('name');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const chartData = [
    { name: 'Food & Drinks', shortName: 'Food', value: 400, color: 'url(#gradient)' },
    { name: 'Decoration & Styling', shortName: 'Decor', value: 1400, color: 'url(#gradient)' },
    { name: 'Locations & Party Tents', shortName: 'Location', value: 1100, color: 'url(#gradient)' },
    { name: 'Decoration & Styling', shortName: 'Decor', value: 1600, color: 'url(#gradient)' },
    { name: 'Staff & Services', shortName: 'Staff', value: 550, color: 'url(#gradient)' },
  ];

  // Custom X-axis tick component to handle multiline text
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const lines = payload.value.split('\n');
    
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 14 + 10}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="11"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };



  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black">Mostly book items</h3>
        <span className="text-sm text-gray-500">1 Month</span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: leftMargin,
              bottom: 40,
            }}
            barCategoryGap="10%"
          >
            <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF295D" />
                <stop offset="49%" stopColor="#E31B95" />
                <stop offset="100%" stopColor="#C817AE" />
            </linearGradient>
            </defs>
            <XAxis 
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
              interval={0}
              height={40}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[0, 1600]}
              ticks={[0, 400, 800, 1200, 1600]}
              tickFormatter={(value) => `$${value}`}
            />

            <Bar 
              dataKey="value"
              radius={[8, 8, 0, 0]}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ListingCharts;