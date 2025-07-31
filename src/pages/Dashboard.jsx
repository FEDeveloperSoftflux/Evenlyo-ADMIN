import React from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import RecentActivity from '../components/Dashboard/RecentActivity';
import Charts from '../components/Dashboard/Charts';
import RecentJoinVendors from '../components/Dashboard/RecentJoinVendors';
import RecentJoinClients from '../components/Dashboard/RecentJoinClients';
import '../styles/design-system.css';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed Dashboard Header */}
      <div className="flex-shrink-0">
        <DashboardHeader title="Dashboard" subtitle="Welcome to your admin dashboard" />
      </div>
      
      {/* Scrollable Main Dashboard Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="container-7xl py-10 px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-responsive-h2 text-gray-900 mb-2">Dashboard</h1>
            <p className="text-md text-gray-400">
              Welcome to Jaydeep it will be admin or roll management
            </p>
          </div>

          {/* Stats Cards Section */}
          <StatsCards />

          {/* Charts and Recent Bookings Section */}
          <section className="mb-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Charts />
              <RecentActivity />
            </div>
          </section>

          {/* Recent Join Sections */}
          <section className="mb-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentJoinVendors />
              <RecentJoinClients />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
