import { createContext, useContext, useState, type ReactNode } from "react";
import {
    register, login, profile,
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
    logout: () => void;


}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const registerUser = async (userData: RegisterData) => {
        const newUser = await register(userData);
        setUser(newUser);
        return newUser;
    }

    const loginUser = async (loginData: LoginData) => {
        const loggedInUser = await login(loginData);
        setUser(loggedInUser as User);
        navigate("/profile");
        return loggedInUser;
    }

    const getProfile = async () => {
        const userProfile = await profile();
        setUser(userProfile);
        return userProfile;
    }

    const logout = async () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            registerUser,
            loginUser,
            getProfile,
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