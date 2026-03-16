import type { LoginRequest, RegisterRequest, UserResponseDTO } from "../types/auth";
import api from "./api";

export const authService = {
    register: async (dto: RegisterRequest): Promise<UserResponseDTO> => {
        const response = await api.post("/api/auth/register", dto);
        return response.data.data;
    },

    login: async (dto: LoginRequest): Promise<UserResponseDTO> => {
        const response = await api.post("/api/auth/login", dto);
        return response.data.data;
    }
}