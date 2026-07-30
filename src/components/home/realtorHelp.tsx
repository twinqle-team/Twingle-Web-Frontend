import React from "react";
import { Home, Clock, Key, ArrowRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const RealtorHelp: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Buy a property",
      description:
        "Discover your ideal home with trusted listings and expert guidance.",
      icon: Home,
      buttonText: "Find a home",
      buttonVariant: "outline" as const,
      buttonColor: "",
    },
    {
      id: 2,
      title: "Sell a property",
      description:
        "List your property easily and connect with the right buyers quickly.",
      icon: Clock,
      buttonText: "Place an ad",
      buttonVariant: "default" as const,
      buttonColor: "bg-[#01a16f] hover:bg-[#007a52]",
    },
    {
      id: 3,
      title: "Rent a property",
      description:
        "Explore rental options that fit your lifestyle, budget, and location.",
      icon: Key,
      buttonText: "Find a rental",
      buttonVariant: "outline" as const,
      buttonColor: "",
    },
    {
      id: 4,
      title: "Buy a car",
      description:
        "Browse a wide range of quality vehicles and find the perfect one for you.",
      icon: Car,
      buttonText: "Find a car",
      buttonVariant: "outline" as const,
      buttonColor: "",
    },
    {
      id: 5,
      title: "Sell a car",
      description:
        "Sell your car quickly with simple listing tools and strong buyer reach.",
      icon: Car,
      buttonText: "List your car",
      buttonVariant: "default" as const,
      buttonColor: "bg-[#01a16f] hover:bg-[#007a52]",
    },
  ];

  const renderServiceCard = (service: (typeof services)[number]) => {
    const Icon = service.icon;

    return (
      <div key={service.id} className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="p-8 mb-6 transition-colors rounded-2xl bg-gray-50 hover:bg-gray-100">
          <Icon size={64} className="text-gray-800 stroke-1" />
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold text-gray-900">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-8 text-base leading-relaxed text-gray-600 whitespace-pre-line">
          {service.description}
        </p>

        {/* Button */}
        <Button
          variant={service.buttonVariant}
          className={`flex items-center gap-2 px-6 py-3 text-base font-semibold h-12 transition-all ${
            service.buttonColor ||
            "border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
          }`}
        >
          {service.buttonText}
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full px-6 py-20 bg-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            See how <span className="font-bold text-[#33a980]">Twingle </span>
            can help
          </h2>
          <p className="text-lg text-gray-600">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {services.slice(0, 3).map((service) => renderServiceCard(service))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
            {services.slice(3).map((service) => renderServiceCard(service))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorHelp;
