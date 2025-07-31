import React, { useState, useRef, useEffect } from 'react';

const BlogCard = ({ blog, onBlogSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOpenBlog = () => {
    console.log('Opening blog:', blog.title);
    console.log('onBlogSelect function:', onBlogSelect);
    if (onBlogSelect) {
      onBlogSelect(blog);
    }
    setShowDropdown(false);
  };

  const handleUpdate = () => {
    // Handle update functionality
    console.log('Update blog:', blog.id);
    setShowDropdown(false);
  };

  const handleStop = () => {
    // Handle stop functionality
    console.log('Stop blog:', blog.id);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log('Delete blog:', blog.id);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        {/* Blog Image */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/Blog1.png';
            }}
          />

          {/* Options Menu */}
          <div className="absolute top-3 right-3" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 bg-transparent rounded-xl shadow-sm flex items-center justify-center border border-gray-400 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                <button
                  onClick={handleOpenBlog}
                  className="w-full px-4 py-3 text-left text-sm text-black font-medium hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Open Blog</span>
                </button>
                
                <button
                  onClick={handleUpdate}
                  className="w-full px-4 py-3 text-left text-sm text-black font-medium hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Update</span>
                </button>
                
                <button
                  onClick={handleStop}
                  className="w-full px-4 py-3 text-left text-sm text-black font-medium hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                  <span>Stop</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-3 text-left text-sm text-black font-medium hover:bg-red-50 transition-colors flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-4">
          {/* Status Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
              {blog.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {blog.subtitle}
          </p>

          {/* Stats and Date */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {/* Likes */}
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{blog.likes}</span>
              </div>

              {/* Views */}
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{blog.views}</span>
              </div>
            </div>

            {/* Date */}
            <span>{blog.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
