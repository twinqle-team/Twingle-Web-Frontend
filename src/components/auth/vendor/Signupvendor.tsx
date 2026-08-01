import { useState } from "react";
import { motion } from "framer-motion";
import { IoStorefrontOutline } from "react-icons/io5";
import { Eye, EyeOff, Mail, Lock, HatGlasses, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleSlider from "../../../lib/Sliding";

export default function Signupvendor() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agentType: "",
    country: "", // Added for country selection
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    // API call would go here

    setTimeout(() => setIsLoading(false), 2000);
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="flex min-h-screen p-0 overflow-x-hidden">
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:h-screen md:w-1/2"
      >
        <SimpleSlider />
      </motion.div>

      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 bg-white sm:px-6 md:w-1/2 md:px-8 lg:px-10"
      >
        {/* <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="w-auto mb-4 h-14 sm:h-16"
        /> */}

        <h1 className="mb-2 text-2xl font-bold">
          Welcome to <span className="text-[#004e27]">Twingle!</span>
        </h1>
        <p className="mb-4 text-gray-600">
          We’re excited to have you onboard—start selling and growing your
          business with us today!
        </p>
        <br />
        {/* <br /> */}

        <form
          onSubmit={handleSignup}
          className="flex w-full max-w-[600px] flex-col items-stretch gap-5 px-0 sm:gap-6"
        >
                {/* CompanyName */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <IoStorefrontOutline  className="text-gray-400" />
            <input
              type="text"
              name="CompanyName"
              placeholder="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />

          </div>
          {/* Email */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <Mail className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />
          </div>

          {/*  Select Option for Agent Type */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <HatGlasses className="text-gray-400" />
            <select
              name="agentType"
              value={formData.agentType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, agentType: e.target.value }))
              }
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Agent Type
              </option>
              <option value="property agent">Property Agent</option>
              <option value="auto agent">Auto Agent</option>
              <option value="both">Become Both</option>
            </select>
          </div>


          {/* Country Select */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <Globe className="text-gray-400" />
            <select
              name="country"
              value={formData.country}
              onChange={(e) => 
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 focus:outline-none"
              required
            >
              <option value="" disabled>Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="Australia">Australia</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <Lock className="text-gray-400" />
            <div className="flex h-full w-full items-center gap-3 rounded-[5px] border border-gray-400 px-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none"
                required
              />
              {showPassword ? (
                <EyeOff
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* confrim Password */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <Lock className="text-gray-400" />
            <div className="flex h-full w-full items-center gap-3 rounded-[5px] border border-gray-400 px-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-full text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none"
                required
              />
              {showConfirmPassword ? (
                <EyeOff
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Eye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex w-full items-start gap-3 rounded-[5px] border border-gray-200 bg-slate-50 px-4 py-3"
          >
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-[#004e27]"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-[#004e27] hover:text-[#004e27]/80"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-[#004e27] hover:text-[#004e27]/80"
              >
                Privacy Policy
              </a>
            </label>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading || !agreeToTerms}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#004e27] py-3.5 font-semibold text-white transition-all hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                />
                Creating account...
              </>
            ) : (
              "Create my account"
            )}
          </motion.button>
        </form>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
        >
          <Link
            to="/"
            className="flex h-[50px] w-full items-center justify-center rounded-lg border border-gray-300 bg-transparent px-5 text-center text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/vendor-login"
              className="font-semibold text-teal-500 transition-colors hover:text-teal-600"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Want a customer account instead?{" "}
            <Link
              to="/signup"
              className="font-semibold text-teal-500 transition-colors hover:text-teal-600"
            >
              User signup
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}