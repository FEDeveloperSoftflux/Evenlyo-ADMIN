import React, { useState, useEffect, useRef } from 'react';
import BlockVendorModal from './BlockVendorModal';
import SendEmailModal from './SendEmailModal';
import ViewPasswordModal from './ViewPasswordModal';
import ChangePasswordModal from './ChangePasswordModal';
import VendorProfileModal from './VendorProfileModal';
import SuccessModal from '../common/SuccessModal';

const UserTable = ({ userType = 'clients', selectedPlan = 'All Plans', filters = {}, onSelectedUsersChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isViewPasswordModalOpen, setIsViewPasswordModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const usersPerPage = 10;
  const dropdownRef = useRef(null);

  // Mock user data - separated by type (now as state)
  const [allUsers, setAllUsers] = useState([
  // Clients
  {
    sn: '01',
    id: 'CLT001',
    name: 'John Smith',
    address: '123 Business Park...',
    contact: '+1-555-0201',
    orders: '156',
    subscription: 'Premium',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'client',
    joinDate: '2024-06-27',
    email: 'john.smith@example.com'
  },
  {
    sn: '02',
    id: 'CLT002',
    name: 'Sarah Johnson',
    address: '456 Market St...',
    contact: '+1-555-0202',
    orders: '89',
    subscription: 'Standard',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'client',
    joinDate: '2024-06-25',
    email: 'sarah.johnson@example.com'
  },
  {
    sn: '03',
    id: 'CLT003',
    name: 'Mike Wilson',
    address: '789 Style Ave...',
    contact: '+1-555-0203',
    orders: '34',
    subscription: 'Premium',
    status: 'Blocked',
    avatar: '/assets/jaydeep.png',
    type: 'client',
    joinDate: '2024-06-20',
    email: 'mike.wilson@example.com'
  },
  {
    sn: '04',
    id: 'CLT004',
    name: 'Emily Davis',
    address: '123 Business Park...',
    contact: '+1-555-0204',
    orders: '10',
    subscription: 'Standard',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'client',
    joinDate: '2024-06-18',
    email: 'emily.davis@example.com'
  },
  // Vendors
  {
    sn: '05',
    id: 'VND001',
    name: 'Tech Solutions Inc',
    address: '456 Market St...',
    contact: '+1-555-0301',
    orders: '100',
    subscription: 'Premium',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'vendor',
    joinDate: '2024-06-26',
    email: 'contact@techsolutions.com'
  },
  {
    sn: '06',
    id: 'VND002',
    name: 'Supply Chain Co',
    address: '789 Style Ave...',
    contact: '+1-555-0302',
    orders: '129',
    subscription: 'Standard',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'vendor',
    joinDate: '2024-06-22',
    email: 'info@supplychainco.com'
  },
  {
    sn: '07',
    id: 'VND003',
    name: 'Global Suppliers',
    address: '321 Industrial Blvd...',
    contact: '+1-555-0303',
    orders: '78',
    subscription: 'Premium',
    status: 'Block',
    avatar: '/assets/jaydeep.png',
    type: 'vendor',
    joinDate: '2024-06-15',
    email: 'support@globalsuppliers.com'
  },
  {
    sn: '08',
    id: 'SUP001',
    name: 'Quality Parts Ltd',
    address: '654 Commerce St...',
    contact: '+1-555-0401',
    orders: '45',
    subscription: 'Standard',
    status: 'Active',
    avatar: '/assets/jaydeep.png',
    type: 'vendor',
    joinDate: '2024-06-10',
    email: 'sales@qualitypartsltd.com'
  }
]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [userType, selectedPlan, filters]);

  // Clear selected users when userType changes (switching between clients/vendors)
  useEffect(() => {
    setSelectedUsers([]);
  }, [userType]);

  // Notify parent component about selected users changes
  useEffect(() => {
    if (onSelectedUsersChange) {
      const selectedUserData = allUsers.filter(user => selectedUsers.includes(user.sn));
      onSelectedUsersChange(selectedUserData);
    }
  }, [selectedUsers, onSelectedUsersChange, allUsers]);

  // Filter users by type first
  const usersByType = allUsers.filter(user => {
    if (userType === 'clients') {
      return user.type === 'client';
    } else {
      return user.type === 'vendor';
    }
  });

  const totalPages = Math.ceil(usersByType.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  
  // Apply comprehensive filtering
  const filteredUsers = usersByType.filter(user => {
    // Plan/Status filter based on user type
    if (userType === 'clients') {
      // For clients, filter by status
      if (selectedPlan !== 'All Status' && user.status !== selectedPlan) {
        return false;
      }
    } else {
      // For vendors, filter by subscription plan
      if (selectedPlan !== 'All Plans' && user.subscription !== selectedPlan) {
        return false;
      }
    }
    
    // Subscription plan filter (from filter dropdown)
    if (filters.subscriptionPlan && user.subscription !== filters.subscriptionPlan) {
      return false;
    }
    
    // Status filter
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    
    // Join date filter (mock implementation - in real app, you'd have actual dates)
    if (filters.joinDate) {
      // This is a mock implementation. In a real app, you'd compare actual dates
      // For now, we'll just filter based on user ID as a demo
      if (filters.joinDate === 'today' && !['01', '02', '05'].includes(user.sn)) return false;
      if (filters.joinDate === 'week' && !['01', '02', '03', '05', '06'].includes(user.sn)) return false;
      if (filters.joinDate === 'month' && !['01', '02', '03', '04', '05', '06', '07'].includes(user.sn)) return false;
    }
    
    // Main category filter (mock implementation)
    if (filters.mainCategory) {
      // This is a mock implementation. In a real app, you'd have a category field
      // For now, we'll just filter based on some logic
      if (filters.mainCategory === 'Electronics' && user.type === 'vendor') return true;
      if (filters.mainCategory === 'Fashion' && user.type === 'client') return true;
      if (filters.mainCategory && !['Electronics', 'Fashion'].includes(filters.mainCategory)) return false;
    }
    
    return true;
  });
  
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  const filteredTotalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSelectUser = (userSn) => {
    setSelectedUsers(prev => 
      prev.includes(userSn) 
        ? prev.filter(sn => sn !== userSn)
        : [...prev, userSn]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.sn));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Block':
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription) => {
    switch (subscription) {
      case 'Premium':
        return 'bg-green-100 text-green-800';
      case 'Standard':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const toggleDropdown = (userSn) => {
    setOpenDropdown(openDropdown === userSn ? null : userSn);
  };

  const handleAction = (action, userSn) => {
    const user = allUsers.find(u => u.sn === userSn);
    
    if (action === 'block') {
      setSelectedVendor(user);
      setIsBlockModalOpen(true);
    } else if (action === 'sendEmail') {
      setSelectedVendor(user);
      setIsEmailModalOpen(true);
    } else if (action === 'changePassword') {
      setSelectedVendor(user);
      setIsViewPasswordModalOpen(true);
    } else if (action === 'open') {
      setSelectedVendor(user);
      setIsProfileModalOpen(true);
    } else {
      console.log(`Action: ${action} for user: ${userSn}`);
    }
    setOpenDropdown(null);
  };

  const handleBlockVendor = (blockData) => {
    console.log('Blocking/Unblocking vendor:', blockData);
    
    // Update the user's status - toggle between Active and Blocked
    const isCurrentlyBlocked = selectedVendor?.status === 'Blocked';
    const newStatus = isCurrentlyBlocked ? 'Active' : 'Blocked';
    
    setAllUsers(prevUsers => 
      prevUsers.map(user => 
        user.sn === selectedVendor?.sn 
          ? { ...user, status: newStatus }
          : user
      )
    );
    
    // Here you would typically make an API call to block/unblock the vendor
    setIsBlockModalOpen(false);
    setSuccessMessage({
      title: `${userType === 'clients' ? 'Client' : 'Vendor'} ${isCurrentlyBlocked ? 'Unblocked' : 'Blocked'} Successfully`,
      message: `The ${userType === 'clients' ? 'client' : 'vendor'} has been ${isCurrentlyBlocked ? 'unblocked' : 'blocked'} and notification email has been sent.`
    });
    setIsSuccessModalOpen(true);
  };

  const handleSendEmail = (emailData) => {
    console.log('Sending email:', emailData);
    // Here you would typically make an API call to send the email
    setIsEmailModalOpen(false);
    setSuccessMessage({
      title: `Email Sent Successfully`,
      message: `The promotional email has been sent to the ${userType === 'clients' ? 'client' : 'vendor'} successfully.`
    });
    setIsSuccessModalOpen(true);
  };

  const handleChangePassword = (userData) => {
    // Close view password modal and open change password modal
    setIsViewPasswordModalOpen(false);
    setIsChangePasswordModalOpen(true);
  };

  const handleSaveNewPassword = (passwordData) => {
    console.log('Changing password:', passwordData);
    // Here you would typically make an API call to change the password
    setIsChangePasswordModalOpen(false);
    setSuccessMessage({
      title: `Password Changed Successfully`,
      message: `The password for ${userType === 'clients' ? 'client' : 'vendor'} has been updated successfully.`
    });
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Mobile Select All Header - Only visible on mobile */}
      <div className="lg:hidden bg-pink-100 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedUsers.length === currentUsers.length && currentUsers.length > 0 ? 'bg-gradient-brand border-pink-600' : 'border-gray-300 bg-white'}`}
            onClick={handleSelectAll}
            role="checkbox"
            aria-checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
            tabIndex={0}
          >
            {selectedUsers.length === currentUsers.length && currentUsers.length > 0 && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">
            Select All ({selectedUsers.length} selected)
          </span>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100" colSpan={2}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedUsers.length === currentUsers.length && currentUsers.length > 0 ? 'bg-gradient-brand border-white' : 'border-gray-300 bg-white'}`}
                    onClick={handleSelectAll}
                    role="checkbox"
                    aria-checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    tabIndex={0}
                  >
                    {selectedUsers.length === currentUsers.length && currentUsers.length > 0 && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>S#</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Orders
              </th>
              {userType === 'vendors' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                  Subscription
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr key={user.sn} className="hover:bg-gray-50">
                <td className="px-6 py-4" colSpan={2}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedUsers.includes(user.sn) ? 'bg-gradient-brand border-white' : 'border-gray-300 bg-white'}`}
                      onClick={() => handleSelectUser(user.sn)}
                      role="checkbox"
                      aria-checked={selectedUsers.includes(user.sn)}
                      tabIndex={0}
                    >
                      {selectedUsers.includes(user.sn) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-900">{user.sn}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{user.id}</div>
                    <div className="text-xs text-gray-500">{user.joinDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.contact}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.orders}
                </td>
                {userType === 'vendors' && (
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSubscriptionColor(user.subscription)}`}>
                      {user.subscription}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="relative ">
                    <button
                      onClick={() => toggleDropdown(user.sn)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {openDropdown === user.sn && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 fade-in-mobile"
                      >
                        <button
                          onClick={() => handleAction('block', user.sn)}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                        </button>
                        {userType !== 'clients' && (
                          <button
                            onClick={() => handleAction('open', user.sn)}
                            className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                          >
                            Open Profile
                          </button>
                        )}
                        <button
                          onClick={() => handleAction('sendEmail', user.sn)}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          Send Email
                        </button>
                        <button
                          onClick={() => handleAction('changePassword', user.sn)}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                          View/ change password
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Only visible on mobile */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-100">
          {currentUsers.map((user) => (
            <div key={user.sn} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Card Header with Avatar, Name and Selection */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedUsers.includes(user.sn) ? 'bg-gradient-brand border-pink-600' : 'border-gray-300 bg-white'}`}
                    onClick={() => handleSelectUser(user.sn)}
                    role="checkbox"
                    aria-checked={selectedUsers.includes(user.sn)}
                    tabIndex={0}
                  >
                    {selectedUsers.includes(user.sn) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-base font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">S# {user.sn}</div>
                  </div>
                </div>
                
                {/* Actions Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(user.sn)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  {openDropdown === user.sn && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 fade-in-mobile"
                    >
                      <button
                        onClick={() => handleAction('block', user.sn)}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                      {userType !== 'clients' && (
                        <button
                          onClick={() => handleAction('open', user.sn)}
                          className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          Open Profile
                        </button>
                      )}
                      <button
                        onClick={() => handleAction('sendEmail', user.sn)}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        Send Email
                      </button>
                      <button
                        onClick={() => handleAction('changePassword', user.sn)}
                        className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        View/ change password
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content - User Details */}
              <div className="space-y-2">
                {/* ID and Join Date */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">ID</span>
                    <p className="text-sm font-medium text-gray-900">{user.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase">Join Date</span>
                    <p className="text-sm text-gray-900">{user.joinDate}</p>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Address</span>
                  <p className="text-sm text-gray-900">{user.address}</p>
                </div>

                {/* Contact and Orders */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Contact</span>
                    <p className="text-sm text-gray-900">{user.contact}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase">Orders</span>
                    <p className="text-sm font-semibold text-gray-900">{user.orders}</p>
                  </div>
                </div>

                {/* Subscription (for vendors) and Status */}
                <div className="flex justify-between items-center">
                  {userType === 'vendors' && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Subscription</span>
                      <div className="mt-1">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getSubscriptionColor(user.subscription)}`}>
                          {user.subscription}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={userType === 'vendors' ? 'text-right' : ''}>
                    <span className="text-xs font-medium text-gray-500 uppercase">Status</span>
                    <div className="mt-1">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 lg:px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} {userType}
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(filteredTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 text-sm border rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-gradient-brand text-white border-pink-600'
                    : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, filteredTotalPages))}
              disabled={currentPage === filteredTotalPages}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Block Vendor Modal */}
      <BlockVendorModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        userData={selectedVendor}
        userType={userType === 'clients' ? 'client' : 'vendor'}
        onBlock={handleBlockVendor}
      />

      {/* Send Email Modal */}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        userData={selectedVendor}
        userType={userType === 'clients' ? 'client' : 'vendor'}
        onSend={handleSendEmail}
      />

      {/* View Password Modal */}
      <ViewPasswordModal
        isOpen={isViewPasswordModalOpen}
        onClose={() => setIsViewPasswordModalOpen(false)}
        userData={selectedVendor}
        userType={userType === 'clients' ? 'client' : 'vendor'}
        onChangePassword={handleChangePassword}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        userData={selectedVendor}
        userType={userType === 'clients' ? 'client' : 'vendor'}
        onSave={handleSaveNewPassword}
      />

      {/* Vendor Profile Modal */}
      <VendorProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={selectedVendor}
        userType={userType === 'clients' ? 'client' : 'vendor'}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title={successMessage.title}
        message={successMessage.message}
      />
    </div>
  );
};

export default UserTable;