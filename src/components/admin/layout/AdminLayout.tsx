import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { useDarkMode } from "../Context/DarkModeContext";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SiderBar from "@/components/static/admin/SiderBar";
import Header from "@/components/static/admin/Header";
 // Import dark mode context

const AdminLayout: React.FC = () => {
//   const { darkMode } = useDarkMode(); // Use context instead of local state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const queryClient = new QueryClient()

  return (
   <QueryClientProvider client={queryClient}>
     {/* <div className={darkMode ? "dark" : ""}> */}
     <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <SiderBar darkMode={false}
         isOpen={isSidebarOpen} 
         onClose={() => setIsSidebarOpen(false)}
         />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header /> {/* No need to pass darkMode here, since it can use the context */}

          {/* Scrollable Outlet */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
    <ReactQueryDevtools initialIsOpen={true} />
   </QueryClientProvider>
  );
};

export default AdminLayout;