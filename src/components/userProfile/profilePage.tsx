import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";

const ProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<Record<string, string>>({});
  const [showPhoneVerificationModal, setShowPhoneVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState<"phone" | "code">("phone");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");

  const handleEditClick = (fieldName: string, currentValue: string) => {
    if (fieldName === "phoneNumber") {
      setShowPhoneVerificationModal(true);
      setVerificationStep("phone");
      setTempPhoneNumber(phoneNumber);
    } else {
      setOriginalValues({ ...originalValues, [fieldName]: currentValue });
      setEditingField(fieldName);
    }
  };

  const handleBlur = (fieldName: string, currentValue: string) => {
    const originalValue = originalValues[fieldName];
    // Only disable if the value hasn't changed
    if (currentValue === originalValue) {
      setEditingField(null);
    }
    // If value changed, keep the field enabled so user can save
  };

  const handlePhoneVerification = () => {
    // Simulate sending SMS code
    alert(`Verification code sent to ${tempPhoneNumber}`);
    setVerificationStep("code");
  };

  const handleCodeVerification = () => {
    // Simulate code verification
    if (inputCode === "123456") {
      setPhoneNumber(tempPhoneNumber);
      setShowPhoneVerificationModal(false);
      setEditingField("phoneNumber");
      setVerificationStep("phone");
      setInputCode("");
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid verification code. Use 123456 for demo.");
    }
  };

  const closePhoneModal = () => {
    setShowPhoneVerificationModal(false);
    setVerificationStep("phone");
    setInputCode("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* My Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Your Profile</h1>
        {/* <p className="text-gray-600">Manage your charity campaigns and account settings.</p> */}
      </motion.div>

      {/* Edit Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8"
      >
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Edit Personal Information
        </h2>

        {/* Avatar Section */}
        {/* <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              alt="Profile"
              className="object-cover w-20 h-20 rounded-full sm:w-24 sm:h-24"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 transition-colors border border-gray-300 rounded-full hover:bg-gray-50">
              <Camera size={18} className="text-gray-600" />
            </button>
            <button className="p-2 transition-colors border border-red-300 rounded-full hover:bg-red-50">
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div> */}

        {/* Full Name Field */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur("fullName", fullName)}
              disabled={editingField !== "fullName"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            <button 
              className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
              onClick={() => handleEditClick("fullName", fullName)}
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email", email)}
              disabled={editingField !== "email"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            <button 
              className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
              onClick={() => handleEditClick("email", email)}
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => handleBlur("phoneNumber", phoneNumber)}
              placeholder="+234 800 000 0000"
              disabled={editingField !== "phoneNumber"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            <button 
              className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
              onClick={() => handleEditClick("phoneNumber", phoneNumber)}
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">
        
          </p>
        </div>

        {/* Address Field */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => handleBlur("address", address)}
              placeholder="Enter your delivery address"
              disabled={editingField !== "address"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            <button 
              className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
              onClick={() => handleEditClick("address", address)}
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Update Profile Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2.5 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors"
        >
          Update profile
        </motion.button>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8"
      >
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Change Password
        </h2>

        <div className="max-w-2xl space-y-4">
          {/* Current Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
              >
                {showPasswords ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 "
              >
                {showPasswords ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="mb-2 text-sm font-medium text-gray-700">
              * Password requirements:
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• At least 8 characters</li>
              <li>• At least 1 lowercase letter</li>
              <li>• At least 1 uppercase letter</li>
              <li>• At least 1 number</li>
            </ul>
          </div>

          {/* Change Password Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors"
          >
            Change password
          </motion.button>
        </div>
      </motion.div>

      {/* Phone Verification Modal */}
      {showPhoneVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
          >
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              {verificationStep === "phone" ? "Verify Phone Number" : "Enter Verification Code"}
            </h3>
            
            {verificationStep === "phone" ? (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={tempPhoneNumber}
                    onChange={(e) => setTempPhoneNumber(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white"
                  />
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  We will send you a verification code via SMS to confirm your phone number.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closePhoneModal}
                    className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePhoneVerification}
                    className="flex-1 px-4 py-2 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors"
                  >
                    Send Code
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white"
                  />
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  Enter the verification code sent to {tempPhoneNumber}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closePhoneModal}
                    className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCodeVerification}
                    className="flex-1 px-4 py-2 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;