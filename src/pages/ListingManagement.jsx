import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import ListingStatsCards from '../components/listing/ListingStatsCards';
import ListingCharts from '../components/listing/ListingCharts';
import ListingTable from '../components/listing/ListingTable';
import SubCategoryManagement from './SubCategoryManagement';
import '../styles/design-system.css';

const ListingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'subcategory'
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleViewSubcategories = (category) => {
    setSelectedCategoryId(category.id);
    setCurrentView('subcategory');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedCategoryId(null);
  };

  // If viewing subcategories, render the SubCategoryManagement component
  if (currentView === 'subcategory') {
    return <SubCategoryManagement categoryId={selectedCategoryId} onBack={handleBackToMain} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Listing Management" subtitle="Manage your categories, items, and vendor listings" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-responsive-h2 text-gray-900 mb-2">Listing Management</h1>
              <p className="text-md text-gray-400">
                Manage your categories, items, and vendor listings
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
            </div>
          </div>
          
          {/* Stats Cards Section */}
          <ListingStatsCards />

          {/* Charts Section */}
          <section className="mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListingCharts />
              
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <h3 className="text-lg font-bold text-black">Recent Activity</h3>
                </div>

                <div className="">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 mb-4 pb-4">
                    <div className="flex items-start space-x-4 sm:space-x-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 sm:mt-1">
                        <img src="/assets/Added.svg" alt="Added" className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0 sm:hidden">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-bold text-black truncate">New item added</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Professional Camera - TechVendor Inc</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">11 Jan 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-4 mb-1">
                            <p className="text-sm font-bold text-black truncate">New item added</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Professional Camera - TechVendor Inc</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400">11 Jan 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 mb-4 pb-4">
                    <div className="flex items-start space-x-4 sm:space-x-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 sm:mt-1">
                        <img src="/assets/Approved.svg" alt="Approved" className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0 sm:hidden">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-bold text-black truncate">Item approved</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Mountain Bike - SportGear Ltd</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">11 Jan 2025</span>

                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-4 mb-1">
                            <p className="text-sm font-bold text-black truncate">Item approved</p>

                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Mountain Bike - SportGear Ltd</p>
                        </div>
                        <div className="flex flex-col items-end">

                          <span className="text-xs text-gray-400">11 Jan 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4 sm:space-x-0">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 sm:mt-1">
                        <img src="/assets/Create.svg" alt="Created" className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0 sm:hidden">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-bold text-black truncate">Category created</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Home Appliances - System</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">11 Jan 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-4 mb-1">
                            <p className="text-sm font-bold text-black truncate">Category created</p>

                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Home Appliances - New Category</p>
                        </div>
                        <div className="flex flex-col items-end">

                          <span className="text-xs text-gray-400">11 Jan 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filter Section */}
          <div className="mb-6">
            <div className="w-full">
              {/* Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by Category Name"
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

          {/* Categories Table */}
          <ListingTable searchTerm={searchTerm} onViewSubcategories={handleViewSubcategories} />
        </main>
      </div>
    </div>
  );
};

export default ListingManagement;
