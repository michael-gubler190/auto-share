package com.autoshare.autoshare.dto.bookings;

import java.time.OffsetDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookingRequestDTO {
    @NotNull(message = "Trip start is required")
    @Future(message = "Trip start must be in the future")
    private OffsetDateTime tripStart;

    @NotNull(message = "Trip end is required")
    @Future(message = "Trip end must be in the future")
    private OffsetDateTime tripEnd;

    @NotBlank(message = "Pickup location is required")
    @Size(max = 255, message = "Pickup location is too long")
    private String pickupLocation;

    @NotBlank(message = "Drop off location is required")
    @Size(max = 255, message = "Drop off location is too long")
    private String dropOffLocation;
}
