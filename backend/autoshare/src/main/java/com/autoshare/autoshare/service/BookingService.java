package com.autoshare.autoshare.service;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.autoshare.autoshare.dto.bookings.BookingRequestDTO;
import com.autoshare.autoshare.dto.bookings.BookingResponseDTO;
import com.autoshare.autoshare.entity.Booking;
import com.autoshare.autoshare.entity.Car;
import com.autoshare.autoshare.enums.BookingState;
import com.autoshare.autoshare.exceptions.ConflictException;
import com.autoshare.autoshare.exceptions.ForbiddenException;
import com.autoshare.autoshare.exceptions.ResourceNotFoundException;
import com.autoshare.autoshare.exceptions.ValidationException;
import com.autoshare.autoshare.mapper.BookingMapper;
import com.autoshare.autoshare.repository.BookingRepository;
import com.autoshare.autoshare.repository.CarRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final BookingMapper bookingMapper;


    // Request a booking
    @Transactional
    public BookingResponseDTO requestBooking(BookingRequestDTO dto, String carId, String userId) {
        // Verify car exists
        Car car = carRepository.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + carId));

        // Prevent owner from booking their own car
        if (car.getUserId().equals(userId)) {
            throw new ForbiddenException("You cannot book your own car");
        }

        // Validate trip dates
        if (dto.getTripStart().isAfter(dto.getTripEnd())) {
            throw new ValidationException("Trip start must be before trip end");
        }

        if (dto.getTripStart().isBefore(OffsetDateTime.now())) {
            throw new ValidationException("Trip start cannot be in the past");
        }

        // Check for conflicting bookings
        boolean hasConflict = bookingRepository.existsOverlappingBooking(
            carId,
            dto.getTripStart(),
            dto.getTripEnd()
        );

        if (hasConflict) {
            throw new ConflictException("Car is not available for the selected dates");
        }

        // Calculate total price
        long days = ChronoUnit.DAYS.between(dto.getTripStart().toLocalDate(), dto.getTripEnd().toLocalDate());

        if (days < 1) {
            throw new ValidationException("Booking must be at least 1 day");
        }

        double totalPrice = days * car.getPricePerDay();


        // Build and save the booking
        Booking booking = bookingMapper.toEntity(dto, carId, userId);
        booking.setBookingId(UUID.randomUUID().toString());
        booking.setState(BookingState.requested);
        booking.setTotalPrice(totalPrice);
        
        bookingRepository.save(booking);
        return bookingMapper.toResponseDTO(booking);
    }


    // Update booking state
    @Transactional
    public BookingResponseDTO updateBookingState(String bookingId, String userId, BookingState newState) {
        // Verify booking exists
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Verify car exists
        Car bookingCar = carRepository.findById(booking.getCarId()).orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + booking.getCarId()));

        // Verify trip_start is still in the future
        if (booking.getTripStart().isBefore(OffsetDateTime.now()) && newState != BookingState.completed && newState != BookingState.cancelled) {
            throw new ValidationException("Cannot affect a booking whose trip has already started");
        }

        // Verify booking is currently in a state that is ok to take next action
        switch (newState) {
            // Trying to approve booking
            case approved -> {
                if (booking.getState() != BookingState.requested) {
                    throw new ValidationException("Only requested bookings can be approved");
                }
                if (!userId.equals(bookingCar.getUserId())) {
                    throw new ForbiddenException("Only the car owner can approve a booking");
                }
            }

            // Trying to reject booking
            case rejected -> {
                if (booking.getState() != BookingState.requested) {
                    throw new ValidationException("Only requested bookings can be rejected");
                }
                if (!userId.equals(bookingCar.getUserId())) {
                    throw new ForbiddenException("Only the car owner can reject a booking");
                }
            }

            // Trying to make booking active
            case active -> {
                if (booking.getState() != BookingState.approved) {
                    throw new ValidationException("Only approved bookings can be set to active");
                }
                if (!userId.equals(bookingCar.getUserId())) {
                    throw new ForbiddenException("Only the car owner can activate a booking");
                }
            }

            // Trying to cancel booking
            case cancelled -> {
                if (booking.getState() == BookingState.completed ||
                    booking.getState() == BookingState.rejected ||
                    booking.getState() == BookingState.cancelled) {
                    throw new ValidationException("This booking cannot be cancelled");
                }
                if (!booking.getRenterId().equals(userId) && !bookingCar.getUserId().equals(userId)) {
                    throw new ForbiddenException("Only car owner or renter can cancel a booking");
                }
            }

            // Trying to complete booking
            case completed -> {
                if (booking.getState() != BookingState.active) {
                    throw new ValidationException("Only active bookings can be completed");
                }
                if (!userId.equals(bookingCar.getUserId())) {
                    throw new ForbiddenException("Only the car owner can complete a booking");
                }
            }

            // Trying to request booking
            case requested -> throw new ValidationException("Cannot manually set a booking to requested state");
        }

        booking.setState(newState);
        bookingRepository.save(booking);

        return bookingMapper.toResponseDTO(booking);
    }
}
