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
        className="w-full max-w-5xl p-6 bg-white border border-gray-200 shadow-xl rounded-3xl sm:p-8 lg:p-10"
      >
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Choose your account
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            How do you want to join Twingle?
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-sm text-gray-600 sm:text-base">
            Select the option that best matches your needs and we’ll take you to
            the right sign-up form.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 border border-gray-200 shadow-sm rounded-2xl bg-slate-50"
          >
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full text-brand bg-brand-100">
              <UserRound size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Register as a User
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Perfect for buyers, renters, or anyone looking to explore
              listings, save favorites, and connect with properties.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-3 mt-6 text-sm font-semibold text-white transition-colors rounded-lg bg-brand hover:bg-brand-700"
            >
              Continue as a user
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 border border-gray-200 shadow-sm rounded-2xl bg-slate-50"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand-100 text-brand">
              <Building2 size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Register as a Seller or Real-Estate Agent
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Ideal for property owners, agents, and service providers who want
              to list properties and manage their business profile.
            </p>
            <Link
              to="/vendor-signup"
              className="inline-flex items-center justify-center px-5 py-3 mt-6 text-sm font-semibold transition-colors border rounded-lg border-brand text-brand hover:bg-brand-50"
            >
              Continue as a seller
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col pt-6 mt-8 text-lg text-gray-600 border-t border-gray-200 sm:flex-row sm:items-center sm:justify-center">
          <Link
            to="/"
            className="font-bold text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="inline-block w-6 h-6 mb-1 mr-2" />
            Go Back To Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
