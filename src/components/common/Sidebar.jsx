import React, { useState } from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '/assets/Dashboard.svg'
    },
    {
      id: 'user-management',
      name: 'User Management',
      icon: '/assets/User.svg'
    },
    {
      id: 'listing-management',
      name: 'Listing Management',
      icon: '/assets/Listing.svg'
    },
    {
      id: 'booking-analytics',
      name: 'Booking Analytics',
      icon: '/assets/Booking.svg'
    },
    {
      id: 'tracking',
      name: 'Tracking',
      icon: '/assets/Tracking.svg'
    },
    {
      id: 'role-management',
      name: 'Role Management',
      icon: '/assets/Role.svg'
    },
    {
      id: 'payment-plans',
      name: 'Fee & Plans',
      icon: '/assets/Plans.svg'
    },
    {
      id: 'reporting',
      name: 'Reporting',
      icon: '/assets/Reporting.svg'
    },
    {
      id: 'blog-management',
      name: 'Blog Management',
      icon: '/assets/Blog.svg'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: '/assets/Bell.svg'
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Collapsible Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 ${collapsed ? 'w-16' : 'w-64'}
        bg-white border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Collapse Button */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-2 py-6 border-b border-gray-200`}>
            {collapsed ? (
              <img src="/assets/Evenlyo.svg" alt="Evenlyo Icon" className="h-8 w-auto transition-all duration-300 ml-2" />
            ) : (
              <img src="/assets/Logo.png" alt="Evenlyo Brand" className="h-8 w-auto transition-all duration-300 " />
            )}
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className={`hidden lg:flex items-center justify-center ml-2  rounded hover:bg-gray-100 transition ${collapsed ? 'rotate-180' : ''}`}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${collapsed ? 'px-1 py-4' : 'px-4 py-4'}`}>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 px-1 py-2.5 rounded-r-xl  text-left transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'bg-pink-100 text-pink-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={collapsed ? item.name : ''}
                  >
                    <span className={`${currentPage === item.id ? 'text-pink-600' : 'text-gray-400'}`}>
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={`w-5 h-5 ${currentPage === item.id ? 'sidebar-pink-icon' : ''}`}
                        style={currentPage === item.id ? { filter: 'invert(38%) sepia(99%) saturate(7471%) hue-rotate(312deg) brightness(97%) contrast(101%)' } : {}}
                      />
                    </span>
                    {!collapsed && <span className="font-medium text-sm">{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Navigation Section */}
          <div className={`${collapsed ? 'px-1 py-4' : 'px-4 py-4'} space-y-2`}> 
            <button
              onClick={() => {
                setCurrentPage('customer-support');
                setIsOpen(false);
              }}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 px-0 py-2.5 rounded-r-xl text-left transition-colors duration-200 ${
                currentPage === 'customer-support'
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? 'Customer Support' : ''}
            >
              <span className={`${currentPage === 'customer-support' ? 'text-gradient' : 'text-gray-400'}`}>
                <img
                  src="/assets/User.svg"
                  alt="Customer Support"
                  className={`w-5 h-5 ${currentPage === 'customer-support' ? 'sidebar-pink-icon' : ''}`}
                  style={currentPage === 'customer-support' ? { filter: 'invert(38%) sepia(99%) saturate(7471%) hue-rotate(312deg) brightness(97%) contrast(101%)' } : {}}
                />
              </span>
              {!collapsed && <span className="font-medium text-sm">Customer Support</span>}
            </button>

            <button
              onClick={() => {
                setCurrentPage('settings');
                setIsOpen(false);
              }}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 px-0 py-3 rounded-r-xl text-left transition-colors duration-200 ${
                currentPage === 'settings'
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? 'Settings' : ''}
            >
              <span className={`${currentPage === 'settings' ? 'text-white' : 'text-gray-400'}`}>
                <svg
                  className={`w-5 h-5 ${currentPage === 'settings' ? 'sidebar-pink-icon' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={currentPage === 'settings' ? { filter: 'invert(38%) sepia(99%) saturate(7471%) hue-rotate(312deg) brightness(97%) contrast(101%)' } : {}}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {!collapsed && <span className="font-medium text-sm">Settings</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
