import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';

function NotificationToggle({ label, desc, defaultChecked }) {
  const [checked, setChecked] = useState(!!defaultChecked);
  return (
    <div className="flex items-center py-4">
      <div className="flex-1">
        <div className="font-semibold text-black text-md mb-1">{label}</div>
        <div className="text-gray-400 text-sm">{desc}</div>
      </div>
      <button
        type="button"
        className={`relative w-14 h-8 rounded-full focus:outline-none transition-colors duration-200 ${checked ? 'bg-gradient-brand' : 'bg-gray-200'}`}
        onClick={() => setChecked(v => !v)}
        aria-pressed={checked}
      >
        <span
          className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200"
          style={{ transform: checked ? 'translateX(26px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

const tabList = [
  { label: 'Security Details', value: 'security' },
  { label: 'Notification Details', value: 'notification' },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Settings" subtitle="You can view and update your settings" />
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">Setting</h1>
            <p className="text-md text-gray-400">You can view your Setting</p>
          </div>
          {/* Tabs */}
          <div className="flex mb-8 w-full justify-center items-center border-b border-gray-100">
            {tabList.map(tab => (
              <button
                key={tab.value}
                className={`flex-1 py-3 rounded-2xl font-medium text-base focus:outline-none transition-all duration-200 mx-2 ${
                  activeTab === tab.value
                    ? 'bg-gradient-brand text-white shadow-md'
                    : 'bg-transparent text-gray-400'
                }`}
                style={{ minWidth: 180 }}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Security Details Tab */}
          {activeTab === 'security' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-black mb-2">Security Details</h3>
              <p className="text-gray-500 text-sm mb-6">Update your Personal Details</p>
              {/* Old/New Password Row */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-black font-medium mb-2">Old Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                    placeholder="Enter Your Current Password"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-black font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                    placeholder="Enter Your New Password"
                  />
                </div>
              </div>
              {/* OTP Verification */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1">
                  <label className="block text-black font-medium mb-2">OTP Verification</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                    placeholder="Enter OTP"
                  />
                </div>
                <button
                  className="bg-gradient-brand text-white px-8 py-2 rounded-2xl font-semibold shadow-md mt-7"
                >
                  Generate
                </button>
              </div>
              {/* Save Changes Button */}
              <div className="flex justify-end">
                <button
                  className="mt-20 bg-gradient-brand text-white px-10 py-2 rounded-xl font-semibold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {/* Notification Details Tab */}
          {activeTab === 'notification' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-black mb-2">Notification Control</h3>
              <p className="text-gray-500 text-sm mb-8">Choose what notifications you'd like to receive</p>
              {/* Email Notifications */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-black mb-4">Email Notifications</h4>
                <div className="divide-y divide-gray-100">
                  <NotificationToggle label="Order Completion" desc="Get notified when orders are completed" defaultChecked />
                  <NotificationToggle label="New Vendor/Client Registration" desc="Notifications for new user registrations" />
                  <NotificationToggle label="New Subscription" desc="Alerts for new subscription purchases" defaultChecked />
                </div>
              </div>
              {/* Push Notifications */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-black mb-4">Push Notifications</h4>
                <div className="divide-y divide-gray-100">
                  <NotificationToggle label="Order Completion" desc="Browser/mobile push notifications for orders" defaultChecked />
                  <NotificationToggle label="New Vendor/Client Registration" desc="Push alerts for new user registrations" />
                  <NotificationToggle label="New Subscription" desc="Push notifications for subscription events" defaultChecked />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="mt-10 bg-gradient-brand text-white px-10 py-2 rounded-xl font-semibold shadow-md">
                  Save Notification Setting
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
