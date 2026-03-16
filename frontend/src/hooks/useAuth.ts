import { useMutation } from "@tanstack/react-query"
import type { RegisterRequest } from "../types/auth"
import { authService } from "../services/authService"

export const useRegister = () => {
    return useMutation({
        mutationFn: (dto: RegisterRequest) => authService.register(dto)
    })
}