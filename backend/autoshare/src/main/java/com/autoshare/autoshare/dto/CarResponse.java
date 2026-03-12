package com.autoshare.autoshare.dto;

import java.time.OffsetDateTime;

import com.autoshare.autoshare.enums.PowerType;
import com.autoshare.autoshare.enums.Transmission;

import lombok.Value;

@Value
public class CarResponse {
    private String carId;
    private String userId;
    private String make;
    private String model;
    private Integer numberOfSeats;
    private PowerType powerType;
    private Double milesPerGallon;
    private Double distanceWithFullCharge;
    private Transmission transmission;
    private Double pricePerDay;
    private OffsetDateTime createdAt;
}
