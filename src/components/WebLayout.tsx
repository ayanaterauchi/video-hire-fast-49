
import { useState } from 'react';
import { SwipePage } from '@/components/SwipePage';
import { JobInfoPage } from '@/components/JobInfoPage';
import { StatusPage } from '@/components/StatusPage';
import { AddJobPage } from '@/components/AddJobPage';
import { ProfilePage } from '@/components/ProfilePage';
import { Sidebar } from '@/components/Sidebar';
import { NavigationBar } from '@/components/NavigationBar';
import { useIsMobile } from '@/hooks/use-mobile';

export const WebLayout = () => {
  const [activeTab, setActiveTab] = useState('swipe');
  const isMobile = useIsMobile();
  
  console.log('WebLayout rendering, activeTab:', activeTab, 'isMobile:', isMobile);

  const renderActiveTab = () => {
    console.log('Rendering tab:', activeTab);
    
    try {
      switch (activeTab) {
        case 'swipe':
          return <SwipePage />;
        case 'job-info':
          return <JobInfoPage />;
        case 'status':
          return <StatusPage />;
        case 'add-job':
          return <AddJobPage />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <SwipePage />;
      }
    } catch (error) {
      console.error('Error rendering tab:', error);
      return (
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="text-center p-8">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600">Please check the console for details</p>
          </div>
        </div>
      );
    }
  };

  if (isMobile) {
    // Mobile layout with bottom navigation
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-hidden">
          {renderActiveTab()}
        </main>
        <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Desktop layout with sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};
