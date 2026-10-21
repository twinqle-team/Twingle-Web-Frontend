
import React, { useState } from 'react';
import { 
  Star, Users, Clock, TrendingUp, MessageSquare, Filter, Download, 
  Reply,  Trash2, Flag, ThumbsUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { useForm } from 'react-hook-form';

interface Review {
  id: number;
  reviewer: string;
  avatar: string;
  rating: number;
  date: string;
  listingTitle: string;
  listingImage: string;
  category: 'Property' | 'Vehicle';
  reviewTitle: string;
  description: string;
  helpful: number;
  status: 'Published' | 'Pending' | 'Reported';
  reply?: {
    text: string;
    date: string;
  };
  media?: string[];
}

const mockReviews: Review[] = [
  {
    id: 1,
    reviewer: "Aisha Mohammed",
    avatar: "https://picsum.photos/id/64/48/48",
    rating: 5,
    date: "2 days ago",
    listingTitle: "Modern 4-Bedroom Duplex in Lekki",
    listingImage: "https://picsum.photos/id/1015/120/80",
    category: "Property",
    reviewTitle: "Absolutely stunning property!",
    description: "The house exceeded all my expectations. Great location, beautiful finishes, and very responsive agent.",
    helpful: 24,
    status: "Published",
    reply: { text: "Thank you Aisha! We're glad you loved it.", date: "1 day ago" },
    media: ["https://picsum.photos/id/1015/300/200"]
  },
  {
    id: 2,
    reviewer: "Emmanuel Okoro",
    avatar: "https://picsum.photos/id/65/48/48",
    rating: 4,
    date: "5 days ago",
    listingTitle: "2023 Mercedes-Benz GLE",
    listingImage: "https://picsum.photos/id/1074/120/80",
    category: "Vehicle",
    reviewTitle: "Smooth ride, great condition",
    description: "Car is in excellent shape. Minor scratch on the bumper but overall fantastic purchase.",
    helpful: 12,
    status: "Published"
  }
];

const SummaryCard = ({ icon: Icon, title, value, subvalue, trend, color = "text-green-600" }: any) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className="rounded-xl border border-[#dce8e0] bg-white p-4 shadow-sm transition-all hover:shadow-lg sm:p-6"
  >
    <div className="flex items-start justify-between">
      <div className={`p-4 rounded-2xl bg-gray-50 ${color}`}>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>
      {trend && (
        <div className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">+{trend}%</div>
      )}
    </div>
    <div className="mt-8">
      <p className="text-3xl font-semibold text-[#012E19] sm:text-4xl">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      {subvalue && <p className="text-xl font-medium text-gray-700 mt-2">{subvalue}</p>}
    </div>
  </motion.div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex shrink-0">
    {[1,2,3,4,5].map(i => (
      <Star 
        key={i} 
        className={`h-4 w-4 sm:h-5 sm:w-5 ${i <= rating ? 'fill-[#F2B60A] text-[#F2B60A]' : 'text-gray-200'}`} 
      />
    ))}
  </div>
);

const AdminReviewCard: React.FC<{ review: Review; onReply: (id: number) => void; onDelete: (id: number) => void }> = ({ review, onReply, onDelete }) => {
  // const [showReplyForm, setShowReplyForm] = useState(false);
  // const [replyText, setReplyText] = useState(review.reply?.text || "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#dce8e0] bg-white p-4 shadow-sm transition-all hover:shadow-xl sm:p-6 lg:p-8"
    >
      <div className="flex items-start gap-3 sm:gap-5 lg:gap-6">
        <img src={review.avatar} alt="" className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl" />
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold">{review.reviewer}</h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e5f3eb] px-2.5 py-px text-xs text-[#012E19]">
                  ✓ Verified
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#60756a] sm:gap-3">
                <StarRating rating={review.rating} />
                <span>• {review.date}</span>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${review.status === 'Published' ? 'bg-[#e5f3eb] text-[#012E19]' : 'bg-[#fff4d4] text-[#8a6400]'}`}>
              {review.status}
            </span>
          </div>

          <div className="mt-5 flex gap-3 sm:gap-4">
            <img src={review.listingImage} alt="" className="h-16 w-24 shrink-0 rounded-xl object-cover sm:h-20 sm:w-28 sm:rounded-2xl" />
            <div>
              <div className="mb-2 inline-block rounded-full bg-[#f0f5f1] px-3 py-1 text-xs text-[#60756a]">
                {review.category}
              </div>
              <h5 className="font-semibold leading-tight">{review.listingTitle}</h5>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium">{review.reviewTitle}</p>
            <p className="mt-3 leading-relaxed text-[#60756a]">{review.description}</p>
          </div>

          {review.media && review.media.length > 0 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {review.media.map((img, i) => (
                <img key={i} src={img} className="h-24 w-auto rounded-2xl object-cover cursor-zoom-in" alt="review media" />
              ))}
            </div>
          )}

          {review.reply && (
            <div className="mt-8 rounded-xl border border-[#dce8e0] bg-[#f7faf8] p-4 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-[#012E19]">
                <Reply className="w-4 h-4" />
                <span className="font-medium text-sm">Your Response</span>
              </div>
              <p className="text-[#60756a]">{review.reply.text}</p>
              <p className="text-xs text-gray-400 mt-3">{review.reply.date}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-sm sm:pt-6">
            <button 
              onClick={() => onReply(review.id)}
              className="flex items-center gap-2 font-medium text-[#012E19] hover:text-[#a57900]"
            >
              <Reply className="w-4 h-4" /> Reply
            </button>
            
            <div className="flex items-center gap-3 text-[#60756a] sm:gap-6">
              <button className="flex items-center gap-1 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" /> {review.helpful}
              </button>
              <button className="hover:text-amber-600"><Flag className="w-4 h-4" /></button>
              <button onClick={() => onDelete(review.id)} aria-label={`Delete review from ${review.reviewer}`} className="hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminReview: React.FC = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [activeFilter, setActiveFilter] = useState('All Reviews');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = reviews.filter(r => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = r.reviewer.toLowerCase().includes(query) || r.listingTitle.toLowerCase().includes(query) || r.reviewTitle.toLowerCase().includes(query);
    const matchesRating = activeFilter === 'All Reviews' || activeFilter === `${r.rating} Stars` || (activeFilter === '1 Star' && r.rating === 1);
    const matchesCategory = selectedCategory === 'All' || (selectedCategory === 'Properties' && r.category === 'Property') || (selectedCategory === 'Vehicles' && r.category === 'Vehicle');
    return matchesSearch && matchesRating && matchesCategory;
  });

  const handleReply = (id: number) => {
    setReplyingTo(id);
    setReplyText(reviews.find((review) => review.id === id)?.reply?.text || '');
  };

  const handleReplySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyingTo || !replyText.trim()) return;
    setReviews((currentReviews) => currentReviews.map((review) => review.id === replyingTo
      ? { ...review, reply: { text: replyText.trim(), date: 'Just now' } }
      : review));
    setReplyingTo(null);
    setReplyText('');
  };

  const handleDelete = () => {
    if (deletingReviewId === null) return;
    setReviews((currentReviews) => currentReviews.filter((review) => review.id !== deletingReviewId));
    setDeletingReviewId(null);
  };

  const ratingBreakdown = [
    { stars: 5, count: 892, percent: 69 },
    { stars: 4, count: 245, percent: 19 },
    { stars: 3, count: 98, percent: 8 },
    { stars: 2, count: 32, percent: 2 },
    { stars: 1, count: 17, percent: 1 },
  ];

  return (
    <div className="min-h-full bg-[#f7faf8] text-[#012E19]">
      {/* HEADER */}
      <header className="border-b border-[#dce8e0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-[#012E19] sm:text-4xl">Reviews</h1>
            <p className="mt-1 max-w-2xl text-sm text-[#60756a] sm:text-base">Monitor customer feedback, ratings, and reviews for your property and vehicle listings.</p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto] lg:w-auto">
            <div className="relative min-w-0 sm:col-span-3 lg:col-span-1 lg:w-80">
              <input
                type="text"
                placeholder="Search reviews or listings..."
                className="w-full rounded-xl border border-[#dce8e0] bg-white py-3 pl-11 pr-3 outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MessageSquare className="absolute left-5 top-4 text-gray-400" />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-[#dce8e0] px-4 py-3 text-sm font-medium hover:bg-[#f0f5f1] sm:px-5">
              <Filter className="w-4 h-4" /> Filter
            </button>
            
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#012E19] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#074b2d] sm:px-5">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* SUMMARY CARDS */}
        <div className="mb-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:mb-12 xl:grid-cols-5">
          <SummaryCard 
            icon={Star} 
            title="Overall Rating" 
            value="4.8" 
            subvalue="/ 5" 
          />
          <SummaryCard 
            icon={Users} 
            title="Total Reviews" 
            value="1,284" 
            trend="14" 
          />
          <SummaryCard 
            icon={TrendingUp} 
            title="Positive" 
            value="1,120" 
            subvalue="87%" 
          />
          <SummaryCard 
            icon={MessageSquare} 
            title="Avg Response Time" 
            value="2h" 
          />
          <SummaryCard 
            icon={Clock} 
            title="Response Rate" 
            value="96%" 
          />
        </div>

        {/* RATING BREAKDOWN */}
        <div className="mb-8 rounded-xl border border-[#dce8e0] bg-white p-4 sm:mb-12 sm:p-6 lg:p-8">
          <h2 className="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">Rating Breakdown</h2>
          <div className="space-y-6">
            {ratingBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-4 lg:gap-8">
                <div className="w-20 shrink-0 sm:w-24">
                  <StarRating rating={item.stars} />
                </div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <div className="w-10 text-right text-sm font-medium sm:w-12">{item.percent}%</div>
                <div className="hidden w-16 text-right text-sm text-[#60756a] sm:block">({item.count})</div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTERS + REVIEWS */}
        <div className="flex flex-col gap-5 sm:gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <div className="shrink-0 lg:w-72">
            <div className="rounded-xl border border-[#dce8e0] bg-white p-4 sm:p-6 lg:sticky lg:top-28 lg:p-8">
              <h3 className="font-semibold mb-6">Filters</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">Rating</label>
                  {['All Reviews', '5 Stars', '4 Stars', '3 Stars', '1 Star'].map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilter(f)}
                      className={`mb-1 block w-full rounded-lg px-4 py-2.5 text-left text-sm ${activeFilter === f ? 'bg-[#e5f3eb] font-medium text-[#012E19]' : 'hover:bg-[#f0f5f1]'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">Category</label>
                  {['All', 'Properties', 'Vehicles'].map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(cat)}
                      className={`mb-1 block w-full rounded-lg px-4 py-2.5 text-left text-sm ${selectedCategory === cat ? 'bg-[#e5f3eb] font-medium text-[#012E19]' : 'hover:bg-[#f0f5f1]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Reviews Feed */}
          <div className="flex-1 space-y-8">
            <AnimatePresence>
              {filteredReviews.map(review => (
                <AdminReviewCard key={review.id} review={review} onReply={handleReply} onDelete={setDeletingReviewId} />
              ))}
            </AnimatePresence>

            {filteredReviews.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#b8cfc1] bg-white py-16 text-center sm:py-20">
                <p className="text-6xl mb-6">📭</p>
                <p className="text-xl font-medium">No reviews found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2 sm:mt-12">
              {[1,2,3,4].map(p => (
                <button key={p} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce8e0] text-sm font-medium hover:bg-[#f0f5f1]">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TOP REVIEWED LISTINGS */}
        <div className="mt-16">
          <h2 className="mb-5 text-xl font-semibold sm:mb-6 sm:text-2xl">Top Reviewed Listings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[
              { title: "Luxury Villa Ikoyi", category: "Property", rating: 4.9, count: 87 },
              { title: "2024 Range Rover", category: "Vehicle", rating: 4.7, count: 54 },
              { title: "3-Bed Apartment Lekki", category: "Property", rating: 4.6, count: 42 },
            ].map((listing, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-[#dce8e0] bg-white p-4 transition-shadow hover:shadow sm:gap-6 sm:p-6">
                <div className="h-16 w-20 shrink-0 rounded-xl bg-[#e6eee8] sm:h-20 sm:w-24" />
                <div>
                  <div className="text-sm font-medium text-[#a57900]">{listing.category}</div>
                  <h4 className="font-semibold mt-2 leading-tight">{listing.title}</h4>
                  <div className="flex items-center gap-2 mt-4">
                    <StarRating rating={Math.floor(listing.rating)} />
                    <span className="text-sm font-medium">{listing.rating}</span>
                    <span className="text-xs text-gray-400">({listing.count})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={replyingTo !== null} onOpenChange={(open) => !open && setReplyingTo(null)}>
        <DialogContent className="max-h-[calc(100vh-2rem)] max-w-lg overflow-y-auto border-[#dce8e0] bg-white p-5 text-[#012E19] sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reply to {reviews.find((review) => review.id === replyingTo)?.reviewer}</DialogTitle>
            <DialogDescription className="text-[#60756a]">Write a thoughtful response to this customer review.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <label className="block text-sm font-semibold">Your response
              <textarea required autoFocus value={replyText} onChange={(event) => setReplyText(event.target.value)} rows={5} placeholder="Thank the customer for sharing their experience..." className="mt-1.5 w-full resize-y rounded-lg border border-[#dce8e0] px-3 py-2.5 font-normal outline-none focus:border-[#F2B60A] focus:ring-2 focus:ring-[#F2B60A]/20" />
            </label>
            <DialogFooter className="-mx-5 -mb-5 mt-6 px-5 sm:-mx-6 sm:-mb-6 sm:px-6">
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" className="bg-[#012E19] text-white hover:bg-[#074b2d]">Post reply</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deletingReviewId !== null} onOpenChange={(open) => !open && setDeletingReviewId(null)}>
        <DialogContent className="max-w-md border-[#f1d2cd] bg-white p-5 text-[#012E19] sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Delete this review?</DialogTitle>
            <DialogDescription className="text-[#60756a]">This action will remove the review from your dashboard and cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:mt-6">
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="button" onClick={handleDelete} className="bg-[#a13c32] text-white hover:bg-[#87332a]">Delete review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReview;