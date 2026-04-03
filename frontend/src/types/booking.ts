export interface BookingRequest {
    tripStart: string,
    tripEnd: string,
    pickupLocation: string,
    dropOffLocation: string
}

export interface BookingResponse {
    bookingId: string,
    carId: string,
    renterId: string,
    state: String,
    tripStart: String,
    tripEnd: String,
    totalPrice: number,
    pickupLocation: string,
    dropOffLocation: string,
    createdAt: string,
    updatedAt: string
}
