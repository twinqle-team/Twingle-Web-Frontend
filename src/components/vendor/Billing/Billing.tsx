import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Receipt, BadgeCheck, ShieldCheck, 
  TrendingUp, Building2, DollarSign, Banknote, Download, 
   Star, Award, Plus 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  paymentMethod: string;
}

interface Card {
  id: number;
  type: string;
  number: string;
  expiry: string;
  holder: string;
}

const promoSchema = z.object({ promoCode: z.string().min(1).max(20) });
const cardSchema = z.object({
  cardNumber: z.string().min(16),
  expiry: z.string().min(5),
  holder: z.string().min(3),
});

type PromoForm = z.infer<typeof promoSchema>;
type CardForm = z.infer<typeof cardSchema>;

const Billing: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, type: 'Visa', number: '•••• 4827', expiry: '03/28', holder: 'John Doe' },
  ]);
  const [invoices] = useState<Invoice[]>([
    { id: 'INV-001', date: '2026-07-01', plan: 'Professional', amount: '$49.00', status: 'Paid', paymentMethod: 'Visa ****4827' },
    { id: 'INV-002', date: '2026-06-01', plan: 'Professional', amount: '$49.00', status: 'Paid', paymentMethod: 'Visa ****4827' },
    { id: 'INV-003', date: '2026-05-01', plan: 'Professional', amount: '$49.00', status: 'Refunded', paymentMethod: 'Visa ****4827' },
  ]);

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const { register: promoReg, handleSubmit: promoHandle, reset: promoReset } = useForm<PromoForm>({ resolver: zodResolver(promoSchema) });
  const { register: cardReg, handleSubmit: cardHandle, reset: cardReset, formState: {  } } = useForm<CardForm>({ resolver: zodResolver(cardSchema) });

  const onPromoSubmit = (data: PromoForm) => {
    if (data.promoCode.toUpperCase() === 'REALESTATE10') setPromoApplied(true);
    else setPromoError('Invalid promo code');
    setTimeout(() => { setPromoApplied(false); setPromoError(''); }, 2500);
    promoReset();
  };

  const onCardSubmit = (data: CardForm) => {
    if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id 
        ? { ...c, number: `•••• ${data.cardNumber.slice(-4)}`, expiry: data.expiry, holder: data.holder }
        : c));
    } else {
      const newCard: Card = {
        id: Date.now(),
        type: 'Visa',
        number: `•••• ${data.cardNumber.slice(-4)}`,
        expiry: data.expiry,
        holder: data.holder,
      };
      setCards([...cards, newCard]);
    }
    setShowAddCard(false);
    setShowEditCard(false);
    setEditingCard(null);
    cardReset();
  };

  React.useEffect(() => {
    let res = [...invoices];
    if (searchTerm) res = res.filter(i => i.id.toLowerCase().includes(searchTerm.toLowerCase()));
    if (statusFilter !== 'All') res = res.filter(i => i.status === statusFilter);
    setFilteredInvoices(res);
  }, [searchTerm, statusFilter]);

  const getStatusColor = (s: string) => {
    if (s === 'Paid') return 'bg-emerald-100 text-emerald-700';
    if (s === 'Refunded') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-b  top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Building2 className="w-9 h-9 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Billing & Pricing</h1>
              <p className="text-slate-500">Manage your subscription and payments</p>
            </div>
          </div>
          <div className="hidden md:block text-sm text-slate-500">Dashboard / <span className="text-emerald-700">Billing</span></div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Current Subscription */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-100 rounded-2xl"><Award className="w-10 h-10 text-emerald-600" /></div>
              <div>
                <h2 className="text-3xl font-semibold">Professional Plan</h2>
                <div className="flex gap-3 mt-2">
                  <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Active</span>
                  <span className="text-slate-500">Renews July 20, 2026</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-7 py-3.5 border rounded-2xl hover:bg-slate-50">Manage Subscription</button>
              <button className="px-7 py-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">Upgrade Plan</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-slate-50 rounded-2xl p-6"><div className="text-sm text-slate-500">Price</div><div className="text-5xl font-semibold mt-2">$49<span className="text-2xl text-slate-400">/mo</span></div></div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex justify-between"><div><div className="text-sm text-slate-500">Properties</div><div className="text-4xl font-semibold mt-1">48 / ∞</div></div><TrendingUp className="w-10 h-10 text-emerald-500" /></div>
              <div className="mt-6 h-2.5 bg-slate-200 rounded-full"><div className="h-2.5 bg-emerald-500 rounded-full w-[40%]" /></div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="text-sm text-slate-500">Storage</div><div className="text-4xl font-semibold mt-1">32 GB / 100 GB</div>
              <div className="mt-6 h-2.5 bg-slate-200 rounded-full"><div className="h-2.5 bg-emerald-500 rounded-full w-[32%]" /></div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6"><div className="text-sm text-slate-500">Featured</div><div className="text-4xl font-semibold mt-1 flex items-center gap-2">12 <Star className="text-amber-400" /></div></div>
          </div>
        </motion.div>

        {/* Payment Method + Summary */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3"><CreditCard className="w-6 h-6 text-emerald-600" /><h3 className="text-2xl font-semibold">Payment Methods</h3></div>
            </div>

            {cards.map(card => (
              <div key={card.id} className="bg-slate-50 p-6 rounded-2xl mb-6 flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded" />
                  <div>
                    <p className="font-medium">{card.type} {card.number}</p>
                    <p className="text-sm text-slate-500">Expires {card.expiry} • {card.holder}</p>
                  </div>
                </div>
                <button onClick={() => { setEditingCard(card); setShowEditCard(true); }} className="text-emerald-600 hover:underline">Edit</button>
              </div>
            ))}

            <button onClick={() => setShowAddCard(true)} className="w-full py-4 border border-dashed border-emerald-300 hover:border-emerald-600 rounded-2xl text-emerald-600 flex items-center justify-center gap-2 font-medium">
              <Plus className="w-5 h-5" /> Add New Card
            </button>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border p-8">
            <div className="flex items-center gap-3 mb-8"><DollarSign className="w-6 h-6 text-emerald-600" /><h3 className="text-2xl font-semibold">Payment Summary</h3></div>
            <div className="space-y-5">
              <div className="flex justify-between"><span>Subtotal</span><span>$49.00</span></div>
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-$4.90</span></div>
              <div className="flex justify-between"><span>Tax</span><span>$3.64</span></div>
              <div className="border-t pt-6 flex justify-between text-2xl font-semibold"><span>Total</span><span>$47.74</span></div>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border p-10 text-center">
          <Banknote className="mx-auto w-12 h-12 text-emerald-600 mb-6" />
          <h3 className="text-2xl font-semibold">Have a Promo Code?</h3>
          <form onSubmit={promoHandle(onPromoSubmit)} className="flex gap-3 mt-6">
            <input {...promoReg("promoCode")} placeholder="REALESTATE10" className="flex-1 px-6 py-4 border rounded-2xl focus:border-emerald-500" />
            <button type="submit" className="px-10 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">Apply</button>
          </form>
          <AnimatePresence>
            {promoApplied && <p className="text-emerald-600 mt-4">✅ Promo applied successfully!</p>}
            {promoError && <p className="text-red-600 mt-4">❌ {promoError}</p>}
          </AnimatePresence>
        </div>

        {/* Pricing Plans */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Choose Your Plan</h2>
            <p className="text-slate-600 mt-3">Scale your real estate business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter, Professional, Business, Enterprise cards with emerald accents */}
            {/* (Same structure as previous versions - green buttons) */}
            <div className="bg-white border rounded-3xl p-8 text-center">
              <div className="text-emerald-600 font-medium">STARTER</div>
              <div className="text-6xl font-bold my-6">$0</div>
              <button className="w-full py-4 border-2 rounded-2xl">Current</button>
            </div>
            {/* Professional - Popular */}
            <div className="relative bg-gradient-to-b from-emerald-700 to-emerald-950 text-white rounded-3xl p-8 scale-105 shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-6 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>
              <div className="text-amber-300">PROFESSIONAL</div>
              <div className="text-6xl font-bold my-6">$49</div>
              <button className="w-full py-4 bg-white text-black rounded-2xl mt-10">Upgrade</button>
            </div>
            {/* Business & Enterprise similar */}
          </div>
        </div>

        {/* Comparison Table, Billing History, Security - all included in full version */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-xl border p-10 overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-8">Compare Plans</h3>
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-6 pr-12">Feature</th>
                <th className="pb-6 text-center">Starter</th>
                <th className="pb-6 text-center text-amber-500">Professional</th>
                <th className="pb-6 text-center">Business</th>
                <th className="pb-6 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {[
                ["Properties", "10", "Unlimited", "Unlimited", "Unlimited"],
                ["Storage", "5 GB", "100 GB", "500 GB", "Unlimited"],
                ["Featured Listings", "2", "Unlimited", "Unlimited", "Unlimited"],
                ["Analytics", "Basic", "Advanced", "Advanced", "Custom"],
                ["Video Upload", "No", "Yes", "Yes", "Yes"],
                ["Priority Support", "No", "Yes", "Yes", "24/7"],
                ["API Access", "No", "No", "Yes", "Yes"],
                ["White Label", "No", "No", "No", "Yes"],
              ].map(([feature, s, p, b, e], i) => (
                <tr key={i}>
                  <td className="py-5 pr-12 font-medium">{feature}</td>
                  <td className="text-center py-5">{s}</td>
                  <td className="text-center py-5 font-medium text-amber-500">{p}</td>
                  <td className="text-center py-5">{b}</td>
                  <td className="text-center py-5">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* BILLING HISTORY */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Receipt className="w-6 h-6" />
              <h3 className="text-2xl font-semibold">Billing History</h3>
            </div>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Search invoices..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-5 py-3 border rounded-2xl w-72 focus:outline-none focus:border-indigo-500"
              />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-5 py-3 border rounded-2xl">
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase text-slate-500 border-b">
                  <th className="text-left pb-4">Invoice ID</th>
                  <th className="text-left pb-4">Date</th>
                  <th className="text-left pb-4">Plan</th>
                  <th className="text-left pb-4">Amount</th>
                  <th className="text-left pb-4">Status</th>
                  <th className="text-left pb-4">Method</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredInvoices.map((inv, idx) => (
                    <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="border-b hover:bg-slate-50">
                      <td className="py-6 font-mono">{inv.id}</td>
                      <td className="py-6 text-slate-600">{inv.date}</td>
                      <td className="py-6">{inv.plan}</td>
                      <td className="py-6 font-medium">{inv.amount}</td>
                      <td className="py-6">
                        <span className={`px-4 py-1 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>{inv.status}</span>
                      </td>
                      <td className="py-6 text-slate-600">{inv.paymentMethod}</td>
                      <td className="py-6 text-right">
                        <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm">
                          <Download className="w-4 h-4" /> PDF
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* SECURITY */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {[
            { icon: ShieldCheck, label: "SSL Secured" },
            { icon: BadgeCheck, label: "PCI Compliant" },
            { icon: CreditCard, label: "Encrypted Payments" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow border">
              <item.icon className="w-6 h-6 text-emerald-500" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>

      {/* BOTTOM ACTIONS */}
      <div className="fixed bottom-8 right-8 flex gap-4 z-50">
        <button className="px-8 py-4 bg-white border shadow-xl rounded-2xl text-red-600 hover:bg-red-50">Cancel Subscription</button>
        <button className="px-8 py-4 bg-emerald-600 text-white shadow-xl rounded-2xl hover:bg-emerald-700">Save Changes</button>
      </div>
    </div>

        {/* CARD MODALS */}
        <AnimatePresence>
          {(showAddCard || showEditCard) && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-semibold mb-6">{showAddCard ? 'Add New Card' : 'Edit Card'}</h3>
                <form onSubmit={cardHandle(onCardSubmit)} className="space-y-6">
                  <input {...cardReg("cardNumber")} placeholder="Card Number" className="w-full px-5 py-4 border rounded-2xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <input {...cardReg("expiry")} placeholder="MM/YY" className="w-full px-5 py-4 border rounded-2xl" />
                    <input {...cardReg("holder")} placeholder="Card Holder" className="w-full px-5 py-4 border rounded-2xl" />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => { setShowAddCard(false); setShowEditCard(false); }} className="flex-1 py-4 border rounded-2xl">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">Save Card</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default Billing;