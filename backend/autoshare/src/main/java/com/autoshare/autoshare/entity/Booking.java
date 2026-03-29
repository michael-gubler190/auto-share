package com.autoshare.autoshare.entity;

import java.time.OffsetDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import com.autoshare.autoshare.enums.BookingState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @Column(name = "booking_id", nullable = false)
    private String bookingId;

    @Column(name = "car_id", nullable = false)
    private String carId;

    @Column(name = "renter_id", nullable = false)
    private String renterId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "state", columnDefinition = "booking_state_enum", nullable = false)
    private BookingState state;

    @Column(name = "trip_start", nullable = false)
    private OffsetDateTime tripStart;

    @Column(name = "trip_end", nullable = false)
    private OffsetDateTime tripEnd;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Column(name = "pickup_location", nullable = false)
    private String pickupLocation;

    @Column(name = "drop_off_location", nullable = false)
    private String dropOffLocation;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}
