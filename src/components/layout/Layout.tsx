
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transition-all duration-300 transform lg:relative",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6",
          !sidebarOpen && "lg:ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
