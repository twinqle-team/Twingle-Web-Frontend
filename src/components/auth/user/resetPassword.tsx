import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import SimpleSlider from "../../../lib/Sliding";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetPassword } from "../../../redux/slices/userSlice";
import Logo from "@/assets/Container.png";

const resetPasswordSchema = z.object({
  code: z.string().min(6, "Code must be 6 digits"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const identifier = (location.state as { identifier?: string } | null)?.identifier ?? "";
  
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const dataToValidate: ResetPasswordFormData = {
        code: formData.code,
        newPassword: formData.newPassword,
      };

      // Validate form data
      resetPasswordSchema.parse(dataToValidate);

      if (!identifier) {
        toast.error("Identifier is required to reset password");
        navigate("/forgot-password");
        return;
      }

      setIsLoading(true);

      const resultAction = await dispatch(
        resetPassword({
          identifier: identifier,
          code: formData.code,
          newPassword: formData.newPassword,
        }),
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload.message || "Password reset successful",
        );
        navigate("/login");
        return;
      }

      const message =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "Failed to reset password";
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
        error instanceof Error ? error.message : "Failed to reset password",
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
          src={Logo}
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
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-gray-700">
                {identifier || "your email"}
              </span>
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-5"
          >
            {/* Code Input */}
            <div>
              <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="code"
                  placeholder="Enter 6-digit code"
                  value={formData.code}
                  onChange={handleChange}
                  maxLength={6}
                  className={`h-full w-full rounded-[5px] border bg-transparent px-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:px-3 ${
                    errors.code ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              {errors.code && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                  <AlertCircle size={16} />
                  {errors.code}
                </div>
              )}
            </div>

            {/* New Password Input */}
            <div>
              <div className="flex h-[48px] w-full items-center gap-2.5 sm:h-[50px] sm:gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div
                  className={`flex h-full w-full items-center gap-3 rounded-[5px] border px-2.5 sm:px-3 ${
                    errors.newPassword ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New password"
                    value={formData.newPassword}
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
              {errors.newPassword && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                  <AlertCircle size={16} />
                  {errors.newPassword}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || status === "loading"}
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
          >
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to forgot password
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
