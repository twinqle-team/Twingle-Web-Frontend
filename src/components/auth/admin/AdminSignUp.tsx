import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, HatGlasses, User } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleSlider from "../../../lib/Sliding";

export default function AdminSignUp() {
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    Role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        Welcome to the  <span className="text-[#004e27]">Admin Portal!</span>
        </h1>
        <p className="mb-4 text-gray-600">
         Securely access your administrative dashboard to manage and monitor the platform.
        </p>
        <br />
        {/* <br /> */}

        <form
          onSubmit={handleSignup}
          className="flex w-full max-w-[600px] flex-col items-stretch gap-5 px-0 sm:gap-6"
        >
                {/* FullName */}
          <div className="flex h-[50px] w-full items-center gap-3">
            <User  className="text-gray-400" />
            <input
              type="text"
              name="FullName"
              placeholder="Full Name"
              value={formData.FullName}
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
              value={formData.Role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, agentType: e.target.value }))
              }
              className="h-full w-full rounded-[5px] border border-gray-400 bg-transparent px-3 text-gray-700 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a Role
              </option>
              <option value="property agent">Admin</option>
              <option value="auto agent">Customer care</option>
              <option value="both">Super Admin</option>
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

          <Link to="/vendor-verify">
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
                Creating account...
              </>
            ) : (
              "Create my account"
            )}
          </motion.button>
          </Link>
        </form>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/admin-login"
              className="font-semibold text-teal-500 transition-colors hover:text-teal-600"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}