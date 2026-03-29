package com.autoshare.autoshare.repository;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.autoshare.autoshare.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String> {
    @Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.carId = :carId
        AND b.state NOT IN ('rejected', 'cancelled')
        AND b.tripStart < :tripEnd
        AND b.tripEnd > :tripStart
    """)
    boolean existsOverlappingBooking(
        @Param("carId") String carId,
        @Param("tripStart") OffsetDateTime tripStart,
        @Param("tripEnd") OffsetDateTime tripEnd
    );

    List<Booking> findByRenterId(String renterId);
    List<Booking> findByCarId(String carId);
}
