import React, { useState } from 'react';

const CreateDesignationModal = ({ isOpen, onClose, onSubmit }) => {
  const [designationName, setDesignationName] = useState('');
  const [permissions, setPermissions] = useState({
    'User Management': { view: false, edit: false },
    'Content Management': { view: false, edit: false },
    'Analytics': { view: false, edit: false },
    'Settings': { view: false, edit: false },
    'Reports': { view: false, edit: false },
    'Billing': { view: false, edit: false },
    'Support': { view: false, edit: false },
    'Notifications': { view: false, edit: false }
  });

  const handlePermissionChange = (module, type) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [type]: !prev[module][type]
      }
    }));
  };

  const handleSubmit = () => {
    if (!designationName.trim()) {
      return;
    }

    const selectedPermissions = Object.entries(permissions)
      .filter(([module, perms]) => perms.view || perms.edit)
      .map(([module, perms]) => ({
        name: module,
        access: perms.view && perms.edit ? 'View Edit' : perms.view ? 'View' : 'Edit',
        color: 'text-green-500'
      }));

    const newDesignation = {
      id: Date.now(),
      dateTime: new Date().toLocaleDateString(),
      designation: designationName,
      permissions: selectedPermissions,
      status: 'Active'
    };

    onSubmit(newDesignation);
    onClose();
    setDesignationName('');
    setPermissions({
      'User Management': { view: false, edit: false },
      'Content Management': { view: false, edit: false },
      'Analytics': { view: false, edit: false },
      'Settings': { view: false, edit: false },
      'Reports': { view: false, edit: false },
      'Billing': { view: false, edit: false },
      'Support': { view: false, edit: false },
      'Notifications': { view: false, edit: false }
    });
  };

  const handleCancel = () => {
    onClose();
    setDesignationName('');
    setPermissions({
      'User Management': { view: false, edit: false },
      'Content Management': { view: false, edit: false },
      'Analytics': { view: false, edit: false },
      'Settings': { view: false, edit: false },
      'Reports': { view: false, edit: false },
      'Billing': { view: false, edit: false },
      'Support': { view: false, edit: false },
      'Notifications': { view: false, edit: false }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-auto max-h-[95vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create New Designation</h3>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center bg-gradient-brand text-white rounded-xl hover:bg-pink-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Designation Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Designation Name
          </label>
          <input
            type="text"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            placeholder="Enter designation name"
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Module Permissions */}
        <div className="mb-8 bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h4 className="text-lg font-bold text-black mb-2">Module Permissions</h4>
          <p className="text-sm text-gray-500 mb-4">Select view and edit permissions for each module</p>
          
          <div className="space-y-4">
            {Object.entries(permissions).map(([module, perms]) => (
              <div key={module} className="flex items-center justify-between py-3 bg-white px-2 rounded-xl border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {module}
                </span>
                <div className="flex items-center gap-6">
                  {/* View Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer rounded-sm">
                    <input
                      type="checkbox"
                      checked={perms.view}
                      onChange={() => handlePermissionChange(module, 'view')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      perms.view 
                        ? 'bg-gradient-brand border-white' 
                        : 'border-gray-300'
                    }`}>
                      {perms.view && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">View</span>
                  </label>

                  {/* Edit Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={perms.edit}
                      onChange={() => handlePermissionChange(module, 'edit')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      perms.edit 
                                              ? 'bg-gradient-brand border-white' 
                        : 'border-gray-300'
                    }`}>
                      {perms.edit && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">Edit</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-gradient border border-pink-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!designationName.trim()}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
              designationName.trim()
                ? 'bg-gradient-brand text-white hover:from-pink-600 hover:to-purple-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Designation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignationModal;
