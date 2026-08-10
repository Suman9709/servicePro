import { createContext, useContext, type ReactNode } from "react";


export interface User {
    id: number;
    email: string;
    role: "admin" | "customer" | "engineer";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;


}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {

    return (
        <AuthContext.Provider value={{
            user: null,
            isAuthenticated: false,
            login: () => { },
            logout: () => { }
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