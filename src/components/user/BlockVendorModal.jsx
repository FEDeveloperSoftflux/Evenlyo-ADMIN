import React, { useState } from 'react';

const BlockVendorModal = ({ isOpen, onClose, userData, userType = 'vendor', onBlock }) => {
  const [reason, setReason] = useState('');
  
  // Determine if we're blocking or unblocking based on current status
  const isCurrentlyBlocked = userData?.status === 'Blocked';
  const action = isCurrentlyBlocked ? 'Unblock' : 'Block';
  const actionLower = action.toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason.trim()) {
      onBlock({
        userEmail: userData?.email || userData?.contact || '',
        reason: reason.trim()
      });
      setReason('');
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {action} {userType === 'vendor' ? 'Vendor' : 'Client'}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gradient-brand text-white rounded-lg flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6">
          Provide a reason for {actionLower}ing this {userType} and send notification email
        </p>

        <div className="bg-gray-100 p-4 rounded-xl">
          <form onSubmit={handleSubmit}>
            {/* User Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {userType === 'vendor' ? 'Vendor' : 'Client'} Email
              </label>
              <input
                type="email"
                value={userData?.email || userData?.contact || ''}
                readOnly
                className="w-full px-3 py-1 border border-gray-200 rounded-xl  text-gray-600 cursor-not-allowed text-sm"
              />
            </div>

            {/* Reason for Blocking/Unblocking */}
            <div className="mb-6 rounded">
              <label className="block text-sm font-medium text-black mb-2">
                Reason for {action}ing
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={isCurrentlyBlocked 
                  ? "Reason for unblocking this account..." 
                  : "You did wrong activity that's why we block you..."
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none text-xs"
                required
              />
            </div>
          </form>
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!reason.trim()}
          className="mt-8 w-full bg-gradient-brand text-white py-2 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
          

      </div>
    </div>
  );
};

export default BlockVendorModal;
