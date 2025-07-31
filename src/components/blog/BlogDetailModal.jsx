import React from 'react';

const BlogDetailModal = ({ blog, isOpen, onClose }) => {
  if (!isOpen) return null;

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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Blog Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container-7xl py-8 px-8">
          {/* Back Button */}
          <div className="mb-4">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
          {/* Blog Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span>At the core of this platform is an online back-office that enables centralized control over all organizational stages of the event. Organizers can manage budgets, send targeted communications and maintain team collaboration.</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{blog.likes || 24}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{blog.views || 89}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Image */}
          <div className="mb-8">
            <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={blog.image || '/assets/Blog1.png'}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/Blog1.png';
                }}
              />
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              Centralized management by centralizing all company events on an all-in-one event platform, you benefit from numerous advantages. This approach allows teams to be trained on a common tool that facilitates communication and collaboration. Following the same approach and methodology of work. Task management and decision-making are shared, especially for information-intensive events and centralized information. Additionally, reporting is more accurate and allows for more comprehensive gathering and consolidation of information. Personalization and branding allows customization of your event management platform with relevant application according to your branding guidelines. If the event management platform you are using offers white-label features, you will be able to integrate your own email sender name and domain to your custom email templates by synchronization, your app's name and interface of your company website and participants. This customization allows you to present a professional and consistent look, inline with your brand identity.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Centralized management by centralizing all company events on an all-in-one event platform, you benefit from numerous advantages. This approach allows teams to be trained on a common tool that facilitates communication and collaboration. Following the same approach and methodology of work. Task management and decision-making are shared, especially for information-intensive events and centralized information. Additionally, reporting is more accurate and allows for more comprehensive gathering and consolidation of information. Personalization and branding: allows customization of your event management platform with relevant application according to your branding guidelines. If the event management platform you are using offers white-label features, you will be able to integrate your own email sender name and domain to your custom email templates by, synchronization, your app's preference of your event management platform, you and interface; you enhance the credibility of your company with your partners and participants. This customization allows you to present a professional and consistent look, inline with your brand identity.
            </p>
          </div>

          {/* Previous Button */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailModal;
