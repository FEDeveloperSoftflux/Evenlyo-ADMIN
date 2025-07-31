import React, { useState } from 'react';
import SuccessModal from '../common/SuccessModal';

const AddVendorModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openPlanDropdown, setOpenPlanDropdown] = useState(false);
  const [openDurationDropdown, setOpenDurationDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: '',
    lastName: '',
    emailAddress: '',
    contactNumber: '',
    address: '',
    
    // Step 2: Category
    categories: [],
    
    // Step 3: Business Details
    businessName: '',
    businessLocation: '',
    businessLogo: null,
    bannerImage: null,
    businessDescription: '',
    profileImages: [],
    
    // Step 4: Subscription Plan
    subscriptionPlan: '',
    subscriptionDuration: '',
    automaticRenewal: true,
    
    // Step 5: Set Password
    password: '',
    confirmPassword: ''
  });

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Category' },
    { number: 3, title: 'Business Details' },
    { number: 4, title: 'Subscription Plan' },
    { number: 5, title: 'Set Password' }
  ];

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleMultipleFileUpload = (field, files) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ...files]
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlanSelect = (plan) => {
    handleInputChange('subscriptionPlan', plan);
    setOpenPlanDropdown(false);
  };

  const handleDurationSelect = (duration) => {
    handleInputChange('subscriptionDuration', duration);
    setOpenDurationDropdown(false);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    
    // Show success modal instead of immediately closing
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
    // Reset form
    setCurrentStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      emailAddress: '',
      contactNumber: '',
      address: '',
      categories: [],
      businessName: '',
      businessLocation: '',
      businessLogo: null,
      bannerImage: null,
      businessDescription: '',
      profileImages: [],
      subscriptionPlan: '',
      subscriptionDuration: '',
      automaticRenewal: true,
      password: '',
      confirmPassword: ''
    });
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-black font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-black font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-black font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-black font-semibold mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder="Enter contact number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-black font-semibold mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm resize-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-2">Category Selection</h3>
              <p className="text-xs text-gray-400 mb-6">
                Select the main categories that best describe your business (you can select multiple)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Entertainment & Attractions',
                  'Food & Drinks',
                  'Decoration & Styling',
                  'Locations & Party Tents',
                  'Staff & Services'
                ].map((category) => (
                  <label
                    key={category}
                    className="flex items-center rounded-xl cursor-pointer hover:border-pink-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="ml-3 text-xs font-medium text-black">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Business Name and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Business Location
                </label>
                <input
                  type="text"
                  value={formData.businessLocation}
                  onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Business Logo */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Business Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('businessLogo', e.target.files[0])}
                    className="hidden"
                    id="businessLogo"
                  />
                  <label
                    htmlFor="businessLogo"
                    className="mt-2 cursor-pointer text-pink-600 text-xs hover:text-pink-700"
                  >
                    Click to upload
                  </label>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Banner Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('bannerImage', e.target.files[0])}
                    className="hidden"
                    id="bannerImage"
                  />
                  <label
                    htmlFor="bannerImage"
                    className="mt-2 cursor-pointer text-pink-600 text-xs hover:text-pink-700"
                  >
                    Click to upload
                  </label>
                </div>
              </div>
            </div>

            {/* Business Description */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Business Description
              </label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Describe your business..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm resize-none"
              />
            </div>

            {/* Profile Images & Videos */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Profile Images & Videos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Images: PNG, JPG | Videos: MP4 | MOV up to 50MB each</p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => handleMultipleFileUpload('profileImages', Array.from(e.target.files))}
                    className="hidden"
                    id="profileImages"
                  />
                  <label
                    htmlFor="profileImages"
                    className="mt-2 cursor-pointer text-pink-600 text-xs hover:text-pink-700"
                  >
                    Click to upload multiple files
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Subscription Plan</h3>
              <p className="text-sm text-gray-500 mb-6">
                Choose a subscription plan and set the billing preferences for the vendor.
              </p>
            </div>

            {/* Subscription Plan and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Subscription Plan
                </label>
                <div className="relative w-full">
                  <button
                    onClick={() => setOpenPlanDropdown(!openPlanDropdown)}
                    className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white w-full font-medium text-gray-700"
                  >
                    <span>{formData.subscriptionPlan || 'Choose Plan'}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openPlanDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                      <button
                        onClick={() => handlePlanSelect('Standard')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => handlePlanSelect('Premium')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        Premium
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Subscription Duration (Days)
                </label>
                <div className="relative w-full">
                  <button
                    onClick={() => setOpenDurationDropdown(!openDurationDropdown)}
                    className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white w-full font-medium text-gray-700"
                  >
                    <span>{formData.subscriptionDuration || 'Select duration'}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openDurationDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                      <button
                        onClick={() => handleDurationSelect('1 Month')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        1 Month
                      </button>
                      <button
                        onClick={() => handleDurationSelect('3 Month')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        3 Month
                      </button>
                      <button
                        onClick={() => handleDurationSelect('6 Month')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        6 Month
                      </button>
                      <button
                        onClick={() => handleDurationSelect('1 Year')}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                      >
                        1 Year
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Automatic Renewal */}
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <h4 className="text-base font-semibold text-black mb-1">
                  Automatic Renewal
                </h4>
                <p className="text-sm text-gray-500">
                  Enable automatic subscription renewal when the current period expires
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleInputChange('automaticRenewal', !formData.automaticRenewal)}
                  className={`relative inline-flex h-8 w-12 items-center rounded-full transition-colors ${
                    formData.automaticRenewal 
                      ? 'bg-gradient-brand' 
                      : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.automaticRenewal ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
            
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="text-red-500 text-sm">
                Passwords do not match
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {!showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 ">
              <h2 className="text-xl font-semibold text-gray-900">Add New Vendor</h2>
              <button
                onClick={onClose}
                className="p-2 bg-gradient-brand rounded-2xl transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Steps */}
            <div className="p-4">
              <div className="flex items-start justify-center mb-6 max-w-lg mx-auto">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-1 ${
                        currentStep >= step.number 
                          ? 'bg-gradient-brand text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.number}
                      </div>
                      <span className="text-xs text-gray-500 text-center max-w-16 hidden md:block">
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        currentStep > step.number ? 'bg-pink-600' : 'bg-gray-200'
                      } md:-mt-7 mt-0`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-96 bg-gray-50 rounded-3xl ml-4 mr-4 scrollbar-hide">
              {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 ">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-brand rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-brand rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Successfully Created"
        message="The vendor has been successfully created and added to the system."
      />
    </>
  );
};

export default AddVendorModal;
