import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import UserActionCards from '../components/user/UserActionCards';
import UserTable from '../components/user/UserTable';
import AddVendorModal from '../components/user/AddVendorModal';
import SendEmailModal from '../components/user/SendEmailModal';
import SuccessModal from '../components/common/SuccessModal';
import { sendOtp } from '../services/authentication';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [openPlanDropdown, setOpenPlanDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(activeTab === 'clients' ? 'All Status' : 'All Plans');
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    joinDate: '',
    mainCategory: '',
    status: ''
  });
  const planDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);

  // useEffect(() => {
  //   sendOtp({
  //     email: "sinan@gmail.com"
  //   })
  //     .then(response => {

  //     }).catch(err => {

  //     })
  // }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (planDropdownRef.current && !planDropdownRef.current.contains(event.target)) {
        setOpenPlanDropdown(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setOpenFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selectedPlan when activeTab changes
  useEffect(() => {
    setSelectedPlan(activeTab === 'clients' ? 'All Status' : 'All Plans');
  }, [activeTab]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setOpenPlanDropdown(false);
  };

  const handleFilterSelect = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      joinDate: '',
      mainCategory: '',
      status: ''
    });
    setSelectedPlan(activeTab === 'clients' ? 'All Status' : 'All Plans');
    setOpenFilterDropdown(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSendEmailClick = () => {
    if (selectedUsers.length > 0) {
      setIsEmailModalOpen(true);
    }
  };

  const handleSendBulkEmail = (emailData) => {
    console.log('Sending bulk email:', emailData);
    console.log('To users:', selectedUsers);
    // Here you would typically make an API call to send emails to all selected users
    setIsEmailModalOpen(false);
    setIsSuccessModalOpen(true);
    // Clear selected users after sending
    setSelectedUsers([]);
  };

  const handleSelectedUsersChange = (users) => {
    setSelectedUsers(users);
  };

  // Clear selected users when switching between client/vendor tabs
  useEffect(() => {
    setSelectedUsers([]);
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader
          title="User Management"
          subtitle="Manage users, roles, and permissions"
        />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-responsive-h2 text-gray-900 mb-2">User Management</h1>
              <p className="text-md text-gray-400">
                Manage clients, vendors, and suppliers from one central dashboard
              </p>
            </div>
            <button
              onClick={() => setIsAddVendorModalOpen(true)}
              className="flex items-center gap-2 px-2 sm:px-6 py-3 bg-gradient-brand text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-xs sm:text-sm text-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
              </svg>
              Add New Vendor
            </button>
          </div>

          {/* Action Cards Section */}
          <UserActionCards />

          {/* Tabs Section */}
          <div className="mt-8 mb-6 flex justify-center">
            <div className="relative flex bg-gray-100 p-1 rounded-xl w-full max-w-6xl">
              {/* Sliding background indicator */}
              <div
                className={`absolute top-1 bottom-1 bg-gradient-brand rounded-2xl shadow-sm transition-all duration-300 ease-in-out ${activeTab === 'clients'
                  ? 'left-1 right-1/2 mr-0.5'
                  : 'left-1/2 right-1 ml-0.5'
                  }`}
              />
              <button
                onClick={() => setActiveTab('clients')}
                className={`relative z-10 flex-1 px-8 py-2 rounded-2xl text-base font-medium transition-all duration-300 ${activeTab === 'clients'
                  ? 'text-white'
                  : 'text-black font-bold hover:text-gray-900'
                  }`}
              >
                All Clients
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`relative z-10 flex-1 px-8 py-2 rounded-2xl text-base font-medium transition-all duration-300 ${activeTab === 'vendors'
                  ? 'text-white'
                  : 'text-black font-bold hover:text-gray-900'
                  }`}
              >
                All Vendors
              </button>
            </div>
          </div>

          {/* Filter Controls Section */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left Side - Filters and Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Filters Button */}
                <div className="relative w-full sm:w-auto" ref={filterDropdownRef}>
                  <button
                    onClick={() => setOpenFilterDropdown(!openFilterDropdown)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto"
                  >
                    <img src="/assets/Filter.svg" alt="Filter" className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">Filters</span>
                  </button>

                  {openFilterDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-4">
                      {/* Join Date Filter */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Join Date</label>
                        <select
                          value={filters.joinDate}
                          onChange={(e) => handleFilterSelect('joinDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">All Dates</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="year">This Year</option>
                        </select>
                      </div>

                      {/* Main Category Filter */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Main Category</label>
                        <select
                          value={filters.mainCategory}
                          onChange={(e) => handleFilterSelect('mainCategory', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">All Categories</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Home">Home & Garden</option>
                          <option value="Books">Books</option>
                        </select>
                      </div>

                      {/* All Status Filter */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">All Status</label>
                        <select
                          value={filters.status}
                          onChange={(e) => handleFilterSelect('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Block">Blocked</option>
                        </select>
                      </div>

                      {/* Clear All Filters Button */}
                      <div className="px-4 py-3">
                        <button
                          onClick={clearAllFilters}
                          className="w-full px-4 py-2 bg-gradient-brand text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or ID...."
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Plan Dropdown */}
                <div className="relative w-full sm:w-auto min-w-32" ref={planDropdownRef}>
                  <button
                    onClick={() => setOpenPlanDropdown(!openPlanDropdown)}
                    className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white w-full font-medium text-gray-700"
                  >
                    <span>{selectedPlan}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openPlanDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                      {activeTab === 'clients' ? (
                        // Client Status Options
                        <>
                          <button
                            onClick={() => handlePlanSelect('All Status')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            All Status
                          </button>
                          <button
                            onClick={() => handlePlanSelect('Active')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            Active
                          </button>
                          <button
                            onClick={() => handlePlanSelect('Blocked')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            Blocked
                          </button>
                        </>
                      ) : (
                        // Vendor Plan Options
                        <>
                          <button
                            onClick={() => handlePlanSelect('All Plans')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            All Plans
                          </button>
                          <button
                            onClick={() => handlePlanSelect('Standard')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            Standard
                          </button>
                          <button
                            onClick={() => handlePlanSelect('Premium')}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                          >
                            Premium
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Side - Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Export CSV */}
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">Export CSV</span>
                  <span className="text-sm font-medium text-gray-700 sm:hidden">CSV</span>
                </button>

                {/* Export PDF */}
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">Export PDF</span>
                  <span className="text-sm font-medium text-gray-700 sm:hidden">PDF</span>
                </button>

                {/* Send Email */}
                <button
                  onClick={handleSendEmailClick}
                  disabled={selectedUsers.length === 0}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors w-full sm:w-auto ${selectedUsers.length > 0
                    ? 'bg-pink-100 text-pink-500 border border-pink-500'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                >
                  <svg className={`w-4 h-4 ${selectedUsers.length > 0 ? 'text-pink-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-sm font-medium hidden sm:inline ${selectedUsers.length > 0 ? 'text-pink-500' : 'text-gray-700'}`}>Send Email ({selectedUsers.length})</span>
                  <span className={`text-sm font-medium sm:hidden ${selectedUsers.length > 0 ? 'text-white' : 'text-gray-700'}`}>Email</span>
                </button>
              </div>
            </div>
          </div>

          {/* Users Table Section */}
          <div className="mt-4">
            <UserTable
              userType={activeTab}
              selectedPlan={selectedPlan}
              filters={filters}
              onSelectedUsersChange={handleSelectedUsersChange}
            />
          </div>
        </main>
      </div>

      {/* Add Vendor Modal */}
      <AddVendorModal
        isOpen={isAddVendorModalOpen}
        onClose={() => setIsAddVendorModalOpen(false)}
      />

      {/* Send Email Modal for Multiple Users */}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        userData={{
          email: `${selectedUsers.length} ${activeTab === 'clients' ? 'clients' : 'vendors'} selected`,
          isMultiple: true,
          users: selectedUsers
        }}
        userType={activeTab === 'clients' ? 'client' : 'vendor'}
        onSend={handleSendBulkEmail}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Emails Sent Successfully"
        message={`Promotional emails have been sent to ${selectedUsers.length} ${activeTab === 'clients' ? 'clients' : 'vendors'} successfully.`}
      />
    </div>
  );
};

export default UserManagement;
