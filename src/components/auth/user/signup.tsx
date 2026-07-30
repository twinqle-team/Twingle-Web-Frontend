import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import SimpleSlider from "../../../lib/Sliding";
import {
  signupSchema,
  type SignupFormData,
} from "../../../lib/validationSchemas";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const dataToValidate: SignupFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreeToTerms: agreeToTerms,
      };

      // Validate form data
      signupSchema.parse(dataToValidate);

      setIsLoading(true);
      // API call would go here
      setTimeout(() => setIsLoading(false), 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    }
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
    <div className="flex min-h-screen w-full overflow-x-hidden bg-white p-0 md:flex-row">
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:flex-1 h-screen overflow-hidden min-w-0"
      >
        <SimpleSlider />
      </motion.div>

      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex h-screen flex-1 min-w-0 flex-col items-center justify-start bg-white px-4 py-8 sm:px-6 md:px-8 lg:px-10 max-w-full overflow-y-auto"
      >
        {/* <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="mb-4 h-14 w-auto sm:h-16"
        /> */}
        <h1 className="mb-2 text-2xl font-bold">
          Welcome to <span className="text-[#004e27]">Twingle!</span>
        </h1>
        <p className="mb-4 text-gray-600">
          We’re excited to have you onboard—start buying with us today!
        </p>
        <br />
        <form
          onSubmit={handleSignup}
          className="flex w-full max-w-[620px] flex-col items-stretch gap-4 px-0 sm:gap-5 md:gap-6"
        >
          {/* First Name and Last Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex h-[50px] w-full items-center gap-3">
                <User className="text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`h-full w-full rounded-[5px] border bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none ${
                    errors.firstName ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              {errors.firstName && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  {errors.firstName}
                </div>
              )}
            </div>
            <div>
              <div className="flex h-[50px] w-full items-center gap-3">
                <User className="text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`h-full w-full rounded-[5px] border bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none ${
                    errors.lastName ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              {errors.lastName && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <div className="flex h-[50px] w-full items-center gap-3">
              <Mail className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`h-full w-full rounded-[5px] border bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-400"
                }`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex h-[50px] w-full items-center gap-3">
              <Lock className="text-gray-400" />
              <div
                className={`flex h-full w-full items-center gap-3 rounded-[5px] border px-3 ${
                  errors.password ? "border-red-500" : "border-gray-400"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
                {showPassword ? (
                  <EyeOff
                    className="cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="flex h-[50px] w-full items-center gap-3">
              <Lock className="text-gray-400" />
              <div
                className={`flex h-full w-full items-center gap-3 rounded-[5px] border px-3 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-400"
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
                {showConfirmPassword ? (
                  <EyeOff
                    className="cursor-pointer text-gray-400"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer text-gray-400"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <motion.div
            variants={itemVariants}
            className={`flex w-full flex-col gap-3 rounded-[5px] border px-4 py-3 sm:flex-row sm:items-start ${
              errors.agreeToTerms
                ? "border-red-500 bg-red-50"
                : "border-gray-200 bg-slate-50"
            }`}
          >
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => {
                setAgreeToTerms(e.target.checked);
                if (errors.agreeToTerms) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.agreeToTerms;
                    return newErrors;
                  });
                }
              }}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-[#004e27]"
            />
            <label
              htmlFor="terms"
              className="cursor-pointer text-sm text-gray-600"
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
          {errors.agreeToTerms && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle size={16} />
              {errors.agreeToTerms}
            </div>
          )}

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading || !agreeToTerms}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#004e27] py-3 font-semibold text-white transition-colors hover:bg-[#004e27]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
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
          className="mt-4 flex w-full max-w-[620px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
        >
          <Link
            to="/"
            className="flex h-[50px] w-full items-center justify-center rounded-[5px] border border-gray-300 bg-transparent px-5 text-center text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Want to become a vendor?{" "}
            <Link
              to="/vendor-signup"
              className="font-semibold text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              Sign up as a seller
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
