import React, { useState, useRef } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import '../styles/design-system.css';
import SendEmailModal from '../components/user/SendEmailModal';

const mockTickets = [
  {
    id: 'TKT-001',
    timestamp: '2024-07-01 14:30:00',
    issue: 'Payment Issue',
    details: 'Customer unable to process ...',
    status: 'Open',
    seller: 'Seller A',
    issueType: 'payment',
  },
  {
    id: 'TKT-002',
    timestamp: '2024-07-01 13:15:00',
    issue: 'Product Quality',
    details: 'Item received damaged ...',
    status: 'Close',
    seller: 'Seller B',
    issueType: 'quality',
  },
  {
    id: 'TKT-003',
    timestamp: '2024-07-01 11:45:00',
    issue: 'Shipping Delay',
    details: 'Order shipped 5 days late ...',
    status: 'Open',
    seller: 'Seller C',
    issueType: 'shipping',
  },
  {
    id: 'TKT-004',
    timestamp: '2024-07-01 10:20:00',
    issue: 'Shipping Delay',
    details: 'Customer unable to process ...',
    status: 'Close',
    seller: 'Seller D',
    issueType: 'shipping',
  },
  {
    id: 'TKT-005',
    timestamp: '2024-07-01 13:15:00',
    issue: 'Refund Request',
    details: 'Item received damaged ...',
    status: 'Open',
    seller: 'Seller E',
    issueType: 'refund',
  },
  {
    id: 'TKT-006',
    timestamp: '2024-07-01 11:45:00',
    issue: 'Shipping Delay',
    details: 'Item received damaged ...',
    status: 'Close',
    seller: 'Seller F',
    issueType: 'shipping',
  },
];

const statusColors = {
  Open: 'bg-green-50 text-green-500',
  Close: 'bg-pink-50 text-pink-500',
};

const issueColors = {
  'Payment Issue': 'bg-yellow-50 text-yellow-500',
  'Product Quality': 'bg-pink-100 text-pink-500',
  'Shipping Delay': 'bg-orange-50 text-orange-500',
  'Refund Request': 'bg-red-50 text-red-500',
};

const CustomerSupport = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTicket, setModalTicket] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState({}); // Track open status dropdowns by ticket id
  const [tickets, setTickets] = useState(mockTickets);
  const filterDropdownRef = useRef(null);
  const sellers = [...new Set(mockTickets.map(t => t.seller))];
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailModalTicket, setEmailModalTicket] = useState(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setOpenFilterDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openDetailsModal = (ticket) => {
    setModalTicket(ticket);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalTicket(null);
  };

  // Handle status dropdown open/close
  const toggleStatusDropdown = (id) => {
    setStatusDropdownOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const closeAllStatusDropdowns = () => setStatusDropdownOpen({});

  // Close all status dropdowns on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      closeAllStatusDropdowns();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Change ticket status
  const handleStatusChange = (id, newStatus) => {
    setTickets(tickets => tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    setStatusDropdownOpen(prev => ({ ...prev, [id]: false }));
  };

  // Handler for opening email modal
  const openEmailModal = (ticket) => {
    setEmailModalTicket(ticket);
    setEmailModalOpen(true);
  };
  const closeEmailModal = () => {
    setEmailModalOpen(false);
    setEmailModalTicket(null);
  };
  // Handler for sending email (placeholder)
  const handleSendEmail = (data) => {
    alert(`Email sent to: ${data.userEmail}\nMessage: ${data.message}`);
    closeEmailModal();
  };

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.id.toLowerCase().includes(search.toLowerCase()) ||
    ticket.issue.toLowerCase().includes(search.toLowerCase()) ||
    ticket.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Customer Support" subtitle="You can manage and control tickets" />
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">List of all tickets</h1>
            <p className="text-md text-gray-400">You can manage and control tickets</p>
          </div>
          {/* Search and Filter */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
              />
            </div>
            {/* Custom Filter Dropdown */}
            <div className="w-full md:w-72 relative md:flex-shrink-0" ref={filterDropdownRef}>
              <button
                type="button"
                onClick={() => setOpenFilterDropdown(!openFilterDropdown)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white text-left text-gray-400 hover:bg-gray-50 transition-colors"
              >
                {filter || 'Filter by Seller'}
              </button>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {openFilterDropdown && (
                <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                  <button
                    onClick={() => {
                      setFilter('');
                      setOpenFilterDropdown(false);
                    }}
                    className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    All Sellers
                  </button>
                  {sellers.map((seller) => (
                    <button
                      key={seller}
                      onClick={() => {
                        setFilter(seller);
                        setOpenFilterDropdown(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      {seller}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Ticket Table */}
          <div className="overflow-x-auto rounded-2xl shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-pink-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Stamp</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Related to</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTickets
                  .filter(ticket => !filter || ticket.seller === filter)
                  .map(ticket => {
                    const t = tickets.find(tt => tt.id === ticket.id) || ticket;
                    return (
                      <tr key={t.id} className="hover:bg-pink-50/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">{t.id}</td>
                        {/* Time Stamp column: only time part bold */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {(() => {
                            const [date, time] = t.timestamp.split(' ');
                            return <>
                              <span>{date} </span>
                              <span className="font-semibold text-black">{time}</span>
                            </>;
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${issueColors[t.issue] || 'bg-gray-100 text-gray-500'}`}>{t.issue}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hover:text-pink-500 hover:underline cursor-pointer" onClick={() => openDetailsModal(t)}>{t.details}</td>
                        {/* Status dropdown */}
                        <td className="px-6 py-4 whitespace-nowrap text-left relative">
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); toggleStatusDropdown(t.id); }}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[t.status]} focus:outline-none focus:ring-2 focus:ring-pink-200 transition`}
                          >
                            {t.status}
                            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {statusDropdownOpen[t.id] && (
                            <div className="absolute left-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                              {['Open', 'Close'].filter(status => status !== t.status).map(status => (
                                <button
                                  key={status}
                                  onClick={e => { e.stopPropagation(); handleStatusChange(t.id, status); }}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <button className="p-2 rounded-full transition" title="Send Message" onClick={() => openEmailModal(t)}>
                        <img src="/assets/MSG.svg" alt="Message" className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">No tickets found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Details Modal */}
          {modalOpen && modalTicket && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-4xl shadow-2xl p-8 max-w-xl w-full relative flex flex-col" style={{minWidth: 350}}>
                <button onClick={closeModal} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-brand hover:bg-pink-400 transition text-white hover:text-white text-xl  shadow-lg focus:outline-none">
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-1">Tickets</h2>
                <p className="text-gray-400 mb-6">Send email to clients</p>
                <div className="mb-4">
                  <label className=" text-gray-500 text-sm mb-1">Email:</label>
                  <span className= "ml-2 text-black text-sm font-medium">{modalTicket.email || 'john.smith@email.com'}</span>
                </div>
                <div className="mb-2">
                  <label className="block text-black font-semibold mb-1">Detail</label>
                  <textarea
                    className="w-full rounded-xl bg-gray-50 border-0 p-4  text-gray-500 text-sm resize-none min-h-[80px]"
                    value={modalTicket.details || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      {/* Email Modal */}
      <SendEmailModal
        isOpen={emailModalOpen}
        onClose={closeEmailModal}
        userData={emailModalTicket ? { email: emailModalTicket.email } : {}}
        userType="client"
        onSend={handleSendEmail}
      />
    </div>
  );
};

export default CustomerSupport;
