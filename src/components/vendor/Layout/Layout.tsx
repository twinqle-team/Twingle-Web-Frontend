import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardSidebar from "@/components/static/vendor/DashboardSidebar";
import VendorHeader from "@/components/static/vendor/VendorHeader";

const VendorLayout: React.FC = () => {
  const queryClient = new QueryClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen min-w-0 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar darkMode={false}
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
         />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <VendorHeader onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />

          {/* Scrollable Outlet */}
          <main className="min-w-0 flex-1 overflow-y-auto p-2 sm:p-4">
            <Outlet />
          </main>
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default VendorLayout;