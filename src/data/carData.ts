import heroBg from "../assets/pexels-alshreef-29884360.jpg";
import carImageOne from "../assets/pexels-bylukemiller-14667492.jpg";
import carImageTwo from "../assets/pexels-mikebirdy-112460.jpg";

export type CarListing = {
  id: number;
  title: string;
  price: string;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  location: string;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  technicalFeatures?: string[];
  additionalFeatures?: string[];
  contact?: {
    whatsapp?: string;
    phone?: string;
  };
  specs: Record<string, string>;
  dealer: {
    name: string;
    rating: string;
    location: string;
    since: string;
  };
  inspectionVideo?: {
    title: string;
    description: string;
    videoUrl: string;
  };
};

export const carListings: CarListing[] = [
  {
    id: 1,
    title: "Toyota - Highlander (2020)",
    price: "$2,850,000",
    year: 2020,
    mileage: "6,500 KM",
    transmission: "Manual",
    fuel: "Diesel",
    location: "Jabel Ali Port, Dubai, United Arab Emirates",
    featured: true,
    image: heroBg,
    gallery: [heroBg, carImageOne, carImageTwo],
    description:
      "The 2020 Toyota - Highlander is a bold and luxurious full-size SUV designed to combine rugged capability with premium comfort, catering to families and adventurers alike. Powered by a robust 6.2-liter V8 engine, this example showcases premium materials, modern infotainment, and advanced safety features.",
    features: [
      "Air Conditioning",
      "Apple CarPlay",
      "Paddle Shift (Tiptronic)",
      "Car Insurance",
      "4 Seats",
    ],
    technicalFeatures: [
      "Air Conditioning",
      "Apple CarPlay",
      "Paddle Shift (Tiptronic)",
      "Car Insurance",
      "4 Seats",
    ],
    additionalFeatures: [
      "Cruise Control",
      "Premium Audio",
      "Reverse Camera",
      "Parking Sensors",
      "2 Bags",
    ],
    contact: {
      whatsapp: "Contact via WhatsApp",
      phone: "Call Dealer",
    },
    specs: {
      Horsepower: "1200 HP",
      Fuel: "Diesel",
      "Max Speed": "400 MPH",
      "0-100 KM/H": "3.2 Sec",
      "Kilometer Travelled": "6,500 KM",
      Transmission: "Manual",
    },
    dealer: {
      name: "Go Cars (Buy & Sell)",
      rating: "4.7 (1.2k+)",
      location: "Dubai, UAE",
      since: "2014",
    },
    inspectionVideo: {
      title: "Full inspection walkthrough",
      description:
        "A detailed walkaround of the vehicle’s exterior, interior, and key features.",
      videoUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    },
  },
  {
    id: 2,
    title: "2023 Mercedes-Benz C-Class",
    price: "$2,850,000",
    year: 2023,
    mileage: "18,500 mi",
    transmission: "Automatic",
    fuel: "Hybrid",
    location: "Dubai, UAE",
    featured: false,
    image: carImageOne,
    gallery: [carImageOne, heroBg, carImageTwo],
    description:
      "A premium hybrid sedan designed for comfort and performance, with advanced driver assistance, a luxurious interior, and efficient power delivery for city and highway driving.",
    features: [
      "Adaptive cruise control",
      "Premium sound system",
      "Panoramic sunroof",
      "Leather interior",
    ],
    specs: {
      Engine: "2.0L Turbo I4",
      Power: "255 hp",
      Torque: "295 lb-ft",
      "Top speed": "155 mph",
      "0-60 mph": "5.9 sec",
      "Fuel economy": "30 MPG",
      Seats: "5",
      Transmission: "9-speed automatic",
    },
    dealer: {
      name: "AutoHub Motors",
      rating: "4.9",
      location: "Lekki, Lagos",
      since: "2014",
    },
  },
  {
    id: 3,
    title: "2022 BMW X5 Premium",
    price: "$72,400",
    year: 2022,
    mileage: "27,900 mi",
    transmission: "Automatic",
    fuel: "Diesel",
    location: "Abu Dhabi, UAE",
    featured: false,
    image: carImageTwo,
    gallery: [carImageTwo, carImageOne, heroBg],
    description:
      "An elegant luxury SUV with ample interior space, advanced safety technology, and strong diesel performance to deliver a refined driving experience on every road.",
    features: [
      "All-wheel drive",
      "Heated seats",
      "Head-up display",
      "Wireless charging",
    ],
    specs: {
      Engine: "3.0L TwinTurbo I6",
      Power: "335 hp",
      Torque: "330 lb-ft",
      "Top speed": "155 mph",
      "0-60 mph": "5.3 sec",
      "Fuel economy": "24 MPG",
      Seats: "5",
      Transmission: "8-speed automatic",
    },
    dealer: {
      name: "DrivePlus Autos",
      rating: "4.8",
      location: "Victoria Island, Lagos",
      since: "2017",
    },
    inspectionVideo: {
      title: "Condition report video",
      description:
        "See the vehicle’s condition, trim, and premium features in a concise inspection clip.",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
  },
];
