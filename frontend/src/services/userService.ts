import type { UserResponseDTO } from "../types/auth";
import type { UpdateUserRequest } from "../types/user";
import api from "./api";

export const userService = {
    becomeOwner: async (): Promise<UserResponseDTO> => {
        const response = await api.patch("/api/users/upgrade-to-owner");
        return response.data.data;
    },

    updateProfile: async (dto: UpdateUserRequest): Promise<UserResponseDTO> => {
        const response = await api.patch("/api/users/me", dto);
        return response.data.data;
    }
}
