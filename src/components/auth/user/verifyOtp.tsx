import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import SimpleSlider from "../../../lib/Sliding";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../../../lib/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resendOtp, verifyOtp } from "../../../redux/slices/userSlice";

const OTP_LENGTH = 6;

export default function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const email = (location.state as { email?: string } | null)?.email ?? "";
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/\d*/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value.slice(-1);
    setOtp(nextOtp);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousOtp = [...otp];
      previousOtp[index - 1] = "";
      setOtp(previousOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const nextOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const otpString = otp.join("");
      const formData: VerifyOtpFormData = { otp: otpString };

      verifyOtpSchema.parse(formData);

      if (!email) {
        setError("Email is required to verify your OTP.");
        return;
      }

      setIsLoading(true);
      const resultAction = await dispatch(
        verifyOtp({
          identifier: email,
          code: otpString,
        }),
      );

      if (verifyOtp.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload.message || "OTP verified successfully",
        );
        navigate("/login");
        return;
      }

      const message =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "OTP verification failed";
      setError(message);
      toast.error(message);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || "Invalid OTP");
        return;
      }

      const message =
        err instanceof Error ? err.message : "OTP verification failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required to resend OTP.");
      return;
    }

    setResending(true);
    try {
      const resultAction = await dispatch(
        resendOtp({
          identifier: email,
          purpose: "email_verify",
        }),
      );

      if (resendOtp.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message || "OTP sent successfully");
        return;
      }

      const message =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "Failed to resend OTP";
      toast.error(message);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to resend OTP";
      toast.error(message);
    } finally {
      setResending(false);
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
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-[#004e27]/10 p-2.5 text-[#004e27] sm:p-3">
                <ShieldCheck className="w-5 h-5 sm:h-6 sm:w-6" />
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Verify Code
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-gray-700">
                {email || "your email"}
              </span>
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-5"
          >
            <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`h-11 w-11 rounded-[8px] border bg-white text-center text-base font-semibold text-gray-700 outline-none focus:ring-2 sm:h-12 sm:w-12 md:h-14 md:w-14 md:text-lg ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-[#004e27] focus:ring-[#004e27]/10"
                  }`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={
                isLoading || status === "loading" || otp.some((digit) => !digit)
              }
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
                  Verifying...
                </>
              ) : (
                "Verify code"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
          >
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending || status === "loading"}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#004e27] transition-colors hover:text-[#004e27]/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#004e27] transition-colors hover:text-[#004e27]/80"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to reset password
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
