import React from "react";
import { Outlet, Link } from "react-router-dom";
import { UserPen , Star, Logs,  MessageSquare } from "lucide-react";
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
        <aside className="flex-shrink-0 hidden overflow-y-auto bg-white border-r border-gray-200 lg:block lg:w-60">
          <div className="h-full p-4 lg:p-4">
            <ProfileSidebar />
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
          <div className="flex items-center justify-around px-4 py-2">
            <Link
              to="/profile"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <UserPen size={20} />
              <span className="text-xs">Profile</span>
            </Link>
            <Link
              to="/profile/saved"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <Star size={20} />
              <span className="text-xs">Saved</span>
            </Link>
            <Link
              to="/profile/orders"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <Logs  size={20} />
              <span className="text-xs">Orders</span>
            </Link>
            <Link
              to="/profile/messages"
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-teal-600"
            >
              <MessageSquare size={20} />
              <span className="text-xs">Messages</span>
            </Link>
          </div>
        </nav>

        {/* Main content - Scrollable */}
        <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto sm:px-6 lg:px-8 sm:py-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
