package com.autoshare.autoshare.mapper;

import org.springframework.stereotype.Component;

import com.autoshare.autoshare.dto.bookings.BookingRequestDTO;
import com.autoshare.autoshare.dto.bookings.BookingResponseDTO;
import com.autoshare.autoshare.entity.Booking;

@Component
public class BookingMapper {

    public BookingResponseDTO toResponseDTO(Booking booking) {
        return new BookingResponseDTO(
                booking.getBookingId(),
                booking.getCarId(),
                booking.getRenterId(),
                booking.getState().name(),
                booking.getTripStart(),
                booking.getTripEnd(),
                booking.getTotalPrice(),
                booking.getPickupLocation(),
                booking.getDropOffLocation(),
                booking.getCreatedAt(),
                booking.getUpdatedAt()
        );
    }

    public Booking toEntity(BookingRequestDTO dto, String carId, String renterId) {
        Booking booking = new Booking();

        booking.setCarId(carId);
        booking.setRenterId(renterId);
        booking.setTripStart(dto.getTripStart());
        booking.setTripEnd(dto.getTripEnd());
        booking.setPickupLocation(dto.getPickupLocation());
        booking.setDropOffLocation(dto.getDropOffLocation());

        return booking;
    }
}
