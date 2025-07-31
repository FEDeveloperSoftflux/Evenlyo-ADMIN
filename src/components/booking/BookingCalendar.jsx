import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfWeek, endOfWeek, addDays, startOfDay } from 'date-fns';
import TrackOrderModal from '../tracking/TrackOrderModal';

const BookingCalendar = ({ selectedDate, onDateChange, events, viewType }) => {
  // Responsive week day names
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  const handleEventMouseEnter = (event, e) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Get hover position
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8 // Show above the event
    });
    
    // Set timeout to show popup after brief delay
    const timeout = setTimeout(() => {
      setHoveredEvent(event);
    }, 300); // 300ms delay
    
    setHoverTimeout(timeout);
  };

  const handleEventMouseLeave = () => {
    // Clear timeout and hide popup
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoveredEvent(null);
    setHoverTimeout(null);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowModal(true);
    // Hide hover card when modal opens
    setHoveredEvent(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleTrackNow = () => {
    setShowModal(false); // Close booking details modal
    setShowTrackModal(true); // Open track order modal
  };

  const closeTrackModal = () => {
    setShowTrackModal(false);
  };

  // Sample order data for track modal
  const sampleOrderData = {
    trackingId: "TRK001",
    orderId: "ORD12345",
    clientName: "John Smith",
    phone: "+1 234 567 8900",
    statusLabel: "In Progress",
    totalPrice: "$1,250.00",
    progressNote: "Your order is being processed and will be ready soon.",
    timeline: [
      {
        title: "Request Sent",
        description: "Your order has been successfully placed",
        completed: true,
        date: "2024-06-27 10:00",
        icon: "/assets/Sent.svg",
        label: "Completed",
        labelColor: "bg-green-100 text-green-600"
      },
      {
        title: "Order Accepted",
        description: "Vendor has confirmed your booking",
        completed: true,
        date: "2024-06-27 11:30",
        icon: "/assets/Accepted.svg",
        label: "Confirmed",
        labelColor: "bg-blue-100 text-blue-600"
      },
      {
        title: "Picked Up",
        description: "Your booking is being prepared",
        completed: true,
        date: "2024-06-27 14:00",
        icon: "/assets/Pickup.svg",
        label: "Processing",
        labelColor: "bg-yellow-100 text-yellow-600"
      },
      {
        title: "Delivered",
        description: "Everything is ready for your event",
        completed: false,
        date: "",
        icon: "/assets/Delivered.svg",
        label: "",
        labelColor: ""
      },
            {
        title: "Received",
        description: "Everything is ready for your event",
        completed: false,
        date: "",
        icon: "/assets/Received.svg",
        label: "",
        labelColor: ""
      },
      {
        title: "Completed",
        description: "Everything is ready for your event",
        completed: false,
        date: "",
        icon: "/assets/Accepted.svg",
        label: "",
        labelColor: ""
      }
    ]
  };
  // Expand multi-day events into individual day events
  const expandedEvents = [];
  
  events.forEach(event => {
    if (event.isMultiDay && event.startDate && event.endDate) {
      // Create an event for each day in the range
      const dateRange = eachDayOfInterval({ start: event.startDate, end: event.endDate });
      dateRange.forEach((date, index) => {
        expandedEvents.push({
          ...event,
          date: date,
          dayIndex: index,
          totalDays: dateRange.length,
          isFirst: index === 0,
          isLast: index === dateRange.length - 1,
          isMiddle: index > 0 && index < dateRange.length - 1
        });
      });
    } else {
      // Single day event
      expandedEvents.push(event);
    }
  });

  // Time slots for day/week view (24 hours: 00:00 to 23:00)
  const timeSlots = [];
  for (let hour = 0; hour <= 23; hour++) {
    timeSlots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      hour: hour,
      label: hour === 0 ? '12:00 am' : 
             hour < 12 ? `${hour}:00 am` : 
             hour === 12 ? '12:00 pm' : 
             `${hour - 12}:00 pm`
    });
  }

  // Get events for a specific date and time
  const getEventsForDateTime = (date, hour) => {
    return expandedEvents.filter(event => {
      if (!isSameDay(event.date, date)) return false;
      
      // Parse event time to get hour
      const eventTime = event.time;
      const eventHour = parseInt(eventTime.split(':')[0]);
      const eventMinutes = parseInt(eventTime.split(':')[1] || '0');
      
      // Check if event falls within this hour slot
      return eventHour === hour || (eventHour === hour - 1 && eventMinutes > 30);
    });
  };

  // Get status color and style for day/week views
  const getStatusStyle = (type) => {
    switch (type) {
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'new':
        return 'bg-pink-100 text-pink-600';
      case 'ongoing':
      case 'progress':
        return 'bg-yellow-100 text-yellow-600';
      case 'complete':
        return 'bg-green-100 text-green-600';
      case 'approved':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Navigation handlers
  const goToPrevious = () => {
    if (viewType === 'By Month') {
      const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
      onDateChange(prevMonth);
    } else if (viewType === 'By Week') {
      const prevWeek = addDays(selectedDate, -7);
      onDateChange(prevWeek);
    } else if (viewType === 'By Day') {
      const prevDay = addDays(selectedDate, -1);
      onDateChange(prevDay);
    }
  };

  const goToNext = () => {
    if (viewType === 'By Month') {
      const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
      onDateChange(nextMonth);
    } else if (viewType === 'By Week') {
      const nextWeek = addDays(selectedDate, 7);
      onDateChange(nextWeek);
    } else if (viewType === 'By Day') {
      const nextDay = addDays(selectedDate, 1);
      onDateChange(nextDay);
    }
  };

  // Get header title based on view type
  const getHeaderTitle = () => {
    if (viewType === 'By Month') {
      return format(selectedDate, 'MMMM yyyy');
    } else if (viewType === 'By Week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    } else if (viewType === 'By Day') {
      return format(selectedDate, 'EEEE, MMMM d, yyyy');
    }
  };

  // Get days for week view
  const getWeekDays = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday start
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  };

  // Render month view (existing calendar)
  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    const weekDays = isMobile
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <div className="p-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = expandedEvents.filter(event => isSameDay(event.date, day));
            const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
            const isDayToday = isToday(day);
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                } ${isDayToday ? 'ring-2 ring-pink-500' : ''}`}
                onClick={() => onDateChange(day)}
              >
                {/* Day number */}
                <div className={`text-sm font-semibold mb-2 ${
                  isDayToday ? 'text-pink-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {format(day, 'd')}
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event, eventIndex) => {
                    const statusColors = {
                      'New Order': 'bg-pink-100 text-pink-600',
                      'Complete': 'bg-green-100 text-green-600',
                      'In Progress': 'bg-yellow-100 text-yellow-600',
                      'Rejected': 'bg-red-100 text-red-600',
                      'Approved': 'bg-blue-100 text-blue-600'
                    };
                    
                    // For multi-day events, adjust styling based on position
                    let roundedClass = 'rounded-full';
                    let statusText = event.status;
                    
                    if (event.isMultiDay) {
                      if (event.isFirst && event.totalDays > 1) {
                        roundedClass = 'rounded-l-full rounded-r-sm';
                      } else if (event.isLast && event.totalDays > 1) {
                        roundedClass = 'rounded-r-full rounded-l-sm';
                      } else if (event.isMiddle) {
                        roundedClass = 'rounded-sm';
                      }
                      
                      // Only show full text on first day, dots on others
                      if (event.isFirst) {
                        statusText = event.status;
                      } else {
                        statusText = '...';
                      }
                    }
                    
                    return (
                      <div
                        key={eventIndex}
                        className={`text-xs px-3 py-1 ${roundedClass} ${
                          statusColors[event.status] || 'bg-gray-500 text-white'
                        } flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}
                        title={`${event.vendor}: ${event.service} - ${event.status} at ${event.time}`}
                        onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                        onMouseLeave={handleEventMouseLeave}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <span className="font-medium truncate">{statusText}</span>
                        {event.isFirst && <span className="text-xs ml-2">{event.time}</span>}
                      </div>
                    );
                  })}
                  
                  {/* Show "+X more" if there are more events */}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    return (
      <div className="flex min-h-[1200px] overflow-auto">
        {/* Time column */}
        <div className="w-20 border-r border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="h-12 border-b border-gray-200"></div> {/* Header spacer */}
          {timeSlots.map((slot) => (
            <div key={slot.time} className="h-12 px-2 py-1 border-b border-gray-100 text-xs text-gray-600 flex items-center">
              {slot.label}
            </div>
          ))}
        </div>

        {/* Day column */}
        <div className="flex-1">
          {/* Day header */}
          <div className="h-12 border-b border-gray-200 bg-gray-50 px-4 flex items-center justify-center">
            <span className="font-semibold text-gray-900">
              {format(selectedDate, 'EEEE')}
            </span>
          </div>

          {/* Time slots */}
          <div className="relative">
            {timeSlots.map((slot) => {
              const slotEvents = getEventsForDateTime(selectedDate, slot.hour);
              return (
                <div key={slot.time} className="h-12 border-b border-gray-100 px-2 relative flex items-center gap-1">
                  {slotEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`h-6 rounded-full px-2 py-0.5 text-xs ${getStatusStyle(event.type)} flex items-center whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity`}
                      title={`${event.vendor}: ${event.service} - ${event.status} at ${event.time}`}
                      onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                      onMouseLeave={handleEventMouseLeave}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      <span className="font-medium text-xs">{event.status}</span>
                      <span className="text-xs ml-1">{event.time}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <div className="flex min-h-[1200px] overflow-auto">
        {/* Time column */}
        <div className="w-20 border-r border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="h-12 border-b border-gray-200"></div> {/* Header spacer */}
          {timeSlots.map((slot) => (
            <div key={slot.time} className="h-12 px-2 py-1 border-b border-gray-100 text-xs text-gray-600 flex items-center">
              {slot.label}
            </div>
          ))}
        </div>

        {/* Week days columns */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="flex-1 border-r border-gray-200 last:border-r-0">
            {/* Day header */}
            <div className="h-12 border-b border-gray-200 bg-gray-50 px-2 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-600">{format(day, 'EEE')}</span>
              <span className={`text-sm font-semibold ${isToday(day) ? 'text-pink-600' : 'text-gray-900'}`}>
                {format(day, 'd')}
              </span>
            </div>

            {/* Time slots */}
            <div className="relative">
              {timeSlots.map((slot) => {
                const slotEvents = getEventsForDateTime(day, slot.hour);
                return (
                  <div key={slot.time} className="h-12 border-b border-gray-100 px-1 relative flex items-center gap-0.5">
                    {slotEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`h-6 rounded-full px-1.5 py-0.5 text-xs ${getStatusStyle(event.type)} flex items-center whitespace-nowrap flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity`}
                        title={`${event.vendor}: ${event.service} - ${event.status} at ${event.time}`}
                        onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                        onMouseLeave={handleEventMouseLeave}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <span className="font-medium text-xs truncate max-w-16">{event.status}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={goToPrevious}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900">
            {getHeaderTitle()}
          </h3>
          
          <button
            onClick={goToNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Calendar Body */}
        {viewType === 'By Month' && renderMonthView()}
        {viewType === 'By Day' && renderDayView()}
        {viewType === 'By Week' && renderWeekView()}
      </div>

      {/* Event Hover Card */}
      {hoveredEvent && (
        <div 
          className="fixed z-50 bg-white rounded-2xl shadow-xl border border-gray-200 w-72 pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            transform: 'translateX(-50%) translateY(-100%)',
          }}
        >
          {/* Arrow pointing down */}
          <div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45"
          />
          
          {/* Card Content */}
          <div className="p-4">
            {/* Vendor Header with Avatar */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src="/assets/jaydeep.png" 
                  alt="Vendor Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">
                  {'DJ ABZ WINE'}
                </h3>
                <p className="text-green-700 font-medium text-sm">
                  {'Concert'}
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-xs">
                  {hoveredEvent.time || '9:30 AM'}
                </span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600 text-xs">
                  {hoveredEvent.location || 'MRK Complex Location'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Booking Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-md mx-4 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Details</h2>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Booking #TRK001</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Complete
                  </span>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex items-center gap-3 mb-4 pb-4 ">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">2024-06-27</div>
                  <div className="text-gray-600 font-medium text-xs">10:00</div>
                </div>
              </div>

              {/* Tracking ID */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">Tracking ID</div>
                  <div className="text-gray-600 font-medium text-xs">TRK001</div>
                </div>
              </div>

              {/* Buyer Details */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Buyer Details</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src="/assets/jaydeep.png" 
                      alt="Buyer Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">John Smith</div>
                    <div className="text-gray-600 text-sm">ID: USR001</div>
                  </div>
                </div>
              </div>

              {/* Seller Details */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Seller Details</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src="/assets/jaydeep.png" 
                      alt="Seller Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Tech Solutions Ltd</div>
                    <div className="text-gray-600 text-sm">New York, NY</div>
                  </div>
                </div>
              </div>

              {/* Track Now Button */}
              <button 
                className="w-full bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors hover:bg-gray-50"
                onClick={handleTrackNow}
              >
                Track Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      <TrackOrderModal
        open={showTrackModal}
        onClose={closeTrackModal}
        order={sampleOrderData}
        onDownload={() => {
          console.log('Download PDF clicked');
          // Add download functionality here
        }}
      />
    </>
  );
};

export default BookingCalendar;
