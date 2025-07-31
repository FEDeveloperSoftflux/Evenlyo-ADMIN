import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';

const PaymentPlans = () => {
  const [editingPlan, setEditingPlan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditPlan = (plan) => {
    setEditingPlan({...plan});
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingPlan(null);
  };

  const handleSavePlan = () => {
    // Here you would typically save the plan changes
    console.log('Saving plan:', editingPlan);
    handleCloseModal();
  };

  const EditPlanModal = () => {
    if (!showEditModal || !editingPlan) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-7 w-full max-w-xl mx-4 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Edit {editingPlan.name}</h2>
            <button
              onClick={handleCloseModal}
              className="w-8 h-8 bg-gradient-brand hover:bg-pink-600 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Price Section */}
          <div className="mb-8 bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-baseline">
                <span className="text-sm font-medium text-gray-500 mr-1">£</span>
                <span className="text-4xl font-bold text-gray-900">{editingPlan.price}</span>
                <span className="text-gray-500 ml-2">/{editingPlan.period}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Active</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="planActive"
                    checked={editingPlan.isActive}
                    onChange={(e) => setEditingPlan({...editingPlan, isActive: e.target.checked})}
                    className="sr-only"
                  />
                  <label
                    htmlFor="planActive"
                    className={`relative inline-flex h-7 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                      editingPlan.isActive ? 'bg-gradient-brand' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                        editingPlan.isActive ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-8 bg-gray-50 p-6 rounded-xl">
            <div className="space-y-3">
              {editingPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                      <img src="/assets/PlanTick.svg" alt="Check" className="w-3 h-3" />
                    </div>
                  </div>
                  <span className="text-sm text-black font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">Discount Active</h3>
              <div className="relative">
                <input
                  type="checkbox"
                  id="discountActive"
                  checked={!!editingPlan.discount}
                  onChange={(e) => setEditingPlan({
                    ...editingPlan, 
                    discount: e.target.checked ? '25%' : null
                  })}
                  className="sr-only"
                />
                <label
                  htmlFor="discountActive"
                  className={`relative inline-flex h-7 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                    editingPlan.discount ? 'bg-gradient-brand' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                      editingPlan.discount ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </label>
              </div>
            </div>

            {editingPlan.discount && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage
                  </label>
                  <input
                    type="text"
                    value={editingPlan.discount || ''}
                    onChange={(e) => setEditingPlan({...editingPlan, discount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days Left
                  </label>
                  <input
                    type="number"
                    value={editingPlan.daysleft || ''}
                    onChange={(e) => setEditingPlan({...editingPlan, daysleft: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePlan}
              className="flex-1 px-4 py-2 bg-gradient-brand text-white rounded-xl font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  const plans = [
    {
      id: 1,
      name: 'Basic (Free)',
      price: 0,
      period: 'Month',
      features: [
        '7 Days Free',
        'Company Charge 2% For Each Event',
        'Pay-Per-Booking',
        '5 Exchange Listing Options',
        'CEx & DEX Liquidity Volume',
        'Code Base Reddit Link Summary',
        '30 AI Prompt Searches/Month'
      ],
      isActive: true,
      users: 1250,
      revenue: 0
    },
    {
      id: 2,
      name: 'Standard (Plus)',
      price: 20,
      period: 'Month',
      discount: '25%',
      daysleft: 15,
      features: [
        'Everything In Pro+',
        'Company Charge 2% For Each Event',
        'No Commission + Top Visibility In Listings',
        'Bot Detection',
        'Developer Activity',
        'AI Whitepaper Analysis',
        'Red Flag Risk Score + AI Concern Report',
        'Unlimited AI Prompt Searches/Month'
      ],
      isActive: true,
      users: 850,
      revenue: 17000
    },
    {
      id: 3,
      name: 'Pro',
      price: 89,
      period: 'Month',
      features: [
        'Everything In Pro+',
        'Company Charge 2% For Each Event',
        'Featured Listing + Reduced Commission',
        'Bot Detection',
        'Developer Activity',
        'AI Whitepaper Analysis',
        'Red Flag Risk Score + AI Concern Report',
        'Unlimited AI Prompt Searches/Month'
      ],
      isActive: true,
      users: 320,
      revenue: 28480
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Payment Plans" />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">Payment Plans</h1>
            <p className="text-md text-gray-400">
              You can download report related User Management, Earning
            </p>
          </div>

          {/* Payment Plans Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 pt-4">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 relative overflow-visible hover:shadow-md transition-shadow">
                {/* Top Center Badge - positioned above the card */}
                {plan.discount && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-green-50 text-green-600 text-xs font-semibold px-4 py-2 rounded-full border border-green-200 shadow-sm">
                      {plan.discount} OFF
                    </span>
                  </div>
                )}
                
                {/* Top Right Edit Icon */}
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => handleEditPlan(plan)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>

                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-md font-extrabold text-black ">£</span>
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2 text-base">/{plan.period}</span>
                    {plan.discount && (
                      <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded-full border border-green-200 shadow-sm ml-2">{plan.daysleft} days left</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-0.5">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <img src="/assets/PlanTick.svg" alt="Check" className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-sm text-black font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>



              </div>
            ))}
          </div>

        </main>
      </div>
      
      {/* Edit Plan Modal */}
      <EditPlanModal />
    </div>
  );
};

export default PaymentPlans;
