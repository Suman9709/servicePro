import { Link } from "react-router-dom";
import {
    WrenchIcon,
    ClockIcon,
    CheckCircleIcon,
    PlusIcon,
} from "@phosphor-icons/react";
import { useBookingHistory } from "../hooks/useCustomer";

const CustomerDashboard = () => {

    const {
        data: bookingHistory,
        isLoading,
        isError,
    } = useBookingHistory();

    const bookings = bookingHistory ?? [];

    // ==============================
    // STATS
    // ==============================

    const totalRequests = bookings.length;

    const pendingRequests = bookings.filter(
        (booking) => booking.status === "pending"
    ).length;

    const completedRequests = bookings.filter(
        (booking) => booking.status === "completed"
    ).length;

    // Latest 5 requests
    const recentRequests = [...bookings]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 5);

    // ==============================
    // DATE
    // ==============================

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // ==============================
    // STATUS
    // ==============================

    const getStatusClass = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";

            case "accepted":
                return "bg-blue-50 text-blue-700 border-blue-200";

            case "completed":
                return "bg-green-50 text-green-700 border-green-200";

            case "cancelled":
                return "bg-red-50 text-red-700 border-red-200";

            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    // ==============================
    // LOADING
    // ==============================

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex min-h-100 items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary" />
                </div>
            </div>
        );
    }

    // ==============================
    // ERROR
    // ==============================

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <h2 className="font-semibold text-red-700">
                        Failed to load dashboard
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        Unable to fetch your service requests.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Customer Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your service requests and bookings.
                    </p>
                </div>

                <Link
                    to="/profile/book-service"
                    className="btn btn-primary gap-2"
                >
                    <PlusIcon size={20} weight="bold" />
                    Book a Service
                </Link>

            </div>


            {/* ========================================= */}
            {/* STATS */}
            {/* ========================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

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

                            <p className="mt-1 text-xs text-gray-500">
                                All your service requests
                            </p>
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

                            <p className="mt-1 text-xs text-gray-500">
                                Requests awaiting action
                            </p>
                        </div>

                        <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
                            <ClockIcon
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

                            <p className="mt-1 text-xs text-gray-500">
                                Successfully completed
                            </p>
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


            {/* ========================================= */}
            {/* RECENT REQUESTS */}
            {/* ========================================= */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 p-5">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Service Requests
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your latest service bookings.
                        </p>
                    </div>

                    

                </div>


                {/* Requests */}

                {recentRequests.length > 0 ? (

                    <div className="overflow-x-auto">

                        <table className="table w-full overflow-y-auto">

                            <thead>
                                <tr className="text-gray-600">
                                    <th>Service</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentRequests.map((booking) => (

                                    <tr
                                        key={booking.id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* Service */}

                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                    <WrenchIcon
                                                        size={20}
                                                        weight="fill"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {booking.service_name}
                                                    </p>

                                                    <p className="max-w-50 truncate text-xs text-gray-500">
                                                        {booking.description}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>


                                        {/* Category */}

                                        <td>
                                            <span className="badge border-purple-200 bg-purple-50 text-purple-700">
                                                {booking.category_name}
                                            </span>
                                        </td>


                                        {/* Status */}

                                        <td>
                                            <span
                                                className={`badge border capitalize ${getStatusClass(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>


                                        {/* Date */}

                                        <td>
                                            <span className="text-sm text-gray-600">
                                                {formatDate(
                                                    booking.booking_date
                                                )}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    /* Empty state */

                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                            <WrenchIcon size={28} />
                        </div>

                        <h3 className="mt-4 font-semibold text-gray-800">
                            No service requests yet
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            You haven't booked any services yet.
                            Start by creating your first service request.
                        </p>

                        <Link
                            to="/book-service"
                            className="btn btn-primary mt-5 gap-2"
                        >
                            <PlusIcon size={18} weight="bold" />
                            Book Your First Service
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );
};

export default CustomerDashboard;