package com.autoshare.autoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoshare.autoshare.dto.ApiResponse;
import com.autoshare.autoshare.dto.bookings.BookingRequestDTO;
import com.autoshare.autoshare.dto.bookings.BookingResponseDTO;
import com.autoshare.autoshare.security.SecurityUtil;
import com.autoshare.autoshare.service.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    // Endpoint for requesting a booking
    @PostMapping("/request/{carId}")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> requestBooking(@Valid @RequestBody BookingRequestDTO dto, @PathVariable String carId) {
        String userId = SecurityUtil.getCurrentUserId();
        BookingResponseDTO bookingResponse = bookingService.requestBooking(dto, carId, userId);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("booking requested successfully", bookingResponse));
    }
}
