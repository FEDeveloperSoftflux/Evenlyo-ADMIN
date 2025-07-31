import React, { useState } from 'react';

const SendEmailModal = ({ isOpen, onClose, userData, userType = 'vendor', onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (userData?.isMultiple) {
        onSend({
          users: userData.users,
          message: message.trim(),
          userType: userType
        });
      } else {
        onSend({
          userEmail: userData?.email || userData?.contact || '',
          message: message.trim(),
          userType: userType
        });
      }
      setMessage('');
    }
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Send Email
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
          {userData?.isMultiple 
            ? `Send email to ${userData?.users?.length || 0} selected ${userType === 'vendor' ? 'vendors' : 'clients'}`
            : `Send email to ${userType === 'vendor' ? 'Vendor' : 'Client'}`
          }
        </p>

        <div className="bg-gray-100 p-4 rounded-xl">
          <form onSubmit={handleSubmit}>
            {/* User Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {userData?.isMultiple 
                  ? `Recipients (${userData?.users?.length || 0})`
                  : `${userType === 'vendor' ? 'Vendor' : 'Client'} Email`
                }
              </label>
              {userData?.isMultiple ? (
                <div className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm max-h-32 overflow-y-auto">
                  {userData?.users?.map((user, index) => (
                    <div key={user.sn} className="mb-1">
                      {index + 1}. {user.email || user.contact}
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="email"
                  value={userData?.email || userData?.contact || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed text-sm"
                />
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Instructions"
                rows={6}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none text-sm"
                required
              />
            </div>
          </form>
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="mt-6 w-full bg-gradient-brand text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendEmailModal;
