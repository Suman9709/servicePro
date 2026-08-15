import axios from "axios";


const API_URL = "http://127.0.0.1:8000/";

const adminaxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})
// engineers/create/
// dashboard/engineers/

export interface EngineerData {
    username: string;
    email: string;
    phone_number: string;
    password: string;
    professional_title: string;
    specialization: string;
    experience: string;

}

export interface EngineerResponse {
    id: number,
    username: string;
    email: string;
    phone_number: string;
    password: string;
    professional_title: string;
    specialization: string;
    experience: string;
}

export interface EngineerListResponse {
    id: number,
    email: string,
    username: string,
    phone_number: string,
    professional_title: string,
    specialization: string,
    experience: string,
    is_available: boolean,
    created_at: string,
    updated_at: string
}

export interface createCategoryData{
    name:string,
    description:string,
}

export interface CategoryResponse{
    id:number,
    name:string,
    description:string,
    created_at:string,
    updated_at:string
}

export interface Service {
    id: number;
    category: number;
    name: string;
    description: string;
    estimated_price: string;
    estimated_time: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryList {
    id: number;
    name: string;
    description: string;
    icon: string | null;
    services: Service[];
    created_at: string;
    updated_at: string;
}


export const createEngineer = async (data: EngineerData): Promise<EngineerResponse> => {
    const response = await adminaxios.post<EngineerResponse>('engineers/create/', data);
    return response.data;
}

export const getEngineers = async (): Promise<EngineerListResponse[]> => {
    const response = await adminaxios.get<EngineerListResponse[]>('dashboard/engineers/');
    console.log("engineers", response.data);
    return response.data;
}
export const getEngineerById = async(id:number):Promise<EngineerListResponse>=>{
    const response = await adminaxios.get<EngineerListResponse>(`dashboard/engineers/${id}/`);
    return response.data;
}

export const deleteEngineer = async(id:number):Promise<void>=>{
    await adminaxios.delete(`dashboard/engineers/${id}/`);
}


// category services

export const createCategory = async(data:createCategoryData):Promise<CategoryResponse>=>{
    const response = await adminaxios.post<CategoryResponse>('dashboard/service-categories/', data);
    return response.data;
}

export const getAllCategory = async():Promise<CategoryList[]>=>{
    const response = await adminaxios.get<CategoryList[]>('dashboard/service-categories/')
    return response.data;
}