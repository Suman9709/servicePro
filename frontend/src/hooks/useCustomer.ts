import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { booking, bookingHistory, type Booking, type BookingHistoryResponse } from "../services/userService"


export const useBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Booking) => booking(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: (['bookings'])
            })
        }

    })
}

export const useBookingHistory = () => {
    return useQuery<BookingHistoryResponse[]>({
        queryKey: (['bookingHistory']),
        queryFn: bookingHistory,
        retry: false

    })
}