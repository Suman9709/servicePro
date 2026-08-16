import axios from 'axios'

const API_URL = "http://127.0.0.1:8000/";

const engineeraxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})


export interface CustomerRequestResponse {
    id: number;
    customer: number;
    customer_name: string;
    category_name: string;
    service: number;
    service_name: string;
    description: string;
    status: "pending" | "accepted" | "completed" | "cancelled";
    booking_date: string;
    created_at: string;
}


export const getAllCustomerRequest = async (): Promise<CustomerRequestResponse[]> => {
    const response = await engineeraxios.get<CustomerRequestResponse[]>('engineers/engineer-service-requests/')
    return response.data;
}
export const updateRequestStatus = async({id,status}:{id:number, status:CustomerRequestResponse["status"]})=>{
    const response = await engineeraxios.patch(`engineers/engineer-service-requests/${id}/`, {status});
    return response.data;
}