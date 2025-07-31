import React, { useState, useEffect, useRef } from 'react';

const CreateRoleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    roleName: '',
    email: '',
    contactNumber: '',
    password: '',
    designation: ''
  });

  const [errors, setErrors] = useState({});
  const [openDesignationDropdown, setOpenDesignationDropdown] = useState(false);
  const designationDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (designationDropdownRef.current && !designationDropdownRef.current.contains(event.target)) {
        setOpenDesignationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roleName.trim()) {
      newErrors.roleName = 'Role name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newRole = {
        id: Date.now(),
        dateTime: new Date().toLocaleDateString('en-US', { 
          month: 'numeric', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        name: formData.roleName,
        role: formData.designation,
        contact: formData.email,
        phone: formData.contactNumber,
        password: '••••••••',
        department: 'Analytics',
        status: 'Active',
        avatar: '/assets/jaydeep.png'
      };

      onSubmit(newRole);
      
      // Reset form
      setFormData({
        roleName: '',
        email: '',
        contactNumber: '',
        password: '',
        designation: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      roleName: '',
      email: '',
      contactNumber: '',
      password: '',
      designation: ''
    });
    setErrors({});
    setOpenDesignationDropdown(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 ">
          <h2 className="text-xl font-semibold text-gray-900">Create New Role</h2>
          <button
            onClick={handleCancel}
            className="p-2 bg-gradient-brand rounded-xl transition-colors duration-200"
            type="button"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-2xl shadow-sm">
            {/* Role Name */}
            <div className="space-y-2">
              <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                placeholder="Enter role name"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                  errors.roleName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.roleName && (
                <p className="text-red-500 text-sm mt-1">{errors.roleName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                  errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
              )}
            </div>

            {/* Select Designation */}
            <div className="space-y-2">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                Select Designation
              </label>
              <div className="relative" ref={designationDropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpenDesignationDropdown(!openDesignationDropdown)}
                  className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white text-left ${
                    errors.designation ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } ${formData.designation ? 'text-gray-900' : 'text-gray-500'} hover:bg-gray-50`}
                >
                  {formData.designation || 'Choose a designation'}
                </button>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {openDesignationDropdown && (
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({ target: { name: 'designation', value: '' } });
                        setOpenDesignationDropdown(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors border-b border-gray-50"
                    >
                      Choose a designation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({ target: { name: 'designation', value: 'Administrator' } });
                        setOpenDesignationDropdown(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50"
                    >
                      Administrator
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({ target: { name: 'designation', value: 'Editor' } });
                        setOpenDesignationDropdown(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50"
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({ target: { name: 'designation', value: 'Viewer' } });
                        setOpenDesignationDropdown(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      Viewer
                    </button>
                  </div>
                )}
              </div>
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
              )}
            </div>

            {/* Set Password - Full Width */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Set Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>



          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-pink-600 border border-pink-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-brand text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoleModal;
