import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import UserManagement from './pages/UserManagement'
import ListingManagement from './pages/ListingManagement'
import BookingAnalytics from './pages/BookingAnalytics'
import Tracking from './pages/Tracking'
import RoleManagement from './pages/RoleManagement'
import PaymentPlans from './pages/PaymentPlans'
import ReportManagement from './pages/ReportManagement'
import BlogManagement from './pages/BlogManagement'
import CustomerSupport from './pages/CustomerSupport'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Sidebar from './components/common/Sidebar'
import './App.css'
import './styles/design-system.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'user-management':
        return <UserManagement />
      case 'listing-management':
        return <ListingManagement />
      case 'booking-analytics':
        return <BookingAnalytics />
      case 'tracking':
        return <Tracking />
      case 'role-management':
        return <RoleManagement />
      case 'payment-plans':
        return <PaymentPlans />
      case 'reporting':
        return <ReportManagement />
      case 'blog-management':
        return <BlogManagement />
      case 'customer-support':
        return <CustomerSupport />
      case 'settings':
        return <Settings />
      case 'notifications':
        return <Notifications />
      default:
        return <Dashboard />
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
