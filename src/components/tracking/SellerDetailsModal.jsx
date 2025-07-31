import React from 'react';

const SellerDetailsModal = ({ isOpen, onClose, seller, position, onTrackOrder, currentOrder }) => {
  if (!isOpen || !seller) return null;

  const modalStyle = {
    left: `${position.x - 192}px`, // 192px is half of w-96 (384px)
    top: `${position.y}px`,
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Transparent overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal positioned relative to click */}
      <div 
        className="absolute bg-white rounded-2xl p-6 w-96 shadow-2xl border border-gray-200"
        style={modalStyle}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Seller Details</h3>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Seller Details</h4>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-base font-semibold text-gray-900">{seller.name}</div>
              <div className="text-sm text-gray-500">New York, NY</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8  flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0V4" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">ID:</div>
              <div className="text-sm text-gray-700">S001</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8  flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Number:</div>
              <div className="text-sm text-gray-700">+1 (555) 987-6543</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8  flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Email:</div>
              <div className="text-sm text-gray-700">info@techstore.com</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8  flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Business Location:</div>
              <div className="text-sm text-gray-700">123 Tech Boulevard, Innovation District</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (currentOrder && onTrackOrder) {
              onTrackOrder(currentOrder);
            }
            onClose();
          }}
          className="w-full text-gray-900 bg-white py-2 px-4 rounded-2xl font-medium transition-colors border border-gray-200 hover:bg-gray-50"
        >
          Track Now
        </button>
      </div>
    </div>
  );
};

export default SellerDetailsModal;
