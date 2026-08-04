import React from "react";
import Hero from "@/components/estate/hero";
import Product from "@/components/estate/product";

const RealEstatePage: React.FC = () => {
  return (
   <div>
    <Hero />
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Product />
      </div>
    </div>
   </div>
  );
};

export default RealEstatePage;
