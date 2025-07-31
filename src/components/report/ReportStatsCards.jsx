import React from 'react';

const ReportStatsCards = () => {
  const statsCards = [
    {
      title: 'Today Earning',
      value: '$125,430',
      change: '+12.5% from One Day',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/Earning.svg',
      changeColor: 'text-green-600'
    },
    {
      title: 'Last Week Earning',
      value: '$78,290',
      change: '-6.2% from last Week',
      bgColor: 'bg-gradient-brand',
      textColor: 'text-white',
      icon: '/assets/WeekEarning.svg',
      changeColor: 'text-white/80'
    },
    {
      title: 'Total Earning',
      value: '$125,000',
      change: '+6.7% from last month',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/TrendUp.svg',
      changeColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.bgColor} ${card.textColor} rounded-4xl p-6 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer`}
        >
          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className={`text-sm font-bold ${card.textColor === 'text-white' ? 'text-white/80' : 'text-gray-600'}`}>
                {card.title}
              </p>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 ${
                card.textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-50'
              }`}>
                <img src={card.icon} alt="" className="w-6 h-6" />
              </div>
            </div>
            
            <div className="mb-2">
              <h3 className={`text-3xl font-extrabold ${card.textColor}`}>
                {card.value}
              </h3>
            </div>
            
            <p className={`text-xs font-medium ${card.changeColor}`}>
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportStatsCards;
