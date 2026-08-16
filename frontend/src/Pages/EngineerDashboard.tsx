import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";

import { useGetEngineerServiceRequest } from "../hooks/useEngineer";

import {
    WrenchIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClipboardTextIcon,
} from "@phosphor-icons/react";

const EngineerDashboard = () => {

    const {
        data: requests,
        isLoading,
        isError,
    } = useGetEngineerServiceRequest();

    const statusChartRef = useRef<HTMLDivElement>(null);
    const serviceChartRef = useRef<HTMLDivElement>(null);

    // =====================================================
    // STATISTICS
    // =====================================================

    const statistics = useMemo(() => {

        const data = requests ?? [];

        return {
            total: data.length,

            pending: data.filter(
                (request) => request.status === "pending"
            ).length,

            accepted: data.filter(
                (request) => request.status === "accepted"
            ).length,

            completed: data.filter(
                (request) => request.status === "completed"
            ).length,

            cancelled: data.filter(
                (request) => request.status === "cancelled"
            ).length,
        };

    }, [requests]);


    // =====================================================
    // STATUS CHART
    // =====================================================

    useEffect(() => {

        if (!statusChartRef.current) return;

        const chart = echarts.init(statusChartRef.current);

        chart.setOption({

            tooltip: {
                trigger: "item",
            },

            legend: {
                bottom: 0,
                left: "center",
            },

            series: [
                {
                    name: "Requests",
                    type: "pie",
                    radius: ["45%", "70%"],

                    itemStyle: {
                        borderRadius: 6,
                        borderColor: "#ffffff",
                        borderWidth: 2,
                    },

                    label: {
                        show: false,
                    },

                    data: [
                        {
                            value: statistics.pending,
                            name: "Pending",
                        },
                        {
                            value: statistics.accepted,
                            name: "Accepted",
                        },
                        {
                            value: statistics.completed,
                            name: "Completed",
                        },
                        {
                            value: statistics.cancelled,
                            name: "Cancelled",
                        },
                    ],
                },
            ],
        });

        const handleResize = () => {
            chart.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.dispose();
        };

    }, [statistics]);


    // =====================================================
    // SERVICE CHART
    // =====================================================

    const serviceData = useMemo(() => {

        const serviceMap: Record<string, number> = {};

        (requests ?? []).forEach((request) => {

            const serviceName = request.service_name;

            serviceMap[serviceName] =
                (serviceMap[serviceName] ?? 0) + 1;

        });

        return Object.entries(serviceMap).map(
            ([name, count]) => ({
                name,
                count,
            })
        );

    }, [requests]);


    useEffect(() => {

        if (!serviceChartRef.current) return;

        const chart = echarts.init(serviceChartRef.current);

        chart.setOption({

            tooltip: {
                trigger: "axis",
            },

            grid: {
                left: 50,
                right: 20,
                bottom: 60,
                top: 30,
            },

            xAxis: {
                type: "category",

                data: serviceData.map(
                    (service) => service.name
                ),

                axisLabel: {
                    interval: 0,
                    rotate: serviceData.length > 4 ? 25 : 0,
                },
            },

            yAxis: {
                type: "value",

                minInterval: 1,
            },

            series: [
                {
                    name: "Requests",
                    type: "bar",

                    data: serviceData.map(
                        (service) => service.count
                    ),

                    barMaxWidth: 45,

                    itemStyle: {
                        borderRadius: [6, 6, 0, 0],
                    },
                },
            ],
        });

        const handleResize = () => {
            chart.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.dispose();
        };

    }, [serviceData]);


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
                        Failed to load dashboard
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        Unable to fetch your service requests.
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-900">
                    Engineer Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of your assigned service requests.
                </p>

            </div>


            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                {/* Total */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Total Requests
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                {statistics.total}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

                            <ClipboardTextIcon
                                size={25}
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
                                {statistics.pending}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">

                            <ClockIcon
                                size={25}
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
                                {statistics.accepted}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

                            <WrenchIcon
                                size={25}
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
                                {statistics.completed}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-green-50 p-3 text-green-600">

                            <CheckCircleIcon
                                size={25}
                                weight="fill"
                            />

                        </div>

                    </div>

                </div>


                {/* Cancelled */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Cancelled
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                {statistics.cancelled}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-red-50 p-3 text-red-600">

                            <XCircleIcon
                                size={25}
                                weight="fill"
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* CHARTS */}
            {/* ================================================= */}

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* STATUS CHART */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="mb-3">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Request Status
                        </h2>

                        <p className="text-sm text-gray-500">
                            Distribution of your assigned requests.
                        </p>

                    </div>

                    <div
                        ref={statusChartRef}
                        className="h-80 w-full"
                    />

                </div>


                {/* SERVICE CHART */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="mb-3">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Requests by Service
                        </h2>

                        <p className="text-sm text-gray-500">
                            Number of requests assigned for each service.
                        </p>

                    </div>

                    <div
                        ref={serviceChartRef}
                        className="h-80 w-full"
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* RECENT REQUESTS */}
            {/* ================================================= */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-200 p-5">

                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Service Requests
                    </h2>

                    <p className="text-sm text-gray-500">
                        Your latest assigned tasks.
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="table w-full">

                        <thead>

                            <tr className="text-gray-700">

                                <th>Service</th>
                                <th>Category</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Booking Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {(requests ?? [])
                                .slice(0, 5)
                                .map((request) => (

                                    <tr
                                        key={request.id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td>
                                            <span className="font-semibold text-gray-900">
                                                {request.service_name}
                                            </span>
                                        </td>

                                        <td>

                                            <span className="badge border-purple-200 bg-purple-50 text-purple-700">
                                                {request.category_name}
                                            </span>

                                        </td>

                                        <td>

                                            <span className="font-medium text-gray-700">
                                                {request.customer_name}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={`
                                                    badge
                                                    ${
                                                        request.status === "pending"
                                                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                                            : request.status === "accepted"
                                                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                                                : request.status === "completed"
                                                                    ? "border-green-200 bg-green-50 text-green-700"
                                                                    : "border-red-200 bg-red-50 text-red-700"
                                                    }
                                                `}
                                            >
                                                {request.status}
                                            </span>

                                        </td>

                                        <td>

                                            <span className="text-sm text-gray-600">

                                                {new Date(
                                                    request.booking_date
                                                ).toLocaleDateString()}

                                            </span>

                                        </td>

                                    </tr>

                                ))}


                            {requests?.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-12 text-center"
                                    >

                                        <p className="font-medium text-gray-600">
                                            No service requests
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Assigned requests will appear here.
                                        </p>

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

export default EngineerDashboard;