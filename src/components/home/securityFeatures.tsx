import React from "react";
import { Shield, Lock, ClipboardCheck } from "lucide-react";

const SecurityFeatures: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Identity Verification",
      description:
        "Every buyer and seller undergoes rigorous KYC/AML checks to ensure a secure environment for high-value negotiations.",
    },
    {
      icon: Lock,
      title: "Premium Escrow",
      description:
        "Funds are held in high-security escrow accounts and only released upon successful title transfer or delivery.",
    },
    {
      icon: ClipboardCheck,
      title: "Physical Inspection",
      description:
        "On-site third-party inspectors provide detailed condition reports for every vehicle and property listed.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="px-6 max-w-7xl mx-auto sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unrivaled Security for Significant Transactions
          </h2>
          <p className="text-emerald-50 text-lg max-w-2xl mx-auto">
            TrustMarket bridges the gap between digital discovery and secure
            acquisition with a multi-layered verification framework.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#004e27]/10 border border-[#004e27]/20 rounded-2xl p-8 backdrop-blur-sm hover:bg-[#004e27]/20 transition-colors duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#004e27]/20 rounded-xl">
                    <Icon className="w-7 h-7 text-emerald-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-emerald-50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
