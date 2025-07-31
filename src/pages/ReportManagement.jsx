import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import ReportStatsCards from '../components/report/ReportStatsCards';
import ReportChart from '../components/report/ReportChart';
import ReportPieChart from '../components/report/ReportPieChart';
import ReportTable from '../components/report/ReportTable';
import '../styles/design-system.css';

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('vendor'); // 'vendor' or 'client'
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [currentFromMonth, setCurrentFromMonth] = useState(new Date());
  const [currentToMonth, setCurrentToMonth] = useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [fromButtonPosition, setFromButtonPosition] = useState(null);
  const [toButtonPosition, setToButtonPosition] = useState(null);
  
  const fromCalendarRef = useRef(null);
  const toCalendarRef = useRef(null);
  const fromButtonRef = useRef(null);
  const toButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromCalendarRef.current && !fromCalendarRef.current.contains(event.target)) {
        setShowFromCalendar(false);
      }
      if (toCalendarRef.current && !toCalendarRef.current.contains(event.target)) {
        setShowToCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const navigateMonth = (direction, isFromCalendar = true) => {
    if (isFromCalendar) {
      setCurrentFromMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + direction);
        return newDate;
      });
    } else {
      setCurrentToMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + direction);
        return newDate;
      });
    }
  };

  const handleDateSelect = (day, isFromCalendar = true) => {
    if (isFromCalendar) {
      const selected = new Date(currentFromMonth.getFullYear(), currentFromMonth.getMonth(), day);
      setSelectedFromDate(selected);
      setShowFromCalendar(false);
    } else {
      const selected = new Date(currentToMonth.getFullYear(), currentToMonth.getMonth(), day);
      setSelectedToDate(selected);
      setShowToCalendar(false);
    }
  };

  const isToday = (day, currentMonth) => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() &&
           currentMonth.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const isSelected = (day, selectedDate, currentMonth) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === currentMonth.getFullYear() &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getDate() === day;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Report Management" subtitle="You can download report about User Management, Earning" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-responsive-h2 text-gray-900 mb-2">Report Management</h1>
              <p className="text-md text-gray-400">
                You can download report about User Management, Earning
              </p>
            </div>
          </div>
          
          {/* Stats Cards Section */}
          <ReportStatsCards />

          {/* Date Filter Section */}
          <div className="mb-8 relative" style={{ overflow: 'visible' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4" style={{ overflow: 'visible' }}>
              {/* Date Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-4" style={{ overflow: 'visible' }}>
                <div className="relative" ref={fromCalendarRef}>
                  <button
                    ref={fromButtonRef}
                    type="button"
                    onClick={() => {
                      if (fromButtonRef.current) {
                        const rect = fromButtonRef.current.getBoundingClientRect();
                        setFromButtonPosition({
                          top: rect.bottom + window.scrollY + 8,
                          left: rect.left + window.scrollX,
                          width: rect.width
                        });
                      }
                      setShowFromCalendar(!showFromCalendar);
                    }}
                    className="w-full sm:w-48 pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm bg-white text-left hover:bg-gray-50 transition-colors"
                  >
                    {selectedFromDate ? selectedFromDate.toLocaleDateString('en-US') : 'Filter by date'}
                  </button>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {showFromCalendar && fromButtonPosition && (
                    <div 
                      className="fixed bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-80" 
                      style={{ 
                        zIndex: 9999,
                        top: fromButtonPosition.top,
                        left: fromButtonPosition.left,
                        minWidth: Math.max(fromButtonPosition.width, 320)
                      }}
                    >
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => navigateMonth(-1, true)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getMonthName(currentFromMonth)}
                        </h3>
                        <button
                          onClick={() => navigateMonth(1, true)}
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
                        {Array.from({ length: (getFirstDayOfMonth(currentFromMonth) + 6) % 7 }, (_, i) => (
                          <div key={`empty-${i}`} className="h-10" />
                        ))}
                        
                        {/* Days of the month */}
                        {Array.from({ length: getDaysInMonth(currentFromMonth) }, (_, i) => {
                          const day = i + 1;
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateSelect(day, true)}
                              className={`h-10 text-sm font-medium rounded-lg transition-colors ${
                                isSelected(day, selectedFromDate, currentFromMonth)
                                  ? 'bg-pink-500 text-white'
                                  : isToday(day, currentFromMonth)
                                  ? 'bg-pink-50 text-pink-600'
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
                
                <div className="text-sm text-gray-500 font-medium">
                  to
                </div>
                
                <div className="relative" ref={toCalendarRef}>
                  <button
                    ref={toButtonRef}
                    type="button"
                    onClick={() => {
                      if (toButtonRef.current) {
                        const rect = toButtonRef.current.getBoundingClientRect();
                        setToButtonPosition({
                          top: rect.bottom + window.scrollY + 8,
                          left: rect.left + window.scrollX,
                          width: rect.width
                        });
                      }
                      setShowToCalendar(!showToCalendar);
                    }}
                    className="w-full sm:w-48 pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm bg-white text-left hover:bg-gray-50 transition-colors"
                  >
                    {selectedToDate ? selectedToDate.toLocaleDateString('en-US') : 'Filter by date'}
                  </button>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {showToCalendar && toButtonPosition && (
                    <div 
                      className="fixed bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-80" 
                      style={{ 
                        zIndex: 9999,
                        top: toButtonPosition.top,
                        left: toButtonPosition.left,
                        minWidth: Math.max(toButtonPosition.width, 320)
                      }}
                    >
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => navigateMonth(-1, false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getMonthName(currentToMonth)}
                        </h3>
                        <button
                          onClick={() => navigateMonth(1, false)}
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
                        {Array.from({ length: (getFirstDayOfMonth(currentToMonth) + 6) % 7 }, (_, i) => (
                          <div key={`empty-${i}`} className="h-10" />
                        ))}
                        
                        {/* Days of the month */}
                        {Array.from({ length: getDaysInMonth(currentToMonth) }, (_, i) => {
                          const day = i + 1;
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateSelect(day, false)}
                              className={`h-10 text-sm font-medium rounded-lg transition-colors ${
                                isSelected(day, selectedToDate, currentToMonth)
                                  ? 'bg-pink-500 text-white'
                                  : isToday(day, currentToMonth)
                                  ? 'bg-pink-50 text-pink-600'
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

              {/* Export Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Export CSV</span>
                </button>

                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <section className="mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportChart />
              
              {/* Subscription Plans Distribution */}
              <ReportPieChart />
            </div>
          </section>

          {/* Tab Switch Buttons */}
          <div className="mb-6 flex justify-center">
            <div className="relative flex bg-gray-100 p-1 rounded-xl w-full max-w-6xl">
              {/* Sliding background indicator */}
              <div 
                className={`absolute top-1 bottom-1 bg-gradient-brand rounded-2xl shadow-sm transition-all duration-300 ease-in-out ${
                  activeTab === 'vendor' 
                    ? 'left-1 right-1/2 mr-0.5' 
                    : 'left-1/2 right-1 ml-0.5'
                }`}
              />
              <button
                onClick={() => setActiveTab('vendor')}
                className={`relative z-10 flex-1 px-8 py-2 rounded-2xl text-xs sm:text-lg font-medium transition-all duration-300 ${
                  activeTab === 'vendor'
                    ? 'text-white'
                    : 'text-black font-bold hover:text-gray-900'
                }`}
              >
                Seller Reports
              </button>
              <button
                onClick={() => setActiveTab('client')}
                className={`relative z-10 flex-1 px-8 py-2 rounded-2xl text-xs sm:text-lg font-medium transition-all duration-300 ${
                  activeTab === 'client'
                    ? 'text-white'
                    : 'text-black font-bold hover:text-gray-900'
                }`}
              >
                All Booking transactions
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={`Filter ${activeTab === 'vendor' ? 'seller' : 'booking'} items...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <ReportTable searchTerm={searchTerm} activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
};

export default ReportManagement;
