import { useMemo, useState } from "react";
import {
	ArrowDownToLine,
	ArrowUpRight,
	Check,
	ChevronDown,
	CreditCard,
	FileText,
	MoreHorizontal,
	Plus,
	Search,
	Sparkles,
	WalletCards,
} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

type Invoice = {
	id: string;
	date: string;
	description: string;
	amount: string;
	status: InvoiceStatus;
};

const invoices: Invoice[] = [
	{ id: "INV-2024-012", date: "Nov 20, 2024", description: "Professional plan", amount: "$249.00", status: "Paid" },
	{ id: "INV-2024-011", date: "Oct 20, 2024", description: "Professional plan", amount: "$249.00", status: "Paid" },
	{ id: "INV-2024-010", date: "Sep 20, 2024", description: "Professional plan", amount: "$249.00", status: "Paid" },
	{ id: "INV-2024-009", date: "Aug 20, 2024", description: "Professional plan", amount: "$249.00", status: "Paid" },
	{ id: "INV-2024-008", date: "Jul 20, 2024", description: "Professional plan", amount: "$249.00", status: "Pending" },
];

const statusStyles: Record<InvoiceStatus, string> = {
	Paid: "bg-[#e5f3eb] text-[#012E19]",
	Pending: "bg-[#fff4d4] text-[#8a6400]",
	Overdue: "bg-[#fbe7e4] text-[#a13c32]",
};

const Billing = () => {
	const [filter, setFilter] = useState<"All" | InvoiceStatus>("All");
	const [search, setSearch] = useState("");
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");

	const visibleInvoices = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();
		return invoices.filter((invoice) => {
			const matchesFilter = filter === "All" || invoice.status === filter;
			const matchesSearch = !normalizedSearch || `${invoice.id} ${invoice.description}`.toLowerCase().includes(normalizedSearch);
			return matchesFilter && matchesSearch;
		});
	}, [filter, search]);

	const addPaymentMethod = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPaymentModalOpen(false);
	};

	return (
		<main className="min-h-full bg-[#f7faf8] px-4 py-5 text-[#012E19] sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl space-y-6">
				<header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a57900]">Account finance</p>
						<h1 className="text-3xl font-bold tracking-tight">Billing & payments</h1>
						<p className="mt-1 text-sm text-[#60756a]">Manage your plan, payment method, and invoice history.</p>
					</div>
					<button onClick={() => setIsPaymentModalOpen(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#012E19] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#074b2d] sm:w-auto">
						<Plus size={17} /> Add payment method
					</button>
				</header>

				<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
					<div className="relative overflow-hidden rounded-xl bg-[#012E19] p-5 text-white shadow-sm sm:p-6 lg:col-span-2 lg:row-span-1">
						<div className="relative z-10 flex h-full flex-col justify-between gap-8">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-sm text-[#c6d8ce]">Current plan</p>
									<h2 className="mt-2 text-2xl font-bold">Professional</h2>
								</div>
								<span className="rounded-full bg-[#F2B60A] px-3 py-1 text-xs font-bold text-[#012E19]">Active</span>
							</div>
							<div>
								<p className="text-sm text-[#c6d8ce]">Next payment on Dec 20, 2024</p>
								<div className="mt-2 flex flex-wrap items-end justify-between gap-3">
									<p className="text-3xl font-bold">$249 <span className="text-sm font-normal text-[#c6d8ce]">/ month</span></p>
									<button className="inline-flex items-center gap-1 text-sm font-semibold text-[#F2B60A] hover:underline">Manage plan <ArrowUpRight size={15} /></button>
								</div>
							</div>
						</div>
						<Sparkles className="absolute -bottom-8 -right-5 h-40 w-40 text-[#164d31]" strokeWidth={1} />
					</div>

					<div className="rounded-xl border border-[#dce8e0] bg-white p-5 shadow-sm sm:p-6">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold text-[#60756a]">Monthly usage</p>
							<WalletCards size={20} className="text-[#a57900]" />
						</div>
						<p className="mt-4 text-3xl font-bold">68%</p>
						<div className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf2ee]"><div className="h-full w-[68%] rounded-full bg-[#F2B60A]" /></div>
						<p className="mt-3 text-xs text-[#60756a]">6,820 of 10,000 monthly listings used</p>
						<button className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#012E19] hover:text-[#a57900]">View usage details <ArrowUpRight size={15} /></button>
					</div>

					<div className="rounded-xl border border-[#dce8e0] bg-white p-5 shadow-sm sm:p-6">
						<div className="flex items-center justify-between"><p className="text-sm font-semibold text-[#60756a]">Payment method</p><CreditCard size={20} className="text-[#a57900]" /></div>
						<div className="mt-5 flex items-center gap-3"><div className="flex h-10 w-14 items-center justify-center rounded-md bg-[#012E19] text-xs font-bold text-white">VISA</div><div><p className="font-semibold">•••• 4242</p><p className="text-xs text-[#60756a]">Expires 08/26</p></div></div>
						<button onClick={() => setIsPaymentModalOpen(true)} className="mt-6 text-left text-sm font-bold text-[#012E19] hover:text-[#a57900]">Update payment method</button>
					</div>
				</section>

				<section className="overflow-hidden rounded-xl border border-[#dce8e0] bg-white shadow-sm">
					<div className="flex flex-col gap-4 border-b border-[#e8efea] p-5 sm:flex-row sm:items-center sm:justify-between">
						<div><h2 className="text-lg font-bold">Invoice history</h2><p className="mt-1 text-sm text-[#60756a]">Download receipts for your records.</p></div>
						<div className="relative w-full sm:w-64"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80958a]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search invoices" className="w-full rounded-lg border border-[#dce8e0] bg-[#fbfdfb] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></div>
					</div>
					<div className="flex flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-5">
						{(["All", "Paid", "Pending", "Overdue"] as const).map((option) => <button key={option} onClick={() => setFilter(option)} className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${filter === option ? "bg-[#012E19] text-white" : "bg-[#f0f5f1] text-[#60756a] hover:bg-[#e5eee8]"}`}>{option}</button>)}
						<button className="inline-flex items-center gap-1 text-xs font-bold text-[#60756a] sm:ml-auto">Newest first <ChevronDown size={15} /></button>
					</div>
					<div className="divide-y divide-[#edf2ee] md:hidden">{visibleInvoices.map((invoice) => <article key={invoice.id} className="space-y-3 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{invoice.id}</p><p className="mt-1 inline-flex items-center gap-2 text-sm text-[#60756a]"><FileText size={15} className="text-[#a57900]" />{invoice.description}</p></div><span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[invoice.status]}`}>{invoice.status === "Paid" && <Check size={13} />}{invoice.status}</span></div><div className="flex items-center justify-between text-sm"><span className="text-[#60756a]">{invoice.date}</span><span className="font-semibold">{invoice.amount}</span></div><div className="flex justify-end gap-1"><button title={`Download ${invoice.id}`} className="rounded-md p-2 text-[#60756a] transition hover:bg-[#f0f5f1] hover:text-[#012E19]"><ArrowDownToLine size={17} /></button><button title="More invoice actions" className="rounded-md p-2 text-[#60756a] transition hover:bg-[#f0f5f1] hover:text-[#012E19]"><MoreHorizontal size={17} /></button></div></article>)}</div>
					<div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-[#f7faf8] text-xs uppercase tracking-wider text-[#60756a]"><tr><th className="px-5 py-3 font-semibold">Invoice</th><th className="px-5 py-3 font-semibold">Description</th><th className="px-5 py-3 font-semibold">Date</th><th className="px-5 py-3 font-semibold">Amount</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-[#edf2ee]">{visibleInvoices.map((invoice) => <tr key={invoice.id} className="transition hover:bg-[#fbfdfb]"><td className="px-5 py-4 font-bold">{invoice.id}</td><td className="px-5 py-4 text-[#60756a]"><span className="inline-flex items-center gap-2"><FileText size={16} className="text-[#a57900]" />{invoice.description}</span></td><td className="px-5 py-4 text-[#60756a]">{invoice.date}</td><td className="px-5 py-4 font-semibold">{invoice.amount}</td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[invoice.status]}`}>{invoice.status === "Paid" && <Check size={13} />}{invoice.status}</span></td><td className="px-5 py-4 text-right"><button title={`Download ${invoice.id}`} className="rounded-md p-2 text-[#60756a] transition hover:bg-[#f0f5f1] hover:text-[#012E19]"><ArrowDownToLine size={17} /></button><button title="More invoice actions" className="rounded-md p-2 text-[#60756a] transition hover:bg-[#f0f5f1] hover:text-[#012E19]"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div>
					{visibleInvoices.length === 0 && <div className="px-5 py-12 text-center text-sm text-[#60756a]">No invoices match your search.</div>}
					<div className="flex flex-col gap-1 border-t border-[#e8efea] px-4 py-4 text-xs text-[#60756a] sm:flex-row sm:items-center sm:justify-between sm:px-5"><span>Showing {visibleInvoices.length} of {invoices.length} invoices</span><span>All amounts are in USD</span></div>
				</section>
			</div>
			<Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
				<DialogContent className="max-h-[calc(100vh-2rem)] max-w-lg overflow-y-auto border-[#dce8e0] bg-white p-5 sm:p-6">
					<DialogHeader><DialogTitle className="text-xl font-bold text-[#012E19]">Add payment method</DialogTitle><DialogDescription className="text-[#60756a]">Your card will be securely saved for future billing.</DialogDescription></DialogHeader>
					<form onSubmit={addPaymentMethod} className="space-y-4">
						<label className="block text-sm font-semibold text-[#012E19]">Cardholder name<input required value={cardName} onChange={(event) => setCardName(event.target.value)} placeholder="e.g. Alex Morgan" className="mt-1.5 w-full rounded-lg border border-[#dce8e0] px-3 py-2.5 font-normal outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></label>
						<label className="block text-sm font-semibold text-[#012E19]">Card number<input required inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="1234 5678 9012 3456" className="mt-1.5 w-full rounded-lg border border-[#dce8e0] px-3 py-2.5 font-normal outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></label>
						<div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold text-[#012E19]">Expiry date<input required value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="MM / YY" className="mt-1.5 w-full rounded-lg border border-[#dce8e0] px-3 py-2.5 font-normal outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></label><label className="block text-sm font-semibold text-[#012E19]">CVC<input required inputMode="numeric" value={cvc} onChange={(event) => setCvc(event.target.value)} placeholder="123" className="mt-1.5 w-full rounded-lg border border-[#dce8e0] px-3 py-2.5 font-normal outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" /></label></div>
						<DialogFooter className="-mx-5 -mb-5 mt-6 px-5 sm:-mx-6 sm:-mb-6 sm:px-6"><DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose><Button type="submit" className="bg-[#012E19] text-white hover:bg-[#074b2d]">Save payment method</Button></DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default Billing;
