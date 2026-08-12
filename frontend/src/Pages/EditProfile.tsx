import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowLeftIcon,
  FloppyDiskIcon,
} from "@phosphor-icons/react";
// import { useAuth } from "../context/AuthContext";
import { useProfile, useUpdateProfile } from "../hooks/useAuth";

const EditProfile = () => {
  // const { user, editProfile } = useAuth();

  const { data: user } = useProfile()
  const editProfileMutation = useUpdateProfile();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phone_number || ""
  );
  const [address, setAddress] = useState(user?.address || "");

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      await editProfileMutation.mutateAsync({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        address,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/50 text-gray-900">
      {/* ================= TOP BAR ================= */}
      <div className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm ">
        <div className="w-full px-6 lg:px-10 py-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-all duration-200"
          >
            <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </button>
        </div>
      </div>

      {/* ================= PAGE ================= */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Page Heading */}
        <div className="mb-8 shadow-sm rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <UserCircleIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                Edit Profile
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your personal information and account details
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Form Header */}
              <div className="px-6 sm:px-8 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50/50 to-white">
                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Keep your account information up to date
                </p>
              </div>

              {/* Form Body */}
              <div className="px-6 sm:px-8 py-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Basic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter first name"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter last name"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter username"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Contact Information
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="textarea textarea-bordered w-full min-h-24 bg-gray-50/50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-y"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-6 sm:px-8 py-4 bg-gray-50/80 border-t border-gray-200 rounded-b-2xl flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-400">
                  Your changes will be saved to your account
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    disabled={loading}
                    className="btn btn-ghost btn-sm hover:bg-gray-100 transition-all duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={loading}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-5 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70"
                  >
                    {editProfileMutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FloppyDiskIcon size={17} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default EditProfile;