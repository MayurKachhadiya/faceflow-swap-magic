
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { DashboardApiDocs } from '@/components/dashboard/DashboardApiDocs';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock authentication check - replace with real auth logic
  const isAuthenticated = true; // This should come from your auth system
  const user = { name: 'John Doe', email: 'john@example.com' }; // Mock user data

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'api-docs':
        return <DashboardApiDocs />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex w-full">
        <DashboardSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
