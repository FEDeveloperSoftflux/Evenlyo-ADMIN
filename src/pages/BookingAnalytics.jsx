import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import DashboardHeader from '../components/common/DashboardHeader';
import BookingStatsCards from '../components/booking/BookingStatsCards';
import BookingCalendar from '../components/booking/BookingCalendar';
import BookingFilters from '../components/booking/BookingFilters';
import 'react-calendar/dist/Calendar.css';

const BookingAnalytics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState('By Month'); // Default to monthly view
  const [selectedVendor, setSelectedVendor] = useState(''); // No vendor selected by default
  const [filterDate, setFilterDate] = useState('');

 
  const getBookingData = (viewType, vendorFilter) => {
    const monthlyData = {     
      
      'All Vendors': {
        totalBookings: { count: 48, change: 12, period: 'from last month' },
        completeBookings: { count: 12, change: 4, period: 'from last month' },
        requestBookings: { count: 18, change: 18, period: 'from last month' },
        inProcessBookings: { count: 18, change: 36, period: 'from last month' }
      },

      'Elite Caterers': {
        totalBookings: { count: 48, change: 12, period: 'from last month' },
        completeBookings: { count: 12, change: 4, period: 'from last month' },
        requestBookings: { count: 18, change: 18, period: 'from last month' },
        inProcessBookings: { count: 18, change: 36, period: 'from last month' }
      },
      'Event Planners Pro': {
        totalBookings: { count: 28, change: 15, period: 'from last month' },
        completeBookings: { count: 8, change: 8, period: 'from last month' },
        requestBookings: { count: 12, change: 22, period: 'from last month' },
        inProcessBookings: { count: 8, change: 25, period: 'from last month' }
      },
      'Sound & Light Solutions': {
        totalBookings: { count: 20, change: 8, period: 'from last month' },
        completeBookings: { count: 4, change: 2, period: 'from last month' },
        requestBookings: { count: 6, change: 12, period: 'from last month' },
        inProcessBookings: { count: 10, change: 45, period: 'from last month' }
      }
    };

    const weeklyData = {
      'All Vendors': {
        totalBookings: { count: 12, change: 8, period: 'from last week' },
        completeBookings: { count: 3, change: 2, period: 'from last week' },
        requestBookings: { count: 5, change: 15, period: 'from last week' },
        inProcessBookings: { count: 4, change: 28, period: 'from last week' }
      },
      'Event Planners Pro': {
        totalBookings: { count: 7, change: 12, period: 'from last week' },
        completeBookings: { count: 2, change: 5, period: 'from last week' },
        requestBookings: { count: 3, change: 18, period: 'from last week' },
        inProcessBookings: { count: 2, change: 15, period: 'from last week' }
      },
      'Elite Caterers': {
        totalBookings: { count: 7, change: 12, period: 'from last week' },
        completeBookings: { count: 2, change: 5, period: 'from last week' },
        requestBookings: { count: 3, change: 18, period: 'from last week' },
        inProcessBookings: { count: 2, change: 15, period: 'from last week' }
      },
      'Sound & Light Solutions': {
        totalBookings: { count: 5, change: 4, period: 'from last week' },
        completeBookings: { count: 1, change: 1, period: 'from last week' },
        requestBookings: { count: 2, change: 8, period: 'from last week' },
        inProcessBookings: { count: 2, change: 35, period: 'from last week' }
      }
    };

    const dailyData = {
      'All Vendors': {
        totalBookings: { count: 3, change: 5, period: 'from yesterday' },
        completeBookings: { count: 1, change: 0, period: 'from yesterday' },
        requestBookings: { count: 1, change: 10, period: 'from yesterday' },
        inProcessBookings: { count: 1, change: 20, period: 'from yesterday' }
      },
      'Event Planners Pro': {
        totalBookings: { count: 2, change: 8, period: 'from yesterday' },
        completeBookings: { count: 1, change: 2, period: 'from yesterday' },
        requestBookings: { count: 1, change: 15, period: 'from yesterday' },
        inProcessBookings: { count: 0, change: 0, period: 'from yesterday' }
      },
      'Decor Masters': {
        totalBookings: { count: 1, change: 2, period: 'from yesterday' },
        completeBookings: { count: 0, change: 0, period: 'from yesterday' },
        requestBookings: { count: 0, change: 0, period: 'from yesterday' },
        inProcessBookings: { count: 1, change: 25, period: 'from yesterday' }
      }
    };

    // Use viewType to determine which dataset to use
    let dataSet;
    if (viewType === 'By Day') {
      dataSet = dailyData;
    } else if (viewType === 'By Week') {
      dataSet = weeklyData;
    } else {
      dataSet = monthlyData; // Default to monthly for 'By Month'
    }
    
    const vendor = vendorFilter || selectedVendor || 'All Vendors';
    return dataSet[vendor] || dataSet['All Vendors'];
  };

  const bookingData = getBookingData(viewType, selectedVendor);

  // Sample calendar events with vendor-wise bookings (using standard status types only)
  const events = [
    // Vendor 1: Event Planners Pro - Multiple bookings on same days
    { date: new Date(2025, 6, 1), status: 'New Order', time: '9:00', type: 'new', vendor: 'Event Planners Pro', service: 'Wedding Planning' },
    { date: new Date(2025, 6, 1), status: 'In Progress', time: '9:00', type: 'progress', vendor: 'Event Planners Pro', service: 'Birthday Consultation' },
    { date: new Date(2025, 6, 1), status: 'Approved', time: '14:30', type: 'approved', vendor: 'Event Planners Pro', service: 'Corporate Meeting' },
    
    { date: new Date(2025, 6, 2), status: 'In Progress', time: '10:00', type: 'progress', vendor: 'Event Planners Pro', service: 'Event Setup' },
    { date: new Date(2025, 6, 2), status: 'Complete', time: '10:00', type: 'complete', vendor: 'Event Planners Pro', service: 'Venue Inspection' },
    { date: new Date(2025, 6, 2), status: 'New Order', time: '16:00', type: 'new', vendor: 'Event Planners Pro', service: 'Anniversary Planning' },
    
    // Multi-day event
    { 
      startDate: new Date(2025, 6, 4), 
      endDate: new Date(2025, 6, 6), 
      status: 'In Progress', 
      time: '10:00', 
      type: 'progress',
      isMultiDay: true,
      eventId: 'wedding-1',
      vendor: 'Event Planners Pro',
      service: 'Wedding Event'
    },
    
    { date: new Date(2025, 6, 8), status: 'Complete', time: '16:30', type: 'complete', vendor: 'Event Planners Pro', service: 'Birthday Party' },
    { date: new Date(2025, 6, 8), status: 'New Order', time: '16:30', type: 'new', vendor: 'Event Planners Pro', service: 'Graduation Party' },
    { date: new Date(2025, 6, 8), status: 'Approved', time: '19:00', type: 'approved', vendor: 'Event Planners Pro', service: 'Engagement Party' },
    
    // Multi-day corporate event
    { 
      startDate: new Date(2025, 6, 12), 
      endDate: new Date(2025, 6, 14), 
      status: 'Approved', 
      time: '9:00', 
      type: 'approved',
      isMultiDay: true,
      eventId: 'corporate-1',
      vendor: 'Event Planners Pro',
      service: 'Corporate Event'
    },
    
    { date: new Date(2025, 6, 20), status: 'Rejected', time: '11:00', type: 'rejected', vendor: 'Event Planners Pro', service: 'Private Party' },
    { date: new Date(2025, 6, 20), status: 'In Progress', time: '11:00', type: 'progress', vendor: 'Event Planners Pro', service: 'Team Building Event' },
    { date: new Date(2025, 6, 20), status: 'New Order', time: '15:30', type: 'new', vendor: 'Event Planners Pro', service: 'Holiday Party' },
    
    { date: new Date(2025, 6, 28), status: 'Approved', time: '15:00', type: 'approved', vendor: 'Event Planners Pro', service: 'Engagement Party' },

    // Vendor 2: Elite Caterers - Multiple bookings per day/time
    { date: new Date(2025, 6, 3), status: 'New Order', time: '8:30', type: 'new', vendor: 'Elite Caterers', service: 'Wedding Catering' },
    { date: new Date(2025, 6, 3), status: 'Approved', time: '8:30', type: 'approved', vendor: 'Elite Caterers', service: 'Corporate Breakfast' },
    { date: new Date(2025, 6, 3), status: 'In Progress', time: '12:00', type: 'progress', vendor: 'Elite Caterers', service: 'Lunch Event' },
    
    { date: new Date(2025, 6, 7), status: 'Complete', time: '12:00', type: 'complete', vendor: 'Elite Caterers', service: 'Office Lunch' },
    { date: new Date(2025, 6, 7), status: 'New Order', time: '12:00', type: 'new', vendor: 'Elite Caterers', service: 'Business Lunch' },
    { date: new Date(2025, 6, 7), status: 'Approved', time: '18:30', type: 'approved', vendor: 'Elite Caterers', service: 'Dinner Catering' },
    
    { date: new Date(2025, 6, 10), status: 'In Progress', time: '10:00', type: 'progress', vendor: 'Elite Caterers', service: 'Birthday Catering' },
    { date: new Date(2025, 6, 10), status: 'Complete', time: '14:00', type: 'complete', vendor: 'Elite Caterers', service: 'Afternoon Tea' },
    
    { date: new Date(2025, 6, 15), status: 'Approved', time: '18:00', type: 'approved', vendor: 'Elite Caterers', service: 'Anniversary Dinner' },
    { date: new Date(2025, 6, 15), status: 'New Order', time: '18:00', type: 'new', vendor: 'Elite Caterers', service: 'Wedding Reception' },
    
    // Multi-day festival catering
    { 
      startDate: new Date(2025, 6, 18), 
      endDate: new Date(2025, 6, 19), 
      status: 'Complete', 
      time: '15:00', 
      type: 'complete',
      isMultiDay: true,
      eventId: 'catering-1',
      vendor: 'Elite Caterers',
      service: 'Festival Food Service'
    },
    
    { date: new Date(2025, 6, 22), status: 'New Order', time: '13:30', type: 'new', vendor: 'Elite Caterers', service: 'Corporate Lunch' },
    { date: new Date(2025, 6, 22), status: 'In Progress', time: '13:30', type: 'progress', vendor: 'Elite Caterers', service: 'Meeting Catering' },
    { date: new Date(2025, 6, 22), status: 'Approved', time: '19:00', type: 'approved', vendor: 'Elite Caterers', service: 'Gala Dinner' },
    
    { date: new Date(2025, 6, 26), status: 'Rejected', time: '9:15', type: 'rejected', vendor: 'Elite Caterers', service: 'Private Dinner' },
    { date: new Date(2025, 6, 26), status: 'Complete', time: '9:15', type: 'complete', vendor: 'Elite Caterers', service: 'Breakfast Service' },

    // Vendor 3: Sound & Light Solutions - Multiple overlapping bookings
    { date: new Date(2025, 6, 5), status: 'Approved', time: '14:00', type: 'approved', vendor: 'Sound & Light Solutions', service: 'DJ Services' },
    { date: new Date(2025, 6, 5), status: 'New Order', time: '14:00', type: 'new', vendor: 'Sound & Light Solutions', service: 'Sound System Setup' },
    { date: new Date(2025, 6, 5), status: 'In Progress', time: '20:00', type: 'progress', vendor: 'Sound & Light Solutions', service: 'Lighting Installation' },
    
    { date: new Date(2025, 6, 9), status: 'New Order', time: '16:00', type: 'new', vendor: 'Sound & Light Solutions', service: 'Sound System Rental' },
    { date: new Date(2025, 6, 9), status: 'Approved', time: '16:00', type: 'approved', vendor: 'Sound & Light Solutions', service: 'Audio Equipment' },
    
    { date: new Date(2025, 6, 11), status: 'Complete', time: '19:00', type: 'complete', vendor: 'Sound & Light Solutions', service: 'Wedding DJ' },
    { date: new Date(2025, 6, 11), status: 'In Progress', time: '19:00', type: 'progress', vendor: 'Sound & Light Solutions', service: 'Dance Floor Lighting' },
    { date: new Date(2025, 6, 11), status: 'New Order', time: '21:30', type: 'new', vendor: 'Sound & Light Solutions', service: 'Late Night DJ' },
    
    { date: new Date(2025, 6, 16), status: 'In Progress', time: '20:00', type: 'progress', vendor: 'Sound & Light Solutions', service: 'Concert Setup' },
    { date: new Date(2025, 6, 16), status: 'Approved', time: '20:00', type: 'approved', vendor: 'Sound & Light Solutions', service: 'Stage Lighting' },
    
    { date: new Date(2025, 6, 21), status: 'Approved', time: '17:30', type: 'approved', vendor: 'Sound & Light Solutions', service: 'Lighting Design' },
    { date: new Date(2025, 6, 21), status: 'Complete', time: '17:30', type: 'complete', vendor: 'Sound & Light Solutions', service: 'Sound Check' },
    { date: new Date(2025, 6, 21), status: 'New Order', time: '22:00', type: 'new', vendor: 'Sound & Light Solutions', service: 'After Party Setup' },
    
    // Multi-day festival setup
    { 
      startDate: new Date(2025, 6, 25), 
      endDate: new Date(2025, 6, 27), 
      status: 'New Order', 
      time: '12:00', 
      type: 'new',
      isMultiDay: true,
      eventId: 'festival-1',
      vendor: 'Sound & Light Solutions',
      service: 'Festival Sound & Lighting'
    },
    
    { date: new Date(2025, 6, 30), status: 'New Order', time: '11:45', type: 'new', vendor: 'Sound & Light Solutions', service: 'Party Equipment' },
    { date: new Date(2025, 6, 30), status: 'In Progress', time: '11:45', type: 'progress', vendor: 'Sound & Light Solutions', service: 'Equipment Testing' },
    { date: new Date(2025, 6, 30), status: 'Approved', time: '15:30', type: 'approved', vendor: 'Sound & Light Solutions', service: 'Installation Service' },

    // Today's events with multiple overlapping bookings (July 24th)
    { date: new Date(), status: 'New Order', time: '8:00', type: 'new', vendor: 'Event Planners Pro', service: 'Consultation Meeting' },
    { date: new Date(), status: 'In Progress', time: '8:00', type: 'progress', vendor: 'Event Planners Pro', service: 'Venue Visit' },
    { date: new Date(), status: 'Complete', time: '10:30', type: 'complete', vendor: 'Elite Caterers', service: 'Breakfast Catering' },
    { date: new Date(), status: 'Approved', time: '10:30', type: 'approved', vendor: 'Elite Caterers', service: 'Coffee Service' },
    { date: new Date(), status: 'In Progress', time: '14:00', type: 'progress', vendor: 'Sound & Light Solutions', service: 'Equipment Testing' },
    { date: new Date(), status: 'New Order', time: '14:00', type: 'new', vendor: 'Sound & Light Solutions', service: 'Sound Check' },
    { date: new Date(), status: 'Approved', time: '16:45', type: 'approved', vendor: 'Event Planners Pro', service: 'Event Setup' },
    { date: new Date(), status: 'Complete', time: '16:45', type: 'complete', vendor: 'Event Planners Pro', service: 'Final Inspection' },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter events based on selected vendor
  const filteredEvents = selectedVendor === '' || selectedVendor === 'Select Vendor'
    ? [] // Show no events when no vendor is selected
    : selectedVendor === 'All Vendor'
    ? events // Show all events when "All Vendor" is selected
    : events.filter(event => event.vendor === selectedVendor); // Show specific vendor events

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader 
          title="Booking Analytics" 
          subtitle="You can view, Accept, Reject all bookings" 
        />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">Booking Analytics</h1>
            <p className="text-md text-gray-400">
              You can view, Accept, Reject all bookings
            </p>
          </div>

          {/* Stats Cards */}
          <BookingStatsCards data={bookingData} filter={viewType} />
          
          {/* All Bookings Section */}
          <div className="mt-8">
            {/* Filters */}
            <BookingFilters 
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              selectedVendor={selectedVendor}
              setSelectedVendor={setSelectedVendor}
              viewType={viewType}
              setViewType={setViewType}
            />
            
            {/* Calendar */}
            <BookingCalendar 
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              events={filteredEvents}
              viewType={viewType}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingAnalytics;
