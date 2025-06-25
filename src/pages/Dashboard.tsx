
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { DashboardApiDocs } from '@/components/dashboard/DashboardApiDocs';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Mock authentication check - replace with real auth logic
  const isAuthenticated = true; // This should come from your auth system
  const user = location.state?.user || { name: 'John Doe', email: 'john@example.com' };

  // Show welcome toast if redirected from login/signup
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Welcome to your Dashboard!",
        description: location.state.message,
        variant: "default",
        className: "border-green-500 bg-green-50 dark:bg-green-900/20",
        action: (
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        ),
      });
      
      // Clear the state to prevent showing the toast again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, toast]);

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
