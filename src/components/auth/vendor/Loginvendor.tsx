import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleSlider from "../../../lib/Sliding";

const LOGIN_EMAIL_STORAGE_KEY = "twingle_login_email";

export default function Loginvendor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = window.localStorage.getItem(LOGIN_EMAIL_STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.trim()) {
      window.localStorage.setItem(LOGIN_EMAIL_STORAGE_KEY, value.trim());
    } else {
      window.localStorage.removeItem(LOGIN_EMAIL_STORAGE_KEY);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex min-h-screen overflow-x-hidden p-0">
      {/* LeftSide Branding */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:w-1/2 md:h-screen"
      >
        <SimpleSlider />
      </motion.div>

      {/* RightSide Login Form */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 md:w-1/2 md:px-8 lg:px-10"
      >
        {/* <img
          src="src/assets/Container.png"
          alt=""
          className="mb-4 h-14 w-auto sm:h-16"
        /> */}

        <h1 className="mb-2 text-2xl font-bold">Log in to <span className="text-[#1E8863]">Twingle.com</span></h1>
              <p className="mb-6 text-gray-600">
                Enter your valid email address and password to log in to your
                account.
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
              onChange={(e) => handleEmailChange(e.target.value)}
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 placeholder:text-gray-400 focus:outline-none"
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
                className="w-full h-full text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none"
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
                className="w-4 h-4 text-teal-500 border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/vendor-forgot"
              className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 py-3 font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex h-[50px] w-full items-center justify-center rounded-[5px] border border-gray-300 bg-transparent px-5 text-center text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/vendor-signup"
              className="font-semibold text-teal-500 transition-colors hover:text-teal-600"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
