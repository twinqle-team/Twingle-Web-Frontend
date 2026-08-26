import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Camera, Trash2, Loader2, ChevronDown } from "lucide-react";
import { useUserProfile } from "../../hooks/useFetch";
import { useAppDispatch } from "../../redux/hooks";
import { updateProfile, updateAvatar } from "../../redux/slices/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { startPhoneVerification, confirmPhoneVerification } from "../../utils/user/userProfile";
import { countries, getEmojiFlag, TCountryCode } from "countries-list";
import "react-toastify/dist/ReactToastify.css";

// Format countries with phone codes and flags from countries-list
const COUNTRY_CODES = Object.entries(countries)
  .map(([isoCode, countryData]: [string, any]) => ({
    code: countryData.phone && countryData.phone.length > 0 ? `+${countryData.phone[0]}` : "",
    name: countryData.name,
    flag: getEmojiFlag(isoCode as TCountryCode),
    isoCode: isoCode,
  }))
  .filter((country: { code: string; name: string; flag: string; isoCode: string }) => country.code !== "")
  .sort((a: { code: string; name: string; flag: string; isoCode: string }, b: { code: string; name: string; flag: string; isoCode: string }) => a.name.localeCompare(b.name));

const ProfilePage: React.FC = () => {
  const { userProfile, isLoading } = useUserProfile();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fullName, setFullName] = useState(userProfile?.name || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<Record<string, string>>({});
  const [showPhoneVerificationModal, setShowPhoneVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState<"phone" | "code">("phone");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRY_CODES.find((c: { code: string; name: string; flag: string; isoCode: string }) => c.isoCode === "GH") || COUNTRY_CODES[0]
  );
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.avatar?.url || null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [_tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);

  // Update form fields when userProfile data changes
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.name || "");
      setEmail(userProfile.email || "");
      setPhone(userProfile.phone || "");
      setAvatarUrl(userProfile.avatar.url || null);
    }
  }, [userProfile]);

  const handleEditClick = (fieldName: string, currentValue: string) => {
    if (fieldName === "phoneNumber") {
      setShowPhoneVerificationModal(true);
      setVerificationStep("phone");
      setTempPhoneNumber(phone);
    } else {
      setEditingField(fieldName);
      setOriginalValues({ ...originalValues, [fieldName]: currentValue });
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

  const handlePhoneVerification = async () => {
    if (!tempPhoneNumber || tempPhoneNumber.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSendingCode(true);
    try {
      const fullPhoneNumber = `${selectedCountry.code}${tempPhoneNumber}`;
      await startPhoneVerification(fullPhoneNumber);
      toast.success("Verification code sent successfully");
      setVerificationStep("code");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleCodeVerification = async () => {
    if (!inputCode || inputCode.length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    setIsVerifyingCode(true);
    try {
      await confirmPhoneVerification(inputCode);
      const fullPhoneNumber = `${selectedCountry.code} ${tempPhoneNumber}`;
      setPhone(fullPhoneNumber);
      
      // Update phone number in Redux store
      await dispatch(updateProfile({ phone: fullPhoneNumber })).unwrap();
      
      setShowPhoneVerificationModal(false);
      setEditingField(null);
      setVerificationStep("phone");
      setInputCode("");
      toast.success("Phone number verified and updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const closePhoneModal = () => {
    setShowPhoneVerificationModal(false);
    setVerificationStep("phone");
    setInputCode("");
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setIsUploadingAvatar(true);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setTempAvatarUrl(previewUrl);
        setAvatarUrl(previewUrl);
      };
      reader.readAsDataURL(file);
      
      try {
        // Upload file to server
        await dispatch(updateAvatar({ file })).unwrap();
        toast.success('Avatar uploaded successfully');
        setTempAvatarUrl(null);
      } catch (error: any) {
        // Revert to original avatar on failure
        setAvatarUrl(userProfile?.avatarUrl || null);
        setTempAvatarUrl(null);
        toast.error(error || 'Failed to upload avatar');
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleAvatarDelete = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Avatar delete functionality needs backend support');
  };

  const userInitial = fullName.charAt(0).toUpperCase();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            {avatarUrl ? (
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="object-cover w-20 h-20 rounded-full sm:w-24 sm:h-24 border-2 border-[#33a078]"
                />
                {isUploadingAvatar && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-20 h-20 rounded-full sm:w-24 sm:h-24 border-2 border-[#33a078] bg-[#33a078] text-white font-semibold text-2xl sm:text-3xl">
                {userInitial}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={isUploadingAvatar}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 transition-colors border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Upload avatar"
              disabled={isUploadingAvatar}
            >
              {isUploadingAvatar ? (
                <Loader2 size={18} className="text-gray-600 animate-spin" />
              ) : (
                <Camera size={18} className="text-gray-600" />
              )}
            </button>
            {avatarUrl && (
              <button
                onClick={handleAvatarDelete}
                className="p-2 transition-colors border border-red-300 rounded-full hover:bg-red-50"
                title="Remove avatar"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            )}
          </div>
        </div>

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
              disabled={editingField !== "fullName" || isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            {isLoading && (
              <div className="absolute right-10 -translate-y-1/2 top-1/2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#004e27] rounded-full animate-spin"></div>
              </div>
            )}
            {!isLoading && (
              <button 
                className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                onClick={() => handleEditClick("fullName", fullName)}
              >
                <Edit3 size={16} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Email Address Field */}
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
              disabled={editingField !== "email" || isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            {isLoading && (
              <div className="absolute right-10 -translate-y-1/2 top-1/2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#004e27] rounded-full animate-spin"></div>
              </div>
            )}
            {!isLoading && (
              <button 
                className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                onClick={() => handleEditClick("email", email)}
              >
                <Edit3 size={16} className="text-gray-600" />
              </button>
            )}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phoneNumber", phone)}
              placeholder="Enter phone number"
              disabled={editingField !== "phoneNumber" || isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            />
            {isLoading && (
              <div className="absolute right-10 -translate-y-1/2 top-1/2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#004e27] rounded-full animate-spin"></div>
              </div>
            )}
            {!isLoading && (
              <button 
                className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                onClick={() => handleEditClick("phoneNumber", phone)}
              >
                <Edit3 size={16} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Update Profile Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={async () => {
            setIsUpdatingProfile(true);
            try {
              // Build payload with only non-empty fields
              const payload: any = {};
              if (fullName && fullName !== userProfile?.name) {
                payload.name = fullName;
              }
              if (email && email !== userProfile?.email) {
                payload.email = email;
              }
              // Only dispatch if there are changes
              if (Object.keys(payload).length > 0) {
                await dispatch(updateProfile(payload)).unwrap();
                toast.success('Profile updated successfully');
                setEditingField(null); // Disable all fields after successful update
              } else {
                toast.info('No changes to update');
              }
            } catch (error: any) {
              toast.error(error || 'Failed to update profile');
              // Revert to original values on failure
              setFullName(userProfile?.name || "");
              setEmail(userProfile?.email || "");
            } finally {
              setIsUpdatingProfile(false);
            }
          }}
          disabled={isUpdatingProfile}
          className="px-6 py-2.5 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isUpdatingProfile ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update profile'
          )}
        </motion.button>
      </motion.div>

      {/* Change Password */}
      <motion.div
// ... (rest of the code remains the same)
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
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all min-w-[120px]"
                      >
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {COUNTRY_CODES.map((country: { code: string; name: string; flag: string; isoCode: string }) => (
                            <button
                              key={country.isoCode}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowCountryDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="font-medium">{country.code}</span>
                              <span className="ml-2 text-gray-600">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      value={tempPhoneNumber}
                      onChange={(e) => setTempPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="800 000 0000"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004e27] focus:ring-2 focus:ring-[#004e27]/20 transition-all bg-white"
                    />
                  </div>
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
                    disabled={isSendingCode}
                    className="flex-1 px-4 py-2 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSendingCode ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Code"
                    )}
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
                  Enter the verification code sent to {selectedCountry.code} {tempPhoneNumber}
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
                    disabled={isVerifyingCode}
                    className="flex-1 px-4 py-2 bg-[#004e27] text-white rounded-lg font-medium hover:bg-[#003d1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isVerifyingCode ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
    </>
  );
};

export default ProfilePage;
