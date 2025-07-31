import React, { useState } from 'react';

const VendorProfileModal = ({ isOpen, onClose, userData, userType = 'vendor' }) => {
  // Dummy data based on the VendorProfile component
  const dummyBanner = "/assets/Banner.png";
  const dummyFollowers = "10k followers";
  const dummyEmployees = "200-500 employees";
  const dummyRole = "Coach in Organization Name";
  const dummyLocation = "Via Camilla Cavour, Florence(FI), Tuscany, Italy";
  const dummyPersonName = userData?.name || "Asima Khan";

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Vendor Profile</h2>
          <button
            onClick={handleClose}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-brand text-white rounded-lg flex items-center justify-center hover:from-pink-600 hover:to-purple-800 transition-all"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-60px)] sm:max-h-[calc(90vh-80px)] no-scrollbar">
          {/* Hero Section */}
          <div className="bg-white text-gray-900 relative">
            {/* Banner Image */}
            <div className="w-w-4xl h-24 sm:h-32 md:h-40 overflow-hidden mx-2 rounded-2xl sm:rounded-4xl">
              <img
                src={dummyBanner}
                alt="Banner"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Avatar */}
            <div className="relative z-10 px-4 sm:px-6">
              <div className="flex justify-start -mt-8 sm:-mt-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={'/assets/Vendor1.png'}
                    alt={userData.name}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Profile Info Below Avatar */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="mt-3 sm:mt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  {/* Left side - Name and details */}
                  <div className="flex-1">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{dummyPersonName}</div>
                    <div className="text-sm text-gray-500 font-medium mb-2">{dummyRole}</div>
                    
                    <div className="text-xs text-gray-500 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1 sm:gap-2">
                      <span className="break-words">{dummyLocation}</span>
                      <span className="hidden sm:inline mx-1">•</span>
                      <span>{dummyFollowers}</span>
                      <span className="hidden sm:inline mx-1">•</span>
                      <span>{dummyEmployees}</span>
                    </div>
                  </div>

                  {/* Right side - Contact and Rating */}
                  <div className="flex flex-col items-start sm:items-end gap-1 sm:ml-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="truncate">Call: {userData.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">Email: {userData.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>5.0</span>
                      <div className="flex ml-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="p-4 sm:p-6">
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 relative">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-green-100 text-green-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-semibold text-xs">
                • 20% OFF
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 pr-16 sm:pr-20">About {dummyPersonName}</h3>
                
                <div className="mb-4">
                  <span className="block font-semibold text-gray-900 text-sm mb-1">Description</span>
                  <span className="text-gray-700 text-sm leading-relaxed">Focused on creating 'vibes' through immersive sound, ambient lighting, and DJ talent perfectly matched to your setting.</span>
                </div>
                
                <div className="mb-4">
                  <span className="block font-semibold text-gray-900 text-sm mb-1">Why Choose Us:</span>
                  <span className="text-gray-700 text-sm leading-relaxed">"Perfect for intimate parties, upscale lounges, and beach weddings. Our approach is laid-back yet detail-driven."</span>
                </div>
                
                <div className="mb-6">
                  <span className="block font-semibold text-gray-900 text-sm mb-2">Category</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">DJ</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">Sound & Lighting</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">Live Bands</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">Street Food Trucks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default VendorProfileModal;
