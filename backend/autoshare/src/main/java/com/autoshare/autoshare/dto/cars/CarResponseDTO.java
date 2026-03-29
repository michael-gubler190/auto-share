package com.autoshare.autoshare.dto.cars;

import java.time.OffsetDateTime;

import com.autoshare.autoshare.enums.PowerType;
import com.autoshare.autoshare.enums.Transmission;

import lombok.Value;

@Value
public class CarResponseDTO {
    private String carId;
    private String userId;
    private String make;
    private String model;
    private Integer year;
    private Integer numberOfSeats;
    private PowerType powerType;
    private Double milesPerGallon;
    private Double distanceWithFullCharge;
    private Transmission transmission;
    private Double pricePerDay;
    private OffsetDateTime createdAt;
}
