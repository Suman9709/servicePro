
import { useGetEngineerServiceRequest, useUpdateServiceRequestStatus } from "../hooks/useEngineer"
import type { CustomerRequestResponse } from "../services/engineerService"

const ManageEngineerService = () => {

    const { data: engnineerRequests, isLoading, isError } = useGetEngineerServiceRequest()
    const updateStatusMutation = useUpdateServiceRequestStatus()

    const handleStatusChange = async (
        id: number,
        status: "pending" | "accepted" | "completed" | "cancelled") => {

        try {
            await updateStatusMutation.mutateAsync({ id, status })
        }
        catch (error) {
            console.log("Error in updating status", error);
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <span className="loading loading-spinner loading-lg" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-6 text-red-600">
                Failed to load service requests.
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 text-blacksm:p-6">
            {/* header  */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    My Service Requests
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    view and manage your assigned service requests
                </p>
            </div>

            {/* table */}
            <div className="overflow-hidden rounded-xl border broder-gray-200 bg-white shadow:sm text-black">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-700">
                                <th>Service</th>
                                <th>Category</th>
                                <th>Customer</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Booking Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {engnineerRequests?.map((request) => (
                                <tr key={request.id}
                                    className="hover:bg-gray-50"
                                >
                                    {/* services */}
                                    <td>
                                        <p className="font-semibold text-gray-900">
                                            {request.service_name}
                                        </p>
                                    </td>

                                    {/* category */}
                                    <td>
                                        <span className="badge border-purple-200 bg-purple-50 text-purple-700">
                                            {request.category_name}
                                        </span>
                                    </td>

                                    {/* customer */}
                                    <td>
                                        <span className="font-medium">
                                            {request.customer_name}
                                        </span>
                                    </td>

                                    {/* description */}
                                    <td>
                                        <p className="max-w-64 truncate text-sm text-gray-600">
                                            {request.description || "No description"}

                                        </p>
                                    </td>

                                    {/* status */}
                                    <td>
                                        <select
                                            value={request.status}
                                            disabled={
                                                updateStatusMutation.isPending
                                            }
                                            onChange={(e) => handleStatusChange(request.id, e.target.value as CustomerRequestResponse['status'])}
                                            className="select select-sm select-bordered w-36 bg-white text-black"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="accepted">Accepted</option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="cancelled">cancelled</option>

                                        </select>

                                    </td>

                                    {/* date */}
                                    <td>
                                        <span className="text-sm text-gray-600">
                                            {new Date(
                                                request.booking_date
                                            ).toLocaleDateString()}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                            {/* empty */}
                            {engnineerRequests?.length === 0 && (
                                <tr>
                                    <td colSpan={6}
                                        className="py-16 text-center">
                                        <p className=" font-medium text-gray-600">
                                            No Service request assigned
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            Assigned request will appear here
                                        </p>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}

export default ManageEngineerService
