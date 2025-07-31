import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import '../styles/design-system.css';

const SubCategoryManagement = ({ categoryId, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subcategoryStates, setSubcategoryStates] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    icon: null
  });

  // Initialize subcategory states
  React.useEffect(() => {
    const currentCategory = categories[categoryId] || categories['entertainment'];
    const initialStates = {};
    currentCategory.subcategories.forEach((subcategory, index) => {
      // Mock initial states - you can customize this logic
      initialStates[subcategory] = index % 2 === 0; // Alternate between true/false
    });
    setSubcategoryStates(initialStates);
  }, [categoryId]);

  const toggleSubcategoryStatus = (subcategory) => {
    setSubcategoryStates(prev => ({
      ...prev,
      [subcategory]: !prev[subcategory]
    }));
  };

  // This would typically come from props or route params
  const categories = {
    'entertainment': {
      name: 'Entertainment & Attractions',
      subcategories: ['DJ', 'Live Band', 'Photo Booth']
    },
    'food': {
      name: 'Food & Drinks',
      subcategories: ['Catering', 'Food Trucks', 'Bartenders']
    },
    'decoration': {
      name: 'Decoration & Styling',
      subcategories: ['Floral Design', 'Event Styling', 'Decorations']
    },
    'locations': {
      name: 'Locations & Party Tents',
      subcategories: ['Venues', 'Party Tents', 'Outdoor Spaces']
    },
    'staff': {
      name: 'Staff & Services',
      subcategories: ['Event Staff', 'Security', 'Coordination']
    }
  };

  const subcategoryIcons = {
    'DJ': '/assets/subcategory1.svg',
    'Live Band': '/assets/subcategory2.svg',
    'Photo Booth': '/assets/subcategory3.svg',
    'Catering': '/assets/Food.svg',
    'Food Trucks': '/assets/Food.svg',
    'Bartenders': '/assets/Food.svg',
    'Floral Design': '/assets/Table.svg',
    'Event Styling': '/assets/LED.svg',
    'Decorations': '/assets/Chandelier.svg',
    'Venues': '/assets/Location.svg',
    'Party Tents': '/assets/Location.svg',
    'Outdoor Spaces': '/assets/Location.svg',
    'Event Staff': '/assets/Staff.svg',
    'Security': '/assets/Staff.svg',
    'Coordination': '/assets/Staff.svg'
  };

  // Get current category (this would come from route params in a real app)
  const currentCategory = categories[categoryId] || categories['entertainment'];
  
  const filteredSubcategories = currentCategory.subcategories.filter(subcategory =>
    subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getToggleStatus = (isActive) => isActive ? 'Active' : 'De-Active';
  const getToggleColor = (isActive) => isActive ? 'bg-gradient-brand' : 'bg-pink-100';
  const getToggleThumbPosition = (isActive) => isActive ? 'translate-x-7' : 'translate-x-1';
  const getToggleThumbColor = (isActive) => isActive ? 'bg-white' : 'bg-gradient-brand';
  const getStatusTextColor = (isActive) => isActive ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      categoryName: '',
      description: '',
      icon: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      icon: file
    }));
  };

  const handleCreateCategory = () => {
    // Handle form submission here
    console.log('Creating subcategory:', formData);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Listing Management" subtitle="Manage your categories, items, and vendor listings" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Back Button */}
          <div className="mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Categories
            </button>
          </div>

          <div className="mb-6 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <h1 className="text-responsive-h2 text-gray-900 mb-2">Listing All Sub Category's</h1>
              <p className="text-md text-gray-400">
                Manage your categories, items, and vendor listings
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleOpenModal}
                className="bg-gradient-brand text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Sub Category
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by Category Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subcategories Table/Cards */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
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
                  {filteredSubcategories.map((subcategory, index) => {
                    const isActive = subcategoryStates[subcategory] || false;

                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        {/* Icon */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                            <img 
                              src={subcategoryIcons[subcategory] || '/assets/default.svg'} 
                              alt={subcategory} 
                              className="w-7 h-7" 
                            />
                          </div>
                        </td>

                        {/* Category Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{subcategory}</span>
                        </td>

                        {/* Description */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">123 Business Park...</span>
                        </td>

                        {/* Status Toggle */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => toggleSubcategoryStatus(subcategory)}
                              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ease-in-out ${getToggleColor(isActive)}`}
                            >
                              <span className="sr-only">Toggle status</span>
                              <span
                                className={`inline-block h-6 w-6 transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out ${getToggleThumbPosition(isActive)} ${getToggleThumbColor(isActive)}`}
                              />
                            </button>
                            <span className={`text-sm ${getStatusTextColor(isActive)} min-w-[80px]`}>
                              {getToggleStatus(isActive)}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                              <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                              <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Only visible on mobile */}
            <div className="lg:hidden">
              <div className="divide-y divide-gray-100">
                {filteredSubcategories.map((subcategory, index) => {
                  const isActive = subcategoryStates[subcategory] || false;

                  return (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      {/* Card Header with Icon, Name and Actions */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                            <img 
                              src={subcategoryIcons[subcategory] || '/assets/default.svg'} 
                              alt={subcategory} 
                              className="w-7 h-7" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-base font-semibold text-gray-900 truncate">{subcategory}</div>
                            <div className="text-sm text-gray-500 mt-1">Sub Category</div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center  flex-shrink-0 ml-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content - Subcategory Details */}
                      <div className="space-y-3 ml-3">
                        {/* Description */}
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase">Description</span>
                          <p className="text-sm text-gray-900 mt-1">123 Business Park...</p>
                        </div>

                        {/* Status Toggle */}
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase block mb-2">Status</span>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button 
                                onClick={() => toggleSubcategoryStatus(subcategory)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ease-in-out ${getToggleColor(isActive)}`}
                              >
                                <span className="sr-only">Toggle status</span>
                                <span
                                  className={`inline-block h-6 w-6 transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out ${getToggleThumbPosition(isActive)} ${getToggleThumbColor(isActive)}`}
                                />
                              </button>
                              <span className={`text-sm font-medium ${getStatusTextColor(isActive)}`}>
                                {getToggleStatus(isActive)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Empty State */}
            {filteredSubcategories.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No subcategories found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search term.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Create New Sub Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
              <h2 className="text-lg font-bold text-gray-900">Create New Sub Category</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-xl transition-colors bg-gradient-brand text-white hover:opacity-90"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Category Name and Upload Icon Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    placeholder="Enter Category Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Upload Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Icon
                  </label>
                  <div className="w-full border bg-white border-gray-200 rounded-xl flex overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="icon-upload"
                    />
                    <label
                      htmlFor="icon-upload"
                      className="px-4 py-2 bg-pink-100 text-pink-400 text-xs font-normal cursor-pointer hover:bg-pink-200 transition-colors flex items-center justify-center whitespace-nowrap"
                    >
                      Choose File
                    </label>
                    <span className="flex-1 px-4 py-3 text-gray-400 text-sm flex items-center bg-white min-w-0 truncate">
                      {formData.icon ? formData.icon.name : 'Upload Icon'}
                    </span>
                  </div>
                  {formData.icon && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {formData.icon.name}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-pink-200 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="px-6 py-2 bg-gradient-brand text-white rounded-xl font-medium hover:opacity-90 transition-opacity order-1 sm:order-2"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryManagement;