import type { RegisterRequest, UserResponseDTO } from "../types/auth";
import api from "./api";

export const authService = {
    register: async (dto: RegisterRequest): Promise<UserResponseDTO> => {
        const response = await api.post("/api/auth/register", dto);
        return response.data.data;
    }
}