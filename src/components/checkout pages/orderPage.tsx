import React from "react";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  ShieldCheck,
  Image as ImageIcon,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 transition-colors"
          onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Listing
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Asset Details & Payment */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Asset Details Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="w-full sm:w-64 h-48 sm:h-auto bg-emerald-100 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-emerald-300">
                    <ImageIcon className="w-16 h-16 text-emerald-500" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                      2024 Ferrari SF90 Stradale
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3">
                      Asset ID: #FX-992-A
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs sm:text-sm font-medium mb-4">
                      <CheckCircle size={14} />
                      Verified Authenticity
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Condition</p>
                        <p className="font-medium text-gray-900">
                          Pristine / Collector
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Location</p>
                        <p className="font-medium text-gray-900">
                          Monaco Secure Storage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Select Payment Method
                </h3>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Paystack Option */}
                  <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-900 bg-white cursor-pointer transition-colors flex-1">
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        checked
                        readOnly
                        className="sr-only"
                      />
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-900"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="sm:w-[18px] sm:h-[18px] text-gray-700 flex-shrink-0" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          Paystack (Card)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                        Secure institutional card payment.
                      </p>
                    </div>
                  </label>

                  {/* Mobile Money Option */}
                  <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-300 bg-white cursor-pointer hover:border-gray-400 transition-colors flex-1">
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <input
                        type="radio"
                        name="payment"
                        readOnly
                        className="sr-only"
                      />
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-300"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="sm:w-[18px] sm:h-[18px] text-gray-700 flex-shrink-0" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          Mobile Money
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                        Regional fast transfers.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Card Form */}
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700 bg-emerald-100 p-2 sm:p-3 border border-purple-100">
                    <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                    <span className="font-medium">Verified by Paystack</span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      defaultValue="JOHN DOE"
                      className="bg-white border-gray-300 font-mono text-xs sm:text-sm rounded-none h-10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        defaultValue="0000 0000 0000 0000"
                        className="bg-white border-gray-300 font-mono text-xs sm:text-sm rounded-none h-10 pr-10"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        className="bg-white border-gray-300 font-mono text-xs sm:text-sm rounded-none h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                        CVV
                      </label>
                      <Input
                        type="text"
                        placeholder="***"
                        className="bg-white border-gray-300 font-mono text-xs sm:text-sm rounded-none h-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Agreed Purchase Price</span>
                    <span className="font-medium text-gray-900">
                      $580,000.00
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">
                      Platform Concierge Fee
                    </span>
                    <span className="font-medium text-gray-900">
                      $12,500.00
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Estimated Taxes</span>
                    <span className="font-medium text-gray-900">
                      $22,500.00
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      Total Amount Due
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      $585,000.00
                    </span>
                  </div>
                </div>

                <Button className="w-full h-10 sm:h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Lock size={18} />
                  Pay Securely
                </Button>

                {/* Institutional Escrow */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-lg border border-emerald-100 flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                        Institutional Escrow
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Funds are held in a secure, audited escrow account. They
                        will only be released upon formal transfer of the asset
                        title.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    <span>Bank-Grade Encryption</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock size={14} />
                    <span>Secured by Escrow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
