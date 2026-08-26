import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Bell, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logoutUser, logout } from "../../../redux/slices/userSlice";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

interface ProfileHeaderProps {
  name?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { refreshToken, user } = useAppSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const avatarUrl = user?.avatarUrl

  // Use user data from Redux store if available, otherwise use props
  const displayName = user?.name || name || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Inquiry",
      message: "Someone interested in your property listing",
      timestamp: "5 mins ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    },
    {
      id: 2,
      title: "Review Received",
      message: "5-star review on your Real Estate listing",
      timestamp: "2 hours ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    },
    {
      id: 3,
      title: "Payment Processed",
      message: "Your subscription payment has been confirmed",
      timestamp: "1 day ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        const resultAction = await dispatch(
          logoutUser({ refreshToken }),
        );

        if (logoutUser.fulfilled.match(resultAction)) {
          toast.success(
            resultAction.payload.message || "Logout successful",
          );
          dispatch(logout());
          navigate("/login");
          return;
        }

        const message =
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : "Logout failed";
        toast.error(message);
      } else {
        // No refresh token, just clear local state
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Logout failed",
      );
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm h-[10vh]"
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4 h-full">
        <div className="flex items-center justify-between gap-4 h-full max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex-shrink-0 p-2 transition-colors rounded-lg hover:bg-gray-100 flex items-center justify-center"
            title="Go back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            {/* Help Icon - Hidden on small mobile */}
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block p-2 transition-colors rounded-lg hover:bg-gray-100 mb-2"
              title="Help & Support"
            >
              <HelpCircle size={20} className="text-gray-600" />
            </motion.button> */}

            {/* Notification Bell */}
            <div ref={notificationRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <Bell size={18} className="sm:text-[22px] text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-2 bg-white border border-gray-100 rounded-lg shadow-xl w-[calc(100vw-2rem)] sm:w-80 md:w-96 lg:max-w-md"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">
                          Notifications
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setShowNotifications(false)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <X size={18} className="text-gray-500" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="overflow-y-auto max-h-[50vh] sm:max-h-96">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            whileHover={{ backgroundColor: "#f9fafb" }}
                            onClick={() =>
                              handleNotificationClick(notification.id)
                            }
                            className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                          >
                            <div className="flex gap-3">
                              <img
                                src={notification.avatar}
                                alt="avatar"
                                className="flex-shrink-0 w-10 h-10 rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                  )}
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                  {notification.message}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                  {notification.timestamp}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-gray-500">No notifications</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border-t border-gray-100 rounded-b-lg bg-gray-50">
                      <motion.button
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="w-full py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                      >
                        View all notifications
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div ref={profileRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  // Only show dropdown on mobile screens (when sidebar is hidden)
                  if (window.innerWidth < 768) {
                    setShowProfileMenu(!showProfileMenu);
                  }
                }}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 pl-3 sm:pl-4 transition-colors border-l border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">
                    {displayName}
                  </p>
                </div>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#33a078] object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#33a078] bg-[#33a078] text-white font-semibold text-sm sm:text-base lg:text-lg">
                    {userInitial}
                  </div>
                )}
              </motion.button>

              {/* Profile Menu Dropdown - Only show on mobile */}
              <AnimatePresence>
                {showProfileMenu && window.innerWidth < 768 && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 w-56 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        View your profile
                      </p>
                    </div>
                    <div className="p-2">
                      <motion.button
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default ProfileHeader;
