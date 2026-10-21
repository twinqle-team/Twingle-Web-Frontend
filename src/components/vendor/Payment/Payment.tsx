import React, { useState } from 'react';
import { 
  Users, UserPlus, DollarSign, Home, Car, 
  Filter, Eye, Phone, Mail, MapPin, X, Star,
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

const mockCustomers: Customer[] = [
  { id: 'PAY-1048', name: 'Aisha Mohammed', avatar: 'https://i.pravatar.cc/100?img=47', email: 'aisha.mohammed@email.com', phone: '+234 803 441 2098', location: 'Lagos, Nigeria', category: 'Property', purchaseType: 'Purchase', item: '4-Bedroom Duplex', totalSpent: '₦185M', orders: 3, lastPurchase: 'Nov 18, 2024', status: 'VIP', rating: 5 },
  { id: 'PAY-1047', name: 'Emmanuel Okoro', avatar: 'https://i.pravatar.cc/100?img=12', email: 'emmanuel.okoro@email.com', phone: '+234 809 115 7820', location: 'Abuja, Nigeria', category: 'Vehicle', purchaseType: 'Purchase', item: '2023 Mercedes-Benz GLE', totalSpent: '₦68M', orders: 2, lastPurchase: 'Nov 16, 2024', status: 'Active', rating: 4 },
  { id: 'PAY-1046', name: 'Chioma Eze', avatar: 'https://i.pravatar.cc/100?img=32', email: 'chioma.eze@email.com', phone: '+234 701 662 3145', location: 'Port Harcourt, Nigeria', category: 'Property', purchaseType: 'Rental', item: '3-Bed Apartment', totalSpent: '₦12.5M', orders: 5, lastPurchase: 'Nov 12, 2024', status: 'Active', rating: 5 },
  { id: 'PAY-1045', name: 'Daniel Adeyemi', avatar: 'https://i.pravatar.cc/100?img=68', email: 'daniel.adeyemi@email.com', phone: '+234 816 902 4410', location: 'Ibadan, Nigeria', category: 'Vehicle', purchaseType: 'Purchase', item: 'Toyota Camry 2022', totalSpent: '₦31M', orders: 1, lastPurchase: 'Nov 08, 2024', status: 'Inactive', rating: 4 },
  { id: 'PAY-1044', name: 'Fatima Bello', avatar: 'https://i.pravatar.cc/100?img=25', email: 'fatima.bello@email.com', phone: '+234 805 330 1172', location: 'Lagos, Nigeria', category: 'Property', purchaseType: 'Purchase', item: 'Luxury Villa Ikoyi', totalSpent: '₦240M', orders: 4, lastPurchase: 'Nov 05, 2024', status: 'VIP', rating: 5 },
  { id: 'PAY-1043', name: 'Tunde Williams', avatar: 'https://i.pravatar.cc/100?img=53', email: 'tunde.williams@email.com', phone: '+234 812 778 2091', location: 'Benin City, Nigeria', category: 'Vehicle', purchaseType: 'Rental', item: 'Range Rover Sport', totalSpent: '₦8.4M', orders: 2, lastPurchase: 'Oct 29, 2024', status: 'Active', rating: 4 },
];

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <motion.div whileHover={{ y: -3 }} className="rounded-xl border border-[#dce8e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
    <div className="flex justify-between items-start">
      <div className="rounded-xl bg-[#f0f5f1] p-3 text-[#012E19]">
        <Icon className="w-6 h-6" />
      </div>
      {trend && <span className="text-sm font-medium text-[#a57900]">↑{trend}%</span>}
    </div>
    <p className="mt-6 text-2xl font-semibold text-[#012E19] sm:text-3xl">{value}</p>
    <p className="text-gray-500 text-sm mt-1">{label}</p>
  </motion.div>
);

const Payment: React.FC = () => {
  const [customers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Customer['status']>('All');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || c.status === statusFilter)
  );

  const openProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-full bg-[#f7faf8] p-4 text-[#012E19] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-5 sm:mb-10 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-[#012E19]">Payments</h1>
          <p className="mt-1 text-sm text-[#60756a] sm:text-base">Manage your real estate and automobile payments.</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] lg:w-auto lg:grid-cols-[18rem_auto]">
          <div className="relative min-w-0">
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full rounded-xl border border-[#dce8e0] py-3 pl-11 pr-3 outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Users className="absolute left-4 top-4 text-gray-400" />
          </div>

          <button onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : statusFilter === 'Active' ? 'VIP' : statusFilter === 'VIP' ? 'Inactive' : 'All')} className="flex items-center justify-center gap-2 rounded-xl border border-[#dce8e0] px-5 py-3 hover:bg-[#f0f5f1]">
            <Filter className="w-4 h-4" /> Filter
          </button>

         
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:mb-12 lg:grid-cols-5 lg:gap-6">
        <StatCard icon={Users} label="Total Customers" value="487" trend="18" />
        <StatCard icon={UserPlus} label="New This Month" value="64" trend="32" />
        <StatCard icon={DollarSign} label="Revenue Generated" value="₦1.84B" />
        <StatCard icon={Home} label="Properties" value="219" />
        <StatCard icon={Car} label="Vehicles" value="156" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#dce8e0] bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b bg-[#f7faf8] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="font-semibold">All Customers ({filteredCustomers.length})</h2>
        </div>

        <div className="hidden max-h-[min(70vh,42rem)] overflow-auto md:block">
          <table className="w-full min-w-[960px]">
            <thead className="sticky top-0 z-10">
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
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
        <div className="divide-y divide-[#edf2ee] md:hidden">
          {filteredCustomers.map((customer) => (
            <article key={customer.id} className="space-y-3 p-4">
              <div className="flex items-start gap-3"><img src={customer.avatar} className="h-11 w-11 rounded-xl" alt="" /><div className="min-w-0 flex-1"><p className="truncate font-semibold">{customer.name}</p><p className="text-xs text-[#60756a]">{customer.email}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${customer.status === 'VIP' ? 'bg-[#fff4d4] text-[#8a6400]' : customer.status === 'Active' ? 'bg-[#e5f3eb] text-[#012E19]' : 'bg-gray-100 text-gray-600'}`}>{customer.status}</span></div>
              <div className="grid grid-cols-2 gap-2 text-sm"><span className="text-[#60756a]">{customer.category}</span><span className="text-right font-semibold">{customer.totalSpent}</span><span className="text-[#60756a]">{customer.item}</span><span className="text-right text-[#60756a]">{customer.lastPurchase}</span></div>
              <button onClick={() => openProfile(customer)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#dce8e0] py-2 text-sm font-medium text-[#012E19] hover:bg-[#f0f5f1]"><Eye className="h-4 w-4" /> View customer</button>
            </article>
          ))}
        </div>
        {filteredCustomers.length === 0 && <p className="p-8 text-center text-sm text-[#60756a]">No customers match this search or filter.</p>}
      </div>

      {/* Customer profile modal */}
      <AnimatePresence>
        {drawerOpen && selectedCustomer && (
          <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#012E19]/60 p-4 backdrop-blur-sm sm:p-6" onClick={() => setDrawerOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="payment-customer-profile-title"
              onClick={(event) => event.stopPropagation()}
              className="relative z-[10000] max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]"
            >
              <div className="p-5 sm:p-8">
                <div className="mb-7 flex items-center justify-between"><h2 id="payment-customer-profile-title" className="text-xl font-bold">Customer profile</h2><button onClick={() => setDrawerOpen(false)} aria-label="Close customer profile" className="rounded-lg p-2 text-[#60756a] hover:bg-[#f0f5f1]"><X size={20} /></button></div>
                <div className="flex items-center gap-4 border-b border-[#dce8e0] pb-6"><img src={selectedCustomer.avatar} className="h-16 w-16 rounded-2xl" alt="" /><div><h3 className="text-lg font-bold">{selectedCustomer.name}</h3><p className="text-sm text-[#60756a]">{selectedCustomer.id}</p><div className="mt-2 flex items-center gap-1 text-[#F2B60A]">{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill={star <= selectedCustomer.rating ? 'currentColor' : 'none'} />)}</div></div></div>
                <div className="space-y-4 py-6 text-sm"><div className="flex gap-3"><Mail size={18} className="text-[#a57900]" />{selectedCustomer.email}</div><div className="flex gap-3"><Phone size={18} className="text-[#a57900]" />{selectedCustomer.phone}</div><div className="flex gap-3"><MapPin size={18} className="text-[#a57900]" />{selectedCustomer.location}</div></div>
                <div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#f7faf8] p-4"><p className="text-xs text-[#60756a]">Total spent</p><p className="mt-1 font-bold">{selectedCustomer.totalSpent}</p></div><div className="rounded-xl bg-[#f7faf8] p-4"><p className="text-xs text-[#60756a]">Orders</p><p className="mt-1 font-bold">{selectedCustomer.orders}</p></div></div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;