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
       buttonColor: "bg-[#004e27] hover:bg-[#007a52]",
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
      buttonColor: "bg-[#004e27] hover:bg-[#007a52]",
    },
  ];

  const renderServiceCard = (service: (typeof services)[number]) => {
    const Icon = service.icon;

    return (
      <div key={service.id} className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="p-6 mb-4 transition-colors rounded-2xl bg-gray-50 hover:bg-gray-100 sm:p-8 sm:mb-6">
          <Icon size={48} className="text-gray-800 stroke-1 sm:w-16 sm:h-16" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600 whitespace-pre-line sm:mb-8 sm:text-base">
          {service.description}
        </p>

        {/* Button */}
        <Button
          variant={service.buttonVariant}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold h-11 transition-all text-gray-100 sm:px-6 sm:py-3 sm:text-base sm:h-12 ${
            service.buttonColor ||
            "border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
          }`}
        >
          {service.buttonText}
          <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
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
            See how <span className="text-[#004e27] font-bold">Twingle </span>
            can help
          </h2>
          <p className="text-lg text-gray-600">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {services.slice(0, 3).map((service) => renderServiceCard(service))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {services.slice(3).map((service) => renderServiceCard(service))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorHelp;
