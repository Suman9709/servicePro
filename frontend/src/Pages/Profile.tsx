
import {
  PencilSimpleIcon,
  WrenchIcon,

} from "@phosphor-icons/react";

// import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useAuth";

const Profile = () => {
  // const { user } = useAuth();

  const { data: user, isLoading, isError } = useProfile()
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (isError) {
    return <div>Please login.</div>;
  }


  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center pt-4  text-gray-900 rounded-lg">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="w-[95%]  border shadow-sm rounded-2xl border-gray-200">

        <div className="w-full px-6 md:px-6 py-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Account
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                <span className="capitalize">{user?.role}</span> Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your account and view your service activity.
              </p>
            </div>

           {user?.role==='customer' && (
            <div>
              <button className=" w-52 sm:w-52 items-center btn bg-blue-600 hover:bg-blue-700 text-white border-none px-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 ">
                Create New Service Request
              </button>
            </div>
           )}
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="w-full px-2 md:px-8 lg:px-10 py-6">

        <div className="w-full space-y-6">


          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


            {/* Personal Information */}

            <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm">

              <div className="px-6 md:px-4 py-5 border-b border-gray-200">

                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your account and contact information
                </p>

              </div>


              <div className="p-6 md:p-7">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">


                  {/* First Name */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      First Name
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                      {user?.first_name}
                    </p>

                  </div>


                  {/* Last Name */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Last Name
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                      {user?.last_name}
                    </p>

                  </div>


                  {/* Username */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Username
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                      {user?.username}
                    </p>

                  </div>


                  {/* Email */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Email
                    </p>

                    <p className="mt-2 font-medium text-gray-800 break-all">
                      {user?.email}
                    </p>

                  </div>


                  {/* Phone */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Phone Number
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                      {user?.phone_number || "Not provided"}
                    </p>

                  </div>


                  {/* Role */}

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Account Role
                    </p>

                    <p className="mt-2 font-medium text-gray-800 capitalize">
                      {user?.role || "Customer"}
                    </p>

                  </div>


                  {/* Address */}

                  <div className="sm:col-span-2">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Address
                    </p>
                    <p className="mt-2 font-medium text-gray-800">
                      {user?.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Account Card */}

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

              <div className="px-6 py-5 border-b border-gray-200">

                <h2 className="text-lg font-bold text-gray-900">
                  Account
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Account information
                </p>

              </div>
              <div className="p-6 space-y-5">
                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Account Status
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="w-2 h-2 rounded-full bg-green-500" />

                    <span className="text-sm font-semibold text-green-600">
                      Active
                    </span>

                  </div>
                </div>
                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Account Type
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-2 capitalize">
                    {user?.role || "Customer"}
                  </p>

                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Member Since
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-2">
                    August 2026
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">

                  <Link
                    to="/profile/edit-profile"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <PencilSimpleIcon size={17} />
                    Edit Account
                  </Link>
                </div>
              </div>
            </div>
          </div>


          {/* ================================================= */}
          {/* RECENT SERVICE REQUESTS */}
          {/* ================================================= */}

          {user?.role === "customer" && (
            <div id="services" className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

              {/* Header */}

              <div className="px-6 md:px-7 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Service Requests
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Your latest maintenance and service activities
                  </p>
                </div>
              </div>
              {/* Table */}

              <div className="overflow-x-auto">

                <table className="w-full text-sm">

                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 md:px-7 py-4 font-semibold text-gray-500">
                        Service
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-gray-500">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="text-right px-6 md:px-7 py-4 font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 md:px-7 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                            <WrenchIcon
                              size={18}
                              className="text-blue-600"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              Equipment Maintenance
                            </p>

                            <p className="text-xs text-gray-400">
                              Service #SR-001
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Jan 01, 2026
                      </td>
                      <td className="px-6 py-4">

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Completed
                        </span>
                      </td>
                      <td className="px-6 md:px-7 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 md:px-7 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                            <WrenchIcon
                              size={18}
                              className="text-yellow-600"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              AC Repair
                            </p>

                            <p className="text-xs text-gray-400">
                              Service #SR-002
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Feb 14, 2026
                      </td>
                      <td className="px-6 py-4">

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-semibold">

                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />

                          In Progress

                        </span>

                      </td>
                      <td className="px-6 md:px-7 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>


                    {/* Row 3 */}

                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 md:px-7 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                            <WrenchIcon
                              size={18}
                              className="text-purple-600"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              Generator Service
                            </p>
                            <p className="text-xs text-gray-400">
                              Service #SR-003
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Mar 20, 2026
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Scheduled
                        </span>
                      </td>
                      <td className="px-6 md:px-7 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Footer */}

              <div className="px-6 md:px-7 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 3 recent service requests
                </p>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View All Services
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
};
export default Profile;

