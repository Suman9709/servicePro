import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import {
  ClipboardTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { useGetAllServiceRequest } from "../hooks/useAdmin";




const AdminDashboard = () => {
  const {
    data: serviceRequests,
    isLoading,
    isError,
  } = useGetAllServiceRequest();

  const recentRequests = useMemo(() => {
    if (!serviceRequests) {
      return [];
    }

    return [...serviceRequests]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 5);
  }, [serviceRequests]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const requests = serviceRequests ?? [];

    return {
      total: requests.length,

      pending: requests.filter(
        (request) => request.status === "pending"
      ).length,

      accepted: requests.filter(
        (request) => request.status === "accepted"
      ).length,

      completed: requests.filter(
        (request) => request.status === "completed"
      ).length,

      cancelled: requests.filter(
        (request) => request.status === "cancelled"
      ).length,
    };
  }, [serviceRequests]);

  // =====================================================
  // STATUS CHART
  // =====================================================

  const statusChartData = useMemo(() => {
    return [
      {
        name: "Pending",
        value: stats.pending,
      },
      {
        name: "Accepted",
        value: stats.accepted,
      },
      {
        name: "Completed",
        value: stats.completed,
      },
      {
        name: "Cancelled",
        value: stats.cancelled,
      },
    ].filter((item) => item.value > 0);
  }, [stats]);

  const statusChartOption = useMemo(
    () => ({
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
            borderColor: "#fff",
            borderWidth: 2,
          },

          label: {
            show: false,
          },

          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },

          data: statusChartData,
        },
      ],
    }),
    [statusChartData]
  );

  // =====================================================
  // SERVICE CHART
  // =====================================================

  const serviceChartData = useMemo(() => {
    const requests = serviceRequests ?? [];

    const serviceMap: Record<string, number> = {};

    requests.forEach((request) => {
      const serviceName = request.service_name;

      serviceMap[serviceName] =
        (serviceMap[serviceName] || 0) + 1;
    });

    return Object.entries(serviceMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [serviceRequests]);

  const serviceChartOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },

      grid: {
        left: 30,
        right: 20,
        bottom: 30,
        top: 20,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        data: serviceChartData.map(
          (item) => item.name
        ),

        axisLabel: {
          interval: 0,
          rotate:
            serviceChartData.length > 4
              ? 25
              : 0,
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
          data: serviceChartData.map(
            (item) => item.value
          ),

          barMaxWidth: 45,

          itemStyle: {
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
    }),
    [serviceChartData]
  );

  // =====================================================
  // ENGINEER CHART
  // =====================================================

  const engineerChartData = useMemo(() => {
    const requests = serviceRequests ?? [];

    const engineerMap: Record<string, number> = {};

    requests.forEach((request) => {
      const engineerName =
        request.engineer_name || "Unassigned";

      engineerMap[engineerName] =
        (engineerMap[engineerName] || 0) + 1;
    });

    return Object.entries(engineerMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [serviceRequests]);

  const engineerChartOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },

      grid: {
        left: 30,
        right: 20,
        bottom: 30,
        top: 20,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        data: engineerChartData.map(
          (item) => item.name
        ),

        axisLabel: {
          interval: 0,
          rotate:
            engineerChartData.length > 4
              ? 25
              : 0,
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

          data: engineerChartData.map(
            (item) => item.value
          ),

          barMaxWidth: 45,

          itemStyle: {
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
    }),
    [engineerChartData]
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          Failed to load dashboard data.
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of service requests and operations.
        </p>
      </div>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {/* TOTAL */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Requests
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.total}
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

        {/* PENDING */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.pending}
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

        {/* ACCEPTED */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Accepted
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.accepted}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <CheckCircleIcon
                size={25}
                weight="fill"
              />
            </div>

          </div>
        </div>

        {/* COMPLETED */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.completed}
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

        {/* CANCELLED */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Cancelled
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.cancelled}
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

        {/* STATUS */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Requests by Status
            </h2>

            <p className="text-sm text-gray-500">
              Distribution of service request statuses.
            </p>
          </div>

          <ReactECharts
            option={statusChartOption}
            style={{ height: "350px" }}
          />

        </div>

        {/* SERVICE */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Requests by Service
            </h2>

            <p className="text-sm text-gray-500">
              Number of requests for each service.
            </p>
          </div>

          <ReactECharts
            option={serviceChartOption}
            style={{ height: "350px" }}
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* ENGINEER */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Requests by Engineer
          </h2>

          <p className="text-sm text-gray-500">
            Service requests assigned to each engineer.
          </p>
        </div>

        <ReactECharts
          option={engineerChartOption}
          style={{ height: "350px" }}
        />

      </div>
      {/* ================================================= */}
      {/* RECENT SERVICE REQUESTS */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Recent Service Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest service requests from customers.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="table w-full">

            <thead className="text-gray-600">

              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Engineer</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {recentRequests.map((request) => (

                <tr
                  key={request.id}
                  className="hover:bg-gray-50"
                >

                  {/* CUSTOMER */}

                  <td>
                    <p className="font-medium text-gray-900">
                      {request.customer_name}
                    </p>
                  </td>

                  {/* SERVICE */}

                  <td>
                    <p className="font-medium text-gray-900">
                      {request.service_name}
                    </p>

                    <p className="max-w-60 truncate text-xs text-gray-500">
                      {request.description}
                    </p>
                  </td>

                  {/* ENGINEER */}

                  <td>
                    {request.engineer_name ? (
                      <span className="text-gray-700">
                        {request.engineer_name}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`badge ${request.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : request.status === "accepted"
                            ? "bg-blue-50 text-blue-700"
                            : request.status === "completed"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                        }`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>

                  </td>

                  {/* DATE */}

                  <td>

                    <span className="text-sm text-gray-600">
                      {new Date(
                        request.created_at
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                  </td>

                </tr>

              ))}

              {recentRequests.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No service requests found.
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

export default AdminDashboard;