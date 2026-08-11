import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    register, login, profile, updateProfile,
    type RegisterData,
    type LoginData,
    type User
} from "../services/authservice";

import { useNavigate } from "react-router-dom";



interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    registerUser: (userData: RegisterData) => Promise<User>;
    loginUser: (loginData: LoginData) => Promise<User>;
    getProfile: () => Promise<User>;
    editProfile: (userData: Partial<User>) => Promise<User>;
    logout: () => void;


}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const registerUser = async (userData: RegisterData) => {
        const newUser = await register(userData);
        setUser(newUser);
        return newUser;
    }

    const loginUser = async (loginData: LoginData): Promise<User> => {
       await login(loginData);
       const userProfile = await profile();
        setUser(userProfile);
        setIsAuthenticated(true);
        navigate("/profile");
        console.log("Logged in user:", userProfile);
        return userProfile;
    }
     
    const getProfile = async (): Promise<User> => {
        const userProfile = await profile();
        setUser(userProfile);
        return userProfile;
    }

    useEffect(()=>{
        const fetchProfile = async ()=>{
            try{
                const userProfile = await profile();
                setUser(userProfile);
            }
            catch(error){
                console.error("Error fetching profile:", error);
            }
        }
        fetchProfile();
    },[])

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    }

    const editProfile = async (userData: Partial<User>): Promise<User> => {
        const updateUser = await updateProfile(userData);
        setUser(updateUser);
        return updateUser;
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            registerUser,
            loginUser,
            getProfile,
            editProfile,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}