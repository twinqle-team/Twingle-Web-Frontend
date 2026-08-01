import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Sliding from "../../../lib/Sliding";

// Google Icon Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // API call would go here
    setTimeout(() => setIsLoading(false), 2000);
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

      {/* Left Side - Sliding Images */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="hidden h-screen overflow-hidden md:flex md:w-1/2"
      >
        <Sliding />
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 bg-white sm:px-6 md:w-1/2 md:px-8 lg:px-10"
      >
        {/* <img
          src="src/assets/Container.png"
          alt=""
          className="w-auto mb-4 h-14 sm:h-16"
        /> */}

        <h1 className="mb-2 text-2xl font-bold">
          Log in to <span className="text-[#004e27]">Twingle.com</span>
        </h1>
        <p className="mb-6 text-gray-600">
          Enter your valid email address and password to log in to your account.
        </p>
        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-[600px] flex-col items-stretch gap-5 px-0 sm:gap-6"
        >
          <div className="flex h-[50px] w-full items-center gap-3">
            <User className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex h-[50px] w-full items-center gap-3">
            <Lock className="text-gray-400" />
            <div className="flex h-full w-full items-center gap-3 border border-gray-400 rounded-[5px] px-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full text-white bg-transparent placeholder:text-gray-400 focus:outline-none"
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

          {/* Remember Me & Forgot Password */}
          <motion.div
            variants={itemVariants}
            className="flex w-full items-center justify-between gap-4 rounded-[5px] border border-gray-200 bg-slate-50 px-4 py-3"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#004e27] border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Google Sign In Button */}
          <motion.button
            variants={itemVariants}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full gap-3 py-3 font-semibold text-gray-700 transition-colors bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <GoogleIcon />
            Sign in with Google
          </motion.button>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#004e27] py-3 font-semibold text-white transition-colors hover:bg-[#004e27]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                />
                Signing in...
              </>
            ) : (
              "Login to my account"
            )}
          </motion.button>
        </form>
        {/* Bottom Links */}
        <motion.div
          variants={itemVariants}
          className="mt-4 flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
        >
          <Link
            to="/"
            className="flex items-center justify-center  bg-transparent px-5 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 w-full h-[50px] text-center rounded-[5px] border border-gray-300"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              Register
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Want to sell on Twingle?{" "}
            <Link
              to="/vendor-login"
              className="font-semibold text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              Login as a vendor
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}