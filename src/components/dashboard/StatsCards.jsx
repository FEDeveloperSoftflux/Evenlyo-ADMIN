import React from 'react';

const StatsCards = () => {
  const stats = [
    {
      title: 'All Clients',
      value: '2,847',
      change: '+12% from last month',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/Clients.svg',
    },
    {
      title: 'All Vendors',
      value: '1,234',
      change: '+12% from last month',
      bgColor: 'bg-gradient-brand',
      textColor: 'text-white',
      icon: '/assets/Box.svg',
    },
    {
      title: 'Total Items',
      value: '15,672',
      change: '+12% from last month',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/Cart.svg',
    },
    {
      title: 'Complete Bookings',
      value: '8,945',
      change: '+12% from last month',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/Tick.svg',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} ${stat.textColor} rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden`}
        >
          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className={`text-sm font-semibold ${stat.textColor === 'text-white' ? 'text-white/80' : 'text-black'}`}>
                {stat.title}
              </p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 ${
                stat.textColor === 'text-white' ? 'bg-white/20' : 'bg-white'
              }`}>
                <img src={stat.icon} alt="" className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mb-1">
              <h3 className={`text-3xl font-extrabold ${stat.textColor}`}>
                {stat.value}
              </h3>
            </div>
            
            <p className={`text-xs font-medium ${stat.textColor === 'text-white' ? 'text-white/70' : 'text-black'}`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
