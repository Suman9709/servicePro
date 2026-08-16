import axios from 'axios'


const API_URL = "http://127.0.0.1:8000/";


const useraxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export interface Booking {
    category: number;
    service: number;
    description: string;
}

export interface BookingHistoryResponse {
    id: number;
    customer: number,
    service: number,
    service_name: string;
    category_name: string;
    description: string;
    status: string;
    booking_date: string
    created_at: string
}


export const booking = async (data: Booking): Promise<Booking> => {
    const response = await useraxios.post<Booking>("services/bookings/", data)
    return response.data
}

export const bookingHistory = async (): Promise<BookingHistoryResponse[]> => {
    const response = await useraxios.get<BookingHistoryResponse[]>("services/customer-service-requests/");
    return response.data
}