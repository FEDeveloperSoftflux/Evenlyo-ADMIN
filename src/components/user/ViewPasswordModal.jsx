import React, { useState } from 'react';

const ViewPasswordModal = ({ isOpen, onClose, userData, userType = 'vendor', onChangePassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock password - in real app, this would come from props or API
  const mockPassword = '••••••••••••••';
  const actualPassword = 'TempPass123!';

  const handleClose = () => {
    setShowPassword(false);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            View Password
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

        {/* Password Field */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={showPassword ? actualPassword : mockPassword}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 cursor-not-allowed text-sm pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onChangePassword(userData)}
            className="flex-1 bg-gradient-brand text-white py-2 px-4 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPasswordModal;
