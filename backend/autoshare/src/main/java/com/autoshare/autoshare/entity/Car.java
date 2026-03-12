package com.autoshare.autoshare.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import com.autoshare.autoshare.enums.PowerType;
import com.autoshare.autoshare.enums.Transmission;

import java.time.OffsetDateTime;

@Data
@Entity
@Table(name = "car")
public class Car {
    @Id
    @Column(name = "car_id", nullable = false)
    private String carId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "make", nullable = false)
    private String make;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "description")
    private String description;

    @Column(name = "number_of_seats")
    private Integer numberOfSeats;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "power_type", columnDefinition = "power_type_enum")
    private PowerType powerType;

    @Column(name = "miles_per_gallon")
    private Double milesPerGallon;

    @Column(name = "distance_with_full_charge")
    private Double distanceWithFullCharge;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "transmission", columnDefinition = "transmission_enum")
    private Transmission transmission;

    @Column(name = "price_per_day", nullable = false)
    private Double pricePerDay;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    
}
