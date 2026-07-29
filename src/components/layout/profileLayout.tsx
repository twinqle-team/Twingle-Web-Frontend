import React from "react";
import { Outlet } from "react-router-dom";
import ProfileHeader from "@/components/static/user/profileHeader";
import ProfileSidebar from "@/components/static/user/profileSidebar";

const ProfileLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <ProfileHeader />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-6  h-full">
            <ProfileSidebar />
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
