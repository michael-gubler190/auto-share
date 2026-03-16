import { useMutation } from "@tanstack/react-query"
import type { LoginRequest, RegisterRequest } from "../types/auth"
import { authService } from "../services/authService"

export const useRegister = () => {
    return useMutation({
        mutationFn: (dto: RegisterRequest) => authService.register(dto)
    })
}


export const useLogin = () => {
    return useMutation({
        mutationFn: (dto: LoginRequest) => authService.login(dto)
    })
}
