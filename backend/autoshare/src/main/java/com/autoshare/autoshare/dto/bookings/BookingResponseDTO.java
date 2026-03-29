package com.autoshare.autoshare.dto.bookings;

import java.time.OffsetDateTime;

import lombok.Value;

@Value
public class BookingResponseDTO {
    String bookingId;
    String carId;
    String renterId;
    String state;
    OffsetDateTime tripStart;
    OffsetDateTime tripEnd;
    Double totalPrice;
    String pickupLocation;
    String dropOffLocation;
    OffsetDateTime createdAt;
    OffsetDateTime updatedAt;
}
