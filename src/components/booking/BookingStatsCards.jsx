import React from 'react';

const BookingStatsCards = ({ data, filter }) => {
  // The data already comes with the correct values and periods from the parent component
  // No need to modify period text since it's already correct from the data source
  const statsConfig = [
    {
      title: 'Total Bookings',
      value: data.totalBookings.count,
      change: `+${data.totalBookings.change}% ${data.totalBookings.period}`,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      circleColor: 'bg-blue-500',
      valueColor: 'text-blue-500'
    },
    {
      title: 'Complete Bookings',
      value: data.completeBookings.count,
      change: `+${data.completeBookings.change}% ${data.completeBookings.period}`,
      bgColor: 'bg-gradient-brand',
      textColor: 'text-white',
      circleColor: 'bg-white',
      valueColor: 'text-white'
    },
    {
      title: 'Request Bookings',
      value: data.requestBookings.count,
      change: `+${data.requestBookings.change}% ${data.requestBookings.period}`,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      circleColor: 'bg-green-500',
      valueColor: 'text-green-500'
    },
    {
      title: 'In Process',
      value: data.inProcessBookings.count,
      change: `+${data.inProcessBookings.change}% ${data.inProcessBookings.period}`,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      circleColor: 'bg-yellow-500',
      valueColor: 'text-yellow-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
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
              <div className={`w-4 h-4 rounded-full ${stat.circleColor} border border-gray-200`}>
              </div>
            </div>
            
            <div className="mb-1">
              <h3 className={`text-3xl font-extrabold ${stat.valueColor}`}>
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

export default BookingStatsCards;
