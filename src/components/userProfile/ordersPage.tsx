import React from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const OrdersPage: React.FC = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "completed",
      total: "$2,500",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "pending",
      total: "$1,200",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "completed",
      total: "$5,000",
      items: 2,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-2 text-gray-600">View and track your orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ y: -2 }}
            className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-200 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#004e27]/10 rounded-lg">
                  <Package className="w-6 h-6 text-[#004e27]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {order.id}
                  </h3>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  <p className="text-sm text-gray-500">{order.items} items</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:text-right">
                <div>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    {order.total}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(order.status)}
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrdersPage;