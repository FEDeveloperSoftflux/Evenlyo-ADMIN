import React, { useState } from 'react';

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'Event Organizer',
      status: 'active',
      joinDate: '2024-01-15',
      avatar: 'SJ',
      eventsCreated: 12
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      role: 'Administrator',
      status: 'active',
      joinDate: '2023-11-22',
      avatar: 'MW',
      eventsCreated: 8
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      role: 'User',
      status: 'inactive',
      joinDate: '2024-02-08',
      avatar: 'ED',
      eventsCreated: 3
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'Event Organizer',
      status: 'active',
      joinDate: '2024-01-03',
      avatar: 'JS',
      eventsCreated: 15
    },
    {
      id: 5,
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      role: 'User',
      status: 'pending',
      joinDate: '2024-03-12',
      avatar: 'LC',
      eventsCreated: 0
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator':
        return 'bg-purple-100 text-purple-800';
      case 'Event Organizer':
        return 'bg-blue-100 text-blue-800';
      case 'User':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-responsive-h3 text-gray-900 mb-4 sm:mb-0">Users Management</h2>
        <button className="btn-primary-mobile w-full sm:w-auto">
          Add New User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card-mobile space-mobile-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-mobile"
            />
          </div>
          <div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="select-mobile"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="card-mobile">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4 p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
          <div className="font-semibold text-gray-700 text-sm">User</div>
          <div className="font-semibold text-gray-700 text-sm">Role</div>
          <div className="font-semibold text-gray-700 text-sm">Status</div>
          <div className="font-semibold text-gray-700 text-sm">Join Date</div>
          <div className="font-semibold text-gray-700 text-sm">Events</div>
          <div className="font-semibold text-gray-700 text-sm">Actions</div>
        </div>

        {/* Users List */}
        <div className="divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">{user.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Joined: {user.joinDate}</span>
                  <span>{user.eventsCreated} events</span>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary-mobile flex-1 py-2 text-sm">Edit</button>
                  <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
                    Delete
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">{user.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {user.joinDate}
                </div>
                <div className="text-sm text-gray-600">
                  {user.eventsCreated}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
