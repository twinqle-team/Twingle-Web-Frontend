import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleSlider from "../../../lib/Sliding";

const OTP_LENGTH = 6;

export default function Verify() {
  const location = useLocation();
//   const navigate = useNavigate();
  const email = (location.state as { email?: string } | null)?.email ?? "";
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
    //   navigate("/vendor-login");
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
    <div className="flex min-h-screen overflow-x-hidden p-0">
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
        className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 md:w-1/2 md:px-8 lg:px-10"
      >
        <img
          src="src/assets/Container.png"
          alt="Twingle logo"
          className="mb-4 h-14 w-auto sm:h-16"
        />

        <div className="flex w-full max-w-[600px] flex-col items-stretch gap-5 px-0 sm:gap-6">
          <motion.div
            variants={itemVariants}
            className="rounded-[12px] border border-gray-200 bg-slate-50 px-5 py-4 text-center"
          >
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-[#004e27]/10 p-3 text-[#004e27]">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
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
            <div className="flex items-center justify-between gap-2 sm:gap-3">
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
                  className="h-12 w-12 rounded-[8px] border border-gray-300 text-center text-lg font-semibold text-gray-700 outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/10 sm:h-14 sm:w-14 bg-white"
                />
              ))}
            </div>

            <Link to="/new">
            <motion.button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
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
              <ArrowLeft className="h-4 w-4" />
              Back to reset password
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
