import type { BookingRequest, BookingResponse } from "../types/booking";
import api from "./api";

export const bookingService = {
    requestBooking: async (dto: BookingRequest, carId: string): Promise<BookingResponse> => {
        const response = await api.post(`/api/booking/request/${carId}`, dto);
        return response.data.data;
    }
}