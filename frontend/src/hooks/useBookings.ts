import { useMutation } from "@tanstack/react-query";
import type { BookingRequest } from "../types/booking";
import { bookingService } from "../services/bookingService";

export const useRequestBooking = () => {
    interface RequestBookingVariables {
        dto: BookingRequest;
        carId: string;
    }

    return useMutation({
        mutationFn: ({ dto, carId }: RequestBookingVariables) => bookingService.requestBooking(dto, carId)
    })
}
