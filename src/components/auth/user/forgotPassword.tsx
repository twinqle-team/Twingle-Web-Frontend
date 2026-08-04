import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import SimpleSlider from "../../../lib/Sliding";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../../lib/validationSchemas";

const LOGIN_EMAIL_STORAGE_KEY = "twingle_login_email";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = window.localStorage.getItem(LOGIN_EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData: ForgotPasswordFormData = { email };

      // Validate form data
      forgotPasswordSchema.parse(formData);

      setIsLoading(true);
      window.localStorage.removeItem(LOGIN_EMAIL_STORAGE_KEY);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/verify-otp", { state: { email: email.trim() } });
      }, 1200);
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
    <div className="flex min-h-screen p-0 overflow-x-hidden bg-white">
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:h-screen md:w-[45%] lg:w-1/2"
      >
        <SimpleSlider />
      </motion.div>

      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 md:w-[55%] md:px-6 lg:w-1/2 lg:px-8 xl:px-10"
      >
        <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="w-auto mb-4 h-14 sm:h-16"
        />

        <div className="flex w-full max-w-[560px] flex-col items-stretch gap-4 px-0 sm:gap-5 md:gap-6">
          <motion.div
            variants={itemVariants}
            className="rounded-[12px] border border-gray-200 bg-slate-50 px-5 py-4 text-center md:px-6"
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send a verification code.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-5"
          >
            <div>
              <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
                <Mail className="w-5 h-5 text-gray-400 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.email;
                        return newErrors;
                      });
                    }
                  }}
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

            <motion.button
              type="submit"
              disabled={isLoading}
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
                  Sending code...
                </>
              ) : (
                "Send verification code"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
