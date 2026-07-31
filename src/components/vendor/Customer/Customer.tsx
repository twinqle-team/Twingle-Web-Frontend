
import React, { useState } from 'react';
import { 
  Users, UserPlus, DollarSign, Home, Car, 
  Filter, Eye,  
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  category: 'Property' | 'Vehicle';
  purchaseType: 'Purchase' | 'Rental';
  item: string;
  totalSpent: string;
  orders: number;
  lastPurchase: string;
  status: 'Active' | 'VIP' | 'Inactive';
  rating: number;
}

const mockCustomers: Customer[] = [ /* ... same mock data as before ... */ ];

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <motion.div whileHover={{ y: -3 }} className="bg-white border border-gray-200 rounded-3xl p-6">
    <div className="flex justify-between items-start">
      <div className="p-3 bg-gray-50 rounded-2xl text-green-600">
        <Icon className="w-6 h-6" />
      </div>
      {trend && <span className="text-emerald-600 text-sm font-medium">↑{trend}%</span>}
    </div>
    <p className="text-3xl font-semibold mt-6 text-gray-900">{value}</p>
    <p className="text-gray-500 text-sm mt-1">{label}</p>
  </motion.div>
);

const Customers: React.FC = () => {
  const [customers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your real estate and automobile customers.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-11 py-3 border border-gray-200 rounded-2xl focus:border-green-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Users className="absolute left-4 top-4 text-gray-400" />
          </div>

          <button className="px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>

         
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard icon={Users} label="Total Customers" value="487" trend="18" />
        <StatCard icon={UserPlus} label="New This Month" value="64" trend="32" />
        <StatCard icon={DollarSign} label="Revenue Generated" value="₦1.84B" />
        <StatCard icon={Home} label="Properties" value="219" />
        <StatCard icon={Car} label="Vehicles" value="156" />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <div className="px-8 py-5 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold">All Customers ({filteredCustomers.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase text-gray-500 bg-gray-50 border-b">
                <th className="px-8 py-5 text-left">Customer</th>
                <th className="px-6 py-5 text-left">Email</th>
                <th className="px-6 py-5 text-left">Phone</th>
                <th className="px-6 py-5 text-left">Location</th>
                <th className="px-6 py-5 text-left">Category</th>
                <th className="px-6 py-5 text-left">Item</th>
                <th className="px-6 py-5 text-right">Spent</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={customer.avatar} className="w-10 h-10 rounded-2xl" alt="" />
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-5 text-sm">{customer.phone}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{customer.location}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {customer.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{customer.item}</td>
                  <td className="px-6 py-5 text-right font-semibold">{customer.totalSpent}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1 text-xs rounded-full ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => openProfile(customer)}
                      className="px-5 py-2 border rounded-2xl hover:bg-gray-50 text-green-700 flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer - High z-index */}
      <AnimatePresence>
        {drawerOpen && selectedCustomer && (
          <>
            <div className="fixed inset-0 bg-black/60 z-[9999]" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[10000] overflow-auto"
            >
              {/* Drawer content same as before */}
              <div className="p-8">
                <button onClick={() => setDrawerOpen(false)} className="mb-8 text-gray-400">← Close</button>
                {/* ... rest of drawer content ... */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customers;