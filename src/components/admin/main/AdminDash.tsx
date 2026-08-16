import React, { useState } from 'react';
import { 
  Home, Car,  TrendingUp, Edit, Trash2, Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
// import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
// import { useForm } from 'react-hook-form';

// Mock Data
const statCards = [
  { title: "Total Listings", value: "2,847", change: "+12%", icon: Home, color: "text-green-600" },
  { title: "Properties", value: "1,234", change: "+8%", icon: Home, color: "text-emerald-600" },
  { title: "Vehicles", value: "1,613", change: "+18%", icon: Car, color: "text-blue-600" },
  { title: "Monthly Revenue", value: "$248,950", change: "+24%", icon: TrendingUp, color: "text-green-600" },
];

const revenueData = [
  { month: 'Jan', revenue: 185000, sales: 92000, rentals: 65000 },
  { month: 'Feb', revenue: 210000, sales: 105000, rentals: 72000 },
  { month: 'Mar', revenue: 198000, sales: 98000, rentals: 68000 },
  { month: 'Apr', revenue: 245000, sales: 125000, rentals: 78000 },
  { month: 'May', revenue: 268000, sales: 138000, rentals: 85000 },
  { month: 'Jun', revenue: 289000, sales: 142000, rentals: 92000 },
];

const propertyTypes = [
  { name: 'Apartments', value: 45, color: '#16a34a' },
  { name: 'Houses', value: 30, color: '#15803d' },
  { name: 'Villas', value: 15, color: '#166534' },
  { name: 'Land', value: 10, color: '#14532d' },
];

const vehicleTypes = [
  { name: 'Cars', value: 55, color: '#3b82f6' },
  { name: 'SUVs', value: 25, color: '#1e40af' },
  { name: 'Trucks', value: 10, color: '#1e3a8a' },
  { name: 'Others', value: 10, color: '#312e81' },
];

const recentListings = [
  { id: 1, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
  { id: 2, image: "https://picsum.photos/id/1074/80/60", title: "2023 Toyota Camry", category: "Vehicle", type: "Sedan", location: "Abuja, Nigeria", price: "₦38M", owner: "Chinedu Eze", status: "Pending", date: "5h ago" },
];

// const transactions = [
//   { id: 1, invoice: "INV-3921", customer: "Fatima Bello", listing: "4-Bed Duplex", amount: "₦185M", method: "Bank Transfer", status: "Completed", date: "Today" },
// ];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.01 }}
    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change}
      </div>
    </div>
    <div className="mt-6">
      <p className="text-3xl font-semibold text-gray-900 tracking-tight">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
    <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-1 bg-green-500 w-[78%] rounded-full"></div>
    </div>
  </motion.div>
);

const AdminDash: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('30 Days');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showNotifications, setShowNotifications] = useState(false);

  // const { register, handleSubmit } = useForm();

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   alert("Action simulated! (In real app this would open modals)");
  // };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
       

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-10">
          {/* WELCOME */}
          <div>
            <p className="text-gray-600 mt-1">Welcome back, <b>Admin</b> 👋</p>
            <p className="text-sm text-gray-500 mt-2 max-w-md">Monitor your marketplace performance, listings, revenue, customers, vendors, and recent activities.</p>
          </div>


          {/* OVERVIEW STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* REVENUE ANALYTICS */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Revenue Analytics</h2>
                <p className="text-gray-500">Platform earnings and performance</p>
              </div>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
                {['Today', '7 Days', '30 Days', '3 Months', '1 Year'].map((f, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 text-sm rounded-xl transition-all ${activeFilter === f ? 'bg-white shadow font-medium' : 'text-gray-500'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="natural" dataKey="revenue" stroke="#16a34a" strokeWidth={4} dot={{ fill: '#16a34a', r: 5 }} />
                <Line type="natural" dataKey="sales" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* LISTING & CATEGORY CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <h3 className="font-semibold mb-6">Properties by Type</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={propertyTypes} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {propertyTypes.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                    <span>{t.name} ({t.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <h3 className="font-semibold mb-6">Vehicles by Type</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={vehicleTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT LISTINGS TABLE */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b">
              <h3 className="font-semibold text-xl">Recent Listings</h3>
              <button className="text-green-600 text-sm font-medium flex items-center gap-1 hover:underline">
                View All <Eye className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-widest text-gray-500">
                    <th className="px-8 py-5 font-normal">Listing</th>
                    <th className="px-4 py-5 font-normal">Category</th>
                    <th className="px-4 py-5 font-normal">Location</th>
                    <th className="px-4 py-5 font-normal">Price</th>
                    <th className="px-4 py-5 font-normal">Status</th>
                    <th className="px-8 py-5 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentListings.map(listing => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-5 flex items-center gap-4">
                        <img src={listing.image} alt="" className="w-12 h-10 object-cover rounded-xl" />
                        <div>
                          <div className="font-medium">{listing.title}</div>
                          <div className="text-xs text-gray-500">{listing.owner}</div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{listing.category}</span>
                      </td>
                      <td className="px-4 py-5 text-sm text-gray-600">{listing.location}</td>
                      <td className="px-4 py-5 font-medium">{listing.price}</td>
                      <td className="px-4 py-5">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-all">
                          <button className="hover:text-green-600"><Eye className="w-4 h-4" /></button>
                          <button className="hover:text-amber-600"><Edit className="w-4 h-4" /></button>
                          <button className="hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Today's Revenue", value: "₦12.4M", trend: "+31%" },
              { label: "New Listings", value: "47", trend: "+14" },
              { label: "New Customers", value: "29", trend: "+9" },
              { label: "Active Vendors", value: "184", trend: "+3" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6">
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-4xl font-semibold mt-3 mb-1">{item.value}</div>
                <div className="text-green-600 text-sm font-medium">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 hidden xl:block space-y-6">
          {/* MONTHLY GOALS */}
          <div className="bg-white border border-gray-200 rounded-3xl p-7">
            <h3 className="font-semibold mb-6">Monthly Goals</h3>
            
            <div className="space-y-8">
              {[
                { name: "Revenue Target", progress: 78, target: "₦1.2B" },
                { name: "Listings Goal", progress: 65, target: "3200" },
                { name: "Customer Growth", progress: 82, target: "+240" },
              ].map((goal, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{goal.name}</span>
                    <span className="font-medium">{goal.target}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      className="h-2.5 bg-green-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className="bg-white border border-gray-200 rounded-3xl p-7">
            <h3 className="font-semibold mb-5">Recent Activity</h3>
            <div className="space-y-6 text-sm">
              {[
                "New luxury villa listed in Ikoyi",
                "Toyota Corolla sold for ₦24.5M",
                "Vendor Chika Okoro verified",
                "Customer payment received",
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <div>
                    <p>{act}</p>
                    <p className="text-xs text-gray-400 mt-0.5">3 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM HEALTH */}
          <div className="bg-white border border-gray-200 rounded-3xl p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">System Health</h3>
              <div className="text-green-500 text-xs font-medium px-3 py-1 border border-green-200 rounded-2xl">All Good</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="bg-gray-50 rounded-2xl py-4">
                <div className="font-mono text-xl text-green-600">99.9%</div>
                <div className="text-gray-500 text-xs mt-1">Uptime</div>
              </div>
              <div className="bg-gray-50 rounded-2xl py-4">
                <div className="font-mono text-xl">1.8s</div>
                <div className="text-gray-500 text-xs mt-1">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;