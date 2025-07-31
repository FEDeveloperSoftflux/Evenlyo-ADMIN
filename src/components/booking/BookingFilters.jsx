import React, { useState, useRef, useEffect } from 'react';

const BookingFilters = ({ 
  filterDate, 
  setFilterDate, 
  selectedVendor, 
  setSelectedVendor, 
  viewType, 
  setViewType 
}) => {
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const [openViewTypeDropdown, setOpenViewTypeDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  
  const statusDropdownRef = useRef(null);
  const vendorDropdownRef = useRef(null);
  const viewTypeDropdownRef = useRef(null);
  const calendarRef = useRef(null);

  const viewTypes = ['By Month', 'By Week', 'By Day'];
  const vendors = ['Select Vendor',  'Event Planners Pro', 'Elite Caterers', 'Sound & Light Solutions'];
  const statusOptions = ['All Status', 'Complete', 'In Progress', 'Rejected', 'New Order'];

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
    const dateString = selected.toISOString().split('T')[0];
    setFilterDate(dateString);
    setShowCalendar(false);
  };

  const isToday = (day) => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() &&
           currentMonth.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setOpenStatusDropdown(false);
      }
      if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(event.target)) {
        setOpenVendorDropdown(false);
      }
      if (viewTypeDropdownRef.current && !viewTypeDropdownRef.current.contains(event.target)) {
        setOpenViewTypeDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Filter by date */}
      <div className="lg:col-span-1">
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {selectedDate ? selectedDate.toLocaleDateString('en-US') : 'Filter by date'}
          </button>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          {showCalendar && (
            <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4 w-80">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getMonthName(currentMonth)}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-black py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: (getFirstDayOfMonth(currentMonth) + 6) % 7 }, (_, i) => (
                  <div key={`empty-${i}`} className="h-10" />
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDate && 
                    selectedDate.getFullYear() === currentMonth.getFullYear() &&
                    selectedDate.getMonth() === currentMonth.getMonth() &&
                    selectedDate.getDate() === day;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      className={`h-10 flex items-center justify-center text-sm rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-pink-500 text-white'
                          : isToday(day)
                          ? 'bg-pink-100 text-pink-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Status */}
      <div className="lg:col-span-1">
        <div className="relative" ref={statusDropdownRef}>
          <button
            type="button"
            onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {selectedStatus}
          </button>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {openStatusDropdown && (
            <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setOpenStatusDropdown(false);
                  }}
                  className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vendor selection */}
      <div className="lg:col-span-1">
        <div className="relative" ref={vendorDropdownRef}>
          <button
            type="button"
            onClick={() => setOpenVendorDropdown(!openVendorDropdown)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {selectedVendor || 'Select Vendor'}
          </button>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {openVendorDropdown && (
            <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setOpenVendorDropdown(false);
                  }}
                  className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  {vendor}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View type selection */}
      <div className="lg:col-span-1">
        <div className="relative" ref={viewTypeDropdownRef}>
          <button
            type="button"
            onClick={() => setOpenViewTypeDropdown(!openViewTypeDropdown)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {viewType}
          </button>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {openViewTypeDropdown && (
            <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
              {viewTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setViewType(type);
                    setOpenViewTypeDropdown(false);
                  }}
                  className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
