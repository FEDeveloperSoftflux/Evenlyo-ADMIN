import React from "react";
import DashboardHeader from "../components/common/DashboardHeader";

const Notifications = () => {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        <DashboardHeader title="Notifications" subtitle="View all your notifications" />
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">All Notifications</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">No notifications yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
