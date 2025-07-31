import React from 'react';

const ListingStatsCards = () => {
  const statsCards = [
    {
      title: 'Total Main Categories',
      value: '5',
      change: 'Main categories',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/Tag.svg',
    },
    {
      title: 'Total Sub Categories',
      value: '30',
      change: 'Sub categories available',
      bgColor: 'bg-gradient-brand',
      textColor: 'text-white',
      icon: '/assets/Box.svg',
    },
    {
      title: 'Total Items for Booking',
      value: '234',
      change: 'Items ready for booking',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      icon: '/assets/CartPink.svg',
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
              <p className={`text-sm font-bold ${card.textColor === 'text-white' ? 'text-white/80' : 'text-black'}`}>
                {card.title}
              </p>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 ${
                card.textColor === 'text-white' ? 'bg-white/20' : 'bg-white'
              }`}>
                <img src={card.icon} alt="" className="w-8 h-8" />
              </div>
            </div>
            
            <div className="mb-1">
              <h3 className={`text-3xl font-extrabold ${card.textColor}`}>
                {card.value}
              </h3>
            </div>
            
            <p className={`text-xs font-medium ${card.textColor === 'text-white' ? 'text-white/70' : 'text-black'}`}>
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingStatsCards;
