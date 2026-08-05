import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Home, Star, MessageSquare, Settings } from "lucide-react";
import ProfileHeader from "@/components/static/user/profileHeader";
import ProfileSidebar from "@/components/static/user/profileSidebar";

const ProfileLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <ProfileHeader />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible on lg and up */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
          <div className="p-4 lg:p-6 h-full">
            <ProfileSidebar />
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex items-center justify-around px-4 py-2">
            <Link
              to="/profile"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <Home size={20} />
              <span className="text-xs">Home</span>
            </Link>
            <Link
              to="/profile/saved"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <Star size={20} />
              <span className="text-xs">Saved</span>
            </Link>
            <Link
              to="/profile/messages"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <MessageSquare size={20} />
              <span className="text-xs">Messages</span>
            </Link>
            <Link
              to="/profile/settings"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <Settings size={20} />
              <span className="text-xs">Settings</span>
            </Link>
          </div>
        </nav>

        {/* Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
