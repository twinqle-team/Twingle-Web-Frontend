import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, Plus } from "lucide-react";

const MessagesPage: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "Thank you for the information about the property.",
      timestamp: "2 mins ago",
      unread: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      lastMessage: "Is the property still available for viewing?",
      timestamp: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      name: "Property Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agent",
      lastMessage: "I've scheduled a viewing for you on Friday.",
      timestamp: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto h-[calc(100vh-12rem)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">Your conversations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-[#004e27] text-white rounded-lg hover:bg-[#004e27] transition-colors"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Message</span>
        </motion.button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: "#f9fafb" }}
              className="flex items-center gap-4 p-4 border-b border-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                {conversation.unread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#004e27] rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {conversation.lastMessage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesPage;