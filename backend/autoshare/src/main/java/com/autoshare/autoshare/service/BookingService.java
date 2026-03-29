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


    // Approve a booking
    @Transactional
    public BookingResponseDTO approveBooking(String bookingId, String userId) {
        // Verify booking exists
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Verify user is owner of the car
        Car bookingCar = carRepository.findById(booking.getCarId()).orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + booking.getCarId()));
        if (!userId.equals(bookingCar.getUserId())) {
            throw new ForbiddenException("You are not the owner of the car in this booking");
        }

        // Verify trip_start is still in the future
        if (booking.getTripStart().isBefore(OffsetDateTime.now())) {
            throw new ValidationException("Cannot approve a booking whose trip has already started");
        }

        // Verify booking is currently in a requested state
        if (booking.getState() != BookingState.requested) {
            throw new ValidationException("Only requested bookings can be approved");
        }

        booking.setState(BookingState.approved);
        bookingRepository.save(booking);

        return bookingMapper.toResponseDTO(booking);
    }
}
