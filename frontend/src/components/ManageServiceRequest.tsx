import {
  WrenchIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,

  UserIcon,
} from "@phosphor-icons/react";

import { useMemo, useState } from "react";
import { useAssignEngineer, useGetAllServiceRequest, useGetEngineers } from "../hooks/useAdmin";


const ManageServiceRequest = () => {

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useGetAllServiceRequest();
  console.log(requests)
  const { data: engineers } = useGetEngineers()
  const assignEngineerMutation = useAssignEngineer()

  // FILTER REQUESTS
 
  const filteredRequests = useMemo(() => {
    if (!requests) {
      return [];
    }

    const searchText = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        request?.customer_name
          .toLowerCase()
          .includes(searchText) ||
        request?.engineer_name
          ?.toLowerCase()
          .includes(searchText) ||
        request?.service_name
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        selectedStatus === "all" ||
        request?.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, selectedStatus]);


  // STATISTICS

  const totalRequests = requests?.length ?? 0;

  const pendingRequests =
    requests?.filter(
      (request) => request?.status === "pending"
    ).length ?? 0;

  const acceptedRequests =
    requests?.filter(
      (request) => request?.status === "accepted"
    ).length ?? 0;

  const completedRequests =
    requests?.filter(
      (request) => request?.status === "completed"
    ).length ?? 0;


  // LOADING

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex min-h-100 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    );
  }

  // ERROR

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Failed to load service requests
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Something went wrong while fetching service requests.
          </p>

          {error instanceof Error && (
            <p className="mt-2 text-xs text-red-500">
              {error.message}
            </p>
          )}
        </div>
      </div>
    );
  }


  // UI

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">


      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-900">
          Manage Service Requests
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage customer service requests.
        </p>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Requests
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {totalRequests}
              </h2>

            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

              <WrenchIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>


        {/* Pending */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {pendingRequests}
              </h2>

            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">

              <ClockIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>


        {/* Accepted */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Accepted
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {acceptedRequests}
              </h2>

            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

              <CheckCircleIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>


        {/* Completed */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {completedRequests}
              </h2>

            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">

              <CheckCircleIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-gray-900">
              Service Requests
            </h2>

            <p className="text-sm text-gray-500">
              View all customer service requests.
            </p>

          </div>


          {/* FILTERS */}

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            {/* SEARCH */}

            <div className="relative w-full sm:w-72">

              <MagnifyingGlassIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search requests..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className=" input input-bordered w-full border-gray-300 bg-white pl-10 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " />

            </div>


            {/* STATUS FILTER */}

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className=" select select-bordered w-full border-gray-300 bg-white text-gray-900 sm:w-48">

              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="accepted">
                Accepted
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>


        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="table w-full">

            <thead className="text-black">

              <tr>

                <th>
                  Customer
                </th>

                <th>
                  Service
                </th>

                <th>
                  Engineer
                </th>

                <th>
                  Description
                </th>

                <th>
                  Status
                </th>
                <th>
                  Booking Date
                </th>
              </tr>
            </thead>
            <tbody>

              {filteredRequests.map((request) => (

                <tr
                  key={request.id}
                  className="hover:bg-gray-50"
                >
                  {/* CUSTOMER */}
                  <td>

                    <div className="flex items-center gap-3">

                      <div className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <UserIcon
                          size={20}
                          weight="fill"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {request?.customer_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* SERVICE */}

                  <td>
                    <div className="flex items-center gap-2">

                      <WrenchIcon
                        size={18}
                        className="text-blue-600"
                        weight="fill"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.service_name}
                        </p>
                      </div>
                    </div>
                  </td>


                  {/* ENGINEER */}
                  <td>
                    <select
                      value={request.engineer ?? ""}
                      onChange={(e) => {
                        const engineerId = Number(e.target.value);

                        if (!engineerId) return;

                        assignEngineerMutation.mutate({
                          id: request.id,
                          engineer: engineerId,
                          status: request.status,
                        });
                      }}
                      className="select select-sm w-40 border-gray-300 bg-white text-gray-900"
                      disabled={assignEngineerMutation.isPending}
                    >
                      <option value="">
                        Select Engineer
                      </option>

                      {engineers?.map((engineer) => (
                        <option
                          key={engineer.id}
                          value={engineer.id}
                        >
                          {engineer.username}
                        </option>
                      ))}
                    </select>
                  </td>


                  {/* DESCRIPTION */}

                  <td>

                    <p className="max-w-64 truncate text-sm text-gray-600">
                      {request.description || "No description"}
                    </p>

                  </td>


                  {/* STATUS */}

                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => {
                        const status = e.target.value;

                        if (!request.engineer) {
                          return;
                        }

                        assignEngineerMutation.mutate({
                          id: request.id,
                          engineer: request.engineer,
                          status,
                        });
                      }}
                      className="select select-sm w-32 border-gray-300 bg-white text-gray-900"
                      disabled={
                        !request.engineer ||
                        assignEngineerMutation.isPending
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="accepted">
                        Accepted
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>


                  {/* BOOKING DATE */}

                  <td>

                    <div>

                      <p className="text-sm font-medium text-gray-900">
                        {new Date(
                          request?.booking_date
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(
                          request?.booking_date
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}


              {/* NO RESULTS */}

              {filteredRequests.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-gray-400
                      ">

                        <WrenchIcon size={28} />

                      </div>

                      <p className="mt-4 font-medium text-gray-600">
                        No service requests found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {search
                          ? "Try searching for another request."
                          : "No service requests available."
                        }
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageServiceRequest;