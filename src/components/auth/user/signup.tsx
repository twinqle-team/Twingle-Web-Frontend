import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  signupSchema,
  type SignupFormData,
} from "../../../lib/validationSchemas";
import Sliding from "../../../lib/Sliding";
import { useAppDispatch } from "../../../redux/hooks";
import { registerUser } from "../../../redux/slices/userSlice";

// Google Icon Component
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.03 2.53-2.16 3.31v2.77h3.49c2.04-1.88 3.24-4.64 3.24-7.89z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.49-2.77c-.98.66-2.23 1.06-3.79 1.06-2.91 0-5.37-1.96-6.25-4.63H2.18v2.84C3.99 20.53 7.72 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.75 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.72-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.64 0 3.11.56 4.27 1.67l3.2-3.2C17.45 2.09 14.97 1 12 1 7.72 1 3.99 3.47 2.18 7.07l3.57 2.84c.88-2.67 3.34-4.63 6.25-4.63z"
      fill="#EA4335"
    />
  </svg>
);

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

      const resultAction = await dispatch(
        registerUser({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`
            .replace(/\s+/g, " ")
            .trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: "buyer",
        }),
      );

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload.message || "Account created successfully",
        );
        navigate("/verify-otp", {
          state: { email: formData.email.trim() },
        });
        return;
      }

      const message =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "Failed to create account";

      toast.error(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    } finally {
      setIsLoading(false);
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
    <div className="flex w-full min-h-screen p-0 overflow-x-hidden bg-white">
      {/* Left Side - Sliding Images */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:h-screen md:w-1/2"
      >
        <Sliding />
      </motion.div>

      {/* Right Side - Signup Form */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-start flex-1 min-h-screen px-4 py-8 overflow-y-auto bg-white sm:px-6 md:px-8 lg:px-10"
      >
        {/* <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="w-auto mb-4 h-14 sm:h-16"
        /> */}
        <h1 className="mb-2 text-2xl font-bold">
          Welcome to <span className="text-[#004e27]">Twingle!</span>
        </h1>
        <p className="mb-4 text-sm text-center text-gray-600 sm:text-base">
          We're excited to have you onboard—start buying with us today!
        </p>

        <form
          onSubmit={handleSignup}
          className="flex w-full max-w-[620px] flex-col items-stretch gap-4 px-0 sm:gap-5"
        >
          {/* First Name and Last Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`h-full w-full rounded-[5px] border bg-transparent px-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:px-3 ${
                    errors.firstName ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              {errors.firstName && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                  <AlertCircle size={16} />
                  {errors.firstName}
                </div>
              )}
            </div>
            <div>
              <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`h-full w-full rounded-[5px] border bg-transparent px-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:px-3 ${
                    errors.lastName ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              {errors.lastName && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                  <AlertCircle size={16} />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`h-full w-full rounded-[5px] border bg-transparent px-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:px-3 ${
                  errors.email ? "border-red-500" : "border-gray-400"
                }`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <div
                className={`flex h-full w-full items-center gap-3 rounded-[5px] border px-2.5 sm:px-3 ${
                  errors.password ? "border-red-500" : "border-gray-400"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-full text-sm text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none"
                />
                {showPassword ? (
                  <EyeOff
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                <AlertCircle size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <div
                className={`flex h-full w-full items-center gap-3 rounded-[5px] border px-2.5 sm:px-3 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-400"
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-full text-sm text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none"
                />
                {showConfirmPassword ? (
                  <EyeOff
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <Eye
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                <AlertCircle size={16} />
                {errors.confirmPassword}
              </div>
            )}
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
          {errors.agreeToTerms && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle size={16} />
              {errors.agreeToTerms}
            </div>
          )}

          {/* Google Sign Up Button */}
          <motion.button
            variants={itemVariants}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full gap-3 py-2.5 font-semibold text-gray-700 transition-colors bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 sm:py-3"
          >
            <GoogleIcon />
            Sign up with Google
          </motion.button>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading || !agreeToTerms}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#004e27] py-3 font-semibold text-white transition-colors hover:bg-[#004e27]/90 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5"
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
          className="mt-4 flex w-full max-w-[620px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
        >
          <Link
            to="/"
            className="flex h-[48px] w-full items-center justify-center rounded-[5px] border border-gray-300 bg-transparent px-5 text-center text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 sm:h-[50px]"
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
