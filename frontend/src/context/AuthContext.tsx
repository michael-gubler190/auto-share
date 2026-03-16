import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserResponseDTO } from "../types/auth";
import { authService } from "../services/authService";

interface AuthContextType {
    user: UserResponseDTO | null;
    setUserAndStore: (user: UserResponseDTO | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponseDTO | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const setUserAndStore = (user: UserResponseDTO | null) => {
        setUser(user);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };

    const logout = () => {
        setUserAndStore(null);
        authService.logout();
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUserAndStore,
            isAuthenticated: !!user,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}