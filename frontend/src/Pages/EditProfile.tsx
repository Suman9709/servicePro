
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowLeftIcon,
  FloppyDiskIcon,
} from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { user, editProfile } = useAuth();
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
      setLoading(true);

      await editProfile({
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
    <div className="min-h-screen w-full bg-[#f5f7fb] text-gray-900">

      {/* ================= TOP BAR ================= */}

      <div className="w-full border-b border-gray-200 bg-white">

        <div className="w-full px-6 lg:px-10 py-4">

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
          >
            <ArrowLeftIcon size={18} />
            Back to Profile
          </button>

        </div>

      </div>


      {/* ================= PAGE ================= */}

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Heading */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information and account details.
          </p>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================================================= */}
          {/* LEFT PROFILE CARD */}
          {/* ================================================= */}

          <div className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

              {/* Blue Header */}

              <div className="h-28 bg-[#093760] relative">

                <div className="absolute -bottom-10 left-6">

                  <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md">

                    <div className="w-full h-full rounded-xl bg-blue-50 flex items-center justify-center">

                      <UserCircleIcon
                        size={58}
                        weight="fill"
                        className="text-blue-600"
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* Profile Info */}

              <div className="px-6 pt-14 pb-6">

                <h2 className="text-xl font-bold text-gray-900">
                  {user?.first_name || user?.username || "User"}
                  {user?.last_name && ` ${user.last_name}`}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {user?.email}
                </p>


                <div className="mt-5">

                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold capitalize">
                    {user?.role}
                  </span>

                </div>


                <div className="mt-6 pt-5 border-t border-gray-100">

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Account
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Update your information using the form.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT EDIT FORM */}
          {/* ================================================= */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

              {/* Form Header */}

              <div className="px-6 sm:px-8 py-6 border-b border-gray-200">

                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Keep your account information up to date.
                </p>

              </div>


              {/* Form Body */}

              <div className="px-6 sm:px-8 py-7 space-y-7">

                {/* ========================================= */}
                {/* BASIC INFORMATION */}
                {/* ========================================= */}

                <div>

                  <h3 className="text-sm font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 mb-5">
                    Your basic account details.
                  </p>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* First Name */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>

                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) =>
                          setFirstName(e.target.value)
                        }
                        className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter first name"
                      />

                    </div>


                    {/* Last Name */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>

                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) =>
                          setLastName(e.target.value)
                        }
                        className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter last name"
                      />

                    </div>


                    {/* Username */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>

                      <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value)
                        }
                        className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter username"
                      />

                    </div>


                    {/* Email */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter email"
                      />

                    </div>

                  </div>

                </div>


                {/* ========================================= */}
                {/* CONTACT INFORMATION */}
                {/* ========================================= */}

                <div className="pt-6 border-t border-gray-100">

                  <h3 className="text-sm font-semibold text-gray-900">
                    Contact Information
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 mb-5">
                    How ServicePro can contact you.
                  </p>


                  {/* Phone */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value)
                      }
                      className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter phone number"
                    />

                  </div>


                  {/* Address */}

                  <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>

                    <textarea
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      className="textarea textarea-bordered w-full min-h-28 bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your address"
                    />

                  </div>

                </div>

              </div>


              {/* ============================================= */}
              {/* ACTION BAR */}
              {/* ============================================= */}

              <div className="px-6 sm:px-8 py-5 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

                <p className="text-xs text-gray-500">
                  Your changes will be saved to your account.
                </p>


                <div className="flex items-center justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    disabled={loading}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>


                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={loading}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6"
                  >

                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FloppyDiskIcon size={18} />
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

