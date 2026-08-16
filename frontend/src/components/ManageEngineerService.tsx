import {
    CheckCircleIcon,
    ClockIcon,
    WrenchIcon,
    XCircleIcon,
} from "@phosphor-icons/react";

import {
    useGetEngineerServiceRequest,
    useUpdateServiceRequestStatus,
} from "../hooks/useEngineer";

import type { CustomerRequestResponse } from "../services/engineerService";


const ManageEngineerService = () => {

    const {
        data: engineerRequests,
        isLoading,
        isError,
    } = useGetEngineerServiceRequest();

    const updateStatusMutation =
        useUpdateServiceRequestStatus();


    const handleStatusChange = async (
        id: number,
        status: CustomerRequestResponse["status"]
    ) => {

        try {
            await updateStatusMutation.mutateAsync({
                id,
                status,
            });

        } catch (error) {
            console.error(
                "Error in updating status",
                error
            );
        }
    };


    // =====================================================
    // STATS
    // =====================================================

    const totalRequests =
        engineerRequests?.length ?? 0;

    const pendingRequests =
        engineerRequests?.filter(
            (request) => request.status === "pending"
        ).length ?? 0;

    const acceptedRequests =
        engineerRequests?.filter(
            (request) => request.status === "accepted"
        ).length ?? 0;

    const completedRequests =
        engineerRequests?.filter(
            (request) => request.status === "completed"
        ).length ?? 0;


    // =====================================================
    // LOADING
    // =====================================================

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">

                <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                    <h2 className="font-semibold text-red-700">
                        Failed to load service requests
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        Something went wrong while fetching your assigned requests.
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            My Service Requests
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage service requests assigned to you.
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <WrenchIcon
                            size={20}
                            weight="fill"
                            className="text-primary"
                        />

                        <span>
                            {totalRequests} assigned
                        </span>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Total */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Total Requests
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {totalRequests}
                            </p>

                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

                            <WrenchIcon
                                size={23}
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

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {pendingRequests}
                            </p>

                        </div>

                        <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">

                            <ClockIcon
                                size={23}
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

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {acceptedRequests}
                            </p>

                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

                            <CheckCircleIcon
                                size={23}
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

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {completedRequests}
                            </p>

                        </div>

                        <div className="rounded-lg bg-green-50 p-3 text-green-600">

                            <CheckCircleIcon
                                size={23}
                                weight="fill"
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* REQUEST TABLE */}
            {/* ================================================= */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* TABLE HEADER */}

                <div className="border-b border-gray-200 px-5 py-4">

                    <h2 className="text-lg font-semibold text-gray-900">
                        Assigned Requests
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Update the status of your assigned service requests.
                    </p>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="table w-full">

                        <thead>

                            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">

                                <th className="font-semibold">
                                    Service
                                </th>

                                <th className="font-semibold">
                                    Category
                                </th>

                                <th className="font-semibold">
                                    Customer
                                </th>

                                <th className="font-semibold">
                                    Description
                                </th>

                                <th className="font-semibold">
                                    Status
                                </th>

                                <th className="font-semibold">
                                    Booking Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {engineerRequests?.map((request) => (

                                <tr
                                    key={request.id}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >

                                    {/* SERVICE */}

                                    <td>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                                                <WrenchIcon
                                                    size={18}
                                                    weight="fill"
                                                />

                                            </div>

                                            <div>

                                                <p className="font-semibold text-gray-900">
                                                    {request.service_name}
                                                </p>

                                               

                                            </div>

                                        </div>

                                    </td>


                                    {/* CATEGORY */}

                                    <td>

                                        <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                                            {request.category_name}
                                        </span>

                                    </td>


                                    {/* CUSTOMER */}

                                    <td>

                                        <p className="font-medium text-gray-800">
                                            {request.customer_name}
                                        </p>

                                    </td>


                                    {/* DESCRIPTION */}

                                    <td>

                                        <p
                                            className="max-w-64 truncate text-sm text-gray-500"
                                            title={request.description}
                                        >
                                            {request.description || "No description"}
                                        </p>

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <select
                                            value={request.status}
                                            disabled={
                                                updateStatusMutation.isPending
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    request.id,
                                                    e.target.value as CustomerRequestResponse["status"]
                                                )
                                            }
                                            className={`select select-sm select-bordered w-36 bg-white font-medium ${
                                                request.status === "pending"
                                                    ? "border-yellow-300 text-yellow-700"
                                                    : request.status === "accepted"
                                                        ? "border-blue-300 text-blue-700"
                                                        : request.status === "completed"
                                                            ? "border-green-300 text-green-700"
                                                            : "border-red-300 text-red-700"
                                            }`}
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


                                    {/* DATE */}

                                    <td>

                                        <span className="whitespace-nowrap text-sm text-gray-500">

                                            {new Date(
                                                request.booking_date
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}

                                        </span>

                                    </td>

                                </tr>

                            ))}


                            {/* EMPTY */}

                            {engineerRequests?.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={6}
                                        className="py-16 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">

                                                <WrenchIcon
                                                    size={28}
                                                />

                                            </div>

                                            <p className="mt-4 font-medium text-gray-600">
                                                No service requests assigned
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Assigned service requests will appear here.
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

export default ManageEngineerService;