import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}

const TrustAndReliability: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Leslie Alexander",
      location: "From New york",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "Every client's journey is unique, and we strive to make each one as seamless and rewarding as possible. From dream homes to successful investments, read how we've helped individuals and families achieve their real estate goals.",
      rating: 5,
    },
    {
      id: 2,
      name: "Leslie Jerry",
      location: "From New york",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "Every client's journey is unique, and we strive to make each one as seamless and rewarding as possible. From dream homes to successful investments, read how we've helped individuals and families achieve their real estate goals.",
      rating: 5,
    },
    {
      id: 3,
      name: "John Mitchell",
      location: "From California",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "Every client's journey is unique, and we strive to make each one as seamless and rewarding as possible. From dream homes to successful investments, read how we've helped individuals and families achieve their real estate goals.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah Thompson",
      location: "From Texas",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      text: "Every client's journey is unique, and we strive to make each one as seamless and rewarding as possible. From dream homes to successful investments, read how we've helped individuals and families achieve their real estate goals.",
      rating: 5,
    },
  ];

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          </div>
        </div>
        <svg
          className="w-8 h-8 text-blue-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.25-2-7-2S0 3.75 0 5v8c0 7 4 8 7 8z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-4.25-2-7-2s-7 .75-7 2v8c0 7 4 8 7 8z" />
        </svg>
      </div>

      <p className="text-gray-700 text-base leading-relaxed mb-6">
        {testimonial.text}
      </p>

      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Trust and Reliability Focused
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustAndReliability;
