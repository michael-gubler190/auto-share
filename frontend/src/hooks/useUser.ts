import { useMutation } from "@tanstack/react-query"
import { userService } from "../services/userService"
import type { UpdateUserRequest } from "../types/user";

export const useBecomeOwner = () => {
    return useMutation({
        mutationFn: () => userService.becomeOwner()
    });
}


export const useUpdateUser = () => {
    return useMutation({
        mutationFn: (dto: UpdateUserRequest) => userService.updateProfile(dto)
    });
}
