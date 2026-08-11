
import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/api/';

const authaxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export interface RegisterData {
    username: string,
    email: string,
    phone_number: string,
    password: string,
    first_name?: string,
    last_name?: string,
    role?: "customer"
}

export interface LoginData {
    username: string,
    password: string
}

export interface User {
    id: number,
    username: string,
    email: string,
    phone_number: string,
    first_name?: string,
    last_name?: string,
    role: "admin" | "customer" | "engineer";
}


export const register = async (data: RegisterData): Promise<User> => {
    const response = await authaxios.post('register/', data);
    return response.data;
}

export const login = async (data: LoginData): Promise<User> => {
    const response = await authaxios.post('login/', data);
    return response.data;
}

export const profile = async (): Promise<User> => {
    const response = await authaxios.get('profile/');
    return response.data;
}