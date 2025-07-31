import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import CreateDesignationModal from '../components/role/CreateDesignationModal';
import CreateRoleModal from '../components/role/CreateRoleModal';

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('designation'); // 'designation' or 'role'
  const [passwordVisibility, setPasswordVisibility] = useState({}); // Track password visibility for each role

  // Sample data for designations
  const [designations, setDesignations] = useState([
    {
      id: 1,
      dateTime: '1/15/2024',
      designation: 'Administrator',
      permissions: [
        { name: 'User Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Content Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Analytics', access: 'View', color: 'text-green-500' },
        { name: 'Settings', access: 'View Edit', color: 'text-green-500' }
      ],
      status: 'Active'
    },
    {
      id: 2,
      dateTime: '1/15/2024',
      designation: 'Administrator',
      permissions: [
        { name: 'User Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Content Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Settings', access: 'View Edit', color: 'text-green-500' }
      ],
      status: 'Active'
    },
    {
      id: 3,
      dateTime: '1/15/2024',
      designation: 'Administrator',
      permissions: [
        { name: 'User Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Settings', access: 'View Edit', color: 'text-green-500' }
      ],
      status: 'Active'
    },
    {
      id: 4,
      dateTime: '1/15/2024',
      designation: 'Administrator',
      permissions: [
        { name: 'User Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Content Management', access: 'View Edit', color: 'text-green-500' },
        { name: 'Analytics', access: 'View', color: 'text-green-500' }
      ],
      status: 'Active'
    }
  ]);

  // Sample data for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      dateTime: '1/15/2024',
      name: 'John Doe',
      role: 'Administrator',
      contact: 'john.doe@example.com',
      phone: '+1234567890',
      password: '••••••••',
      department: 'Analytics',
      status: 'Active',
      avatar: '/assets/jaydeep.png'
    },
    {
      id: 2,
      dateTime: '1/15/2024',
      name: 'Jane Smith',
      role: 'Editor',
      contact: 'jane.smith@example.com',
      phone: '+1234567890',
      password: '••••••••',
      department: 'Analytics',
      status: 'De-Active',
      avatar: '/assets/jaydeep.png'
    },
    {
      id: 3,
      dateTime: '1/15/2024',
      name: 'John Doe',
      role: 'Administrator',
      contact: 'john.doe@example.com',
      phone: '+1234567890',
      password: '••••••••',
      department: 'Analytics',
      status: 'Active',
      avatar: '/assets/jaydeep.png'
    },
    {
      id: 4,
      dateTime: '1/15/2024',
      name: 'Jane Smith',
      role: 'Editor',
      contact: 'jane.smith@example.com',
      phone: '+1234567890',
      password: '••••••••',
      department: 'Analytics',
      status: 'De-Active',
      avatar: '/assets/jaydeep.png'
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit item:', id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'designation') {
        setDesignations(designations.filter(item => item.id !== id));
      } else {
        setRoles(roles.filter(item => item.id !== id));
      }
    }
  };

  const filteredDesignations = designations.filter(designation =>
    designation.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle password visibility
  const togglePasswordVisibility = (roleId) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  // Toggle role status
  const toggleRoleStatus = (roleId) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, status: role.status === 'Active' ? 'De-Active' : 'Active' }
          : role
      )
    );
  };

  // Helper functions for toggle styling
  const getToggleColor = (isActive) => isActive ? 'bg-gradient-brand' : 'bg-pink-100';
  const getToggleThumbPosition = (isActive) => isActive ? 'translate-x-7' : 'translate-x-1';
  const getToggleThumbColor = (isActive) => isActive ? 'bg-white' : 'bg-gradient-brand';
  const getToggleStatus = (isActive) => isActive ? 'Active' : 'De-Active';
  const getStatusTextColor = (isActive) => isActive ? 'text-green-500' : 'text-red-500';

  // Handle creating new designation
  const handleCreateDesignation = (newDesignation) => {
    setDesignations(prevDesignations => [newDesignation, ...prevDesignations]);
  };

  // Handle creating new role
  const handleCreateRole = (newRole) => {
    setRoles(prevRoles => [newRole, ...prevRoles]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Role Management" subtitle="Manage user roles and permissions" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">
              {activeTab === 'designation' ? 'All Designations' : 'All Rolls'}
            </h1>
            <p className="text-md text-gray-400">
              {activeTab === 'designation' 
                ? 'You can add and edit designation' 
                : 'You can add and edit rolls'
              }
            </p>
          </div>

          {/* Toggle Buttons with Sliding Effect */}
          <div className="mb-responsive">
            <div className="relative bg-gray-100 rounded-lg p-1 flex">
              {/* Sliding Background */}
              <div 
                className={`absolute top-1 bottom-1 bg-gradient-brand rounded-2xl transition-all duration-300 ease-in-out ${
                  activeTab === 'designation' ? 'left-1 right-1/2' : 'left-1/2 right-1'
                }`}
              ></div>
              
              {/* Set Designation Button */}
              <button
                onClick={() => setActiveTab('designation')}
                className={`relative z-10 flex-1 py-3 px-4 text-center font-medium rounded-md transition-colors duration-300 ${
                  activeTab === 'designation' 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Set Designation
              </button>
              
              {/* Create New Role Button */}
              <button
                onClick={() => setActiveTab('role')}
                className={`relative z-10 flex-1 py-3 px-4 text-center font-medium rounded-md transition-colors duration-300 ${
                  activeTab === 'role' 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Create New Role
              </button>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-responsive">
            {/* Search */}
            <div className="relative flex-1 w-full -">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Create New Designation Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-gradient-brand text-white px-6 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 whitespace-nowrap"
            >
              <span>+</span>
              {activeTab === 'designation' ? 'Create New Designation' : 'Create New Role'}
            </button>
          </div>

          {/* Table for Large Screens */}
          <section className="mb-responsive">
            <div className="card-mobile overflow-hidden">
              {/* Desktop Table View */}
              <div className="overflow-x-auto hidden lg:block">
                {activeTab === 'designation' ? (
                  // Designations Table
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-pink-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Designation Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          All Access
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDesignations.map((designation) => (
                        <tr key={designation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div className="flex items-center">
                              <div>
                                <div>{designation.dateTime}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div className="flex items-center">
                              <img src="/assets/jaydeep.png" alt="User" className="w-8 h-8 rounded-full mr-2" />
                              <div>
                                <div>{designation.designation}</div>
                                <div className="text-xs text-gray-500">B001</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex flex-wrap gap-2">
                              {designation.permissions.map((permission, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${permission.color} bg-opacity-10`}
                                  style={{ backgroundColor: permission.color === 'text-green-700' ? '#' : '#10b98115' }}
                                >
                                  {permission.name}: {permission.access}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(designation.id)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Edit"
                              >
                                <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(designation.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Delete"
                              >
                                <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  // Roles Table
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contacts
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Password
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRoles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div className="flex items-center">
                              <div>
                                <div>{role.dateTime}</div>
                                <div className="text-xs text-black font-medium">10:30</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div className="flex items-center">
                              <img src={role.avatar} alt="User" className="w-8 h-8 rounded-full mr-2" />
                              <div>
                                <div>{role.name}</div>
                                <div className="text-xs text-gray-500">{role.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div>
                              <div>{role.contact}</div>
                              <div className="text-xs text-black font-medium">{role.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            <div className="flex items-center gap-2">
                              <span>
                                {passwordVisibility[role.id] ? 'MyPassword123' : role.password}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(role.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                title={passwordVisibility[role.id] ? 'Hide password' : 'Show password'}
                              >
                                {passwordVisibility[role.id] ? (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 104.243 4.243M14.121 14.121l1.414 1.414" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <span className="px-2 py-1 rounded-full text-xs font-medium text-green-500 bg-green-50">
                                {role.department}: View
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium text-green-500 bg-green-50">
                                Settings: View Edit
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <button 
                                onClick={() => toggleRoleStatus(role.id)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ease-in-out ${getToggleColor(role.status === 'Active')}`}
                              >
                                <span className="sr-only">Toggle status</span>
                                <span
                                  className={`inline-block h-6 w-6 transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out ${getToggleThumbPosition(role.status === 'Active')} ${getToggleThumbColor(role.status === 'Active')}`}
                                />
                              </button>
                              <span className={`text-sm font-medium ${getStatusTextColor(role.status === 'Active')} min-w-[80px]`}>
                                {getToggleStatus(role.status === 'Active')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(role.id)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Edit"
                              >
                                <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(role.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Delete"
                              >
                                <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden ">
                {activeTab === 'designation' ? (
                  // Designations Cards
                  <div className="space-y-3 bg-gray-50 ">
                    {filteredDesignations.map((designation) => (
                      <div key={designation.id} className=" rounded-3xl border border-gray-200 p-4 shadow-sm bg-white">
                        {/* Header with Date and Actions */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-500">
                            {designation.dateTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(designation.id)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(designation.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Designation Info */}
                        <div className="flex items-center mb-3">
                          <img src="/assets/jaydeep.png" alt="User" className="w-10 h-10 rounded-full mr-3" />
                          <div>
                            <div className="font-medium text-black">{designation.designation}</div>
                            <div className="text-sm text-gray-500">B001</div>
                          </div>
                        </div>

                        {/* Permissions */}
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">Permissions:</div>
                          <div className="flex flex-wrap gap-2">
                            {designation.permissions.map((permission, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full text-xs font-medium text-green-500 bg-green-50"
                              >
                                {permission.name}: {permission.access}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className="text-sm font-medium text-green-500">{designation.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Roles Cards
                  <div className="space-y-4 bg-gray-50*">
                    {filteredRoles.map((role) => (
                      <div key={role.id} className=" rounded-3xl border border-gray-200 p-4 shadow-sm bg-white">
                        {/* Header with Date and Actions */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-500">
                            <div>{role.dateTime}</div>
                            <div className="text-xs text-black font-medium">10:30</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(role.id)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(role.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center mb-4">
                          <img src={role.avatar} alt="User" className="w-12 h-12 rounded-full mr-3" />
                          <div className="flex-1">
                            <div className="font-medium text-black">{role.name}</div>
                            <div className="text-sm text-gray-500">{role.role}</div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-1">Contact:</div>
                          <div className="text-sm text-black">{role.contact}</div>
                          <div className="text-sm text-black">{role.phone}</div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-1">Password:</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-black">
                              {passwordVisibility[role.id] ? 'MyPassword123' : role.password}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(role.id)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title={passwordVisibility[role.id] ? 'Hide password' : 'Show password'}
                            >
                              {passwordVisibility[role.id] ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 104.243 4.243M14.121 14.121l1.414 1.414" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Department Permissions */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">Department:</div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-green-500 bg-green-50">
                              {role.department}: View
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-green-500 bg-green-50">
                              Settings: View Edit
                            </span>
                          </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Status:</span>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => toggleRoleStatus(role.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out ${getToggleColor(role.status === 'Active')}`}
                            >
                              <span className="sr-only">Toggle status</span>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out ${role.status === 'Active' ? 'translate-x-6' : 'translate-x-1'} ${getToggleThumbColor(role.status === 'Active')}`}
                              />
                            </button>
                            <span className={`text-sm font-medium ${getStatusTextColor(role.status === 'Active')}`}>
                              {getToggleStatus(role.status === 'Active')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Empty State */}
              {((activeTab === 'designation' && filteredDesignations.length === 0) || 
                (activeTab === 'role' && filteredRoles.length === 0)) && (
                <div className="text-center py-8 text-gray-500">
                  No {activeTab === 'designation' ? 'designations' : 'roles'} found matching your search.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Create New Designation Modal */}
      {activeTab === 'designation' && (
        <CreateDesignationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDesignation}
        />
      )}

      {/* Create New Role Modal - Placeholder for future */}
      {activeTab === 'role' && (
        <CreateRoleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateRole}
        />
      )}
    </div>
  );
};

export default RoleManagement;