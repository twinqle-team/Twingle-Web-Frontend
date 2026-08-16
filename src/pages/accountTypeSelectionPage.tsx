import { motion } from "framer-motion";
import { ArrowLeft, Building2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountTypeSelectionPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-slate-50 to-white sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl p-5 bg-white border border-gray-200 shadow-xl rounded-3xl sm:p-8 lg:p-10"
      >
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:mb-3 sm:text-sm sm:tracking-[0.25em]">
            Choose your account
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            How do you want to join Twinqle?

          </h1>
          <p className="max-w-2xl mx-auto mt-2 text-xs text-gray-600 sm:mt-3 sm:text-base">
            Select the option that best matches your needs and we'll take you to
            the right sign-up form.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 border border-gray-200 shadow-sm rounded-2xl bg-slate-50 sm:p-6"
          >
          <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full text-brand bg-brand-100 sm:w-12 sm:h-12 sm:mb-4">
              <UserRound size={20} className="sm:w-6 sm:h-6" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Register as a user

            </h2>
            <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
              Perfect for buyers, renters, or anyone looking to explore
              listings, save favorites, and connect with properties.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-4 py-2.5 mt-5 text-sm font-semibold text-white transition-colors rounded-lg bg-brand hover:bg-brand-700 sm:mt-6 sm:px-5 sm:py-3"
            >
              Continue as a user
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 border border-gray-200 shadow-sm rounded-2xl bg-slate-50 sm:p-6"
          >
            <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-brand-100 text-brand sm:w-12 sm:h-12 sm:mb-4">
              <Building2 size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Register as a Seller or Real-Estate Agent
            </h2>
            <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
              Ideal for property owners, agents, and service providers who want
              to list properties and manage their business profile.
            </p>
            <Link
              to="/vendor-signup"
              className="inline-flex items-center justify-center px-4 py-2.5 mt-5 text-sm font-semibold transition-colors border rounded-lg border-brand text-brand hover:bg-brand-50 sm:mt-6 sm:px-5 sm:py-3"
            >
              Continue as a seller
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col pt-5 mt-6 text-base text-gray-600 border-t border-gray-200 sm:mt-8 sm:pt-6 sm:text-lg sm:items-center">
          <Link
            to="/"
            className="font-bold text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="inline-block w-5 h-5 mb-1 mr-2 sm:w-6 sm:h-6" />
            Go Back To Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
