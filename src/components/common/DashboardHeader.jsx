import React, { useState, useEffect, useRef } from 'react';

const DashboardHeader = ({ title = "Dashboard", subtitle }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-100 border-b border-gray-200 z-40">
      <div className="container-7xl 2xl:container-9xl 3xl:container-10xl container-responsive">
        <div className="flex items-center justify-between py-3 3xl:py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-black ml-8">{title}</h1>

              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-1">
            {/* Notifications */}
            <div className="relative" ref={notificationDropdownRef}>
              <button className="touch-target relative" onClick={toggleNotificationDropdown}>
                <img src="/assets/Bell.svg" alt="Notifications" className="w-7 h-7 text-gray-600 bg-gray-200 p-1 rounded-full" />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2 px-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg text-gray-900">Notifications</span>
                      <button
                        className="text-pink-600 text-sm font-medium hover:underline"
                        onClick={() => {
                          if (typeof window.setCurrentPage === 'function') {
                            window.setCurrentPage('notifications');
                          } else {
                            window.location.reload();
                          }
                        }}
                      >
                        See All
                      </button>
                    </div>
                    {/* Example notifications list */}
                    <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                      <li className="py-2 text-gray-700">No new notifications.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/assets/jaydeep.png" alt="Jaydeep" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">Jaydeep</p>
                  <p className="text-xs text-gray-500">jaydeep@gmail.com</p>
                </div>
                <svg className="w-4 h-4 text-gray-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {/* Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                          <img src="/assets/jaydeep.png" alt="Jaydeep" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Jaydeep</p>
                          <p className="text-xs text-gray-500">jaydeep@gmail.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </a>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        type="button"
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => {
                          localStorage.removeItem("adminLoggedIn");
                          window.location.reload();
                        }}
                      >
                        <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
