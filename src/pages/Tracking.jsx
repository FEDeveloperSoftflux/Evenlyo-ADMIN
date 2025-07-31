import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import BuyerDetailsModal from '../components/tracking/BuyerDetailsModal';
import SellerDetailsModal from '../components/tracking/SellerDetailsModal';
import TrackOrderModal from '../components/tracking/TrackOrderModal';
import '../styles/design-system.css';

const Tracking = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    itemName: '',
    mainCategory: 'Main Category',
    subCategory: 'Sub Category',
    vendor: 'All Vendors',
    date: ''
  });
  
  const [openMainCategoryDropdown, setOpenMainCategoryDropdown] = useState(false);
  const [openSubCategoryDropdown, setOpenSubCategoryDropdown] = useState(false);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const mainCategoryDropdownRef = useRef(null);
  const subCategoryDropdownRef = useRef(null);
  const vendorDropdownRef = useRef(null);
  const calendarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainCategoryDropdownRef.current && !mainCategoryDropdownRef.current.contains(event.target)) {
        setOpenMainCategoryDropdown(false);
      }
      if (subCategoryDropdownRef.current && !subCategoryDropdownRef.current.contains(event.target)) {
        setOpenSubCategoryDropdown(false);
      }
      if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(event.target)) {
        setOpenVendorDropdown(false);
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

  const mainCategories = [
    'Entertainment & Attractions',
    'Food & Drinks', 
    'Decoration & Styling',
    'Locations & Party Tents',
    'Staff & Services'
  ];

  const subCategoriesByMain = {
    'Entertainment & Attractions': [
      'DJ & Music',
      'Live Entertainment',
      'Photography & Videography',
      'Lighting & Audio',
      'Sound Systems'
    ],
    'Food & Drinks': [
      'Catering Services',
      'Beverage Stations',
      'Wedding Cakes',
      'Bartending Services',
      'Food Trucks'
    ],
    'Decoration & Styling': [
      'Floral Arrangements',
      'Balloon Decorations',
      'Table Settings',
      'Backdrop & Draping',
      'Centerpieces'
    ],
    'Locations & Party Tents': [
      'Event Venues',
      'Tent Rentals',
      'Outdoor Spaces',
      'Banquet Halls',
      'Garden Venues'
    ],
    'Staff & Services': [
      'Wait Staff',
      'Event Planning',
      'Security Services',
      'Cleaning Services',
      'Event Coordination'
    ]
  };

  // Get subcategories based on selected main category
  const getSubCategories = () => {
    if (selectedFilters.mainCategory === 'Main Category') {
      return [];
    }
    return subCategoriesByMain[selectedFilters.mainCategory] || [];
  };

  const vendors = [
    'Tech Store',
    'Event Planners',
    'Catering Co',
    'Elite Events',
    'Party Perfect',
    'Celebration Station',
    'Dream Weddings',
    'Luxury Events'
  ];

  // Mock data for tracking orders
  const trackingData = [
 {
   id: 'TRK001',
   trackingId: 'TRK001',
   orderId: 'ORD-2024-001',
   clientName: 'John Smith',
   phone: '+1 (555) 123-4567',
   dateTime: '2024-06-27',
   time: '10:30',
   buyer: {
     name: 'John Smith',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Tech Store',  
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'DJ Equipment, Sound System',
   destination: '456 Business Ave, Commerce City',
   status: 'Delivered',
   statusColor: 'text-yellow-600 bg-yellow-50',
   statusLabel: 'Delivered',
   totalPrice: '$2,450.00',
   progressNote: 'Order delivered to destination',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-25 09:00 AM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-orange-100 text-orange-600',
       date: '2024-06-25 09:00 AM'
     },
     {
       title: 'Picked Up',
       description: 'Order picked up from location',
       completed: true,
       icon: '/assets/Pickup.svg',
       label: 'Driver',
       labelColor: 'bg-green-100 text-green-600',
       date: '2024-06-25 10:30 AM'
     },
     {
       title: 'Delivered',
       description: 'Order delivered to destination',
       completed: true,
       icon: '/assets/Delivered.svg',
       label: 'In Transit',
       labelColor: 'bg-blue-100 text-blue-600',
       date: '2024-06-27 08:00 AM'
     },
     {
       title: 'Received',
       description: 'Client confirmed receipt',
       completed: true,
       icon: '/assets/Received.svg',
       label: 'Completed',
       labelColor: 'bg-yellow-100 text-yellow-600',
       date: '2024-06-27 10:30 AM'
     },
     {
       title: 'Completed',
       description: 'Client confirmed receipt',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Completed',
       labelColor: 'bg-yellow-100 text-yellow-600',
       date: '2024-06-27 10:30 AM'
     }
   ]
 },
 {
   id: 'TRK002',
   trackingId: 'TRK002',
   orderId: 'ORD-2024-002',
   clientName: 'Sarah Johnson',
   phone: '+1 (555) 987-6543',
   dateTime: '2024-06-27',
   time: '10:30',
   buyer: {
     name: 'Sarah Johnson',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Event Planners',
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'Wedding Decorations, Flowers',
   destination: '789 Wedding Venue, Romance City',
   status: 'On the way',
   statusColor: 'text-pink-600 bg-pink-50',
   statusLabel: 'In Transit',
   totalPrice: '$1,850.00',
   progressNote: 'Items are currently being transported to the venue. Expected arrival in 2 hours.',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-26 11:00 AM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-orange-100 text-orange-600',
       date: '2024-06-26 12:30 PM'
     },
     {
       title: 'Picked Up',
       description: 'Order picked up from location',
       completed: true,
       icon: '/assets/Pickup.svg',
       label: 'Driver',
       labelColor: 'bg-green-100 text-green-600',
       date: '2024-06-27 07:00 AM'
     },
     {
       title: 'Delivered',
       description: 'Order delivered to destination',
       completed: false,
       icon: '/assets/Delivered.svg',
       label: 'In Transit',
       labelColor: 'bg-blue-100 text-blue-600',
       date: '2024-06-27 09:00 AM'
     },
     {
       title: 'Received',
       description: 'Client confirmed receipt',
       completed: false,
       icon: '/assets/Received.svg',
       label: 'Completed',
       labelColor: 'bg-gray-100 text-gray-600',
       date: 'Expected: 2024-06-27 12:00 PM'
     }
   ]
 },
 {
   id: 'TRK003',
   trackingId: 'TRK003',
   orderId: 'ORD-2024-003',
   clientName: 'Michael Brown',
   phone: '+1 (555) 456-7890',
   dateTime: '2024-06-26',
   time: '14:20',
   buyer: {
     name: 'Michael Brown',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Catering Co',
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'Catering Equipment, Tables',
   destination: '321 Event Center, Downtown',
   status: 'Received back',
   statusColor: 'text-orange-600 bg-orange-50',
   statusLabel: 'Returned',
   totalPrice: '$1,200.00',
   progressNote: 'Order has been returned due to customer request. Full refund processed.',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-24 10:00 AM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-orange-100 text-orange-600',
       date: '2024-06-24 11:30 AM'
     },
     {
       title: 'Picked Up',
       description: 'Order picked up from location',
       completed: true,
       icon: '/assets/Pickup.svg',
       label: 'Driver',
       labelColor: 'bg-green-100 text-green-600',
       date: '2024-06-25 09:00 AM'
     },
     {
       title: 'Delivered',
       description: 'Order delivered to destination',
       completed: true,
       icon: '/assets/Delivered.svg',
       label: 'In Transit',
       labelColor: 'bg-blue-100 text-blue-600',
       date: '2024-06-25 14:00 PM'
     },
     {
       title: 'Received',
       description: 'Client confirmed receipt',
       completed: true,
       icon: '/assets/Received.svg',
       label: 'Completed',
       labelColor: 'bg-yellow-100 text-yellow-600',
       date: '2024-06-26 14:20 PM'
     }
   ]
 },
 {
   id: 'TRK004',
   trackingId: 'TRK004',
   orderId: 'ORD-2024-004',
   clientName: 'Emily Davis',
   phone: '+1 (555) 789-0123',
   dateTime: '2024-06-25',
   time: '16:45',
   buyer: {
     name: 'Emily Davis',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Elite Events',
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'Lighting Equipment, Decorations',
   destination: '654 Grand Ballroom, Luxury District',
   status: 'Complete',
   statusColor: 'text-green-600 bg-green-50',
   statusLabel: 'Complete',
   totalPrice: '$3,750.00',
   progressNote: 'Order completed successfully. Customer feedback received and payment confirmed.',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-23 09:30 AM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-orange-100 text-orange-600',
       date: '2024-06-23 10:00 AM'
     },
     {
       title: 'Picked Up',
       description: 'Order picked up from location',
       completed: true,
       icon: '/assets/Pickup.svg',
       label: 'Driver',
       labelColor: 'bg-green-100 text-green-600',
       date: '2024-06-24 15:00 PM'
     },
     {
       title: 'Delivered',
       description: 'Order delivered to destination',
       completed: true,
       icon: '/assets/Delivered.svg',
       label: 'In Transit',
       labelColor: 'bg-blue-100 text-blue-600',
       date: '2024-06-25 08:00 AM'
     },
     {
       title: 'Received',
       description: 'Client confirmed receipt',
       completed: true,
       icon: '/assets/Received.svg',
       label: 'Completed',
       labelColor: 'bg-yellow-100 text-yellow-600',
       date: '2024-06-25 16:45 PM'
     }
   ]
 },
 {
   id: 'TRK005',
   trackingId: 'TRK005',
   orderId: 'ORD-2024-005',
   clientName: 'David Wilson',
   phone: '+1 (555) 234-5678',
   dateTime: '2024-06-24',
   time: '11:15',
   buyer: {
     name: 'David Wilson',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Party Perfect',
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'Sound System, Microphones',
   destination: '987 Community Hall, Suburbs',
   status: 'Rejected',
   statusColor: 'text-red-600 bg-red-50',
   statusLabel: 'Rejected',
   totalPrice: '$890.00',
   progressNote: 'Order was rejected by vendor due to unavailability of requested items during the specified time.',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-23 14:00 PM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: false,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-gray-100 text-gray-600',
       date: 'Not completed'
     }
   ]
 },
 {
   id: 'TRK006',
   trackingId: 'TRK006',
   orderId: 'ORD-2024-006',
   clientName: 'Lisa Anderson',
   phone: '+1 (555) 345-6789',
   dateTime: '2024-06-26',
   time: '09:30',
   buyer: {
     name: 'Lisa Anderson',
     avatar: '/assets/jaydeep.png'
   },
   seller: {
     name: 'Dream Weddings',
     avatar: '/assets/Vendor1.png'
   },
   itemList: 'Wedding Arch, Flowers, Chairs',
   destination: '123 Garden Venue, Countryside',
   status: 'Claim',
   statusColor: 'text-purple-600 bg-purple-50',
   statusLabel: 'Claimed',
   totalPrice: '$2,150.00',
   progressNote: 'Customer has filed a claim regarding damaged items. Investigation in progress.',
   timeline: [
     {
       title: 'Request Sent',
       description: 'Client sent order request',
       completed: true,
       icon: '/assets/Sent.svg',
       label: 'Client',
       labelColor: 'bg-pink-100 text-pink-600',
       date: '2024-06-24 08:00 AM'
     },
     {
       title: 'Order Accepted',
       description: 'Vendor accepted the order',
       completed: true,
       icon: '/assets/Accepted.svg',
       label: 'Confirmed',
       labelColor: 'bg-orange-100 text-orange-600',
       date: '2024-06-24 09:30 AM'
     },
     {
       title: 'Picked Up',
       description: 'Order picked up from location',
       completed: true,
       icon: '/assets/Pickup.svg',
       label: 'Driver',
       labelColor: 'bg-green-100 text-green-600',
       date: '2024-06-25 16:00 PM'
     },
     {
       title: 'Delivered',
       description: 'Order delivered to destination',
       completed: true,
       icon: '/assets/Delivered.svg',
       label: 'In Transit',
       labelColor: 'bg-blue-100 text-blue-600',
       date: '2024-06-26 07:00 AM'
     },
     {
       title: 'Received',
       description: 'Client confirmed receipt',
       completed: true,
       icon: '/assets/Received.svg',
       label: 'Completed',
       labelColor: 'bg-yellow-100 text-yellow-600',
       date: '2024-06-26 09:30 AM'
     }
   ]
 }
];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value
      };
      
      // Reset subcategory when main category changes
      if (filterType === 'mainCategory') {
        newFilters.subCategory = 'Sub Category';
      }
      
      return newFilters;
    });
  };

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
    handleFilterChange('date', dateString);
    setShowCalendar(false);
  };

  const isToday = (day) => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() &&
           currentMonth.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === currentMonth.getFullYear() &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getDate() === day;
  };

  // Modal handlers
  const handleBuyerClick = (buyer, order, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
    setSelectedBuyer(buyer);
    setSelectedOrder(order); // Store the current order for tracking
    setShowBuyerModal(true);
    setShowSellerModal(false); // Close seller modal if open
  };

  const handleSellerClick = (seller, order, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
    setSelectedSeller(seller);
    setSelectedOrder(order); // Store the current order for tracking
    setShowSellerModal(true);
    setShowBuyerModal(false); // Close buyer modal if open
  };

  const closeBuyerModal = () => {
    setShowBuyerModal(false);
    setSelectedBuyer(null);
  };

  const closeSellerModal = () => {
    setShowSellerModal(false);
    setSelectedSeller(null);
  };

  const handleViewOrderClick = (order) => {
    setSelectedOrder(order);
    setShowTrackOrderModal(true);
  };

  const closeTrackOrderModal = () => {
    setShowTrackOrderModal(false);
    setSelectedOrder(null);
  };

  const handleDownloadPDF = () => {
    // Handle PDF download logic here
    console.log('Downloading PDF for order:', selectedOrder?.trackingId);
    // You can implement actual PDF generation here
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Tracking" subtitle="You can track, see status and download the invoice" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">All Order Tracking</h1>
            <p className="text-md text-gray-400">
              You can track, see status and download the invoice
            </p>
          </div>

          {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Item Name/ID Search */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Item Name / ID"
                    value={selectedFilters.itemName}
                    onChange={(e) => handleFilterChange('itemName', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                </div>
              </div>

              {/* Main Category */}
              <div className="lg:col-span-1">
                <div className="relative" ref={mainCategoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setOpenMainCategoryDropdown(!openMainCategoryDropdown)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {selectedFilters.mainCategory}
                  </button>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {openMainCategoryDropdown && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                      <button
                        onClick={() => {
                          handleFilterChange('mainCategory', 'Main Category');
                          setOpenMainCategoryDropdown(false);
                        }}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50"
                      >
                        Main Category
                      </button>
                      {mainCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            handleFilterChange('mainCategory', category);
                            setOpenMainCategoryDropdown(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sub Category */}
              <div className="lg:col-span-1">
                <div className="relative" ref={subCategoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedFilters.mainCategory !== 'Main Category') {
                        setOpenSubCategoryDropdown(!openSubCategoryDropdown);
                      }
                    }}
                    className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left transition-colors ${
                      selectedFilters.mainCategory === 'Main Category' 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                    }`}
                    disabled={selectedFilters.mainCategory === 'Main Category'}
                  >
                    {selectedFilters.mainCategory === 'Main Category' 
                      ? 'Select Main Category ' 
                      : selectedFilters.subCategory
                    }
                  </button>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {openSubCategoryDropdown && selectedFilters.mainCategory !== 'Main Category' && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 max-h-60 overflow-y-auto scrollbar-hide">
                      <button
                        onClick={() => {
                          handleFilterChange('subCategory', 'Sub Category');
                          setOpenSubCategoryDropdown(false);
                        }}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50"
                      >
                        Sub Category
                      </button>
                      {getSubCategories().map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            handleFilterChange('subCategory', category);
                            setOpenSubCategoryDropdown(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* All Vendors */}
              <div className="lg:col-span-1">
                <div className="relative" ref={vendorDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setOpenVendorDropdown(!openVendorDropdown)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {selectedFilters.vendor}
                  </button>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {openVendorDropdown && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 max-h-60 overflow-y-auto scrollbar-hide">
                      <button
                        onClick={() => {
                          handleFilterChange('vendor', 'All Vendors');
                          setOpenVendorDropdown(false);
                        }}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50"
                      >
                        All Vendors
                      </button>
                      {vendors.map((vendor) => (
                        <button
                          key={vendor}
                          onClick={() => {
                            handleFilterChange('vendor', vendor);
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

              {/* Filter by Date */}
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
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateSelect(day)}
                              className={`h-10 text-sm font-medium rounded-lg transition-colors ${
                                isSelected(day)
                                  ? 'bg-pink-500 text-white'
                                  : isToday(day)
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
            </div>
       

          {/* Tracking Table - Desktop Only */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-100 border-b border-gray-200 rounded-t-xl">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Info</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Info</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item List</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trackingData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">{order.trackingId}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-black">
                        <div>
                          <div>{order.dateTime}</div>
                          <div className="text-xs text-gray-400">{order.time}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors" onClick={(e) => handleBuyerClick(order.buyer, order, e)}>
                          <img src={order.buyer.avatar} alt={order.buyer.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-black">{order.buyer.name}</div>
                            <div className="text-xs text-gray-400">Buyer</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors" onClick={(e) => handleSellerClick(order.seller, order, e)}>
                          <img src={order.seller.avatar} alt={order.seller.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-black">{order.seller.name}</div>
                            <div className="text-xs text-gray-400">Seller</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          {order.itemList.split(', ').map((item, index) => (
                            <div key={index} className="truncate text-xs">{item}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-black font-medium max-w-xs">
                        <div className="space-y-1">
                          {order.destination.split(', ').map((part, index) => (
                            <div key={index} className="truncate text-xs">{part}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>{order.status}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <img src="/assets/Download.svg" alt="Download" className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200" onClick={() => handleViewOrderClick(order)}>
                            <img src="/assets/View.svg" alt="View" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View - Only visible on mobile */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-100">
              {trackingData.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors bg-white rounded-3xl shadow-sm mb-4">
                  {/* Card Header: Tracking ID, Status, Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-black px-2 py-1 rounded-lg">{order.trackingId}</span>
                      <span className={`text-xs font-medium rounded-full px-2 py-1 ml-2 ${order.statusColor}`}>{order.status}</span>
                    </div>
                    <div className="text-xs text-gray-400">{order.dateTime} {order.time}</div>
                  </div>

                  {/* Buyer & Seller Info - Seller aligned right */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleBuyerClick(order.buyer, order, e)}>
                      <img src={order.buyer.avatar} alt={order.buyer.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-semibold text-black">{order.buyer.name}</div>
                        <div className="text-xs text-gray-400">Buyer</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer justify-end" onClick={(e) => handleSellerClick(order.seller, order, e)}>
                      <img src={order.seller.avatar} alt={order.seller.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="text-right">
                        <div className="text-xs font-semibold text-black">{order.seller.name}</div>
                        <div className="text-xs text-gray-400">Seller</div>
                      </div>
                    </div>
                  </div>

                  {/* Item List & Destination */}
                  <div className="mb-5 mt-5">
                    <div className="text-xs font-medium text-black uppercase mb-1">Items</div>
                    <div className="flex flex-wrap gap-2">
                      {order.itemList.split(', ').map((item, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs font-medium text-black uppercase mb-1">Destination</div>
                    <div className="flex flex-wrap gap-2">
                      {order.destination.split(', ').map((part, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">{part}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-2 justify-end">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <img src="/assets/Download.svg" alt="Download" className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200" onClick={() => handleViewOrderClick(order)}>
                      <img src="/assets/View.svg" alt="View" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Components */}
      <BuyerDetailsModal 
        isOpen={showBuyerModal}
        onClose={closeBuyerModal}
        buyer={selectedBuyer}
        position={modalPosition}
        onTrackOrder={handleViewOrderClick}
        currentOrder={selectedOrder}
      />
      
      <SellerDetailsModal 
        isOpen={showSellerModal}
        onClose={closeSellerModal}
        seller={selectedSeller}
        position={modalPosition}
        onTrackOrder={handleViewOrderClick}
        currentOrder={selectedOrder}
      />

      <TrackOrderModal 
        open={showTrackOrderModal}
        onClose={closeTrackOrderModal}
        order={selectedOrder}
        onDownload={handleDownloadPDF}
      />
    </div>
  );
};

export default Tracking;
