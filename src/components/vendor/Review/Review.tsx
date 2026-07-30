
import React, { useState } from 'react';
import { 
  Star, Users, Clock, TrendingUp, MessageSquare, Filter, Download, 
  Reply,  Trash2, Flag, ThumbsUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all"
  >
    <div className="flex items-start justify-between">
      <div className={`p-4 rounded-2xl bg-gray-50 ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      {trend && (
        <div className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">+{trend}%</div>
      )}
    </div>
    <div className="mt-8">
      <p className="text-4xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      {subvalue && <p className="text-xl font-medium text-gray-700 mt-2">{subvalue}</p>}
    </div>
  </motion.div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1,2,3,4,5].map(i => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
      />
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: Review; onReply: (id: number) => void }> = ({ review, onReply }) => {
  // const [showReplyForm, setShowReplyForm] = useState(false);
  // const [replyText, setReplyText] = useState(review.reply?.text || "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-6">
        <img src={review.avatar} alt="" className="w-12 h-12 rounded-2xl" />
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-semibold">{review.reviewer}</h4>
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-px rounded-full">
                  ✓ Verified
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <StarRating rating={review.rating} />
                <span>• {review.date}</span>
              </div>
            </div>
            <span className={`px-4 py-1 text-xs font-medium rounded-2xl ${review.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {review.status}
            </span>
          </div>

          <div className="mt-5 flex gap-4">
            <img src={review.listingImage} alt="" className="w-28 h-20 object-cover rounded-2xl flex-shrink-0" />
            <div>
              <div className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mb-2">
                {review.category}
              </div>
              <h5 className="font-semibold leading-tight">{review.listingTitle}</h5>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium text-lg">{review.reviewTitle}</p>
            <p className="text-gray-600 mt-3 leading-relaxed">{review.description}</p>
          </div>

          {review.media && review.media.length > 0 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {review.media.map((img, i) => (
                <img key={i} src={img} className="h-24 w-auto rounded-2xl object-cover cursor-zoom-in" alt="review media" />
              ))}
            </div>
          )}

          {review.reply && (
            <div className="mt-8 bg-gray-50 border border-gray-100 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-green-700 mb-3">
                <Reply className="w-4 h-4" />
                <span className="font-medium text-sm">Your Response</span>
              </div>
              <p className="text-gray-600">{review.reply.text}</p>
              <p className="text-xs text-gray-400 mt-3">{review.reply.date}</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t text-sm">
            <button 
              onClick={() => onReply(review.id)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Reply className="w-4 h-4" /> Reply
            </button>
            
            <div className="flex items-center gap-6 text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" /> {review.helpful}
              </button>
              <button className="hover:text-amber-600"><Flag className="w-4 h-4" /></button>
              <button className="hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Review: React.FC = () => {
  const [reviews] = useState(mockReviews);
  // const [reviews, setReviews] = useState(mockReviews);
  const [activeFilter, setActiveFilter] = useState('All Reviews');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.listingTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleReply = (id: number) => {
    setReplyingTo(id);
  };

  console.log(replyingTo)

  const ratingBreakdown = [
    { stars: 5, count: 892, percent: 69 },
    { stars: 4, count: 245, percent: 19 },
    { stars: 3, count: 98, percent: 8 },
    { stars: 2, count: 32, percent: 2 },
    { stars: 1, count: 17, percent: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b  top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mt-2">Reviews</h1>
            <p className="text-gray-600 mt-1">Monitor customer feedback, ratings, and reviews for your property and vehicle listings.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search reviews or listings..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 py-3 focus:outline-none focus:border-green-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MessageSquare className="absolute left-5 top-4 text-gray-400" />
            </div>

            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 hover:bg-gray-50 rounded-2xl text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
            
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white px-6 py-3 rounded-2xl text-sm font-medium">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
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
        <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-12">
          <h2 className="font-semibold text-2xl mb-8">Rating Breakdown</h2>
          <div className="space-y-6">
            {ratingBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="w-24 flex-shrink-0">
                  <StarRating rating={item.stars} />
                </div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <div className="w-20 text-right text-sm font-medium">{item.percent}%</div>
                <div className="w-16 text-sm text-gray-500 text-right">({item.count})</div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTERS + REVIEWS */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 sticky top-28">
              <h3 className="font-semibold mb-6">Filters</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">Rating</label>
                  {['All Reviews', '5 Stars', '4 Stars', '3 Stars', '1 Star'].map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilter(f)}
                      className={`block w-full text-left py-2.5 px-4 rounded-2xl mb-1 text-sm ${activeFilter === f ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-50'}`}
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
                      className={`block w-full text-left py-2.5 px-4 rounded-2xl mb-1 text-sm ${selectedCategory === cat ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-50'}`}
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
                <ReviewCard key={review.id} review={review} onReply={handleReply} />
              ))}
            </AnimatePresence>

            {filteredReviews.length === 0 && (
              <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-3xl">
                <p className="text-6xl mb-6">📭</p>
                <p className="text-xl font-medium">No reviews found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              {[1,2,3,4].map(p => (
                <button key={p} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 rounded-2xl font-medium text-sm">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TOP REVIEWED LISTINGS */}
        <div className="mt-16">
          <h2 className="font-semibold text-2xl mb-6">Top Reviewed Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Luxury Villa Ikoyi", category: "Property", rating: 4.9, count: 87 },
              { title: "2024 Range Rover", category: "Vehicle", rating: 4.7, count: 54 },
              { title: "3-Bed Apartment Lekki", category: "Property", rating: 4.6, count: 42 },
            ].map((listing, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 flex gap-6 hover:shadow transition-shadow">
                <div className="w-24 h-20 bg-gray-200 rounded-2xl" />
                <div>
                  <div className="text-sm text-green-600 font-medium">{listing.category}</div>
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
    </div>
  );
};

export default Review;