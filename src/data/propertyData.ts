// Using direct image URLs for better performance and reliability
export const HERO_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";
export const IMAGE_1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";
export const IMAGE_2 = "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80";

export type PropertyListing = {
  id: number;
  title: string;
  price: string;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: string;
  type: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  inspectionVideo?: {
    title: string;
    description?: string;
    videoUrl: string;
  };
};

export const propertyListings: PropertyListing[] = [
  {
    id: 1,
    title: "Willow Creek Family Residence",
    price: "$3,650,000",
    address: "892 Willow Creek Drive, San Jose, CA",
    city: "San Jose, California",
    beds: 5,
    baths: 4,
    sqft: "4,800",
    type: "For Sale",
    image: HERO_BG,
    gallery: [HERO_BG, IMAGE_1, IMAGE_2],
    description:
      "A spacious family home with bright living areas, charmequipped kitchen, and a landscaped yard ideal for entertaining guests.",
    features: ["Modern kitchen", "Large yard", "Private study", "3-car garage"],
    amenities: ["Swimming pool", "Fitness center", "Home office", "Smart home"],
    agent: {
      name: "Michael Harrington",
      phone: "+1 (213) 337-8573",
      email: "michael@havenly.com",
    },
    inspectionVideo: {
      title: "Willow Creek - Full Inspection",
      description: "Walkthrough and mechanical inspection of the property.",
      videoUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    },
  },
  {
    id: 2,
    title: "Harbor View Modern Home",
    price: "$6,720,000",
    address: "214 Seaside Avenue, Newport Beach, CA",
    city: "Newport Beach, California",
    beds: 6,
    baths: 5,
    sqft: "5,900",
    type: "For Sale",
    image: IMAGE_1,
    gallery: [IMAGE_1, HERO_BG, IMAGE_2],
    description:
      "A contemporary coastal home with expansive glass walls, open-plan living, and panoramic views over the harbor.",
    features: [
      "Ocean views",
      "Rooftop terrace",
      "Chef's kitchen",
      "Guest suite",
    ],
    amenities: [
      "Concierge service",
      "Outdoor kitchen",
      "Private dock",
      "Spa area",
    ],
    agent: {
      name: "Olivia Reed",
      phone: "+1 (310) 555-0142",
      email: "olivia@havenly.com",
    },
  },
  {
    id: 3,
    title: "Maplewood Classic Estate",
    price: "$4,250,000",
    address: "67 Maplewood Lane, Pasadena, CA",
    city: "Pasadena, California",
    beds: 4,
    baths: 4,
    sqft: "3,650",
    type: "For Sale",
    image: IMAGE_2,
    gallery: [IMAGE_2, IMAGE_1, HERO_BG],
    description:
      "An elegant estate blending classic architecture with modern comfort, set on a quiet tree-lined street.",
    features: ["Formal dining", "Library", "Media room", "Wine cellar"],
    amenities: [
      "Garden courtyard",
      "Heated pool",
      "Guest cottage",
      "Home theater",
    ],
    agent: {
      name: "Samuel Price",
      phone: "+1 (213) 987-6543",
      email: "samuel@havenly.com",
    },
  },
  {
    id: 4,
    title: "Modern Downtown Apartment",
    price: "$1,500/mo",
    address: "3501 W. Gray St, Uptown, Houston, TX",
    city: "Houston, Texas",
    beds: 2,
    baths: 1,
    sqft: "950",
    type: "For Rent",
    image: IMAGE_2,
    gallery: [IMAGE_2, IMAGE_1, HERO_BG],
    description:
      "A bright and modern apartment in the heart of the city, with premium finishes and easy access to dining and transit.",
    features: [
      "Open plan living",
      "In-unit laundry",
      "Balcony",
      "Floor-to-ceiling windows",
    ],
    amenities: [
      "Gym access",
      "Rooftop lounge",
      "24/7 security",
      "Bike storage",
    ],
    agent: {
      name: "Natalie Brooks",
      phone: "+1 (832) 555-0198",
      email: "natalie@havenly.com",
    },
  },
];
