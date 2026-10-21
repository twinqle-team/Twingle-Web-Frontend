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
  { title: "Total Listings", value: "2,847", change: "+12%", icon: Home, color: "text-[#012E19]" },
  { title: "Properties", value: "1,234", change: "+8%", icon: Home, color: "text-[#012E19]" },
  { title: "Vehicles", value: "1,613", change: "+18%", icon: Car, color: "text-[#012E19]" },
  { title: "Monthly Revenue", value: "$248,950", change: "+24%", icon: TrendingUp, color: "text-[#012E19]" },
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
  { name: 'Apartments', value: 45, color: '#012E19' },
  { name: 'Houses', value: 30, color: '#17613c' },
  { name: 'Villas', value: 15, color: '#F2B60A' },
  { name: 'Land', value: 10, color: '#8a6400' },
];

const vehicleTypes = [
  { name: 'Cars', value: 55, color: '#012E19' },
  { name: 'SUVs', value: 25, color: '#17613c' },
  { name: 'Trucks', value: 10, color: '#F2B60A' },
  { name: 'Others', value: 10, color: '#8a6400' },
];

const recentListings = [
  { id: 1, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
  { id: 2, image: "https://picsum.photos/id/1074/80/60", title: "2023 Toyota Camry", category: "Vehicle", type: "Sedan", location: "Abuja, Nigeria", price: "₦38M", owner: "Chinedu Eze", status: "Pending", date: "5h ago" },
    { id: 3, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
  { id: 4, image: "https://picsum.photos/id/1074/80/60", title: "2023 Toyota Camry", category: "Vehicle", type: "Sedan", location: "Abuja, Nigeria", price: "₦38M", owner: "Chinedu Eze", status: "Pending", date: "5h ago" },
    { id: 5, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
    { id: 6, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
    { id: 7, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
    { id: 8, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },
    { id: 9, image: "https://picsum.photos/id/1015/80/60", title: "Luxury 3-Bed Villa", category: "Property", type: "Villa", location: "Lagos, Nigeria", price: "₦245M", owner: "Adebayo Okon", status: "Active", date: "2h ago" },

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
    className="rounded-xl border border-[#dce8e0] bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6"
  >
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change}
      </div>
    </div>
    <div className="mt-6">
      <p className="text-2xl font-semibold tracking-tight text-[#012E19] sm:text-3xl">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
    <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#edf2ee]">
    <div className="h-1 w-[78%] rounded-full bg-[#F2B60A]"></div>
    </div>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('30 Days');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showNotifications, setShowNotifications] = useState(false);

  // const { register, handleSubmit } = useForm();

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   alert("Action simulated! (In real app this would open modals)");
  // };

  return (
    <div className="min-h-full bg-[#f7faf8] font-sans text-[#012E19]">

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-0 py-1 sm:gap-8 sm:px-2 sm:py-3 lg:flex-row lg:px-4 lg:py-5">
       

        {/* MAIN CONTENT */}
        <div className="min-w-0 flex-1 space-y-6 sm:space-y-8 lg:space-y-10">
          {/* WELCOME */}
          <div>
            <p className="mt-1 text-[#60756a]">Welcome back, <b className="text-[#012E19]">PaulAuto/Properties</b></p>
            <p className="mt-2 max-w-md text-sm text-[#60756a]">Monitor your marketplace performance, listings, revenue, customers, vendors, and recent activities.</p>
          </div>


          {/* OVERVIEW STATS */}
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {statCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* REVENUE ANALYTICS */}
          <div className="rounded-xl border border-[#dce8e0] bg-white p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl">Revenue Analytics</h2>
                <p className="text-sm text-[#60756a]">Platform earnings and performance</p>
              </div>
              <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-[#f0f5f1] p-1">
                {['Today', '7 Days', '30 Days', '3 Months', '1 Year'].map((f, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveFilter(f)}
                    className={`shrink-0 rounded-lg px-3 py-2 text-xs transition-all sm:px-4 sm:text-sm ${activeFilter === f ? 'bg-white font-medium text-[#012E19] shadow-sm' : 'text-[#60756a]'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="natural" dataKey="revenue" stroke="#012E19" strokeWidth={4} dot={{ fill: '#F2B60A', r: 5 }} />
                <Line type="natural" dataKey="sales" stroke="#F2B60A" strokeWidth={3} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* LISTING & CATEGORY CHARTS */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-[#dce8e0] bg-white p-4 sm:p-6 lg:p-8">
              <h3 className="mb-6 font-semibold">Properties by Type</h3>
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

            <div className="rounded-xl border border-[#dce8e0] bg-white p-4 sm:p-6 lg:p-8">
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
          <div className="overflow-hidden rounded-xl border border-[#dce8e0] bg-white">
            <div className="flex items-center justify-between border-b px-4 pb-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
              <h3 className="text-lg font-semibold sm:text-xl">Recent Listings</h3>
              <button className="flex items-center gap-1 text-sm font-medium text-[#012E19] hover:text-[#a57900] hover:underline">
                View All <Eye className="w-4 h-4" />
              </button>
            </div>
            
            <div className="hidden overflow-x-auto md:block  max-h-[min(70vh,42rem)] overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-widest text-gray-500">
                    <th className="px-8 py-5 font-normal">Listing</th>
                    <th className="px-4 py-5 font-normal">Category</th>
                    <th className="px-4 py-5 font-normal">Location</th>
                    <th className="px-4 py-5 font-normal">Price</th>
                    <th className="px-4 py-5 font-normal">Status</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          <div className="divide-y divide-[#edf2ee] md:hidden">
            {recentListings.map(listing => (
              <article key={listing.id} className="space-y-3 p-4">
                <div className="flex items-start gap-3"><img src={listing.image} alt="" className="h-12 w-14 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-medium">{listing.title}</p><p className="text-xs text-[#60756a]">{listing.owner}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${listing.status === 'Active' ? 'bg-[#e5f3eb] text-[#012E19]' : 'bg-[#fff4d4] text-[#8a6400]'}`}>{listing.status}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#60756a]">{listing.location}</span><span className="font-semibold">{listing.price}</span></div>
                <div className="flex justify-end gap-1"><button aria-label={`View ${listing.title}`} className="rounded-md p-2 text-[#60756a] hover:bg-[#f0f5f1] hover:text-[#012E19]"><Eye className="h-4 w-4" /></button><button aria-label={`Edit ${listing.title}`} className="rounded-md p-2 text-[#60756a] hover:bg-[#f0f5f1] hover:text-[#012E19]"><Edit className="h-4 w-4" /></button><button aria-label={`Delete ${listing.title}`} className="rounded-md p-2 text-[#60756a] hover:bg-[#fbe7e4] hover:text-[#a13c32]"><Trash2 className="h-4 w-4" /></button></div>
              </article>
            ))}
          </div>
          </div>

          {/* BOTTOM SUMMARY */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {[
              { label: "Today's Revenue", value: "₦12.4M", trend: "+31%" },
              { label: "New Listings", value: "47", trend: "+14" },
              { label: "New Customers", value: "29", trend: "+9" },
              { label: "Active Vendors", value: "184", trend: "+3" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-[#dce8e0] bg-white p-5 sm:p-6">
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="mt-3 mb-1 text-3xl font-semibold sm:text-4xl">{item.value}</div>
                <div className="text-sm font-medium text-[#a57900]">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:w-80 xl:grid-cols-1 xl:gap-6">
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

export default Dashboard;