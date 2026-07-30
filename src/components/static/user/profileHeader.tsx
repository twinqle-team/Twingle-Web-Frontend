import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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
  avatarUrl?: string;
  onSearch?: (query: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Alexander Thorne",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander",
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
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
      className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">

          {/* Logo Image */}
          <Link to="/">
            <img
              src="src/assets/Container.png"
              alt="Twingle Logo"
              className="w-auto h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </Link>


          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative flex items-center px-4 py-3 bg-gray-100 rounded-lg">
              <Search size={20} className="flex-shrink-0 mr-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search your dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-base text-gray-700 placeholder-gray-500 bg-transparent outline-none"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Help Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              title="Help & Support"
            >
              <HelpCircle size={22} className="text-gray-600" />
            </motion.button>

            {/* Notification Bell */}
            <div ref={notificationRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <Bell size={22} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
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
                    className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl w-96"
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

                    <div className="overflow-y-auto max-h-96">
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
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-3 py-2 pl-4 transition-colors border-l border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{name}</p>
                </div>
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-12 h-12 rounded-full border-2 border-[#33a078] object-cover"
                />
              </motion.button>

              {/* Profile Menu Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 w-48 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl"
                  >
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {name}
                      </p>
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
