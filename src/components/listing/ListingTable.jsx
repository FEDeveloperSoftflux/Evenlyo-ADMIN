import React from 'react';

const ListingTable = ({ searchTerm, onViewSubcategories }) => {
  const categories = [
    {
      id: 'entertainment',
      name: 'Entertainment & Attractions',
      icon: '/assets/Entertainment.svg',
      description: '1:1 Business Park...',
      subcategories: ['DJ', 'Live Band', 'Photo Booth'],
      bgColor: 'bg-pink-50'
    },
    {
      id: 'food',
      name: 'Food & Drinks',
      icon: '/assets/Food.svg',
      description: '1:1 Business Park...',
      subcategories: ['Catering', 'Food Trucks', 'Bartenders'],
      bgColor: 'bg-pink-50'
    },
    {
      id: 'decoration',
      name: 'Decoration & Styling',
      icon: '/assets/Decoration.svg',
      description: '1:1 Business Park...',
      subcategories: ['Floral Design', 'Event Styling', 'Decorations'],
      bgColor: 'bg-pink-50'
    },
    {
      id: 'locations',
      name: 'Locations & Party Tents',
      icon: '/assets/Location.svg',
      description: '1:1 Business Park...',
      subcategories: ['Venues', 'Party Tents', 'Outdoor Spaces'],
      bgColor: 'bg-pink-50'
    },
    {
      id: 'staff',
      name: 'Staff & Services',
      icon: '/assets/Staff.svg',
      description: '1:1 Business Park...',
      subcategories: ['Event Staff', 'Security', 'Coordination'],
      bgColor: 'bg-pink-50'
    }
  ];

  const handleViewSubcategories = (category) => {
    // This will be handled by the parent component to navigate to subcategory page
    if (onViewSubcategories) {
      onViewSubcategories(category);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Sub Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                {/* Icon */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-full ${category.bgColor} flex items-center justify-center`}>
                    <img src={category.icon} alt={category.name} className="w-5 h-5" />
                  </div>
                </td>

                {/* Category Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </td>

                {/* Description */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{category.description}</span>
                </td>

                {/* Sub Categories */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {category.subcategories.length}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {/* Edit Button */}
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                      <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                    </button>

                    {/* View Subcategories Button */}
                    <button 
                      onClick={() => handleViewSubcategories(category)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <img src="/assets/View.svg" alt="View Subcategories" className="w-4 h-4" />
                    </button>
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
          {filteredCategories.map((category) => (
            <div key={category.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Card Header with Icon, Name and Actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <img src={category.icon} alt={category.name} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{category.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Category</div>
                  </div>
                </div>
                
              </div>

              {/* Card Content - Category Details */}
              <div className="space-y-3 ml-2">
                {/* Description */}
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Description</span>
                  <p className="text-sm text-gray-900 mt-1">{category.description}</p>
                </div>

                {/* Subcategories */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">Subcategories</span>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {category.subcategories.length} Categories
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0 ml-3">
                  {/* Edit Button */}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <img src="/assets/Edit.svg" alt="Edit" className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <img src="/assets/Delete.svg" alt="Delete" className="w-4 h-4" />
                  </button>

                  {/* View Subcategories Button */}
                  <button 
                    onClick={() => handleViewSubcategories(category)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <img src="/assets/View.svg" alt="View Subcategories" className="w-4 h-4" />
                  </button>
                </div>
                </div>

                {/* Subcategory List Preview */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((subcategory, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                      >
                        {subcategory}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-md">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No categories found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
};

export default ListingTable;