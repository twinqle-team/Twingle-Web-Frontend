import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleSlider from "../../../lib/Sliding";

const OTP_LENGTH = 6;

export default function Verifyvendor() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state ? (location.state as { email?: string }).email ?? "" : "";
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/\d*/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value.slice(-1);
    setOtp(nextOtp);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/vendor-login");
    }, 1200);
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
        <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="w-auto mb-4 h-14 sm:h-16"
        />

        <div className="flex w-full max-w-[600px] flex-col items-stretch gap-4 px-0 sm:gap-5">
          <motion.div
            variants={itemVariants}
            className="rounded-[12px] border border-gray-200 bg-slate-50 px-5 py-4 text-center"
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
                  className="h-11 w-11 rounded-[8px] border border-gray-300 text-center text-base font-semibold text-gray-700 outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/10 sm:h-12 sm:w-12 md:h-14 md:w-14 md:text-lg bg-white"
                />
              ))}
            </div>

            <Link to="/vendor-login">
            <motion.button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
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
            </Link>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-[600px] flex-col items-center gap-4 border-t border-gray-200 pt-4"
          >
            <Link
              to="/vendor-forgot"
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
