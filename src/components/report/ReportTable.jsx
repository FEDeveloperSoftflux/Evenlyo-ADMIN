import React, { useState } from 'react';

const ReportTable = ({ searchTerm, activeTab }) => {
  // Sample vendor/seller data
  const vendorData = [
    {
      id: 'BIL-001',
      date: '2024-01-15',
      vendor: 'DJ',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$299'
    },
    {
      id: 'BIL-002',
      date: '2024-01-14',
      vendor: 'Live Band',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$99'
    },
    {
      id: 'BIL-003',
      date: '2024-01-13',
      vendor: 'Photo Booth',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$599'
    },
    {
      id: 'BIL-004',
      date: '2024-01-12',
      vendor: 'DJ',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$199'
    },
    {
      id: 'BIL-005',
      date: '2024-01-11',
      vendor: 'Live Band',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$299'
    },
    {
      id: 'BIL-006',
      date: '2024-01-10',
      vendor: 'Photo Booth',
      profit: '$10',
      profitPercentage: '2%',
      totalCost: '$99'
    }
  ];

  // Sample booking transaction data - different structure
  const bookingData = [
    {
      date: '09/25/24 - 18:45',
      transaction: 'Premium Plan Subscription',
      method: { brand: 'Mastercard', last4: '4756', exp: '04/24' },
      amount: '- $299.00',
      status: 'In-Progress',
    },
    {
      date: '09/25/24 - 12:23',
      transaction: 'Vendor Payment Received',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '+ $1,784.00',
      status: 'Completed',
    },
    {
      date: '09/24/24 - 11:42',
      transaction: 'Standard Plan Subscription',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '- $99.00',
      status: 'Completed',
    },
    {
      date: '09/24/24 - 15:24',
      transaction: 'Booking Payment',
      method: { brand: 'Mastercard', last4: '4756', exp: '04/24' },
      amount: '- $599.00',
      status: 'Completed',
    },
    {
      date: '09/23/24 - 08:34',
      transaction: 'Refund Issued',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '- $206.34',
      status: 'Completed',
    },
    {
      date: '09/23/24 - 11:52',
      transaction: 'Vendor Service Fee',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '- $97.00',
      status: 'Completed',
    },
    {
      date: '09/22/24 - 12:35',
      transaction: 'Booking Payment',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '- $1,784.00',
      status: 'Completed',
    },
    {
      date: '09/22/24 - 10:23',
      transaction: 'Wallet Top-up',
      method: { brand: 'Visa', last4: '5345', exp: '04/26' },
      amount: '+ $1,000.00',
      status: 'Completed',
    },
  ];

  const currentData = activeTab === 'vendor' ? vendorData : bookingData;

  // Filter data based on search term
  const filteredData = currentData.filter(item => {
    if (activeTab === 'vendor') {
      return [item.id, item.vendor, item.date].some(field =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return [item.date, item.transaction, item.method?.brand, item.amount, item.status]
        .some(field =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  });

  const getSubscriptionColor = (subscription) => {
    switch (subscription) {
      case 'Premium':
        return 'bg-green-100 text-green-800';
      case 'Standard':
        return 'bg-pink-100 text-pink-800';
      case 'Ultra':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Buyer':
        return 'bg-gray-100 text-gray-800';
      case 'Seller':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className=" rounded-3xl shadow-sm  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="hidden sm:table w-full">
          <thead className="bg-pink-50 border-b border-gray-200">
            <tr>
              {activeTab === 'vendor' ? (
                <>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Id
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Items Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit %
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Cost
                  </th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {activeTab === 'vendor' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-black">
                        {item.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black font-semibold">
                        {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black font-semibold">
                        {item.vendor}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{item.profit}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.profitPercentage}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.totalCost}
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.transaction}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.method?.brand === 'Visa' && (
                          <img src="/assets/Visa.svg" alt="Visa" className="h-8 w-8" />
                        )}
                        {item.method?.brand === 'Mastercard' && (
                          <img src="/assets/Paypal.svg" alt="Mastercard" className="h-8 w-8 " />
                        )}
                        <span className="text-xs text-gray-700 font-medium">•••• {item.method?.last4}</span>
                        <span className="text-xs text-gray-400">Exp {item.method?.exp}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'Completed' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ● Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          ● In-Progress
                        </span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-sm ">
              No {activeTab === 'vendor' ? 'seller reports' : 'booking transactions'} found matching your search.
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      {filteredData.length > 0 && (
        <div className="sm:hidden px-2 py-4 space-y-4">
          {filteredData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow border border-gray-100 p-4">
              {activeTab === 'vendor' ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Booking Id</span>
                    <span className="text-sm font-semibold text-black">{item.id}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Date</span>
                    <span className="text-sm text-black font-semibold">{item.date}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Booking Items Name</span>
                    <span className="text-sm text-black font-semibold">{item.vendor}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Profit %</span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.profit}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{item.profitPercentage}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">{item.totalCost}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Date</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Transaction</span>
                    <span className="text-sm text-gray-900">{item.transaction}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Method</span>
                    <span className="flex items-center gap-2">
                      {item.method?.brand === 'Visa' && (
                        <img src="/assets/Cart.svg" alt="Visa" className="h-5 w-5" />
                      )}
                      {item.method?.brand === 'Mastercard' && (
                        <img src="/assets/CartPink.svg" alt="Mastercard" className="h-5 w-5" />
                      )}
                      <span className="text-xs text-gray-700 font-medium">•••• {item.method?.last4}</span>
                      <span className="text-xs text-gray-400">Exp {item.method?.exp}</span>
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Amount</span>
                    <span className="text-sm font-medium text-gray-900">{item.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Status</span>
                    {item.status === 'Completed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">● Completed</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">● In-Progress</span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Pagination for desktop */}
      {filteredData.length > 0 && (
        <div className="px-6 py-2 hidden sm:flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, filteredData.length)}</span> of{' '}
              <span className="font-medium">{filteredData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
