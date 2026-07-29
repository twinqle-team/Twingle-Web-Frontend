import React, { useState, useEffect } from "react";
import { Eye, Heart, MessageSquare, Star, Plus, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Skeleton Loader Components
const StatCardSkeleton = () => (
  <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-2">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const ListingCardSkeleton = () => (
  <div className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
        <div className="flex-1 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const ReviewCardSkeleton = () => (
  <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  bgColor: string;
}

const ProfileDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const statCards: StatCard[] = [
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Recently Viewed",
      value: "24",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Saved Properties",
      value: "12",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Messages",
      value: "7",
      color: "text-[#004e27]",
      bgColor: "bg-[#004e27]/10",
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: "Preferred Areas",
      value: "3",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const savedProperties = [
    {
      id: 1,
      title: "Modern Apartment in Downtown",
      location: "Lagos, Nigeria",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
      price: "$2,500/month",
      views: 1243,
      saved: 89,
      status: "Saved",
    },
    {
      id: 2,
      title: "Luxury Villa with Garden",
      location: "Abuja, Nigeria",
      image:
        "https://images.unsplash.com/photo-1512917774080-9a485dc3483f?w=500&h=300&fit=crop",
      price: "$5,000/month",
      views: 856,
      saved: 156,
      status: "Saved",
    },
    {
      id: 3,
      title: "Cozy Studio Apartment",
      location: "Port Harcourt, Nigeria",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=300&fit=crop",
      price: "$1,200/month",
      views: 2104,
      saved: 234,
      status: "Saved",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Saved a 2-bedroom apartment",
      detail: "You saved a new listing 2 hours ago",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Viewed a villa in Abuja",
      detail: "You opened the property details page",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Sent a message to a realtor",
      detail: "You asked about the available dates",
      time: "3 days ago",
    },
  ];

  const upcomingVisits = [
    {
      id: 1,
      title: "Site visit at Riverside Apartments",
      time: "Tomorrow · 10:30 AM",
      location: "Lekki Phase 1",
    },
    {
      id: 2,
      title: "Virtual tour with property agent",
      time: "Friday · 4:00 PM",
      location: "Online",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-8 space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-xl p-8 text-white shadow-lg bg-[#004e27]"
      >
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Welcome back, Alexander!
        </h1>
        <p className="text-lg text-white">
          Here&apos;s a quick view of your saved homes, recent activity, and
          upcoming visits.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Stats</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{
                  translateY: -4,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="p-6 transition-all bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Saved Properties</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#004e27] text-white font-medium rounded-lg hover:bg-[#004e27] transition-colors"
          >
            <Plus size={20} />
            <span>Explore Homes</span>
          </motion.button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="overflow-hidden transition-all bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:border-gray-200 group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-[#004e27] rounded-full">
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 font-semibold text-gray-900 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-500">
                    {property.location}
                  </p>
                  <p className="text-lg font-bold text-[#004e27] mb-4">
                    {property.price}
                  </p>

                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye size={16} className="text-blue-500" />
                      <span>{property.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={16} className="text-red-500" />
                      <span>{property.saved}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-3 py-2 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#004e27] transition-colors text-sm"
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="p-4 transition-all bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {activity.detail}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Visits
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingVisits.map((visit) => (
                <motion.div
                  key={visit.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="p-4 transition-all bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 text-green-600 bg-green-100 rounded-lg">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {visit.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{visit.time}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {visit.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileDashboard;
