import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCustomerRequest, updateRequestStatus, type CustomerRequestResponse } from "../services/engineerService"


export const useGetEngineerServiceRequest = () => {
    return useQuery<CustomerRequestResponse[]>({
        queryKey: (["engineer-requests"]),
        queryFn: getAllCustomerRequest,
        retry: false,
    })
}

export const useUpdateServiceRequestStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateRequestStatus,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: (['engineer-requests']),
        })
    })
}