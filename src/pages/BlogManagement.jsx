import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import CreateBlogModal from '../components/blog/CreateBlogModal';
import BlogCard from '../components/blog/BlogCard';
import BlogDetailModal from '../components/blog/BlogDetailModal';
import '../styles/design-system.css';

const BlogManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogDetail, setShowBlogDetail] = useState(false);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const isToday = (day) => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() &&
           currentMonth.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === currentMonth.getFullYear() &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getDate() === day;
  };

  // Sample blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 2,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 3,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 69,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 4,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 5,
      title: 'Getting Started with React and TypeScript', 
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 6,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development', 
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    },
    {
      id: 7,
      title: 'Getting Started with React and TypeScript',
      subtitle: 'A comprehensive guide for modern web development',
      image: '/assets/Blog1.png',
      status: 'Published',
      date: 'Jun 15',
      likes: 24,
      views: 89,
      description: 'A comprehensive guide for modern web development'
    }
  ]);

  // Filter blogs based on search term and date
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !selectedDate || blog.date === selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return matchesSearch && matchesDate;
  });

  const handleCreateBlog = (blogData) => {
    const newBlog = {
      id: blogs.length + 1,
      title: blogData.title,
      subtitle: blogData.subtitle,
      image: blogData.image || '/assets/Blog1.png',
      status: 'Published',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      likes: 0,
      views: 0,
      description: blogData.description
    };
    setBlogs([...blogs, newBlog]);
    setIsCreateModalOpen(false);
  };

  const handleBlogSelect = (blog) => {
    console.log('Blog selected:', blog.title);
    setSelectedBlog(blog);
    setShowBlogDetail(true);
  };

  const handleBackToBlogList = () => {
    setShowBlogDetail(false);
    setSelectedBlog(null);
  };

  // If showing blog detail, render the blog detail view
  if (showBlogDetail && selectedBlog) {
    return (
      <>
        <DashboardHeader title="Blog Management" subtitle="Manage your blog posts and content" />
        <BlogDetailModal
          blog={selectedBlog}
          isOpen={true}
          onClose={handleBackToBlogList}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Blog Management" subtitle="Manage your blog posts and content" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-responsive-h2 text-gray-900 mb-2">All blogs</h1>
                <p className="text-md text-gray-400">
                  You can see all blogs
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-5 py-2 bg-gradient-brand text-white font-medium rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Blog
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              {/* Date Filter */}
              <div className="relative sm:w-48" ref={calendarRef}>
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {selectedDate ? selectedDate.toLocaleDateString('en-US') : 'Filter by date'}
                </button>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {showCalendar && (
                  <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4 w-80">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getMonthName(currentMonth)}
                      </h3>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-black py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: (getFirstDayOfMonth(currentMonth) + 6) % 7 }, (_, i) => (
                        <div key={`empty-${i}`} className="h-10" />
                      ))}
                      
                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                        const day = i + 1;
                        return (
                          <button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            className={`h-10 text-sm font-medium rounded-lg transition-colors ${
                              isSelected(day)
                                ? 'bg-pink-500 text-white'
                                : isToday(day)
                                ? 'bg-pink-50 text-pink-600'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Count */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              All blogs ({filteredBlogs.length})
            </h2>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onBlogSelect={handleBlogSelect} />
            ))}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No blogs found matching your search.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Blog Modal */}
      {isCreateModalOpen && (
        <CreateBlogModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateBlog}
        />
      )}
    </div>
  );
};

export default BlogManagement;
